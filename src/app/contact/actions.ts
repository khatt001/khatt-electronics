"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { createServerSupabaseClient } from "@/lib/supabase/server";

const inquirySchema = z.object({
  full_name: z
    .string()
    .min(2, "Ad minimum 2 simvol olmalıdır.")
    .max(100, "Ad maksimum 100 simvol ola bilər."),
  phone: z
    .string()
    .min(6, "Telefon nömrəsi düzgün deyil.")
    .max(30, "Telefon nömrəsi düzgün deyil."),
  email: z
    .string()
    .email("Email düzgün deyil.")
    .max(254, "Email düzgün deyil.")
    .optional()
    .or(z.literal("")),
  company_name: z
    .string()
    .max(150, "Şirkət adı maksimum 150 simvol ola bilər.")
    .optional(),
  message: z
    .string()
    .max(3000, "Mesaj maksimum 3000 simvol ola bilər.")
    .optional(),
  source: z.string().max(100).optional(),
});

type TurnstileResponse = {
  success: boolean;
  "error-codes"?: string[];
};

function getContactPath(localeValue: FormDataEntryValue | null) {
  const locale = String(localeValue ?? "az");

  if (locale === "en") {
    return "/en/contact";
  }

  if (locale === "ru") {
    return "/ru/contact";
  }

  return "/contact";
}

async function verifyTurnstileToken(token: string) {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey || !token) {
    return false;
  }

  try {
    const body = new URLSearchParams({
      secret: secretKey,
      response: token,
    });

    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return false;
    }

    const result = (await response.json()) as TurnstileResponse;

    return result.success;
  } catch {
    return false;
  }
}

export async function createInquiry(formData: FormData) {
  const contactPath = getContactPath(formData.get("locale"));

  const turnstileToken = String(
    formData.get("cf-turnstile-response") ?? "",
  ).trim();

  const isHuman = await verifyTurnstileToken(turnstileToken);

  if (!isHuman) {
    redirect(
      `${contactPath}?error=${encodeURIComponent(
        "Təhlükəsizlik yoxlaması uğursuz oldu. Zəhmət olmasa yenidən cəhd edin.",
      )}`,
    );
  }

  const rawData = {
    full_name: String(formData.get("full_name") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    company_name: String(formData.get("company_name") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
    source: String(formData.get("source") ?? "contact_page").trim(),
  };

  const parsed = inquirySchema.safeParse(rawData);

  if (!parsed.success) {
    const message = encodeURIComponent(
      parsed.error.issues[0]?.message ?? "Məlumatlar düzgün deyil.",
    );

    redirect(`${contactPath}?error=${message}`);
  }

  const inquiry = parsed.data;
  const supabase = createServerSupabaseClient();

  const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000).toISOString();
  const savedMessage = inquiry.message || "Mesaj yazılmayıb";

  const { data: existingInquiry } = await supabase
    .from("inquiries")
    .select("id")
    .eq("phone", inquiry.phone)
    .eq("message", savedMessage)
    .gte("created_at", twoMinutesAgo)
    .maybeSingle()
    .returns<{ id: string } | null>();

  if (existingInquiry) {
    redirect(`${contactPath}?success=1`);
  }

  const { error } = await supabase.from("inquiries").insert({
    full_name: inquiry.full_name,
    phone: inquiry.phone,
    email: inquiry.email || null,
    company_name: inquiry.company_name || null,
    message: savedMessage,
    source: inquiry.source || "contact_page",
    status: "new",
  });

  if (error) {
    redirect(
      `${contactPath}?error=${encodeURIComponent(
        "Sorğu göndərilmədi. Zəhmət olmasa bir az sonra yenidən cəhd edin.",
      )}`,
    );
  }

  redirect(`${contactPath}?success=1`);
}
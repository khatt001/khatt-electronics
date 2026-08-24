"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { createServerSupabaseClient } from "@/lib/supabase/server";

type ContactLocale = "az" | "en" | "ru";

type TurnstileResponse = {
  success: boolean;
  "error-codes"?: string[];
};

const messages = {
  az: {
    fullNameMin: "Ad minimum 2 simvol olmalıdır.",
    fullNameMax: "Ad maksimum 100 simvol ola bilər.",
    phoneInvalid: "Telefon nömrəsi düzgün deyil.",
    emailInvalid: "Email düzgün deyil.",
    companyMax: "Şirkət adı maksimum 150 simvol ola bilər.",
    messageMax: "Mesaj maksimum 3000 simvol ola bilər.",
    invalidData: "Məlumatlar düzgün deyil.",
    securityFailed:
      "Təhlükəsizlik yoxlaması uğursuz oldu. Zəhmət olmasa yenidən cəhd edin.",
    submitFailed:
      "Sorğu göndərilmədi. Zəhmət olmasa bir az sonra yenidən cəhd edin.",
  },
  en: {
    fullNameMin: "Full name must be at least 2 characters.",
    fullNameMax: "Full name cannot exceed 100 characters.",
    phoneInvalid: "Phone number is invalid.",
    emailInvalid: "Email is invalid.",
    companyMax: "Company name cannot exceed 150 characters.",
    messageMax: "Message cannot exceed 3000 characters.",
    invalidData: "The submitted information is invalid.",
    securityFailed: "Security verification failed. Please try again.",
    submitFailed:
      "The inquiry could not be sent. Please try again a little later.",
  },
  ru: {
    fullNameMin: "Имя должно содержать минимум 2 символа.",
    fullNameMax: "Имя не может превышать 100 символов.",
    phoneInvalid: "Номер телефона указан неверно.",
    emailInvalid: "Email указан неверно.",
    companyMax: "Название компании не может превышать 150 символов.",
    messageMax: "Сообщение не может превышать 3000 символов.",
    invalidData: "Введенные данные неверны.",
    securityFailed: "Проверка безопасности не пройдена. Попробуйте снова.",
    submitFailed:
      "Не удалось отправить запрос. Пожалуйста, повторите попытку позже.",
  },
} as const;

function getLocale(localeValue: FormDataEntryValue | null): ContactLocale {
  const locale = String(localeValue ?? "az");

  if (locale === "en" || locale === "ru") {
    return locale;
  }

  return "az";
}

function getContactPath(locale: ContactLocale) {
  if (locale === "en") {
    return "/en/contact";
  }

  if (locale === "ru") {
    return "/ru/contact";
  }

  return "/contact";
}

function getInquirySchema(locale: ContactLocale) {
  const t = messages[locale];

  return z.object({
    full_name: z
      .string()
      .min(2, t.fullNameMin)
      .max(100, t.fullNameMax),
    phone: z
      .string()
      .min(6, t.phoneInvalid)
      .max(30, t.phoneInvalid),
    email: z
      .string()
      .email(t.emailInvalid)
      .max(254, t.emailInvalid)
      .optional()
      .or(z.literal("")),
    company_name: z
      .string()
      .max(150, t.companyMax)
      .optional(),
    message: z
      .string()
      .max(3000, t.messageMax)
      .optional(),
    source: z.string().max(100).optional(),
  });
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
  const locale = getLocale(formData.get("locale"));
  const contactPath = getContactPath(locale);
  const t = messages[locale];

  const turnstileToken = String(
    formData.get("cf-turnstile-response") ?? "",
  ).trim();

  const isHuman = await verifyTurnstileToken(turnstileToken);

  if (!isHuman) {
    redirect(
      `${contactPath}?error=${encodeURIComponent(t.securityFailed)}`,
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

  const parsed = getInquirySchema(locale).safeParse(rawData);

  if (!parsed.success) {
    const message = encodeURIComponent(
      parsed.error.issues[0]?.message ?? t.invalidData,
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
      `${contactPath}?error=${encodeURIComponent(t.submitFailed)}`,
    );
  }

  redirect(`${contactPath}?success=1`);
}
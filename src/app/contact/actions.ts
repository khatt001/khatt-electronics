"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const inquirySchema = z.object({
  full_name: z.string().min(2, "Ad minimum 2 simvol olmalıdır."),
  phone: z.string().min(6, "Telefon nömrəsi düzgün deyil."),
  email: z.string().email("Email düzgün deyil.").optional().or(z.literal("")),
  company_name: z.string().optional(),
  message: z.string().optional(),
  source: z.string().optional(),
});

export async function createInquiry(formData: FormData) {
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

    redirect(`/contact?error=${message}`);
  }

  const inquiry = parsed.data;
  const supabase = createServerSupabaseClient();

  const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000).toISOString();

  const { data: existingInquiry } = await supabase
    .from("inquiries")
    .select("id")
    .eq("phone", inquiry.phone)
    .eq("message", inquiry.message || "Mesaj yazılmayıb")
    .gte("created_at", twoMinutesAgo)
    .maybeSingle()
    .returns<{ id: string } | null>();

  if (existingInquiry) {
    redirect("/contact?success=1");
  }

  const { error } = await supabase.from("inquiries").insert({
    full_name: inquiry.full_name,
    phone: inquiry.phone,
    email: inquiry.email || null,
    company_name: inquiry.company_name || null,
    message: inquiry.message || "Mesaj yazılmayıb",
    source: inquiry.source || "contact_page",
    status: "new",
  });

  if (error) {
    redirect(
      `/contact?error=${encodeURIComponent(
        "Sorğu göndərilmədi. Zəhmət olmasa bir az sonra yenidən cəhd edin.",
      )}`,
    );
  }

  redirect("/contact?success=1");
}

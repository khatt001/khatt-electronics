"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { requireAdmin } from "@/services/admin";

const statusSchema = z.enum(["new", "contacted", "closed"]);

export async function updateInquiryStatus(
  inquiryId: string,
  formData: FormData,
) {
  await requireAdmin();

  const rawStatus = String(formData.get("status") ?? "");
  const parsed = statusSchema.safeParse(rawStatus);

  if (!parsed.success) {
    redirect(
      `/admin/inquiries?error=${encodeURIComponent(
        "Sorğu statusu düzgün deyil.",
      )}`,
    );
  }

  const { error } = await supabaseAdmin
    .from("inquiries")
    .update({
      status: parsed.data,
      updated_at: new Date().toISOString(),
    })
    .eq("id", inquiryId);

  if (error) {
    redirect(
      `/admin/inquiries?error=${encodeURIComponent(
        "Sorğu statusu dəyişdirilə bilmədi.",
      )}`,
    );
  }

  revalidatePath("/admin/inquiries");
  redirect("/admin/inquiries");
}

export async function deleteInquiry(inquiryId: string) {
  await requireAdmin();

  const { error } = await supabaseAdmin
    .from("inquiries")
    .delete()
    .eq("id", inquiryId);

  if (error) {
    redirect(
      `/admin/inquiries?error=${encodeURIComponent("Sorğu silinə bilmədi.")}`,
    );
  }

  revalidatePath("/admin/inquiries");
  redirect("/admin/inquiries");
}

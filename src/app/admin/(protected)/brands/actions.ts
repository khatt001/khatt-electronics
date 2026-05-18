"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { requireAdmin } from "@/services/admin";

const brandSchema = z.object({
  name: z.string().min(2, "Brend adı minimum 2 simvol olmalıdır."),
  slug: z.string().min(2, "Slug minimum 2 simvol olmalıdır."),
  website_url: z.string().optional(),
});

function normalizeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/ə/g, "e")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ü/g, "u")
    .replace(/ğ/g, "g")
    .replace(/ş/g, "s")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function createBrand(formData: FormData) {
  await requireAdmin();

  const rawData = {
    name: String(formData.get("name") ?? "").trim(),
    slug: String(formData.get("slug") ?? "").trim(),
    website_url: String(formData.get("website_url") ?? "").trim(),
  };

  const parsed = brandSchema.safeParse(rawData);

  if (!parsed.success) {
    const message = encodeURIComponent(
      parsed.error.issues[0]?.message ?? "Məlumatlar düzgün deyil."
    );

    redirect(`/admin/brands?error=${message}`);
  }

  const brand = parsed.data;
  const slug = normalizeSlug(brand.slug || brand.name);

  const { error } = await supabaseAdmin.from("brands").insert({
    name: brand.name,
    slug,
    website_url: brand.website_url || null,
    is_active: true,
  });

  if (error) {
    redirect(
      `/admin/brands?error=${encodeURIComponent(
        "Brend əlavə edilmədi. Slug təkrarlana bilər."
      )}`
    );
  }

  revalidatePath("/admin/brands");
  revalidatePath("/admin/products/new");

  redirect("/admin/brands");
}

export async function toggleBrandStatus(brandId: string, isActive: boolean) {
  await requireAdmin();

  const { error } = await supabaseAdmin
    .from("brands")
    .update({ is_active: !isActive })
    .eq("id", brandId);

  if (error) {
    redirect(
      `/admin/brands?error=${encodeURIComponent(
        "Brend statusu dəyişdirilə bilmədi."
      )}`
    );
  }

  revalidatePath("/admin/brands");
  revalidatePath("/admin/products/new");

  redirect("/admin/brands");
}
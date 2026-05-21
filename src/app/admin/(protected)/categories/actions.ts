"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { requireAdmin } from "@/services/admin";

const categorySchema = z.object({
  name_az: z.string().min(2, "Kateqoriya adı minimum 2 simvol olmalıdır."),
  name_en: z.string().optional(),
  name_ru: z.string().optional(),
  slug: z.string().min(2, "Slug minimum 2 simvol olmalıdır."),
  description_az: z.string().optional(),
  description_en: z.string().optional(),
  description_ru: z.string().optional(),
  sort_order: z.string().optional(),
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

function getOptionalFormValue(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? "").trim();

  return value || null;
}

function revalidateCategoryPaths() {
  revalidatePath("/");
  revalidatePath("/en");
  revalidatePath("/ru");

  revalidatePath("/products");
  revalidatePath("/en/products");
  revalidatePath("/ru/products");

  revalidatePath("/admin/categories");
  revalidatePath("/admin/products/new");
}

export async function createCategory(formData: FormData) {
  await requireAdmin();

  const rawData = {
    name_az: String(formData.get("name_az") ?? "").trim(),
    name_en: String(formData.get("name_en") ?? "").trim(),
    name_ru: String(formData.get("name_ru") ?? "").trim(),
    slug: String(formData.get("slug") ?? "").trim(),
    description_az: String(formData.get("description_az") ?? "").trim(),
    description_en: String(formData.get("description_en") ?? "").trim(),
    description_ru: String(formData.get("description_ru") ?? "").trim(),
    sort_order: String(formData.get("sort_order") ?? "").trim(),
  };

  const parsed = categorySchema.safeParse(rawData);

  if (!parsed.success) {
    const message = encodeURIComponent(
      parsed.error.issues[0]?.message ?? "Məlumatlar düzgün deyil."
    );

    redirect(`/admin/categories?error=${message}`);
  }

  const category = parsed.data;
  const slug = normalizeSlug(category.slug || category.name_az);

  const sortOrder =
    category.sort_order && category.sort_order !== ""
      ? Number(category.sort_order)
      : 0;

  if (Number.isNaN(sortOrder)) {
    redirect(
      `/admin/categories?error=${encodeURIComponent(
        "Sıralama düzgün rəqəm olmalıdır."
      )}`
    );
  }

  const { error } = await supabaseAdmin.from("categories").insert({
    name_az: category.name_az,
    name_en: getOptionalFormValue(formData, "name_en"),
    name_ru: getOptionalFormValue(formData, "name_ru"),
    slug,
    description_az: getOptionalFormValue(formData, "description_az"),
    description_en: getOptionalFormValue(formData, "description_en"),
    description_ru: getOptionalFormValue(formData, "description_ru"),
    sort_order: sortOrder,
    is_active: true,
  });

  if (error) {
    redirect(
      `/admin/categories?error=${encodeURIComponent(
        "Kateqoriya əlavə edilmədi. Slug təkrarlana bilər."
      )}`
    );
  }

  revalidateCategoryPaths();

  redirect("/admin/categories");
}

export async function toggleCategoryStatus(
  categoryId: string,
  isActive: boolean
) {
  await requireAdmin();

  const { error } = await supabaseAdmin
    .from("categories")
    .update({ is_active: !isActive })
    .eq("id", categoryId);

  if (error) {
    redirect(
      `/admin/categories?error=${encodeURIComponent(
        "Kateqoriya statusu dəyişdirilə bilmədi."
      )}`
    );
  }

  revalidateCategoryPaths();

  redirect("/admin/categories");
}
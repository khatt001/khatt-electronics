"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { requireAdmin } from "@/services/admin";

const categorySchema = z.object({
  name_az: z
    .string()
    .min(2, "Kateqoriya adı minimum 2 simvol olmalıdır."),
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

function getOptionalValue(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? "").trim();

  return value || null;
}

function getCategoryFormData(formData: FormData) {
  return {
    name_az: String(formData.get("name_az") ?? "").trim(),
    name_en: String(formData.get("name_en") ?? "").trim(),
    name_ru: String(formData.get("name_ru") ?? "").trim(),
    slug: String(formData.get("slug") ?? "").trim(),
    description_az: String(
      formData.get("description_az") ?? "",
    ).trim(),
    description_en: String(
      formData.get("description_en") ?? "",
    ).trim(),
    description_ru: String(
      formData.get("description_ru") ?? "",
    ).trim(),
    sort_order: String(formData.get("sort_order") ?? "").trim(),
  };
}

function redirectWithCategoryError(message: string): never {
  redirect(`/admin/categories?error=${encodeURIComponent(message)}`);
}

function revalidateCategoryPaths() {
  revalidatePath("/");
  revalidatePath("/en");
  revalidatePath("/ru");

  revalidatePath("/products");
  revalidatePath("/en/products");
  revalidatePath("/ru/products");

  revalidatePath("/admin/categories");
  revalidatePath("/admin/products");
  revalidatePath("/admin/products/new");
}

function getSortOrder(value?: string) {
  if (!value) return 0;

  const number = Number(value);

  if (!Number.isInteger(number) || number < 0) {
    redirectWithCategoryError(
      "Sıralama sıfır və ya müsbət tam rəqəm olmalıdır.",
    );
  }

  return number;
}

export async function createCategory(formData: FormData) {
  await requireAdmin();

  const parsed = categorySchema.safeParse(
    getCategoryFormData(formData),
  );

  if (!parsed.success) {
    redirectWithCategoryError(
      parsed.error.issues[0]?.message ?? "Məlumatlar düzgün deyil.",
    );
  }

  const category = parsed.data;

  const { error } = await supabaseAdmin.from("categories").insert({
    name_az: category.name_az,
    name_en: getOptionalValue(formData, "name_en"),
    name_ru: getOptionalValue(formData, "name_ru"),
    slug: normalizeSlug(category.slug || category.name_az),
    description_az: getOptionalValue(formData, "description_az"),
    description_en: getOptionalValue(formData, "description_en"),
    description_ru: getOptionalValue(formData, "description_ru"),
    sort_order: getSortOrder(category.sort_order),
    is_active: true,
  });

  if (error) {
    redirectWithCategoryError(
      error.code === "23505"
        ? "Bu slug ilə kateqoriya artıq mövcuddur."
        : "Kateqoriya əlavə edilə bilmədi.",
    );
  }

  revalidateCategoryPaths();
  redirect("/admin/categories");
}

export async function updateCategory(
  categoryId: string,
  formData: FormData,
) {
  await requireAdmin();

  if (!categoryId) {
    redirectWithCategoryError("Kateqoriya ID tapılmadı.");
  }

  const parsed = categorySchema.safeParse(
    getCategoryFormData(formData),
  );

  if (!parsed.success) {
    redirectWithCategoryError(
      parsed.error.issues[0]?.message ?? "Məlumatlar düzgün deyil.",
    );
  }

  const category = parsed.data;

  const { error } = await supabaseAdmin
    .from("categories")
    .update({
      name_az: category.name_az,
      name_en: getOptionalValue(formData, "name_en"),
      name_ru: getOptionalValue(formData, "name_ru"),
      slug: normalizeSlug(category.slug || category.name_az),
      description_az: getOptionalValue(
        formData,
        "description_az",
      ),
      description_en: getOptionalValue(
        formData,
        "description_en",
      ),
      description_ru: getOptionalValue(
        formData,
        "description_ru",
      ),
      sort_order: getSortOrder(category.sort_order),
    })
    .eq("id", categoryId);

  if (error) {
    redirectWithCategoryError(
      error.code === "23505"
        ? "Bu slug başqa kateqoriya tərəfindən istifadə olunur."
        : "Kateqoriya yenilənə bilmədi.",
    );
  }

  revalidateCategoryPaths();
  redirect("/admin/categories");
}

export async function deleteCategory(categoryId: string) {
  await requireAdmin();

  if (!categoryId) {
    redirectWithCategoryError("Kateqoriya ID tapılmadı.");
  }

  const { count, error: productError } = await supabaseAdmin
    .from("products")
    .select("id", {
      count: "exact",
      head: true,
    })
    .eq("category_id", categoryId);

  if (productError) {
    redirectWithCategoryError(
      "Kateqoriyaya bağlı məhsullar yoxlanıla bilmədi.",
    );
  }

  if ((count ?? 0) > 0) {
    redirectWithCategoryError(
      `Bu kateqoriyaya bağlı ${count} məhsul var. Əvvəlcə həmin məhsulların kateqoriyasını dəyişin.`,
    );
  }

  const { error } = await supabaseAdmin
    .from("categories")
    .delete()
    .eq("id", categoryId);

  if (error) {
    redirectWithCategoryError("Kateqoriya silinə bilmədi.");
  }

  revalidateCategoryPaths();
  redirect("/admin/categories");
}

export async function toggleCategoryStatus(
  categoryId: string,
  isActive: boolean,
) {
  await requireAdmin();

  const { error } = await supabaseAdmin
    .from("categories")
    .update({
      is_active: !isActive,
    })
    .eq("id", categoryId);

  if (error) {
    redirectWithCategoryError(
      "Kateqoriya statusu dəyişdirilə bilmədi.",
    );
  }

  revalidateCategoryPaths();
  redirect("/admin/categories");
}
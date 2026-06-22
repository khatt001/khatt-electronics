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

function getBrandFormData(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    slug: String(formData.get("slug") ?? "").trim(),
    website_url: String(formData.get("website_url") ?? "").trim(),
  };
}

function redirectWithBrandError(message: string): never {
  redirect(`/admin/brands?error=${encodeURIComponent(message)}`);
}

function revalidateBrandPaths() {
  revalidatePath("/");
  revalidatePath("/en");
  revalidatePath("/ru");

  revalidatePath("/products");
  revalidatePath("/en/products");
  revalidatePath("/ru/products");

  revalidatePath("/admin/brands");
  revalidatePath("/admin/products");
  revalidatePath("/admin/products/new");
}

export async function createBrand(formData: FormData) {
  await requireAdmin();

  const parsed = brandSchema.safeParse(getBrandFormData(formData));

  if (!parsed.success) {
    redirectWithBrandError(
      parsed.error.issues[0]?.message ?? "Məlumatlar düzgün deyil.",
    );
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
    redirectWithBrandError(
      error.code === "23505"
        ? "Bu slug ilə brend artıq mövcuddur."
        : "Brend əlavə edilə bilmədi.",
    );
  }

  revalidateBrandPaths();
  redirect("/admin/brands");
}

export async function updateBrand(
  brandId: string,
  formData: FormData,
) {
  await requireAdmin();

  if (!brandId) {
    redirectWithBrandError("Brend ID tapılmadı.");
  }

  const parsed = brandSchema.safeParse(getBrandFormData(formData));

  if (!parsed.success) {
    redirectWithBrandError(
      parsed.error.issues[0]?.message ?? "Məlumatlar düzgün deyil.",
    );
  }

  const brand = parsed.data;
  const slug = normalizeSlug(brand.slug || brand.name);

  const { error } = await supabaseAdmin
    .from("brands")
    .update({
      name: brand.name,
      slug,
      website_url: brand.website_url || null,
    })
    .eq("id", brandId);

  if (error) {
    redirectWithBrandError(
      error.code === "23505"
        ? "Bu slug başqa brend tərəfindən istifadə olunur."
        : "Brend yenilənə bilmədi.",
    );
  }

  revalidateBrandPaths();
  redirect("/admin/brands");
}

export async function deleteBrand(brandId: string) {
  await requireAdmin();

  if (!brandId) {
    redirectWithBrandError("Brend ID tapılmadı.");
  }

  const { count, error: productError } = await supabaseAdmin
    .from("products")
    .select("id", {
      count: "exact",
      head: true,
    })
    .eq("brand_id", brandId);

  if (productError) {
    redirectWithBrandError(
      "Brendə bağlı məhsullar yoxlanıla bilmədi.",
    );
  }

  if ((count ?? 0) > 0) {
    redirectWithBrandError(
      `Bu brendə bağlı ${count} məhsul var. Əvvəlcə məhsulların brendini dəyişin.`,
    );
  }

  const { error } = await supabaseAdmin
    .from("brands")
    .delete()
    .eq("id", brandId);

  if (error) {
    redirectWithBrandError("Brend silinə bilmədi.");
  }

  revalidateBrandPaths();
  redirect("/admin/brands");
}

export async function toggleBrandStatus(
  brandId: string,
  isActive: boolean,
) {
  await requireAdmin();

  const { error } = await supabaseAdmin
    .from("brands")
    .update({
      is_active: !isActive,
    })
    .eq("id", brandId);

  if (error) {
    redirectWithBrandError(
      "Brend statusu dəyişdirilə bilmədi.",
    );
  }

  revalidateBrandPaths();
  redirect("/admin/brands");
}
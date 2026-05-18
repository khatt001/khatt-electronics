"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/services/admin";
import { supabaseAdmin } from "@/lib/supabase/admin";

const MAX_IMAGE_SIZE = 3 * 1024 * 1024;

const allowedImageTypes = ["image/jpeg", "image/png", "image/webp"];

const createProductSchema = z.object({
  name_az: z.string().min(2, "Məhsul adı minimum 2 simvol olmalıdır."),
  slug: z.string().min(2, "Slug minimum 2 simvol olmalıdır."),
  category_id: z.string().uuid("Kateqoriya seçilməlidir."),
  brand_id: z.string().uuid("Brend seçilməlidir.").optional().or(z.literal("")),
  short_description_az: z.string().optional(),
  description_az: z.string().optional(),
  price: z.string().optional(),
  price_visible: z.string().optional(),
  stock_status: z.enum(["in_stock", "out_of_stock", "pre_order"]),
  status: z.enum(["active", "draft", "archived"]),
  is_featured: z.string().optional(),
  seo_title_az: z.string().optional(),
  seo_description_az: z.string().optional(),
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

function getImageExtension(type: string) {
  if (type === "image/png") return "png";
  if (type === "image/webp") return "webp";
  return "jpg";
}

async function uploadProductImage(
  productId: string,
  slug: string,
  image: File,
  sortOrder: number
) {
  if (image.size === 0) return null;

  if (!allowedImageTypes.includes(image.type)) {
    throw new Error("Şəkil yalnız JPG, PNG və ya WEBP formatında olmalıdır.");
  }

  if (image.size > MAX_IMAGE_SIZE) {
    throw new Error("Hər şəkil maksimum 3MB ola bilər.");
  }

  const extension = getImageExtension(image.type);
  const filePath = `${productId}/${slug}-${Date.now()}-${sortOrder}.${extension}`;
  const arrayBuffer = await image.arrayBuffer();

  const { error: uploadError } = await supabaseAdmin.storage
    .from("product-images")
    .upload(filePath, arrayBuffer, {
      contentType: image.type,
      upsert: false,
    });

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const {
    data: { publicUrl },
  } = supabaseAdmin.storage.from("product-images").getPublicUrl(filePath);

  const { error: imageInsertError } = await supabaseAdmin
    .from("product_images")
    .insert({
      product_id: productId,
      url: publicUrl,
      alt_az: slug,
      sort_order: sortOrder,
      is_primary: sortOrder === 0,
    });

  if (imageInsertError) {
    throw new Error(imageInsertError.message);
  }

  return publicUrl;
}

export async function createProduct(formData: FormData) {
  await requireAdmin();

  const rawData = {
    name_az: String(formData.get("name_az") ?? ""),
    slug: String(formData.get("slug") ?? ""),
    category_id: String(formData.get("category_id") ?? ""),
    brand_id: String(formData.get("brand_id") ?? ""),
    short_description_az: String(formData.get("short_description_az") ?? ""),
    description_az: String(formData.get("description_az") ?? ""),
    price: String(formData.get("price") ?? ""),
    price_visible: String(formData.get("price_visible") ?? ""),
    stock_status: String(formData.get("stock_status") ?? "in_stock"),
    status: String(formData.get("status") ?? "draft"),
    is_featured: String(formData.get("is_featured") ?? ""),
    seo_title_az: String(formData.get("seo_title_az") ?? ""),
    seo_description_az: String(formData.get("seo_description_az") ?? ""),
  };

  const parsed = createProductSchema.safeParse(rawData);

  if (!parsed.success) {
    const message = encodeURIComponent(
      parsed.error.issues[0]?.message ?? "Məlumatlar düzgün deyil."
    );

    redirect(`/admin/products/new?error=${message}`);
  }

  const product = parsed.data;
  const slug = normalizeSlug(product.slug || product.name_az);

  const price =
    product.price && product.price.trim() !== "" ? Number(product.price) : null;

  if (price !== null && Number.isNaN(price)) {
    redirect(
      `/admin/products/new?error=${encodeURIComponent(
        "Qiymət düzgün formatda deyil."
      )}`
    );
  }

  const { data: createdProduct, error } = await supabaseAdmin
    .from("products")
    .insert({
      name_az: product.name_az.trim(),
      slug,
      category_id: product.category_id,
      brand_id: product.brand_id || null,
      short_description_az: product.short_description_az || null,
      description_az: product.description_az || null,
      price,
      price_visible: product.price_visible === "on",
      stock_status: product.stock_status,
      status: product.status,
      is_featured: product.is_featured === "on",
      seo_title_az: product.seo_title_az || product.name_az,
      seo_description_az:
        product.seo_description_az || product.short_description_az || null,
    })
    .select("id")
    .single();

  if (error || !createdProduct) {
    const message = encodeURIComponent(error?.message ?? "Məhsul yaradılmadı.");
    redirect(`/admin/products/new?error=${message}`);
  }

const images = formData
  .getAll("images")
  .filter((image): image is File => image instanceof File && image.size > 0);

if (images.length > 8) {
  redirect(
    `/admin/products/new?error=${encodeURIComponent(
      "Maksimum 8 şəkil əlavə etmək olar."
    )}`
  );
}

if (images.length > 0) {
  try {
    await Promise.all(
      images.map((image, index) =>
        uploadProductImage(createdProduct.id, slug, image, index)
      )
    );
  } catch (uploadError) {
    const message =
      uploadError instanceof Error
        ? uploadError.message
        : "Şəkillər yüklənmədi.";

    redirect(`/admin/products/new?error=${encodeURIComponent(message)}`);
  }
}

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath(`/products/${slug}`);
  revalidatePath("/admin/products");

  redirect("/admin/products");
}
export async function updateProduct(productId: string, formData: FormData) {
  await requireAdmin();

  const rawData = {
    name_az: String(formData.get("name_az") ?? ""),
    slug: String(formData.get("slug") ?? ""),
    category_id: String(formData.get("category_id") ?? ""),
    brand_id: String(formData.get("brand_id") ?? ""),
    short_description_az: String(formData.get("short_description_az") ?? ""),
    description_az: String(formData.get("description_az") ?? ""),
    price: String(formData.get("price") ?? ""),
    price_visible: String(formData.get("price_visible") ?? ""),
    stock_status: String(formData.get("stock_status") ?? "in_stock"),
    status: String(formData.get("status") ?? "draft"),
    is_featured: String(formData.get("is_featured") ?? ""),
    seo_title_az: String(formData.get("seo_title_az") ?? ""),
    seo_description_az: String(formData.get("seo_description_az") ?? ""),
  };

  const parsed = createProductSchema.safeParse(rawData);

  if (!parsed.success) {
    const message = encodeURIComponent(
      parsed.error.issues[0]?.message ?? "Məlumatlar düzgün deyil."
    );

    redirect(`/admin/products/${productId}/edit?error=${message}`);
  }

  const product = parsed.data;
  const slug = normalizeSlug(product.slug || product.name_az);

  const price =
    product.price && product.price.trim() !== "" ? Number(product.price) : null;

  if (price !== null && Number.isNaN(price)) {
    redirect(
      `/admin/products/${productId}/edit?error=${encodeURIComponent(
        "Qiymət düzgün formatda deyil."
      )}`
    );
  }

  const { error } = await supabaseAdmin
    .from("products")
    .update({
      name_az: product.name_az.trim(),
      slug,
      category_id: product.category_id,
      brand_id: product.brand_id || null,
      short_description_az: product.short_description_az || null,
      description_az: product.description_az || null,
      price,
      price_visible: product.price_visible === "on",
      stock_status: product.stock_status,
      status: product.status,
      is_featured: product.is_featured === "on",
      seo_title_az: product.seo_title_az || product.name_az,
      seo_description_az:
        product.seo_description_az || product.short_description_az || null,
    })
    .eq("id", productId);

  if (error) {
    const message = encodeURIComponent(error.message);
    redirect(`/admin/products/${productId}/edit?error=${message}`);
  }

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath(`/products/${slug}`);
  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${productId}/edit`);

  redirect("/admin/products");
}
export async function archiveProduct(productId: string) {
  await requireAdmin();

  const { data: product, error: fetchError } = await supabaseAdmin
    .from("products")
    .select("slug")
    .eq("id", productId)
    .maybeSingle<{ slug: string }>();

  if (fetchError || !product) {
    redirect("/admin/products");
  }

  const { error } = await supabaseAdmin
    .from("products")
    .update({
      status: "archived",
      is_featured: false,
    })
    .eq("id", productId);

  if (error) {
    redirect(
      `/admin/products?error=${encodeURIComponent(
        "Məhsul arxiv edilə bilmədi."
      )}`
    );
  }

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath(`/products/${product.slug}`);
  revalidatePath("/admin/products");

  redirect("/admin/products");
}
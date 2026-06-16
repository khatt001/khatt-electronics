"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/services/admin";
import { supabaseAdmin } from "@/lib/supabase/admin";

const MAX_IMAGE_SIZE = 3 * 1024 * 1024;

const allowedImageTypes = ["image/jpeg", "image/png", "image/webp"];

const productSchema = z.object({
  name_az: z.string().min(2, "Məhsul adı minimum 2 simvol olmalıdır."),
  name_en: z.string().optional(),
  name_ru: z.string().optional(),
  slug: z.string().optional(),
  category_id: z.string().uuid("Kateqoriya seçilməlidir."),
  brand_id: z.string().uuid("Brend seçilməlidir.").optional().or(z.literal("")),
  short_description_az: z.string().optional(),
  short_description_en: z.string().optional(),
  short_description_ru: z.string().optional(),
  description_az: z.string().optional(),
  description_en: z.string().optional(),
  description_ru: z.string().optional(),
  price: z.string().optional(),
  price_visible: z.string().optional(),
  stock_status: z.enum(["in_stock", "out_of_stock", "pre_order"]),
  stock_quantity: z.coerce
    .number()
    .int("Stok sayı tam rəqəm olmalıdır.")
    .min(0, "Stok sayı mənfi ola bilməz."),
  status: z.enum(["active", "draft", "archived"]),
  is_featured: z.string().optional(),
  seo_title_az: z.string().optional(),
  seo_title_en: z.string().optional(),
  seo_title_ru: z.string().optional(),
  seo_description_az: z.string().optional(),
  seo_description_en: z.string().optional(),
  seo_description_ru: z.string().optional(),
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

function createSeoTitle(name: string, brand?: string | null) {
  const cleanName = name.trim();
  const cleanBrand = brand?.trim();

  if (
    cleanBrand &&
    !cleanName.toLowerCase().includes(cleanBrand.toLowerCase())
  ) {
    return `${cleanName} | ${cleanBrand} | KHATT Electronics`;
  }

  return `${cleanName} | KHATT Electronics`;
}

function createSeoDescription({
  name,
  category,
  brand,
  shortDescription,
}: {
  name: string;
  category?: string | null;
  brand?: string | null;
  shortDescription?: string | null;
}) {
  if (shortDescription && shortDescription.trim().length > 20) {
    return shortDescription.trim().slice(0, 155);
  }

  const parts = [brand?.trim(), name.trim(), category?.trim()].filter(Boolean);

  return `${parts.join(
    " ",
  )} üçün KHATT Electronics-də peşəkar seçim, texniki məsləhət və qiymət təklifi imkanı.`;
}

function createShortDescription({
  name,
  category,
  brand,
}: {
  name: string;
  category?: string | null;
  brand?: string | null;
}) {
  const parts = [brand?.trim(), name.trim()].filter(Boolean).join(" ");

  if (category) {
    return `${parts} — ${category} üçün peşəkar məhsul. Texniki seçim və qiymət təklifi üçün sorğu göndərə bilərsiniz.`;
  }

  return `${parts} — peşəkar elektronika və təhlükəsizlik həlli. Texniki seçim və qiymət təklifi üçün sorğu göndərə bilərsiniz.`;
}

function createDescription({
  name,
  category,
  brand,
  shortDescription,
}: {
  name: string;
  category?: string | null;
  brand?: string | null;
  shortDescription?: string | null;
}) {
  if (shortDescription && shortDescription.trim().length > 0) {
    return shortDescription.trim();
  }

  const productName = [brand?.trim(), name.trim()].filter(Boolean).join(" ");

  return `${productName} KHATT Electronics tərəfindən təqdim olunan peşəkar məhsullardan biridir. Bu məhsul ${
    category ?? "elektronika və təhlükəsizlik"
  } layihələrində istifadə üçün uyğundur. Məhsul haqqında əlavə məlumat, uyğun avadanlıq seçimi və qiymət təklifi üçün sorğu göndərə bilərsiniz.`;
}

async function getCategoryName(categoryId: string) {
  const { data } = await supabaseAdmin
    .from("categories")
    .select("name_az")
    .eq("id", categoryId)
    .maybeSingle()
    .returns<{ name_az: string } | null>();

  return data?.name_az ?? null;
}

async function getBrandName(brandId?: string | null) {
  if (!brandId) return null;

  const { data } = await supabaseAdmin
    .from("brands")
    .select("name")
    .eq("id", brandId)
    .maybeSingle()
    .returns<{ name: string } | null>();

  return data?.name ?? null;
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
  sortOrder: number,
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

function getProductFormData(formData: FormData) {
  return {
    name_az: String(formData.get("name_az") ?? ""),
    name_en: String(formData.get("name_en") ?? ""),
    name_ru: String(formData.get("name_ru") ?? ""),
    slug: String(formData.get("slug") ?? ""),
    category_id: String(formData.get("category_id") ?? ""),
    brand_id: String(formData.get("brand_id") ?? ""),
    short_description_az: String(formData.get("short_description_az") ?? ""),
    short_description_en: String(formData.get("short_description_en") ?? ""),
    short_description_ru: String(formData.get("short_description_ru") ?? ""),
    description_az: String(formData.get("description_az") ?? ""),
    description_en: String(formData.get("description_en") ?? ""),
    description_ru: String(formData.get("description_ru") ?? ""),
    price: String(formData.get("price") ?? ""),
    price_visible: String(formData.get("price_visible") ?? ""),
    stock_status: String(formData.get("stock_status") ?? "in_stock"),
    stock_quantity: String(formData.get("stock_quantity") ?? "0"),
    status: String(formData.get("status") ?? "draft"),
    is_featured: String(formData.get("is_featured") ?? ""),
    seo_title_az: String(formData.get("seo_title_az") ?? ""),
    seo_title_en: String(formData.get("seo_title_en") ?? ""),
    seo_title_ru: String(formData.get("seo_title_ru") ?? ""),
    seo_description_az: String(formData.get("seo_description_az") ?? ""),
    seo_description_en: String(formData.get("seo_description_en") ?? ""),
    seo_description_ru: String(formData.get("seo_description_ru") ?? ""),
  };
}

function getProductPayload({
  formData,
  product,
  slug,
  price,
  autoShortDescription,
  autoDescription,
  autoSeoTitle,
  autoSeoDescription,
}: {
  formData: FormData;
  product: z.infer<typeof productSchema>;
  slug: string;
  price: number | null;
  autoShortDescription: string;
  autoDescription: string;
  autoSeoTitle: string;
  autoSeoDescription: string;
}) {
  return {
    name_az: product.name_az.trim(),
    name_en: getOptionalFormValue(formData, "name_en"),
    name_ru: getOptionalFormValue(formData, "name_ru"),
    slug,
    category_id: product.category_id,
    brand_id: product.brand_id || null,
    short_description_az: autoShortDescription,
    short_description_en: getOptionalFormValue(
      formData,
      "short_description_en",
    ),
    short_description_ru: getOptionalFormValue(
      formData,
      "short_description_ru",
    ),
    description_az: autoDescription,
    description_en: getOptionalFormValue(formData, "description_en"),
    description_ru: getOptionalFormValue(formData, "description_ru"),
    price,
    price_visible: product.price_visible === "on",
    stock_status: product.stock_status,
    stock_quantity:
      product.stock_status === "in_stock" ? product.stock_quantity : 0,
    status: product.status,
    is_featured: product.is_featured === "on",
    seo_title_az: autoSeoTitle,
    seo_title_en: getOptionalFormValue(formData, "seo_title_en"),
    seo_title_ru: getOptionalFormValue(formData, "seo_title_ru"),
    seo_description_az: autoSeoDescription,
    seo_description_en: getOptionalFormValue(formData, "seo_description_en"),
    seo_description_ru: getOptionalFormValue(formData, "seo_description_ru"),
  };
}

function revalidateProductPaths(slug?: string | null) {
  revalidatePath("/");
  revalidatePath("/en");
  revalidatePath("/ru");

  revalidatePath("/products");
  revalidatePath("/en/products");
  revalidatePath("/ru/products");

  if (slug) {
    revalidatePath(`/products/${slug}`);
    revalidatePath(`/en/products/${slug}`);
    revalidatePath(`/ru/products/${slug}`);
  }

  revalidatePath("/admin/products");
}

async function parseProductForm({
  formData,
  errorPath,
}: {
  formData: FormData;
  errorPath: string;
}) {
  const rawData = getProductFormData(formData);
  const parsed = productSchema.safeParse(rawData);

  if (!parsed.success) {
    const message = encodeURIComponent(
      parsed.error.issues[0]?.message ?? "Məlumatlar düzgün deyil.",
    );

    redirect(`${errorPath}?error=${message}`);
  }

  const product = parsed.data;

  const categoryName = await getCategoryName(product.category_id);
  const brandName = await getBrandName(product.brand_id || null);
  const slug = normalizeSlug(product.slug?.trim() || product.name_az);

  const autoShortDescription =
    product.short_description_az?.trim() ||
    createShortDescription({
      name: product.name_az,
      category: categoryName,
      brand: brandName,
    });

  const autoDescription =
    product.description_az?.trim() ||
    createDescription({
      name: product.name_az,
      category: categoryName,
      brand: brandName,
      shortDescription: autoShortDescription,
    });

  const autoSeoTitle =
    product.seo_title_az?.trim() || createSeoTitle(product.name_az, brandName);

  const autoSeoDescription =
    product.seo_description_az?.trim() ||
    createSeoDescription({
      name: product.name_az,
      category: categoryName,
      brand: brandName,
      shortDescription: autoShortDescription,
    });

  const price =
    product.price && product.price.trim() !== "" ? Number(product.price) : null;

  if (price !== null && Number.isNaN(price)) {
    redirect(
      `${errorPath}?error=${encodeURIComponent(
        "Qiymət düzgün formatda deyil.",
      )}`,
    );
  }

  return {
    product,
    slug,
    price,
    autoShortDescription,
    autoDescription,
    autoSeoTitle,
    autoSeoDescription,
  };
}

async function uploadProductImagesFromForm({
  formData,
  productId,
  slug,
  currentImageCount = 0,
  errorPath,
}: {
  formData: FormData;
  productId: string;
  slug: string;
  currentImageCount?: number;
  errorPath: string;
}) {
  const images = formData
    .getAll("images")
    .filter((image): image is File => image instanceof File && image.size > 0);

  if (images.length > 8) {
    redirect(
      `${errorPath}?error=${encodeURIComponent(
        "Bir dəfəyə maksimum 8 şəkil əlavə etmək olar.",
      )}`,
    );
  }

  if (currentImageCount + images.length > 8) {
    redirect(
      `${errorPath}?error=${encodeURIComponent(
        "Bir məhsul üçün maksimum 8 şəkil ola bilər.",
      )}`,
    );
  }

  if (images.length === 0) return;

  try {
    await Promise.all(
      images.map((image, index) =>
        uploadProductImage(productId, slug, image, currentImageCount + index),
      ),
    );
  } catch (uploadError) {
    const message =
      uploadError instanceof Error
        ? uploadError.message
        : "Şəkillər yüklənmədi.";

    redirect(`${errorPath}?error=${encodeURIComponent(message)}`);
  }
}

export async function createProduct(formData: FormData) {
  await requireAdmin();

  const errorPath = "/admin/products/new";
  const parsedForm = await parseProductForm({ formData, errorPath });

  const { data: createdProduct, error } = await supabaseAdmin
    .from("products")
    .insert(
      getProductPayload({
        formData,
        ...parsedForm,
      }),
    )
    .select("id")
    .single();

  if (error || !createdProduct) {
    const message = encodeURIComponent(error?.message ?? "Məhsul yaradılmadı.");
    redirect(`${errorPath}?error=${message}`);
  }

  await uploadProductImagesFromForm({
    formData,
    productId: createdProduct.id,
    slug: parsedForm.slug,
    errorPath,
  });

  revalidateProductPaths(parsedForm.slug);

  redirect("/admin/products");
}

export async function updateProduct(productId: string, formData: FormData) {
  await requireAdmin();

  const errorPath = `/admin/products/${productId}/edit`;
  const parsedForm = await parseProductForm({ formData, errorPath });

  const { error } = await supabaseAdmin
    .from("products")
    .update(
      getProductPayload({
        formData,
        ...parsedForm,
      }),
    )
    .eq("id", productId);

  if (error) {
    const message = encodeURIComponent(error.message);
    redirect(`${errorPath}?error=${message}`);
  }

  const { count } = await supabaseAdmin
    .from("product_images")
    .select("id", { count: "exact", head: true })
    .eq("product_id", productId);

  await uploadProductImagesFromForm({
    formData,
    productId,
    slug: parsedForm.slug,
    currentImageCount: count ?? 0,
    errorPath,
  });

  revalidateProductPaths(parsedForm.slug);
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
        "Məhsul arxiv edilə bilmədi.",
      )}`,
    );
  }

  revalidateProductPaths(product.slug);

  redirect("/admin/products");
}

function getStoragePathFromPublicUrl(url: string) {
  const marker = "/storage/v1/object/public/product-images/";
  const index = url.indexOf(marker);

  if (index === -1) {
    return null;
  }

  return url.slice(index + marker.length);
}

export async function deleteProductImage(productId: string, imageId: string) {
  await requireAdmin();

  const { data: image, error: fetchError } = await supabaseAdmin
    .from("product_images")
    .select("id, url, is_primary")
    .eq("id", imageId)
    .eq("product_id", productId)
    .maybeSingle<{
      id: string;
      url: string;
      is_primary: boolean;
    }>();

  if (fetchError || !image) {
    redirect(
      `/admin/products/${productId}/edit?error=${encodeURIComponent(
        "Şəkil tapılmadı.",
      )}`,
    );
  }

  const storagePath = getStoragePathFromPublicUrl(image.url);

  if (storagePath) {
    await supabaseAdmin.storage.from("product-images").remove([storagePath]);
  }

  const { error: deleteError } = await supabaseAdmin
    .from("product_images")
    .delete()
    .eq("id", imageId)
    .eq("product_id", productId);

  if (deleteError) {
    redirect(
      `/admin/products/${productId}/edit?error=${encodeURIComponent(
        "Şəkil silinə bilmədi.",
      )}`,
    );
  }

  if (image.is_primary) {
    const { data: nextImage } = await supabaseAdmin
      .from("product_images")
      .select("id")
      .eq("product_id", productId)
      .order("sort_order", { ascending: true })
      .limit(1)
      .maybeSingle<{ id: string }>();

    if (nextImage) {
      await supabaseAdmin
        .from("product_images")
        .update({ is_primary: true })
        .eq("id", nextImage.id);
    }
  }

  const { data: product } = await supabaseAdmin
    .from("products")
    .select("slug")
    .eq("id", productId)
    .maybeSingle<{ slug: string }>();

  revalidateProductPaths(product?.slug);
  revalidatePath(`/admin/products/${productId}/edit`);

  redirect(`/admin/products/${productId}/edit`);
}

export async function setPrimaryProductImage(
  productId: string,
  imageId: string,
) {
  await requireAdmin();

  const { data: selectedImage, error: selectedImageError } = await supabaseAdmin
    .from("product_images")
    .select("id")
    .eq("id", imageId)
    .eq("product_id", productId)
    .maybeSingle<{ id: string }>();

  if (selectedImageError || !selectedImage) {
    redirect(
      `/admin/products/${productId}/edit?error=${encodeURIComponent(
        "Şəkil tapılmadı.",
      )}`,
    );
  }

  const { data: product } = await supabaseAdmin
    .from("products")
    .select("slug")
    .eq("id", productId)
    .maybeSingle<{ slug: string }>();

  await supabaseAdmin
    .from("product_images")
    .update({ is_primary: false })
    .eq("product_id", productId);

  const { error } = await supabaseAdmin
    .from("product_images")
    .update({ is_primary: true, sort_order: 0 })
    .eq("id", imageId)
    .eq("product_id", productId);

  if (error) {
    redirect(
      `/admin/products/${productId}/edit?error=${encodeURIComponent(
        "Əsas şəkil dəyişdirilə bilmədi.",
      )}`,
    );
  }

  revalidateProductPaths(product?.slug);
  revalidatePath(`/admin/products/${productId}/edit`, "page");

  redirect(`/admin/products/${productId}/edit`);
}

export async function addProductSpecification(
  productId: string,
  formData: FormData,
) {
  await requireAdmin();

  const specKeyAz = String(formData.get("spec_key_az") ?? "").trim();
  const specKeyEn = getOptionalFormValue(formData, "spec_key_en");
  const specKeyRu = getOptionalFormValue(formData, "spec_key_ru");

  const specValueAz = String(formData.get("spec_value_az") ?? "").trim();
  const specValueEn = getOptionalFormValue(formData, "spec_value_en");
  const specValueRu = getOptionalFormValue(formData, "spec_value_ru");

  if (!specKeyAz || !specValueAz) {
    redirect(
      `/admin/products/${productId}/edit?error=${encodeURIComponent(
        "Texniki göstərici üçün AZ açar və AZ dəyər yazılmalıdır.",
      )}`,
    );
  }

  const { data: product } = await supabaseAdmin
    .from("products")
    .select("slug")
    .eq("id", productId)
    .maybeSingle<{ slug: string }>();

  const { count } = await supabaseAdmin
    .from("product_specifications")
    .select("id", { count: "exact", head: true })
    .eq("product_id", productId);

  const sortOrder = count ?? 0;

  const { error } = await supabaseAdmin.from("product_specifications").insert({
    product_id: productId,
    spec_key_az: specKeyAz,
    spec_key_en: specKeyEn,
    spec_key_ru: specKeyRu,
    spec_value_az: specValueAz,
    spec_value_en: specValueEn,
    spec_value_ru: specValueRu,
    sort_order: sortOrder,
  });

  if (error) {
    redirect(
      `/admin/products/${productId}/edit?error=${encodeURIComponent(
        "Texniki göstərici əlavə edilmədi.",
      )}`,
    );
  }

  revalidateProductPaths(product?.slug);
  revalidatePath(`/admin/products/${productId}/edit`);

  redirect(`/admin/products/${productId}/edit`);
}

export async function deleteProductSpecification(
  productId: string,
  specificationId: string,
) {
  await requireAdmin();

  const { data: product } = await supabaseAdmin
    .from("products")
    .select("slug")
    .eq("id", productId)
    .maybeSingle<{ slug: string }>();

  const { error } = await supabaseAdmin
    .from("product_specifications")
    .delete()
    .eq("id", specificationId)
    .eq("product_id", productId);

  if (error) {
    redirect(
      `/admin/products/${productId}/edit?error=${encodeURIComponent(
        "Texniki göstərici silinə bilmədi.",
      )}`,
    );
  }

  revalidateProductPaths(product?.slug);
  revalidatePath(`/admin/products/${productId}/edit`);

  redirect(`/admin/products/${productId}/edit`);
}

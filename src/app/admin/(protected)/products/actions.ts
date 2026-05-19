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
    slug: z.string().optional(),
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
function createSeoTitle(name: string, brand?: string | null) {
    const cleanName = name.trim();
    const cleanBrand = brand?.trim();

    if (cleanBrand && !cleanName.toLowerCase().includes(cleanBrand.toLowerCase())) {
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

    const parts = [
        brand?.trim(),
        name.trim(),
        category?.trim(),
    ].filter(Boolean);

    return `${parts.join(" ")} üçün KHATT Electronics-də peşəkar seçim, texniki məsləhət və qiymət təklifi imkanı.`;
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

    return `${productName} KHATT Electronics tərəfindən təqdim olunan peşəkar məhsullardan biridir. Bu məhsul ${category ?? "elektronika və təhlükəsizlik"} layihələrində istifadə üçün uyğundur. Məhsul haqqında əlavə məlumat, uyğun avadanlıq seçimi və qiymət təklifi üçün sorğu göndərə bilərsiniz.`;
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
            short_description_az: autoShortDescription,
            description_az: autoDescription,
            price,
            price_visible: product.price_visible === "on",
            stock_status: product.stock_status,
            status: product.status,
            is_featured: product.is_featured === "on",
            seo_title_az: autoSeoTitle,
            seo_description_az: autoSeoDescription,
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
            short_description_az: autoShortDescription,
            description_az: autoDescription,
            seo_title_az: autoSeoTitle,
            seo_description_az: autoSeoDescription,
            price,
            price_visible: product.price_visible === "on",
            stock_status: product.stock_status,
            status: product.status,
            is_featured: product.is_featured === "on",
        })
        .eq("id", productId);

    if (error) {
        const message = encodeURIComponent(error.message);
        redirect(`/admin/products/${productId}/edit?error=${message}`);
    }

    const images = formData
        .getAll("images")
        .filter((image): image is File => image instanceof File && image.size > 0);

    if (images.length > 8) {
        redirect(
            `/admin/products/${productId}/edit?error=${encodeURIComponent(
                "Bir dəfəyə maksimum 8 şəkil əlavə etmək olar."
            )}`
        );
    }

    if (images.length > 0) {
        const { count } = await supabaseAdmin
            .from("product_images")
            .select("id", { count: "exact", head: true })
            .eq("product_id", productId);

        const currentImageCount = count ?? 0;

        if (currentImageCount + images.length > 8) {
            redirect(
                `/admin/products/${productId}/edit?error=${encodeURIComponent(
                    "Bir məhsul üçün maksimum 8 şəkil ola bilər."
                )}`
            );
        }

        try {
            await Promise.all(
                images.map((image, index) =>
                    uploadProductImage(productId, slug, image, currentImageCount + index)
                )
            );
        } catch (uploadError) {
            const message =
                uploadError instanceof Error
                    ? uploadError.message
                    : "Şəkillər yüklənmədi.";

            redirect(
                `/admin/products/${productId}/edit?error=${encodeURIComponent(message)}`
            );
        }
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
        redirect(`/admin/products/${productId}/edit?error=${encodeURIComponent("Şəkil tapılmadı.")}`);
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
                "Şəkil silinə bilmədi."
            )}`
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

    revalidatePath("/");
    revalidatePath("/products");
    if (product?.slug) {
        revalidatePath(`/products/${product.slug}`);
    }
    revalidatePath("/admin/products");
    revalidatePath(`/admin/products/${productId}/edit`);

    redirect(`/admin/products/${productId}/edit`);
}
export async function setPrimaryProductImage(productId: string, imageId: string) {
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
                "Şəkil tapılmadı."
            )}`
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
                "Əsas şəkil dəyişdirilə bilmədi."
            )}`
        );
    }

    revalidatePath("/", "layout");
    revalidatePath("/products", "page");
    if (product?.slug) {
        revalidatePath(`/products/${product.slug}`, "page");
    }
    revalidatePath("/admin/products", "page");
    revalidatePath(`/admin/products/${productId}/edit`, "page");

    redirect(`/admin/products/${productId}/edit`);
}
export async function addProductSpecification(
    productId: string,
    formData: FormData
) {
    await requireAdmin();

    const specKey = String(formData.get("spec_key_az") ?? "").trim();
    const specValue = String(formData.get("spec_value_az") ?? "").trim();

    if (!specKey || !specValue) {
        redirect(
            `/admin/products/${productId}/edit?error=${encodeURIComponent(
                "Texniki göstərici üçün həm açar, həm də dəyər yazılmalıdır."
            )}`
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
        spec_key_az: specKey,
        spec_value_az: specValue,
        sort_order: sortOrder,
    });

    if (error) {
        redirect(
            `/admin/products/${productId}/edit?error=${encodeURIComponent(
                "Texniki göstərici əlavə edilmədi."
            )}`
        );
    }

    revalidatePath("/");
    revalidatePath("/products");
    if (product?.slug) {
        revalidatePath(`/products/${product.slug}`);
    }
    revalidatePath("/admin/products");
    revalidatePath(`/admin/products/${productId}/edit`);

    redirect(`/admin/products/${productId}/edit`);
}

export async function deleteProductSpecification(
    productId: string,
    specificationId: string
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
                "Texniki göstərici silinə bilmədi."
            )}`
        );
    }

    revalidatePath("/");
    revalidatePath("/products");
    if (product?.slug) {
        revalidatePath(`/products/${product.slug}`);
    }
    revalidatePath("/admin/products");
    revalidatePath(`/admin/products/${productId}/edit`);

    redirect(`/admin/products/${productId}/edit`);
}
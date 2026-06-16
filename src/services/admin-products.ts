import "server-only";
import { supabaseAdmin } from "@/lib/supabase/admin";

export type AdminProductListItem = {
  id: string;
  name: string;
  slug: string;
  category: string;
  brand: string | null;
  status: string;
  stockStatus: string;
  stockQuantity: number;
  isFeatured: boolean;
  price: string;
  createdAt: string;
};

type AdminProductRow = {
  id: string;
  name_az: string;
  slug: string;
  price: number | string | null;
  price_visible: boolean;
  status: string;
  stock_status: string;
  stock_quantity: number | null;
  is_featured: boolean;
  created_at: string;
  category: {
    name_az: string;
  } | null;
  brand: {
    name: string;
  } | null;
};

function formatPrice(priceVisible: boolean, price: number | string | null) {
  return priceVisible && price
    ? `${Number(price).toFixed(2)} AZN`
    : "Sorğu ilə";
}

export async function getAdminProducts(): Promise<AdminProductListItem[]> {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select(
      `
      id,
      name_az,
      slug,
      price,
      price_visible,
      status,
      stock_status,
      stock_quantity,
      is_featured,
      created_at,
      category:categories (
        name_az
      ),
      brand:brands (
        name
      )
    `,
    )
    .order("created_at", { ascending: false })
    .limit(100)
    .returns<AdminProductRow[]>();

  if (error) {
    console.error("Failed to fetch admin products:", error.message);
    return [];
  }

  return data.map((product) => ({
    id: product.id,
    name: product.name_az,
    slug: product.slug,
    category: product.category?.name_az ?? "Kateqoriya yoxdur",
    brand: product.brand?.name ?? null,
    status: product.status,
    stockStatus: product.stock_status,
    stockQuantity: product.stock_quantity ?? 0,
    isFeatured: product.is_featured,
    price: formatPrice(product.price_visible, product.price),
    createdAt: product.created_at,
  }));
}

export type AdminProductDetail = {
  id: string;
  name_az: string;
  name_en: string | null;
  name_ru: string | null;
  slug: string;
  category_id: string;
  brand_id: string | null;
  short_description_az: string | null;
  short_description_en: string | null;
  short_description_ru: string | null;
  description_az: string | null;
  description_en: string | null;
  description_ru: string | null;
  price: number | string | null;
  price_visible: boolean;
  stock_status: string;
  stock_quantity: number | null;
  status: string;
  is_featured: boolean;
  seo_title_az: string | null;
  seo_title_en: string | null;
  seo_title_ru: string | null;
  seo_description_az: string | null;
  seo_description_en: string | null;
  seo_description_ru: string | null;
  images: {
    id: string;
    url: string;
    alt_az: string | null;
    is_primary: boolean;
    sort_order: number;
  }[];
  specifications: {
    id: string;
    spec_key_az: string;
    spec_key_en: string | null;
    spec_key_ru: string | null;
    spec_value_az: string;
    spec_value_en: string | null;
    spec_value_ru: string | null;
    sort_order: number;
  }[];
};

type AdminProductDetailRow = AdminProductDetail;

export async function getAdminProductById(
  id: string,
): Promise<AdminProductDetail | null> {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select(
      `
      id,
      name_az,
      name_en,
      name_ru,
      slug,
      category_id,
      brand_id,
      short_description_az,
      short_description_en,
      short_description_ru,
      description_az,
      description_en,
      description_ru,
      price,
      price_visible,
      stock_status,
      stock_quantity,
      status,
      is_featured,
      seo_title_az,
      seo_title_en,
      seo_title_ru,
      seo_description_az,
      seo_description_en,
      seo_description_ru,
      images:product_images (
        id,
        url,
        alt_az,
        is_primary,
        sort_order
      ),
      specifications:product_specifications (
        id,
        spec_key_az,
        spec_key_en,
        spec_key_ru,
        spec_value_az,
        spec_value_en,
        spec_value_ru,
        sort_order
      )
    `,
    )
    .eq("id", id)
    .maybeSingle()
    .returns<AdminProductDetailRow | null>();

  if (error) {
    console.error("Failed to fetch admin product:", error.message);
    return null;
  }

  return data;
}

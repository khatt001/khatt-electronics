import "server-only";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { ProductCardItem } from "@/services/products";

export type CatalogCategory = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
};

type CatalogCategoryRow = {
  id: string;
  name_az: string;
  slug: string;
  description_az: string | null;
};

type CategoryDetailRow = {
  id: string;
  name_az: string;
  slug: string;
  description_az: string | null;
  seo_title: string | null;
  seo_description: string | null;
};

type CategoryProductRow = {
  id: string;
  name_az: string;
  slug: string;
  price: number | string | null;
  price_visible: boolean;
  stock_status: "in_stock" | "out_of_stock" | "pre_order";
  stock_quantity: number | null;
  category: {
    name_az: string;
  } | null;
  brand: {
    name: string;
  } | null;
  images: {
    url: string;
    is_primary: boolean;
  }[];
};

export type CategoryDetail = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
};

function formatPrice(priceVisible: boolean, price: number | string | null) {
  return priceVisible && price
    ? `${Number(price).toFixed(2)} AZN`
    : "Qiymət sorğu ilə";
}

function formatBadge(stockStatus: CategoryProductRow["stock_status"]) {
  if (stockStatus === "in_stock") return "Stokda var";
  if (stockStatus === "pre_order") return "Öncədən sifariş";
  return "Stokda yoxdur";
}

function getPrimaryImage(images: CategoryProductRow["images"]) {
  const sortedImages = [...(images ?? [])].sort((a, b) => {
    if (a.is_primary && !b.is_primary) return -1;
    if (!a.is_primary && b.is_primary) return 1;
    return 0;
  });

  return sortedImages[0]?.url ?? null;
}

function formatProduct(product: CategoryProductRow): ProductCardItem {
  const priceAmount =
    product.price_visible && product.price !== null
      ? Number(product.price)
      : null;

  return {
    id: product.id,
    name: product.name_az,
    slug: product.slug,
    category: product.category?.name_az ?? "Məhsul",
    brand: product.brand?.name ?? null,
    price: formatPrice(product.price_visible, product.price),
    priceAmount: Number.isFinite(priceAmount) ? priceAmount : null,
    stockStatus: product.stock_status,
    stockQuantity: product.stock_quantity ?? 0,
    badge: formatBadge(product.stock_status),
    href: `/products/${product.slug}`,
    imageUrl: getPrimaryImage(product.images ?? []),
  };
}

export async function getCatalogCategories(): Promise<CatalogCategory[]> {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("categories")
    .select("id, name_az, slug, description_az")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .returns<CatalogCategoryRow[]>();

  if (error || !data) {
    console.error("Failed to fetch categories:", error?.message);
    return [];
  }

  return data.map((category) => ({
    id: category.id,
    name: category.name_az,
    slug: category.slug,
    description: category.description_az,
  }));
}

export async function getCategoryBySlug(
  slug: string
): Promise<CategoryDetail | null> {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("categories")
    .select("id, name_az, slug, description_az, seo_title, seo_description")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle()
    .returns<CategoryDetailRow | null>();

  if (error || !data) {
    return null;
  }

  return {
    id: data.id,
    name: data.name_az,
    slug: data.slug,
    description: data.description_az,
    seoTitle: data.seo_title,
    seoDescription: data.seo_description,
  };
}

export async function getCategoryProducts(
  categoryId: string
): Promise<ProductCardItem[]> {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id,
      name_az,
      slug,
      price,
      price_visible,
      stock_status,
      stock_quantity,
      category:categories (
        name_az
      ),
      brand:brands (
        name
      ),
      images:product_images (
        url,
        is_primary
      )
    `
    )
    .eq("category_id", categoryId)
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .returns<CategoryProductRow[]>();

  if (error || !data) {
    return [];
  }

  return data.map(formatProduct);
}

export async function getCategorySlugs(): Promise<string[]> {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("categories")
    .select("slug")
    .eq("is_active", true)
    .returns<{ slug: string }[]>();

  if (error || !data) {
    return [];
  }

  return data.map((category) => category.slug);
}
import "server-only";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type ProductCardItem = {
  id: string;
  name: string;
  href: string;
  category: string;
  brand: string | null;
  badge: string;
  price: string;
  imageUrl: string | null;
};

export type ProductDetail = {
  id: string;
  name: string;
  slug: string;
  category: string;
  brand: string | null;
  shortDescription: string | null;
  description: string | null;
  price: string;
  badge: string;
  seoTitle: string | null;
  seoDescription: string | null;
  images: {
    id: string;
    url: string;
    alt: string | null;
    isPrimary: boolean;
  }[];
  specifications: {
    id: string;
    key: string;
    value: string;
  }[];
  downloads: {
    id: string;
    title: string;
    fileUrl: string;
  }[];
};

export type CatalogProductFilters = {
  search?: string;
  category?: string;
  brand?: string;
  stock?: string;
};

type ProductImageRow = {
  url: string;
  is_primary: boolean;
};

type ProductRow = {
  id: string;
  name_az: string;
  slug: string;
  price: number | string | null;
  price_visible: boolean;
  stock_status: string;
  is_featured: boolean;
  category: {
    name_az: string;
  } | null;
  brand: {
    name: string;
  } | null;
  images: ProductImageRow[];
};

type ProductDetailRow = {
  id: string;
  name_az: string;
  slug: string;
  short_description_az: string | null;
  description_az: string | null;
  price: number | string | null;
  price_visible: boolean;
  stock_status: string;
  seo_title_az: string | null;
  seo_description_az: string | null;
  category: {
    name_az: string;
  } | null;
  brand: {
    name: string;
  } | null;
  images: {
    id: string;
    url: string;
    alt_az: string | null;
    is_primary: boolean;
  }[];
  specifications: {
    id: string;
    spec_key_az: string;
    spec_value_az: string;
    sort_order: number;
  }[];
  downloads: {
    id: string;
    title_az: string;
    file_url: string;
    sort_order: number;
  }[];
};

function formatPrice(priceVisible: boolean, price: number | string | null) {
  if (!priceVisible || price === null || price === "") {
    return "Sorğu ilə";
  }

  return `${Number(price).toFixed(2)} AZN`;
}

function getStockBadge(stockStatus: string) {
  if (stockStatus === "in_stock") return "Stokda var";
  if (stockStatus === "out_of_stock") return "Stokda yoxdur";
  if (stockStatus === "pre_order") return "Öncədən sifariş";
  return "Sorğu ilə";
}

function sortImages<T extends { is_primary: boolean }>(images: T[]) {
  return [...images].sort((a, b) => {
    if (a.is_primary && !b.is_primary) return -1;
    if (!a.is_primary && b.is_primary) return 1;
    return 0;
  });
}

function getPrimaryImage(images: ProductRow["images"]) {
  const sortedImages = sortImages(images);
  return sortedImages[0]?.url ?? null;
}

function mapProductCard(product: ProductRow): ProductCardItem {
  return {
    id: product.id,
    name: product.name_az,
    href: `/products/${product.slug}`,
    category: product.category?.name_az ?? "Kateqoriya yoxdur",
    brand: product.brand?.name ?? null,
    badge: getStockBadge(product.stock_status),
    price: formatPrice(product.price_visible, product.price),
    imageUrl: getPrimaryImage(product.images),
  };
}

async function getCategoryIdBySlug(slug: string) {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("categories")
    .select("id")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle<{ id: string }>();

  if (error || !data) return null;
  return data.id;
}

async function getBrandIdBySlug(slug: string) {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("brands")
    .select("id")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle<{ id: string }>();

  if (error || !data) return null;
  return data.id;
}

export async function getFeaturedProducts(): Promise<ProductCardItem[]> {
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
      is_featured,
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
    .eq("status", "active")
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(8)
    .returns<ProductRow[]>();

  if (error) {
    console.error("Failed to fetch featured products:", error.message);
    return [];
  }

  return data.map(mapProductCard);
}

export async function getCatalogProducts(
  filters: CatalogProductFilters = {}
): Promise<ProductCardItem[]> {
  const supabase = createServerSupabaseClient();

  const categoryId = filters.category
    ? await getCategoryIdBySlug(filters.category)
    : null;

  const brandId = filters.brand ? await getBrandIdBySlug(filters.brand) : null;

  let query = supabase
    .from("products")
    .select(
      `
      id,
      name_az,
      slug,
      price,
      price_visible,
      stock_status,
      is_featured,
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
    .eq("status", "active")
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: false });

  if (filters.search) {
    query = query.ilike("name_az", `%${filters.search}%`);
  }

  if (filters.stock) {
    query = query.eq("stock_status", filters.stock);
  }

  if (filters.category) {
    if (!categoryId) return [];
    query = query.eq("category_id", categoryId);
  }

  if (filters.brand) {
    if (!brandId) return [];
    query = query.eq("brand_id", brandId);
  }

  const { data, error } = await query.returns<ProductRow[]>();

  if (error) {
    console.error("Failed to fetch catalog products:", error.message);
    return [];
  }

  return data.map(mapProductCard);
}

export async function getProductBySlug(
  slug: string
): Promise<ProductDetail | null> {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id,
      name_az,
      slug,
      short_description_az,
      description_az,
      price,
      price_visible,
      stock_status,
      seo_title_az,
      seo_description_az,
      category:categories (
        name_az
      ),
      brand:brands (
        name
      ),
      images:product_images (
        id,
        url,
        alt_az,
        is_primary
      ),
      specifications:product_specifications (
        id,
        spec_key_az,
        spec_value_az,
        sort_order
      ),
      downloads:product_downloads (
        id,
        title_az,
        file_url,
        sort_order
      )
    `
    )
    .eq("slug", slug)
    .eq("status", "active")
    .maybeSingle()
    .returns<ProductDetailRow | null>();

  if (error) {
    console.error("Failed to fetch product by slug:", error.message);
    return null;
  }

  if (!data) {
    console.error("Product not found by slug:", slug);
    return null;
  }

  return {
    id: data.id,
    name: data.name_az,
    slug: data.slug,
    category: data.category?.name_az ?? "Kateqoriya yoxdur",
    brand: data.brand?.name ?? null,
    shortDescription: data.short_description_az,
    description: data.description_az,
    price: formatPrice(data.price_visible, data.price),
    badge: getStockBadge(data.stock_status),
    seoTitle: data.seo_title_az,
    seoDescription: data.seo_description_az,
    images: sortImages(data.images).map((image) => ({
      id: image.id,
      url: image.url,
      alt: image.alt_az,
      isPrimary: image.is_primary,
    })),
    specifications: [...data.specifications]
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((spec) => ({
        id: spec.id,
        key: spec.spec_key_az,
        value: spec.spec_value_az,
      })),
    downloads: [...data.downloads]
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((download) => ({
        id: download.id,
        title: download.title_az,
        fileUrl: download.file_url,
      })),
  };
}
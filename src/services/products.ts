import "server-only";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type ProductCardItem = {
  id: string;
  name: string;
  category: string;
  brand: string | null;
  price: string;
  badge: string;
  href: string;
  imageUrl: string | null;
};

export type FeaturedProduct = ProductCardItem;
export type CatalogProduct = ProductCardItem;

export type CatalogProductFilters = {
  search?: string;
  category?: string;
  brand?: string;
  stock?: string;
  sort?: string;
};

type StockStatus = "in_stock" | "out_of_stock" | "pre_order";

type ProductRow = {
  id: string;
  name_az: string;
  slug: string;
  price: number | string | null;
  price_visible: boolean;
  stock_status: StockStatus;
  is_featured: boolean;
  category: {
    name_az: string;
    slug: string;
  } | null;
  brand: {
    name: string;
    slug: string;
  } | null;
  images: {
    url: string;
    is_primary: boolean;
  }[];
};

export type ProductDetail = {
  id: string;
  name: string;
  slug: string;
  stockQuantity: number;
  stockStatus: StockStatus;
  category: string;
  brand: string | null;
  price: string;
  badge: string;
  shortDescription: string | null;
  description: string | null;
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
    fileType: string;
  }[];
};

type ProductDetailRow = {
  id: string;
  name_az: string;
  slug: string;
  short_description_az: string | null;
  description_az: string | null;
  price: number | string | null;
  price_visible: boolean;
  stock_status: StockStatus;
  stock_quantity: number | null;
  seo_title_az: string | null;
  seo_description_az: string | null;
  category: {
    name_az: string;
    slug: string;
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
    file_type: string;
    sort_order: number;
  }[];
};

function formatPrice(priceVisible: boolean, price: number | string | null) {
  return priceVisible && price
    ? `${Number(price).toFixed(2)} AZN`
    : "Qiymət sorğu ilə";
}

function formatBadge(stockStatus: StockStatus) {
  if (stockStatus === "in_stock") return "Stokda var";
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
  const sortedImages = sortImages(images ?? []);
  return sortedImages[0]?.url ?? null;
}

function formatProduct(product: ProductRow): ProductCardItem {
  return {
    id: product.id,
    name: product.name_az,
    category: product.category?.name_az ?? "Məhsul",
    brand: product.brand?.name ?? null,
    price: formatPrice(product.price_visible, product.price),
    badge: formatBadge(product.stock_status),
    href: `/products/${product.slug}`,
    imageUrl: getPrimaryImage(product.images ?? []),
  };
}

async function getCategoryIdBySlug(slug: string) {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("categories")
    .select("id")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle()
    .returns<{ id: string } | null>();

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
    .maybeSingle()
    .returns<{ id: string } | null>();

  if (error || !data) return null;

  return data.id;
}

export async function getFeaturedProducts(): Promise<FeaturedProduct[]> {
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
        name_az,
        slug
      ),
      brand:brands (
        name,
        slug
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

  return data.map(formatProduct);
}

export async function getCatalogProducts(
  filters: CatalogProductFilters = {}
): Promise<CatalogProduct[]> {
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
        name_az,
        slug
      ),
      brand:brands (
        name,
        slug
      ),
      images:product_images (
        url,
        is_primary
      )
    `
    )
    .eq("status", "active");

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

  if (filters.sort === "oldest") {
    query = query.order("created_at", { ascending: true });
  } else if (filters.sort === "price_asc") {
    query = query
      .order("price_visible", { ascending: false })
      .order("price", { ascending: true, nullsFirst: false });
  } else if (filters.sort === "price_desc") {
    query = query
      .order("price_visible", { ascending: false })
      .order("price", { ascending: false, nullsFirst: false });
  } else if (filters.sort === "featured") {
    query = query
      .order("is_featured", { ascending: false })
      .order("created_at", { ascending: false });
  } else {
    query = query.order("created_at", { ascending: false });
  }

  const { data, error } = await query.limit(48).returns<ProductRow[]>();

  if (error) {
    console.error("Failed to fetch catalog products:", error.message);
    return [];
  }

  return data.map(formatProduct);
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
            stock_quantity,

      seo_title_az,
      seo_description_az,
      category:categories (
        name_az,
        slug
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
        file_type,
        sort_order
      )
    `
    )
    .eq("status", "active")
    .eq("slug", slug)
    .maybeSingle()
    .returns<ProductDetailRow | null>();

  if (error) {
    console.error("Failed to fetch product:", error.message);
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
      stockQuantity: data.stock_quantity ?? 0,
    stockStatus: data.stock_status,
    category: data.category?.name_az ?? "Məhsul",
    brand: data.brand?.name ?? null,
    price: formatPrice(data.price_visible, data.price),
    badge: formatBadge(data.stock_status),
    shortDescription: data.short_description_az,
    description: data.description_az,
    seoTitle: data.seo_title_az,
    seoDescription: data.seo_description_az,
    images: sortImages(data.images ?? []).map((image) => ({
      id: image.id,
      url: image.url,
      alt: image.alt_az,
      isPrimary: image.is_primary,
    })),
    specifications: [...(data.specifications ?? [])]
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((spec) => ({
        id: spec.id,
        key: spec.spec_key_az,
        value: spec.spec_value_az,
      })),
    downloads: [...(data.downloads ?? [])]
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((download) => ({
        id: download.id,
        title: download.title_az,
        fileUrl: download.file_url,
        fileType: download.file_type,
      })),
  };
}
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type ProductCardItem = {
  id: string;
  name: string;
  category: string;
  price: string;
  badge: string;
  href: string;
  imageUrl: string | null;
};

export type FeaturedProduct = ProductCardItem;
export type CatalogProduct = ProductCardItem;

type ProductRow = {
  id: string;
  name_az: string;
  slug: string;
  price: number | string | null;
  price_visible: boolean;
  stock_status: "in_stock" | "out_of_stock" | "pre_order";
  category: {
    name_az: string;
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
  stock_status: "in_stock" | "out_of_stock" | "pre_order";
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
  }[];
  downloads: {
    id: string;
    title_az: string;
    file_url: string;
    file_type: string;
  }[];
};

function formatPrice(priceVisible: boolean, price: number | string | null) {
  return priceVisible && price
    ? `${Number(price).toFixed(2)} AZN`
    : "Qiymət sorğu ilə";
}

function formatBadge(stockStatus: ProductRow["stock_status"]) {
  if (stockStatus === "in_stock") return "Stokda var";
  if (stockStatus === "pre_order") return "Öncədən sifariş";
  return "Sorğu ilə";
}

function getPrimaryImage(images: ProductRow["images"]) {
  return (
    images.find((image) => image.is_primary)?.url ??
    images[0]?.url ??
    null
  );
}

function formatProduct(product: ProductRow): ProductCardItem {
  return {
    id: product.id,
    name: product.name_az,
    category: product.category?.name_az ?? "Məhsul",
    price: formatPrice(product.price_visible, product.price),
    badge: formatBadge(product.stock_status),
    href: `/products/${product.slug}`,
    imageUrl: getPrimaryImage(product.images ?? []),
  };
}

type GetCatalogProductsParams = {
  category?: string;
};

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
      category:categories (
        name_az,
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

export async function getCatalogProducts({
  category,
}: GetCatalogProductsParams = {}): Promise<CatalogProduct[]> {
  const supabase = createServerSupabaseClient();

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
      category:categories!inner (
        name_az,
        slug
      ),
      images:product_images (
        url,
        is_primary
      )
    `
    )
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(48);

  if (category) {
    query = query.eq("categories.slug", category);
  }

  const { data, error } = await query.returns<ProductRow[]>();

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
        spec_value_az
      ),
      downloads:product_downloads (
        id,
        title_az,
        file_url,
        file_type
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
    category: data.category?.name_az ?? "Məhsul",
    brand: data.brand?.name ?? null,
    price: formatPrice(data.price_visible, data.price),
    badge: formatBadge(data.stock_status),
    shortDescription: data.short_description_az,
    description: data.description_az,
    seoTitle: data.seo_title_az,
    seoDescription: data.seo_description_az,
  images: data.images
  .sort((a, b) => Number(b.is_primary) - Number(a.is_primary))
  .map((image) => ({
    id: image.id,
    url: image.url,
    alt: image.alt_az,
    isPrimary: image.is_primary,
  })),
    specifications: data.specifications.map((spec) => ({
      id: spec.id,
      key: spec.spec_key_az,
      value: spec.spec_value_az,
    })),
    downloads: data.downloads.map((download) => ({
      id: download.id,
      title: download.title_az,
      fileUrl: download.file_url,
      fileType: download.file_type,
    })),
  };
}
import "server-only";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type ProductLocale = "az" | "en" | "ru";

type StockStatus = "in_stock" | "out_of_stock" | "pre_order";

export type ProductCardItem = {
  id: string;
  name: string;
  slug: string;
  category: string;
  brand: string | null;
  price: string;
  priceAmount: number | null;
  stockStatus: StockStatus;
  stockQuantity: number;
  badge: string;
  href: string;
  imageUrl: string | null;
};

export type FeaturedProduct = ProductCardItem;
export type CatalogProduct = ProductCardItem;

export type CatalogProductFilters = {
  search?: string;
  category?: string;
  brand?: string | string[];
  stock?: string | string[];
  sort?: string;
  specs?: Record<string, string[]>;
};

type LocalizedProductFields = {
  name_az: string;
  name_en: string | null;
  name_ru: string | null;
};

type LocalizedCategoryFields = {
  name_az: string;
  name_en: string | null;
  name_ru: string | null;
};

type ProductRow = {
  id: string;
  name_az: string;
  name_en: string | null;
  name_ru: string | null;
  slug: string;
  price: number | string | null;
  price_visible: boolean;
  stock_status: StockStatus;
  stock_quantity: number | null;
  is_featured: boolean;
  category: {
    name_az: string;
    name_en: string | null;
    name_ru: string | null;
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
  name_en: string | null;
  name_ru: string | null;
  slug: string;
  short_description_az: string | null;
  short_description_en: string | null;
  short_description_ru: string | null;
  description_az: string | null;
  description_en: string | null;
  description_ru: string | null;
  price: number | string | null;
  price_visible: boolean;
  stock_status: StockStatus;
  stock_quantity: number | null;
  seo_title_az: string | null;
  seo_title_en: string | null;
  seo_title_ru: string | null;
  seo_description_az: string | null;
  seo_description_en: string | null;
  seo_description_ru: string | null;
  category: {
    name_az: string;
    name_en: string | null;
    name_ru: string | null;
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
    spec_key_en: string | null;
    spec_key_ru: string | null;
    spec_value_az: string;
    spec_value_en: string | null;
    spec_value_ru: string | null;
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

const productServiceTranslations = {
  az: {
    priceOnRequest: "Qiymət sorğu ilə",
    badgeInStock: "Stokda var",
    badgePreOrder: "Öncədən sifariş",
    badgeOnRequest: "Sorğu ilə",
    productFallback: "Məhsul",
  },
  en: {
    priceOnRequest: "Price on request",
    badgeInStock: "In stock",
    badgePreOrder: "Pre-order",
    badgeOnRequest: "On request",
    productFallback: "Product",
  },
  ru: {
    priceOnRequest: "Цена по запросу",
    badgeInStock: "В наличии",
    badgePreOrder: "Предзаказ",
    badgeOnRequest: "По запросу",
    productFallback: "Товар",
  },
} as const;

function asArray(value?: string | string[]) {
  if (!value) return [];
  return Array.isArray(value) ? value.filter(Boolean) : [value].filter(Boolean);
}

function normalizeStockValue(value: string): StockStatus | null {
  if (value === "in_stock" || value === "Stokda var") return "in_stock";
  if (value === "out_of_stock" || value === "Stokda yoxdur") {
    return "out_of_stock";
  }
  if (value === "pre_order" || value === "Öncədən sifariş") {
    return "pre_order";
  }

  return null;
}

function getLocalizedProductName(
  product: LocalizedProductFields,
  locale: ProductLocale
) {
  if (locale === "en") return product.name_en || product.name_az;
  if (locale === "ru") return product.name_ru || product.name_az;

  return product.name_az;
}

function getLocalizedCategoryName(
  category: LocalizedCategoryFields,
  locale: ProductLocale
) {
  if (locale === "en") return category.name_en || category.name_az;
  if (locale === "ru") return category.name_ru || category.name_az;

  return category.name_az;
}

function getLocalizedText(
  locale: ProductLocale,
  az: string | null,
  en?: string | null,
  ru?: string | null
) {
  if (locale === "en") return en || az;
  if (locale === "ru") return ru || az;

  return az;
}

function formatPrice(
  priceVisible: boolean,
  price: number | string | null,
  locale: ProductLocale = "az"
) {
  const t = productServiceTranslations[locale];

  return priceVisible && price
    ? `${Number(price).toFixed(2)} AZN`
    : t.priceOnRequest;
}

function formatBadge(stockStatus: StockStatus, locale: ProductLocale = "az") {
  const t = productServiceTranslations[locale];

  if (stockStatus === "in_stock") return t.badgeInStock;
  if (stockStatus === "pre_order") return t.badgePreOrder;

  return t.badgeOnRequest;
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

function formatProduct(
  product: ProductRow,
  locale: ProductLocale = "az"
): ProductCardItem {
  const t = productServiceTranslations[locale];

  const priceAmount =
    product.price_visible && product.price !== null ? Number(product.price) : null;

  return {
    id: product.id,
    name: getLocalizedProductName(product, locale),
    slug: product.slug,
    category: product.category
      ? getLocalizedCategoryName(product.category, locale)
      : t.productFallback,
    brand: product.brand?.name ?? null,
    price: formatPrice(product.price_visible, product.price, locale),
    priceAmount: Number.isFinite(priceAmount) ? priceAmount : null,
    stockStatus: product.stock_status,
    stockQuantity: product.stock_quantity ?? 0,
    badge: formatBadge(product.stock_status, locale),
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

async function getBrandIdsBySlugs(slugs: string[]) {
  if (slugs.length === 0) return [];

  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("brands")
    .select("id")
    .in("slug", slugs)
    .eq("is_active", true)
    .returns<{ id: string }[]>();

  if (error || !data) return [];

  return data.map((brand) => brand.id);
}

async function getProductIdsBySpecs(specs: Record<string, string[]>) {
  const entries = Object.entries(specs).filter(
    ([key, values]) => key.trim() && values.length > 0
  );

  if (entries.length === 0) return null;

  const supabase = createServerSupabaseClient();

  let matchedIds: string[] | null = null;

  for (const [specKey, values] of entries) {
    const { data, error } = await supabase
      .from("product_specifications")
      .select("product_id")
      .eq("spec_key_az", specKey)
      .in("spec_value_az", values)
      .returns<{ product_id: string }[]>();

    if (error || !data) {
      return [];
    }

    const idsForSpec = Array.from(new Set(data.map((row) => row.product_id)));

    if (matchedIds === null) {
      matchedIds = idsForSpec;
    } else {
      const idsForSpecSet = new Set<string>(idsForSpec);
      matchedIds = matchedIds.filter((productId: string) =>
        idsForSpecSet.has(productId)
      );
    }

    if (matchedIds.length === 0) {
      return [];
    }
  }

  return matchedIds;
}

export async function getFeaturedProducts(
  locale: ProductLocale = "az"
): Promise<FeaturedProduct[]> {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id,
      name_az,
      name_en,
      name_ru,
      slug,
      price,
      price_visible,
      stock_status,
      stock_quantity,
      is_featured,
      category:categories (
        name_az,
        name_en,
        name_ru,
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

  return data.map((product) => formatProduct(product, locale));
}

export async function getCatalogProducts(
  filters: CatalogProductFilters = {},
  locale: ProductLocale = "az"
): Promise<CatalogProduct[]> {
  const supabase = createServerSupabaseClient();

  const categoryId = filters.category
    ? await getCategoryIdBySlug(filters.category)
    : null;

  const brandValues = asArray(filters.brand);
  const brandIds = await getBrandIdsBySlugs(brandValues);

  const stockValues = asArray(filters.stock)
    .map(normalizeStockValue)
    .filter((stock): stock is StockStatus => Boolean(stock));

  const specProductIds = filters.specs
    ? await getProductIdsBySpecs(filters.specs)
    : null;

  if (filters.category && !categoryId) return [];
  if (brandValues.length > 0 && brandIds.length === 0) return [];
  if (specProductIds && specProductIds.length === 0) return [];

  let query = supabase
    .from("products")
    .select(
      `
      id,
      name_az,
      name_en,
      name_ru,
      slug,
      price,
      price_visible,
      stock_status,
      stock_quantity,
      is_featured,
      category:categories (
        name_az,
        name_en,
        name_ru,
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
    if (locale === "en") {
      query = query.or(
        `name_en.ilike.%${filters.search}%,name_az.ilike.%${filters.search}%`
      );
    } else if (locale === "ru") {
      query = query.or(
        `name_ru.ilike.%${filters.search}%,name_az.ilike.%${filters.search}%`
      );
    } else {
      query = query.ilike("name_az", `%${filters.search}%`);
    }
  }

  if (stockValues.length === 1) {
    query = query.eq("stock_status", stockValues[0]);
  } else if (stockValues.length > 1) {
    query = query.in("stock_status", stockValues);
  }

  if (categoryId) {
    query = query.eq("category_id", categoryId);
  }

  if (brandIds.length === 1) {
    query = query.eq("brand_id", brandIds[0]);
  } else if (brandIds.length > 1) {
    query = query.in("brand_id", brandIds);
  }

  if (specProductIds && specProductIds.length > 0) {
    query = query.in("id", specProductIds);
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

  return data.map((product) => formatProduct(product, locale));
}

export async function getProductBySlug(
  slug: string,
  locale: ProductLocale = "az"
): Promise<ProductDetail | null> {
  const supabase = createServerSupabaseClient();
  const t = productServiceTranslations[locale];

  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id,
      name_az,
      name_en,
      name_ru,
      slug,
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
      seo_title_az,
      seo_title_en,
      seo_title_ru,
      seo_description_az,
      seo_description_en,
      seo_description_ru,
      category:categories (
        name_az,
        name_en,
        name_ru,
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
        spec_key_en,
        spec_key_ru,
        spec_value_az,
        spec_value_en,
        spec_value_ru,
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
    name: getLocalizedProductName(data, locale),
    slug: data.slug,
    stockQuantity: data.stock_quantity ?? 0,
    stockStatus: data.stock_status,
    category: data.category
      ? getLocalizedCategoryName(data.category, locale)
      : t.productFallback,
    brand: data.brand?.name ?? null,
    price: formatPrice(data.price_visible, data.price, locale),
    badge: formatBadge(data.stock_status, locale),
    shortDescription: getLocalizedText(
      locale,
      data.short_description_az,
      data.short_description_en,
      data.short_description_ru
    ),
    description: getLocalizedText(
      locale,
      data.description_az,
      data.description_en,
      data.description_ru
    ),
    seoTitle: getLocalizedText(
      locale,
      data.seo_title_az,
      data.seo_title_en,
      data.seo_title_ru
    ),
    seoDescription: getLocalizedText(
      locale,
      data.seo_description_az,
      data.seo_description_en,
      data.seo_description_ru
    ),
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
        key:
          getLocalizedText(
            locale,
            spec.spec_key_az,
            spec.spec_key_en,
            spec.spec_key_ru
          ) ?? spec.spec_key_az,
        value:
          getLocalizedText(
            locale,
            spec.spec_value_az,
            spec.spec_value_en,
            spec.spec_value_ru
          ) ?? spec.spec_value_az,
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
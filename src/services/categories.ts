import "server-only";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { localizedPath } from "@/lib/i18n";
import type { ProductCardItem, ProductLocale } from "@/services/products";

export type CatalogCategory = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
};

type CatalogCategoryRow = {
  id: string;
  name_az: string;
  name_en: string | null;
  name_ru: string | null;
  slug: string;
  description_az: string | null;
  description_en: string | null;
  description_ru: string | null;
};

type CategoryDetailRow = {
  id: string;
  name_az: string;
  name_en: string | null;
  name_ru: string | null;
  slug: string;
  description_az: string | null;
  description_en: string | null;
  description_ru: string | null;
  seo_title: string | null;
  seo_description: string | null;
  seo_title_en: string | null;
  seo_title_ru: string | null;
  seo_description_en: string | null;
  seo_description_ru: string | null;
};

type CategoryProductRow = {
  id: string;
  name_az: string;
  name_en: string | null;
  name_ru: string | null;
  slug: string;
  price: number | string | null;
  price_visible: boolean;
  stock_status: "in_stock" | "out_of_stock" | "pre_order";
  stock_quantity: number | null;
  category: {
    name_az: string;
    name_en: string | null;
    name_ru: string | null;
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

const categoryServiceTranslations = {
  az: {
    priceOnRequest: "Qiymət sorğu ilə",
    badgeInStock: "Stokda var",
    badgePreOrder: "Öncədən sifariş",
    badgeOutOfStock: "Stokda yoxdur",
    productFallback: "Məhsul",
  },
  en: {
    priceOnRequest: "Price on request",
    badgeInStock: "In stock",
    badgePreOrder: "Pre-order",
    badgeOutOfStock: "Out of stock",
    productFallback: "Product",
  },
  ru: {
    priceOnRequest: "Цена по запросу",
    badgeInStock: "В наличии",
    badgePreOrder: "Предзаказ",
    badgeOutOfStock: "Нет в наличии",
    productFallback: "Товар",
  },
} as const;

function getLocalizedProductName(
  product: {
    name_az: string;
    name_en?: string | null;
    name_ru?: string | null;
  },
  locale: ProductLocale,
) {
  if (locale === "en") return product.name_en || product.name_az;
  if (locale === "ru") return product.name_ru || product.name_az;

  return product.name_az;
}

function getLocalizedCategoryName(
  category: {
    name_az: string;
    name_en?: string | null;
    name_ru?: string | null;
  },
  locale: ProductLocale,
) {
  if (locale === "en") return category.name_en || category.name_az;
  if (locale === "ru") return category.name_ru || category.name_az;

  return category.name_az;
}

function getLocalizedCategoryDescription(
  category: {
    description_az: string | null;
    description_en?: string | null;
    description_ru?: string | null;
  },
  locale: ProductLocale,
) {
  if (locale === "en")
    return category.description_en || category.description_az;
  if (locale === "ru")
    return category.description_ru || category.description_az;

  return category.description_az;
}

function getLocalizedCategorySeoTitle(
  category: {
    seo_title: string | null;
    seo_title_en?: string | null;
    seo_title_ru?: string | null;
  },
  locale: ProductLocale,
) {
  if (locale === "en") return category.seo_title_en || category.seo_title;
  if (locale === "ru") return category.seo_title_ru || category.seo_title;

  return category.seo_title;
}

function getLocalizedCategorySeoDescription(
  category: {
    seo_description: string | null;
    seo_description_en?: string | null;
    seo_description_ru?: string | null;
  },
  locale: ProductLocale,
) {
  if (locale === "en")
    return category.seo_description_en || category.seo_description;
  if (locale === "ru")
    return category.seo_description_ru || category.seo_description;

  return category.seo_description;
}

function formatPrice(
  priceVisible: boolean,
  price: number | string | null,
  locale: ProductLocale = "az",
) {
  const t = categoryServiceTranslations[locale];

  return priceVisible && price
    ? `${Number(price).toFixed(2)} AZN`
    : t.priceOnRequest;
}

function formatBadge(
  stockStatus: CategoryProductRow["stock_status"],
  locale: ProductLocale = "az",
) {
  const t = categoryServiceTranslations[locale];

  if (stockStatus === "in_stock") return t.badgeInStock;
  if (stockStatus === "pre_order") return t.badgePreOrder;

  return t.badgeOutOfStock;
}

function getPrimaryImage(images: CategoryProductRow["images"]) {
  const sortedImages = [...(images ?? [])].sort((a, b) => {
    if (a.is_primary && !b.is_primary) return -1;
    if (!a.is_primary && b.is_primary) return 1;

    return 0;
  });

  return sortedImages[0]?.url ?? null;
}

function formatProduct(
  product: CategoryProductRow,
  locale: ProductLocale = "az",
): ProductCardItem {
  const t = categoryServiceTranslations[locale];

  const priceAmount =
    product.price_visible && product.price !== null
      ? Number(product.price)
      : null;

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
    href: localizedPath(`/products/${product.slug}`, locale),
    imageUrl: getPrimaryImage(product.images ?? []),
  };
}

export async function getCatalogCategories(
  locale: ProductLocale = "az",
): Promise<CatalogCategory[]> {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("categories")
    .select(
      `
      id,
      name_az,
      name_en,
      name_ru,
      slug,
      description_az,
      description_en,
      description_ru
    `,
    )
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .returns<CatalogCategoryRow[]>();

  if (error || !data) {
    console.error("Failed to fetch categories:", error?.message);
    return [];
  }

  return data.map((category) => ({
    id: category.id,
    name: getLocalizedCategoryName(category, locale),
    slug: category.slug,
    description: getLocalizedCategoryDescription(category, locale),
  }));
}

export async function getCategoryBySlug(
  slug: string,
  locale: ProductLocale = "az",
): Promise<CategoryDetail | null> {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("categories")
    .select(
      `
      id,
      name_az,
      name_en,
      name_ru,
      slug,
      description_az,
      description_en,
      description_ru,
      seo_title,
      seo_title_en,
      seo_title_ru,
      seo_description,
      seo_description_en,
      seo_description_ru
    `,
    )
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle()
    .returns<CategoryDetailRow | null>();

  if (error || !data) {
    return null;
  }

  return {
    id: data.id,
    name: getLocalizedCategoryName(data, locale),
    slug: data.slug,
    description: getLocalizedCategoryDescription(data, locale),
    seoTitle: getLocalizedCategorySeoTitle(data, locale),
    seoDescription: getLocalizedCategorySeoDescription(data, locale),
  };
}

export async function getCategoryProducts(
  categoryId: string,
  locale: ProductLocale = "az",
): Promise<ProductCardItem[]> {
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
      category:categories (
        name_az,
        name_en,
        name_ru
      ),
      brand:brands (
        name
      ),
      images:product_images (
        url,
        is_primary
      )
    `,
    )
    .eq("category_id", categoryId)
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .returns<CategoryProductRow[]>();

  if (error || !data) {
    console.error("Failed to fetch category products:", error?.message);
    return [];
  }

  return data.map((product) => formatProduct(product, locale));
}

export async function getCategorySlugs() {
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

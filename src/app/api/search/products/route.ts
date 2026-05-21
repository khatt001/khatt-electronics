import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isLocale } from "@/lib/i18n";

type SearchLocale = "az" | "en" | "ru";

type SearchProductRow = {
  id: string;
  name_az: string;
  name_en: string | null;
  name_ru: string | null;
  slug: string;
  price: number | string | null;
  price_visible: boolean;
  stock_status: string;
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

const searchApiTranslations = {
  az: {
    productFallback: "Məhsul",
    priceOnRequest: "Qiymət sorğu ilə",
  },
  en: {
    productFallback: "Product",
    priceOnRequest: "Price on request",
  },
  ru: {
    productFallback: "Товар",
    priceOnRequest: "Цена по запросу",
  },
} as const;

function getLocale(value: string | null): SearchLocale {
  return value && isLocale(value) ? value : "az";
}

function getLocalizedProductName(
  product: {
    name_az: string;
    name_en: string | null;
    name_ru: string | null;
  },
  locale: SearchLocale
) {
  if (locale === "en") return product.name_en || product.name_az;
  if (locale === "ru") return product.name_ru || product.name_az;

  return product.name_az;
}

function getLocalizedCategoryName(
  category: {
    name_az: string;
    name_en: string | null;
    name_ru: string | null;
  },
  locale: SearchLocale
) {
  if (locale === "en") return category.name_en || category.name_az;
  if (locale === "ru") return category.name_ru || category.name_az;

  return category.name_az;
}

function formatPrice(
  priceVisible: boolean,
  price: number | string | null,
  locale: SearchLocale
) {
  const t = searchApiTranslations[locale];

  return priceVisible && price
    ? `${Number(price).toFixed(2)} AZN`
    : t.priceOnRequest;
}

function escapeSupabaseOrValue(value: string) {
  return value.replace(/[%_]/g, "\\$&").replace(/,/g, "\\,");
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() ?? "";
  const locale = getLocale(searchParams.get("locale"));
  const t = searchApiTranslations[locale];

  if (query.length < 2) {
    return NextResponse.json({ products: [] });
  }

  const supabase = createServerSupabaseClient();
  const cleanQuery = escapeSupabaseOrValue(query);

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
    `
    )
    .eq("status", "active")
    .or(
      `name_az.ilike.%${cleanQuery}%,name_en.ilike.%${cleanQuery}%,name_ru.ilike.%${cleanQuery}%`
    )
    .order("created_at", { ascending: false })
    .limit(6)
    .returns<SearchProductRow[]>();

  if (error) {
    return NextResponse.json({ products: [] }, { status: 200 });
  }

  const products = data.map((product) => {
    const sortedImages = [...(product.images ?? [])].sort((a, b) => {
      if (a.is_primary && !b.is_primary) return -1;
      if (!a.is_primary && b.is_primary) return 1;

      return 0;
    });

    return {
      id: product.id,
      name: getLocalizedProductName(product, locale),
      href: `/products/${product.slug}`,
      category: product.category
        ? getLocalizedCategoryName(product.category, locale)
        : t.productFallback,
      brand: product.brand?.name ?? null,
      imageUrl: sortedImages[0]?.url ?? null,
      price: formatPrice(product.price_visible, product.price, locale),
    };
  });

  return NextResponse.json({ products });
}
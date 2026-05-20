import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

type SearchLocale = "az" | "en" | "ru";

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
  if (value === "en" || value === "ru") {
    return value;
  }

  return "az";
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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() ?? "";
  const locale = getLocale(searchParams.get("locale"));
  const t = searchApiTranslations[locale];

  if (query.length < 2) {
    return NextResponse.json({ products: [] });
  }

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
    .ilike("name_az", `%${query}%`)
    .order("created_at", { ascending: false })
    .limit(6)
    .returns<
      {
        id: string;
        name_az: string;
        slug: string;
        price: number | string | null;
        price_visible: boolean;
        stock_status: string;
        category: { name_az: string } | null;
        brand: { name: string } | null;
        images: { url: string; is_primary: boolean }[];
      }[]
    >();

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
      name: product.name_az,
      href: `/products/${product.slug}`,
      category: product.category?.name_az ?? t.productFallback,
      brand: product.brand?.name ?? null,
      imageUrl: sortedImages[0]?.url ?? null,
      price: formatPrice(product.price_visible, product.price, locale),
    };
  });

  return NextResponse.json({ products });
}
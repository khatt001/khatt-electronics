import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { isLocale } from "@/lib/i18n";

type FavoritesValidateLocale = "az" | "en" | "ru";

type ValidateFavoritesRequestItem = {
  id: string;
};

type ProductForFavoritesValidation = {
  id: string;
  name_az: string;
  name_en: string | null;
  name_ru: string | null;
  slug: string;
  price: number | string | null;
  price_visible: boolean;
  stock_status: "in_stock" | "out_of_stock" | "pre_order";
  stock_quantity: number | null;
  status: string;
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

const favoritesValidateTranslations = {
  az: {
    priceOnRequest: "Qiymət sorğu ilə",
    productFallback: "Məhsul",
    invalidFavorites: "Sevimlilər yoxlanmadı.",
  },
  en: {
    priceOnRequest: "Price on request",
    productFallback: "Product",
    invalidFavorites: "Favorites could not be validated.",
  },
  ru: {
    priceOnRequest: "Цена по запросу",
    productFallback: "Товар",
    invalidFavorites: "Избранное не удалось проверить.",
  },
} as const;

function getLocale(value: unknown): FavoritesValidateLocale {
  return typeof value === "string" && isLocale(value) ? value : "az";
}

function getLocalizedName(
  item: {
    name_az: string;
    name_en: string | null;
    name_ru: string | null;
  },
  locale: FavoritesValidateLocale,
) {
  if (locale === "en") return item.name_en || item.name_az;
  if (locale === "ru") return item.name_ru || item.name_az;

  return item.name_az;
}

function getLocalizedCategoryName(
  category: {
    name_az: string;
    name_en: string | null;
    name_ru: string | null;
  },
  locale: FavoritesValidateLocale,
) {
  if (locale === "en") return category.name_en || category.name_az;
  if (locale === "ru") return category.name_ru || category.name_az;

  return category.name_az;
}

function formatPrice(
  priceVisible: boolean,
  price: number | string | null,
  locale: FavoritesValidateLocale,
) {
  const t = favoritesValidateTranslations[locale];

  return priceVisible && price
    ? `${Number(price).toFixed(2)} AZN`
    : t.priceOnRequest;
}

function getPriceAmount(priceVisible: boolean, price: number | string | null) {
  if (!priceVisible || price === null) return null;

  const priceAmount = Number(price);

  if (!Number.isFinite(priceAmount)) return null;

  return priceAmount;
}

function getPrimaryImage(images: ProductForFavoritesValidation["images"]) {
  const sortedImages = [...(images ?? [])].sort((a, b) => {
    if (a.is_primary && !b.is_primary) return -1;
    if (!a.is_primary && b.is_primary) return 1;
    return 0;
  });

  return sortedImages[0]?.url ?? null;
}

export async function POST(request: Request) {
  let locale: FavoritesValidateLocale = "az";

  try {
    const body = (await request.json()) as {
      items?: ValidateFavoritesRequestItem[];
      locale?: FavoritesValidateLocale;
    };

    locale = getLocale(body.locale);
    const t = favoritesValidateTranslations[locale];

    const items = Array.isArray(body.items) ? body.items : [];

    const productIds = Array.from(
      new Set(
        items
          .map((item) => item.id)
          .filter(
            (id): id is string => typeof id === "string" && id.length > 0,
          ),
      ),
    );

    if (productIds.length === 0) {
      return NextResponse.json({
        items: [],
      });
    }

    const { data, error } = await supabaseAdmin
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
        status,
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
      .in("id", productIds)
      .returns<ProductForFavoritesValidation[]>();

    if (error) {
      return NextResponse.json(
        {
          error: t.invalidFavorites,
        },
        { status: 500 },
      );
    }

    const validItems = data
      .filter((product) => product.status === "active")
      .map((product) => ({
        id: product.id,
        name: getLocalizedName(product, locale),
        slug: product.slug,
        price: formatPrice(product.price_visible, product.price, locale),
        priceAmount: getPriceAmount(product.price_visible, product.price),
        imageUrl: getPrimaryImage(product.images ?? []),
        category: product.category
          ? getLocalizedCategoryName(product.category, locale)
          : t.productFallback,
        brand: product.brand?.name ?? null,
        stockStatus: product.stock_status,
        stockQuantity: product.stock_quantity ?? 0,
      }));

    return NextResponse.json({
      items: validItems,
    });
  } catch {
    const t = favoritesValidateTranslations[locale];

    return NextResponse.json(
      {
        error: t.invalidFavorites,
      },
      { status: 400 },
    );
  }
}

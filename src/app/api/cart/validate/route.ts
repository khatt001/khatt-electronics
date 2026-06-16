import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { isLocale } from "@/lib/i18n";

type CartValidateLocale = "az" | "en" | "ru";

type ValidateCartRequestItem = {
  id: string;
  quantity: number;
};

type ProductForCartValidation = {
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

const cartValidateTranslations = {
  az: {
    productFallback: "Məhsul",
    invalidCart: "Cart məlumatı yoxlanmadı.",
  },
  en: {
    productFallback: "Product",
    invalidCart: "Cart data could not be validated.",
  },
  ru: {
    productFallback: "Товар",
    invalidCart: "Данные корзины не удалось проверить.",
  },
} as const;

function getLocale(value: unknown): CartValidateLocale {
  return typeof value === "string" && isLocale(value) ? value : "az";
}

function getLocalizedName(
  item: {
    name_az: string;
    name_en: string | null;
    name_ru: string | null;
  },
  locale: CartValidateLocale,
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
  locale: CartValidateLocale,
) {
  if (locale === "en") return category.name_en || category.name_az;
  if (locale === "ru") return category.name_ru || category.name_az;

  return category.name_az;
}

function formatPrice(priceVisible: boolean, price: number | string | null) {
  return priceVisible && price ? `${Number(price).toFixed(2)} AZN` : null;
}

function getPrimaryImage(images: ProductForCartValidation["images"]) {
  const sortedImages = [...(images ?? [])].sort((a, b) => {
    if (a.is_primary && !b.is_primary) return -1;
    if (!a.is_primary && b.is_primary) return 1;
    return 0;
  });

  return sortedImages[0]?.url ?? null;
}

export async function POST(request: Request) {
  let locale: CartValidateLocale = "az";

  try {
    const body = (await request.json()) as {
      items?: ValidateCartRequestItem[];
      locale?: CartValidateLocale;
    };

    locale = getLocale(body.locale);
    const t = cartValidateTranslations[locale];

    const items = Array.isArray(body.items) ? body.items : [];

    const productIds = items
      .map((item) => item.id)
      .filter((id): id is string => typeof id === "string");

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
      .returns<ProductForCartValidation[]>();

    if (error) {
      return NextResponse.json(
        {
          error: error.message,
        },
        { status: 500 },
      );
    }

    const quantityByProductId = new Map(
      items.map((item) => [
        item.id,
        Math.max(1, Math.floor(item.quantity || 1)),
      ]),
    );

    const validItems = data
      .filter((product) => {
        return (
          product.status === "active" &&
          product.price_visible &&
          product.price !== null &&
          product.stock_status === "in_stock" &&
          (product.stock_quantity ?? 0) > 0
        );
      })
      .map((product) => {
        const price = Number(product.price);
        const stockQuantity = product.stock_quantity ?? 0;
        const requestedQuantity = quantityByProductId.get(product.id) ?? 1;

        return {
          id: product.id,
          name: getLocalizedName(product, locale),
          slug: product.slug,
          price,
          priceLabel: formatPrice(product.price_visible, product.price),
          imageUrl: getPrimaryImage(product.images ?? []),
          category: product.category
            ? getLocalizedCategoryName(product.category, locale)
            : t.productFallback,
          brand: product.brand?.name ?? null,
          maxQuantity: stockQuantity,
          quantity: Math.min(stockQuantity, requestedQuantity),
        };
      })
      .filter((item) => Number.isFinite(item.price) && item.priceLabel);

    return NextResponse.json({
      items: validItems,
    });
  } catch {
    const t = cartValidateTranslations[locale];

    return NextResponse.json(
      {
        error: t.invalidCart,
      },
      { status: 400 },
    );
  }
}

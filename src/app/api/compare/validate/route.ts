import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { MAX_COMPARE_ITEMS } from "@/lib/compare";

type CompareValidateLocale = "az" | "en" | "ru";

type ValidateCompareRequestItem = {
  id: string;
};

type ProductForCompareValidation = {
  id: string;
  name_az: string;
  slug: string;
  price: number | string | null;
  price_visible: boolean;
  stock_status: "in_stock" | "out_of_stock" | "pre_order";
  stock_quantity: number | null;
  status: string;
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
  specifications: {
    key: string;
    value: string;
    sort_order: number | null;
  }[];
};

const compareValidateTranslations = {
  az: {
    priceOnRequest: "Qiymət sorğu ilə",
    productFallback: "Məhsul",
    invalidCompare: "Müqayisə məlumatı yoxlanmadı.",
  },
  en: {
    priceOnRequest: "Price on request",
    productFallback: "Product",
    invalidCompare: "Compare data could not be validated.",
  },
  ru: {
    priceOnRequest: "Цена по запросу",
    productFallback: "Товар",
    invalidCompare: "Данные сравнения не удалось проверить.",
  },
} as const;

function getLocale(value: unknown): CompareValidateLocale {
  if (value === "en" || value === "ru") {
    return value;
  }

  return "az";
}

function formatPrice(
  priceVisible: boolean,
  price: number | string | null,
  locale: CompareValidateLocale
) {
  const t = compareValidateTranslations[locale];

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

function getPrimaryImage(images: ProductForCompareValidation["images"]) {
  const sortedImages = [...(images ?? [])].sort((a, b) => {
    if (a.is_primary && !b.is_primary) return -1;
    if (!a.is_primary && b.is_primary) return 1;
    return 0;
  });

  return sortedImages[0]?.url ?? null;
}

export async function POST(request: Request) {
  let locale: CompareValidateLocale = "az";

  try {
    const body = (await request.json()) as {
      items?: ValidateCompareRequestItem[];
      locale?: CompareValidateLocale;
    };

    locale = getLocale(body.locale);
    const t = compareValidateTranslations[locale];

    const items = Array.isArray(body.items) ? body.items : [];

    const productIds = Array.from(
      new Set(
        items
          .map((item) => item.id)
          .filter((id): id is string => typeof id === "string" && id.length > 0)
      )
    ).slice(0, MAX_COMPARE_ITEMS);

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
        slug,
        price,
        price_visible,
        stock_status,
        stock_quantity,
        status,
        category:categories (
          name_az
        ),
        brand:brands (
          name
        ),
        images:product_images (
          url,
          is_primary
        ),
        specifications:product_specifications (
          key,
          value,
          sort_order
        )
      `
      )
      .in("id", productIds)
      .returns<ProductForCompareValidation[]>();

    if (error) {
      return NextResponse.json(
        {
          error: error.message,
        },
        { status: 500 }
      );
    }

    const positionById = new Map(productIds.map((id, index) => [id, index]));

    const validItems = data
      .filter((product) => product.status === "active")
      .sort(
        (a, b) =>
          (positionById.get(a.id) ?? 999) - (positionById.get(b.id) ?? 999)
      )
      .map((product) => ({
        id: product.id,
        name: product.name_az,
        slug: product.slug,
        price: formatPrice(product.price_visible, product.price, locale),
        priceAmount: getPriceAmount(product.price_visible, product.price),
        imageUrl: getPrimaryImage(product.images ?? []),
        category: product.category?.name_az ?? t.productFallback,
        brand: product.brand?.name ?? null,
        stockStatus: product.stock_status,
        stockQuantity: product.stock_quantity ?? 0,
        specifications: [...(product.specifications ?? [])]
          .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
          .map((spec) => ({
            key: spec.key,
            value: spec.value,
          })),
      }));

    return NextResponse.json({
      items: validItems,
    });
  } catch {
    const t = compareValidateTranslations[locale];

    return NextResponse.json(
      {
        error: t.invalidCompare,
      },
      { status: 400 }
    );
  }
}
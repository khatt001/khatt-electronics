import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getSpecSortIndex } from "@/lib/product-specs";
import { isLocale } from "@/lib/i18n";

type FilterLocale = "az" | "en" | "ru";

type ProductFilterRow = {
  id: string;
  stock_status: "in_stock" | "out_of_stock" | "pre_order";
  brand: {
    name: string;
  } | null;
  specifications: {
    spec_key_az: string;
    spec_key_en: string | null;
    spec_key_ru: string | null;
    spec_value_az: string;
    spec_value_en: string | null;
    spec_value_ru: string | null;
  }[];
};

type FilterOption = {
  value: string;
  label: string;
  count: number;
};

type FilterGroup = {
  key: string;
  label: string;
  type: "brand" | "stock" | "spec";
  options: FilterOption[];
};

const filterApiTranslations = {
  az: {
    brandGroup: "Brend",
    stockGroup: "Stok vəziyyəti",
    stockIn: "Stokda var",
    stockPreOrder: "Öncədən sifariş",
    stockOut: "Stokda yoxdur",
    localeCode: "az",
  },
  en: {
    brandGroup: "Brand",
    stockGroup: "Stock status",
    stockIn: "In stock",
    stockPreOrder: "Pre-order",
    stockOut: "Out of stock",
    localeCode: "en",
  },
  ru: {
    brandGroup: "Бренд",
    stockGroup: "Наличие",
    stockIn: "В наличии",
    stockPreOrder: "Предзаказ",
    stockOut: "Нет в наличии",
    localeCode: "ru",
  },
} as const;

function getLocale(value: string | null): FilterLocale {
  return value && isLocale(value) ? value : "az";
}

function normalizeValue(value: string | null | undefined) {
  return String(value ?? "").trim();
}

function getLocalizedText(
  locale: FilterLocale,
  az: string | null,
  en?: string | null,
  ru?: string | null
) {
  if (locale === "en") return normalizeValue(en) || normalizeValue(az);
  if (locale === "ru") return normalizeValue(ru) || normalizeValue(az);

  return normalizeValue(az);
}

function getLocalizedSpecKey(
  spec: ProductFilterRow["specifications"][number],
  locale: FilterLocale
) {
  return getLocalizedText(
    locale,
    spec.spec_key_az,
    spec.spec_key_en,
    spec.spec_key_ru
  );
}

function getLocalizedSpecValue(
  spec: ProductFilterRow["specifications"][number],
  locale: FilterLocale
) {
  return getLocalizedText(
    locale,
    spec.spec_value_az,
    spec.spec_value_en,
    spec.spec_value_ru
  );
}

function incrementOption(map: Map<string, number>, value: string) {
  const cleanValue = normalizeValue(value);

  if (!cleanValue) return;

  map.set(cleanValue, (map.get(cleanValue) ?? 0) + 1);
}

function mapToOptions(
  map: Map<string, number>,
  locale: FilterLocale
): FilterOption[] {
  const t = filterApiTranslations[locale];

  return Array.from(map.entries())
    .map(([value, count]) => ({
      value,
      label: value,
      count,
    }))
    .sort((a, b) => {
      const numberA = Number(String(a.value).replace(/[^\d.]/g, ""));
      const numberB = Number(String(b.value).replace(/[^\d.]/g, ""));

      if (Number.isFinite(numberA) && Number.isFinite(numberB)) {
        return numberA - numberB;
      }

      return a.label.localeCompare(b.label, t.localeCode);
    });
}

function getStockLabel(
  stockStatus: ProductFilterRow["stock_status"],
  locale: FilterLocale
) {
  const t = filterApiTranslations[locale];

  if (stockStatus === "in_stock") return t.stockIn;
  if (stockStatus === "pre_order") return t.stockPreOrder;

  return t.stockOut;
}

function sortSpecGroups(groups: FilterGroup[], locale: FilterLocale) {
  const t = filterApiTranslations[locale];

  return groups.sort((a, b) => {
    const indexA = getSpecSortIndex(a.label);
    const indexB = getSpecSortIndex(b.label);

    if (indexA !== indexB) return indexA - indexB;

    return a.label.localeCompare(b.label, t.localeCode);
  });
}

async function getCategoryIdBySlug(categorySlug: string) {
  const { data, error } = await supabaseAdmin
    .from("categories")
    .select("id")
    .eq("slug", categorySlug)
    .eq("is_active", true)
    .maybeSingle()
    .returns<{ id: string } | null>();

  if (error || !data) {
    return null;
  }

  return data.id;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categorySlug = searchParams.get("category");
  const locale = getLocale(searchParams.get("locale"));
  const t = filterApiTranslations[locale];

  let categoryId: string | null = null;

  if (categorySlug) {
    categoryId = await getCategoryIdBySlug(categorySlug);

    if (!categoryId) {
      return NextResponse.json({
        groups: [],
        totalProducts: 0,
      });
    }
  }

  let query = supabaseAdmin
    .from("products")
    .select(
      `
      id,
      stock_status,
      brand:brands (
        name
      ),
      specifications:product_specifications (
        spec_key_az,
        spec_key_en,
        spec_key_ru,
        spec_value_az,
        spec_value_en,
        spec_value_ru
      )
    `
    )
    .eq("status", "active");

  if (categoryId) {
    query = query.eq("category_id", categoryId);
  }

  const { data, error } = await query.returns<ProductFilterRow[]>();

  if (error || !data) {
    return NextResponse.json({
      groups: [],
      totalProducts: 0,
      error: error?.message ?? null,
    });
  }

  const brandMap = new Map<string, number>();
  const stockMap = new Map<string, number>();
  const specMaps = new Map<string, Map<string, number>>();

  data.forEach((product) => {
    if (product.brand?.name) {
      incrementOption(brandMap, product.brand.name);
    }

    incrementOption(stockMap, getStockLabel(product.stock_status, locale));

    product.specifications?.forEach((spec) => {
      const key = getLocalizedSpecKey(spec, locale);
      const value = getLocalizedSpecValue(spec, locale);

      if (!key || !value) return;

      const groupMap = specMaps.get(key) ?? new Map<string, number>();
      incrementOption(groupMap, value);
      specMaps.set(key, groupMap);
    });
  });

  const groups: FilterGroup[] = [];

  if (brandMap.size > 0) {
    groups.push({
      key: "brand",
      label: t.brandGroup,
      type: "brand",
      options: mapToOptions(brandMap, locale),
    });
  }

  if (stockMap.size > 0) {
    groups.push({
      key: "stock",
      label: t.stockGroup,
      type: "stock",
      options: mapToOptions(stockMap, locale),
    });
  }

  const specGroups: FilterGroup[] = Array.from(specMaps.entries())
    .map(([key, map]) => ({
      key,
      label: key,
      type: "spec" as const,
      options: mapToOptions(map, locale),
    }))
    .filter((group) => group.options.length > 0);

  groups.push(...sortSpecGroups(specGroups, locale));

  return NextResponse.json({
    groups,
    totalProducts: data.length,
  });
}
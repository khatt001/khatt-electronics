import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getSpecSortIndex } from "@/lib/product-specs";

type ProductFilterRow = {
  id: string;
  stock_status: "in_stock" | "out_of_stock" | "pre_order";
  brand: {
    name: string;
  } | null;
  specifications: {
    spec_key_az: string;
    spec_value_az: string;
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



function normalizeValue(value: string | null | undefined) {
  return String(value ?? "").trim();
}

function incrementOption(map: Map<string, number>, value: string) {
  const cleanValue = normalizeValue(value);

  if (!cleanValue) return;

  map.set(cleanValue, (map.get(cleanValue) ?? 0) + 1);
}

function mapToOptions(map: Map<string, number>): FilterOption[] {
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

      return a.label.localeCompare(b.label, "az");
    });
}

function getStockLabel(stockStatus: ProductFilterRow["stock_status"]) {
  if (stockStatus === "in_stock") return "Stokda var";
  if (stockStatus === "pre_order") return "Öncədən sifariş";
  return "Stokda yoxdur";
}

function sortSpecGroups(groups: FilterGroup[]) {
  return groups.sort((a, b) => {
    const indexA = getSpecSortIndex(a.label);
    const indexB = getSpecSortIndex(b.label);

    if (indexA !== indexB) return indexA - indexB;

    return a.label.localeCompare(b.label, "az");
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
        spec_value_az
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

    incrementOption(stockMap, getStockLabel(product.stock_status));

    product.specifications?.forEach((spec) => {
      const key = normalizeValue(spec.spec_key_az);
      const value = normalizeValue(spec.spec_value_az);

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
      label: "Brand",
      type: "brand",
      options: mapToOptions(brandMap),
    });
  }

  if (stockMap.size > 0) {
    groups.push({
      key: "stock",
      label: "Stok vəziyyəti",
      type: "stock",
      options: mapToOptions(stockMap),
    });
  }

  const specGroups: FilterGroup[] = Array.from(specMaps.entries())
    .map(([key, map]) => ({
      key,
      label: key,
      type: "spec" as const,
      options: mapToOptions(map),
    }))
    .filter((group) => group.options.length > 0);

  groups.push(...sortSpecGroups(specGroups));

  return NextResponse.json({
    groups,
    totalProducts: data.length,
  });
}
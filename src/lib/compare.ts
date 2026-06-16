import type { CompareItem } from "@/types/compare";

export const COMPARE_STORAGE_KEY = "khatt_compare";
export const MAX_COMPARE_ITEMS = 4;

export function getCompareCount(items: CompareItem[]) {
  return items.length;
}

export function isValidCompareItem(item: unknown): item is CompareItem {
  if (!item || typeof item !== "object") return false;

  const candidate = item as CompareItem;

  return (
    typeof candidate.id === "string" &&
    typeof candidate.name === "string" &&
    typeof candidate.slug === "string" &&
    typeof candidate.price === "string" &&
    (typeof candidate.priceAmount === "number" ||
      candidate.priceAmount === null) &&
    (typeof candidate.imageUrl === "string" || candidate.imageUrl === null) &&
    typeof candidate.category === "string" &&
    (typeof candidate.brand === "string" || candidate.brand === null) &&
    ["in_stock", "out_of_stock", "pre_order"].includes(candidate.stockStatus) &&
    typeof candidate.stockQuantity === "number"
  );
}

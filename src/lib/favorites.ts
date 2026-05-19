import type { FavoriteItem } from "@/types/favorites";

export const FAVORITES_STORAGE_KEY = "khatt_favorites";

export function getFavoritesCount(items: FavoriteItem[]) {
  return items.length;
}

export function isValidFavoriteItem(item: unknown): item is FavoriteItem {
  if (!item || typeof item !== "object") return false;

  const candidate = item as FavoriteItem;

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
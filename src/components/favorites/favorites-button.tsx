"use client";

import { Heart } from "lucide-react";

import { useFavorites } from "@/components/favorites/favorites-provider";
import { cn } from "@/lib/utils";
import type { FavoriteItem } from "@/types/favorites";

export type FavoriteButtonLocale = "az" | "en" | "ru";

const favoriteButtonTranslations = {
  az: {
    add: "Sevimlilərə əlavə et",
    remove: "Sevimlilərdən sil",
  },
  en: {
    add: "Add to favorites",
    remove: "Remove from favorites",
  },
  ru: {
    add: "Добавить в избранное",
    remove: "Удалить из избранного",
  },
} as const;

type FavoriteButtonProps = {
  item: FavoriteItem;
  locale?: FavoriteButtonLocale;
};

export function FavoriteButton({
  item,
  locale = "az",
}: FavoriteButtonProps) {
  const { items, toggleFavorite } = useFavorites();
  const t = favoriteButtonTranslations[locale];

  const isFavorite = items.some(
    (favoriteItem) => favoriteItem.id === item.id,
  );

  const label = isFavorite ? t.remove : t.add;

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(item)}
      aria-label={label}
      aria-pressed={isFavorite}
      title={label}
      className={cn(
        "inline-flex size-10 shrink-0 items-center justify-center rounded-lg border bg-white text-neutral-700 shadow-sm transition",
        isFavorite
          ? "border-red-200 bg-red-50 text-red-600 hover:border-red-300 hover:bg-red-100"
          : "border-neutral-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600",
      )}
    >
      <Heart
        className={cn(
          "size-5 transition",
          isFavorite ? "fill-current" : "",
        )}
        aria-hidden="true"
      />
    </button>
  );
}
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

export function FavoriteButton({ item, locale = "az" }: FavoriteButtonProps) {
  const { items, toggleFavorite } = useFavorites();
  const t = favoriteButtonTranslations[locale];

  const isFavorite = items.some((favoriteItem) => favoriteItem.id === item.id);
  const label = isFavorite ? t.remove : t.add;

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(item)}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-full border border-white/70 bg-white/90 text-neutral-800 shadow-sm backdrop-blur transition hover:bg-white",
        isFavorite ? "text-red-600" : "hover:text-red-600"
      )}
    >
      <Heart
        className={cn("size-5", isFavorite ? "fill-current" : "")}
        aria-hidden="true"
      />
    </button>
  );
}
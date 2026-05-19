"use client";

import { Heart } from "lucide-react";
import { useFavorites } from "@/components/favorites/favorites-provider";
import type { FavoriteItem } from "@/types/favorites";
import { cn } from "@/lib/utils";

type FavoriteButtonProps = {
  item: FavoriteItem;
  className?: string;
};

export function FavoriteButton({ item, className }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();

  const active = isFavorite(item.id);

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(item)}
      aria-label={active ? "Sevimlilərdən çıxar" : "Sevimlilərə əlavə et"}
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 transition hover:border-neutral-950 hover:text-neutral-950",
        active && "border-red-200 bg-red-50 text-red-600 hover:text-red-600",
        className
      )}
    >
      <Heart
        className={cn("size-4", active && "fill-current")}
        aria-hidden="true"
      />
    </button>
  );
}
"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

import { useFavorites } from "@/components/favorites/favorites-provider";
import { localizedPath } from "@/lib/i18n";

type FavoritesNavLocale = "az" | "en" | "ru";

const favoritesNavTranslations = {
  az: {
    ariaLabel: "Sevimlilərə keç",
  },
  en: {
    ariaLabel: "Go to favorites",
  },
  ru: {
    ariaLabel: "Перейти в избранное",
  },
} as const;

type FavoritesNavLinkProps = {
  locale?: FavoritesNavLocale;
};

export function FavoritesNavLink({ locale = "az" }: FavoritesNavLinkProps) {
  const { items } = useFavorites();
  const t = favoritesNavTranslations[locale];

  const visibleCount = items.length > 99 ? "99+" : items.length;

  return (
    <Link
      href={localizedPath("/favorites", locale)}
      aria-label={t.ariaLabel}
      className="relative inline-flex size-10 shrink-0 items-center justify-center rounded-lg text-neutral-800 transition hover:bg-red-50 hover:text-red-600"
    >
      <Heart className="size-[21px]" aria-hidden="true" />

      {items.length > 0 ? (
        <span className="absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-md bg-red-600 px-1 text-[10px] font-semibold leading-none text-white shadow-sm">
          {visibleCount}
        </span>
      ) : null}
    </Link>
  );
}

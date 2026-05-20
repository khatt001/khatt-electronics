"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useFavorites } from "@/components/favorites/favorites-provider";

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

function getFavoritesHref(locale: FavoritesNavLocale) {
  if (locale === "az") {
    return "/favorites";
  }

  return `/${locale}/favorites`;
}

export function FavoritesNavLink({ locale = "az" }: FavoritesNavLinkProps) {
  const { items } = useFavorites();
  const t = favoritesNavTranslations[locale];

  return (
    <Link
      href={getFavoritesHref(locale)}
      aria-label={t.ariaLabel}
      className="relative inline-flex size-10 items-center justify-center rounded-full text-neutral-800 transition hover:bg-neutral-100"
    >
      <Heart size={21} aria-hidden="true" />

      {items.length > 0 ? (
        <span className="absolute -right-1 -top-1 flex min-w-5 items-center justify-center rounded-full bg-neutral-950 px-1.5 text-[11px] font-semibold text-white">
          {items.length}
        </span>
      ) : null}
    </Link>
  );
}
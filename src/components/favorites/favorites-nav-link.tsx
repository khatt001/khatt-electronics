"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useFavorites } from "@/components/favorites/favorites-provider";

export function FavoritesNavLink() {
  const { count } = useFavorites();

  return (
    <Link
      href="/favorites"
      aria-label="Sevimlilər"
      className="relative hidden size-10 items-center justify-center rounded-full text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-950 md:inline-flex"
    >
      <Heart size={18} aria-hidden="true" />

      {count > 0 ? (
        <span className="absolute -right-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-semibold text-white">
          {count > 9 ? "9+" : count}
        </span>
      ) : null}
    </Link>
  );
}
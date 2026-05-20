import type { Metadata } from "next";
import { FavoritesPageClient } from "@/components/favorites/favorites-page-client";
import { favoritesTranslations } from "@/data/translations/favorites";

const t = favoritesTranslations.az;

export const metadata: Metadata = {
  title: t.metadataTitle,
  description: t.metadataDescription,
  alternates: {
    canonical: "/favorites",
    languages: {
      az: "/favorites",
      en: "/en/favorites",
      ru: "/ru/favorites",
    },
  },
};

export default function FavoritesPage() {
  return <FavoritesPageClient locale="az" />;
}
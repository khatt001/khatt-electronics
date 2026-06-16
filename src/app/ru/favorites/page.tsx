import { FavoritesPageClient } from "@/components/favorites/favorites-page-client";
import { generateStaticPageMetadata } from "@/lib/page-metadata";

export const metadata = generateStaticPageMetadata({
  page: "favorites",
  locale: "ru",
});

export default function RussianFavoritesPage() {
  return <FavoritesPageClient locale="ru" />;
}

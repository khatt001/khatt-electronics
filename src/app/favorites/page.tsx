import { FavoritesPageClient } from "@/components/favorites/favorites-page-client";
import { generateStaticPageMetadata } from "@/lib/page-metadata";

export const metadata = generateStaticPageMetadata({
  page: "favorites",
  locale: "az",
});

export default function FavoritesPage() {
  return <FavoritesPageClient locale="az" />;
}
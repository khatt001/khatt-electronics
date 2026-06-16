import { FavoritesPageClient } from "@/components/favorites/favorites-page-client";
import { generateStaticPageMetadata } from "@/lib/page-metadata";

export const metadata = generateStaticPageMetadata({
  page: "favorites",
  locale: "en",
});

export default function EnglishFavoritesPage() {
  return <FavoritesPageClient locale="en" />;
}

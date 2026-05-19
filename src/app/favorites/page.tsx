import type { Metadata } from "next";
import { FavoritesPageClient } from "@/components/favorites/favorites-page-client";

export const metadata: Metadata = {
  title: "Sevimlilər",
  description:
    "KHATT Electronics sevimli məhsullar səhifəsi. Bəyəndiyiniz məhsulları saxlayın və sonra sifariş edin.",
  alternates: {
    canonical: "/favorites",
  },
};

export default function FavoritesPage() {
  return <FavoritesPageClient />;
}
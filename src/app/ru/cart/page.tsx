import type { Metadata } from "next";
import { CartPageClient } from "@/components/cart/cart-page-client";
import { cartTranslations } from "@/data/translations/cart";

const t = cartTranslations.ru;

export const metadata: Metadata = {
  title: t.metadataTitle,
  description: t.metadataDescription,
  alternates: {
    canonical: "/ru/cart",
    languages: {
      az: "/cart",
      en: "/en/cart",
      ru: "/ru/cart",
    },
  },
};

export default function RussianCartPage() {
  return <CartPageClient locale="ru" />;
}
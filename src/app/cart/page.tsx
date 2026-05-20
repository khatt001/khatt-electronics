import type { Metadata } from "next";
import { CartPageClient } from "@/components/cart/cart-page-client";
import { cartTranslations } from "@/data/translations/cart";

const t = cartTranslations.az;

export const metadata: Metadata = {
  title: t.metadataTitle,
  description: t.metadataDescription,
  alternates: {
    canonical: "/cart",
    languages: {
      az: "/cart",
      en: "/en/cart",
      ru: "/ru/cart",
    },
  },
};

export default function CartPage() {
  return <CartPageClient locale="az" />;
}
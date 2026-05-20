import type { Metadata } from "next";
import { CheckoutPageClient } from "@/components/checkout/checkout-page-client";
import { checkoutTranslations } from "@/data/translations/checkout";

const t = checkoutTranslations.ru;

export const metadata: Metadata = {
  title: t.metadataTitle,
  description: t.metadataDescription,
  alternates: {
    canonical: "/ru/checkout",
    languages: {
      az: "/checkout",
      en: "/en/checkout",
      ru: "/ru/checkout",
    },
  },
};

export default function RussianCheckoutPage() {
  return <CheckoutPageClient locale="ru" />;
}
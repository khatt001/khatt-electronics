import type { Metadata } from "next";
import { CheckoutPageClient } from "@/components/checkout/checkout-page-client";
import { checkoutTranslations } from "@/data/translations/checkout";

const t = checkoutTranslations.en;

export const metadata: Metadata = {
  title: t.metadataTitle,
  description: t.metadataDescription,
  alternates: {
    canonical: "/en/checkout",
    languages: {
      az: "/checkout",
      en: "/en/checkout",
      ru: "/ru/checkout",
    },
  },
};

export default function EnglishCheckoutPage() {
  return <CheckoutPageClient locale="en" />;
}
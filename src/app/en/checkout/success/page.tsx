import type { Metadata } from "next";
import { CheckoutSuccessPage } from "@/components/checkout/checkout-success-page";
import { checkoutSuccessTranslations } from "@/data/translations/checkout-success";

const t = checkoutSuccessTranslations.en;

type CheckoutSuccessRouteProps = {
  searchParams: Promise<{
    order?: string;
  }>;
};

export const metadata: Metadata = {
  title: t.metadataTitle,
  description: t.metadataDescription,
  alternates: {
    canonical: "/en/checkout/success",
    languages: {
      az: "/checkout/success",
      en: "/en/checkout/success",
      ru: "/ru/checkout/success",
    },
  },
};

export default async function EnglishCheckoutSuccessRoute({
  searchParams,
}: CheckoutSuccessRouteProps) {
  const query = await searchParams;

  return <CheckoutSuccessPage locale="en" orderNumber={query.order} />;
}
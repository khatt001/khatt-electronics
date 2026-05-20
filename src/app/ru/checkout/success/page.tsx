import type { Metadata } from "next";
import { CheckoutSuccessPage } from "@/components/checkout/checkout-success-page";
import { checkoutSuccessTranslations } from "@/data/translations/checkout-success";

const t = checkoutSuccessTranslations.ru;

type CheckoutSuccessRouteProps = {
  searchParams: Promise<{
    order?: string;
  }>;
};

export const metadata: Metadata = {
  title: t.metadataTitle,
  description: t.metadataDescription,
  alternates: {
    canonical: "/ru/checkout/success",
    languages: {
      az: "/checkout/success",
      en: "/en/checkout/success",
      ru: "/ru/checkout/success",
    },
  },
};

export default async function RussianCheckoutSuccessRoute({
  searchParams,
}: CheckoutSuccessRouteProps) {
  const query = await searchParams;

  return <CheckoutSuccessPage locale="ru" orderNumber={query.order} />;
}
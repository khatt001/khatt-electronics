import { CheckoutSuccessPage } from "@/components/checkout/checkout-success-page";
import { generateCheckoutSuccessMetadata } from "@/lib/page-metadata";

type CheckoutSuccessRouteProps = {
  searchParams: Promise<{
    order?: string;
  }>;
};

export const metadata = generateCheckoutSuccessMetadata({
  locale: "ru",
});

export default async function RussianCheckoutSuccessRoute({
  searchParams,
}: CheckoutSuccessRouteProps) {
  const query = await searchParams;

  return <CheckoutSuccessPage locale="ru" orderNumber={query.order} />;
}
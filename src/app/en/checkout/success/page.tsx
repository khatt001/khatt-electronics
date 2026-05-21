import { CheckoutSuccessPage } from "@/components/checkout/checkout-success-page";
import { generateCheckoutSuccessMetadata } from "@/lib/page-metadata";

type CheckoutSuccessRouteProps = {
  searchParams: Promise<{
    order?: string;
  }>;
};

export const metadata = generateCheckoutSuccessMetadata({
  locale: "en",
});

export default async function EnglishCheckoutSuccessRoute({
  searchParams,
}: CheckoutSuccessRouteProps) {
  const query = await searchParams;

  return <CheckoutSuccessPage locale="en" orderNumber={query.order} />;
}
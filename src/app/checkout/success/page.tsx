import { CheckoutSuccessPage } from "@/components/checkout/checkout-success-page";
import { generateCheckoutSuccessMetadata } from "@/lib/page-metadata";

type CheckoutSuccessRouteProps = {
  searchParams: Promise<{
    order?: string;
  }>;
};

export const metadata = generateCheckoutSuccessMetadata({
  locale: "az",
});

export default async function CheckoutSuccessRoute({
  searchParams,
}: CheckoutSuccessRouteProps) {
  const query = await searchParams;

  return <CheckoutSuccessPage locale="az" orderNumber={query.order} />;
}

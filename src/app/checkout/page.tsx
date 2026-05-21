import { CheckoutPageClient } from "@/components/checkout/checkout-page-client";
import { generateStaticPageMetadata } from "@/lib/page-metadata";

export const metadata = generateStaticPageMetadata({
  page: "checkout",
  locale: "az",
});

export default function CheckoutPage() {
  return <CheckoutPageClient locale="az" />;
}
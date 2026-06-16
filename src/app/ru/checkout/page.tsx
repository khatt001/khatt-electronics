import { CheckoutPageClient } from "@/components/checkout/checkout-page-client";
import { generateStaticPageMetadata } from "@/lib/page-metadata";

export const metadata = generateStaticPageMetadata({
  page: "checkout",
  locale: "ru",
});

export default function RussianCheckoutPage() {
  return <CheckoutPageClient locale="ru" />;
}

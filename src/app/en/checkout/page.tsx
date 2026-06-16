import { CheckoutPageClient } from "@/components/checkout/checkout-page-client";
import { generateStaticPageMetadata } from "@/lib/page-metadata";

export const metadata = generateStaticPageMetadata({
  page: "checkout",
  locale: "en",
});

export default function EnglishCheckoutPage() {
  return <CheckoutPageClient locale="en" />;
}

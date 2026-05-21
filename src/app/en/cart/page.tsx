import { CartPageClient } from "@/components/cart/cart-page-client";
import { generateStaticPageMetadata } from "@/lib/page-metadata";

export const metadata = generateStaticPageMetadata({
  page: "cart",
  locale: "en",
});

export default function EnglishCartPage() {
  return <CartPageClient locale="en" />;
}
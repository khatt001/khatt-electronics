import { CartPageClient } from "@/components/cart/cart-page-client";
import { generateStaticPageMetadata } from "@/lib/page-metadata";

export const metadata = generateStaticPageMetadata({
  page: "cart",
  locale: "az",
});

export default function CartPage() {
  return <CartPageClient locale="az" />;
}
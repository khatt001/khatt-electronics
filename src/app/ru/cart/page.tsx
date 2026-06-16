import { CartPageClient } from "@/components/cart/cart-page-client";
import { generateStaticPageMetadata } from "@/lib/page-metadata";

export const metadata = generateStaticPageMetadata({
  page: "cart",
  locale: "ru",
});

export default function RussianCartPage() {
  return <CartPageClient locale="ru" />;
}

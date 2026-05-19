import type { Metadata } from "next";
import { CartPageClient } from "@/components/cart/cart-page-client";

export const metadata: Metadata = {
  title: "Səbət",
  description:
    "KHATT Electronics səbət səhifəsi. Məhsullarınızı səbətə əlavə edin və sifarişi tamamlayın.",
  alternates: {
    canonical: "/cart",
  },
};

export default function CartPage() {
  return <CartPageClient />;
}
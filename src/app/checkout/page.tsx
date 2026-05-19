import type { Metadata } from "next";
import { CheckoutPageClient } from "@/components/checkout/checkout-page-client";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "KHATT Electronics checkout səhifəsi. Sifariş məlumatlarını daxil edin və sifarişi tamamlayın.",
  alternates: {
    canonical: "/checkout",
  },
};

export default function CheckoutPage() {
  return <CheckoutPageClient />;
}
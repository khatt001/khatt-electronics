import type { Metadata } from "next";
import { ComparePageClient } from "@/components/compare/compare-page-client";

export const metadata: Metadata = {
  title: "Məhsul müqayisəsi",
  description:
    "KHATT Electronics məhsullarını qiymət, kateqoriya, brend və stok vəziyyətinə görə müqayisə edin.",
  alternates: {
    canonical: "/compare",
  },
};

export default function ComparePage() {
  return <ComparePageClient />;
}
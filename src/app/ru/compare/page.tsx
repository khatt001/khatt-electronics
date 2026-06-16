import { ComparePageClient } from "@/components/compare/compare-page-client";
import { generateStaticPageMetadata } from "@/lib/page-metadata";

export const metadata = generateStaticPageMetadata({
  page: "compare",
  locale: "ru",
});

export default function RussianComparePage() {
  return <ComparePageClient locale="ru" />;
}

import { ComparePageClient } from "@/components/compare/compare-page-client";
import { generateStaticPageMetadata } from "@/lib/page-metadata";

export const metadata = generateStaticPageMetadata({
  page: "compare",
  locale: "az",
});

export default function ComparePage() {
  return <ComparePageClient locale="az" />;
}
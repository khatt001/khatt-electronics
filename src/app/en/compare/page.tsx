import { ComparePageClient } from "@/components/compare/compare-page-client";
import { generateStaticPageMetadata } from "@/lib/page-metadata";

export const metadata = generateStaticPageMetadata({
  page: "compare",
  locale: "en",
});

export default function EnglishComparePage() {
  return <ComparePageClient locale="en" />;
}
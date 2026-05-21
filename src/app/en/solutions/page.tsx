import { SolutionsPageView } from "@/components/solutions/solutions-page-view";
import { generateStaticPageMetadata } from "@/lib/page-metadata";

export const metadata = generateStaticPageMetadata({
  page: "solutions",
  locale: "en",
});

export default function EnglishSolutionsPage() {
  return <SolutionsPageView locale="en" />;
}
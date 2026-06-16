import { SolutionsPageView } from "@/components/solutions/solutions-page-view";
import { generateStaticPageMetadata } from "@/lib/page-metadata";

export const metadata = generateStaticPageMetadata({
  page: "solutions",
  locale: "az",
});

export default function SolutionsPage() {
  return <SolutionsPageView locale="az" />;
}

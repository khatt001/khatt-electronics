import { SolutionsPageView } from "@/components/solutions/solutions-page-view";
import { generateStaticPageMetadata } from "@/lib/page-metadata";

export const metadata = generateStaticPageMetadata({
  page: "solutions",
  locale: "ru",
});

export default function RussianSolutionsPage() {
  return <SolutionsPageView locale="ru" />;
}
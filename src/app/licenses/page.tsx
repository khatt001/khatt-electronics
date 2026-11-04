import { LicensesPageView } from "@/components/licenses/licenses-page-view";
import { generateStaticPageMetadata } from "@/lib/page-metadata";

export const metadata = generateStaticPageMetadata({
  page: "licenses",
  locale: "az",
});

export default function LicensesPage() {
  return <LicensesPageView locale="az" />;
}

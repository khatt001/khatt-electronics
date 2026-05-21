import { ServicesPageView } from "@/components/services/services-page-view";
import { generateStaticPageMetadata } from "@/lib/page-metadata";

export const metadata = generateStaticPageMetadata({
  page: "services",
  locale: "az",
});

export default function ServicesPage() {
  return <ServicesPageView locale="az" />;
}
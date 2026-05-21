import { ServicesPageView } from "@/components/services/services-page-view";
import { generateStaticPageMetadata } from "@/lib/page-metadata";

export const metadata = generateStaticPageMetadata({
  page: "services",
  locale: "en",
});

export default function EnglishServicesPage() {
  return <ServicesPageView locale="en" />;
}
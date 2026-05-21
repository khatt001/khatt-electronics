import { ServicesPageView } from "@/components/services/services-page-view";
import { generateStaticPageMetadata } from "@/lib/page-metadata";

export const metadata = generateStaticPageMetadata({
  page: "services",
  locale: "ru",
});

export default function RussianServicesPage() {
  return <ServicesPageView locale="ru" />;
}
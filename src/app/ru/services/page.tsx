import type { Metadata } from "next";
import { ServicesPageView } from "@/components/services/services-page-view";
import { servicesPageTranslations } from "@/data/translations/services-page";

const t = servicesPageTranslations.ru;

export const metadata: Metadata = {
  title: t.metadataTitle,
  description: t.metadataDescription,
  alternates: {
    canonical: "/ru/services",
    languages: {
      az: "/services",
      en: "/en/services",
      ru: "/ru/services",
    },
  },
};

export default function RussianServicesPage() {
  return <ServicesPageView locale="ru" />;
}
import type { Metadata } from "next";
import { ServicesPageView } from "@/components/services/services-page-view";
import { servicesPageTranslations } from "@/data/translations/services-page";

const t = servicesPageTranslations.az;

export const metadata: Metadata = {
  title: t.metadataTitle,
  description: t.metadataDescription,
  alternates: {
    canonical: "/services",
    languages: {
      az: "/services",
      en: "/en/services",
      ru: "/ru/services",
    },
  },
};

export default function ServicesPage() {
  return <ServicesPageView locale="az" />;
}
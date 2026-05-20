import type { Metadata } from "next";
import { AboutPageView } from "@/components/about/about-page-view";
import { aboutTranslations } from "@/data/translations/about";

const t = aboutTranslations.ru;

export const metadata: Metadata = {
  title: t.metadataTitle,
  description: t.metadataDescription,
  alternates: {
    canonical: "/ru/about",
    languages: {
      az: "/about",
      en: "/en/about",
      ru: "/ru/about",
    },
  },
};

export default function RussianAboutPage() {
  return <AboutPageView locale="ru" />;
}
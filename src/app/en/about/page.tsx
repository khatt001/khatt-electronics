import type { Metadata } from "next";
import { AboutPageView } from "@/components/about/about-page-view";
import { aboutTranslations } from "@/data/translations/about";

const t = aboutTranslations.en;

export const metadata: Metadata = {
  title: t.metadataTitle,
  description: t.metadataDescription,
  alternates: {
    canonical: "/en/about",
    languages: {
      az: "/about",
      en: "/en/about",
      ru: "/ru/about",
    },
  },
};

export default function EnglishAboutPage() {
  return <AboutPageView locale="en" />;
}
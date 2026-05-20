import type { Metadata } from "next";
import { AboutPageView } from "@/components/about/about-page-view";
import { aboutTranslations } from "@/data/translations/about";

const t = aboutTranslations.az;

export const metadata: Metadata = {
  title: t.metadataTitle,
  description: t.metadataDescription,
  alternates: {
    canonical: "/about",
    languages: {
      az: "/about",
      en: "/en/about",
      ru: "/ru/about",
    },
  },
};

export default function AboutPage() {
  return <AboutPageView locale="az" />;
}
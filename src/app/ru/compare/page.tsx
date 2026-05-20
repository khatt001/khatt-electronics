import type { Metadata } from "next";
import { ComparePageClient } from "@/components/compare/compare-page-client";
import { compareTranslations } from "@/data/translations/compare";

const t = compareTranslations.ru;

export const metadata: Metadata = {
  title: t.metadataTitle,
  description: t.metadataDescription,
  alternates: {
    canonical: "/ru/compare",
    languages: {
      az: "/compare",
      en: "/en/compare",
      ru: "/ru/compare",
    },
  },
};

export default function RussianComparePage() {
  return <ComparePageClient locale="ru" />;
}
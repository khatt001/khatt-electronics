import type { Metadata } from "next";
import { ComparePageClient } from "@/components/compare/compare-page-client";
import { compareTranslations } from "@/data/translations/compare";

const t = compareTranslations.az;

export const metadata: Metadata = {
  title: t.metadataTitle,
  description: t.metadataDescription,
  alternates: {
    canonical: "/compare",
    languages: {
      az: "/compare",
      en: "/en/compare",
      ru: "/ru/compare",
    },
  },
};

export default function ComparePage() {
  return <ComparePageClient locale="az" />;
}
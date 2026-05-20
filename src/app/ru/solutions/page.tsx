import type { Metadata } from "next";
import { SolutionsPageView } from "@/components/solutions/solutions-page-view";
import { solutionsPageTranslations } from "@/data/translations/solutions-page";

const t = solutionsPageTranslations.ru;

export const metadata: Metadata = {
  title: t.metadataTitle,
  description: t.metadataDescription,
  alternates: {
    canonical: "/ru/solutions",
    languages: {
      az: "/solutions",
      en: "/en/solutions",
      ru: "/ru/solutions",
    },
  },
};

export default function RussianSolutionsPage() {
  return <SolutionsPageView locale="ru" />;
}
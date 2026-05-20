import type { Metadata } from "next";
import { SolutionsPageView } from "@/components/solutions/solutions-page-view";
import { solutionsPageTranslations } from "@/data/translations/solutions-page";

const t = solutionsPageTranslations.en;

export const metadata: Metadata = {
  title: t.metadataTitle,
  description: t.metadataDescription,
  alternates: {
    canonical: "/en/solutions",
    languages: {
      az: "/solutions",
      en: "/en/solutions",
      ru: "/ru/solutions",
    },
  },
};

export default function EnglishSolutionsPage() {
  return <SolutionsPageView locale="en" />;
}
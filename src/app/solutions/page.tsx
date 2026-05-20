import type { Metadata } from "next";
import { SolutionsPageView } from "@/components/solutions/solutions-page-view";
import { solutionsPageTranslations } from "@/data/translations/solutions-page";

const t = solutionsPageTranslations.az;

export const metadata: Metadata = {
  title: t.metadataTitle,
  description: t.metadataDescription,
  alternates: {
    canonical: "/solutions",
    languages: {
      az: "/solutions",
      en: "/en/solutions",
      ru: "/ru/solutions",
    },
  },
};

export default function SolutionsPage() {
  return <SolutionsPageView locale="az" />;
}
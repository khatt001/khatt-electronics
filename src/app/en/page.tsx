import type { Metadata } from "next";
import { HomePageContent } from "@/components/home/home-page-content";

export const metadata: Metadata = {
  title: { absolute: "KHATT Electronics | Fire protection systems" },
  description:
    "Licensed fire protection company in Azerbaijan: fire alarm, automatic extinguishing, warning and evacuation systems, maintenance and construction-installation works.",
  alternates: {
    canonical: "/en",
    languages: {
      az: "/",
      en: "/en",
      ru: "/ru",
    },
  },
  openGraph: {
    title: "KHATT Electronics | Fire protection systems",
    description:
    "Licensed fire protection company in Azerbaijan: fire alarm, automatic extinguishing, warning and evacuation systems, maintenance and construction-installation works.",
    url: "/en",
    type: "website",
  },
};

export default function EnglishHomePage() {
  return <HomePageContent locale="en" />;
}

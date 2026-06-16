import type { Metadata } from "next";
import { HomePageContent } from "@/components/home/home-page-content";

export const metadata: Metadata = {
  title: "KHATT Electronics | Security and smart electronics",
  description:
    "KHATT Electronics offers CCTV systems, access control, intercoms, alarm systems and networking equipment in Azerbaijan.",
  alternates: {
    canonical: "/en",
    languages: {
      az: "/",
      en: "/en",
      ru: "/ru",
    },
  },
  openGraph: {
    title: "KHATT Electronics | Security and smart electronics",
    description:
      "CCTV systems, access control, intercoms, alarm systems and networking equipment.",
    url: "/en",
    type: "website",
  },
};

export default function EnglishHomePage() {
  return <HomePageContent locale="en" />;
}

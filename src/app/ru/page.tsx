import type { Metadata } from "next";
import { HomePageContent } from "@/components/home/home-page-content";

export const metadata: Metadata = {
  title: "KHATT Electronics | Безопасность и умная электроника",
  description:
    "KHATT Electronics предлагает системы видеонаблюдения, контроль доступа, домофоны, сигнализацию и сетевое оборудование в Азербайджане.",
  alternates: {
    canonical: "/ru",
    languages: {
      az: "/",
      en: "/en",
      ru: "/ru",
    },
  },
  openGraph: {
    title: "KHATT Electronics | Безопасность и умная электроника",
    description:
      "Системы видеонаблюдения, контроль доступа, домофоны, сигнализация и сетевое оборудование.",
    url: "/ru",
    type: "website",
  },
};

export default function RussianHomePage() {
  return <HomePageContent locale="ru" />;
}
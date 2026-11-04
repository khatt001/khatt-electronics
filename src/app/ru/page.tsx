import type { Metadata } from "next";
import { HomePageContent } from "@/components/home/home-page-content";

export const metadata: Metadata = {
  title: { absolute: "KHATT Electronics | Системы противопожарной защиты" },
  description:
    "Лицензированная компания в Азербайджане: пожарная сигнализация, автоматическое пожаротушение, оповещение и эвакуация, обслуживание и строительно-монтажные работы.",
  alternates: {
    canonical: "/ru",
    languages: {
      az: "/",
      en: "/en",
      ru: "/ru",
    },
  },
  openGraph: {
    title: "KHATT Electronics | Системы противопожарной защиты",
    description:
    "Лицензированная компания в Азербайджане: пожарная сигнализация, автоматическое пожаротушение, оповещение и эвакуация, обслуживание и строительно-монтажные работы.",
    url: "/ru",
    type: "website",
  },
};

export default function RussianHomePage() {
  return <HomePageContent locale="ru" />;
}

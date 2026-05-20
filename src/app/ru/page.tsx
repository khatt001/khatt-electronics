import type { Metadata } from "next";
import { CategoryGrid } from "@/components/home/category-grid";
import { FeaturedProducts } from "@/components/home/featured-products";
import { HomeHero } from "@/components/home/home-hero";
import { SearchStrip } from "@/components/home/search-strip";
import { ServicesSection } from "@/components/home/services-section";

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
  return (
    <main className="min-h-screen bg-[#f6f6f4] pt-16 lg:pt-[8.25rem] xl:pt-[7.5rem]">
      <HomeHero locale="ru" />
      <SearchStrip />
      <FeaturedProducts />
      <CategoryGrid />
      <ServicesSection />
    </main>
  );
}
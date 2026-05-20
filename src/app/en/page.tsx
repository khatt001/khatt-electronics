import type { Metadata } from "next";
import { CategoryGrid } from "@/components/home/category-grid";
import { FeaturedProducts } from "@/components/home/featured-products";
import { HomeHero } from "@/components/home/home-hero";
import { SearchStrip } from "@/components/home/search-strip";
import { ServicesSection } from "@/components/home/services-section";

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
  return (
    <main className="min-h-screen bg-[#f6f6f4] pt-16 lg:pt-[8.25rem] xl:pt-[7.5rem]">
      <HomeHero locale="en" />
      <SearchStrip />
      <FeaturedProducts />
      <CategoryGrid />
      <ServicesSection />
    </main>
  );
}
import { BrandsSection } from "@/components/home/brands-section";
import { CategoryGrid } from "@/components/home/category-grid";
import { FeaturedProducts } from "@/components/home/featured-products";
import { HomeHero } from "@/components/home/home-hero";
import { PromoBanners } from "@/components/home/promo-banners";
import { ServicesSection } from "@/components/home/services-section";
import type { Locale } from "@/lib/i18n";

type HomePageContentProps = {
  locale: Locale;
};

export function HomePageContent({ locale }: HomePageContentProps) {
  return (
    <main className="min-h-screen bg-[#f5f6f8] pt-16 lg:pt-[8.25rem] xl:pt-[7.5rem]">
      <HomeHero locale={locale} />
      <CategoryGrid locale={locale} />
      <FeaturedProducts locale={locale} />
      <PromoBanners locale={locale} />
      <BrandsSection locale={locale} />
      <ServicesSection locale={locale} />
    </main>
  );
}
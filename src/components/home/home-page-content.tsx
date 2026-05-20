import { CategoryGrid } from "@/components/home/category-grid";
import { FeaturedProducts } from "@/components/home/featured-products";
import { HomeHero } from "@/components/home/home-hero";
import { SearchStrip } from "@/components/home/search-strip";
import { ServicesSection } from "@/components/home/services-section";
import type { Locale } from "@/lib/i18n";

type HomePageContentProps = {
  locale: Locale;
};

export function HomePageContent({ locale }: HomePageContentProps) {
  return (
    <main className="min-h-screen bg-[#f6f6f4] pt-16 lg:pt-[8.25rem] xl:pt-[7.5rem]">
      <HomeHero locale={locale} />
      <SearchStrip locale={locale} />
      <FeaturedProducts locale={locale} />
      <CategoryGrid locale={locale} />
      <ServicesSection locale={locale} />
    </main>
  );
}
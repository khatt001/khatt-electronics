import { BrandsSection } from "@/components/home/brands-section";
import { CategoryGrid } from "@/components/home/category-grid";
import { FeaturedProducts } from "@/components/home/featured-products";
import { HomeHero } from "@/components/home/home-hero";
import { QuoteSection } from "@/components/home/quote-section";
import { WorkProcessSection } from "@/components/home/work-process-section";
import type { Locale } from "@/lib/i18n";

type HomePageContentProps = {
  locale: Locale;
};

export function HomePageContent({ locale }: HomePageContentProps) {
  return (
    <div className="min-h-screen bg-white">
      <HomeHero locale={locale} />

      <CategoryGrid locale={locale} />

      <WorkProcessSection locale={locale} />

      <FeaturedProducts locale={locale} />

      <BrandsSection locale={locale} />

      <QuoteSection locale={locale} />
    </div>
  );
}
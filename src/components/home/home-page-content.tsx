import { BrandsSection } from "@/components/home/brands-section";
import { CategoryGrid } from "@/components/home/category-grid";
import { FeaturedProducts } from "@/components/home/featured-products";
import { FireServicesSection } from "@/components/home/fire-services-section";
import { HomeHero } from "@/components/home/home-hero";
import { PromoBanners } from "@/components/home/promo-banners";
import { QuoteSection } from "@/components/home/quote-section";
import { TrustBar } from "@/components/home/trust-bar";
import { WorkProcessSection } from "@/components/home/work-process-section";
import type { Locale } from "@/lib/i18n";

type HomePageContentProps = {
  locale: Locale;
};

export function HomePageContent({ locale }: HomePageContentProps) {
  return (
    <div className="min-h-screen bg-[#f5f6f8]">
      <HomeHero locale={locale} />

      <TrustBar locale={locale} />

      <FireServicesSection locale={locale} />

      <WorkProcessSection locale={locale} />

      <CategoryGrid locale={locale} />

      <FeaturedProducts locale={locale} />

      <PromoBanners locale={locale} />

      <BrandsSection locale={locale} />

      <QuoteSection locale={locale} />
    </div>
  );
}
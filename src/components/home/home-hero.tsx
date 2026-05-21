import { Container } from "@/components/layout/container";
import { CatalogSidebar } from "@/components/home/catalog-sidebar";
import { HeroBanner } from "@/components/home/hero-banner";
import { PromoCards } from "@/components/home/promo-cards";
import type { Locale } from "@/lib/i18n";

type HomeHeroProps = {
  locale?: Locale;
};

export function HomeHero({ locale = "az" }: HomeHeroProps) {
  return (
    <section className="border-b border-black/10 bg-white">
      <Container className="py-5 lg:py-6">
        <div className="grid gap-5 xl:grid-cols-[280px_minmax(0,1fr)_280px]">
          <CatalogSidebar locale={locale} />
          <HeroBanner locale={locale} />
          <PromoCards locale={locale} />
        </div>
      </Container>
    </section>
  );
}
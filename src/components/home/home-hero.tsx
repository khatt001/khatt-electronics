import { Container } from "@/components/layout/container";
import { CatalogSidebar } from "@/components/home/catalog-sidebar";
import { HeroBanner } from "@/components/home/hero-banner";
import { PromoCards } from "@/components/home/promo-cards";
import type { Locale } from "@/data/translations/home";

type HomeHeroProps = {
  locale?: Locale;
};

export function HomeHero({ locale = "az" }: HomeHeroProps) {
  return (
    <section className="border-b border-black/10 bg-white">
      <Container className="py-5">
        <div className="grid gap-4 lg:grid-cols-[280px_1fr_280px]">
          <CatalogSidebar locale={locale} />
          <HeroBanner locale={locale} />
          <PromoCards locale={locale} />
        </div>
      </Container>
    </section>
  );
}
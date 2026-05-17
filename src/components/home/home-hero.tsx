import { Container } from "@/components/layout/container";
import { CatalogSidebar } from "@/components/home/catalog-sidebar";
import { HeroBanner } from "@/components/home/hero-banner";
import { PromoCards } from "@/components/home/promo-cards";

export function HomeHero() {
  return (
    <section className="border-b border-black/10 bg-white">
      <Container className="py-5">
        <div className="grid gap-4 lg:grid-cols-[280px_1fr_280px]">
          <CatalogSidebar />
          <HeroBanner />
          <PromoCards />
        </div>
      </Container>
    </section>
  );
}
import { CategoryGrid } from "@/components/home/category-grid";
import { FeaturedProducts } from "@/components/home/featured-products";
import { HomeHero } from "@/components/home/home-hero";
import { SearchStrip } from "@/components/home/search-strip";
import { ServicesSection } from "@/components/home/services-section";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f6f6f4] pt-16 lg:pt-[8.25rem] xl:pt-[7.5rem]">
      <HomeHero />
      <SearchStrip />
      <FeaturedProducts />
      <CategoryGrid />
      <ServicesSection />
    </main>
  );
}
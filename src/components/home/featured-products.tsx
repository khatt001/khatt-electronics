import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ProductCard } from "@/components/product/product-card";
import { featuredProducts } from "@/data/home";

export function FeaturedProducts() {
  return (
    <section className="section-spacing">
      <Container>
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">
              Məhsullar
            </p>
            <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
              Seçilmiş məhsullar
            </h2>
          </div>

          <Link
            href="/products"
            className="hidden text-sm font-medium text-neutral-700 transition hover:text-neutral-950 sm:inline-flex"
          >
            Hamısına bax
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.href} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
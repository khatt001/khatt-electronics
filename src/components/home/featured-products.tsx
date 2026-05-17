import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ProductCard } from "@/components/product/product-card";
import { getFeaturedProducts } from "@/services/products";

export async function FeaturedProducts() {
  const products = await getFeaturedProducts();

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

        {products.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-neutral-300 bg-white p-10 text-center">
            <h3 className="text-xl font-semibold">Seçilmiş məhsul yoxdur</h3>
            <p className="mt-3 text-neutral-600">
              Admin paneldən məhsul əlavə edildikdən sonra burada görünəcək.
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}
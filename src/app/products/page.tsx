import type { Metadata } from "next";
import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";
import { Container } from "@/components/layout/container";
import { ProductCard } from "@/components/product/product-card";
import { getCatalogCategories } from "@/services/categories";
import { getCatalogProducts } from "@/services/products";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Məhsullar",
  description:
    "KHATT Electronics məhsul kataloqu — kamera sistemləri, keçidə nəzarət, domofon, siqnalizasiya və şəbəkə avadanlıqları.",
};

type ProductsPageProps = {
  searchParams: Promise<{
    category?: string;
  }>;
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;
  const activeCategory = params.category;

  const [products, categories] = await Promise.all([
    getCatalogProducts({ category: activeCategory }),
    getCatalogCategories(),
  ]);

  const activeCategoryName =
    categories.find((category) => category.slug === activeCategory)?.name ??
    "Bütün məhsullar";

  return (
    <main className="min-h-screen bg-[#f6f6f4] pt-16 lg:pt-[8.25rem] xl:pt-[7.5rem]">
      <section className="border-b border-black/10 bg-white">
        <Container className="py-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">
            Məhsul kataloqu
          </p>

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-4xl font-semibold md:text-6xl">
                {activeCategoryName}
              </h1>

              <p className="mt-5 max-w-2xl leading-8 text-neutral-600">
                Videomüşahidə, keçidə nəzarət, domofon, siqnalizasiya, şəbəkə
                avadanlıqları və smart təhlükəsizlik həlləri.
              </p>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm font-medium transition hover:border-neutral-950"
            >
              <SlidersHorizontal className="mr-2 size-4" aria-hidden="true" />
              Filterlər
            </button>
          </div>
        </Container>
      </section>

      <section className="py-10 lg:py-14">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            <aside className="h-fit rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em]">
                Kateqoriyalar
              </h2>

              <nav className="space-y-1" aria-label="Məhsul kateqoriyaları">
                <Link
                  href="/products"
                  className={cn(
                    "block rounded-2xl px-4 py-3 text-sm font-medium transition",
                    !activeCategory
                      ? "bg-neutral-950 text-white"
                      : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950"
                  )}
                >
                  Bütün məhsullar
                </Link>

                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/products?category=${category.slug}`}
                    className={cn(
                      "block rounded-2xl px-4 py-3 text-sm font-medium transition",
                      activeCategory === category.slug
                        ? "bg-neutral-950 text-white"
                        : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950"
                    )}
                  >
                    {category.name}
                  </Link>
                ))}
              </nav>
            </aside>

            <div>
              <div className="mb-5 flex items-center justify-between">
                <p className="text-sm text-neutral-600">
                  {products.length} məhsul tapıldı
                </p>

                <select className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm outline-none focus:border-neutral-950">
                  <option>Ən yenilər</option>
                  <option>Populyar</option>
                  <option>Qiymətə görə</option>
                </select>
              </div>

              {products.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="rounded-3xl border border-dashed border-neutral-300 bg-white p-10 text-center">
                  <h3 className="text-xl font-semibold">Məhsul yoxdur</h3>
                  <p className="mt-3 text-neutral-600">
                    Bu kateqoriyada aktiv məhsul tapılmadı.
                  </p>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
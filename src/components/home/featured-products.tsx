import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { ProductCard } from "@/components/product/product-card";
import { localizedPath, type Locale } from "@/lib/i18n";
import { getCatalogProducts } from "@/services/products";

type FeaturedProductsProps = {
  locale?: Locale;
};

export async function FeaturedProducts({
  locale = "az",
}: FeaturedProductsProps) {
  const result = await getCatalogProducts(
    {
      page: 1,
      pageSize: 10,
    },
    locale,
  );

  const visibleProducts = result.products;

  if (visibleProducts.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#f5f6f8] py-8 md:py-12">
      <Container>
        <div className="mb-5 flex items-end justify-between gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
              Son əlavə edilənlər
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950 md:text-3xl">
              Yeni məhsullar
            </h2>

            <div className="mt-4 h-0.5 w-28 bg-emerald-500" />
          </div>

          <Link
            href={localizedPath("/products", locale)}
            className="hidden items-center text-sm font-medium text-neutral-600 transition hover:text-neutral-950 sm:inline-flex"
          >
            Bütün məhsullar
            <ArrowRight className="ml-2 size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {visibleProducts.map((product) => (
              <div
                key={product.id}
                className="border-b border-r border-neutral-200"
              >
                <ProductCard
                  product={product}
                  locale={locale}
                  compact
                  isNew
                />
              </div>
            ))}
          </div>
        </div>

        <Link
          href={localizedPath("/products", locale)}
          className="mt-5 inline-flex items-center text-sm font-medium text-neutral-700 sm:hidden"
        >
          Bütün məhsullar
          <ArrowRight className="ml-2 size-4" aria-hidden="true" />
        </Link>
      </Container>
    </section>
  );
}
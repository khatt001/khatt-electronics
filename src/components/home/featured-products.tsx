import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { ProductCard } from "@/components/product/product-card";
import { homeTranslations } from "@/data/translations/home";
import { localizedPath, type Locale } from "@/lib/i18n";
import { getFeaturedProducts } from "@/services/products";

type FeaturedProductsProps = {
  locale?: Locale;
};

export async function FeaturedProducts({
  locale = "az",
}: FeaturedProductsProps) {
  const products = await getFeaturedProducts(locale);
  const visibleProducts = products.slice(0, 10);
  const t = homeTranslations[locale];

  return (
    <section className="bg-[#f5f6f8] py-7 md:py-10">
      <Container>
        <div className="mb-5 flex items-end justify-between gap-5">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-950 md:text-3xl">
              Yeni gələnlər
            </h2>

            <div className="mt-4 h-0.5 w-28 bg-emerald-500" />
          </div>

          <Link
            href={localizedPath("/products", locale)}
            className="hidden items-center text-sm font-medium text-neutral-600 transition hover:text-neutral-950 sm:inline-flex"
          >
            {t.featuredViewAll}
            <ArrowRight className="ml-2 size-4" aria-hidden="true" />
          </Link>
        </div>

        {visibleProducts.length > 0 ? (
          <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              {visibleProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  locale={locale}
                  priority={index < 5}
                  compact
                  isNew
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-neutral-300 bg-white p-10 text-center">
            <h3 className="text-lg font-semibold text-neutral-950">
              {t.featuredEmptyTitle}
            </h3>

            <p className="mt-2 text-sm text-neutral-600">
              {t.featuredEmptyDescription}
            </p>
          </div>
        )}

        <Link
          href={localizedPath("/products", locale)}
          className="mt-4 inline-flex items-center text-sm font-medium text-neutral-700 sm:hidden"
        >
          {t.featuredViewAll}
          <ArrowRight className="ml-2 size-4" aria-hidden="true" />
        </Link>
      </Container>
    </section>
  );
}
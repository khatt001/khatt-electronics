import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ProductCard } from "@/components/product/product-card";
import { getFeaturedProducts } from "@/services/products";
import { homeTranslations } from "@/data/translations/home";
import type { Locale } from "@/lib/i18n";

type FeaturedProductsProps = {
  locale?: Locale;
};

function withLocalePath(locale: Locale, path: string) {
  if (locale === "az") {
    return path;
  }

  return `/${locale}${path}`;
}

export async function FeaturedProducts({
  locale = "az",
}: FeaturedProductsProps) {
  const products = await getFeaturedProducts(locale);
  const t = homeTranslations[locale];

  return (
    <section className="section-spacing">
      <Container>
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">
              {t.featuredEyebrow}
            </p>
            <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
              {t.featuredTitle}
            </h2>
          </div>

          <Link
            href={withLocalePath(locale, "/products")}
            className="hidden text-sm font-medium text-neutral-700 transition hover:text-neutral-950 sm:inline-flex"
          >
            {t.featuredViewAll}
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
             <ProductCard key={product.id} product={product} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-neutral-300 bg-white p-10 text-center">
            <h3 className="text-xl font-semibold">{t.featuredEmptyTitle}</h3>
            <p className="mt-3 text-neutral-600">
              {t.featuredEmptyDescription}
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { FeaturedProductCard } from "@/components/home/featured-product-card";
import { localizedPath, type Locale } from "@/lib/i18n";
import { getCatalogProducts } from "@/services/products";

type FeaturedProductsProps = {
  locale?: Locale;
};

const featuredProductsTranslations = {
  az: {
    eyebrow: "Seçilmiş məhsullar",
    title: "Yeni avadanlıqlar",
    description:
      "Layihələr və fərdi ehtiyaclar üçün kataloqa son əlavə olunan peşəkar avadanlıqlar.",
    viewAll: "Bütün məhsullar",
  },
  en: {
    eyebrow: "Selected products",
    title: "New equipment",
    description:
      "Recently added professional equipment for projects and individual requirements.",
    viewAll: "View all products",
  },
  ru: {
    eyebrow: "Избранные товары",
    title: "Новое оборудование",
    description:
      "Недавно добавленное профессиональное оборудование для проектов и индивидуальных задач.",
    viewAll: "Все товары",
  },
} as const;

export async function FeaturedProducts({
  locale = "az",
}: FeaturedProductsProps) {
  const result = await getCatalogProducts(
    {
      page: 1,
      pageSize: 20,
    },
    locale,
  );

  const visibleProducts = result.products
    .filter((product) => Boolean(product.imageUrl))
    .slice(0, 4);

  const t = featuredProductsTranslations[locale];

  if (visibleProducts.length === 0) {
    return null;
  }

  return (
    <section className="border-y border-neutral-200 bg-[#f5f6f4] py-16 md:py-20 lg:py-24">
      <Container>
        <div className="mb-8 flex flex-col gap-6 border-b border-neutral-300 pb-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
              {t.eyebrow}
            </p>

            <h2 className="mt-4 font-serif text-3xl leading-tight tracking-[-0.03em] text-neutral-950 md:text-4xl">
              {t.title}
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-neutral-600 md:text-base">
              {t.description}
            </p>
          </div>

          <Link
            href={localizedPath("/products", locale)}
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-neutral-950 transition hover:text-emerald-700"
          >
            {t.viewAll}

            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0">
          {visibleProducts.map((product, index) => (
            <div
              key={product.id}
              className="w-[84%] shrink-0 snap-start overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] sm:w-[47%] lg:w-auto"
            >
             <FeaturedProductCard
  product={product}
  locale={locale}
  priority={index < 2}
/>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
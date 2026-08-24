import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { ProductCard } from "@/components/product/product-card";
import { localizedPath, type Locale } from "@/lib/i18n";
import { getCatalogProducts } from "@/services/products";

type FeaturedProductsProps = {
  locale?: Locale;
};

const translations = {
  az: {
    title: "Yeni məhsullar",
    description:
      "Kataloqa son əlavə edilən peşəkar təhlükəsizlik və elektronika məhsulları.",
    viewAll: "Bütün məhsullar",
  },
  en: {
    title: "New products",
    description:
      "Recently added professional security and electronics products.",
    viewAll: "View all products",
  },
  ru: {
    title: "Новые товары",
    description:
      "Недавно добавленное профессиональное оборудование для безопасности и электроники.",
    viewAll: "Все товары",
  },
} as const;

export async function FeaturedProducts({
  locale = "az",
}: FeaturedProductsProps) {
  const result = await getCatalogProducts(
    {
      page: 1,
      pageSize: 4,
    },
    locale,
  );

  const products = result.products;
  const t = translations[locale];

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#f6f7f5] py-14 md:py-20">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="text-3xl font-semibold tracking-[-0.035em] text-neutral-950 md:text-4xl">
              {t.title}
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-600 md:text-base">
              {t.description}
            </p>
          </div>

          <Link
            href={localizedPath("/products", locale)}
            className="inline-flex w-fit items-center text-sm font-semibold text-neutral-900 transition hover:text-emerald-800"
          >
            {t.viewAll}

            <ArrowUpRight
              className="ml-2 size-4"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              locale={locale}
              priority={index < 2}
              isNew
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
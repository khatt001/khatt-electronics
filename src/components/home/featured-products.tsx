import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { ProductCard } from "@/components/product/product-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { homeCopy } from "@/data/translations/home";
import { localizedPath, type Locale } from "@/lib/i18n";
import { getCatalogProducts, type CatalogProduct } from "@/services/products";

export async function FeaturedProducts({ locale = "az" }: { locale?: Locale }) {
  const t = homeCopy[locale];
  let products: CatalogProduct[] = [];

  try {
    const result = await getCatalogProducts({ page: 1, pageSize: 20 }, locale);
    products = result.products.filter((product) => Boolean(product.imageUrl)).slice(0, 4);
  } catch {
    // Catalogue unavailable (e.g. Supabase not configured): hide the section.
    return null;
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="bg-paper">
      <Container className="section-spacing">
        <SectionHeading
          eyebrow={t.productsEyebrow}
          title={t.productsTitle}
          text={t.productsText}
          action={
            <Link
              href={localizedPath("/products", locale)}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-signal"
            >
              {t.productsLink}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          }
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} locale={locale} priority={index < 2} />
          ))}
        </div>
      </Container>
    </section>
  );
}

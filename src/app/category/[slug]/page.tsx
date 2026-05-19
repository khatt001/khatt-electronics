import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, PackageSearch } from "lucide-react";
import { Container } from "@/components/layout/container";
import { ProductCard } from "@/components/product/product-card";
import {
  getCategoryBySlug,
  getCategoryProducts,
  getCategorySlugs,
} from "@/services/categories";
import { JsonLd } from "@/components/seo/json-ld";
import { createBreadcrumbSchema, getBaseUrl } from "@/lib/seo";

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const slugs = await getCategorySlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Kateqoriya tapılmadı",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: category.seoTitle ?? `${category.name} məhsulları`,
    description:
      category.seoDescription ??
      category.description ??
      `${category.name} kateqoriyasına aid məhsullar — KHATT Electronics.`,
    alternates: {
      canonical: `/category/${category.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = await getCategoryProducts(category.id);
  const baseUrl = getBaseUrl();

  const breadcrumbSchema = createBreadcrumbSchema([
    {
      name: "Ana səhifə",
      url: baseUrl,
    },
    {
      name: "Məhsullar",
      url: `${baseUrl}/products`,
    },
    {
      name: category.name,
      url: `${baseUrl}/category/${category.slug}`,
    },
  ]);

  return (
    <main className="min-h-screen bg-[#f6f6f4] pt-16 lg:pt-[8.25rem] xl:pt-[7.5rem]">
      <JsonLd data={breadcrumbSchema} />

      <section className="border-b border-black/10 bg-white">
        <Container className="py-6">
          <Link
            href="/products"
            className="inline-flex items-center text-sm font-medium text-neutral-600 transition hover:text-neutral-950"
          >
            <ArrowLeft className="mr-2 size-4" aria-hidden="true" />
            Bütün məhsullara qayıt
          </Link>
        </Container>
      </section>

      <section className="border-b border-black/10 bg-white">
        <Container className="py-12 lg:py-16">
          <p className="text-xs uppercase tracking-[0.28em] text-neutral-400">
            Kateqoriya
          </p>

          <h1 className="mt-3 max-w-4xl text-4xl font-semibold leading-tight text-neutral-950 md:text-6xl">
            {category.name}
          </h1>

          <p className="mt-5 max-w-3xl leading-8 text-neutral-600">
            {category.description ??
              `${category.name} kateqoriyasına aid təhlükəsizlik, şəbəkə və elektronika məhsullarını kəşf edin.`}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              Bütün məhsullar
            </Link>

            <Link
              href={`/products?category=${encodeURIComponent(category.slug)}`}
              className="inline-flex items-center justify-center rounded-full border border-neutral-200 px-6 py-3 text-sm font-medium text-neutral-700 transition hover:border-neutral-950 hover:text-neutral-950"
            >
              Filter ilə bax
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-10 lg:py-14">
        <Container>
          {products.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-3xl rounded-[2rem] border border-neutral-200 bg-white p-8 text-center shadow-sm lg:p-12">
              <div className="mx-auto flex size-20 items-center justify-center rounded-[2rem] bg-neutral-950 text-white">
                <PackageSearch className="size-9" aria-hidden="true" />
              </div>

              <p className="mt-8 text-xs uppercase tracking-[0.28em] text-neutral-400">
                Məhsul yoxdur
              </p>

              <h2 className="mt-4 text-4xl font-semibold leading-tight text-neutral-950 md:text-5xl">
                Bu kateqoriyada məhsul tapılmadı
              </h2>

              <p className="mx-auto mt-5 max-w-xl leading-8 text-neutral-600">
                Bu kateqoriyaya yeni məhsullar əlavə olunduqda burada
                görünəcək.
              </p>

              <Link
                href="/products"
                className="mt-8 inline-flex items-center justify-center rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                <PackageSearch className="mr-2 size-4" aria-hidden="true" />
                Bütün məhsullar
              </Link>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
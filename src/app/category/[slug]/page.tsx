import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, PackageSearch } from "lucide-react";
import { Container } from "@/components/layout/container";
import { ProductCard } from "@/components/product/product-card";
import {
  getCategoryBySlug,
  getCategorySlugs,
  getCatalogCategories,
} from "@/services/categories";
import { getCatalogBrands } from "@/services/brands";
import { getCatalogProducts } from "@/services/products";
import { ProductsFilter } from "@/app/products/products-filter";
import { JsonLd } from "@/components/seo/json-ld";
import { createBreadcrumbSchema, getBaseUrl } from "@/lib/seo";

type CategorySearchParams = {
  search?: string | string[];
  brand?: string | string[];
  stock?: string | string[];
  sort?: string | string[];
  [key: string]: string | string[] | undefined;
};

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<CategorySearchParams>;
};

function getFirstValue(value?: string | string[]) {
  if (Array.isArray(value)) return value[0];
  return value;
}

function getValues(value?: string | string[]) {
  if (!value) return [];
  return Array.isArray(value) ? value.filter(Boolean) : [value].filter(Boolean);
}

function getSpecsFromQuery(query: CategorySearchParams) {
  const specs: Record<string, string[]> = {};

  Object.entries(query).forEach(([key, value]) => {
    if (!key.startsWith("spec_")) return;

    const specKey = key.replace(/^spec_/, "");
    const values = getValues(value);

    if (specKey && values.length > 0) {
      specs[specKey] = values;
    }
  });

  return specs;
}

function buildCategoryFilterUrl(
  categorySlug: string,
  query: CategorySearchParams,
  removeKey: string,
  removeValue?: string
) {
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, rawValue]) => {
    if (!rawValue) return;

    const values = Array.isArray(rawValue) ? rawValue : [rawValue];

    values.forEach((value) => {
      if (!value) return;
      if (key === removeKey && (!removeValue || removeValue === value)) return;
      params.append(key, value);
    });
  });

  const queryString = params.toString();

  return queryString
    ? `/category/${categorySlug}?${queryString}`
    : `/category/${categorySlug}`;
}

function getStockLabel(stock?: string) {
  if (stock === "in_stock" || stock === "Stokda var") return "Stokda var";
  if (stock === "out_of_stock" || stock === "Stokda yoxdur") {
    return "Stokda yoxdur";
  }
  if (stock === "pre_order" || stock === "Öncədən sifariş") {
    return "Öncədən sifariş";
  }

  return stock ?? null;
}

function getSortLabel(sort?: string) {
  if (sort === "oldest") return "Ən köhnə";
  if (sort === "featured") return "Seçilmişlər əvvəl";
  if (sort === "price_asc") return "Qiymət: ucuzdan bahaya";
  if (sort === "price_desc") return "Qiymət: bahadan ucuza";
  return null;
}

export async function generateStaticParams() {
  const slugs = await getCategorySlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
  searchParams,
}: CategoryPageProps): Promise<Metadata> {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
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

  const hasQuery = Object.values(query).some((value) => {
    if (Array.isArray(value)) return value.length > 0;
    return Boolean(value);
  });

  return {
    title: category.seoTitle ?? `${category.name} məhsulları`,
    description:
      category.seoDescription ??
      category.description ??
      `${category.name} kateqoriyasına aid məhsullar — KHATT Electronics.`,
    alternates: {
      canonical: `/category/${category.slug}`,
    },
    robots: hasQuery
      ? {
          index: false,
          follow: true,
        }
      : {
          index: true,
          follow: true,
        },
  };
}
export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const search = getFirstValue(query.search);
  const sort = getFirstValue(query.sort);
  const brandValues = getValues(query.brand);
  const stockValues = getValues(query.stock);
  const specs = getSpecsFromQuery(query);

  const [products, categories, brands] = await Promise.all([
    getCatalogProducts({
      search,
      category: category.slug,
      brand: brandValues,
      stock: stockValues,
      sort,
      specs,
    }),
    getCatalogCategories(),
    getCatalogBrands(),
  ]);

  const selectedBrands = brands.filter((brand) =>
    brandValues.includes(brand.slug)
  );

  const sortLabel = getSortLabel(sort);

  const hasActiveFilters =
    Boolean(search) ||
    brandValues.length > 0 ||
    stockValues.length > 0 ||
    Boolean(sort) ||
    Object.keys(specs).length > 0;

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

            {hasActiveFilters ? (
              <Link
                href={`/category/${category.slug}`}
                className="inline-flex items-center justify-center rounded-full border border-neutral-200 px-6 py-3 text-sm font-medium text-neutral-700 transition hover:border-neutral-950 hover:text-neutral-950"
              >
                Filterləri təmizlə
              </Link>
            ) : null}
          </div>
        </Container>
      </section>

      <section className="py-10 lg:py-14">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
            <aside>
              <ProductsFilter
                categories={categories}
                brands={brands}
                initialQuery={{
                  search,
                  category: category.slug,
                  brand: brandValues[0],
                  stock: stockValues[0],
                  sort,
                }}
                hasActiveFilters={Boolean(hasActiveFilters)}
                categoryMode="route"
              />
            </aside>

            <div>
              <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-neutral-500">
                  <span className="font-semibold text-neutral-950">
                    {products.length}
                  </span>{" "}
                  məhsul tapıldı
                </p>

                {hasActiveFilters ? (
                  <div className="flex flex-wrap items-center gap-2">
                    {search ? (
                      <Link
                        href={buildCategoryFilterUrl(
                          category.slug,
                          query,
                          "search"
                        )}
                        className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-neutral-700 transition hover:border-neutral-950"
                      >
                        Axtarış: {search} ×
                      </Link>
                    ) : null}

                    {selectedBrands.map((brand) => (
                      <Link
                        key={brand.id}
                        href={buildCategoryFilterUrl(
                          category.slug,
                          query,
                          "brand",
                          brand.slug
                        )}
                        className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-neutral-700 transition hover:border-neutral-950"
                      >
                        Brend: {brand.name} ×
                      </Link>
                    ))}

                    {stockValues.map((stock) => (
                      <Link
                        key={stock}
                        href={buildCategoryFilterUrl(
                          category.slug,
                          query,
                          "stock",
                          stock
                        )}
                        className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-neutral-700 transition hover:border-neutral-950"
                      >
                        {getStockLabel(stock)} ×
                      </Link>
                    ))}

                    {Object.entries(specs).flatMap(([key, values]) =>
                      values.map((value) => (
                        <Link
                          key={`${key}-${value}`}
                          href={buildCategoryFilterUrl(
                            category.slug,
                            query,
                            `spec_${key}`,
                            value
                          )}
                          className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-neutral-700 transition hover:border-neutral-950"
                        >
                          {key}: {value} ×
                        </Link>
                      ))
                    )}

                    {sortLabel ? (
                      <Link
                        href={buildCategoryFilterUrl(
                          category.slug,
                          query,
                          "sort"
                        )}
                        className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-neutral-700 transition hover:border-neutral-950"
                      >
                        {sortLabel} ×
                      </Link>
                    ) : null}
                  </div>
                ) : null}
              </div>

              {products.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
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
                    Seçilmiş filterlərə uyğun məhsul tapılmadı
                  </h2>

                  <p className="mx-auto mt-5 max-w-xl leading-8 text-neutral-600">
                    Filterləri dəyişərək yenidən yoxlaya bilərsiniz.
                  </p>

                  <Link
                    href={`/category/${category.slug}`}
                    className="mt-8 inline-flex items-center justify-center rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
                  >
                    <PackageSearch className="mr-2 size-4" aria-hidden="true" />
                    Filterləri təmizlə
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
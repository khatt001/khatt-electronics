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
import { localizedPath } from "@/lib/i18n";
import {
  categoryPageTranslations,
  type CategoryPageLocale,
} from "@/data/translations/category-page";

export type CategorySearchParams = {
  search?: string | string[];
  brand?: string | string[];
  stock?: string | string[];
  sort?: string | string[];
  page?: string | string[];
  [key: string]: string | string[] | undefined;
};

export type CategoryPageViewProps = {
  slug: string;
  query: CategorySearchParams;
  locale?: CategoryPageLocale;
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

function getSpecChipLabel(key: string) {
  return decodeURIComponent(key)
    .replace(/^spec_/, "")
    .replace(/_/g, " ")
    .trim();
}

function buildCategoryFilterUrl(
  categorySlug: string,
  query: CategorySearchParams,
  removeKey: string,
  locale: CategoryPageLocale,
  removeValue?: string
) {
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, rawValue]) => {
    if (!rawValue) return;

    const values = Array.isArray(rawValue) ? rawValue : [rawValue];

    values.forEach((value) => {
      if (!value) return;
      if (key === "page") return;
      if (key === removeKey && (!removeValue || removeValue === value)) return;
      params.append(key, value);
    });
  });

  const queryString = params.toString();
  const basePath = localizedPath(`/category/${categorySlug}`, locale);

  return queryString ? `${basePath}?${queryString}` : basePath;
}

function buildCategoryPageUrl(
  categorySlug: string,
  query: CategorySearchParams,
  page: number,
  locale: CategoryPageLocale
) {
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, rawValue]) => {
    if (!rawValue || key === "page") return;

    const values = Array.isArray(rawValue) ? rawValue : [rawValue];

    values.forEach((value) => {
      if (!value) return;
      params.append(key, value);
    });
  });

  if (page > 1) {
    params.set("page", String(page));
  }

  const queryString = params.toString();
  const basePath = localizedPath(`/category/${categorySlug}`, locale);

  return queryString ? `${basePath}?${queryString}` : basePath;
}

function getStockLabel(stock: string | undefined, locale: CategoryPageLocale) {
  const t = categoryPageTranslations[locale];

  if (stock === "in_stock" || stock === "Stokda var") return t.stockIn;
  if (stock === "out_of_stock" || stock === "Stokda yoxdur") return t.stockOut;
  if (stock === "pre_order" || stock === "Öncədən sifariş") return t.stockPreOrder;

  return stock ?? null;
}

function getSortLabel(sort: string | undefined, locale: CategoryPageLocale) {
  const t = categoryPageTranslations[locale];

  if (sort === "oldest") return t.sortOldest;
  if (sort === "featured") return t.sortFeatured;
  if (sort === "price_asc") return t.sortPriceAsc;
  if (sort === "price_desc") return t.sortPriceDesc;

  return null;
}

export async function getCategoryStaticParams() {
  const slugs = await getCategorySlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

export async function CategoryPageView({
  slug,
  query,
  locale = "az",
}: CategoryPageViewProps) {
  const t = categoryPageTranslations[locale];
  const category = await getCategoryBySlug(slug, locale);

  if (!category) {
    notFound();
  }

  const search = getFirstValue(query.search);
  const sort = getFirstValue(query.sort);
  const page = Math.max(1, Number(getFirstValue(query.page)) || 1);

  const brandValues = getValues(query.brand);
  const stockValues = getValues(query.stock);
  const specs = getSpecsFromQuery(query);

  const [productsResult, categories, brands] = await Promise.all([
    getCatalogProducts(
      {
        search,
        category: category.slug,
        brand: brandValues,
        stock: stockValues,
        sort,
        specs,
        page,
        pageSize: 24,
      },
      locale
    ),
    getCatalogCategories(locale),
    getCatalogBrands(),
  ]);

  const products = productsResult.products;
  const totalProducts = productsResult.total;
  const totalPages = productsResult.totalPages;
  const currentPage = productsResult.page;

  const selectedBrands = brands.filter((brand) => brandValues.includes(brand.slug));

  const sortLabel = getSortLabel(sort, locale);

  const hasActiveFilters =
    Boolean(search) ||
    brandValues.length > 0 ||
    stockValues.length > 0 ||
    Boolean(sort) ||
    Object.keys(specs).length > 0;

  const baseUrl = getBaseUrl();
  const categoryPath = localizedPath(`/category/${category.slug}`, locale);

  const breadcrumbSchema = createBreadcrumbSchema([
    {
      name: t.homeBreadcrumb,
      url: `${baseUrl}${localizedPath("/", locale)}`,
    },
    {
      name: t.productsBreadcrumb,
      url: `${baseUrl}${localizedPath("/products", locale)}`,
    },
    {
      name: category.name,
      url: `${baseUrl}${categoryPath}`,
    },
  ]);

  return (
    <main className="min-h-screen bg-[#f6f6f4] pt-16 lg:pt-[8.25rem] xl:pt-[7.5rem]">
      <JsonLd data={breadcrumbSchema} />

      <section className="border-b border-black/10 bg-white">
        <Container className="py-6">
          <Link
            href={localizedPath("/products", locale)}
            className="inline-flex items-center text-sm font-medium text-neutral-600 transition hover:text-neutral-950"
          >
            <ArrowLeft className="mr-2 size-4" aria-hidden="true" />
            {t.backToProducts}
          </Link>
        </Container>
      </section>

      <section className="border-b border-black/10 bg-white">
        <Container className="py-12 lg:py-16">
          <p className="text-xs uppercase tracking-[0.28em] text-neutral-400">
            {t.eyebrow}
          </p>

          <h1 className="mt-3 max-w-4xl text-4xl font-semibold leading-tight text-neutral-950 md:text-6xl">
            {category.name}
          </h1>

          <p className="mt-5 max-w-3xl leading-8 text-neutral-600">
            {category.description ??
              `${category.name} ${t.fallbackDescriptionSuffix}`}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={localizedPath("/products", locale)}
              className="inline-flex items-center justify-center rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              {t.allProducts}
            </Link>

            {hasActiveFilters ? (
              <Link
                href={categoryPath}
                className="inline-flex items-center justify-center rounded-full border border-neutral-200 px-6 py-3 text-sm font-medium text-neutral-700 transition hover:border-neutral-950 hover:text-neutral-950"
              >
                {t.clearFilters}
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
                  brand: brandValues,
                  stock: stockValues,
                  sort,
                }}
                hasActiveFilters={Boolean(hasActiveFilters)}
                categoryMode="route"
                locale={locale}
              />
            </aside>

            <div>
              <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-neutral-500">
                  <span className="font-semibold text-neutral-950">
                    {totalProducts}
                  </span>{" "}
                  {t.foundSuffix}
                </p>

                {hasActiveFilters ? (
                  <div className="flex flex-wrap items-center gap-2">
                    {search ? (
                      <Link
                        href={buildCategoryFilterUrl(
                          category.slug,
                          query,
                          "search",
                          locale
                        )}
                        className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-neutral-700 transition hover:border-neutral-950"
                      >
                        {t.searchLabel}: {search} ×
                      </Link>
                    ) : null}

                    {selectedBrands.map((brand) => (
                      <Link
                        key={brand.id}
                        href={buildCategoryFilterUrl(
                          category.slug,
                          query,
                          "brand",
                          locale,
                          brand.slug
                        )}
                        className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-neutral-700 transition hover:border-neutral-950"
                      >
                        {t.brandLabel}: {brand.name} ×
                      </Link>
                    ))}

                    {stockValues.map((stock) => (
                      <Link
                        key={stock}
                        href={buildCategoryFilterUrl(
                          category.slug,
                          query,
                          "stock",
                          locale,
                          stock
                        )}
                        className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-neutral-700 transition hover:border-neutral-950"
                      >
                        {getStockLabel(stock, locale)} ×
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
                            locale,
                            value
                          )}
                          className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-neutral-700 transition hover:border-neutral-950"
                        >
                          {t.specLabel}: {getSpecChipLabel(key)} — {value} ×
                        </Link>
                      ))
                    )}

                    {sortLabel ? (
                      <Link
                        href={buildCategoryFilterUrl(
                          category.slug,
                          query,
                          "sort",
                          locale
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
                <>
                  <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {products.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        locale={locale}
                      />
                    ))}
                  </div>

                  {totalPages > 1 ? (
                    <nav
                      aria-label="Category product pagination"
                      className="mt-10 flex flex-wrap items-center justify-center gap-2"
                    >
                      {currentPage > 1 ? (
                        <Link
                          href={buildCategoryPageUrl(
                            category.slug,
                            query,
                            currentPage - 1,
                            locale
                          )}
                          className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition hover:border-neutral-950 hover:text-neutral-950"
                        >
                          Əvvəlki
                        </Link>
                      ) : null}

                      {Array.from({ length: totalPages }).map((_, index) => {
                        const pageNumber = index + 1;

                        return (
                          <Link
                            key={pageNumber}
                            href={buildCategoryPageUrl(
                              category.slug,
                              query,
                              pageNumber,
                              locale
                            )}
                            aria-current={
                              pageNumber === currentPage ? "page" : undefined
                            }
                            className={
                              pageNumber === currentPage
                                ? "rounded-full bg-neutral-950 px-4 py-2 text-sm font-semibold text-white"
                                : "rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition hover:border-neutral-950 hover:text-neutral-950"
                            }
                          >
                            {pageNumber}
                          </Link>
                        );
                      })}

                      {currentPage < totalPages ? (
                        <Link
                          href={buildCategoryPageUrl(
                            category.slug,
                            query,
                            currentPage + 1,
                            locale
                          )}
                          className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition hover:border-neutral-950 hover:text-neutral-950"
                        >
                          Növbəti
                        </Link>
                      ) : null}
                    </nav>
                  ) : null}
                </>
              ) : (
                <div className="mx-auto max-w-3xl rounded-[2rem] border border-neutral-200 bg-white p-8 text-center shadow-sm lg:p-12">
                  <div className="mx-auto flex size-20 items-center justify-center rounded-[2rem] bg-neutral-950 text-white">
                    <PackageSearch className="size-9" aria-hidden="true" />
                  </div>

                  <p className="mt-8 text-xs uppercase tracking-[0.28em] text-neutral-400">
                    {t.emptyEyebrow}
                  </p>

                  <h2 className="mt-4 text-4xl font-semibold leading-tight text-neutral-950 md:text-5xl">
                    {t.emptyTitle}
                  </h2>

                  <p className="mx-auto mt-5 max-w-xl leading-8 text-neutral-600">
                    {t.emptyDescription}
                  </p>

                  <Link
                    href={categoryPath}
                    className="mt-8 inline-flex items-center justify-center rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
                  >
                    <PackageSearch className="mr-2 size-4" aria-hidden="true" />
                    {t.clearFilters}
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
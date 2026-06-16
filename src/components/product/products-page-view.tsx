import Link from "next/link";
import { ProductCard } from "@/components/product/product-card";
import { Container } from "@/components/layout/container";
import { getCatalogBrands } from "@/services/brands";
import { getCatalogCategories } from "@/services/categories";
import { getCatalogProducts } from "@/services/products";
import { ProductsFilter } from "@/app/products/products-filter";
import {
  productsTranslations,
  type ProductsLocale,
} from "@/data/translations/products";
import { localizedPath } from "@/lib/i18n";

export type ProductsSearchParams = {
  search?: string | string[];
  category?: string | string[];
  brand?: string | string[];
  stock?: string | string[];
  sort?: string | string[];
  page?: string | string[];
  [key: string]: string | string[] | undefined;
};

type ProductsPageViewProps = {
  query: ProductsSearchParams;
  locale?: ProductsLocale;
};

function getFirstValue(value?: string | string[]) {
  if (Array.isArray(value)) return value[0];
  return value;
}

function getValues(value?: string | string[]) {
  if (!value) return [];
  return Array.isArray(value) ? value.filter(Boolean) : [value].filter(Boolean);
}



function getSpecsFromQuery(query: ProductsSearchParams) {
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

function buildFilterUrl(
  locale: ProductsLocale,
  query: ProductsSearchParams,
  removeKey: string,
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
  const productsPath = localizedPath("/products", locale);

  return queryString ? `${productsPath}?${queryString}` : productsPath;
}

function buildPageUrl(
  locale: ProductsLocale,
  query: ProductsSearchParams,
  page: number
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
  const productsPath = localizedPath("/products", locale);

  return queryString ? `${productsPath}?${queryString}` : productsPath;
}

function normalizeStockValue(stock?: string) {
  if (stock === "Stokda var" || stock === "In stock" || stock === "В наличии") {
    return "in_stock";
  }

  if (
    stock === "Stokda yoxdur" ||
    stock === "Out of stock" ||
    stock === "Нет в наличии"
  ) {
    return "out_of_stock";
  }

  if (
    stock === "Öncədən sifariş" ||
    stock === "Pre-order" ||
    stock === "Предзаказ"
  ) {
    return "pre_order";
  }

  return stock;
}

function getStockLabel(stock: string | undefined, locale: ProductsLocale) {
  const t = productsTranslations[locale];
  const value = normalizeStockValue(stock);

  if (value === "in_stock") return t.stockIn;
  if (value === "out_of_stock") return t.stockOut;
  if (value === "pre_order") return t.stockPreOrder;

  return stock ?? null;
}

function getSortLabel(sort: string | undefined, locale: ProductsLocale) {
  const t = productsTranslations[locale];

  if (sort === "oldest") return t.sortOldest;
  if (sort === "featured") return t.sortFeatured;
  if (sort === "price_asc") return t.sortPriceAsc;
  if (sort === "price_desc") return t.sortPriceDesc;

  return null;
}

export async function ProductsPageView({
  query,
  locale = "az",
}: ProductsPageViewProps) {
  const t = productsTranslations[locale];

  const search = getFirstValue(query.search);
  const category = getFirstValue(query.category);
  const sort = getFirstValue(query.sort);
  const page = Math.max(1, Number(getFirstValue(query.page)) || 1);

  const brandValues = getValues(query.brand);
  const stockValues = getValues(query.stock).map((stock) => {
    const normalized = normalizeStockValue(stock);
    return normalized ?? stock;
  });
  const specs = getSpecsFromQuery(query);

  const [productsResult, categories, brands] = await Promise.all([
    getCatalogProducts(
      {
        search,
        category,
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

  const selectedCategory = categories.find(
    (categoryItem) => categoryItem.slug === category
  );

  const selectedBrands = brands.filter((brand) => brandValues.includes(brand.slug));

  const sortLabel = getSortLabel(sort, locale);

  const hasActiveFilters =
    Boolean(search) ||
    Boolean(category) ||
    brandValues.length > 0 ||
    stockValues.length > 0 ||
    Boolean(sort) ||
    Object.keys(specs).length > 0;

  return (
    <div className="min-h-screen bg-[#f5f6f8]">
     

      <section className="py-6 lg:py-8">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
            <aside>
              <ProductsFilter
                categories={categories}
                brands={brands}
                initialQuery={{
                  search,
                  category,
                  brand: brandValues,
                  stock: stockValues,
                  sort,
                }}
                hasActiveFilters={Boolean(hasActiveFilters)}
                locale={locale}
              />
            </aside>

            <div>
              <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
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
                        href={buildFilterUrl(locale, query, "search")}
                        className="rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        {t.searchLabel}: {search} ×
                      </Link>
                    ) : null}

                    {selectedCategory ? (
                      <Link
                        href={buildFilterUrl(locale, query, "category")}
                        className="rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        {t.categoryLabel}: {selectedCategory.name} ×
                      </Link>
                    ) : null}

                    {selectedBrands.map((brand) => (
                      <Link
                        key={brand.id}
                        href={buildFilterUrl(locale, query, "brand", brand.slug)}
                        className="rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        {t.brandLabel}: {brand.name} ×
                      </Link>
                    ))}

                    {stockValues.map((stock) => (
                      <Link
                        key={stock}
                        href={buildFilterUrl(locale, query, "stock", stock)}
                        className="rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        {getStockLabel(stock, locale)} ×
                      </Link>
                    ))}

                    {Object.entries(specs).flatMap(([key, values]) =>
                      values.map((value) => (
                        <Link
                          key={`${key}-${value}`}
                          href={buildFilterUrl(
                            locale,
                            query,
                            `spec_${key}`,
                            value
                          )}
                          className="rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                        >
                          {getSpecChipLabel(key)}: {value} ×
                        </Link>
                      ))
                    )}

                    {sortLabel ? (
                      <Link
                        href={buildFilterUrl(locale, query, "sort")}
                        className="rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
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
                      aria-label="Product pagination"
                      className="mt-10 flex flex-wrap items-center justify-center gap-2"
                    >
                      {currentPage > 1 ? (
                        <Link
                          href={buildPageUrl(locale, query, currentPage - 1)}
                          className="rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                        >
                          Əvvəlki
                        </Link>
                      ) : null}

                      {Array.from({ length: totalPages }).map((_, index) => {
                        const pageNumber = index + 1;

                        return (
                          <Link
                            key={pageNumber}
                            href={buildPageUrl(locale, query, pageNumber)}
                            aria-current={
                              pageNumber === currentPage ? "page" : undefined
                            }
                            className={
                              pageNumber === currentPage
                                ? "rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
                                : "rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                            }
                          >
                            {pageNumber}
                          </Link>
                        );
                      })}

                      {currentPage < totalPages ? (
                        <Link
                          href={buildPageUrl(locale, query, currentPage + 1)}
                          className="rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                        >
                          Növbəti
                        </Link>
                      ) : null}
                    </nav>
                  ) : null}
                </>
              ) : (
                <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-8 text-center shadow-sm md:p-10">
                  <h2 className="text-xl font-semibold text-neutral-950">
                    {t.emptyTitle}
                  </h2>

                  <p className="mt-2 text-sm text-neutral-500">
                    {t.emptyDescription}
                  </p>

                  <Link
                    href={localizedPath("/products", locale)}
                    className="mt-5 inline-flex min-h-12 items-center justify-center rounded-lg bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                  >
                    {t.clearAll}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
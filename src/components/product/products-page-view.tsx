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

export type ProductsSearchParams = {
  search?: string | string[];
  category?: string | string[];
  brand?: string | string[];
  stock?: string | string[];
  sort?: string | string[];
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

function withLocalePath(locale: ProductsLocale, path: string) {
  if (locale === "az") return path;
  return `/${locale}${path}`;
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
      if (key === removeKey && (!removeValue || removeValue === value)) return;
      params.append(key, value);
    });
  });

  const queryString = params.toString();
  const productsPath = withLocalePath(locale, "/products");

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
  const brandValues = getValues(query.brand);
  const stockValues = getValues(query.stock).map((stock) => {
    const normalized = normalizeStockValue(stock);
    return normalized ?? stock;
  });
  const specs = getSpecsFromQuery(query);

  const [products, categories, brands] = await Promise.all([
    getCatalogProducts(
      {
        search,
        category,
        brand: brandValues,
        stock: stockValues,
        sort,
        specs,
      },
      locale
    ),
    getCatalogCategories(),
    getCatalogBrands(),
  ]);

  const selectedCategory = categories.find(
    (categoryItem) => categoryItem.slug === category
  );

  const selectedBrands = brands.filter((brand) =>
    brandValues.includes(brand.slug)
  );

  const sortLabel = getSortLabel(sort, locale);

  const hasActiveFilters =
    Boolean(search) ||
    Boolean(category) ||
    brandValues.length > 0 ||
    stockValues.length > 0 ||
    Boolean(sort) ||
    Object.keys(specs).length > 0;

  return (
    <main className="min-h-screen bg-[#f6f6f4] pt-16 lg:pt-[8.25rem] xl:pt-[7.5rem]">
      <section className="border-b border-black/10 bg-white">
        <Container className="py-12 lg:py-16">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.28em] text-neutral-400">
              {t.eyebrow}
            </p>

            <h1 className="mt-3 text-4xl font-semibold leading-tight text-neutral-950 md:text-6xl">
              {t.title}
            </h1>

            <p className="mt-5 leading-8 text-neutral-600">
              {t.description}
            </p>
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
                  category,
                  brand: brandValues[0],
                  stock: stockValues[0],
                  sort,
                }}
                hasActiveFilters={Boolean(hasActiveFilters)}
                locale={locale}
              />
            </aside>

            <div>
              <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-neutral-500">
                  <span className="font-semibold text-neutral-950">
                    {products.length}
                  </span>{" "}
                  {t.foundSuffix}
                </p>

                {hasActiveFilters ? (
                  <div className="flex flex-wrap items-center gap-2">
                    {search ? (
                      <Link
                        href={buildFilterUrl(locale, query, "search")}
                        className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-neutral-700 transition hover:border-neutral-950"
                      >
                        {t.searchLabel}: {search} ×
                      </Link>
                    ) : null}

                    {selectedCategory ? (
                      <Link
                        href={buildFilterUrl(locale, query, "category")}
                        className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-neutral-700 transition hover:border-neutral-950"
                      >
                        {t.categoryLabel}: {selectedCategory.name} ×
                      </Link>
                    ) : null}

                    {selectedBrands.map((brand) => (
                      <Link
                        key={brand.id}
                        href={buildFilterUrl(locale, query, "brand", brand.slug)}
                        className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-neutral-700 transition hover:border-neutral-950"
                      >
                        {t.brandLabel}: {brand.name} ×
                      </Link>
                    ))}

                    {stockValues.map((stock) => (
                      <Link
                        key={stock}
                        href={buildFilterUrl(locale, query, "stock", stock)}
                        className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-neutral-700 transition hover:border-neutral-950"
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
                          className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-neutral-700 transition hover:border-neutral-950"
                        >
                          {key}: {value} ×
                        </Link>
                      ))
                    )}

                    {sortLabel ? (
                      <Link
                        href={buildFilterUrl(locale, query, "sort")}
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
                    <ProductCard
                      key={product.id}
                      product={product}
                      locale={locale}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-3xl border border-dashed border-neutral-300 bg-white p-10 text-center">
                  <h2 className="text-xl font-semibold text-neutral-950">
                    {t.emptyTitle}
                  </h2>

                  <p className="mt-2 text-sm text-neutral-500">
                    {t.emptyDescription}
                  </p>

                  <Link
                    href={withLocalePath(locale, "/products")}
                    className="mt-5 inline-flex rounded-full bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
                  >
                    {t.clearAll}
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
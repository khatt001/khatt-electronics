import Link from "next/link";
import type { Metadata } from "next";
import { ProductCard } from "@/components/product/product-card";
import { Container } from "@/components/layout/container";
import { getCatalogBrands } from "@/services/brands";
import { getCatalogCategories } from "@/services/categories";
import { getCatalogProducts } from "@/services/products";
import { ProductsFilter } from "@/app/products/products-filter";

export const metadata: Metadata = {
  title: "Məhsullar",
  description:
    "KHATT Electronics məhsul kataloqu: kamera sistemləri, videomüşahidə avadanlıqları, keçidə nəzarət, şəbəkə avadanlıqları və təhlükəsizlik həlləri.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "Məhsullar | KHATT Electronics",
    description:
      "Kamera sistemləri, videomüşahidə avadanlıqları, keçidə nəzarət və şəbəkə məhsulları.",
    url: "/products",
    type: "website",
  },
};

type ProductsSearchParams = {
  search?: string | string[];
  category?: string | string[];
  brand?: string | string[];
  stock?: string | string[];
  sort?: string | string[];
  [key: string]: string | string[] | undefined;
};

type ProductsPageProps = {
  searchParams: Promise<ProductsSearchParams>;
};

type QueryParams = ProductsSearchParams;

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

function buildFilterUrl(query: QueryParams, removeKey: string, removeValue?: string) {
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

  return queryString ? `/products?${queryString}` : "/products";
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

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const query = await searchParams;

  const search = getFirstValue(query.search);
  const category = getFirstValue(query.category);
  const sort = getFirstValue(query.sort);
  const brandValues = getValues(query.brand);
  const stockValues = getValues(query.stock);
  const specs = getSpecsFromQuery(query);

  const [products, categories, brands] = await Promise.all([
    getCatalogProducts({
      search,
      category,
      brand: brandValues,
      stock: stockValues,
      sort,
      specs,
    }),
    getCatalogCategories(),
    getCatalogBrands(),
  ]);

  const selectedCategory = categories.find(
    (categoryItem) => categoryItem.slug === category
  );

  const selectedBrands = brands.filter((brand) =>
    brandValues.includes(brand.slug)
  );

  const sortLabel = getSortLabel(sort);

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
              Məhsullar
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight text-neutral-950 md:text-6xl">
              Peşəkar təhlükəsizlik və elektronika həlləri
            </h1>
            <p className="mt-5 leading-8 text-neutral-600">
              Kamera sistemləri, şəbəkə avadanlıqları, aksesuarlar və layihələr
              üçün seçilmiş məhsullar.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-10 lg:py-14">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
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
                        href={buildFilterUrl(query, "search")}
                        className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-neutral-700 transition hover:border-neutral-950"
                      >
                        Axtarış: {search} ×
                      </Link>
                    ) : null}

                    {selectedCategory ? (
                      <Link
                        href={buildFilterUrl(query, "category")}
                        className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-neutral-700 transition hover:border-neutral-950"
                      >
                        Kateqoriya: {selectedCategory.name} ×
                      </Link>
                    ) : null}

                    {selectedBrands.map((brand) => (
                      <Link
                        key={brand.id}
                        href={buildFilterUrl(query, "brand", brand.slug)}
                        className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-neutral-700 transition hover:border-neutral-950"
                      >
                        Brend: {brand.name} ×
                      </Link>
                    ))}

                    {stockValues.map((stock) => (
                      <Link
                        key={stock}
                        href={buildFilterUrl(query, "stock", stock)}
                        className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-neutral-700 transition hover:border-neutral-950"
                      >
                        {getStockLabel(stock)} ×
                      </Link>
                    ))}

                    {Object.entries(specs).flatMap(([key, values]) =>
                      values.map((value) => (
                        <Link
                          key={`${key}-${value}`}
                          href={buildFilterUrl(query, `spec_${key}`, value)}
                          className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-neutral-700 transition hover:border-neutral-950"
                        >
                          {key}: {value} ×
                        </Link>
                      ))
                    )}

                    {sortLabel ? (
                      <Link
                        href={buildFilterUrl(query, "sort")}
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
                <div className="rounded-3xl border border-dashed border-neutral-300 bg-white p-10 text-center">
                  <h2 className="text-xl font-semibold text-neutral-950">
                    Məhsul tapılmadı
                  </h2>
                  <p className="mt-2 text-sm text-neutral-500">
                    Seçilmiş filterlərə uyğun məhsul yoxdur.
                  </p>
                  <Link
                    href="/products"
                    className="mt-5 inline-flex rounded-full bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
                  >
                    Bütün məhsullara bax
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
import Link from "next/link";
import { Filter, Search } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import { Container } from "@/components/layout/container";
import { getCatalogBrands } from "@/services/brands";
import { getCatalogCategories } from "@/services/categories";
import { getCatalogProducts } from "@/services/products";
import { ProductsFilter } from "@/app/products/products-filter";
type ProductsPageProps = {
  searchParams: Promise<{
    search?: string;
    category?: string;
    brand?: string;
    stock?: string;
    sort?: string;
  }>;
};

type QueryParams = {
  search?: string;
  category?: string;
  brand?: string;
  stock?: string;
  sort?: string;
};

function buildFilterUrl(query: QueryParams, removeKey: keyof QueryParams) {
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (!value) return;
    if (key === removeKey) return;
    params.set(key, value);
  });

  const queryString = params.toString();

  return queryString ? `/products?${queryString}` : "/products";
}

function getStockLabel(stock?: string) {
  if (stock === "in_stock") return "Stokda var";
  if (stock === "out_of_stock") return "Stokda yoxdur";
  if (stock === "pre_order") return "Öncədən sifariş";
  return null;
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

  const [products, categories, brands] = await Promise.all([
    getCatalogProducts({
      search: query.search,
      category: query.category,
      brand: query.brand,
      stock: query.stock,
      sort: query.sort,
    }),
    getCatalogCategories(),
    getCatalogBrands(),
  ]);

  const selectedCategory = categories.find(
    (category) => category.slug === query.category
  );

  const selectedBrand = brands.find((brand) => brand.slug === query.brand);

  const stockLabel = getStockLabel(query.stock);
  const sortLabel = getSortLabel(query.sort);

  const hasActiveFilters =
    query.search || query.category || query.brand || query.stock || query.sort;

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
          <ProductsFilter
  categories={categories}
  brands={brands}
  initialQuery={{
    search: query.search,
    category: query.category,
    brand: query.brand,
    stock: query.stock,
    sort: query.sort,
  }}
  hasActiveFilters={Boolean(hasActiveFilters)}
/>

          <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-neutral-500">
              <span className="font-semibold text-neutral-950">
                {products.length}
              </span>{" "}
              məhsul tapıldı
            </p>

            {hasActiveFilters ? (
              <div className="flex flex-wrap items-center gap-2">
                {query.search ? (
                  <Link
                    href={buildFilterUrl(query, "search")}
                    className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-neutral-700 transition hover:border-neutral-950"
                  >
                    Axtarış: {query.search} ×
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

                {selectedBrand ? (
                  <Link
                    href={buildFilterUrl(query, "brand")}
                    className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-neutral-700 transition hover:border-neutral-950"
                  >
                    Brend: {selectedBrand.name} ×
                  </Link>
                ) : null}

                {stockLabel ? (
                  <Link
                    href={buildFilterUrl(query, "stock")}
                    className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-neutral-700 transition hover:border-neutral-950"
                  >
                    {stockLabel} ×
                  </Link>
                ) : null}

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
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
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
        </Container>
      </section>
    </main>
  );
}
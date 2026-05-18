import Link from "next/link";
import { ProductCard } from "@/components/product/product-card";
import { Container } from "@/components/layout/container";
import { getCatalogBrands } from "@/services/brands";
import { getCatalogCategories } from "@/services/categories";
import { getCatalogProducts } from "@/services/products";

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
        <Container className="py-12">
          <p className="text-xs uppercase tracking-[0.28em] text-neutral-400">
            Məhsullar
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight text-neutral-950 md:text-6xl">
            Peşəkar təhlükəsizlik və elektronika həlləri
          </h1>
          <p className="mt-5 max-w-2xl leading-8 text-neutral-600">
            Kamera sistemləri, şəbəkə avadanlıqları, aksesuarlar və layihələr
            üçün seçilmiş məhsullar.
          </p>
        </Container>
      </section>

      <section className="py-10 lg:py-14">
        <Container>
          <form className="mb-6 rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr_auto]">
              <input
                name="search"
                defaultValue={query.search ?? ""}
                placeholder="Məhsul axtar..."
                className="h-12 rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
              />

              <select
                name="category"
                defaultValue={query.category ?? ""}
                className="h-12 rounded-2xl border border-neutral-200 bg-white px-4 text-sm outline-none transition focus:border-neutral-950"
              >
                <option value="">Bütün kateqoriyalar</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>

              <select
                name="brand"
                defaultValue={query.brand ?? ""}
                className="h-12 rounded-2xl border border-neutral-200 bg-white px-4 text-sm outline-none transition focus:border-neutral-950"
              >
                <option value="">Bütün brendlər</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.slug}>
                    {brand.name}
                  </option>
                ))}
              </select>

              <select
                name="stock"
                defaultValue={query.stock ?? ""}
                className="h-12 rounded-2xl border border-neutral-200 bg-white px-4 text-sm outline-none transition focus:border-neutral-950"
              >
                <option value="">Bütün stoklar</option>
                <option value="in_stock">Stokda var</option>
                <option value="out_of_stock">Stokda yoxdur</option>
                <option value="pre_order">Öncədən sifariş</option>
              </select>

              <select
                name="sort"
                defaultValue={query.sort ?? ""}
                className="h-12 rounded-2xl border border-neutral-200 bg-white px-4 text-sm outline-none transition focus:border-neutral-950"
              >
                <option value="">Ən yeni</option>
                <option value="oldest">Ən köhnə</option>
                <option value="featured">Seçilmişlər əvvəl</option>
                <option value="price_asc">Qiymət: ucuzdan bahaya</option>
                <option value="price_desc">Qiymət: bahadan ucuza</option>
              </select>

              <button
                type="submit"
                className="h-12 rounded-full bg-neutral-950 px-6 text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                Filterlə
              </button>
            </div>
          </form>

          {hasActiveFilters ? (
            <div className="mb-6 flex flex-wrap items-center gap-2">
              {query.search ? (
                <Link
                  href={buildFilterUrl(query, "search")}
                  className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-700 transition hover:border-neutral-950"
                >
                  Axtarış: {query.search} ×
                </Link>
              ) : null}

              {selectedCategory ? (
                <Link
                  href={buildFilterUrl(query, "category")}
                  className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-700 transition hover:border-neutral-950"
                >
                  Kateqoriya: {selectedCategory.name} ×
                </Link>
              ) : null}

              {selectedBrand ? (
                <Link
                  href={buildFilterUrl(query, "brand")}
                  className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-700 transition hover:border-neutral-950"
                >
                  Brend: {selectedBrand.name} ×
                </Link>
              ) : null}

              {stockLabel ? (
                <Link
                  href={buildFilterUrl(query, "stock")}
                  className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-700 transition hover:border-neutral-950"
                >
                  {stockLabel} ×
                </Link>
              ) : null}

              {sortLabel ? (
                <Link
                  href={buildFilterUrl(query, "sort")}
                  className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-700 transition hover:border-neutral-950"
                >
                  {sortLabel} ×
                </Link>
              ) : null}

              <Link
                href="/products"
                className="rounded-full bg-neutral-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-800"
              >
                Hamısını təmizlə
              </Link>
            </div>
          ) : null}

          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-neutral-500">
              {products.length} məhsul tapıldı
            </p>
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
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
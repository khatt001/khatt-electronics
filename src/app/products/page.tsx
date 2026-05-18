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
  }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const query = await searchParams;

  const [products, categories, brands] = await Promise.all([
    getCatalogProducts({
      search: query.search,
      category: query.category,
      brand: query.brand,
      stock: query.stock,
    }),
    getCatalogCategories(),
    getCatalogBrands(),
  ]);

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
          <form className="mb-8 rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr_1fr_1fr_auto]">
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

              <button
                type="submit"
                className="h-12 rounded-full bg-neutral-950 px-6 text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                Filterlə
              </button>
            </div>
          </form>

          <div className="mb-5 flex items-center justify-between gap-4">
            <p className="text-sm text-neutral-500">
              {products.length} məhsul tapıldı
            </p>

            {(query.search || query.category || query.brand || query.stock) ? (
              <a
                href="/products"
                className="text-sm font-medium text-neutral-700 underline underline-offset-4 transition hover:text-neutral-950"
              >
                Filterləri təmizlə
              </a>
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
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
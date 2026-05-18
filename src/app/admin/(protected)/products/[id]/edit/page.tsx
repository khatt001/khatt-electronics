import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { updateProduct } from "@/app/admin/(protected)/products/actions";
import { getAdminProductById } from "@/services/admin-products";
import { getCatalogBrands } from "@/services/brands";
import { getCatalogCategories } from "@/services/categories";

type EditProductPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function EditProductPage({
  params,
  searchParams,
}: EditProductPageProps) {
  const { id } = await params;
  const query = await searchParams;

  const [product, categories, brands] = await Promise.all([
    getAdminProductById(id),
    getCatalogCategories(),
    getCatalogBrands(),
  ]);

  if (!product) {
    notFound();
  }

  const updateProductWithId = updateProduct.bind(null, product.id);

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/products"
          className="mb-5 inline-flex items-center text-sm font-medium text-neutral-600 transition hover:text-neutral-950"
        >
          <ArrowLeft className="mr-2 size-4" aria-hidden="true" />
          Məhsullara qayıt
        </Link>

        <p className="text-xs uppercase tracking-[0.24em] text-neutral-400">
          Məhsulu redaktə et
        </p>
        <h2 className="mt-2 text-3xl font-semibold">{product.name_az}</h2>
      </div>

      {query.error ? (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {decodeURIComponent(query.error)}
        </div>
      ) : null}

      <form action={updateProductWithId} className="grid gap-8 xl:grid-cols-[1fr_340px]">
        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">Məhsul adı</label>
            <input
              name="name_az"
              required
              minLength={2}
              defaultValue={product.name_az}
              className="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Slug</label>
            <input
              name="slug"
              required
              minLength={2}
              defaultValue={product.slug}
              className="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Qısa açıqlama</label>
            <textarea
              name="short_description_az"
              rows={3}
              defaultValue={product.short_description_az ?? ""}
              className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none transition focus:border-neutral-950"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Ətraflı açıqlama</label>
            <textarea
              name="description_az"
              rows={7}
              defaultValue={product.description_az ?? ""}
              className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none transition focus:border-neutral-950"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">SEO başlıq</label>
              <input
                name="seo_title_az"
                defaultValue={product.seo_title_az ?? ""}
                className="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">SEO açıqlama</label>
              <input
                name="seo_description_az"
                defaultValue={product.seo_description_az ?? ""}
                className="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
              />
            </div>
          </div>
        </div>

        <aside className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">Kateqoriya</label>
            <select
              name="category_id"
              required
              defaultValue={product.category_id}
              className="h-12 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm outline-none transition focus:border-neutral-950"
            >
              <option value="">Seç</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Brend</label>
            <select
              name="brand_id"
              defaultValue={product.brand_id ?? ""}
              className="h-12 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm outline-none transition focus:border-neutral-950"
            >
              <option value="">Brend yoxdur</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Qiymət</label>
            <input
              name="price"
              type="number"
              min="0"
              step="0.01"
              defaultValue={product.price ?? ""}
              className="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
            />
          </div>

          <label className="flex items-center gap-3 rounded-2xl border border-neutral-200 p-4 text-sm font-medium">
            <input
              name="price_visible"
              type="checkbox"
              defaultChecked={product.price_visible}
            />
            Qiyməti saytda göstər
          </label>

          <label className="flex items-center gap-3 rounded-2xl border border-neutral-200 p-4 text-sm font-medium">
            <input
              name="is_featured"
              type="checkbox"
              defaultChecked={product.is_featured}
            />
            Seçilmiş məhsul et
          </label>

          <div>
            <label className="mb-2 block text-sm font-medium">Stok</label>
            <select
              name="stock_status"
              defaultValue={product.stock_status}
              className="h-12 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm outline-none transition focus:border-neutral-950"
            >
              <option value="in_stock">Stokda var</option>
              <option value="out_of_stock">Stokda yoxdur</option>
              <option value="pre_order">Öncədən sifariş</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Status</label>
            <select
              name="status"
              defaultValue={product.status}
              className="h-12 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm outline-none transition focus:border-neutral-950"
            >
              <option value="draft">Qaralama</option>
              <option value="active">Aktiv</option>
              <option value="archived">Arxiv</option>
            </select>
          </div>

          <button
            type="submit"
            className="h-12 w-full rounded-full bg-neutral-950 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            Dəyişiklikləri yadda saxla
          </button>
        </aside>
      </form>
    </div>
  );
}
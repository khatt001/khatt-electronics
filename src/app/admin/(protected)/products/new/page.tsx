import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createProduct } from "@/app/admin/(protected)/products/actions";
import { getCatalogBrands } from "@/services/brands";
import { getCatalogCategories } from "@/services/categories";

type NewProductPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function NewProductPage({
  searchParams,
}: NewProductPageProps) {
  const params = await searchParams;
  const [categories, brands] = await Promise.all([
    getCatalogCategories("az"),
    getCatalogBrands(),
  ]);

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
          Yeni məhsul
        </p>

        <h2 className="mt-2 text-3xl font-semibold">Məhsul əlavə et</h2>

        <p className="mt-2 text-sm leading-6 text-neutral-500">
          Məhsul məlumatlarını AZ, EN və RU dillərində daxil edin. EN/RU
          sahələri boş qalarsa, saytda AZ məlumat fallback kimi görünəcək.
        </p>
      </div>

      {params.error ? (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {decodeURIComponent(params.error)}
        </div>
      ) : null}

      <form
        action={createProduct}
        className="grid gap-8 xl:grid-cols-[1fr_340px]"
      >
        <div className="space-y-6">
          <section className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
            <h3 className="text-xl font-semibold text-neutral-950">
              Əsas məlumatlar
            </h3>

            <div className="mt-5 space-y-5">
              <div className="grid gap-5 md:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Məhsul adı AZ
                  </label>
                  <input
                    name="name_az"
                    required
                    minLength={2}
                    className="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                    placeholder="Məsələn: 4MP IP Dome Kamera"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Məhsul adı EN
                  </label>
                  <input
                    name="name_en"
                    className="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                    placeholder="Example: 4MP IP Dome Camera"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Məhsul adı RU
                  </label>
                  <input
                    name="name_ru"
                    className="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                    placeholder="Например: IP Dome камера 4MP"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Slug</label>
                <input
                  name="slug"
                  className="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                  placeholder="Boş saxlasanız avtomatik yaranacaq"
                />
                <p className="mt-2 text-xs text-neutral-500">
                  URL üçün istifadə olunur. Məsələn:
                  /products/4mp-ip-dome-kamera
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
            <h3 className="text-xl font-semibold text-neutral-950">
              Qısa açıqlama
            </h3>

            <div className="mt-5 grid gap-5 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Qısa açıqlama AZ
                </label>
                <textarea
                  name="short_description_az"
                  rows={4}
                  className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none transition focus:border-neutral-950"
                  placeholder="Məhsul haqqında qısa məlumat..."
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Qısa açıqlama EN
                </label>
                <textarea
                  name="short_description_en"
                  rows={4}
                  className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none transition focus:border-neutral-950"
                  placeholder="Short product description..."
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Qısa açıqlama RU
                </label>
                <textarea
                  name="short_description_ru"
                  rows={4}
                  className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none transition focus:border-neutral-950"
                  placeholder="Краткое описание товара..."
                />
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
            <h3 className="text-xl font-semibold text-neutral-950">
              Ətraflı açıqlama
            </h3>

            <div className="mt-5 grid gap-5 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Ətraflı açıqlama AZ
                </label>
                <textarea
                  name="description_az"
                  rows={8}
                  className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none transition focus:border-neutral-950"
                  placeholder="Texniki və satış məlumatları..."
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Ətraflı açıqlama EN
                </label>
                <textarea
                  name="description_en"
                  rows={8}
                  className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none transition focus:border-neutral-950"
                  placeholder="Technical and sales information..."
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Ətraflı açıqlama RU
                </label>
                <textarea
                  name="description_ru"
                  rows={8}
                  className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none transition focus:border-neutral-950"
                  placeholder="Техническая и коммерческая информация..."
                />
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
            <h3 className="text-xl font-semibold text-neutral-950">SEO</h3>

            <div className="mt-5 grid gap-5 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  SEO başlıq AZ
                </label>
                <input
                  name="seo_title_az"
                  className="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                  placeholder="SEO title AZ"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  SEO başlıq EN
                </label>
                <input
                  name="seo_title_en"
                  className="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                  placeholder="SEO title EN"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  SEO başlıq RU
                </label>
                <input
                  name="seo_title_ru"
                  className="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                  placeholder="SEO title RU"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  SEO açıqlama AZ
                </label>
                <input
                  name="seo_description_az"
                  className="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                  placeholder="SEO description AZ"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  SEO açıqlama EN
                </label>
                <input
                  name="seo_description_en"
                  className="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                  placeholder="SEO description EN"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  SEO açıqlama RU
                </label>
                <input
                  name="seo_description_ru"
                  className="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                  placeholder="SEO description RU"
                />
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-5">
          <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-neutral-950">
              Məhsul parametrləri
            </h3>

            <div className="mt-5 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Kateqoriya
                </label>
                <select
                  name="category_id"
                  required
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
                <label className="mb-2 block text-sm font-medium">
                  Qiymət
                </label>
                <input
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  className="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                  placeholder="0.00"
                />
              </div>

              <label className="flex items-center gap-3 rounded-2xl border border-neutral-200 p-4 text-sm font-medium">
                <input name="price_visible" type="checkbox" />
                Qiyməti saytda göstər
              </label>

              <label className="flex items-center gap-3 rounded-2xl border border-neutral-200 p-4 text-sm font-medium">
                <input name="is_featured" type="checkbox" />
                Seçilmiş məhsul et
              </label>

              <div>
                <label className="mb-2 block text-sm font-medium">Stok</label>
                <select
                  name="stock_status"
                  defaultValue="in_stock"
                  className="h-12 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm outline-none transition focus:border-neutral-950"
                >
                  <option value="in_stock">Stokda var</option>
                  <option value="out_of_stock">Stokda yoxdur</option>
                  <option value="pre_order">Öncədən sifariş</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Stok sayı
                </label>
                <input
                  name="stock_quantity"
                  type="number"
                  min="0"
                  defaultValue="0"
                  className="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                  placeholder="Məsələn: 10"
                />
                <p className="mt-2 text-xs text-neutral-500">
                  Stok statusu “Stokda var” olduqda real məhsul sayını yazın.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Status
                </label>
                <select
                  name="status"
                  defaultValue="draft"
                  className="h-12 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm outline-none transition focus:border-neutral-950"
                >
                  <option value="draft">Qaralama</option>
                  <option value="active">Aktiv</option>
                  <option value="archived">Arxiv</option>
                </select>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
            <label className="mb-2 block text-sm font-medium">
              Məhsul şəkilləri
            </label>
            <input
              name="images"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none transition file:mr-4 file:rounded-full file:border-0 file:bg-neutral-950 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-neutral-800"
            />
            <p className="mt-2 text-xs text-neutral-500">
              JPG, PNG və ya WEBP. Hər şəkil maksimum 3MB. Maksimum 8 şəkil.
            </p>
          </div>

          <button
            type="submit"
            className="h-12 w-full rounded-full bg-neutral-950 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            Məhsulu yarat
          </button>
        </aside>
      </form>
    </div>
  );
}
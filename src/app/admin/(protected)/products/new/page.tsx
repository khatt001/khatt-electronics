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

const inputClassName =
  "h-12 w-full rounded-lg border border-neutral-200 bg-white px-4 text-sm outline-none transition placeholder:text-neutral-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10";

const textareaClassName =
  "w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-neutral-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10";

const sectionClassName =
  "rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm";

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
          className="mb-5 inline-flex items-center text-sm font-medium text-neutral-600 transition hover:text-emerald-700"
        >
          <ArrowLeft className="mr-2 size-4" aria-hidden="true" />
          Məhsullara qayıt
        </Link>

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
          Yeni məhsul
        </p>

        <h2 className="mt-2 text-3xl font-semibold text-neutral-950">
          Məhsul əlavə et
        </h2>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-500">
          Məhsul məlumatlarını AZ, EN və RU dillərində daxil edin. EN və RU
          sahələri boş qalarsa, saytda Azərbaycan dili məlumatı göstəriləcək.
        </p>
      </div>

      {params.error ? (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {params.error}
        </div>
      ) : null}

      <form
        action={createProduct}
        className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_340px]"
      >
        <div className="min-w-0 space-y-6">
          <section className={sectionClassName}>
            <h3 className="text-xl font-semibold text-neutral-950">
              Əsas məlumatlar
            </h3>

            <div className="mt-5 space-y-5">
              <div className="grid gap-5 md:grid-cols-3">
                <div>
                  <label
                    htmlFor="name-az"
                    className="mb-2 block text-sm font-medium text-neutral-700"
                  >
                    Məhsul adı AZ
                  </label>

                  <input
                    id="name-az"
                    name="name_az"
                    required
                    minLength={2}
                    className={inputClassName}
                    placeholder="Məsələn: 4MP IP Dome Kamera"
                  />
                </div>

                <div>
                  <label
                    htmlFor="name-en"
                    className="mb-2 block text-sm font-medium text-neutral-700"
                  >
                    Məhsul adı EN
                  </label>

                  <input
                    id="name-en"
                    name="name_en"
                    className={inputClassName}
                    placeholder="Example: 4MP IP Dome Camera"
                  />
                </div>

                <div>
                  <label
                    htmlFor="name-ru"
                    className="mb-2 block text-sm font-medium text-neutral-700"
                  >
                    Məhsul adı RU
                  </label>

                  <input
                    id="name-ru"
                    name="name_ru"
                    className={inputClassName}
                    placeholder="Например: IP Dome камера 4MP"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="product-slug"
                  className="mb-2 block text-sm font-medium text-neutral-700"
                >
                  Slug
                </label>

                <input
                  id="product-slug"
                  name="slug"
                  className={inputClassName}
                  placeholder="Boş saxlasanız avtomatik yaranacaq"
                />

                <p className="mt-2 text-xs text-neutral-500">
                  URL üçün istifadə olunur. Məsələn:
                  /products/4mp-ip-dome-kamera
                </p>
              </div>
            </div>
          </section>

          <section className={sectionClassName}>
            <h3 className="text-xl font-semibold text-neutral-950">
              Qısa açıqlama
            </h3>

            <div className="mt-5 grid gap-5 md:grid-cols-3">
              <div>
                <label
                  htmlFor="short-description-az"
                  className="mb-2 block text-sm font-medium text-neutral-700"
                >
                  Qısa açıqlama AZ
                </label>

                <textarea
                  id="short-description-az"
                  name="short_description_az"
                  rows={4}
                  className={textareaClassName}
                  placeholder="Məhsul haqqında qısa məlumat..."
                />
              </div>

              <div>
                <label
                  htmlFor="short-description-en"
                  className="mb-2 block text-sm font-medium text-neutral-700"
                >
                  Qısa açıqlama EN
                </label>

                <textarea
                  id="short-description-en"
                  name="short_description_en"
                  rows={4}
                  className={textareaClassName}
                  placeholder="Short product description..."
                />
              </div>

              <div>
                <label
                  htmlFor="short-description-ru"
                  className="mb-2 block text-sm font-medium text-neutral-700"
                >
                  Qısa açıqlama RU
                </label>

                <textarea
                  id="short-description-ru"
                  name="short_description_ru"
                  rows={4}
                  className={textareaClassName}
                  placeholder="Краткое описание товара..."
                />
              </div>
            </div>
          </section>

          <section className={sectionClassName}>
            <h3 className="text-xl font-semibold text-neutral-950">
              Ətraflı açıqlama
            </h3>

            <div className="mt-5 grid gap-5 md:grid-cols-3">
              <div>
                <label
                  htmlFor="description-az"
                  className="mb-2 block text-sm font-medium text-neutral-700"
                >
                  Ətraflı açıqlama AZ
                </label>

                <textarea
                  id="description-az"
                  name="description_az"
                  rows={8}
                  className={textareaClassName}
                  placeholder="Texniki və satış məlumatları..."
                />
              </div>

              <div>
                <label
                  htmlFor="description-en"
                  className="mb-2 block text-sm font-medium text-neutral-700"
                >
                  Ətraflı açıqlama EN
                </label>

                <textarea
                  id="description-en"
                  name="description_en"
                  rows={8}
                  className={textareaClassName}
                  placeholder="Technical and sales information..."
                />
              </div>

              <div>
                <label
                  htmlFor="description-ru"
                  className="mb-2 block text-sm font-medium text-neutral-700"
                >
                  Ətraflı açıqlama RU
                </label>

                <textarea
                  id="description-ru"
                  name="description_ru"
                  rows={8}
                  className={textareaClassName}
                  placeholder="Техническая и коммерческая информация..."
                />
              </div>
            </div>
          </section>

          <section className={sectionClassName}>
            <h3 className="text-xl font-semibold text-neutral-950">SEO</h3>

            <div className="mt-5 grid gap-5 md:grid-cols-3">
              <div>
                <label
                  htmlFor="seo-title-az"
                  className="mb-2 block text-sm font-medium text-neutral-700"
                >
                  SEO başlıq AZ
                </label>

                <input
                  id="seo-title-az"
                  name="seo_title_az"
                  className={inputClassName}
                  placeholder="SEO title AZ"
                />
              </div>

              <div>
                <label
                  htmlFor="seo-title-en"
                  className="mb-2 block text-sm font-medium text-neutral-700"
                >
                  SEO başlıq EN
                </label>

                <input
                  id="seo-title-en"
                  name="seo_title_en"
                  className={inputClassName}
                  placeholder="SEO title EN"
                />
              </div>

              <div>
                <label
                  htmlFor="seo-title-ru"
                  className="mb-2 block text-sm font-medium text-neutral-700"
                >
                  SEO başlıq RU
                </label>

                <input
                  id="seo-title-ru"
                  name="seo_title_ru"
                  className={inputClassName}
                  placeholder="SEO title RU"
                />
              </div>

              <div>
                <label
                  htmlFor="seo-description-az"
                  className="mb-2 block text-sm font-medium text-neutral-700"
                >
                  SEO açıqlama AZ
                </label>

                <input
                  id="seo-description-az"
                  name="seo_description_az"
                  className={inputClassName}
                  placeholder="SEO description AZ"
                />
              </div>

              <div>
                <label
                  htmlFor="seo-description-en"
                  className="mb-2 block text-sm font-medium text-neutral-700"
                >
                  SEO açıqlama EN
                </label>

                <input
                  id="seo-description-en"
                  name="seo_description_en"
                  className={inputClassName}
                  placeholder="SEO description EN"
                />
              </div>

              <div>
                <label
                  htmlFor="seo-description-ru"
                  className="mb-2 block text-sm font-medium text-neutral-700"
                >
                  SEO açıqlama RU
                </label>

                <input
                  id="seo-description-ru"
                  name="seo_description_ru"
                  className={inputClassName}
                  placeholder="SEO description RU"
                />
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-5">
          <section className={sectionClassName}>
            <h3 className="text-lg font-semibold text-neutral-950">
              Məhsul parametrləri
            </h3>

            <div className="mt-5 space-y-5">
              <div>
                <label
                  htmlFor="category-id"
                  className="mb-2 block text-sm font-medium text-neutral-700"
                >
                  Kateqoriya
                </label>

                <select
                  id="category-id"
                  name="category_id"
                  required
                  className={inputClassName}
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
                <label
                  htmlFor="brand-id"
                  className="mb-2 block text-sm font-medium text-neutral-700"
                >
                  Brend
                </label>

                <select
                  id="brand-id"
                  name="brand_id"
                  className={inputClassName}
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
                <label
                  htmlFor="product-price"
                  className="mb-2 block text-sm font-medium text-neutral-700"
                >
                  Qiymət
                </label>

                <input
                  id="product-price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  className={inputClassName}
                  placeholder="0.00"
                />
              </div>

              <label className="flex items-center gap-3 rounded-xl border border-neutral-200 p-4 text-sm font-medium text-neutral-700">
                <input
                  name="price_visible"
                  type="checkbox"
                  className="size-4 accent-emerald-600"
                />
                Qiyməti saytda göstər
              </label>

              <label className="flex items-center gap-3 rounded-xl border border-neutral-200 p-4 text-sm font-medium text-neutral-700">
                <input
                  name="is_featured"
                  type="checkbox"
                  className="size-4 accent-emerald-600"
                />
                Seçilmiş məhsul et
              </label>

              <div>
                <label
                  htmlFor="stock-status"
                  className="mb-2 block text-sm font-medium text-neutral-700"
                >
                  Stok
                </label>

                <select
                  id="stock-status"
                  name="stock_status"
                  defaultValue="in_stock"
                  className={inputClassName}
                >
                  <option value="in_stock">Stokda var</option>
                  <option value="out_of_stock">Stokda yoxdur</option>
                  <option value="pre_order">Öncədən sifariş</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="stock-quantity"
                  className="mb-2 block text-sm font-medium text-neutral-700"
                >
                  Stok sayı
                </label>

                <input
                  id="stock-quantity"
                  name="stock_quantity"
                  type="number"
                  min="0"
                  defaultValue="0"
                  className={inputClassName}
                  placeholder="Məsələn: 10"
                />

                <p className="mt-2 text-xs leading-5 text-neutral-500">
                  Stok statusu “Stokda var” olduqda real məhsul sayını yazın.
                </p>
              </div>

              <div>
                <label
                  htmlFor="product-status"
                  className="mb-2 block text-sm font-medium text-neutral-700"
                >
                  Status
                </label>

                <select
                  id="product-status"
                  name="status"
                  defaultValue="draft"
                  className={inputClassName}
                >
                  <option value="draft">Qaralama</option>
                  <option value="active">Aktiv</option>
                  <option value="archived">Arxiv</option>
                </select>
              </div>
            </div>
          </section>

          <section className={sectionClassName}>
            <label
              htmlFor="product-images"
              className="mb-2 block text-sm font-medium text-neutral-700"
            >
              Məhsul şəkilləri
            </label>

            <input
              id="product-images"
              name="images"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm outline-none transition file:mr-4 file:rounded-lg file:border-0 file:bg-neutral-950 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-emerald-700"
            />

            <p className="mt-2 text-xs leading-5 text-neutral-500">
              JPG, PNG və ya WEBP. Hər şəkil maksimum 3 MB. Maksimum 8 şəkil.
            </p>
          </section>

          <button
            type="submit"
            className="h-12 w-full rounded-lg bg-neutral-950 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Məhsulu yarat
          </button>
        </aside>
      </form>
    </div>
  );
}

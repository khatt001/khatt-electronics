import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  addProductSpecification,
  deleteProductImage,
  deleteProductSpecification,
  setPrimaryProductImage,
  updateProduct,
} from "@/app/admin/(protected)/products/actions";
import { getAdminProductById } from "@/services/admin-products";
import { getCatalogBrands } from "@/services/brands";
import { getCatalogCategories } from "@/services/categories";
import { STANDARD_SPEC_KEYS } from "@/lib/product-specs";

const inputClassName =
  "h-12 w-full rounded-lg border border-neutral-200 bg-white px-4 text-sm outline-none transition placeholder:text-neutral-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10";

const compactInputClassName =
  "h-11 w-full rounded-lg border border-neutral-200 bg-white px-4 text-sm outline-none transition placeholder:text-neutral-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10";

const textareaClassName =
  "w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-neutral-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10";

const sectionClassName =
  "rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm";

type EditProductPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
};

export default async function EditProductPage({
  params,
  searchParams,
}: EditProductPageProps) {
  const { id } = await params;
  const query = await searchParams;

  const [product, categories, brands] = await Promise.all([
    getAdminProductById(id),
    getCatalogCategories("az"),
    getCatalogBrands(),
  ]);

  if (!product) notFound();

  const updateProductWithId = updateProduct.bind(null, product.id);
  const addSpecificationWithId = addProductSpecification.bind(null, product.id);

  const sortedImages = [...product.images].sort((a, b) => {
    if (a.is_primary && !b.is_primary) return -1;
    if (!a.is_primary && b.is_primary) return 1;
    return a.sort_order - b.sort_order;
  });

  const sortedSpecifications = [...product.specifications].sort(
    (a, b) => a.sort_order - b.sort_order,
  );

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
          Məhsulu redaktə et
        </p>

        <h2 className="mt-2 text-3xl font-semibold text-neutral-950">
          {product.name_az}
        </h2>

        <p className="mt-2 text-sm leading-6 text-neutral-500">
          Məhsul məlumatlarını AZ, EN və RU dillərində idarə edin. EN/RU
          sahələri boş qalarsa, saytda AZ məlumat fallback kimi görünəcək.
        </p>
      </div>

      {query.error ? (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {query.error}
        </div>
      ) : null}

      <div className="grid gap-8 xl:grid-cols-[1fr_340px]">
        <div className="space-y-8">
          <form action={updateProductWithId} className="space-y-6">
            <section className={sectionClassName}>
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
                      defaultValue={product.name_az}
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Məhsul adı EN
                    </label>
                    <input
                      name="name_en"
                      defaultValue={product.name_en ?? ""}
                      className={inputClassName}
                      placeholder="Example: 4MP IP Dome Camera"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Məhsul adı RU
                    </label>
                    <input
                      name="name_ru"
                      defaultValue={product.name_ru ?? ""}
                      className={inputClassName}
                      placeholder="Например: IP Dome камера 4MP"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Slug</label>
                  <input
                    name="slug"
                    placeholder="Boş saxlasanız məhsul adından avtomatik yaranacaq"
                    defaultValue={product.slug}
                    className={inputClassName}
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
                  <label className="mb-2 block text-sm font-medium">
                    Qısa açıqlama AZ
                  </label>
                  <textarea
                    name="short_description_az"
                    rows={4}
                    defaultValue={product.short_description_az ?? ""}
                    className={textareaClassName}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Qısa açıqlama EN
                  </label>
                  <textarea
                    name="short_description_en"
                    rows={4}
                    defaultValue={product.short_description_en ?? ""}
                    className={textareaClassName}
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
                    defaultValue={product.short_description_ru ?? ""}
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
                  <label className="mb-2 block text-sm font-medium">
                    Ətraflı açıqlama AZ
                  </label>
                  <textarea
                    name="description_az"
                    rows={8}
                    defaultValue={product.description_az ?? ""}
                    className={textareaClassName}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Ətraflı açıqlama EN
                  </label>
                  <textarea
                    name="description_en"
                    rows={8}
                    defaultValue={product.description_en ?? ""}
                    className={textareaClassName}
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
                    defaultValue={product.description_ru ?? ""}
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
                  <label className="mb-2 block text-sm font-medium">
                    SEO başlıq AZ
                  </label>
                  <input
                    name="seo_title_az"
                    defaultValue={product.seo_title_az ?? ""}
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    SEO başlıq EN
                  </label>
                  <input
                    name="seo_title_en"
                    defaultValue={product.seo_title_en ?? ""}
                    className={inputClassName}
                    placeholder="SEO title EN"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    SEO başlıq RU
                  </label>
                  <input
                    name="seo_title_ru"
                    defaultValue={product.seo_title_ru ?? ""}
                    className={inputClassName}
                    placeholder="SEO title RU"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    SEO açıqlama AZ
                  </label>
                  <input
                    name="seo_description_az"
                    defaultValue={product.seo_description_az ?? ""}
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    SEO açıqlama EN
                  </label>
                  <input
                    name="seo_description_en"
                    defaultValue={product.seo_description_en ?? ""}
                    className={inputClassName}
                    placeholder="SEO description EN"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    SEO açıqlama RU
                  </label>
                  <input
                    name="seo_description_ru"
                    defaultValue={product.seo_description_ru ?? ""}
                    className={inputClassName}
                    placeholder="SEO description RU"
                  />
                </div>
              </div>
            </section>

            <section className={sectionClassName}>
              <h3 className="text-xl font-semibold text-neutral-950">
                Məhsul parametrləri
              </h3>

              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Kateqoriya
                  </label>
                  <select
                    name="category_id"
                    required
                    defaultValue={product.category_id}
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
                  <label className="mb-2 block text-sm font-medium">
                    Brend
                  </label>
                  <select
                    name="brand_id"
                    defaultValue={product.brand_id ?? ""}
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
              </div>

              <div className="mt-5 grid gap-5 md:grid-cols-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Qiymət
                  </label>
                  <input
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    defaultValue={product.price ?? ""}
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Stok</label>
                  <select
                    name="stock_status"
                    defaultValue={product.stock_status}
                    className={inputClassName}
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
                    defaultValue={product.stock_quantity ?? 0}
                    className={inputClassName}
                    placeholder="Məsələn: 10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Status
                  </label>
                  <select
                    name="status"
                    defaultValue={product.status}
                    className={inputClassName}
                  >
                    <option value="draft">Qaralama</option>
                    <option value="active">Aktiv</option>
                    <option value="archived">Arxiv</option>
                  </select>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <label className="flex items-center gap-3 rounded-xl border border-neutral-200 p-4 text-sm font-medium text-neutral-700">
                  <input
                    name="price_visible"
                    type="checkbox"
                    defaultChecked={product.price_visible}
                    className="size-4 accent-emerald-600"
                  />
                  Qiyməti saytda göstər
                </label>

                <label className="flex items-center gap-3 rounded-xl border border-neutral-200 p-4 text-sm font-medium text-neutral-700">
                  <input
                    name="is_featured"
                    type="checkbox"
                    defaultChecked={product.is_featured}
                    className="size-4 accent-emerald-600"
                  />
                  Seçilmiş məhsul et
                </label>
              </div>
            </section>

            <section className={sectionClassName}>
              <label className="mb-2 block text-sm font-medium">
                Əlavə şəkillər
              </label>
              <input
                name="images"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm outline-none transition file:mr-4 file:rounded-lg file:border-0 file:bg-neutral-950 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-emerald-700"
              />
              <p className="mt-2 text-xs text-neutral-500">
                Mövcud şəkillərə əlavə olunur. JPG, PNG və ya WEBP. Maksimum 8
                şəkil.
              </p>
            </section>

            <button
              type="submit"
              className="h-12 w-full rounded-lg bg-neutral-950 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Dəyişiklikləri yadda saxla
            </button>
          </form>

          <div className={sectionClassName}>
            <div className="mb-5">
              <h3 className="text-xl font-semibold">Texniki göstəricilər</h3>
              <p className="mt-1 text-sm text-neutral-500">
                Məhsul səhifəsində və filter sistemində istifadə olunan standart
                parametrlər. EN/RU boş qalarsa, AZ dəyər fallback kimi istifadə
                olunacaq.
              </p>
            </div>

            <datalist id="standard-spec-keys">
              {STANDARD_SPEC_KEYS.map((key) => (
                <option key={key} value={key} />
              ))}
            </datalist>

            <form action={addSpecificationWithId} className="space-y-4">
              <div className="grid gap-3 md:grid-cols-3">
                <div>
                  <label className="mb-2 block text-xs font-medium text-neutral-500">
                    Parametr AZ
                  </label>
                  <input
                    name="spec_key_az"
                    required
                    list="standard-spec-keys"
                    placeholder="Məsələn: Görüntü keyfiyyəti"
                    className={compactInputClassName}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-neutral-500">
                    Parametr EN
                  </label>
                  <input
                    name="spec_key_en"
                    placeholder="Example: Resolution"
                    className={compactInputClassName}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-neutral-500">
                    Parametr RU
                  </label>
                  <input
                    name="spec_key_ru"
                    placeholder="Например: Разрешение"
                    className={compactInputClassName}
                  />
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                <div>
                  <label className="mb-2 block text-xs font-medium text-neutral-500">
                    Dəyər AZ
                  </label>
                  <input
                    name="spec_value_az"
                    required
                    placeholder="Məsələn: 4MP"
                    className={compactInputClassName}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-neutral-500">
                    Dəyər EN
                  </label>
                  <input
                    name="spec_value_en"
                    placeholder="Example: 4MP"
                    className={compactInputClassName}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-neutral-500">
                    Dəyər RU
                  </label>
                  <input
                    name="spec_value_ru"
                    placeholder="Например: 4MP"
                    className={compactInputClassName}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="h-11 rounded-lg bg-neutral-950 px-5 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Əlavə et
              </button>
            </form>

            <div className="mt-4 rounded-xl bg-neutral-50 p-4 text-xs leading-6 text-neutral-500">
              Eyni filterlərin qarışmaması üçün parametr adını mümkün qədər
              siyahıdan seçin. Lazım olsa custom parametr də yaza bilərsiniz.
            </div>

            <div className="mt-5">
              {sortedSpecifications.length > 0 ? (
                <div className="overflow-hidden rounded-xl border border-neutral-200">
                  {sortedSpecifications.map((spec) => (
                    <div
                      key={spec.id}
                      className="grid gap-3 border-b border-neutral-200 p-4 last:border-b-0 md:grid-cols-[1fr_1fr_auto] md:items-start"
                    >
                      <div>
                        <p className="text-xs uppercase tracking-[0.16em] text-neutral-400">
                          Açar
                        </p>

                        <div className="mt-1 space-y-1 text-sm">
                          <p className="font-medium text-neutral-950">
                            AZ: {spec.spec_key_az}
                          </p>
                          <p className="text-neutral-600">
                            EN: {spec.spec_key_en || "—"}
                          </p>
                          <p className="text-neutral-600">
                            RU: {spec.spec_key_ru || "—"}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-[0.16em] text-neutral-400">
                          Dəyər
                        </p>

                        <div className="mt-1 space-y-1 text-sm">
                          <p className="font-medium text-neutral-950">
                            AZ: {spec.spec_value_az}
                          </p>
                          <p className="text-neutral-600">
                            EN: {spec.spec_value_en || "—"}
                          </p>
                          <p className="text-neutral-600">
                            RU: {spec.spec_value_ru || "—"}
                          </p>
                        </div>
                      </div>

                      <form
                        action={deleteProductSpecification.bind(
                          null,
                          product.id,
                          spec.id,
                        )}
                      >
                        <button
                          type="submit"
                          className="rounded-lg border border-red-200 px-4 py-2 text-xs font-medium text-red-600 transition hover:border-red-500 hover:bg-red-50"
                        >
                          Sil
                        </button>
                      </form>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="rounded-xl border border-dashed border-neutral-300 p-5 text-sm text-neutral-500">
                  Bu məhsul üçün texniki göstərici əlavə edilməyib.
                </p>
              )}
            </div>
          </div>
        </div>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold">Mövcud şəkillər</h3>

            {sortedImages.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {sortedImages.map((image) => (
                  <div
                    key={image.id}
                    className="overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50"
                  >
                    <div className="relative aspect-square">
                      <Image
                        src={image.url}
                        alt={image.alt_az ?? product.name_az}
                        fill
                        sizes="180px"
                        className="object-contain p-2"
                      />
                    </div>

                    <div className="space-y-2 border-t border-neutral-200 bg-white p-2">
                      {image.is_primary ? (
                        <span className="block rounded-md bg-emerald-50 px-2 py-1 text-center text-xs font-medium text-emerald-700">
                          Əsas şəkil
                        </span>
                      ) : (
                        <form
                          action={setPrimaryProductImage.bind(
                            null,
                            product.id,
                            image.id,
                          )}
                        >
                          <button
                            type="submit"
                            className="w-full rounded-lg border border-neutral-200 px-2 py-1 text-xs font-medium transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                          >
                            Əsas et
                          </button>
                        </form>
                      )}

                      <form
                        action={deleteProductImage.bind(
                          null,
                          product.id,
                          image.id,
                        )}
                      >
                        <button
                          type="submit"
                          className="w-full rounded-lg border border-red-200 px-2 py-1 text-xs font-medium text-red-600 transition hover:border-red-500 hover:bg-red-50"
                        >
                          Sil
                        </button>
                      </form>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="rounded-xl border border-dashed border-neutral-300 p-4 text-sm text-neutral-500">
                Bu məhsul üçün şəkil yoxdur.
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

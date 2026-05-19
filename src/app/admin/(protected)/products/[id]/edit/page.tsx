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
    getCatalogCategories(),
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
    (a, b) => a.sort_order - b.sort_order
  );

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

      <div className="grid gap-8 xl:grid-cols-[1fr_340px]">
        <div className="space-y-8">
          <form
            action={updateProductWithId}
            className="space-y-5 rounded-3xl border border-neutral-200 p-5"
          >
            <div>
              <label className="mb-2 block text-sm font-medium">
                Məhsul adı
              </label>
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
                placeholder="Boş saxlasanız məhsul adından avtomatik yaranacaq"
                defaultValue={product.slug}
                className="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Qısa açıqlama
              </label>
              <textarea
                name="short_description_az"
                rows={3}
                defaultValue={product.short_description_az ?? ""}
                className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none transition focus:border-neutral-950"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Ətraflı açıqlama
              </label>
              <textarea
                name="description_az"
                rows={7}
                defaultValue={product.description_az ?? ""}
                className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none transition focus:border-neutral-950"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  SEO başlıq
                </label>
                <input
                  name="seo_title_az"
                  defaultValue={product.seo_title_az ?? ""}
                  className="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  SEO açıqlama
                </label>
                <input
                  name="seo_description_az"
                  defaultValue={product.seo_description_az ?? ""}
                  className="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Kateqoriya
                </label>
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
            </div>

            <div className="grid gap-5 md:grid-cols-4">
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
                <label className="mb-2 block text-sm font-medium">
                  Stok sayı
                </label>
                <input
                  name="stock_quantity"
                  type="number"
                  min="0"
                  defaultValue={product.stock_quantity ?? 0}
                  className="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                  placeholder="Məsələn: 10"
                />
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
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
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
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Əlavə şəkillər
              </label>
              <input
                name="images"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none transition file:mr-4 file:rounded-full file:border-0 file:bg-neutral-950 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-neutral-800"
              />
              <p className="mt-2 text-xs text-neutral-500">
                Mövcud şəkillərə əlavə olunur. JPG, PNG və ya WEBP. Maksimum 8
                şəkil.
              </p>
            </div>

            <button
              type="submit"
              className="h-12 w-full rounded-full bg-neutral-950 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              Dəyişiklikləri yadda saxla
            </button>
          </form>

          <div className="rounded-3xl border border-neutral-200 p-5">
            <div className="mb-5">
              <h3 className="text-xl font-semibold">Texniki göstəricilər</h3>
              <p className="mt-1 text-sm text-neutral-500">
                Məhsul səhifəsində və filter sistemində istifadə olunan
                standart parametrlər.
              </p>
            </div>

            <datalist id="standard-spec-keys">
              {STANDARD_SPEC_KEYS.map((key) => (
                <option key={key} value={key} />
              ))}
            </datalist>

            <form
              action={addSpecificationWithId}
              className="grid gap-3 md:grid-cols-[1fr_1fr_auto]"
            >
              <div>
                <label className="mb-2 block text-xs font-medium text-neutral-500">
                  Parametr
                </label>
                <input
                  name="spec_key_az"
                  required
                  list="standard-spec-keys"
                  placeholder="Məsələn: Görüntü keyfiyyəti"
                  className="h-11 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-neutral-500">
                  Dəyər
                </label>
                <input
                  name="spec_value_az"
                  required
                  placeholder="Məsələn: 4MP"
                  className="h-11 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                />
              </div>

              <button
                type="submit"
                className="mt-6 h-11 rounded-full bg-neutral-950 px-5 text-sm font-semibold text-white transition hover:bg-neutral-800 md:mt-7"
              >
                Əlavə et
              </button>
            </form>

            <div className="mt-4 rounded-2xl bg-neutral-50 p-4 text-xs leading-6 text-neutral-500">
              Eyni filterlərin qarışmaması üçün parametr adını mümkün qədər
              siyahıdan seçin. Lazım olsa custom parametr də yaza bilərsiniz.
            </div>

            <div className="mt-5">
              {sortedSpecifications.length > 0 ? (
                <div className="overflow-hidden rounded-2xl border border-neutral-200">
                  {sortedSpecifications.map((spec) => (
                    <div
                      key={spec.id}
                      className="grid gap-3 border-b border-neutral-200 p-4 last:border-b-0 md:grid-cols-[1fr_1fr_auto] md:items-center"
                    >
                      <div>
                        <p className="text-xs uppercase tracking-[0.16em] text-neutral-400">
                          Açar
                        </p>
                        <p className="mt-1 text-sm font-medium text-neutral-950">
                          {spec.spec_key_az}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-[0.16em] text-neutral-400">
                          Dəyər
                        </p>
                        <p className="mt-1 text-sm text-neutral-700">
                          {spec.spec_value_az}
                        </p>
                      </div>

                      <form
                        action={deleteProductSpecification.bind(
                          null,
                          product.id,
                          spec.id
                        )}
                      >
                        <button
                          type="submit"
                          className="rounded-full border border-red-200 px-4 py-2 text-xs font-medium text-red-600 transition hover:border-red-600"
                        >
                          Sil
                        </button>
                      </form>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="rounded-2xl border border-dashed border-neutral-300 p-5 text-sm text-neutral-500">
                  Bu məhsul üçün texniki göstərici əlavə edilməyib.
                </p>
              )}
            </div>
          </div>
        </div>

        <aside className="space-y-5">
          <div className="rounded-3xl border border-neutral-200 p-4">
            <h3 className="mb-4 text-sm font-semibold">Mövcud şəkillər</h3>

            {sortedImages.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {sortedImages.map((image) => (
                  <div
                    key={image.id}
                    className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50"
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
                        <span className="block rounded-full bg-emerald-50 px-2 py-1 text-center text-xs font-medium text-emerald-700">
                          Əsas şəkil
                        </span>
                      ) : (
                        <form
                          action={setPrimaryProductImage.bind(
                            null,
                            product.id,
                            image.id
                          )}
                        >
                          <button
                            type="submit"
                            className="w-full rounded-full border border-neutral-200 px-2 py-1 text-xs font-medium transition hover:border-neutral-950"
                          >
                            Əsas et
                          </button>
                        </form>
                      )}

                      <form
                        action={deleteProductImage.bind(
                          null,
                          product.id,
                          image.id
                        )}
                      >
                        <button
                          type="submit"
                          className="w-full rounded-full border border-red-200 px-2 py-1 text-xs font-medium text-red-600 transition hover:border-red-600"
                        >
                          Sil
                        </button>
                      </form>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="rounded-2xl border border-dashed border-neutral-300 p-4 text-sm text-neutral-500">
                Bu məhsul üçün şəkil yoxdur.
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
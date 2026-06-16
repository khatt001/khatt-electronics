import {
  createCategory,
  toggleCategoryStatus,
} from "@/app/admin/(protected)/categories/actions";
import { getAdminCategories } from "@/services/admin-categories";

type AdminCategoriesPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

const inputClassName =
  "h-12 w-full rounded-lg border border-neutral-200 bg-white px-4 text-sm outline-none transition placeholder:text-neutral-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10";

const textareaClassName =
  "w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-neutral-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10";

export default async function AdminCategoriesPage({
  searchParams,
}: AdminCategoriesPageProps) {
  const query = await searchParams;
  const categories = await getAdminCategories();

  return (
    <div>
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
          Kateqoriyalar
        </p>

        <h2 className="mt-2 text-3xl font-semibold text-neutral-950">
          Kateqoriya idarəetməsi
        </h2>

        <p className="mt-2 text-sm text-neutral-500">
          {categories.length} kateqoriya tapıldı
        </p>
      </div>

      {query.error ? (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {decodeURIComponent(query.error)}
        </div>
      ) : null}

      <div className="grid gap-8 xl:grid-cols-[420px_1fr]">
        <form
          action={createCategory}
          className="h-fit rounded-2xl border border-neutral-200 bg-white p-5"
        >
          <h3 className="text-xl font-semibold text-neutral-950">
            Yeni kateqoriya
          </h3>

          <p className="mt-2 text-sm leading-6 text-neutral-500">
            Kataloqda göstəriləcək yeni kateqoriyanın məlumatlarını daxil edin.
          </p>

          <div className="mt-5 space-y-4">
            <div>
              <label
                htmlFor="category-name-az"
                className="mb-2 block text-sm font-medium text-neutral-700"
              >
                Ad
              </label>

              <input
                id="category-name-az"
                name="name_az"
                required
                placeholder="Məsələn: Kamera sistemləri"
                className={inputClassName}
              />
            </div>

            <div>
              <label
                htmlFor="category-name-en"
                className="mb-2 block text-sm font-medium text-neutral-700"
              >
                Ad EN
              </label>

              <input
                id="category-name-en"
                name="name_en"
                placeholder="Example: Camera systems"
                className={inputClassName}
              />
            </div>

            <div>
              <label
                htmlFor="category-name-ru"
                className="mb-2 block text-sm font-medium text-neutral-700"
              >
                Ad RU
              </label>

              <input
                id="category-name-ru"
                name="name_ru"
                placeholder="Например: Системы камер"
                className={inputClassName}
              />
            </div>

            <div>
              <label
                htmlFor="category-slug"
                className="mb-2 block text-sm font-medium text-neutral-700"
              >
                Slug
              </label>

              <input
                id="category-slug"
                name="slug"
                required
                placeholder="kamera-sistemleri"
                className={inputClassName}
              />
            </div>

            <div>
              <label
                htmlFor="category-description-az"
                className="mb-2 block text-sm font-medium text-neutral-700"
              >
                Açıqlama
              </label>

              <textarea
                id="category-description-az"
                name="description_az"
                rows={4}
                placeholder="Kateqoriya haqqında qısa məlumat"
                className={textareaClassName}
              />
            </div>

            <div>
              <label
                htmlFor="category-description-en"
                className="mb-2 block text-sm font-medium text-neutral-700"
              >
                Açıqlama EN
              </label>

              <textarea
                id="category-description-en"
                name="description_en"
                rows={3}
                placeholder="Short category description in English"
                className={textareaClassName}
              />
            </div>

            <div>
              <label
                htmlFor="category-description-ru"
                className="mb-2 block text-sm font-medium text-neutral-700"
              >
                Açıqlama RU
              </label>

              <textarea
                id="category-description-ru"
                name="description_ru"
                rows={3}
                placeholder="Краткое описание категории на русском"
                className={textareaClassName}
              />
            </div>

            <div>
              <label
                htmlFor="category-sort-order"
                className="mb-2 block text-sm font-medium text-neutral-700"
              >
                Sıralama
              </label>

              <input
                id="category-sort-order"
                name="sort_order"
                type="number"
                min="0"
                step="1"
                placeholder="0"
                className={inputClassName}
              />
            </div>

            <button
              type="submit"
              className="h-12 w-full rounded-lg bg-neutral-950 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Kateqoriya əlavə et
            </button>
          </div>
        </form>

        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
          <div className="hidden grid-cols-[1fr_90px_120px] gap-4 bg-neutral-50 px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500 md:grid">
            <span>Kateqoriya</span>
            <span>Sıra</span>
            <span>Status</span>
          </div>

          <div className="divide-y divide-neutral-200">
            {categories.length > 0 ? (
              categories.map((category) => (
                <div
                  key={category.id}
                  className="grid gap-4 px-5 py-5 transition hover:bg-neutral-50/70 md:grid-cols-[1fr_90px_120px] md:items-center"
                >
                  <div>
                    <h3 className="font-semibold text-neutral-950">
                      {category.name_az}
                    </h3>

                    <p className="mt-1 break-all text-sm text-neutral-500">
                      {category.slug}
                    </p>

                    {category.description_az ? (
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-500">
                        {category.description_az}
                      </p>
                    ) : null}
                  </div>

                  <div className="text-sm text-neutral-600">
                    <span className="mr-2 font-medium text-neutral-400 md:hidden">
                      Sıra:
                    </span>

                    {category.sort_order}
                  </div>

                  <form
                    action={toggleCategoryStatus.bind(
                      null,
                      category.id,
                      category.is_active,
                    )}
                  >
                    <button
                      type="submit"
                      className={`rounded-lg px-3 py-2 text-xs font-medium transition ${
                        category.is_active
                          ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
                      }`}
                    >
                      {category.is_active ? "Aktiv" : "Passiv"}
                    </button>
                  </form>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-sm text-neutral-500">
                Hələ kateqoriya yoxdur.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

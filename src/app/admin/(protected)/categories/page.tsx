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

export default async function AdminCategoriesPage({
  searchParams,
}: AdminCategoriesPageProps) {
  const query = await searchParams;
  const categories = await getAdminCategories();

  return (
    <div>
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.24em] text-neutral-400">
          Kateqoriyalar
        </p>
        <h2 className="mt-2 text-3xl font-semibold">
          Kateqoriya idarəetməsi
        </h2>
        <p className="mt-2 text-sm text-neutral-500">
          {categories.length} kateqoriya tapıldı
        </p>
      </div>

      {query.error ? (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {decodeURIComponent(query.error)}
        </div>
      ) : null}

      <div className="grid gap-8 xl:grid-cols-[420px_1fr]">
        <form
          action={createCategory}
          className="h-fit rounded-3xl border border-neutral-200 p-5"
        >
          <h3 className="text-xl font-semibold">Yeni kateqoriya</h3>

          <div className="mt-5 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">Ad</label>
              <input
                name="name_az"
                required
                placeholder="Məsələn: Kamera sistemləri"
                className="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
              />

            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Ad EN</label>
              <input
                name="name_en"
                placeholder="Example: Camera systems"
                className="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Ad RU</label>
              <input
                name="name_ru"
                placeholder="Например: Системы камер"
                className="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Slug</label>
              <input
                name="slug"
                required
                placeholder="kamera-sistemleri"
                className="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Açıqlama
              </label>
              <textarea
                name="description_az"
                rows={4}
                placeholder="Kateqoriya haqqında qısa məlumat"
                className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none transition focus:border-neutral-950"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Açıqlama EN</label>
              <textarea
                name="description_en"
                rows={3}
                placeholder="Short category description in English"
                className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none transition focus:border-neutral-950"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Açıqlama RU</label>
              <textarea
                name="description_ru"
                rows={3}
                placeholder="Краткое описание категории на русском"
                className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none transition focus:border-neutral-950"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">
                Sıralama
              </label>
              <input
                name="sort_order"
                type="number"
                min="0"
                step="1"
                placeholder="0"
                className="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
              />
            </div>

            <button
              type="submit"
              className="h-12 w-full rounded-full bg-neutral-950 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              Kateqoriya əlavə et
            </button>
          </div>
        </form>

        <div className="overflow-hidden rounded-3xl border border-neutral-200">
          <div className="grid grid-cols-[1fr_90px_120px] gap-4 bg-neutral-50 px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
            <span>Kateqoriya</span>
            <span>Sıra</span>
            <span>Status</span>
          </div>

          <div className="divide-y divide-neutral-200 bg-white">
            {categories.length > 0 ? (
              categories.map((category) => (
                <div
                  key={category.id}
                  className="grid gap-4 px-5 py-5 md:grid-cols-[1fr_90px_120px] md:items-center"
                >
                  <div>
                    <h3 className="font-semibold text-neutral-950">
                      {category.name_az}
                    </h3>
                    <p className="mt-1 text-sm text-neutral-500">
                      {category.slug}
                    </p>

                    {category.description_az ? (
                      <p className="mt-2 line-clamp-2 text-sm text-neutral-500">
                        {category.description_az}
                      </p>
                    ) : null}
                  </div>

                  <div className="text-sm text-neutral-600">
                    {category.sort_order}
                  </div>

                  <form
                    action={toggleCategoryStatus.bind(
                      null,
                      category.id,
                      category.is_active
                    )}
                  >
                    <button
                      type="submit"
                      className={`rounded-full px-3 py-2 text-xs font-medium ${category.is_active
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-neutral-100 text-neutral-500"
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
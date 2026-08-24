import {
  createBrand,
  deleteBrand,
  toggleBrandStatus,
  updateBrand,
} from "@/app/admin/(protected)/brands/actions";
import { DeleteSubmitButton } from "@/components/admin/delete-submit-button";
import { getAdminBrands } from "@/services/admin-brands";

type AdminBrandsPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

const inputClassName =
  "h-11 w-full rounded-lg border border-neutral-200 bg-white px-3 text-sm outline-none transition placeholder:text-neutral-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10";

export default async function AdminBrandsPage({
  searchParams,
}: AdminBrandsPageProps) {
  const query = await searchParams;
  const brands = await getAdminBrands();

  return (
    <div>
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
          Brendlər
        </p>

        <h2 className="mt-2 text-3xl font-semibold text-neutral-950">
          Brend idarəetməsi
        </h2>

        <p className="mt-2 text-sm text-neutral-500">
          {brands.length} brend tapıldı
        </p>
      </div>

      {query.error ? (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {query.error}
        </div>
      ) : null}

      <div className="grid gap-8 xl:grid-cols-[380px_1fr]">
        <form
          action={createBrand}
          className="h-fit rounded-2xl border border-neutral-200 bg-white p-5"
        >
          <h3 className="text-xl font-semibold text-neutral-950">
            Yeni brend
          </h3>

          <div className="mt-5 space-y-4">
            <input
              name="name"
              required
              placeholder="Brend adı"
              className={inputClassName}
            />

            <input
              name="slug"
              required
              placeholder="Slug, məsələn: hikvision"
              className={inputClassName}
            />

            <input
              name="website_url"
              type="url"
              placeholder="https://..."
              className={inputClassName}
            />

            <button
              type="submit"
              className="h-11 w-full rounded-lg bg-neutral-950 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Brend əlavə et
            </button>
          </div>
        </form>

        <div className="space-y-4">
          {brands.length > 0 ? (
            brands.map((brand) => (
              <div
                key={brand.id}
                className="rounded-2xl border border-neutral-200 bg-white p-5"
              >
                <form
                  action={updateBrand.bind(null, brand.id)}
                  className="grid gap-4 md:grid-cols-2"
                >
                  <div>
                    <label className="mb-2 block text-xs font-medium text-neutral-500">
                      Brend adı
                    </label>

                    <input
                      name="name"
                      required
                      defaultValue={brand.name}
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-medium text-neutral-500">
                      Slug
                    </label>

                    <input
                      name="slug"
                      required
                      defaultValue={brand.slug}
                      className={inputClassName}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-xs font-medium text-neutral-500">
                      Website
                    </label>

                    <input
                      name="website_url"
                      type="url"
                      defaultValue={brand.website_url ?? ""}
                      placeholder="https://..."
                      className={inputClassName}
                    />
                  </div>

                  <div className="flex flex-wrap gap-2 md:col-span-2">
                    <button
                      type="submit"
                      className="rounded-lg bg-neutral-950 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-emerald-700"
                    >
                      Dəyişiklikləri yadda saxla
                    </button>
                  </div>
                </form>

                <div className="mt-4 flex flex-wrap gap-2 border-t border-neutral-100 pt-4">
                  <form
                    action={toggleBrandStatus.bind(
                      null,
                      brand.id,
                      brand.is_active,
                    )}
                  >
                    <button
                      type="submit"
                      className={`rounded-lg px-4 py-2.5 text-xs font-semibold transition ${
                        brand.is_active
                          ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                      }`}
                    >
                      {brand.is_active
                        ? "Aktiv — passiv et"
                        : "Passiv — aktiv et"}
                    </button>
                  </form>

                  <form action={deleteBrand.bind(null, brand.id)}>
                    <DeleteSubmitButton
                      label="Brendi sil"
                      confirmMessage={`"${brand.name}" brendini silmək istədiyinizə əminsiniz?`}
                      className="rounded-lg bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                    />
                  </form>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-center text-sm text-neutral-500">
              Hələ brend yoxdur.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
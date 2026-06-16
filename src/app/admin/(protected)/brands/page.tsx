import {
  createBrand,
  toggleBrandStatus,
} from "@/app/admin/(protected)/brands/actions";
import { getAdminBrands } from "@/services/admin-brands";

type AdminBrandsPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

const inputClassName =
  "h-12 w-full rounded-lg border border-neutral-200 bg-white px-4 text-sm outline-none transition placeholder:text-neutral-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10";

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
          {decodeURIComponent(query.error)}
        </div>
      ) : null}

      <div className="grid gap-8 xl:grid-cols-[420px_1fr]">
        <form
          action={createBrand}
          className="h-fit rounded-2xl border border-neutral-200 bg-white p-5"
        >
          <h3 className="text-xl font-semibold text-neutral-950">Yeni brend</h3>

          <p className="mt-2 text-sm leading-6 text-neutral-500">
            Məhsullarda istifadə ediləcək istehsalçı məlumatlarını daxil edin.
          </p>

          <div className="mt-5 space-y-4">
            <div>
              <label
                htmlFor="brand-name"
                className="mb-2 block text-sm font-medium text-neutral-700"
              >
                Ad
              </label>

              <input
                id="brand-name"
                name="name"
                required
                placeholder="Məsələn: Hikvision"
                className={inputClassName}
              />
            </div>

            <div>
              <label
                htmlFor="brand-slug"
                className="mb-2 block text-sm font-medium text-neutral-700"
              >
                Slug
              </label>

              <input
                id="brand-slug"
                name="slug"
                required
                placeholder="hikvision"
                className={inputClassName}
              />
            </div>

            <div>
              <label
                htmlFor="brand-website"
                className="mb-2 block text-sm font-medium text-neutral-700"
              >
                Website URL
              </label>

              <input
                id="brand-website"
                name="website_url"
                type="url"
                placeholder="https://..."
                className={inputClassName}
              />
            </div>

            <button
              type="submit"
              className="h-12 w-full rounded-lg bg-neutral-950 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Brend əlavə et
            </button>
          </div>
        </form>

        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
          <div className="hidden grid-cols-[1fr_1fr_120px] gap-4 bg-neutral-50 px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500 md:grid">
            <span>Brend</span>
            <span>Website</span>
            <span>Status</span>
          </div>

          <div className="divide-y divide-neutral-200">
            {brands.length > 0 ? (
              brands.map((brand) => (
                <div
                  key={brand.id}
                  className="grid gap-4 px-5 py-5 transition hover:bg-neutral-50/70 md:grid-cols-[1fr_1fr_120px] md:items-center"
                >
                  <div>
                    <h3 className="font-semibold text-neutral-950">
                      {brand.name}
                    </h3>

                    <p className="mt-1 break-all text-sm text-neutral-500">
                      {brand.slug}
                    </p>
                  </div>

                  <div className="text-sm text-neutral-600">
                    <span className="mr-2 font-medium text-neutral-400 md:hidden">
                      Website:
                    </span>

                    {brand.website_url ? (
                      <a
                        href={brand.website_url}
                        target="_blank"
                        rel="noreferrer"
                        className="break-all transition hover:text-emerald-700"
                      >
                        Aç
                      </a>
                    ) : (
                      "Yoxdur"
                    )}
                  </div>

                  <form
                    action={toggleBrandStatus.bind(
                      null,
                      brand.id,
                      brand.is_active,
                    )}
                  >
                    <button
                      type="submit"
                      className={`rounded-lg px-3 py-2 text-xs font-medium transition ${
                        brand.is_active
                          ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
                      }`}
                    >
                      {brand.is_active ? "Aktiv" : "Passiv"}
                    </button>
                  </form>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-sm text-neutral-500">
                Hələ brend yoxdur.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { createBrand, toggleBrandStatus } from "@/app/admin/(protected)/brands/actions";
import { getAdminBrands } from "@/services/admin-brands";

type AdminBrandsPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function AdminBrandsPage({
  searchParams,
}: AdminBrandsPageProps) {
  const query = await searchParams;
  const brands = await getAdminBrands();

  return (
    <div>
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.24em] text-neutral-400">
          Brendlər
        </p>
        <h2 className="mt-2 text-3xl font-semibold">Brend idarəetməsi</h2>
        <p className="mt-2 text-sm text-neutral-500">
          {brands.length} brend tapıldı
        </p>
      </div>

      {query.error ? (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {decodeURIComponent(query.error)}
        </div>
      ) : null}

      <div className="grid gap-8 xl:grid-cols-[420px_1fr]">
        <form
          action={createBrand}
          className="h-fit rounded-3xl border border-neutral-200 p-5"
        >
          <h3 className="text-xl font-semibold">Yeni brend</h3>

          <div className="mt-5 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">Ad</label>
              <input
                name="name"
                required
                placeholder="Məsələn: Hikvision"
                className="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Slug</label>
              <input
                name="slug"
                required
                placeholder="hikvision"
                className="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Website URL
              </label>
              <input
                name="website_url"
                placeholder="https://..."
                className="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
              />
            </div>

            <button
              type="submit"
              className="h-12 w-full rounded-full bg-neutral-950 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              Brend əlavə et
            </button>
          </div>
        </form>

        <div className="overflow-hidden rounded-3xl border border-neutral-200">
          <div className="grid grid-cols-[1fr_1fr_120px] gap-4 bg-neutral-50 px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
            <span>Brend</span>
            <span>Website</span>
            <span>Status</span>
          </div>

          <div className="divide-y divide-neutral-200 bg-white">
            {brands.length > 0 ? (
              brands.map((brand) => (
                <div
                  key={brand.id}
                  className="grid gap-4 px-5 py-5 md:grid-cols-[1fr_1fr_120px] md:items-center"
                >
                  <div>
                    <h3 className="font-semibold text-neutral-950">
                      {brand.name}
                    </h3>
                    <p className="mt-1 text-sm text-neutral-500">
                      {brand.slug}
                    </p>
                  </div>

                  <div className="text-sm text-neutral-600">
                    {brand.website_url ? (
                      <a
                        href={brand.website_url}
                        target="_blank"
                        rel="noreferrer"
                        className="underline underline-offset-4"
                      >
                        Aç
                      </a>
                    ) : (
                      "Yoxdur"
                    )}
                  </div>

                  <form action={toggleBrandStatus.bind(null, brand.id, brand.is_active)}>
                    <button
                      type="submit"
                      className={`rounded-full px-3 py-2 text-xs font-medium ${
                        brand.is_active
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-neutral-100 text-neutral-500"
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
import Link from "next/link";
import { ExternalLink, Plus } from "lucide-react";
import { getAdminProducts } from "@/services/admin-products";

function statusLabel(status: string) {
  if (status === "active") return "Aktiv";
  if (status === "draft") return "Qaralama";
  if (status === "archived") return "Arxiv";
  return status;
}

function stockLabel(status: string) {
  if (status === "in_stock") return "Stokda var";
  if (status === "out_of_stock") return "Stokda yoxdur";
  if (status === "pre_order") return "Öncədən sifariş";
  return status;
}

export default async function AdminProductsPage() {
  const products = await getAdminProducts();

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-neutral-400">
            Məhsullar
          </p>
          <h2 className="mt-2 text-3xl font-semibold">Məhsul idarəetməsi</h2>
          <p className="mt-2 text-sm text-neutral-500">
            {products.length} məhsul tapıldı
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center rounded-full bg-neutral-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
        >
          <Plus className="mr-2 size-4" aria-hidden="true" />
          Yeni məhsul
        </Link>
      </div>

      {products.length > 0 ? (
        <div className="overflow-hidden rounded-3xl border border-neutral-200">
          <div className="hidden grid-cols-[1.4fr_1fr_0.8fr_0.8fr_0.7fr] gap-4 bg-neutral-50 px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500 lg:grid">
            <span>Məhsul</span>
            <span>Kateqoriya</span>
            <span>Qiymət</span>
            <span>Status</span>
            <span>Keçid</span>
          </div>

          <div className="divide-y divide-neutral-200 bg-white">
            {products.map((product) => (
              <div
                key={product.id}
                className="grid gap-4 px-5 py-5 lg:grid-cols-[1.4fr_1fr_0.8fr_0.8fr_0.7fr] lg:items-center"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-neutral-950">
                      {product.name}
                    </h3>

                    {product.isFeatured ? (
                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                        Seçilmiş
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-1 text-sm text-neutral-500">
                    /products/{product.slug}
                  </p>

                  {product.brand ? (
                    <p className="mt-1 text-xs text-neutral-400">
                      Brend: {product.brand}
                    </p>
                  ) : null}
                </div>

                <div className="text-sm text-neutral-700">
                  {product.category}
                </div>

                <div className="text-sm font-medium text-neutral-950">
                  {product.price}
                </div>

                <div className="space-y-1">
                  <span className="inline-flex rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
                    {statusLabel(product.status)}
                  </span>
                  <p className="text-xs text-neutral-500">
                    {stockLabel(product.stockStatus)}
                  </p>
                </div>

                <Link
                  href={`/products/${product.slug}`}
                  target="_blank"
                  className="inline-flex w-fit items-center rounded-full border border-neutral-200 px-3 py-2 text-xs font-medium transition hover:border-neutral-950"
                >
                  Bax
                  <ExternalLink className="ml-2 size-3.5" aria-hidden="true" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-neutral-300 bg-neutral-50 p-10 text-center">
          <h3 className="text-xl font-semibold">Hələ məhsul yoxdur</h3>
          <p className="mt-3 text-neutral-600">
            İlk məhsulu əlavə etmək üçün “Yeni məhsul” düyməsinə kliklə.
          </p>
        </div>
      )}
    </div>
  );
}
import Link from "next/link";
import { ExternalLink, Plus } from "lucide-react";

import { archiveProduct } from "@/app/admin/(protected)/products/actions";
import { getAdminProducts } from "@/services/admin-products";

function statusLabel(status: string) {
  if (status === "active") return "Aktiv";
  if (status === "draft") return "Qaralama";
  if (status === "archived") return "Arxiv";

  return status;
}

function stockLabel(status: string) {
  if (status === "in_stock") {
    return "Stokda var";
  }

  if (status === "out_of_stock") {
    return "Stokda yoxdur";
  }

  if (status === "pre_order") {
    return "Öncədən sifariş";
  }

  return status;
}

function statusClassName(status: string) {
  if (status === "active") {
    return "bg-emerald-50 text-emerald-700";
  }

  if (status === "draft") {
    return "bg-amber-50 text-amber-700";
  }

  return "bg-neutral-100 text-neutral-600";
}

export default async function AdminProductsPage() {
  const products = await getAdminProducts();

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Məhsullar
          </p>

          <h2 className="mt-2 text-3xl font-semibold text-neutral-950">
            Məhsul idarəetməsi
          </h2>

          <p className="mt-2 text-sm text-neutral-500">
            {products.length} məhsul tapıldı
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex min-h-12 items-center justify-center rounded-lg bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          <Plus className="mr-2 size-4" aria-hidden="true" />
          Yeni məhsul
        </Link>
      </div>

      {products.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
          <div className="hidden grid-cols-[1.4fr_1fr_0.8fr_0.8fr_0.9fr] gap-4 bg-neutral-50 px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500 lg:grid">
            <span>Məhsul</span>
            <span>Kateqoriya</span>
            <span>Qiymət</span>
            <span>Status</span>
            <span>Əməliyyat</span>
          </div>

          <div className="divide-y divide-neutral-200">
            {products.map((product) => (
              <div
                key={product.id}
                className="grid gap-4 px-5 py-5 transition hover:bg-neutral-50/70 lg:grid-cols-[1.4fr_1fr_0.8fr_0.8fr_0.9fr] lg:items-center"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-neutral-950">
                      {product.name}
                    </h3>

                    {product.isFeatured ? (
                      <span className="rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                        Seçilmiş
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-1 break-all text-sm text-neutral-500">
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
                  <span
                    className={`inline-flex rounded-md px-3 py-1 text-xs font-medium ${statusClassName(
                      product.status,
                    )}`}
                  >
                    {statusLabel(product.status)}
                  </span>

                  <p className="text-xs text-neutral-500">
                    {stockLabel(product.stockStatus)}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="inline-flex min-h-9 items-center rounded-lg border border-neutral-200 px-3 py-2 text-xs font-medium text-neutral-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    Redaktə et
                  </Link>

                  <Link
                    href={`/products/${product.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-9 items-center rounded-lg border border-neutral-200 px-3 py-2 text-xs font-medium text-neutral-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    Bax
                    <ExternalLink
                      className="ml-2 size-3.5"
                      aria-hidden="true"
                    />
                  </Link>

                  <form action={archiveProduct.bind(null, product.id)}>
                    <button
                      type="submit"
                      className="inline-flex min-h-9 items-center rounded-lg border border-red-200 px-3 py-2 text-xs font-medium text-red-600 transition hover:border-red-500 hover:bg-red-50"
                    >
                      Arxiv
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-10 text-center">
          <h3 className="text-xl font-semibold text-neutral-950">
            Hələ məhsul yoxdur
          </h3>

          <p className="mt-3 text-neutral-600">
            İlk məhsulu əlavə etmək üçün “Yeni məhsul” düyməsinə kliklə.
          </p>
        </div>
      )}
    </div>
  );
}

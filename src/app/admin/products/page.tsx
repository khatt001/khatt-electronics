import Link from "next/link";
import { Plus } from "lucide-react";

export default function AdminProductsPage() {
  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-neutral-400">
            Məhsullar
          </p>
          <h2 className="mt-2 text-3xl font-semibold">Məhsul idarəetməsi</h2>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center rounded-full bg-neutral-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
        >
          <Plus className="mr-2 size-4" aria-hidden="true" />
          Yeni məhsul
        </Link>
      </div>

      <div className="rounded-3xl border border-dashed border-neutral-300 bg-neutral-50 p-10 text-center">
        <h3 className="text-xl font-semibold">Hələ məhsul yoxdur</h3>
        <p className="mt-3 text-neutral-600">
          Database qoşulandan sonra məhsullar burada görünəcək.
        </p>
      </div>
    </div>
  );
}
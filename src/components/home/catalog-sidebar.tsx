import Link from "next/link";
import { ChevronRight, ShoppingBag } from "lucide-react";
import { catalogCategories } from "@/data/home";

export function CatalogSidebar() {
  return (
    <aside className="hidden rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm lg:block">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">
          Məhsul kataloqu
        </h2>
        <ShoppingBag className="size-4 text-neutral-500" aria-hidden="true" />
      </div>

      <nav className="space-y-1" aria-label="Məhsul kataloqu">
        {catalogCategories.map((category) => (
          <Link
            key={category.href}
            href={category.href}
            className="group block rounded-2xl px-3 py-3 transition hover:bg-neutral-100"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-medium text-neutral-900">
                {category.title}
              </span>
              <ChevronRight
                className="size-4 text-neutral-400 transition group-hover:translate-x-1 group-hover:text-neutral-900"
                aria-hidden="true"
              />
            </div>

            <p className="mt-1 line-clamp-1 text-xs text-neutral-500">
              {category.subcategories.join(" · ")}
            </p>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
import Link from "next/link";
import { ChevronRight, ShoppingBag } from "lucide-react";
import { homeTranslations } from "@/data/translations/home";
import { localizedPath, type Locale } from "@/lib/i18n";

type CatalogSidebarProps = {
  locale?: Locale;
};

function getCategorySlugFromHref(href: string) {
  const url = new URL(href, "https://khatt.local");
  return url.searchParams.get("category");
}

export function CatalogSidebar({ locale = "az" }: CatalogSidebarProps) {
  const t = homeTranslations[locale];

  return (
    <aside className="hidden rounded-[2rem] border border-neutral-200 bg-white p-4 shadow-sm lg:block">
      <div className="mb-4 flex items-center justify-between rounded-2xl bg-neutral-950 px-4 py-3 text-white">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em]">
          {t.catalogTitle}
        </h2>
        <ShoppingBag className="size-4 text-emerald-300" aria-hidden="true" />
      </div>

      <nav className="space-y-1" aria-label={t.catalogAriaLabel}>
        {t.catalogCategories.map((category) => {
          const categorySlug = getCategorySlugFromHref(category.href);
          const href = categorySlug
            ? `${localizedPath("/products", locale)}?category=${categorySlug}`
            : localizedPath("/products", locale);

          return (
            <Link
              key={category.title}
              href={href}
              className="group block rounded-2xl border border-transparent px-3 py-3 transition hover:border-neutral-200 hover:bg-neutral-50"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-neutral-950">
                  {category.title}
                </span>
                <ChevronRight
                  className="size-4 text-neutral-400 transition group-hover:translate-x-1 group-hover:text-neutral-950"
                  aria-hidden="true"
                />
              </div>

              <p className="mt-1 line-clamp-1 text-xs leading-5 text-neutral-500">
                {category.subcategories.join(" · ")}
              </p>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

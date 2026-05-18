"use client";

import { Filter, Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";

type FilterOption = {
  id: string;
  name: string;
  slug: string;
};

type ProductsFilterProps = {
  categories: FilterOption[];
  brands: FilterOption[];
  initialQuery: {
    search?: string;
    category?: string;
    brand?: string;
    stock?: string;
    sort?: string;
  };
  hasActiveFilters: boolean;
};

function cleanValue(value: string | null | undefined) {
  return value?.trim() || "";
}

export function ProductsFilter({
  categories,
  brands,
  initialQuery,
  hasActiveFilters,
}: ProductsFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const [search, setSearch] = useState(initialQuery.search ?? "");

  const currentQuery = useMemo(
    () => ({
      search: cleanValue(searchParams.get("search")),
      category: cleanValue(searchParams.get("category")),
      brand: cleanValue(searchParams.get("brand")),
      stock: cleanValue(searchParams.get("stock")),
      sort: cleanValue(searchParams.get("sort")),
    }),
    [searchParams]
  );

  function buildUrl(nextQuery: typeof currentQuery) {
    const params = new URLSearchParams();

    Object.entries(nextQuery).forEach(([key, value]) => {
      if (!value) return;
      params.set(key, value);
    });

    const queryString = params.toString();

    return queryString ? `${pathname}?${queryString}` : pathname;
  }

  function updateQuery(key: keyof typeof currentQuery, value: string) {
    const nextQuery = {
      ...currentQuery,
      search,
      [key]: value,
    };

    startTransition(() => {
      router.replace(buildUrl(nextQuery), { scroll: false });
    });
  }

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const nextQuery = {
        ...currentQuery,
        search: search.trim(),
      };

      startTransition(() => {
        router.replace(buildUrl(nextQuery), { scroll: false });
      });
    }, 350);

    return () => window.clearTimeout(timeout);
  }, [search]);

  return (
    <form
      action="/products"
      className="mb-6 rounded-[2rem] border border-neutral-200 bg-white p-5 shadow-sm lg:p-6"
    >
      <div className="mb-5 flex flex-col gap-3 border-b border-neutral-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-full bg-neutral-950 text-white">
              <Filter className="size-4" aria-hidden="true" />
            </span>
            <h2 className="text-lg font-semibold text-neutral-950">
              Məhsul filterləri
            </h2>
          </div>
          <p className="mt-2 text-sm text-neutral-500">
            Axtardıqca məhsullar avtomatik yenilənir.
          </p>
        </div>

        {hasActiveFilters ? (
          <Link
            href="/products"
            className="w-fit rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:border-neutral-950 hover:text-neutral-950"
          >
            Hamısını təmizlə
          </Link>
        ) : null}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
        <label className="relative block">
          <span className="sr-only">Məhsul axtar</span>
          <Search
            className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-neutral-400"
            aria-hidden="true"
          />
          <input
            type="search"
            name="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Məhsul axtar..."
            className="h-12 w-full rounded-2xl border border-neutral-200 pl-11 pr-4 text-sm outline-none transition focus:border-neutral-950"
          />
        </label>

        <select
          name="category"
          value={currentQuery.category}
          onChange={(event) => updateQuery("category", event.target.value)}
          className="h-12 rounded-2xl border border-neutral-200 bg-white px-4 text-sm outline-none transition focus:border-neutral-950"
        >
          <option value="">Bütün kateqoriyalar</option>
          {categories.map((category) => (
            <option key={category.id} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          name="brand"
          value={currentQuery.brand}
          onChange={(event) => updateQuery("brand", event.target.value)}
          className="h-12 rounded-2xl border border-neutral-200 bg-white px-4 text-sm outline-none transition focus:border-neutral-950"
        >
          <option value="">Bütün brendlər</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.slug}>
              {brand.name}
            </option>
          ))}
        </select>

        <select
          name="stock"
          value={currentQuery.stock}
          onChange={(event) => updateQuery("stock", event.target.value)}
          className="h-12 rounded-2xl border border-neutral-200 bg-white px-4 text-sm outline-none transition focus:border-neutral-950"
        >
          <option value="">Bütün stoklar</option>
          <option value="in_stock">Stokda var</option>
          <option value="out_of_stock">Stokda yoxdur</option>
          <option value="pre_order">Öncədən sifariş</option>
        </select>

        <select
          name="sort"
          value={currentQuery.sort}
          onChange={(event) => updateQuery("sort", event.target.value)}
          className="h-12 rounded-2xl border border-neutral-200 bg-white px-4 text-sm outline-none transition focus:border-neutral-950"
        >
          <option value="">Ən yeni</option>
          <option value="oldest">Ən köhnə</option>
          <option value="featured">Seçilmişlər əvvəl</option>
          <option value="price_asc">Qiymət: ucuzdan bahaya</option>
          <option value="price_desc">Qiymət: bahadan ucuza</option>
        </select>
      </div>
    </form>
  );
}
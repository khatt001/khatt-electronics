"use client";

import { Filter, Search, SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import { cn } from "@/lib/utils";

type FilterOption = {
  id: string;
  name: string;
  slug: string;
};

type DynamicFilterOption = {
  value: string;
  label: string;
  count: number;
};

type DynamicFilterGroup = {
  key: string;
  label: string;
  type: "brand" | "stock" | "spec";
  options: DynamicFilterOption[];
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
  categoryMode?: "query" | "route";
};

function cleanValue(value: string | null | undefined) {
  return value?.trim() || "";
}

function getSpecParamKey(key: string) {
  return `spec_${key}`;
}

function getSelectedValues(searchParams: URLSearchParams, key: string) {
  return searchParams.getAll(key).filter(Boolean);
}

function createParamsFromCurrent(searchParams: URLSearchParams) {
  return new URLSearchParams(searchParams.toString());
}

export function ProductsFilter({
  categories,
  brands,
  initialQuery,
  hasActiveFilters,
  categoryMode = "query",
}: ProductsFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const [search, setSearch] = useState(initialQuery.search ?? "");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dynamicGroups, setDynamicGroups] = useState<DynamicFilterGroup[]>([]);
  const [loadingFilters, setLoadingFilters] = useState(false);

  const currentCategory =
    categoryMode === "route"
      ? cleanValue(initialQuery.category)
      : cleanValue(searchParams.get("category"));

  const currentSort = cleanValue(searchParams.get("sort"));

  const clearHref =
    categoryMode === "route" && currentCategory
      ? `/category/${currentCategory}`
      : "/products";

  const activeFilterCount = useMemo(() => {
    let count = 0;

    searchParams.forEach((value, key) => {
      if (!value) return;
      if (key === "sort") return;
      if (categoryMode === "route" && key === "category") return;
      count += 1;
    });

    return count;
  }, [searchParams, categoryMode]);

  function replaceWithParams(params: URLSearchParams) {
    if (categoryMode === "route") {
      params.delete("category");
    }

    const queryString = params.toString();

    startTransition(() => {
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    });
  }

  function setSingleParam(key: string, value: string) {
    const params = createParamsFromCurrent(searchParams);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    replaceWithParams(params);
  }

  function changeCategory(value: string) {
    if (categoryMode === "route") {
      startTransition(() => {
        router.replace(value ? `/category/${value}` : "/products", {
          scroll: false,
        });
      });

      return;
    }

    setSingleParam("category", value);
  }

  function toggleMultiParam(key: string, value: string) {
    const params = createParamsFromCurrent(searchParams);
    const values = params.getAll(key);
    const exists = values.includes(value);

    params.delete(key);

    const nextValues = exists
      ? values.filter((item) => item !== value)
      : [...values, value];

    nextValues.forEach((item) => params.append(key, item));

    replaceWithParams(params);
  }

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const params = createParamsFromCurrent(searchParams);
      const cleanSearch = search.trim();

      if (cleanSearch) {
        params.set("search", cleanSearch);
      } else {
        params.delete("search");
      }

      replaceWithParams(params);
    }, 350);

    return () => window.clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    async function loadDynamicFilters() {
      try {
        setLoadingFilters(true);

        const params = new URLSearchParams();

        if (currentCategory) {
          params.set("category", currentCategory);
        }

        const response = await fetch(
          params.toString() ? `/api/filters?${params}` : "/api/filters"
        );

        const result = (await response.json()) as {
          groups?: DynamicFilterGroup[];
        };

        setDynamicGroups(result.groups ?? []);
      } catch {
        setDynamicGroups([]);
      } finally {
        setLoadingFilters(false);
      }
    }

    void loadDynamicFilters();
  }, [currentCategory]);

  const visibleDynamicGroups = useMemo(() => {
    return dynamicGroups.filter((group) => {
      if (group.type === "brand") return false;
      if (group.type === "stock") return false;
      return group.options.length > 0;
    });
  }, [dynamicGroups]);

  const brandGroup = dynamicGroups.find((group) => group.type === "brand");
  const stockGroup = dynamicGroups.find((group) => group.type === "stock");

  const filterPanel = (
    <div className="space-y-8">
      <div>
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
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-neutral-950">
          Kateqoriya
        </h3>

        <select
          name="category"
          value={currentCategory}
          onChange={(event) => changeCategory(event.target.value)}
          className="h-12 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm outline-none transition focus:border-neutral-950"
        >
          <option value="">Bütün kateqoriyalar</option>
          {categories.map((category) => (
            <option key={category.id} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-neutral-950">Brand</h3>

        <div className="space-y-2">
          {brands.map((brand) => {
            const dynamicBrand = brandGroup?.options.find(
              (option) =>
                option.label.toLowerCase() === brand.name.toLowerCase()
            );

            const selected = getSelectedValues(searchParams, "brand").includes(
              brand.slug
            );

            return (
              <label
                key={brand.id}
                className="flex cursor-pointer items-center gap-3 text-sm text-neutral-700"
              >
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => toggleMultiParam("brand", brand.slug)}
                  className="size-4 rounded border-neutral-300 text-neutral-950"
                />

                <span className="min-w-0 flex-1">{brand.name}</span>

                {dynamicBrand ? (
                  <span className="text-xs text-neutral-400">
                    ({dynamicBrand.count})
                  </span>
                ) : null}
              </label>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-neutral-950">
          Stok vəziyyəti
        </h3>

        <div className="space-y-2">
          {(stockGroup?.options ?? [
            { value: "Stokda var", label: "Stokda var", count: 0 },
            { value: "Stokda yoxdur", label: "Stokda yoxdur", count: 0 },
            { value: "Öncədən sifariş", label: "Öncədən sifariş", count: 0 },
          ]).map((option) => {
            const selected = getSelectedValues(searchParams, "stock").includes(
              option.value
            );

            return (
              <label
                key={option.value}
                className="flex cursor-pointer items-center gap-3 text-sm text-neutral-700"
              >
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => toggleMultiParam("stock", option.value)}
                  className="size-4 rounded border-neutral-300 text-neutral-950"
                />
                <span className="min-w-0 flex-1">{option.label}</span>
                {option.count ? (
                  <span className="text-xs text-neutral-400">
                    ({option.count})
                  </span>
                ) : null}
              </label>
            );
          })}
        </div>
      </div>

      {loadingFilters ? (
        <div className="rounded-2xl bg-neutral-50 p-4 text-sm text-neutral-500">
          Filterlər yüklənir...
        </div>
      ) : null}

      {visibleDynamicGroups.map((group) => {
        const paramKey = getSpecParamKey(group.key);

        return (
          <div key={group.key}>
            <h3 className="mb-3 text-sm font-semibold text-neutral-950">
              {group.label}
            </h3>

            <div className="space-y-2">
              {group.options.map((option) => {
                const selected = getSelectedValues(
                  searchParams,
                  paramKey
                ).includes(option.value);

                return (
                  <label
                    key={option.value}
                    className="flex cursor-pointer items-center gap-3 text-sm text-neutral-700"
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => toggleMultiParam(paramKey, option.value)}
                      className="size-4 rounded border-neutral-300 text-neutral-950"
                    />
                    <span className="min-w-0 flex-1">{option.label}</span>
                    <span className="text-xs text-neutral-400">
                      ({option.count})
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      <div className="mb-5 flex items-center justify-between gap-3 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="inline-flex items-center rounded-full bg-neutral-950 px-5 py-3 text-sm font-semibold text-white"
        >
          <SlidersHorizontal className="mr-2 size-4" aria-hidden="true" />
          Filter
          {activeFilterCount > 0 ? (
            <span className="ml-2 rounded-full bg-white px-2 py-0.5 text-xs text-neutral-950">
              {activeFilterCount}
            </span>
          ) : null}
        </button>

        <select
          name="sort"
          value={currentSort}
          onChange={(event) => setSingleParam("sort", event.target.value)}
          className="h-11 rounded-full border border-neutral-200 bg-white px-4 text-sm outline-none"
        >
          <option value="">Ən yeni</option>
          <option value="oldest">Ən köhnə</option>
          <option value="featured">Seçilmişlər əvvəl</option>
          <option value="price_asc">Qiymət: ucuzdan bahaya</option>
          <option value="price_desc">Qiymət: bahadan ucuza</option>
        </select>
      </div>

      <div className="mb-6 hidden rounded-[2rem] border border-neutral-200 bg-white p-5 shadow-sm lg:block">
        <div className="mb-5 flex flex-col gap-4 border-b border-neutral-100 pb-5">
          <div className="flex items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-full bg-neutral-950 text-white">
              <Filter className="size-4" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-lg font-semibold text-neutral-950">
                Məhsul filterləri
              </h2>
              <p className="text-sm text-neutral-500">
                Kateqoriyaya görə filterlər avtomatik dəyişir.
              </p>
            </div>
          </div>

          <div className="grid gap-3">
            <select
              name="sort"
              value={currentSort}
              onChange={(event) => setSingleParam("sort", event.target.value)}
              className="h-11 w-full rounded-full border border-neutral-200 bg-white px-4 text-sm outline-none transition focus:border-neutral-950"
            >
              <option value="">Ən yeni</option>
              <option value="oldest">Ən köhnə</option>
              <option value="featured">Seçilmişlər əvvəl</option>
              <option value="price_asc">Qiymət: ucuzdan bahaya</option>
              <option value="price_desc">Qiymət: bahadan ucuza</option>
            </select>

            {hasActiveFilters ? (
              <Link
                href={clearHref}
                className="inline-flex w-full justify-center rounded-full border border-neutral-200 px-4 py-2.5 text-sm font-medium text-neutral-700 transition hover:border-neutral-950 hover:text-neutral-950"
              >
                Hamısını təmizlə
              </Link>
            ) : null}
          </div>
        </div>

        {filterPanel}
      </div>

      <div
        className={cn(
          "fixed inset-0 z-[100] bg-black/40 transition lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <div
          className={cn(
            "absolute right-0 top-0 h-full w-[min(92vw,420px)] overflow-y-auto bg-white p-5 shadow-2xl transition-transform",
            mobileOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="mb-5 flex items-center justify-between border-b border-neutral-100 pb-4">
            <div>
              <h2 className="text-lg font-semibold text-neutral-950">
                Filterlər
              </h2>
              <p className="text-sm text-neutral-500">
                Məhsulları dəqiqləşdirin.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Filteri bağla"
              className="inline-flex size-10 items-center justify-center rounded-full hover:bg-neutral-100"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          {filterPanel}

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="mt-8 h-12 w-full rounded-full bg-neutral-950 text-sm font-semibold text-white"
          >
            Nəticələri göstər
          </button>
        </div>
      </div>
    </>
  );
}
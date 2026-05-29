"use client";

import { Filter, Search, SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import { cn } from "@/lib/utils";
import {
  productsFilterTranslations,
  type ProductsFilterLocale,
} from "@/data/translations/products-filter";
import { localizedPath } from "@/lib/i18n";

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
    brand?: string | string[];
    stock?: string | string[];
    sort?: string;
  };
  hasActiveFilters: boolean;
  categoryMode?: "query" | "route";
  locale?: ProductsFilterLocale;
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

function getStockValue(value: string) {
  if (value === "Stokda var" || value === "In stock" || value === "В наличии") {
    return "in_stock";
  }

  if (
    value === "Stokda yoxdur" ||
    value === "Out of stock" ||
    value === "Нет в наличии"
  ) {
    return "out_of_stock";
  }

  if (
    value === "Öncədən sifariş" ||
    value === "Pre-order" ||
    value === "Предзаказ"
  ) {
    return "pre_order";
  }

  return value;
}

function translateStockLabel(label: string, locale: ProductsFilterLocale) {
  const t = productsFilterTranslations[locale];
  const value = getStockValue(label);

  if (value === "in_stock") return t.stockIn;
  if (value === "out_of_stock") return t.stockOut;
  if (value === "pre_order") return t.stockPreOrder;

  return label;
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-neutral-200 bg-white p-4">
      <h3 className="mb-3 text-sm font-semibold text-neutral-950">{title}</h3>
      {children}
    </section>
  );
}

function CheckboxRow({
  label,
  count,
  checked,
  onChange,
}: {
  label: string;
  count?: number | null;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      className={cn(
        "group flex cursor-pointer items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition",
        checked ? "bg-neutral-950 text-white" : "text-neutral-700 hover:bg-neutral-100"
      )}
    >
      <span
        className={cn(
          "flex size-4 items-center justify-center rounded border transition",
          checked
            ? "border-white bg-white"
            : "border-neutral-300 bg-white group-hover:border-neutral-500"
        )}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />

        {checked ? <span className="size-2 rounded-sm bg-neutral-950" /> : null}
      </span>

      <span className="min-w-0 flex-1 truncate">{label}</span>

      {typeof count === "number" && count > 0 ? (
        <span className={cn("text-xs", checked ? "text-white/60" : "text-neutral-400")}>
          {count}
        </span>
      ) : null}
    </label>
  );
}

export function ProductsFilter({
  categories,
  brands,
  initialQuery,
  hasActiveFilters,
  categoryMode = "query",
  locale = "az",
}: ProductsFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const t = productsFilterTranslations[locale];

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
      ? localizedPath(`/category/${currentCategory}`, locale)
      : localizedPath("/products", locale);

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
        router.replace(
          value
            ? localizedPath(`/category/${value}`, locale)
            : localizedPath("/products", locale),
          {
            scroll: false,
          }
        );
      });

      return;
    }

    setSingleParam("category", value);
  }

  function toggleMultiParam(key: string, value: string) {
    const params = createParamsFromCurrent(searchParams);
    const cleanOptionValue = key === "stock" ? getStockValue(value) : value;
    const values = params.getAll(key);
    const exists = values.includes(cleanOptionValue);

    params.delete(key);

    const nextValues = exists
      ? values.filter((item) => item !== cleanOptionValue)
      : [...values, cleanOptionValue];

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
        params.set("locale", locale);

        if (currentCategory) {
          params.set("category", currentCategory);
        }

        const response = await fetch(`/api/filters?${params.toString()}`);

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
  }, [currentCategory, locale]);

  const visibleDynamicGroups = useMemo(() => {
    return dynamicGroups.filter((group) => {
      if (group.type === "brand") return false;
      if (group.type === "stock") return false;
      return group.options.length > 0;
    });
  }, [dynamicGroups]);

  const brandGroup = dynamicGroups.find((group) => group.type === "brand");
  const stockGroup = dynamicGroups.find((group) => group.type === "stock");

  const stockOptions = stockGroup?.options ?? [
    { value: "in_stock", label: t.stockIn, count: 0 },
    { value: "out_of_stock", label: t.stockOut, count: 0 },
    { value: "pre_order", label: t.stockPreOrder, count: 0 },
  ];

  const filterPanel = (
    <div className="space-y-4">
      <FilterSection title={t.searchTitle}>
        <label className="relative block">
          <span className="sr-only">{t.searchSrLabel}</span>
          <Search
            className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-neutral-400"
            aria-hidden="true"
          />

          <input
            type="search"
            name="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t.searchPlaceholder}
            className="h-12 w-full rounded-2xl border border-neutral-200 bg-neutral-50 pl-11 pr-4 text-sm outline-none transition focus:border-neutral-950 focus:bg-white"
          />
        </label>
      </FilterSection>

      <FilterSection title={t.categoryTitle}>
        <select
          name="category"
          value={currentCategory}
          onChange={(event) => changeCategory(event.target.value)}
          className="h-12 w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 text-sm outline-none transition focus:border-neutral-950 focus:bg-white"
        >
          <option value="">{t.allCategories}</option>
          {categories.map((category) => (
            <option key={category.id} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
      </FilterSection>

      <FilterSection title={t.brandTitle}>
        <div className="max-h-64 space-y-1 overflow-y-auto pr-1">
          {brands.map((brand) => {
            const dynamicBrand = brandGroup?.options.find(
              (option) => option.label.toLowerCase() === brand.name.toLowerCase()
            );

            const selected = getSelectedValues(searchParams, "brand").includes(brand.slug);

            return (
              <CheckboxRow
                key={brand.id}
                label={brand.name}
                count={dynamicBrand?.count}
                checked={selected}
                onChange={() => toggleMultiParam("brand", brand.slug)}
              />
            );
          })}
        </div>
      </FilterSection>

      <FilterSection title={t.stockTitle}>
        <div className="space-y-1">
          {stockOptions.map((option) => {
            const optionValue = getStockValue(option.value);
            const selected = getSelectedValues(searchParams, "stock").includes(optionValue);

            return (
              <CheckboxRow
                key={optionValue}
                label={translateStockLabel(option.label, locale)}
                count={option.count}
                checked={selected}
                onChange={() => toggleMultiParam("stock", optionValue)}
              />
            );
          })}
        </div>
      </FilterSection>

      {loadingFilters ? (
        <div className="rounded-3xl border border-neutral-200 bg-white p-4 text-sm text-neutral-500">
          {t.loadingFilters}
        </div>
      ) : null}

      {visibleDynamicGroups.map((group) => {
        const paramKey = getSpecParamKey(group.key);

        return (
          <FilterSection key={group.key} title={group.label}>
            <div className="max-h-64 space-y-1 overflow-y-auto pr-1">
              {group.options.map((option) => {
                const selected = getSelectedValues(searchParams, paramKey).includes(
                  option.value
                );

                return (
                  <CheckboxRow
                    key={option.value}
                    label={option.label}
                    count={option.count}
                    checked={selected}
                    onChange={() => toggleMultiParam(paramKey, option.value)}
                  />
                );
              })}
            </div>
          </FilterSection>
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
          {t.mobileFilterButton}
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
          <option value="">{t.sortNewest}</option>
          <option value="oldest">{t.sortOldest}</option>
          <option value="featured">{t.sortFeatured}</option>
          <option value="price_asc">{t.sortPriceAsc}</option>
          <option value="price_desc">{t.sortPriceDesc}</option>
        </select>
      </div>

      <div className="hidden lg:sticky lg:top-36 lg:block">
        <div className="mb-4 rounded-[2rem] border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center gap-3 border-b border-neutral-100 pb-5">
            <span className="inline-flex size-10 items-center justify-center rounded-full bg-neutral-950 text-white">
              <Filter className="size-4" aria-hidden="true" />
            </span>

            <div>
              <h2 className="text-lg font-semibold text-neutral-950">
                {t.filtersTitle}
              </h2>
              <p className="text-sm text-neutral-500">{t.filtersDescription}</p>
            </div>
          </div>

          <div className="grid gap-3">
            <select
              name="sort"
              value={currentSort}
              onChange={(event) => setSingleParam("sort", event.target.value)}
              className="h-11 w-full rounded-full border border-neutral-200 bg-neutral-50 px-4 text-sm outline-none transition focus:border-neutral-950 focus:bg-white"
            >
              <option value="">{t.sortNewest}</option>
              <option value="oldest">{t.sortOldest}</option>
              <option value="featured">{t.sortFeatured}</option>
              <option value="price_asc">{t.sortPriceAsc}</option>
              <option value="price_desc">{t.sortPriceDesc}</option>
            </select>

            {hasActiveFilters ? (
              <Link
                href={clearHref}
                className="inline-flex w-full justify-center rounded-full border border-neutral-200 px-4 py-2.5 text-sm font-semibold text-neutral-700 transition hover:border-neutral-950 hover:text-neutral-950"
              >
                {t.clearAll}
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
            "absolute right-0 top-0 h-full w-[min(92vw,430px)] overflow-y-auto bg-[#f6f6f4] p-5 shadow-2xl transition-transform",
            mobileOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="mb-5 flex items-center justify-between rounded-3xl border border-neutral-200 bg-white p-4">
            <div>
              <h2 className="text-lg font-semibold text-neutral-950">
                {t.filtersTitle}
              </h2>
              <p className="text-sm text-neutral-500">{t.filtersDescription}</p>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="inline-flex size-10 items-center justify-center rounded-full border border-neutral-200"
            >
              <X className="size-4" aria-hidden="true" />
              <span className="sr-only">Close filters</span>
            </button>
          </div>

          <div className="mb-4 rounded-3xl border border-neutral-200 bg-white p-4">
            <select
              name="sort"
              value={currentSort}
              onChange={(event) => setSingleParam("sort", event.target.value)}
              className="h-12 w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 text-sm outline-none"
            >
              <option value="">{t.sortNewest}</option>
              <option value="oldest">{t.sortOldest}</option>
              <option value="featured">{t.sortFeatured}</option>
              <option value="price_asc">{t.sortPriceAsc}</option>
              <option value="price_desc">{t.sortPriceDesc}</option>
            </select>

            {hasActiveFilters ? (
              <Link
                href={clearHref}
                className="mt-3 inline-flex w-full justify-center rounded-full border border-neutral-200 px-4 py-2.5 text-sm font-semibold text-neutral-700"
                onClick={() => setMobileOpen(false)}
              >
                {t.clearAll}
              </Link>
            ) : null}
          </div>

          {filterPanel}
        </div>
      </div>
    </>
  );
}
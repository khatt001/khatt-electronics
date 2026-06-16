"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { localizedPath, type Locale } from "@/lib/i18n";

type NavbarSearchProduct = {
  id: string;
  name: string;
  href: string;
  category: string;
  brand: string | null;
  imageUrl: string | null;
  price: string;
};

type NavbarSearchProps = {
  placeholder?: string;
  onNavigate?: () => void;
  locale?: Locale;
};

const navbarSearchTranslations = {
  az: {
    placeholder: "Məhsul, model və ya kateqoriya axtar...",
    srLabel: "Məhsul axtarışı",
    clearAria: "Axtarışı təmizlə",
    resultsTitle: "Axtarış nəticələri",
    loading: "Axtarılır...",
    empty: "Bu axtarışa uyğun məhsul tapılmadı.",
    viewAll: "Bütün nəticələrə bax",
  },
  en: {
    placeholder: "Search product, model or category...",
    srLabel: "Product search",
    clearAria: "Clear search",
    resultsTitle: "Search results",
    loading: "Searching...",
    empty: "No products found for this search.",
    viewAll: "View all results",
  },
  ru: {
    placeholder: "Поиск товара, модели или категории...",
    srLabel: "Поиск товара",
    clearAria: "Очистить поиск",
    resultsTitle: "Результаты поиска",
    loading: "Поиск...",
    empty: "По этому запросу товары не найдены.",
    viewAll: "Смотреть все результаты",
  },
} as const;

export function NavbarSearch({
  placeholder,
  onNavigate,
  locale = "az",
}: NavbarSearchProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<NavbarSearchProduct[]>([]);

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const t = navbarSearchTranslations[locale];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const cleanQuery = query.trim();

    if (cleanQuery.length < 2) {
      const timeoutId = window.setTimeout(() => {
        setProducts([]);
        setIsLoading(false);
        setIsOpen(false);
      }, 0);

      return () => {
        window.clearTimeout(timeoutId);
      };
    }

    const controller = new AbortController();

    const timeout = window.setTimeout(async () => {
      try {
        setIsLoading(true);

        const response = await fetch(
          `/api/search/products?q=${encodeURIComponent(
            cleanQuery,
          )}&locale=${locale}`,
          {
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error("Search request failed");
        }

        const result = (await response.json()) as {
          products?: NavbarSearchProduct[];
        };

        setProducts(result.products ?? []);
        setIsOpen(true);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setProducts([]);
        setIsOpen(true);
      } finally {
        setIsLoading(false);
      }
    }, 250);

    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [query, locale]);

  function closeSearch() {
    setIsOpen(false);
    setQuery("");
    setProducts([]);
  }

  const cleanQuery = query.trim();

  const effectivePlaceholder = placeholder ?? t.placeholder;

  return (
    <div ref={wrapperRef} className="relative">
      <label className="relative block">
        <span className="sr-only">{t.srLabel}</span>

        <Search
          className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-neutral-400"
          aria-hidden="true"
        />

        <input
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            if (cleanQuery.length >= 2) {
              setIsOpen(true);
            }
          }}
          placeholder={effectivePlaceholder}
          autoComplete="off"
          className="h-11 w-full rounded-lg border border-neutral-300 bg-neutral-50 pl-11 pr-11 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/10"
        />

        {query ? (
          <button
            type="button"
            onClick={closeSearch}
            aria-label={t.clearAria}
            className="absolute right-3 top-1/2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-950"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        ) : null}
      </label>

      {isOpen && cleanQuery.length >= 2 ? (
        <div className="absolute left-0 right-0 top-[calc(100%+0.75rem)] z-50 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl shadow-black/10">
          <div className="border-b border-neutral-100 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              {t.resultsTitle}
            </p>
          </div>

          {isLoading ? (
            <div className="p-4 text-sm text-neutral-500">{t.loading}</div>
          ) : products.length > 0 ? (
            <div className="max-h-[420px] overflow-y-auto p-2">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={localizedPath(product.href, locale)}
                  onClick={() => {
                    closeSearch();
                    onNavigate?.();
                  }}
                  className="flex gap-3 rounded-xl p-3 transition hover:bg-emerald-50"
                >
                  <div className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-neutral-100">
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        sizes="64px"
                        className="object-contain p-2"
                      />
                    ) : (
                      <ShoppingBag
                        className="size-6 text-neutral-500"
                        aria-hidden="true"
                      />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap gap-1">
                      <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-[11px] text-neutral-500">
                        {product.category}
                      </span>

                      {product.brand ? (
                        <span className="rounded-md bg-neutral-950 px-2 py-0.5 text-[11px] text-white">
                          {product.brand}
                        </span>
                      ) : null}
                    </div>

                    <p className="mt-1 line-clamp-2 text-sm font-semibold leading-5 text-neutral-950">
                      {product.name}
                    </p>

                    <p className="mt-1 text-xs font-medium text-neutral-500">
                      {product.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-5 text-sm text-neutral-500">{t.empty}</div>
          )}

          <div className="border-t border-neutral-100 p-3">
            <Link
              href={`${localizedPath(
                "/products",
                locale,
              )}?search=${encodeURIComponent(cleanQuery)}`}
              onClick={() => {
                closeSearch();
                onNavigate?.();
              }}
              className="flex min-h-11 items-center justify-center rounded-lg bg-neutral-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
            >
              {t.viewAll}
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}

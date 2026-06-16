"use client";

import Link from "next/link";
import {
  ArrowRight,
  Camera,
  ChevronRight,
  Grid3X3,
  PackageSearch,
  ShieldCheck,
  ShoppingBag,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { localizedPath } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type CatalogCategory = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
};

type CatalogDropdownLocale = "az" | "en" | "ru";

type CatalogDropdownProps = {
  onNavigate?: () => void;
  variant?: "desktop" | "mobile";
  locale?: CatalogDropdownLocale;
};

const catalogDropdownTranslations = {
  az: {
    catalog: "Kataloq",
    eyebrow: "Məhsul kataloqu",
    title: "Kateqoriyalar",
    closeAria: "Kataloqu bağla",
    loading: "Kateqoriyalar yüklənir...",
    empty: "Aktiv kateqoriya tapılmadı.",
    categoryFallback: "Bu kateqoriyadakı məhsullara bax",
    ctaTitle: "Layihənizə uyğun məhsul seçin",
    ctaDescription:
      "Kamera, PoE switch, access control və digər avadanlıqları kateqoriyalar üzrə rahat seçə bilərsiniz.",
    productsLink: "Məhsullara bax",
    allProducts: "Bütün məhsullar",
    trackOrder: "Sifariş izləmə",
  },
  en: {
    catalog: "Catalog",
    eyebrow: "Product catalog",
    title: "Categories",
    closeAria: "Close catalog",
    loading: "Loading categories...",
    empty: "No active categories found.",
    categoryFallback: "View products in this category",
    ctaTitle: "Choose products for your project",
    ctaDescription:
      "Easily browse cameras, PoE switches, access control and other equipment by categories.",
    productsLink: "View products",
    allProducts: "All products",
    trackOrder: "Track order",
  },
  ru: {
    catalog: "Каталог",
    eyebrow: "Каталог товаров",
    title: "Категории",
    closeAria: "Закрыть каталог",
    loading: "Категории загружаются...",
    empty: "Активные категории не найдены.",
    categoryFallback: "Смотреть товары в этой категории",
    ctaTitle: "Выберите товары для вашего проекта",
    ctaDescription:
      "Удобно выбирайте камеры, PoE switch, access control и другое оборудование по категориям.",
    productsLink: "Смотреть товары",
    allProducts: "Все товары",
    trackOrder: "Отследить заказ",
  },
} as const;

export function CatalogDropdown({
  onNavigate,
  variant = "desktop",
  locale = "az",
}: CatalogDropdownProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const requestedLocaleRef = useRef<CatalogDropdownLocale | null>(null);

  const [open, setOpen] = useState(false);

  const [categories, setCategories] = useState<CatalogCategory[]>([]);

  const [loading, setLoading] = useState(true);

  const isMobile = variant === "mobile";
  const t = catalogDropdownTranslations[locale];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (isMobile) return;

      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("mousedown", handleClickOutside);

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);

      window.removeEventListener("keydown", handleEscape);
    };
  }, [isMobile]);

  useEffect(() => {
    const controller = new AbortController();

    async function preloadCategories() {
      if (requestedLocaleRef.current === locale && categories.length > 0) {
        return;
      }

      try {
        requestedLocaleRef.current = locale;
        setLoading(true);

        const response = await fetch(
          `/api/catalog/categories?locale=${locale}`,
          {
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error("Failed to load catalog categories");
        }

        const result = (await response.json()) as {
          categories?: CatalogCategory[];
        };

        setCategories(result.categories ?? []);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setCategories([]);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void preloadCategories();

    return () => controller.abort();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  function closeDropdown() {
    setOpen(false);
    onNavigate?.();
  }

  return (
    <div
      ref={wrapperRef}
      className={cn("relative", isMobile ? "w-full" : "w-auto")}
    >
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        className={cn(
          "inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-neutral-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700",
          isMobile ? "w-full" : "w-auto",
        )}
      >
        <PackageSearch className="size-4" aria-hidden="true" />

        {t.catalog}
      </button>

      {open ? (
        <div
          className={cn(
            "z-[80] overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl shadow-black/15",
            isMobile
              ? "mt-3 w-full"
              : "absolute left-0 top-[calc(100%+0.75rem)] w-[min(calc(100vw-2rem),760px)] lg:w-[760px]",
          )}
        >
          <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                {t.eyebrow}
              </p>

              <h3 className="mt-1 text-lg font-semibold text-neutral-950">
                {t.title}
              </h3>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.closeAria}
              className="inline-flex size-9 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-red-50 hover:text-red-600"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid gap-0 lg:grid-cols-[1fr_280px]">
            <div
              className={cn(
                "overflow-y-auto p-3",
                isMobile ? "max-h-[320px]" : "max-h-[420px]",
              )}
            >
              {loading ? (
                <div className="grid gap-2">
                  {Array.from({
                    length: 5,
                  }).map((_, index) => (
                    <div
                      key={index}
                      className="flex animate-pulse items-center gap-3 rounded-xl border border-transparent p-3"
                    >
                      <div className="size-11 shrink-0 rounded-xl bg-neutral-200" />

                      <div className="min-w-0 flex-1">
                        <div className="h-4 w-2/3 rounded bg-neutral-200" />
                        <div className="mt-2 h-3 w-full rounded bg-neutral-100" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : categories.length > 0 ? (
                <div className="grid gap-2">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={localizedPath(`/category/${category.slug}`, locale)}
                      onClick={closeDropdown}
                      className="group flex items-center gap-3 rounded-xl border border-transparent p-3 transition hover:border-emerald-200 hover:bg-emerald-50"
                    >
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-neutral-950 text-white transition group-hover:bg-emerald-700">
                        <Grid3X3 className="size-5" aria-hidden="true" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-neutral-950">
                          {category.name}
                        </p>

                        <p className="mt-1 line-clamp-1 text-xs text-neutral-500">
                          {category.description ?? t.categoryFallback}
                        </p>
                      </div>

                      <ChevronRight
                        className="size-4 shrink-0 text-neutral-400 transition group-hover:translate-x-0.5 group-hover:text-emerald-700"
                        aria-hidden="true"
                      />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl bg-neutral-50 p-5 text-sm text-neutral-500">
                  {t.empty}
                </div>
              )}
            </div>

            <div className="border-t border-neutral-100 bg-neutral-50 p-4 lg:border-l lg:border-t-0">
              <div className="rounded-2xl bg-neutral-950 p-5 text-white">
                <ShieldCheck
                  className="size-7 text-emerald-400"
                  aria-hidden="true"
                />

                <h4 className="mt-4 text-lg font-semibold">{t.ctaTitle}</h4>

                <p className="mt-2 text-sm leading-6 text-white/65">
                  {t.ctaDescription}
                </p>

                <Link
                  href={localizedPath("/products", locale)}
                  onClick={closeDropdown}
                  className="mt-5 inline-flex items-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-neutral-950 transition hover:bg-emerald-50 hover:text-emerald-700"
                >
                  {t.productsLink}

                  <ArrowRight className="ml-2 size-4" aria-hidden="true" />
                </Link>
              </div>

              <Link
                href={localizedPath("/products", locale)}
                onClick={closeDropdown}
                className="mt-3 flex items-center justify-between rounded-xl border border-neutral-200 bg-white p-4 text-sm font-semibold text-neutral-950 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
              >
                {t.allProducts}

                <Camera className="size-4" aria-hidden="true" />
              </Link>

              <Link
                href={localizedPath("/track-order", locale)}
                onClick={closeDropdown}
                className="mt-3 flex items-center justify-between rounded-xl border border-neutral-200 bg-white p-4 text-sm font-semibold text-neutral-950 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
              >
                {t.trackOrder}

                <ShoppingBag className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

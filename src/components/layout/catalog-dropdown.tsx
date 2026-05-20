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

function withLocalePath(locale: CatalogDropdownLocale, path: string) {
  if (locale === "az") {
    return path;
  }

  return `/${locale}${path}`;
}

export function CatalogDropdown({
  onNavigate,
  variant = "desktop",
  locale = "az",
}: CatalogDropdownProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<CatalogCategory[]>([]);
  const [loading, setLoading] = useState(false);

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
    if (!open || categories.length > 0) return;

    async function loadCategories() {
      try {
        setLoading(true);

        const response = await fetch("/api/catalog/categories");
        const result = (await response.json()) as {
          categories: CatalogCategory[];
        };

        setCategories(result.categories ?? []);
      } catch {
        setCategories([]);
      } finally {
        setLoading(false);
      }
    }

    void loadCategories();
  }, [open, categories.length]);

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
          "inline-flex items-center justify-center gap-2 rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800",
          isMobile ? "w-full" : "w-auto"
        )}
      >
        <PackageSearch className="size-4" aria-hidden="true" />
        {t.catalog}
      </button>

      {open ? (
        <div
          className={cn(
            "z-[80] overflow-hidden border border-neutral-200 bg-white shadow-2xl shadow-black/15",
            isMobile
              ? "mt-3 w-full rounded-3xl"
              : "absolute left-0 top-[calc(100%+0.75rem)] w-[min(calc(100vw-2rem),760px)] rounded-[2rem] lg:w-[760px]"
          )}
        >
          <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-neutral-400">
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
              className="inline-flex size-9 items-center justify-center rounded-full text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-950"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid gap-0 lg:grid-cols-[1fr_280px]">
            <div
              className={cn(
                "overflow-y-auto p-3",
                isMobile ? "max-h-[320px]" : "max-h-[420px]"
              )}
            >
              {loading ? (
                <div className="rounded-2xl bg-neutral-50 p-5 text-sm text-neutral-500">
                  {t.loading}
                </div>
              ) : categories.length > 0 ? (
                <div className="grid gap-2">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={withLocalePath(locale, `/category/${category.slug}`)}
                      onClick={closeDropdown}
                      className="group flex items-center gap-3 rounded-2xl border border-transparent p-3 transition hover:border-neutral-200 hover:bg-neutral-50"
                    >
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-neutral-950 text-white">
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
                        className="size-4 shrink-0 text-neutral-400 transition group-hover:translate-x-0.5 group-hover:text-neutral-950"
                        aria-hidden="true"
                      />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl bg-neutral-50 p-5 text-sm text-neutral-500">
                  {t.empty}
                </div>
              )}
            </div>

            <div className="border-t border-neutral-100 bg-neutral-50 p-4 lg:border-l lg:border-t-0">
              <div className="rounded-3xl bg-neutral-950 p-5 text-white">
                <ShieldCheck className="size-7" aria-hidden="true" />
                <h4 className="mt-4 text-lg font-semibold">
                  {t.ctaTitle}
                </h4>
                <p className="mt-2 text-sm leading-6 text-white/65">
                  {t.ctaDescription}
                </p>

                <Link
                  href={withLocalePath(locale, "/products")}
                  onClick={closeDropdown}
                  className="mt-5 inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-100"
                >
                  {t.productsLink}
                  <ArrowRight className="ml-2 size-4" aria-hidden="true" />
                </Link>
              </div>

              <Link
                href={withLocalePath(locale, "/products")}
                onClick={closeDropdown}
                className="mt-3 flex items-center justify-between rounded-2xl border border-neutral-200 bg-white p-4 text-sm font-semibold text-neutral-950 transition hover:border-neutral-950"
              >
                {t.allProducts}
                <Camera className="size-4" aria-hidden="true" />
              </Link>

              <Link
                href={withLocalePath(locale, "/track-order")}
                onClick={closeDropdown}
                className="mt-3 flex items-center justify-between rounded-2xl border border-neutral-200 bg-white p-4 text-sm font-semibold text-neutral-950 transition hover:border-neutral-950"
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
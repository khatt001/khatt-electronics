"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  Boxes,
  Heart,
  Menu,
  PackageSearch,
  ShoppingCart,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

import {
  localizedPath,
  switchLocalePathname,
  type Locale,
} from "@/lib/i18n";
import { cn } from "@/lib/utils";

type NavLink = {
  href: string;
  name: string;
};

type MobileMenuTranslations = {
  mobileMenuOpenLabel: string;
  mobileMenuCloseLabel: string;
  mobileMenuLabel: string;
  logoAriaLabel: string;
  searchPlaceholder: string;
  compare: string;
  favorites: string;
  cart: string;
  productsCta: string;
  trackOrder: string;
  languages: {
    label: string;
    locale: Locale;
  }[];
};

type MobileMenuClientProps = {
  locale: Locale;
  pathname: string;
  navLinks: NavLink[];
  t: MobileMenuTranslations;
};

const menuContent = {
  az: {
    productsDescription: "Peşəkar avadanlıq və məhsullar",
    solutionsTitle: "Mühəndis həlləri",
    solutionsDescription:
      "Təhlükəsizlik, elektrik, HVAC və şəbəkə sistemləri",
    pagesLabel: "Şirkət və xidmətlər",
    utilityLabel: "Şəxsi bölmə",
  },
  en: {
    productsDescription: "Professional equipment and products",
    solutionsTitle: "Engineering solutions",
    solutionsDescription:
      "Security, electrical, HVAC and network systems",
    pagesLabel: "Company and services",
    utilityLabel: "Personal area",
  },
  ru: {
    productsDescription: "Профессиональное оборудование и товары",
    solutionsTitle: "Инженерные решения",
    solutionsDescription:
      "Безопасность, электрика, HVAC и сетевые системы",
    pagesLabel: "Компания и услуги",
    utilityLabel: "Личный раздел",
  },
} as const;

export function MobileMenuClient({
  locale,
  pathname,
  navLinks,
  t,
}: MobileMenuClientProps) {
  const [open, setOpen] = useState(false);

  const content = menuContent[locale];
  const productsHref = localizedPath("/products", locale);
  const solutionsHref = localizedPath("/solutions", locale);

  const productsLink = navLinks.find(
    (link) => link.href === productsHref,
  );

  const solutionsLink = navLinks.find(
    (link) => link.href === solutionsHref,
  );

  const secondaryLinks = navLinks.filter(
    (link) =>
      link.href !== productsHref && link.href !== solutionsHref,
  );

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <>
      <button
        type="button"
        aria-label={t.mobileMenuOpenLabel}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
        className="inline-flex size-10 items-center justify-center rounded-lg text-neutral-800 transition hover:bg-emerald-50 hover:text-emerald-700 xl:hidden"
      >
        <Menu aria-hidden="true" className="size-[22px]" />
      </button>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label={t.mobileMenuLabel}
        aria-hidden={!open}
        className={cn(
          "fixed inset-0 z-[999] flex h-dvh w-screen flex-col overflow-hidden bg-white transition-transform duration-300 xl:hidden",
          open
            ? "translate-x-0"
            : "pointer-events-none translate-x-full",
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-neutral-200 px-5">
          <Link
            href={localizedPath("/", locale)}
            onClick={closeMenu}
            aria-label={t.logoAriaLabel}
            className="font-serif text-xl font-semibold tracking-[0.24em] text-neutral-950"
          >
            KHATT
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-lg border border-neutral-200 bg-neutral-50 p-0.5">
              {t.languages.map((language) => {
                const isActive = language.locale === locale;

                return (
                  <Link
                    key={language.locale}
                    href={switchLocalePathname(
                      pathname,
                      language.locale,
                    )}
                    onClick={closeMenu}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "rounded-md px-2.5 py-1.5 text-[11px] font-semibold transition",
                      isActive
                        ? "bg-neutral-950 text-white"
                        : "text-neutral-500",
                    )}
                  >
                    {language.label}
                  </Link>
                );
              })}
            </div>

            <button
              type="button"
              aria-label={t.mobileMenuCloseLabel}
              onClick={closeMenu}
              className="inline-flex size-10 items-center justify-center rounded-lg border border-neutral-200 text-neutral-700 transition hover:bg-neutral-100"
            >
              <X aria-hidden="true" className="size-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-10 pt-6">
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href={productsHref}
              onClick={closeMenu}
              className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 p-5 transition hover:border-emerald-300 hover:bg-emerald-50"
            >
              <div className="flex items-start justify-between">
                <span className="flex size-10 items-center justify-center rounded-xl bg-white text-neutral-800 shadow-sm">
                  <PackageSearch
                    aria-hidden="true"
                    className="size-5"
                  />
                </span>

                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 text-neutral-400 transition group-hover:text-emerald-700"
                />
              </div>

              <strong className="mt-5 block text-lg font-semibold text-neutral-950">
                {productsLink?.name ?? t.productsCta}
              </strong>

              <span className="mt-1 block text-sm leading-5 text-neutral-500">
                {content.productsDescription}
              </span>
            </Link>

            <Link
              href={solutionsHref}
              onClick={closeMenu}
              className="group relative overflow-hidden rounded-2xl bg-neutral-950 p-5 text-white transition hover:bg-emerald-800"
            >
              <Boxes
                aria-hidden="true"
                className="absolute -bottom-5 -right-4 size-28 text-white/[0.06]"
              />

              <div className="relative flex items-start justify-between">
                <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-400">
                  <Boxes aria-hidden="true" className="size-5" />
                </span>

                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 text-white/50 transition group-hover:text-white"
                />
              </div>

              <strong className="relative mt-5 block text-lg font-semibold">
                {solutionsLink?.name ?? content.solutionsTitle}
              </strong>

              <span className="relative mt-1 block text-sm leading-5 text-white/60">
                {content.solutionsDescription}
              </span>
            </Link>
          </div>

          <div className="mt-8">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
              {content.pagesLabel}
            </p>

            <nav
              aria-label={t.mobileMenuLabel}
              className="border-y border-neutral-200"
            >
              {secondaryLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  pathname.startsWith(`${link.href}/`);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "group flex min-h-14 items-center justify-between border-b border-neutral-200 text-[15px] font-medium transition last:border-b-0",
                      isActive
                        ? "text-emerald-700"
                        : "text-neutral-900 hover:text-emerald-700",
                    )}
                  >
                    {link.name}

                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 text-neutral-300 transition group-hover:text-emerald-700"
                    />
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="mt-8">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
              {content.utilityLabel}
            </p>

            <div className="grid grid-cols-3 gap-2">
              <Link
                href={localizedPath("/compare", locale)}
                onClick={closeMenu}
                className="flex min-h-[88px] flex-col items-center justify-center gap-2 rounded-xl border border-neutral-200 text-center text-xs font-medium text-neutral-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
              >
                <BarChart3 aria-hidden="true" className="size-5" />
                {t.compare}
              </Link>

              <Link
                href={localizedPath("/favorites", locale)}
                onClick={closeMenu}
                className="flex min-h-[88px] flex-col items-center justify-center gap-2 rounded-xl border border-neutral-200 text-center text-xs font-medium text-neutral-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                <Heart aria-hidden="true" className="size-5" />
                {t.favorites}
              </Link>

              <Link
                href={localizedPath("/cart", locale)}
                onClick={closeMenu}
                className="flex min-h-[88px] flex-col items-center justify-center gap-2 rounded-xl border border-neutral-200 text-center text-xs font-medium text-neutral-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
              >
                <ShoppingCart aria-hidden="true" className="size-5" />
                {t.cart}
              </Link>
            </div>
          </div>

          <Link
            href={localizedPath("/track-order", locale)}
            onClick={closeMenu}
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-neutral-300 px-5 text-sm font-semibold text-neutral-900 transition hover:border-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
          >
            {t.trackOrder}
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
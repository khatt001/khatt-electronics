"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { CatalogDropdown } from "@/components/layout/catalog-dropdown";
import { NavbarSearch } from "@/components/layout/navbar-search";
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

export function MobileMenuClient({
  locale,
  pathname,
  navLinks,
  t,
}: MobileMenuClientProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const originalOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        originalOverflow;
    };
  }, [open]);

  useEffect(() => {
    function handleEscape(
      event: KeyboardEvent,
    ) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener(
      "keydown",
      handleEscape,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape,
      );
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
        <Menu
          className="size-[22px]"
          aria-hidden="true"
        />
      </button>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label={t.mobileMenuLabel}
        aria-hidden={!open}
        className={cn(
          "fixed inset-0 z-[999] flex h-dvh w-screen max-w-full flex-col overflow-hidden bg-[#f5f6f8] transition-transform duration-300 xl:hidden",
          open
            ? "translate-x-0"
            : "pointer-events-none translate-x-full",
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-neutral-200 bg-white px-5">
          <Link
            href={localizedPath("/", locale)}
            onClick={closeMenu}
            aria-label={t.logoAriaLabel}
            className="font-serif text-xl font-semibold tracking-[0.24em] text-neutral-950 transition hover:text-emerald-700"
          >
            KHATT
          </Link>

          <button
            type="button"
            aria-label={t.mobileMenuCloseLabel}
            onClick={closeMenu}
            className="inline-flex size-10 items-center justify-center rounded-lg border border-neutral-200 text-neutral-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            <X
              className="size-[22px]"
              aria-hidden="true"
            />
          </button>
        </div>

        <div className="relative z-20 shrink-0 border-b border-neutral-200 bg-white px-5 py-4">
          <NavbarSearch
            placeholder={t.searchPlaceholder}
            locale={locale}
            onNavigate={closeMenu}
          />
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden px-5 py-5">
          <div className="mb-5 w-full max-w-full overflow-visible">
            <CatalogDropdown
              locale={locale}
              variant="mobile"
              onNavigate={closeMenu}
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Link
              href={localizedPath(
                "/compare",
                locale,
              )}
              onClick={closeMenu}
              aria-label={t.compare}
              className="rounded-xl border border-neutral-200 bg-white p-3 text-center text-xs font-medium text-neutral-700 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
            >
              {t.compare}
            </Link>

            <Link
              href={localizedPath(
                "/favorites",
                locale,
              )}
              onClick={closeMenu}
              aria-label={t.favorites}
              className="rounded-xl border border-neutral-200 bg-white p-3 text-center text-xs font-medium text-neutral-700 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              {t.favorites}
            </Link>

            <Link
              href={localizedPath(
                "/cart",
                locale,
              )}
              onClick={closeMenu}
              aria-label={t.cart}
              className="rounded-xl border border-neutral-200 bg-white p-3 text-center text-xs font-medium text-neutral-700 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
            >
              {t.cart}
            </Link>
          </div>

          <nav
            aria-label={t.mobileMenuLabel}
            className="mt-6 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="block border-b border-neutral-100 px-4 py-4 text-base font-medium text-neutral-900 transition last:border-b-0 hover:bg-emerald-50 hover:text-emerald-700"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center gap-2">
              {t.languages.map((language) => (
                <Link
                  key={language.label}
                  href={switchLocalePathname(
                    pathname,
                    language.locale,
                  )}
                  onClick={closeMenu}
                  className={cn(
                    "rounded-lg border px-4 py-2 text-sm font-medium transition",
                    language.locale === locale
                      ? "border-neutral-950 bg-neutral-950 text-white"
                      : "border-neutral-200 text-neutral-700 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700",
                  )}
                >
                  {language.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Link
              href={localizedPath(
                "/products",
                locale,
              )}
              onClick={closeMenu}
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-neutral-950 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              {t.productsCta}
            </Link>

            <Link
              href={localizedPath(
                "/track-order",
                locale,
              )}
              onClick={closeMenu}
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 py-3 text-center text-sm font-semibold text-neutral-800 transition hover:border-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
            >
              {t.trackOrder}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
"use client";

// This is the ONLY part of the Navbar that needs "use client".
// Isolating it here means the rest of the Navbar renders as static HTML,
// reducing the JavaScript bundle that must be parsed and executed on load.

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { CatalogDropdown } from "@/components/layout/catalog-dropdown";
import { NavbarSearch } from "@/components/layout/navbar-search";
import { cn } from "@/lib/utils";
import { localizedPath, switchLocalePathname, type Locale } from "@/lib/i18n";

type NavLink = {
  href: string;
  name: string;
};

// Accept the translated strings as a prop so this component doesn't import
// translation data itself (keeps its bundle small).
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
  languages: { label: string; locale: Locale }[];
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
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <>
      <button
        type="button"
        aria-label={t.mobileMenuOpenLabel}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
        className="inline-flex size-10 items-center justify-center rounded-full text-neutral-800 transition hover:bg-neutral-100 xl:hidden"
      >
        <Menu size={22} aria-hidden="true" />
      </button>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label={t.mobileMenuLabel}
        className={cn(
          "fixed inset-0 z-[999] flex h-dvh w-screen max-w-full flex-col overflow-hidden bg-white transition-transform duration-300 xl:hidden",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-black/10 px-5">
          <Link
            href={localizedPath("/", locale)}
            onClick={() => setOpen(false)}
            aria-label={t.logoAriaLabel}
            className="font-serif text-xl font-semibold tracking-[0.24em]"
          >
            KHATT
          </Link>

          <button
            type="button"
            aria-label={t.mobileMenuCloseLabel}
            onClick={() => setOpen(false)}
            className="inline-flex size-10 items-center justify-center rounded-full hover:bg-neutral-100"
          >
            <X size={22} aria-hidden="true" />
          </button>
        </div>

        <div className="relative z-20 shrink-0 border-b border-black/10 px-5 py-4">
          <NavbarSearch
            placeholder={t.searchPlaceholder}
            locale={locale}
            onNavigate={() => setOpen(false)}
          />
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden px-5 py-5">
          <div className="mb-5 w-full max-w-full overflow-visible">
            <CatalogDropdown
              locale={locale}
              variant="mobile"
              onNavigate={() => setOpen(false)}
            />
          </div>

          {/* 
            ACCESSIBILITY FIX: These three links had no accessible name
            (Lighthouse: "Links do not have a discernible name").
            The link text is now explicit; aria-label added as backup.
          */}
          <div className="grid grid-cols-3 gap-2">
            <Link
              href={localizedPath("/compare", locale)}
              onClick={() => setOpen(false)}
              aria-label={t.compare}
              className="rounded-2xl border border-neutral-200 p-3 text-center text-xs font-medium transition hover:border-neutral-950"
            >
              {t.compare}
            </Link>

            <Link
              href={localizedPath("/favorites", locale)}
              onClick={() => setOpen(false)}
              aria-label={t.favorites}
              className="rounded-2xl border border-neutral-200 p-3 text-center text-xs font-medium transition hover:border-neutral-950"
            >
              {t.favorites}
            </Link>

            <Link
              href={localizedPath("/cart", locale)}
              onClick={() => setOpen(false)}
              aria-label={t.cart}
              className="rounded-2xl border border-neutral-200 p-3 text-center text-xs font-medium transition hover:border-neutral-950"
            >
              {t.cart}
            </Link>
          </div>

          <nav aria-label={t.mobileMenuLabel} className="mt-6 flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-neutral-100 py-4 text-lg font-medium text-neutral-900"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="mt-6 flex items-center gap-3">
            {t.languages.map((language) => (
              <Link
                key={language.label}
                href={switchLocalePathname(pathname, language.locale)}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium",
                  language.locale === locale
                    ? "border-neutral-950 bg-neutral-950 text-white"
                    : "border-neutral-200 text-neutral-700"
                )}
              >
                {language.label}
              </Link>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <Link
              href={localizedPath("/products", locale)}
              onClick={() => setOpen(false)}
              className="inline-flex justify-center rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white"
            >
              {t.productsCta}
            </Link>

            <Link
              href={localizedPath("/track-order", locale)}
              onClick={() => setOpen(false)}
              className="inline-flex justify-center rounded-full border border-neutral-950 px-6 py-3 text-sm font-medium"
            >
              {t.trackOrder}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
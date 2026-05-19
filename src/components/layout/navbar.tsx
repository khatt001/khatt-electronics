"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  Clock,
  Mail,
  Menu,
  Phone,
  X,
} from "lucide-react";
import { CatalogDropdown } from "@/components/layout/catalog-dropdown";
import { Container } from "@/components/layout/container";
import { NavbarSearch } from "@/components/layout/navbar-search";
import { languages, navLinks } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { CartNavLink } from "@/components/cart/cart-nav-link";
import { FavoritesNavLink } from "@/components/favorites/favorites-nav-link";
import { CompareNavLink } from "@/components/compare/compare-nav-link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
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

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-black/10 bg-white/90 backdrop-blur-xl">
      <div className="hidden border-b border-black/10 bg-neutral-950 text-white lg:block">
        <Container>
          <div className="flex h-10 items-center justify-between text-xs">
            <div className="flex items-center gap-6 text-white/70">
              <a
                href="tel:+994000000000"
                className="inline-flex items-center gap-2 transition hover:text-white"
              >
                <Phone className="size-3.5" aria-hidden="true" />
                +994 00 000 00 00
              </a>

              <a
                href="mailto:info@khatt.electronics"
                className="inline-flex items-center gap-2 transition hover:text-white"
              >
                <Mail className="size-3.5" aria-hidden="true" />
                info@khatt.electronics
              </a>

              <span className="inline-flex items-center gap-2">
                <Clock className="size-3.5" aria-hidden="true" />
                B.e - Şənbə: 09:00 - 18:00
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-white/45">Dil:</span>

              <div className="flex items-center gap-2">
                {languages.map((language) => (
                  <Link
                    key={language.label}
                    href={language.href}
                    className={cn(
                      "transition hover:text-white",
                      language.label === "AZ" ? "text-white" : "text-white/50"
                    )}
                  >
                    {language.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="flex h-16 items-center gap-4 lg:h-20">
          <Link
            href="/"
            aria-label="KHATT Electronics ana səhifə"
            className="shrink-0 font-serif text-xl font-semibold tracking-[0.24em] text-neutral-950 lg:text-2xl"
          >
            KHATT
          </Link>

          <div className="hidden lg:block">
            <CatalogDropdown />
          </div>

          <div className="hidden flex-1 lg:block">
            <NavbarSearch />
          </div>

         <nav
  aria-label="Əsas naviqasiya"
  className="hidden items-center gap-5 xl:flex"
>
  <Link
    href="/products"
    className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-950"
  >
    Məhsullar
  </Link>

  {navLinks.slice(2).map((link) => (
    <Link
      key={link.href}
      href={link.href}
      className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-950"
    >
      {link.name}
    </Link>
  ))}
</nav>

          <div className="ml-auto flex items-center gap-1.5">
           <CompareNavLink />

           <FavoritesNavLink />
           <CartNavLink />

           <Link
  href="/track-order"
  className="hidden rounded-full border border-neutral-200 px-4 py-2.5 text-sm font-medium text-neutral-950 transition hover:border-neutral-950 lg:inline-flex"
>
  Sifariş izləmə
</Link>

            <button
              type="button"
              aria-label="Mobil menyunu aç"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
              className="inline-flex size-10 items-center justify-center rounded-full text-neutral-800 transition hover:bg-neutral-100 xl:hidden"
            >
              <Menu size={22} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="hidden h-12 items-center gap-8 overflow-x-auto border-t border-black/10 lg:flex xl:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="shrink-0 text-sm font-medium text-neutral-600 transition hover:text-neutral-950"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </Container>

      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-[999] flex h-dvh w-screen max-w-full flex-col overflow-hidden bg-white transition-transform duration-300 xl:hidden",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-black/10 px-5">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            aria-label="KHATT Electronics ana səhifə"
            className="font-serif text-xl font-semibold tracking-[0.24em]"
          >
            KHATT
          </Link>

          <button
            type="button"
            aria-label="Mobil menyunu bağla"
            onClick={() => setOpen(false)}
            className="inline-flex size-10 items-center justify-center rounded-full hover:bg-neutral-100"
          >
            <X size={22} aria-hidden="true" />
          </button>
        </div>

        <div className="relative z-20 shrink-0 border-b border-black/10 px-5 py-4">
          <NavbarSearch
            placeholder="Məhsul axtar..."
            onNavigate={() => setOpen(false)}
          />
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden px-5 py-5">
          <div className="mb-5 w-full max-w-full overflow-visible">
            <CatalogDropdown
              variant="mobile"
              onNavigate={() => setOpen(false)}
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Link
              href="/compare"
              onClick={() => setOpen(false)}
              className="rounded-2xl border border-neutral-200 p-3 text-center text-xs font-medium transition hover:border-neutral-950"
            >
              Müqayisə
            </Link>

            <Link
              href="/favorites"
              onClick={() => setOpen(false)}
              className="rounded-2xl border border-neutral-200 p-3 text-center text-xs font-medium transition hover:border-neutral-950"
            >
              Sevimli
            </Link>

            <Link
              href="/cart"
              onClick={() => setOpen(false)}
              className="rounded-2xl border border-neutral-200 p-3 text-center text-xs font-medium transition hover:border-neutral-950"
            >
              Səbət
            </Link>
          </div>

          <nav aria-label="Mobil menyu" className="mt-6 flex flex-col">
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
            {languages.map((language) => (
              <Link
                key={language.label}
                href={language.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium",
                  language.label === "AZ"
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
    href="/products"
    onClick={() => setOpen(false)}
    className="inline-flex justify-center rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white"
  >
    Məhsullar
  </Link>

  <Link
    href="/track-order"
    onClick={() => setOpen(false)}
    className="inline-flex justify-center rounded-full border border-neutral-950 px-6 py-3 text-sm font-medium"
  >
    Sifariş izləmə
  </Link>
</div>
        </div>
      </div>
    </header>
  );
}
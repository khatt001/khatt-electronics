"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, Phone, ShieldCheck, X } from "lucide-react";

import { Container } from "@/components/layout/container";
import { getMainNavigationLinks } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { chromeCopy } from "@/data/translations/chrome";
import {
  localizedPath,
  locales,
  switchLocalePathname,
  type Locale,
} from "@/lib/i18n";
import { cn } from "@/lib/utils";

type NavbarProps = {
  locale?: Locale;
  pathname?: string;
};

function LanguageSwitch({
  locale,
  pathname,
  tone = "light",
}: {
  locale: Locale;
  pathname: string;
  tone?: "light" | "dark";
}) {
  return (
    <div className="flex items-center gap-1">
      {locales.map((item) => {
        const isActive = item === locale;

        return (
          <Link
            key={item}
            href={switchLocalePathname(pathname, item)}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "rounded px-1.5 py-0.5 text-[11px] uppercase tracking-wider transition",
              tone === "dark"
                ? isActive
                  ? "text-white"
                  : "text-white/45 hover:text-white"
                : isActive
                  ? "bg-ink text-white"
                  : "text-muted hover:text-ink",
            )}
          >
            {item}
          </Link>
        );
      })}
    </div>
  );
}

export default function Navbar({ locale = "az", pathname = "/" }: NavbarProps) {
  const t = chromeCopy[locale];
  const navLinks = getMainNavigationLinks(t.nav, locale);
  const homeHref = localizedPath("/", locale);
  const quoteHref = localizedPath("/contact", locale);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="hidden bg-ink text-white lg:block">
        <Container>
          <div className="flex h-9 items-center justify-between text-xs">
            <div className="flex items-center gap-6 text-white/65">
              <span className="inline-flex items-center gap-2 text-white/80">
                <ShieldCheck className="size-3.5 text-brass" aria-hidden="true" />
                {t.licensedBadge}
              </span>
              <span>{t.hours}</span>
            </div>

            <div className="flex items-center gap-5">
              <a
                href={siteConfig.phoneHref}
                className="inline-flex items-center gap-2 text-white/75 transition hover:text-white"
              >
                <Phone className="size-3.5" aria-hidden="true" />
                <span className="tabular">{siteConfig.phone}</span>
              </a>
              <span className="h-3 w-px bg-white/20" aria-hidden="true" />
              <LanguageSwitch locale={locale} pathname={pathname} tone="dark" />
            </div>
          </div>
        </Container>
      </div>

      <div className="border-b border-line bg-surface/95 backdrop-blur-md">
        <Container>
          <div className="flex h-16 items-center gap-6 lg:h-20">
            <Link
              href={homeHref}
              aria-label={`${siteConfig.name} — ${t.home}`}
              className="shrink-0"
            >
              <Image
                src="/logo-khatt-dark.png"
                alt={siteConfig.name}
                width={1050}
                height={232}
                priority
                className="h-7 w-auto lg:h-9"
              />
            </Link>

            <nav
              aria-label={t.mainNav}
              className="ml-auto hidden items-center gap-7 xl:flex"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cn(
                    "relative py-2 text-sm font-medium transition-colors",
                    "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-signal after:transition-transform",
                    "hover:text-ink hover:after:scale-x-100",
                    isActive(link.href)
                      ? "text-ink after:scale-x-100"
                      : "text-muted",
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="ml-auto flex items-center gap-2 xl:ml-0">
              <div className="lg:hidden">
                <LanguageSwitch locale={locale} pathname={pathname} />
              </div>

              <Link
                href={quoteHref}
                className="hidden min-h-11 items-center gap-2 rounded-md bg-signal px-5 text-sm font-semibold text-white transition hover:bg-signal-deep sm:inline-flex"
              >
                {t.quote}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>

              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label={t.menuOpen}
                aria-expanded={open}
                aria-controls="mobile-menu"
                className="inline-flex size-11 items-center justify-center rounded-md border border-line text-ink transition hover:bg-paper xl:hidden"
              >
                <Menu className="size-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </Container>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={t.mainNav}
          className="fixed inset-0 z-[60] flex flex-col bg-ink text-white xl:hidden"
        >
          <div className="flex h-16 items-center justify-between px-4">
            <Image
              src="/logo-khatt-light.png"
              alt={siteConfig.name}
              width={1050}
              height={232}
              className="h-7 w-auto"
            />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.menuClose}
              className="inline-flex size-11 items-center justify-center rounded-md border border-white/15"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          <nav
            aria-label={t.mainNav}
            className="flex flex-1 flex-col overflow-y-auto px-4 pb-6 pt-4"
          >
            {[{ key: "home", name: t.home, href: homeHref }, ...navLinks].map(
              (link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className="flex items-center justify-between border-b border-white/10 py-4"
                >
                  <span className="text-2xl">{link.name}</span>
                  <ArrowUpRight className="size-4 text-white/35" aria-hidden="true" />
                </Link>
              ),
            )}

            <div className="mt-auto grid gap-3 pt-8">
              <Link
                href={quoteHref}
                onClick={() => setOpen(false)}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-signal font-semibold"
              >
                {t.quote}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
              <a
                href={siteConfig.phoneHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/20 tabular"
              >
                <Phone className="size-4" aria-hidden="true" />
                {siteConfig.phone}
              </a>
              <p className="text-center text-xs text-white/50">{t.hours}</p>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

import Link from "next/link";
import { Clock, Mail, Phone } from "lucide-react";

import { CartNavLink } from "@/components/cart/cart-nav-link";
import { CompareNavLink } from "@/components/compare/compare-nav-link";
import { FavoritesNavLink } from "@/components/favorites/favorites-nav-link";
import { CatalogDropdown } from "@/components/layout/catalog-dropdown";
import { Container } from "@/components/layout/container";
import { MobileMenuClient } from "@/components/layout/mobile-menu-client";
import { NavbarSearch } from "@/components/layout/navbar-search";
import { getMainNavigationLinks } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { navbarTranslations } from "@/data/translations/navbar";
import { localizedPath, switchLocalePathname, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type NavbarProps = {
  locale?: Locale;
  pathname?: string;
};

export default function Navbar({ locale = "az", pathname = "/" }: NavbarProps) {
  const t = navbarTranslations[locale];
  const navLinks = getMainNavigationLinks(t.navLinks, locale);

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-neutral-200 bg-white/95 backdrop-blur-xl">
      <div className="hidden border-b border-white/10 bg-neutral-950 text-white lg:block">
        <Container>
          <div className="flex h-10 items-center justify-between text-xs">
            <div className="flex items-center gap-6 text-white/70">
              <a
                href={siteConfig.phoneHref}
                className="inline-flex items-center gap-2 transition hover:text-white"
              >
                <Phone className="size-3.5" aria-hidden="true" />
                {siteConfig.phone}
              </a>

              <a
                href={siteConfig.emailHref}
                className="inline-flex items-center gap-2 transition hover:text-white"
              >
                <Mail className="size-3.5" aria-hidden="true" />
                {siteConfig.email}
              </a>

              <span className="inline-flex items-center gap-2">
                <Clock className="size-3.5" aria-hidden="true" />
                {t.workingHours}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-white/45">{t.languageLabel}</span>

              <div className="flex items-center gap-2">
                {t.languages.map((language) => {
                  const isActive = language.locale === locale;

                  return (
                    <Link
                      key={language.locale}
                      href={switchLocalePathname(pathname, language.locale)}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "transition hover:text-white",
                        isActive
                          ? "font-semibold text-white"
                          : "text-white/50",
                      )}
                    >
                      {language.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="flex h-14 items-center gap-2 lg:h-20 lg:gap-4">
          <Link
            href={localizedPath("/", locale)}
            aria-label={t.logoAriaLabel}
            className="shrink-0 font-serif text-lg font-semibold tracking-[0.22em] text-neutral-950 transition hover:text-emerald-700 lg:text-2xl"
          >
            KHATT
          </Link>

          <div className="hidden lg:block">
            <CatalogDropdown locale={locale} />
          </div>

          <div className="hidden flex-1 lg:block">
            <NavbarSearch placeholder={t.searchPlaceholder} locale={locale} />
          </div>

          <nav
            aria-label={t.mainNavigationLabel}
            className="hidden items-center gap-5 xl:flex"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-neutral-600 transition-colors hover:text-emerald-700"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1">
            <div className="mr-1 flex items-center rounded-lg border border-neutral-200 bg-neutral-50 p-0.5 lg:hidden">
              {t.languages.map((language) => {
                const isActive = language.locale === locale;

                return (
                  <Link
                    key={language.locale}
                    href={switchLocalePathname(pathname, language.locale)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "rounded-md px-2 py-1 text-[11px] font-semibold transition",
                      isActive
                        ? "bg-neutral-950 text-white"
                        : "text-neutral-500 hover:text-emerald-700",
                    )}
                  >
                    {language.label}
                  </Link>
                );
              })}
            </div>

            <CompareNavLink locale={locale} />
            <FavoritesNavLink locale={locale} />
            <CartNavLink locale={locale} />

            <Link
              href={localizedPath("/track-order", locale)}
              className="hidden min-h-10 items-center rounded-lg border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-950 transition hover:border-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 lg:inline-flex"
            >
              {t.trackOrder}
            </Link>

            <MobileMenuClient
              locale={locale}
              pathname={pathname}
              navLinks={navLinks}
              t={t}
            />
          </div>
        </div>

        <div className="border-t border-neutral-200 py-2 lg:hidden">
          <NavbarSearch placeholder={t.searchPlaceholder} locale={locale} />
        </div>

        <div className="hidden h-12 items-center gap-8 overflow-x-auto border-t border-neutral-200 lg:flex xl:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="shrink-0 text-sm font-medium text-neutral-600 transition hover:text-emerald-700"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </Container>
    </header>
  );
}

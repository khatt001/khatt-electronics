import Link from "next/link";
import {
  ArrowRight,
  Send,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { siteConfig } from "@/data/site";
import {
  getFooterCategoryLinks,
  getFooterNavigationLinks,
} from "@/data/navigation";
import { footerTranslations } from "@/data/translations/layout";
import { localizedPath, type Locale } from "@/lib/i18n";

type FooterProps = {
  locale?: Locale;
};

export function Footer({ locale = "az" }: FooterProps) {
  const t = footerTranslations[locale];
  const footerLinks = getFooterNavigationLinks(t.footerLinks, locale);
  const categoryLinks = getFooterCategoryLinks(t.categoryLinks, locale);

  return (
    <footer className="border-t border-white/10 bg-[#080b0a] text-white">
      <Container className="py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr_0.75fr_1fr]">
          <div>
            <Link
              href={localizedPath("/", locale)}
              className="inline-flex text-2xl font-semibold tracking-tight"
            >
              {siteConfig.name}
            </Link>

            <div className="mt-3 h-0.5 w-14 bg-emerald-400" />

            <p className="mt-5 max-w-md text-sm leading-7 text-white/60">
              {t.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={localizedPath("/products", locale)}
                className="inline-flex items-center rounded-lg bg-emerald-400 px-4 py-2.5 text-xs font-semibold text-neutral-950 transition hover:bg-emerald-300"
              >
                {t.productsButton}
                <ArrowRight className="ml-2 size-4" aria-hidden="true" />
              </Link>

              <Link
                href={localizedPath("/track-order", locale)}
                className="inline-flex items-center rounded-lg border border-white/15 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-white/10"
              >
                {t.trackOrderButton}
              </Link>
            </div>

            <div className="mt-7 flex items-center gap-3">
              <a
                href="https://instagram.com/khatt.electronics"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex size-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/70 transition hover:border-emerald-400/40 hover:bg-emerald-400 hover:text-neutral-950"
              >
                <Send className="size-4" aria-hidden="true" />
              </a>

              <a
                href={siteConfig.phoneHref}
                aria-label="WhatsApp"
                className="flex size-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/70 transition hover:border-emerald-400/40 hover:bg-emerald-400 hover:text-neutral-950"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">{t.pagesTitle}</h3>

            <div className="mt-5 space-y-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-white/55 transition hover:translate-x-1 hover:text-emerald-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">
              {t.categoriesTitle}
            </h3>

            <div className="mt-5 space-y-3">
              {categoryLinks.map((category) => (
                <Link
                  key={category.href}
                  href={category.href}
                  className="block text-sm text-white/55 transition hover:translate-x-1 hover:text-emerald-300"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">
              {t.contactTitle}
            </h3>

            <div className="mt-5 space-y-4">
              <a
                href={siteConfig.phoneHref}
                className="flex items-start gap-3 text-sm text-white/60 transition hover:text-white"
              >
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-emerald-300">
                  <Phone className="size-4" aria-hidden="true" />
                </span>
                <span className="leading-7">{siteConfig.phone}</span>
              </a>

              <a
                href={siteConfig.emailHref}
                className="flex items-start gap-3 text-sm text-white/60 transition hover:text-white"
              >
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-emerald-300">
                  <Mail className="size-4" aria-hidden="true" />
                </span>
                <span className="break-all leading-7">{siteConfig.email}</span>
              </a>

              <div className="flex items-start gap-3 text-sm text-white/60">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-emerald-300">
                  <MapPin className="size-4" aria-hidden="true" />
                </span>
                <span className="leading-7">{siteConfig.address}</span>
              </div>
            </div>

            <Link
              href={localizedPath("/contact", locale)}
              className="mt-6 inline-flex items-center rounded-lg border border-white/15 px-4 py-2.5 text-xs font-semibold text-white transition hover:border-emerald-400/40 hover:bg-white/[0.06]"
            >
              {t.contactPageButton}
              <ArrowRight className="ml-2 size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="mt-12 grid gap-3 border-t border-white/10 pt-6 text-xs text-white/45 md:grid-cols-2 md:items-center">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. {t.copyrightSuffix}
          </p>

          <p className="md:text-right">{t.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}

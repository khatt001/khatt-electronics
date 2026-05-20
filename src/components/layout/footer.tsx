import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/data/site";
import {
  footerTranslations,
  type Locale,
} from "@/data/translations/layout";

type FooterProps = {
  locale?: Locale;
};

export function Footer({ locale = "az" }: FooterProps) {
  const t = footerTranslations[locale];

  return (
    <footer className="border-t border-black/10 bg-neutral-950 text-white">
      <Container className="py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <div>
            <Link
              href={locale === "az" ? "/" : `/${locale}`}
              className="text-xl font-semibold tracking-tight"
            >
              {siteConfig.name}
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-7 text-white/60">
              {t.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={locale === "az" ? "/products" : `/${locale}/products`}
                className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-neutral-950 transition hover:bg-neutral-200"
              >
                {t.productsButton}
              </Link>

              <Link
                href={
                  locale === "az"
                    ? "/track-order"
                    : `/${locale}/track-order`
                }
                className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
              >
                {t.trackOrderButton}
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold">{t.pagesTitle}</h3>

            <div className="mt-4 space-y-3">
              {t.footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-white/60 transition hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold">{t.categoriesTitle}</h3>

            <div className="mt-4 space-y-3">
              {t.categoryLinks.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="block text-sm text-white/60 transition hover:text-white"
                >
                  {service.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold">{t.contactTitle}</h3>

            <div className="mt-4 space-y-3">
              <a
                href={siteConfig.phoneHref}
                className="flex items-center gap-3 text-sm text-white/60 transition hover:text-white"
              >
                <Phone className="size-4" aria-hidden="true" />
                {siteConfig.phone}
              </a>

              <a
                href={siteConfig.emailHref}
                className="flex items-center gap-3 text-sm text-white/60 transition hover:text-white"
              >
                <Mail className="size-4" aria-hidden="true" />
                {siteConfig.email}
              </a>

              <div className="flex items-center gap-3 text-sm text-white/60">
                <MapPin className="size-4" aria-hidden="true" />
                {siteConfig.address}
              </div>
            </div>

            <Link
              href={locale === "az" ? "/contact" : `/${locale}/contact`}
              className="mt-5 inline-flex rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
            >
              {t.contactPageButton}
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}.{" "}
            {t.copyrightSuffix}
          </p>

          <p>{t.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}
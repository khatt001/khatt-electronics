import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { fireServices } from "@/data/fire-services";
import { licenses } from "@/data/licenses";
import { getMainNavigationLinks } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { chromeCopy } from "@/data/translations/chrome";
import { localizedPath, type Locale } from "@/lib/i18n";

type FooterProps = {
  locale?: Locale;
};

export function Footer({ locale = "az" }: FooterProps) {
  const t = chromeCopy[locale];
  const links = getMainNavigationLinks(t.nav, locale);
  const servicesHref = localizedPath("/services", locale);

  return (
    <footer className="bg-ink pb-24 text-white lg:pb-0">
      <Container className="py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.8fr_1fr_1.1fr]">
          <div className="max-w-sm">
            <Image
              src="/logo-khatt-light.png"
              alt={siteConfig.name}
              width={1050}
              height={232}
              className="h-9 w-auto"
            />
            <p className="mt-6 text-sm leading-7 text-white/60">{t.footerAbout}</p>

            <div className="mt-6 grid gap-2">
              {licenses.map((license) => (
                <Link
                  key={license.id}
                  href={localizedPath("/licenses", locale)}
                  className="flex items-center justify-between gap-3 border border-white/10 px-3 py-2 text-xs transition hover:border-brass/60"
                >
                  <span className="text-white/70">{license.short[locale]}</span>
                  <span className="text-white">{license.number}</span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="eyebrow text-white/45">{t.footerPages}</h2>
            <ul className="mt-5 grid gap-3 text-sm">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/70 transition hover:text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="eyebrow text-white/45">{t.footerServices}</h2>
            <ul className="mt-5 grid gap-3 text-sm">
              {fireServices.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`${servicesHref}#${service.id}`}
                    className="text-white/70 transition hover:text-white"
                  >
                    {service.content[locale].title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid content-start gap-8">
            <div>
              <h2 className="eyebrow text-white/45">{t.footerContact}</h2>
              <div className="mt-5 grid gap-2 text-sm">
                <a href={siteConfig.phoneHref} className="tabular text-white transition hover:text-brass">
                  {siteConfig.phone}
                </a>
                <a href={siteConfig.emailHref} className="break-all text-white/70 transition hover:text-white">
                  {siteConfig.email}
                </a>
                <a href={siteConfig.mapUrl} target="_blank" rel="noreferrer" className="text-white/70 transition hover:text-white">
                  {siteConfig.address}
                </a>
                <p className="text-white/45">{t.hours}</p>
              </div>
            </div>

            <div>
              <h2 className="eyebrow text-white/45">{t.footerLegal}</h2>
              <dl className="mt-5 grid gap-2 text-xs leading-6 text-white/60">
                <div>
                  <dt className="sr-only">Name</dt>
                  <dd className="text-white/80">{siteConfig.legalName}</dd>
                </div>
                <div className="flex gap-2">
                  <dt>{t.taxId}:</dt>
                  <dd className="text-white/80">{siteConfig.taxId}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. {t.rights}
          </p>
        </div>
      </Container>
    </footer>
  );
}

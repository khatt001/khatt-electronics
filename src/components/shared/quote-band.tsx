import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";

import { Container } from "@/components/layout/container";
import { siteConfig } from "@/data/site";
import { homeCopy } from "@/data/translations/home";
import { localizedPath, type Locale } from "@/lib/i18n";

export function QuoteBand({ locale, source }: { locale: Locale; source?: string }) {
  const t = homeCopy[locale];
  const href = `${localizedPath("/contact", locale)}${source ? `?source=${source}` : ""}`;

  return (
    <section className="bg-paper">
      <Container className="py-16 md:py-20">
        <div className="grid gap-8 border-l-2 border-signal bg-surface p-6 md:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="min-w-0">
            <h2 className="font-display text-3xl leading-tight font-medium text-ink md:text-4xl">{t.ctaTitle}</h2>
            <p className="mt-4 max-w-[60ch] leading-7 text-muted">{t.ctaText}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={href}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-signal px-6 text-sm font-semibold text-white transition hover:bg-signal-deep"
            >
              {t.ctaPrimary}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
            <a
              href={siteConfig.phoneHref}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-line px-6 text-sm font-semibold text-ink transition hover:border-ink"
            >
              <Phone className="size-4" aria-hidden="true" />
              <span className="tabular">{siteConfig.phone}</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

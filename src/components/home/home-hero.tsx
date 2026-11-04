import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { fireServices } from "@/data/fire-services";
import { licenses } from "@/data/licenses";
import { homeCopy } from "@/data/translations/home";
import { localizedPath, type Locale } from "@/lib/i18n";

export function HomeHero({ locale }: { locale: Locale }) {
  const t = homeCopy[locale];
  const zones = fireServices.filter((service) => service.group === "fire").slice(0, 7);

  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="panel-grid absolute inset-0" aria-hidden="true" />

      <Container className="relative py-14 md:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
          <div className="min-w-0">
            <p className="eyebrow text-brass">{t.heroEyebrow}</p>

            <h1 className="mt-6 max-w-[16ch] font-display text-[2.4rem] leading-[1.06] font-medium md:text-6xl lg:text-[4.1rem]">
              {t.heroTitle}
            </h1>

            <p className="mt-6 max-w-[58ch] text-base leading-8 text-white/70 md:text-lg">
              {t.heroText}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href={localizedPath("/contact", locale)}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-signal px-6 text-sm font-semibold transition hover:bg-signal-deep"
              >
                {t.heroPrimary}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href={localizedPath("/licenses", locale)}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/20 px-6 text-sm font-semibold transition hover:border-white/50"
              >
                {t.heroSecondary}
              </Link>
            </div>

            <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-6">
              {licenses.map((license) => (
                <div key={license.id} className="flex items-baseline gap-3">
                  <dt className="text-xs text-white/50">{license.short[locale]}</dt>
                  <dd className="font-mono text-sm text-white">{license.number}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Fire alarm control panel motif: each zone is a service line */}
          <div
            className="min-w-0 rounded-lg border border-white/12 bg-ink-2/90 shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
            aria-label={t.panelTitle}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <p className="eyebrow text-white/60">{t.panelTitle}</p>
              <p className="flex items-center gap-2 font-mono text-[11px] text-ok">
                <span className="khatt-zone-dot size-2 rounded-full bg-ok" aria-hidden="true" />
                {t.panelStatus}: {t.panelNormal}
              </p>
            </div>

            <ul className="divide-y divide-white/[0.07]">
              {zones.map((zone) => (
                <li key={zone.id}>
                  <Link
                    href={`${localizedPath("/services", locale)}#${zone.id}`}
                    className="group flex items-center gap-4 px-5 py-3.5 transition hover:bg-white/[0.04]"
                  >
                    <span className="w-10 shrink-0 font-mono text-[11px] text-white/40">
                      {zone.zone}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-sm text-white/85 group-hover:text-white">
                      {zone.content[locale].title}
                    </span>
                    <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-white/40">
                      <span className="size-1.5 rounded-full bg-ok" aria-hidden="true" />
                      {t.panelNormal}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between gap-4 border-t border-white/10 px-5 py-4">
              <span className="flex items-center gap-2 text-xs text-white/60">
                <span className="size-2 rounded-full bg-signal" aria-hidden="true" />
                {t.panelFooter}
              </span>
              <span className="font-mono text-[11px] text-white/50">VÖEN 1606085751</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

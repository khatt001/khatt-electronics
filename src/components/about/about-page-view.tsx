import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Container } from "@/components/layout/container";
import {
  aboutTranslations,
  type AboutLocale,
} from "@/data/translations/about";
import { localizedPath } from "@/lib/i18n";

type AboutPageViewProps = {
  locale?: AboutLocale;
};

export function AboutPageView({ locale = "az" }: AboutPageViewProps) {
  const t = aboutTranslations[locale];

  const DarkCardIcon = t.darkCardIcon;
  const UsersIcon = t.usersIcon;
  const ShieldIcon = t.shieldIcon;

  return (
    <div className="min-h-screen bg-[#f5f6f8]">
      {/* Compact page introduction */}
      <section className="border-b border-neutral-200 bg-white">
        <Container className="py-8 md:py-10 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                {t.eyebrow}
              </p>

              <h1 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-neutral-950 md:text-4xl lg:text-5xl">
                {t.title}
              </h1>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-neutral-600 md:text-base">
                {t.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={localizedPath("/contact", locale)}
                  className="inline-flex items-center rounded-lg bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  {t.contactButton}

                  <ArrowRight
                    className="ml-2 size-4"
                    aria-hidden="true"
                  />
                </Link>

                <Link
                  href={localizedPath("/services", locale)}
                  className="inline-flex items-center rounded-lg border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:border-neutral-950"
                >
                  {t.servicesButton}
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-neutral-950 p-6 text-white shadow-sm md:p-7">
              <div className="absolute -right-16 -top-16 size-48 rounded-full bg-emerald-500/20 blur-3xl" />

              <div className="relative z-10">
                <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-600">
                  <DarkCardIcon className="size-5" aria-hidden="true" />
                </div>

                <h2 className="mt-5 text-xl font-semibold md:text-2xl">
                  {t.darkCardTitle}
                </h2>

                <p className="mt-3 text-sm leading-7 text-white/65">
                  {t.darkCardDescription}
                </p>

                <div className="mt-6 grid grid-cols-3 gap-2">
                  {t.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl border border-white/10 bg-white/5 p-3"
                    >
                      <p className="text-xl font-semibold md:text-2xl">
                        {stat.value}
                      </p>

                      <p className="mt-1 text-[11px] leading-4 text-white/50">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Company values */}
      <section className="py-8 md:py-10">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {t.values.map((value) => {
              const Icon = value.icon;

              return (
                <article
                  key={value.title}
                  className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>

                  <h2 className="mt-5 text-lg font-semibold text-neutral-950">
                    {value.title}
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-neutral-600">
                    {value.description}
                  </p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Capabilities */}
      <section className="pb-8 md:pb-12">
        <Container>
          <div className="grid gap-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm lg:grid-cols-[0.8fr_1fr] lg:p-8">
            <div>
              <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <ShieldIcon className="size-5" aria-hidden="true" />
              </div>

              <h2 className="mt-5 text-2xl font-semibold tracking-tight text-neutral-950 md:text-3xl">
                {t.capabilitiesTitle}
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-600 md:text-base">
                {t.capabilitiesDescription}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {t.capabilities.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm leading-6 text-neutral-700"
                >
                  <CheckCircle2
                    className="mt-0.5 size-4 shrink-0 text-emerald-600"
                    aria-hidden="true"
                  />

                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="mt-6 overflow-hidden rounded-2xl bg-neutral-950 p-6 text-white shadow-sm lg:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="flex items-center gap-3">
                  <UsersIcon className="size-5" aria-hidden="true" />

                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
                    {t.collaborationEyebrow}
                  </p>
                </div>

                <h2 className="mt-4 text-2xl font-semibold md:text-3xl">
                  {t.collaborationTitle}
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-white/65 md:text-base">
                  {t.collaborationDescription}
                </p>
              </div>

              <Link
                href={localizedPath("/contact", locale)}
                className="inline-flex justify-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-emerald-100"
              >
                {t.quoteButton}
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
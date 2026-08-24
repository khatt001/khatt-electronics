import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  ChevronRight,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import {
  aboutTranslations,
  type AboutLocale,
} from "@/data/translations/about";
import { localizedPath } from "@/lib/i18n";

type AboutPageViewProps = {
  locale?: AboutLocale;
};

export function AboutPageView({
  locale = "az",
}: AboutPageViewProps) {
  const t = aboutTranslations[locale];

  const UsersIcon = t.usersIcon;
  const ShieldIcon = t.shieldIcon;

  return (
    <div className="min-h-screen bg-white">
      <section className="border-b border-neutral-200 bg-white">
        <Container className="py-14 md:py-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
                {t.eyebrow}
              </p>

              <h1 className="mt-5 max-w-4xl font-serif text-4xl leading-[1.05] tracking-[-0.04em] text-neutral-950 md:text-5xl lg:text-[58px]">
                {t.title}
              </h1>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-neutral-600 md:text-base">
                {t.description}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={localizedPath("/contact", locale)}
                  className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-neutral-950 px-6 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  {t.contactButton}

                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>

                <Link
                  href={localizedPath("/services", locale)}
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-neutral-300 px-6 text-sm font-semibold text-neutral-950 transition hover:border-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  {t.servicesButton}
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-neutral-950 p-7 text-white md:p-9 lg:p-10">
              <div
                aria-hidden="true"
                className="absolute -bottom-20 -right-16 size-64 rounded-full border border-white/[0.05]"
              />

              <div
                aria-hidden="true"
                className="absolute -bottom-10 -right-8 size-40 rounded-full border border-white/[0.05]"
              />

              <div className="relative">
                <span className="flex size-12 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-400">
                  <ShieldIcon aria-hidden="true" className="size-5" />
                </span>

                <h2 className="mt-7 font-serif text-3xl leading-tight tracking-[-0.03em]">
                  {t.darkCardTitle}
                </h2>

                <p className="mt-5 text-sm leading-7 text-white/55">
                  {t.darkCardDescription}
                </p>

                <div className="mt-8 border-t border-white/10">
                  {t.darkCardItems.map((item) => (
                    <div
                      key={item}
                      className="flex min-h-14 items-center gap-3 border-b border-white/10 text-sm text-white/75 last:border-b-0"
                    >
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-emerald-400/50 text-emerald-400">
                        <Check
                          aria-hidden="true"
                          className="size-3"
                          strokeWidth={2.5}
                        />
                      </span>

                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#f4f5f2] py-16 md:py-20 lg:py-24">
        <Container>
          <div className="mb-10 max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
              {t.valuesEyebrow}
            </p>

            <h2 className="mt-4 font-serif text-3xl leading-tight tracking-[-0.035em] text-neutral-950 md:text-4xl">
              {t.valuesTitle}
            </h2>
          </div>

          <div className="grid overflow-hidden rounded-2xl border border-neutral-300 bg-neutral-300 md:grid-cols-3">
            {t.values.map((value) => {
              const Icon = value.icon;

              return (
                <article
                  key={value.title}
                  className="group min-h-72 bg-white p-7 transition-colors hover:bg-emerald-50/50 md:p-8"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex size-12 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-700 transition group-hover:border-emerald-200 group-hover:bg-white group-hover:text-emerald-700">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>

                    <ChevronRight
                      aria-hidden="true"
                      className="mt-2 size-4 text-neutral-300 transition-transform group-hover:translate-x-1 group-hover:text-emerald-700"
                    />
                  </div>

                  <h3 className="mt-9 text-xl font-semibold tracking-tight text-neutral-950">
                    {value.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-neutral-600">
                    {value.description}
                  </p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 md:py-20 lg:py-24">
        <Container>
          <div className="grid overflow-hidden rounded-2xl border border-neutral-300 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="border-b border-neutral-200 bg-neutral-50 p-7 md:p-10 lg:border-b-0 lg:border-r lg:p-12">
              <span className="flex size-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <ShieldIcon aria-hidden="true" className="size-5" />
              </span>

              <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
                {t.capabilitiesEyebrow}
              </p>

              <h2 className="mt-4 font-serif text-3xl leading-tight tracking-[-0.035em] text-neutral-950 md:text-4xl">
                {t.capabilitiesTitle}
              </h2>

              <p className="mt-5 text-sm leading-7 text-neutral-600 md:text-base">
                {t.capabilitiesDescription}
              </p>
            </div>

            <div className="grid sm:grid-cols-2">
              {t.capabilities.map((item) => (
                <div
                  key={item}
                  className="group flex min-h-32 items-start gap-4 border-b border-neutral-200 p-6 transition-colors hover:bg-emerald-50/50 sm:border-r md:p-8"
                >
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-emerald-600 text-emerald-700">
                    <Check
                      aria-hidden="true"
                      className="size-3.5"
                      strokeWidth={2.5}
                    />
                  </span>

                  <p className="text-sm font-semibold leading-7 text-neutral-800">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-neutral-200 bg-[#f4f5f2] py-16 md:py-20">
        <Container>
          <div className="grid gap-8 rounded-2xl bg-neutral-950 p-7 text-white md:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:p-12">
            <div>
              <div className="flex items-center gap-3">
                <UsersIcon
                  aria-hidden="true"
                  className="size-5 text-emerald-400"
                />

                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-400">
                  {t.collaborationEyebrow}
                </p>
              </div>

              <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight tracking-[-0.035em] md:text-4xl">
                {t.collaborationTitle}
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/55 md:text-base">
                {t.collaborationDescription}
              </p>
            </div>

            <Link
              href={localizedPath("/contact", locale)}
              className="group inline-flex min-h-12 w-fit items-center justify-center gap-3 rounded-xl bg-emerald-600 px-6 text-sm font-semibold text-white transition hover:bg-emerald-500"
            >
              {t.quoteButton}

              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
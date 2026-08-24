import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  ChevronRight,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import {
  servicesPageTranslations,
  type ServicesPageLocale,
} from "@/data/translations/services-page";
import { localizedPath } from "@/lib/i18n";

type ServicesPageViewProps = {
  locale?: ServicesPageLocale;
};

export function ServicesPageView({
  locale = "az",
}: ServicesPageViewProps) {
  const t = servicesPageTranslations[locale];

  return (
    <div className="min-h-screen bg-white">
      <section className="border-b border-neutral-200 bg-white">
        <Container className="py-14 md:py-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
                {t.eyebrow}
              </p>

              <h1 className="mt-5 max-w-4xl font-serif text-4xl leading-[1.05] tracking-[-0.04em] text-neutral-950 md:text-5xl lg:text-[58px]">
                {t.title}
              </h1>
            </div>

            <div className="lg:pb-1">
              <p className="max-w-xl text-sm leading-7 text-neutral-600 md:text-base">
                {t.description}
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={localizedPath("/contact", locale)}
                  className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-neutral-950 px-6 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  {t.quoteButton}

                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>

                <Link
                  href={localizedPath("/solutions", locale)}
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-neutral-300 px-6 text-sm font-semibold text-neutral-950 transition hover:border-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  {t.productsButton}
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#f4f5f2] py-16 md:py-20 lg:py-24">
        <Container>
          <div className="mb-10 grid gap-6 border-b border-neutral-300 pb-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
                {t.servicesLabel}
              </p>

              <h2 className="mt-4 font-serif text-3xl tracking-[-0.035em] text-neutral-950 md:text-4xl">
                {t.servicesTitle}
              </h2>
            </div>

            <p className="max-w-2xl text-sm leading-7 text-neutral-600 md:text-base lg:justify-self-end">
              {t.servicesDescription}
            </p>
          </div>

          <div className="grid overflow-hidden rounded-2xl border border-neutral-300 bg-neutral-300 shadow-[0_18px_50px_rgba(0,0,0,0.05)] md:grid-cols-2 xl:grid-cols-3">
            {t.services.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.title}
                  className="group flex min-h-[340px] flex-col bg-white p-6 transition-colors hover:bg-emerald-50/50 md:p-7"
                >
                  <div className="flex items-start justify-between gap-5">
                    <span className="flex size-12 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-700 transition group-hover:border-emerald-200 group-hover:bg-white group-hover:text-emerald-700">
                      <Icon aria-hidden="true" className="size-[21px]" />
                    </span>

                    <ChevronRight
                      aria-hidden="true"
                      className="mt-2 size-4 text-neutral-300 transition-transform group-hover:translate-x-1 group-hover:text-emerald-700"
                    />
                  </div>

                  <h3 className="mt-7 text-xl font-semibold tracking-tight text-neutral-950">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-neutral-600">
                    {service.description}
                  </p>

                  <div className="mt-auto space-y-3 border-t border-neutral-200 pt-6">
                    {service.items.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 text-sm leading-6 text-neutral-700"
                      >
                        <span className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full border border-emerald-600 text-emerald-700">
                          <Check
                            aria-hidden="true"
                            className="size-2.5"
                            strokeWidth={2.5}
                          />
                        </span>

                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 md:py-20">
        <Container>
          <div className="overflow-hidden rounded-2xl bg-neutral-950 text-white">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              <div className="border-b border-white/10 p-7 md:p-10 lg:border-b-0 lg:border-r lg:p-12">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-400">
                  {t.processEyebrow}
                </p>

                <h2 className="mt-5 max-w-xl font-serif text-3xl leading-[1.1] tracking-[-0.035em] md:text-4xl">
                  {t.processTitle}
                </h2>

                <p className="mt-5 max-w-xl text-sm leading-7 text-white/55 md:text-base">
                  {t.processDescription}
                </p>

                <Link
                  href={localizedPath("/contact", locale)}
                  className="group mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-emerald-600 px-6 text-sm font-semibold text-white transition hover:bg-emerald-500"
                >
                  {t.quoteButton}

                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </div>

              <div className="grid sm:grid-cols-2">
                {t.processSteps.map((step) => (
                  <div
                    key={step}
                    className="flex min-h-36 items-start gap-4 border-b border-white/10 p-6 last:border-b-0 sm:border-r sm:p-8"
                  >
                    <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-400">
                      <Check
                        aria-hidden="true"
                        className="size-3.5"
                        strokeWidth={2.5}
                      />
                    </span>

                    <p className="text-sm font-medium leading-7 text-white/75">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
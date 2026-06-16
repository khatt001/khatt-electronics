import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

import { Container } from "@/components/layout/container";
import {
  solutionsPageTranslations,
  type SolutionsPageLocale,
} from "@/data/translations/solutions-page";
import { localizedPath } from "@/lib/i18n";

type SolutionsPageViewProps = {
  locale?: SolutionsPageLocale;
};

export function SolutionsPageView({
  locale = "az",
}: SolutionsPageViewProps) {
  const t = solutionsPageTranslations[locale];

  return (
    <div className="min-h-screen bg-[#f5f6f8]">
      {/* Compact page introduction */}
      <section className="border-b border-neutral-200 bg-white">
        <Container className="py-8 md:py-10 lg:py-12">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
              {t.eyebrow}
            </p>

            <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-neutral-950 md:text-4xl lg:text-5xl">
              {t.title}
            </h1>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-neutral-600 md:text-base">
              {t.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={localizedPath("/contact", locale)}
                className="group inline-flex items-center rounded-lg bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                {t.quoteButton}

                <ArrowRight
                  className="ml-2 size-4 transition group-hover:translate-x-1"
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
        </Container>
      </section>

      {/* Solutions grid */}
      <section className="py-8 md:py-10 lg:py-12">
        <Container>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {t.solutions.map((solution) => {
              const Icon = solution.icon;

              return (
                <article
                  key={solution.title}
                  className="group flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-md"
                >
                  <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-600 group-hover:text-white">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>

                  <h2 className="mt-5 text-lg font-semibold text-neutral-950 md:text-xl">
                    {solution.title}
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-neutral-600">
                    {solution.description}
                  </p>

                  <div className="mt-5 space-y-3 border-t border-neutral-100 pt-5">
                    {solution.items.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 text-sm leading-6 text-neutral-700"
                      >
                        <CheckCircle2
                          className="mt-0.5 size-4 shrink-0 text-emerald-600"
                          aria-hidden="true"
                        />

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

      {/* Planning process */}
      <section className="pb-10 md:pb-14">
        <Container>
          <div className="relative overflow-hidden rounded-2xl bg-neutral-950 p-6 text-white shadow-sm md:p-8 lg:p-10">
            <div className="absolute -right-20 -top-20 size-64 rounded-full bg-emerald-500/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-20 size-64 rounded-full bg-emerald-900/30 blur-3xl" />

            <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(320px,1fr)] lg:items-start">
              <div>
                <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-600 text-white">
                  <ShieldCheck className="size-5" aria-hidden="true" />
                </div>

                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
                  Planlaşdırma prosesi
                </p>

                <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-tight md:text-3xl lg:text-4xl">
                  {t.planningTitle}
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65 md:text-base">
                  {t.planningDescription}
                </p>

                <Link
                  href={localizedPath("/contact", locale)}
                  className="mt-6 inline-flex items-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-emerald-100"
                >
                  {t.quoteButton}

                  <ArrowRight
                    className="ml-2 size-4"
                    aria-hidden="true"
                  />
                </Link>
              </div>

              <div className="space-y-3">
                {t.steps.map((step, index) => (
                  <div
                    key={step}
                    className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-4"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-sm font-semibold text-white">
                      {index + 1}
                    </span>

                    <p className="pt-1 text-sm leading-6 text-white/75">
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
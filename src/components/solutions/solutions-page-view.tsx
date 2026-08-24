import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { SolutionsExplorer } from "@/components/solutions/solutions-explorer";
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
    <div className="min-h-screen bg-white">
      <section className="border-b border-neutral-200 bg-white">
        <Container className="py-12 md:py-16">
          <div className="max-w-5xl">
            <div className="flex items-center gap-3">
              <span
                className="h-px w-10 bg-emerald-700"
                aria-hidden="true"
              />

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800">
                {t.eyebrow}
              </p>
            </div>

            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-neutral-950 md:text-5xl lg:text-6xl">
              {t.title}
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-neutral-600 md:text-lg">
              {t.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`${localizedPath(
                  "/contact",
                  locale,
                )}?source=estimate`}
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                {t.quoteButton}

                <ArrowRight
                  className="ml-2 size-4"
                  aria-hidden="true"
                />
              </Link>

              <Link
                href={localizedPath("/services", locale)}
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:border-neutral-950"
              >
                {t.servicesButton}
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#f6f7f5] py-10 md:py-14 lg:py-16">
        <Container>
          <SolutionsExplorer
            solutions={t.solutions}
            scopeLabel={t.scopeLabel}
          />
        </Container>
      </section>

      <section className="bg-neutral-950 py-14 text-white md:py-20">
        <Container>
          <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
                {t.ctaEyebrow}
              </p>

              <h2 className="mt-5 max-w-4xl text-3xl font-semibold leading-tight tracking-[-0.035em] md:text-4xl lg:text-5xl">
                {t.ctaTitle}
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/60 md:text-base">
                {t.ctaDescription}
              </p>
            </div>

            <Link
              href={`${localizedPath(
                "/contact",
                locale,
              )}?source=estimate`}
              className="inline-flex min-h-12 w-fit items-center justify-center rounded-lg bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
            >
              {t.quoteButton}

              <ArrowRight
                className="ml-2 size-4"
                aria-hidden="true"
              />
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
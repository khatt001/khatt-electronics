import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { projectsTranslations } from "@/data/translations/projects";
import { localizedPath, type Locale } from "@/lib/i18n";

type ProjectsPageViewProps = {
  locale?: Locale;
};

export function ProjectsPageView({
  locale = "az",
}: ProjectsPageViewProps) {
  const t = projectsTranslations[locale];

  const contactHref = `${localizedPath(
    "/contact",
    locale,
  )}?source=project`;

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
                  href={contactHref}
                  className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-neutral-950 px-6 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  {t.quoteButton}

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
          </div>
        </Container>
      </section>

      <section className="bg-[#f4f5f2] py-16 md:py-20 lg:py-24">
        <Container>
          <div className="mb-10 grid gap-6 border-b border-neutral-300 pb-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
                {t.directionsEyebrow}
              </p>

              <h2 className="mt-4 font-serif text-3xl leading-tight tracking-[-0.035em] text-neutral-950 md:text-4xl">
                {t.directionsTitle}
              </h2>
            </div>

            <p className="max-w-2xl text-sm leading-7 text-neutral-600 md:text-base lg:justify-self-end">
              {t.directionsDescription}
            </p>
          </div>

          <div className="grid overflow-hidden rounded-2xl border border-neutral-300 bg-neutral-300 shadow-[0_18px_50px_rgba(0,0,0,0.05)] md:grid-cols-2 xl:grid-cols-3">
            {t.projects.map((project, index) => {
              const Icon = project.icon;
              const isFeatured = index === 0;

              return (
                <article
                  key={project.title}
                  className={
                    isFeatured
                      ? "group flex min-h-[390px] flex-col bg-neutral-950 p-7 text-white md:p-8"
                      : "group flex min-h-[390px] flex-col bg-white p-7 transition-colors hover:bg-emerald-50/50 md:p-8"
                  }
                >
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={
                        isFeatured
                          ? "flex size-12 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-400"
                          : "flex size-12 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-700 transition group-hover:border-emerald-200 group-hover:bg-white group-hover:text-emerald-700"
                      }
                    >
                      <Icon aria-hidden="true" className="size-5" />
                    </span>

                    <span
                      className={
                        isFeatured
                          ? "rounded-full border border-white/15 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/60"
                          : "rounded-full border border-neutral-200 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-500"
                      }
                    >
                      {project.type}
                    </span>
                  </div>

                  <h3 className="mt-8 text-xl font-semibold tracking-tight">
                    {project.title}
                  </h3>

                  <p
                    className={
                      isFeatured
                        ? "mt-4 text-sm leading-7 text-white/55"
                        : "mt-4 text-sm leading-7 text-neutral-600"
                    }
                  >
                    {project.description}
                  </p>

                  <div
                    className={
                      isFeatured
                        ? "mt-auto space-y-3 border-t border-white/10 pt-6"
                        : "mt-auto space-y-3 border-t border-neutral-200 pt-6"
                    }
                  >
                    {project.items.map((item) => (
                      <div
                        key={item}
                        className={
                          isFeatured
                            ? "flex items-start gap-3 text-sm leading-6 text-white/75"
                            : "flex items-start gap-3 text-sm leading-6 text-neutral-700"
                        }
                      >
                        <span
                          className={
                            isFeatured
                              ? "mt-1 flex size-4 shrink-0 items-center justify-center rounded-full border border-emerald-400/60 text-emerald-400"
                              : "mt-1 flex size-4 shrink-0 items-center justify-center rounded-full border border-emerald-600 text-emerald-700"
                          }
                        >
                          <Check
                            aria-hidden="true"
                            className="size-2.5"
                            strokeWidth={2.5}
                          />
                        </span>

                        {item}
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

                <h2 className="mt-5 font-serif text-3xl leading-[1.1] tracking-[-0.035em] md:text-4xl">
                  {t.processTitle}
                </h2>

                <p className="mt-5 text-sm leading-7 text-white/55 md:text-base">
                  {t.processDescription}
                </p>
              </div>

              <div className="grid sm:grid-cols-2">
                {t.processSteps.map((step) => (
                  <div
                    key={step}
                    className="flex min-h-36 items-start gap-4 border-b border-white/10 p-6 sm:border-r md:p-8"
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

            <div className="grid gap-6 border-t border-white/10 p-7 md:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:p-12">
              <div>
                <h2 className="font-serif text-2xl tracking-[-0.03em] md:text-3xl">
                  {t.ctaTitle}
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55">
                  {t.ctaDescription}
                </p>
              </div>

              <Link
                href={contactHref}
                className="group inline-flex min-h-12 w-fit items-center justify-center gap-3 rounded-xl bg-emerald-600 px-6 text-sm font-semibold text-white transition hover:bg-emerald-500"
              >
                {t.ctaButton}

                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
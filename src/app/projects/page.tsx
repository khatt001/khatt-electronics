import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/layout/container";
import { projectsTranslations } from "@/data/translations/projects";

const t = projectsTranslations.az;

export const metadata: Metadata = {
  title: t.metadataTitle,
  description: t.metadataDescription,
  alternates: {
    canonical: "/projects",
    languages: {
      az: "/projects",
      en: "/en/projects",
      ru: "/ru/projects",
    },
  },
};

export default function ProjectsPage() {
  const CtaIcon = t.ctaIcon;
  const CameraIcon = t.cameraIcon;
  const NetworkIcon = t.networkIcon;

  return (
    <main className="min-h-screen bg-[#f6f6f4] pt-16 lg:pt-[8.25rem] xl:pt-[7.5rem]">
      <section className="border-b border-black/10 bg-white">
        <Container className="py-12 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-neutral-400">
                {t.eyebrow}
              </p>
              <h1 className="mt-3 text-4xl font-semibold leading-tight text-neutral-950 md:text-6xl">
                {t.title}
              </h1>
              <p className="mt-5 max-w-3xl leading-8 text-neutral-600">
                {t.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact?source=project"
                  className="inline-flex items-center rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
                >
                  {t.quoteButton}
                  <ArrowRight className="ml-2 size-4" aria-hidden="true" />
                </Link>

                <Link
                  href="/services"
                  className="inline-flex items-center rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:border-neutral-950"
                >
                  {t.servicesButton}
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-neutral-200 bg-neutral-950 p-6 text-white shadow-sm">
              <CtaIcon className="size-9 text-emerald-300" aria-hidden="true" />
              <h2 className="mt-5 text-2xl font-semibold">{t.ctaTitle}</h2>
              <p className="mt-3 text-sm leading-7 text-white/65">
                {t.ctaDescription}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <CameraIcon className="size-5 text-emerald-300" aria-hidden="true" />
                  <p className="mt-3 text-xs leading-5 text-white/60">
                    CCTV və təhlükəsizlik planlaması
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <NetworkIcon className="size-5 text-emerald-300" aria-hidden="true" />
                  <p className="mt-3 text-xs leading-5 text-white/60">
                    Şəbəkə və infrastruktur yanaşması
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-10 lg:py-14">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {t.projects.map((project) => {
              const Icon = project.icon;

              return (
                <article
                  key={project.title}
                  className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-neutral-950 text-white">
                      <Icon className="size-6" aria-hidden="true" />
                    </div>
                    <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
                      {project.type}
                    </span>
                  </div>

                  <h2 className="mt-5 text-xl font-semibold text-neutral-950">
                    {project.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-neutral-600">
                    {project.description}
                  </p>

                  <div className="mt-5 space-y-3">
                    {project.items.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-2 text-sm text-neutral-700"
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

      <section className="pb-16 lg:pb-24">
        <Container>
          <div className="grid gap-8 rounded-[2rem] border border-neutral-200 bg-neutral-950 p-6 text-white shadow-sm lg:grid-cols-[0.8fr_1fr] lg:p-10">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-white/40">
                {t.processEyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-semibold">
                {t.processTitle}
              </h2>
              <p className="mt-4 leading-8 text-white/65">
                {t.processDescription}
              </p>
            </div>

            <div className="space-y-3">
              {t.processSteps.map((step, index) => (
                <div
                  key={step}
                  className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-neutral-950">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-6 text-white/75">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 text-center shadow-sm lg:p-10">
            <h2 className="text-3xl font-semibold text-neutral-950">
              {t.ctaTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-8 text-neutral-600">
              {t.ctaDescription}
            </p>
            <Link
              href="/contact?source=project"
              className="mt-6 inline-flex rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              {t.ctaButton}
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
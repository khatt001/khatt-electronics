import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/layout/container";
import { servicesTranslations } from "@/data/translations/services";

const t = servicesTranslations.ru;

export const metadata: Metadata = {
  title: t.metadataTitle,
  description: t.metadataDescription,
  alternates: {
    canonical: "/ru/services",
    languages: {
      az: "/services",
      en: "/en/services",
      ru: "/ru/services",
    },
  },
};

export default function RussianServicesPage() {
  return (
    <main className="min-h-screen bg-[#f6f6f4] pt-16 lg:pt-[8.25rem] xl:pt-[7.5rem]">
      <section className="border-b border-black/10 bg-white">
        <Container className="py-12 lg:py-16">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.28em] text-neutral-400">
              {t.eyebrow}
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight text-neutral-950 md:text-6xl">
              {t.title}
            </h1>
            <p className="mt-5 leading-8 text-neutral-600">
              {t.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/ru/contact?source=estimate"
                className="inline-flex items-center rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                {t.quoteButton}
                <ArrowRight className="ml-2 size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/ru/products"
                className="inline-flex items-center rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:border-neutral-950"
              >
                {t.productsButton}
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-10 lg:py-14">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {t.services.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.title}
                  className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-neutral-950 text-white">
                    <Icon className="size-6" aria-hidden="true" />
                  </div>

                  <h2 className="mt-5 text-xl font-semibold text-neutral-950">
                    {service.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-neutral-600">
                    {service.description}
                  </p>

                  <div className="mt-5 space-y-3">
                    {service.items.map((item) => (
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
          <div className="grid gap-8 rounded-[2rem] border border-neutral-200 bg-neutral-950 p-6 text-white shadow-sm lg:grid-cols-[1fr_0.8fr] lg:p-10">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-white/40">
                {t.processEyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
                {t.processTitle}
              </h2>
              <p className="mt-4 max-w-2xl leading-8 text-white/65">
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
        </Container>
      </section>
    </main>
  );
}
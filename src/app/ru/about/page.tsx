import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/layout/container";
import { aboutTranslations } from "@/data/translations/about";

const t = aboutTranslations.ru;

export const metadata: Metadata = {
  title: t.metadataTitle,
  description: t.metadataDescription,
  alternates: {
    canonical: "/ru/about",
    languages: {
      az: "/about",
      en: "/en/about",
      ru: "/ru/about",
    },
  },
};

export default function RussianAboutPage() {
  const DarkCardIcon = t.darkCardIcon;
  const ShieldIcon = t.shieldIcon;
  const UsersIcon = t.usersIcon;

  return (
    <main className="min-h-screen bg-[#f6f6f4] pt-16 lg:pt-[8.25rem] xl:pt-[7.5rem]">
      <section className="border-b border-black/10 bg-white">
        <Container className="py-12 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:items-center">
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
                  href="/ru/contact"
                  className="inline-flex items-center rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
                >
                  {t.contactButton}
                  <ArrowRight className="ml-2 size-4" aria-hidden="true" />
                </Link>

                <Link
                  href="/ru/services"
                  className="inline-flex items-center rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:border-neutral-950"
                >
                  {t.servicesButton}
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-neutral-200 bg-neutral-950 p-6 text-white shadow-sm">
              <DarkCardIcon className="size-8" aria-hidden="true" />
              <h2 className="mt-5 text-2xl font-semibold">
                {t.darkCardTitle}
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/65">
                {t.darkCardDescription}
              </p>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {t.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <p className="text-2xl font-semibold">{stat.value}</p>
                    <p className="mt-1 text-xs leading-5 text-white/50">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-10 lg:py-14">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {t.values.map((value) => {
              const Icon = value.icon;

              return (
                <article
                  key={value.title}
                  className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-neutral-950 text-white">
                    <Icon className="size-6" aria-hidden="true" />
                  </div>

                  <h2 className="mt-5 text-xl font-semibold text-neutral-950">
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

      <section className="pb-16 lg:pb-24">
        <Container>
          <div className="grid gap-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm lg:grid-cols-[0.8fr_1fr] lg:p-10">
            <div>
              <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                <ShieldIcon className="size-6" aria-hidden="true" />
              </div>
              <h2 className="mt-5 text-3xl font-semibold text-neutral-950">
                {t.capabilitiesTitle}
              </h2>
              <p className="mt-4 leading-8 text-neutral-600">
                {t.capabilitiesDescription}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {t.capabilities.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-700"
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

          <div className="mt-8 rounded-[2rem] border border-neutral-200 bg-neutral-950 p-6 text-white shadow-sm lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="flex items-center gap-3">
                  <UsersIcon className="size-6" aria-hidden="true" />
                  <p className="text-xs uppercase tracking-[0.28em] text-white/40">
                    {t.collaborationEyebrow}
                  </p>
                </div>
                <h2 className="mt-4 text-3xl font-semibold">
                  {t.collaborationTitle}
                </h2>
                <p className="mt-4 max-w-2xl leading-8 text-white/65">
                  {t.collaborationDescription}
                </p>
              </div>

              <Link
                href="/ru/contact?source=estimate"
                className="inline-flex justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-100"
              >
                {t.quoteButton}
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
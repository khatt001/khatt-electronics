import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { createInquiry } from "@/app/contact/actions";
import { ContactSubmitButton } from "@/app/contact/submit-button";
import { Container } from "@/components/layout/container";
import { TurnstileWidget } from "@/components/contact/turnstile-widget";
import { siteConfig } from "@/data/site";
import { contactTranslations } from "@/data/translations/contact";
import { localizedPath, type Locale } from "@/lib/i18n";

export type ContactSearchParams = {
  success?: string;
  error?: string;
  product?: string;
  source?: string;
};

type ContactPageViewProps = {
  locale?: Locale;
  query: ContactSearchParams;
};

function getSourceLabel(source: string | undefined, locale: Locale) {
  const t = contactTranslations[locale];

  if (source === "estimate") return t.sourceEstimate;
  if (source === "consultation") return t.sourceConsultation;

  return t.sourceGeneral;
}

function getDefaultSource(locale: Locale) {
  if (locale === "en") return "contact_page_en";
  if (locale === "ru") return "contact_page_ru";

  return "contact_page";
}

export function ContactPageView({
  locale = "az",
  query,
}: ContactPageViewProps) {
  const t = contactTranslations[locale];

  const sourceLabel = getSourceLabel(query.source, locale);

  const defaultMessage = query.product
    ? `${sourceLabel}: ${query.product}`
    : "";

  return (
    <div className="min-h-screen bg-[#f5f6f8]">
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
          </div>
        </Container>
      </section>

      <section className="py-8 md:py-10 lg:py-12">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm md:p-7 lg:p-8">
              <div className="mb-6 border-b border-neutral-100 pb-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  Sorğu forması
                </p>

                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950">
                  {t.formTitle}
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-500">
                  {t.formDescription}
                </p>
              </div>

              {query.success ? (
                <div className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-700">
                  <CheckCircle2
                    className="mt-0.5 size-5 shrink-0"
                    aria-hidden="true"
                  />

                  <span>{t.successMessage}</span>
                </div>
              ) : null}

              {query.error ? (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700">
                  {decodeURIComponent(query.error)}
                </div>
              ) : null}

              {query.product ? (
                <div className="mb-6 rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm leading-6 text-neutral-700">
                  {t.productLabel}{" "}
                  <span className="font-semibold text-neutral-950">
                    {query.product}
                  </span>
                </div>
              ) : null}

              <form action={createInquiry} className="space-y-5">
                <input
                  type="hidden"
                  name="source"
                  value={query.source ?? getDefaultSource(locale)}
                />
                <input type="hidden" name="locale" value={locale} />
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="full_name"
                      className="mb-2 block text-sm font-medium text-neutral-800"
                    >
                      {t.fullNameLabel}
                    </label>

                    <input
                      id="full_name"
                      name="full_name"
                      required
                      minLength={2}
                      autoComplete="name"
                      placeholder={t.fullNamePlaceholder}
                      className="h-12 w-full rounded-lg border border-neutral-300 bg-white px-4 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-medium text-neutral-800"
                    >
                      {t.phoneLabel}
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder={t.phonePlaceholder}
                      className="h-12 w-full rounded-lg border border-neutral-300 bg-white px-4 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10"
                    />
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-neutral-800"
                    >
                      {t.emailLabel}
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder={t.emailPlaceholder}
                      className="h-12 w-full rounded-lg border border-neutral-300 bg-white px-4 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="company_name"
                      className="mb-2 block text-sm font-medium text-neutral-800"
                    >
                      {t.companyLabel}
                    </label>

                    <input
                      id="company_name"
                      name="company_name"
                      autoComplete="organization"
                      placeholder={t.companyPlaceholder}
                      className="h-12 w-full rounded-lg border border-neutral-300 bg-white px-4 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-neutral-800"
                  >
                    {t.messageLabel}
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    defaultValue={defaultMessage}
                    placeholder={t.messagePlaceholder}
                    className="w-full resize-y rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm leading-6 text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10"
                  />
                </div>

                <div className="space-y-4 border-t border-neutral-100 pt-5">
                  <TurnstileWidget />

                  <ContactSubmitButton
                    label={t.submitLabel}
                    pendingLabel={t.submitPendingLabel}
                  />
                </div>
              </form>
            </div>

            <aside className="space-y-5">
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  Birbaşa əlaqə
                </p>

                <h2 className="mt-2 text-xl font-semibold text-neutral-950">
                  {t.contactInfoTitle}
                </h2>

                <div className="mt-5 space-y-3">
                  <a
                    href={siteConfig.phoneHref}
                    className="group flex items-center gap-4 rounded-xl border border-neutral-200 p-4 text-sm transition hover:border-emerald-500 hover:bg-emerald-50/40"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-600 group-hover:text-white">
                      <Phone className="size-5" aria-hidden="true" />
                    </span>

                    <span className="min-w-0">
                      <span className="block text-xs text-neutral-500">
                        {t.phoneLabel}
                      </span>

                      <span className="mt-1 block font-medium text-neutral-950">
                        {siteConfig.phone}
                      </span>
                    </span>
                  </a>

                  <a
                    href={siteConfig.emailHref}
                    className="group flex items-center gap-4 rounded-xl border border-neutral-200 p-4 text-sm transition hover:border-emerald-500 hover:bg-emerald-50/40"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-600 group-hover:text-white">
                      <Mail className="size-5" aria-hidden="true" />
                    </span>

                    <span className="min-w-0">
                      <span className="block text-xs text-neutral-500">
                        {t.emailLabel}
                      </span>

                      <span className="mt-1 block break-all font-medium text-neutral-950">
                        {siteConfig.email}
                      </span>
                    </span>
                  </a>

                  <div className="flex items-start gap-4 rounded-xl border border-neutral-200 p-4 text-sm">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                      <MapPin className="size-5" aria-hidden="true" />
                    </span>

                    <span className="min-w-0">
                      <span className="block text-xs text-neutral-500">
                        Ünvan
                      </span>

                      <span className="mt-1 block font-medium leading-6 text-neutral-950">
                        {siteConfig.address}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl bg-neutral-950 p-6 text-white shadow-sm">
                <div className="absolute -right-16 -top-16 size-48 rounded-full bg-emerald-500/20 blur-3xl" />

                <div className="relative z-10">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-600">
                    <ShieldCheck className="size-5" aria-hidden="true" />
                  </div>

                  <h3 className="mt-5 text-xl font-semibold">
                    {t.supportTitle}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-white/65">
                    {t.supportDescription}
                  </p>

                  <div className="mt-5 space-y-3">
                    {t.supportItems.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 text-sm leading-6 text-white/75"
                      >
                        <CheckCircle2
                          className="mt-0.5 size-4 shrink-0 text-emerald-300"
                          aria-hidden="true"
                        />

                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                href={localizedPath("/products", locale)}
                className="group flex items-center justify-between rounded-2xl border border-neutral-200 bg-white p-5 text-sm font-semibold text-neutral-950 shadow-sm transition hover:border-emerald-500 hover:bg-emerald-50/40"
              >
                <span>{t.productsLink}</span>

                <span className="flex size-10 items-center justify-center rounded-lg bg-neutral-100 text-neutral-700 transition group-hover:bg-emerald-600 group-hover:text-white">
                  <ArrowRight
                    className="size-5 transition group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>

              <a
                href={siteConfig.phoneHref}
                className="group flex items-center justify-between rounded-2xl bg-emerald-600 p-5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
              >
                <span className="flex items-center gap-3">
                  <MessageCircle className="size-5" aria-hidden="true" />

                  {t.contactInfoTitle}
                </span>

                <ArrowRight
                  className="size-5 transition group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
            </aside>
          </div>
        </Container>
      </section>
    </div>
  );
}

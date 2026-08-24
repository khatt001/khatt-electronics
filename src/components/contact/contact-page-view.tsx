import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { createInquiry } from "@/app/contact/actions";
import { ContactSubmitButton } from "@/app/contact/submit-button";
import { TurnstileWidget } from "@/components/contact/turnstile-widget";
import { Container } from "@/components/layout/container";
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

function getSourceLabel(
  source: string | undefined,
  locale: Locale,
) {
  const t = contactTranslations[locale];

  if (source === "estimate") return t.sourceEstimate;
  if (source === "consultation") return t.sourceConsultation;
  if (source === "project") return t.sourceProject;

  return t.sourceGeneral;
}

function getDefaultSource(locale: Locale) {
  if (locale === "en") return "contact_page_en";
  if (locale === "ru") return "contact_page_ru";

  return "contact_page";
}

const inputClassName =
  "h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10";

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
    <div className="min-h-screen bg-white">
      <section className="border-b border-neutral-200 bg-white">
        <Container className="py-14 md:py-20 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
                {t.eyebrow}
              </p>

              <h1 className="mt-5 max-w-4xl font-serif text-4xl leading-[1.05] tracking-[-0.04em] text-neutral-950 md:text-5xl lg:text-[58px]">
                {t.title}
              </h1>
            </div>

            <p className="max-w-xl text-sm leading-7 text-neutral-600 md:text-base lg:justify-self-end">
              {t.description}
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-[#f4f5f2] py-16 md:py-20 lg:py-24">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_380px] lg:items-start">
            <div className="overflow-hidden rounded-2xl border border-neutral-300 bg-white shadow-[0_18px_50px_rgba(0,0,0,0.05)]">
              <div className="h-1 bg-emerald-600" />

              <div className="p-6 md:p-8 lg:p-10">
                <div className="mb-8 border-b border-neutral-200 pb-7">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
                    {t.formEyebrow}
                  </p>

                  <h2 className="mt-4 font-serif text-3xl tracking-[-0.03em] text-neutral-950">
                    {t.formTitle}
                  </h2>

                  <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-600">
                    {t.formDescription}
                  </p>
                </div>

                {query.success ? (
                  <div className="mb-7 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-800">
                    <CheckCircle2
                      aria-hidden="true"
                      className="mt-0.5 size-5 shrink-0"
                    />

                    <span>{t.successMessage}</span>
                  </div>
                ) : null}

                {query.error ? (
                  <div className="mb-7 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700">
                    {query.error}
                  </div>
                ) : null}

                {query.product ? (
                  <div className="mb-7 rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm leading-6 text-neutral-700">
                    {t.productLabel}{" "}
                    <span className="font-semibold text-neutral-950">
                      {query.product}
                    </span>
                  </div>
                ) : null}

                <form action={createInquiry} className="space-y-6">
                  <input
                    type="hidden"
                    name="source"
                    value={
                      query.source ?? getDefaultSource(locale)
                    }
                  />

                  <input
                    type="hidden"
                    name="locale"
                    value={locale}
                  />

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
                        className={inputClassName}
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
                        className={inputClassName}
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
                        className={inputClassName}
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
                        className={inputClassName}
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
                      className="w-full resize-y rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm leading-7 text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
                    />
                  </div>

                  <div className="space-y-5 border-t border-neutral-200 pt-6">
                    <TurnstileWidget />

                    <ContactSubmitButton
                      label={t.submitLabel}
                      pendingLabel={t.submitPendingLabel}
                    />
                  </div>
                </form>
              </div>
            </div>

            <aside className="space-y-5 lg:sticky lg:top-32">
              <div className="rounded-2xl border border-neutral-300 bg-white p-6 shadow-[0_12px_35px_rgba(0,0,0,0.04)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
                  {t.directContactLabel}
                </p>

                <h2 className="mt-3 font-serif text-2xl tracking-[-0.025em] text-neutral-950">
                  {t.contactInfoTitle}
                </h2>

                <div className="mt-6 divide-y divide-neutral-200 border-y border-neutral-200">
                  <a
                    href={siteConfig.phoneHref}
                    className="group flex min-h-20 items-center gap-4 transition hover:text-emerald-700"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                      <Phone
                        aria-hidden="true"
                        className="size-[18px]"
                      />
                    </span>

                    <span className="min-w-0">
                      <span className="block text-xs text-neutral-500">
                        {t.phoneLabel}
                      </span>

                      <span className="mt-1 block text-sm font-semibold text-neutral-950">
                        {siteConfig.phone}
                      </span>
                    </span>
                  </a>

                  <a
                    href={siteConfig.emailHref}
                    className="group flex min-h-20 items-center gap-4 transition hover:text-emerald-700"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                      <Mail
                        aria-hidden="true"
                        className="size-[18px]"
                      />
                    </span>

                    <span className="min-w-0">
                      <span className="block text-xs text-neutral-500">
                        {t.emailLabel}
                      </span>

                      <span className="mt-1 block break-all text-sm font-semibold text-neutral-950">
                        {siteConfig.email}
                      </span>
                    </span>
                  </a>

                  <div className="flex min-h-20 items-center gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                      <MapPin
                        aria-hidden="true"
                        className="size-[18px]"
                      />
                    </span>

                    <span className="min-w-0">
                      <span className="block text-xs text-neutral-500">
                        {t.addressLabel}
                      </span>

                      <span className="mt-1 block text-sm font-semibold leading-6 text-neutral-950">
                        {siteConfig.address}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl bg-neutral-950 p-6 text-white">
                <ShieldCheck
                  aria-hidden="true"
                  className="absolute -bottom-8 -right-6 size-36 text-white/[0.04]"
                />

                <div className="relative">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-400">
                    <ShieldCheck
                      aria-hidden="true"
                      className="size-5"
                    />
                  </span>

                  <h3 className="mt-6 font-serif text-2xl tracking-[-0.025em]">
                    {t.supportTitle}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-white/55">
                    {t.supportDescription}
                  </p>

                  <div className="mt-6 border-t border-white/10">
                    {t.supportItems.map((item) => (
                      <div
                        key={item}
                        className="flex min-h-14 items-center gap-3 border-b border-white/10 text-sm leading-6 text-white/75 last:border-b-0"
                      >
                        <CheckCircle2
                          aria-hidden="true"
                          className="size-4 shrink-0 text-emerald-400"
                        />

                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <a
                href={siteConfig.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="group flex min-h-14 items-center justify-between rounded-xl bg-emerald-600 px-5 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                <span className="flex items-center gap-3">
                  <MessageCircle
                    aria-hidden="true"
                    className="size-5"
                  />

                  WhatsApp
                </span>

                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>

              <Link
                href={localizedPath("/products", locale)}
                className="group flex min-h-14 items-center justify-between rounded-xl border border-neutral-300 bg-white px-5 text-sm font-semibold text-neutral-950 transition hover:border-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
              >
                {t.productsLink}

                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </aside>
          </div>
        </Container>
      </section>
    </div>
  );
}
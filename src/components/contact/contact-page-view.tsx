import { CheckCircle2, MessageCircle } from "lucide-react";

import { createInquiry } from "@/app/contact/actions";
import { ContactSubmitButton } from "@/app/contact/submit-button";
import { TurnstileWidget } from "@/components/contact/turnstile-widget";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/shared/page-header";
import { fireServices } from "@/data/fire-services";
import { siteConfig } from "@/data/site";
import { chromeCopy } from "@/data/translations/chrome";
import { contactTranslations } from "@/data/translations/contact";
import type { Locale } from "@/lib/i18n";

export type ContactSearchParams = {
  success?: string;
  error?: string;
  product?: string;
  service?: string;
  source?: string;
};

type ContactPageViewProps = {
  locale?: Locale;
  query: ContactSearchParams;
};

const inputClassName =
  "h-12 w-full rounded-md border border-line bg-surface px-4 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:border-ink";

function Field({
  id,
  label,
  hint,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-2 flex items-baseline gap-2 text-sm font-medium text-ink">
        {label}
        {hint ? <span className="text-xs font-normal text-muted">({hint})</span> : null}
      </label>
      {children}
    </div>
  );
}

export function ContactPageView({ locale = "az", query }: ContactPageViewProps) {
  const t = contactTranslations[locale];
  const chrome = chromeCopy[locale];
  const service = fireServices.find((item) => item.id === query.service);

  let defaultMessage = "";
  if (query.product) defaultMessage = `${t.requestPrefix} — ${t.productLabel}: ${query.product}\n`;
  else if (service) defaultMessage = `${t.requestPrefix} — ${t.serviceLabel}: ${service.content[locale].title}\n`;
  else if (query.source === "license_copy") defaultMessage = t.licenseCopyMessage;

  const source =
    query.product
      ? "product"
      : service
        ? `service_${service.id}`
        : query.source ?? (locale === "az" ? "contact_page" : `contact_page_${locale}`);

  return (
    <div className="bg-paper">
      <PageHeader eyebrow={t.eyebrow} title={t.title} text={t.description} />

      <Container className="section-spacing">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:items-start">
          <div className="min-w-0 border border-line bg-surface p-6 md:p-10">
            {query.success ? (
              <div
                role="status"
                className="mb-8 flex items-start gap-3 border-l-2 border-ok bg-paper p-4 text-sm leading-6 text-ink"
              >
                <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-ok" />
                <span>{t.successMessage}</span>
              </div>
            ) : null}

            {query.error ? (
              <div role="alert" className="mb-8 border-l-2 border-signal bg-paper p-4 text-sm leading-6 text-signal-deep">
                {query.error}
              </div>
            ) : null}

            <form action={createInquiry} className="grid gap-6">
              <input type="hidden" name="source" value={source} />
              <input type="hidden" name="locale" value={locale} />

              <div className="grid gap-5 md:grid-cols-2">
                <Field id="full_name" label={t.fullNameLabel}>
                  <input id="full_name" name="full_name" required minLength={2} autoComplete="name" placeholder={t.fullNamePlaceholder} className={inputClassName} />
                </Field>
                <Field id="phone" label={t.phoneLabel}>
                  <input id="phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" placeholder={t.phonePlaceholder} className={inputClassName} />
                </Field>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <Field id="email" label={t.emailLabel} hint={t.optional}>
                  <input id="email" name="email" type="email" autoComplete="email" placeholder={t.emailPlaceholder} className={inputClassName} />
                </Field>
                <Field id="company_name" label={t.companyLabel} hint={t.optional}>
                  <input id="company_name" name="company_name" autoComplete="organization" placeholder={t.companyPlaceholder} className={inputClassName} />
                </Field>
              </div>

              <Field id="message" label={t.messageLabel}>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  defaultValue={defaultMessage}
                  placeholder={t.messagePlaceholder}
                  className="w-full resize-y rounded-md border border-line bg-surface px-4 py-3 text-sm leading-7 text-ink outline-none transition placeholder:text-muted/70 focus:border-ink"
                />
              </Field>

              <div className="grid gap-5 border-t border-line pt-6">
                <TurnstileWidget locale={locale} />
                <ContactSubmitButton label={t.submitLabel} pendingLabel={t.submitPendingLabel} />
              </div>
            </form>
          </div>

          <aside className="grid min-w-0 gap-6 lg:sticky lg:top-36">
            <div className="border border-line bg-surface p-6">
              <h2 className="eyebrow text-muted">{t.directTitle}</h2>
              <dl className="mt-5 grid gap-4 text-sm">
                <div>
                  <dt className="text-xs text-muted">{t.phoneLabel}</dt>
                  <dd className="mt-1">
                    <a href={siteConfig.phoneHref} className="tabular text-lg font-semibold text-ink hover:text-signal">
                      {siteConfig.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted">{t.emailLabel}</dt>
                  <dd className="mt-1 break-all">
                    <a href={siteConfig.emailHref} className="text-ink hover:text-signal">{siteConfig.email}</a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted">{t.addressLabel}</dt>
                  <dd className="mt-1 text-ink">{siteConfig.address}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted">{t.hoursLabel}</dt>
                  <dd className="mt-1 text-ink">{chrome.hours}</dd>
                </div>
              </dl>

              <a
                href={`${siteConfig.whatsappHref}?text=${encodeURIComponent(chrome.whatsappMessage)}`}
                target="_blank"
                rel="noreferrer"
                className="mt-6 flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#1f8f4e] text-sm font-semibold text-white transition hover:bg-[#187540]"
              >
                <MessageCircle aria-hidden="true" className="size-4" />
                WhatsApp
              </a>
            </div>

            <div className="bg-ink p-6 text-white">
              <h2 className="eyebrow text-brass">{t.nextTitle}</h2>
              <ol className="mt-5 grid gap-4">
                {t.nextSteps.map((step, index) => (
                  <li key={step} className="flex gap-4 text-sm leading-6 text-white/80">
                    <span className="font-mono text-xs text-white/45">{String(index + 1).padStart(2, "0")}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}

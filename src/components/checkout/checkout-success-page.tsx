import Link from "next/link";
import { CheckCircle2, ClipboardCheck } from "lucide-react";

import { Container } from "@/components/layout/container";
import {
  checkoutSuccessTranslations,
  type CheckoutSuccessLocale,
} from "@/data/translations/checkout-success";
import { localizedPath } from "@/lib/i18n";

type CheckoutSuccessPageProps = {
  locale?: CheckoutSuccessLocale;
  orderNumber?: string;
};

export function CheckoutSuccessPage({
  locale = "az",
  orderNumber,
}: CheckoutSuccessPageProps) {
  const t = checkoutSuccessTranslations[locale];

  return (
    <div className="min-h-screen bg-[#f5f6f8]">
      <section className="border-b border-neutral-200 bg-white">
        <Container className="py-8 md:py-10 lg:py-12">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 md:size-20">
              <CheckCircle2 className="size-8 md:size-10" aria-hidden="true" />
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
              {t.eyebrow}
            </p>

            <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-neutral-950 md:text-4xl lg:text-5xl">
              {t.title}
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-neutral-600 md:text-base">
              {t.description}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-8 md:py-10 lg:py-12">
        <Container>
          <div className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm md:p-6">
              <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <ClipboardCheck className="size-6" aria-hidden="true" />
              </div>

              <div className="mt-5 space-y-5">
                {orderNumber ? (
                  <div>
                    <p className="text-sm text-neutral-500">
                      {t.orderNumberLabel}
                    </p>

                    <p className="mt-1 break-all text-xl font-semibold text-neutral-950">
                      {orderNumber}
                    </p>
                  </div>
                ) : null}

                <div>
                  <p className="text-sm text-neutral-500">
                    {t.orderStatusLabel}
                  </p>

                  <p className="mt-1 text-xl font-semibold text-emerald-700">
                    {t.orderStatusValue}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm md:p-6">
              <h2 className="text-xl font-semibold text-neutral-950 md:text-2xl">
                {t.nextStepsTitle}
              </h2>

              <div className="mt-5 space-y-3">
                {t.nextSteps.map((step, index) => (
                  <div
                    key={`${index}-${step}`}
                    className="flex gap-4 rounded-xl border border-neutral-200 bg-neutral-50 p-4"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-neutral-950 text-sm font-semibold text-white">
                      {index + 1}
                    </span>

                    <p className="text-sm leading-6 text-neutral-700">{step}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Link
                  href={localizedPath("/products", locale)}
                  className="inline-flex min-h-12 items-center justify-center rounded-lg bg-neutral-950 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  {t.productsButton}
                </Link>

                <Link
                  href={localizedPath("/", locale)}
                  className="inline-flex min-h-12 items-center justify-center rounded-lg border border-neutral-300 bg-white px-5 py-3 text-center text-sm font-semibold text-neutral-950 transition hover:border-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  {t.homeButton}
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

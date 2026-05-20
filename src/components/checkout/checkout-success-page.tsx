import Link from "next/link";
import { CheckCircle2, ClipboardCheck } from "lucide-react";
import { Container } from "@/components/layout/container";
import {
  checkoutSuccessTranslations,
  type CheckoutSuccessLocale,
} from "@/data/translations/checkout-success";

type CheckoutSuccessPageProps = {
  locale?: CheckoutSuccessLocale;
  orderNumber?: string;
};

function withLocalePath(locale: CheckoutSuccessLocale, path: string) {
  if (locale === "az") {
    return path;
  }

  return `/${locale}${path}`;
}

export function CheckoutSuccessPage({
  locale = "az",
  orderNumber,
}: CheckoutSuccessPageProps) {
  const t = checkoutSuccessTranslations[locale];

  return (
    <main className="min-h-screen bg-[#f6f6f4] pt-16 lg:pt-[8.25rem] xl:pt-[7.5rem]">
      <section className="border-b border-black/10 bg-white">
        <Container className="py-12 lg:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex size-20 items-center justify-center rounded-[2rem] bg-emerald-50 text-emerald-700">
              <CheckCircle2 className="size-10" aria-hidden="true" />
            </div>

            <p className="mt-8 text-xs uppercase tracking-[0.28em] text-neutral-400">
              {t.eyebrow}
            </p>

            <h1 className="mt-4 text-4xl font-semibold leading-tight text-neutral-950 md:text-6xl">
              {t.title}
            </h1>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-neutral-600">
              {t.description}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-10 lg:py-14">
        <Container>
          <div className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <ClipboardCheck className="size-8 text-neutral-950" aria-hidden="true" />

              <div className="mt-6 space-y-4">
                {orderNumber ? (
                  <div>
                    <p className="text-sm text-neutral-500">
                      {t.orderNumberLabel}
                    </p>
                    <p className="mt-1 text-xl font-semibold text-neutral-950">
                      {orderNumber}
                    </p>
                  </div>
                ) : null}

                <div>
                  <p className="text-sm text-neutral-500">
                    {t.orderStatusLabel}
                  </p>
                  <p className="mt-1 text-xl font-semibold text-neutral-950">
                    {t.orderStatusValue}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-neutral-950">
                {t.nextStepsTitle}
              </h2>

              <div className="mt-5 space-y-3">
                {t.nextSteps.map((step, index) => (
                  <div
                    key={step}
                    className="flex gap-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-4"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-sm font-semibold text-white">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-6 text-neutral-700">
                      {step}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={withLocalePath(locale, "/products")}
                  className="inline-flex rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
                >
                  {t.productsButton}
                </Link>

                <Link
                  href={withLocalePath(locale, "/")}
                  className="inline-flex rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:border-neutral-950"
                >
                  {t.homeButton}
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
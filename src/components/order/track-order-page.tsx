import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  CreditCard,
  PackageCheck,
  PackageSearch,
  Search,
  Truck,
  ShieldCheck,
} from "lucide-react";

import { PhoneInput } from "@/components/checkout/phone-input";
import { TurnstileWidget } from "@/components/contact/turnstile-widget";
import { Container } from "@/components/layout/container";
import {
  trackOrderTranslations,
  type TrackOrderLocale,
} from "@/data/translations/track-order";
import { formatPrice } from "@/lib/cart";
import { localizedPath } from "@/lib/i18n";
import { trackOrder } from "@/services/order-tracking";

type TrackOrderPageProps = {
  locale?: TrackOrderLocale;
  orderNumber?: string;
  phone?: string;
  turnstileToken?: string;
};
type TurnstileResponse = {
  success: boolean;
  "error-codes"?: string[];
};

async function verifyTurnstileToken(token: string) {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey || !token) {
    return false;
  }

  try {
    const body = new URLSearchParams({
      secret: secretKey,
      response: token,
    });

    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return false;
    }

    const result = (await response.json()) as TurnstileResponse;

    return result.success;
  } catch {
    return false;
  }
}
function formatDate(value: string, localeCode: string) {
  return new Intl.DateTimeFormat(localeCode, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function getOrderStatusLabel(status: string, locale: TrackOrderLocale) {
  const t = trackOrderTranslations[locale];

  if (status === "new") return t.statusNew;
  if (status === "confirmed") return t.statusConfirmed;
  if (status === "preparing") return t.statusPreparing;
  if (status === "delivered") return t.statusDelivered;
  if (status === "cancelled") return t.statusCancelled;

  return status;
}

function getPaymentStatusLabel(status: string, locale: TrackOrderLocale) {
  const t = trackOrderTranslations[locale];

  if (status === "pending") return t.paymentPending;
  if (status === "paid") return t.paymentPaid;
  if (status === "failed") return t.paymentFailed;

  return status;
}

function getPaymentMethodLabel(method: string, locale: TrackOrderLocale) {
  const t = trackOrderTranslations[locale];

  if (method === "cash") return t.paymentCash;
  if (method === "card") return t.paymentCard;

  return method;
}

function getStepClass(currentStatus: string, step: string) {
  const order = ["new", "confirmed", "preparing", "delivered"];
  const currentIndex = order.indexOf(currentStatus);
  const stepIndex = order.indexOf(step);

  if (currentStatus === "cancelled") {
    return step === "cancelled"
      ? "border-red-600 bg-red-50 text-red-700"
      : "border-neutral-200 bg-white text-neutral-400";
  }

  if (stepIndex <= currentIndex) {
    return "border-emerald-600 bg-emerald-50 text-emerald-700";
  }

  return "border-neutral-200 bg-white text-neutral-400";
}

function getStepIcon(step: string) {
  if (step === "new") return Clock3;
  if (step === "confirmed") return CheckCircle2;
  if (step === "preparing") return PackageCheck;
  if (step === "delivered") return Truck;

  return PackageSearch;
}

export async function TrackOrderPage({
  locale = "az",
  orderNumber = "",
  phone = "",
  turnstileToken = "",
}: TrackOrderPageProps) {
  const t = trackOrderTranslations[locale];

const hasSearch = Boolean(orderNumber || phone);

const isVerified =
  orderNumber && phone
    ? await verifyTurnstileToken(turnstileToken)
    : false;

const order =
  orderNumber && phone && isVerified
    ? await trackOrder({
        orderNumber,
        phone,
      })
    : null;

  const steps = [
    ["new", t.statusNew],
    ["confirmed", t.statusConfirmed],
    ["preparing", t.statusPreparing],
    ["delivered", t.statusDelivered],
  ];

  return (
    <div className="min-h-screen bg-[#f5f6f8]">
      {/* Compact page introduction */}
      <section className="border-b border-neutral-200 bg-white">
        <Container className="py-8 md:py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            {t.eyebrow}
          </p>

          <h1 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-neutral-950 md:text-4xl">
            {t.title}
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-600 md:text-base">
            {t.description}
          </p>
        </Container>
      </section>

      <section className="py-8 md:py-10 lg:py-12">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[380px_minmax(0,1fr)] lg:items-start">
            {/* Search form */}
            <form
              action={localizedPath("/track-order", locale)}
              className="h-fit rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm lg:sticky lg:top-[11rem]"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <PackageSearch className="size-5" aria-hidden="true" />
              </div>

              <h2 className="mt-5 text-xl font-semibold text-neutral-950">
                {t.formTitle}
              </h2>

              <div className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="order"
                    className="mb-2 block text-sm font-medium text-neutral-800"
                  >
                    {t.orderNumberLabel}
                  </label>

                  <input
                    id="order"
                    name="order"
                    defaultValue={orderNumber}
                    required
                    autoComplete="off"
                    className="h-12 w-full rounded-lg border border-neutral-300 bg-white px-4 text-sm uppercase text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10"
                    placeholder="KH-20260519-1234"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-neutral-800">
                    {t.phoneLabel}
                  </label>

                  <PhoneInput
                    name="phone"
                    defaultValue={phone}
                    required
                    locale={locale}
                  />
                </div>
                <TurnstileWidget />

                <button
                  type="submit"
                  className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-neutral-950 px-5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  <Search className="mr-2 size-4" aria-hidden="true" />
                  {t.submitButton}
                </button>
              </div>
            </form>

            {/* Search result */}
            <div>
              {order ? (
                <div className="space-y-5">
                  {/* Order summary */}
                  <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                          {t.orderFound}
                        </p>

                        <h2 className="mt-2 break-all text-2xl font-semibold tracking-tight text-neutral-950 md:text-3xl">
                          {order.order_number}
                        </h2>

                        <p className="mt-2 text-sm text-neutral-500">
                          {formatDate(order.created_at, t.localeCode)}
                        </p>
                      </div>

                      <div className="rounded-xl bg-neutral-950 px-5 py-4 text-white">
                        <p className="text-xs text-white/60">{t.total}</p>

                        <strong className="mt-1 block text-xl font-semibold">
                          {formatPrice(order.total)}
                        </strong>
                      </div>
                    </div>

                    {/* Order progress */}
                    <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                      {steps.map(([step, label], index) => {
                        const Icon = getStepIcon(step);

                        return (
                          <div
                            key={step}
                            className={`relative rounded-xl border p-4 text-sm font-semibold ${getStepClass(
                              order.order_status,
                              step,
                            )}`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/70">
                                <Icon className="size-4" aria-hidden="true" />
                              </span>

                              <div>
                                <p className="text-[11px] font-medium opacity-60">
                                  {index + 1}
                                </p>

                                <p className="mt-0.5">{label}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      {order.order_status === "cancelled" ? (
                        <div className="rounded-xl border border-red-600 bg-red-50 p-4 text-center text-sm font-semibold text-red-700 sm:col-span-2 xl:col-span-4">
                          {t.cancelledNotice}
                        </div>
                      ) : null}
                    </div>

                    {/* Order metadata */}
                    <div className="mt-6 grid gap-3 md:grid-cols-3">
                      <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                        <div className="flex items-center gap-2 text-neutral-500">
                          <PackageCheck className="size-4" aria-hidden="true" />

                          <p className="text-xs">{t.orderStatus}</p>
                        </div>

                        <p className="mt-2 font-semibold text-neutral-950">
                          {getOrderStatusLabel(order.order_status, locale)}
                        </p>
                      </div>

                      <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                        <div className="flex items-center gap-2 text-neutral-500">
                          <CreditCard className="size-4" aria-hidden="true" />

                          <p className="text-xs">{t.paymentMethod}</p>
                        </div>

                        <p className="mt-2 font-semibold text-neutral-950">
                          {getPaymentMethodLabel(order.payment_method, locale)}
                        </p>
                      </div>

                      <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                        <div className="flex items-center gap-2 text-neutral-500">
                          <CheckCircle2 className="size-4" aria-hidden="true" />

                          <p className="text-xs">{t.paymentStatus}</p>
                        </div>

                        <p className="mt-2 font-semibold text-neutral-950">
                          {getPaymentStatusLabel(order.payment_status, locale)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Ordered products */}
                  <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between gap-4 border-b border-neutral-100 pb-4">
                      <h3 className="text-xl font-semibold text-neutral-950">
                        {t.products}
                      </h3>

                      <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
                        {order.items.length}
                      </span>
                    </div>

                    <div className="divide-y divide-neutral-100">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex flex-col justify-between gap-3 py-4 sm:flex-row sm:items-start"
                        >
                          <div className="min-w-0">
                            <Link
                              href={localizedPath(
                                `/products/${item.product_slug}`,
                                locale,
                              )}
                              className="font-medium leading-6 text-neutral-950 transition hover:text-emerald-700"
                            >
                              {item.product_name}
                            </Link>

                            <p className="mt-1 text-sm text-neutral-500">
                              {item.quantity} × {formatPrice(item.unit_price)}
                            </p>
                          </div>

                          <p className="shrink-0 font-semibold text-neutral-950">
                            {formatPrice(item.line_total)}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-4">
                      <span className="text-sm text-neutral-500">
                        {t.total}
                      </span>

                      <strong className="text-xl font-semibold text-neutral-950">
                        {formatPrice(order.total)}
                      </strong>
                    </div>
                  </div>
                </div>
              ) : hasSearch && !isVerified ? (
  <div className="rounded-2xl border border-red-200 bg-red-50 p-7 text-center md:p-10">
    <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-white text-red-600">
      <ShieldCheck className="size-8" aria-hidden="true" />
    </div>

    <h2 className="mt-5 text-xl font-semibold text-red-800">
      {t.securityFailed}
    </h2>
  </div>
) : hasSearch ? (
  /* Not found */
                <div className="rounded-2xl border border-red-200 bg-red-50 p-7 text-center md:p-10">
                  <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-white text-red-600">
                    <PackageSearch className="size-8" aria-hidden="true" />
                  </div>

                  <h2 className="mt-5 text-2xl font-semibold text-red-800">
                    {t.notFoundTitle}
                  </h2>

                  <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-red-700">
                    {t.notFoundDescription}
                  </p>

                  <Link
                    href={localizedPath("/contact", locale)}
                    className="group mt-6 inline-flex items-center justify-center rounded-lg bg-red-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-800"
                  >
                    {t.notFoundTitle}

                    <ArrowRight
                      className="ml-2 size-4 transition group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              ) : (
                /* Initial empty state */
                <div className="rounded-2xl border border-neutral-200 bg-white p-7 text-center shadow-sm md:p-10">
                  <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                    <PackageSearch className="size-8" aria-hidden="true" />
                  </div>

                  <h2 className="mt-5 text-2xl font-semibold text-neutral-950">
                    {t.emptyTitle}
                  </h2>

                  <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-neutral-500">
                    {t.emptyDescription}
                  </p>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

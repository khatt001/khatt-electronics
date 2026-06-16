"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  PackageSearch,
  ShieldCheck,
  WalletCards,
} from "lucide-react";
import { useEffect, useMemo } from "react";

import { createOrder } from "@/app/checkout/actions";
import { useCart } from "@/components/cart/cart-provider";
import { PhoneInput } from "@/components/checkout/phone-input";
import { Container } from "@/components/layout/container";
import {
  checkoutTranslations,
  type CheckoutLocale,
} from "@/data/translations/checkout";
import { formatPrice } from "@/lib/cart";
import { localizedPath } from "@/lib/i18n";

type CheckoutPageClientProps = {
  locale?: CheckoutLocale;
};

const inputClassName =
  "h-12 w-full rounded-lg border border-neutral-300 bg-white px-4 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10";

export function CheckoutPageClient({
  locale = "az",
}: CheckoutPageClientProps) {
  const searchParams = useSearchParams();
  const { items, subtotal, syncCart, isSyncing } = useCart();
  const t = checkoutTranslations[locale];

  const error = searchParams.get("error");

  useEffect(() => {
    void syncCart();
  }, [syncCart]);

  const checkoutItems = useMemo(
    () =>
      items.map((item) => ({
        id: item.id,
        name: item.name,
        slug: item.slug,
        price: item.price,
        quantity: item.quantity,
      })),
    [items],
  );

  const totalItemCount = items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-[#f5f6f8]">
      {/* Compact page introduction */}
      <section className="border-b border-neutral-200 bg-white">
        <Container className="py-8 md:py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            {t.eyebrow}
          </p>

          <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold leading-tight tracking-tight text-neutral-950 md:text-4xl">
                {t.title}
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-600 md:text-base">
                {t.description}
              </p>
            </div>

            {items.length > 0 ? (
              <div className="inline-flex w-fit items-center gap-2 rounded-lg bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
                <CheckCircle2 className="size-4" aria-hidden="true" />
                {totalItemCount}
              </div>
            ) : null}
          </div>
        </Container>
      </section>

      <section className="py-8 md:py-10 lg:py-12">
        <Container>
          {items.length > 0 ? (
            <form
              action={createOrder}
              className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start"
            >
              <input
                type="hidden"
                name="items"
                value={JSON.stringify(checkoutItems)}
              />

              <input type="hidden" name="locale" value={locale} />

              {/* Customer information */}
              <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm md:p-7 lg:p-8">
                <div className="border-b border-neutral-100 pb-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                    Sifariş məlumatları
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950">
                    {t.customerInfoTitle}
                  </h2>
                </div>

                {error ? (
                  <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700">
                    {error}
                  </div>
                ) : null}

                {isSyncing ? (
                  <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-blue-700">
                    {t.syncingMessage}
                  </div>
                ) : null}

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="customer_name"
                      className="mb-2 block text-sm font-medium text-neutral-800"
                    >
                      {t.fullNameLabel}
                    </label>

                    <input
                      id="customer_name"
                      name="customer_name"
                      required
                      minLength={2}
                      autoComplete="name"
                      className={inputClassName}
                      placeholder={t.fullNamePlaceholder}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-neutral-800">
                      {t.phoneLabel}
                    </label>

                    <PhoneInput
                      name="phone"
                      required
                      locale={locale}
                    />
                  </div>

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
                      className={inputClassName}
                      placeholder={t.emailPlaceholder}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="city"
                      className="mb-2 block text-sm font-medium text-neutral-800"
                    >
                      {t.cityLabel}
                    </label>

                    <input
                      id="city"
                      name="city"
                      required
                      autoComplete="address-level2"
                      defaultValue={t.cityDefault}
                      className={inputClassName}
                      placeholder={t.cityPlaceholder}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label
                      htmlFor="address"
                      className="mb-2 block text-sm font-medium text-neutral-800"
                    >
                      {t.addressLabel}
                    </label>

                    <input
                      id="address"
                      name="address"
                      required
                      minLength={5}
                      autoComplete="street-address"
                      className={inputClassName}
                      placeholder={t.addressPlaceholder}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label
                      htmlFor="note"
                      className="mb-2 block text-sm font-medium text-neutral-800"
                    >
                      {t.noteLabel}
                    </label>

                    <textarea
                      id="note"
                      name="note"
                      rows={4}
                      className="w-full resize-y rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm leading-6 text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10"
                      placeholder={t.notePlaceholder}
                    />
                  </div>
                </div>

                {/* Payment method */}
                <div className="mt-8 border-t border-neutral-100 pt-6">
                  <h3 className="text-xl font-semibold text-neutral-950">
                    {t.paymentTitle}
                  </h3>

                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-neutral-950 bg-neutral-950 p-4 text-white">
                      <input
                        name="payment_method"
                        type="radio"
                        value="cash"
                        defaultChecked
                        className="mt-1 accent-emerald-500"
                      />

                      <span>
                        <span className="flex items-center gap-2 font-semibold">
                          <WalletCards
                            className="size-4"
                            aria-hidden="true"
                          />
                          {t.cashPaymentTitle}
                        </span>

                        <span className="mt-1 block text-sm leading-6 text-white/60">
                          {t.cashPaymentDescription}
                        </span>
                      </span>
                    </label>

                    <label className="flex cursor-not-allowed items-start gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-neutral-400">
                      <input
                        name="payment_method"
                        type="radio"
                        value="card"
                        disabled
                        className="mt-1"
                      />

                      <span>
                        <span className="flex items-center gap-2 font-semibold">
                          <CreditCard
                            className="size-4"
                            aria-hidden="true"
                          />
                          {t.cardPaymentTitle}
                        </span>

                        <span className="mt-1 block text-sm leading-6">
                          {t.cardPaymentDescription}
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Order summary */}
              <aside className="h-fit rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm lg:sticky lg:top-[11rem]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                      Sifariş xülasəsi
                    </p>

                    <h2 className="mt-2 text-xl font-semibold text-neutral-950">
                      {t.summaryTitle}
                    </h2>
                  </div>

                  <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
                    {totalItemCount}
                  </span>
                </div>

                <div className="mt-5 max-h-[320px] space-y-4 overflow-y-auto border-b border-neutral-100 pb-5 pr-1">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between gap-4"
                    >
                      <div className="min-w-0">
                        <p className="line-clamp-2 text-sm font-medium leading-6 text-neutral-950">
                          {item.name}
                        </p>

                        <p className="mt-1 text-xs text-neutral-500">
                          {item.quantity} × {item.priceLabel}
                        </p>
                      </div>

                      <p className="shrink-0 text-sm font-semibold text-neutral-950">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 space-y-3">
                  <div className="flex justify-between gap-4 text-sm">
                    <span className="text-neutral-500">
                      {t.subtotal}
                    </span>

                    <span className="font-medium text-neutral-950">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 text-sm">
                    <span className="text-neutral-500">
                      {t.delivery}
                    </span>

                    <span className="font-medium text-neutral-950">
                      0.00 AZN
                    </span>
                  </div>

                  <div className="flex items-end justify-between gap-4 border-t border-neutral-100 pt-4">
                    <span className="text-sm text-neutral-500">
                      {t.total}
                    </span>

                    <strong className="text-2xl font-semibold text-neutral-950">
                      {formatPrice(subtotal)}
                    </strong>
                  </div>
                </div>

                <div className="mt-5 flex items-start gap-3 rounded-xl bg-emerald-50 p-4 text-sm leading-6 text-emerald-800">
                  <ShieldCheck
                    className="mt-0.5 size-5 shrink-0"
                    aria-hidden="true"
                  />

                  <span>
                    Sifariş məlumatlarınız təsdiqdən sonra sizinlə əlaqə
                    saxlanılaraq dəqiqləşdiriləcək.
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSyncing}
                  className="mt-6 h-12 w-full rounded-lg bg-neutral-950 px-5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-neutral-300"
                >
                  {isSyncing ? t.updatingButton : t.confirmButton}
                </button>

                <Link
                  href={localizedPath("/cart", locale)}
                  className="mt-3 inline-flex w-full items-center justify-center rounded-lg border border-neutral-300 px-5 py-3 text-sm font-medium text-neutral-700 transition hover:border-neutral-950 hover:text-neutral-950"
                >
                  <ArrowLeft
                    className="mr-2 size-4"
                    aria-hidden="true"
                  />

                  {t.backToCart}
                </Link>
              </aside>
            </form>
          ) : (
            /* Empty checkout */
            <div className="mx-auto max-w-2xl rounded-2xl border border-neutral-200 bg-white p-7 text-center shadow-sm md:p-10">
              <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                <PackageSearch
                  className="size-8"
                  aria-hidden="true"
                />
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                {t.emptyEyebrow}
              </p>

              <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-neutral-950 md:text-3xl">
                {t.emptyTitle}
              </h2>

              <Link
                href={localizedPath("/products", locale)}
                className="mt-6 inline-flex items-center justify-center rounded-lg bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                {t.emptyButton}
              </Link>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
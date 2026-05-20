"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CreditCard, PackageSearch, WalletCards } from "lucide-react";
import { useEffect, useMemo } from "react";
import { createOrder } from "@/app/checkout/actions";
import { useCart } from "@/components/cart/cart-provider";
import { Container } from "@/components/layout/container";
import { formatPrice } from "@/lib/cart";
import { PhoneInput } from "@/components/checkout/phone-input";
import {
  checkoutTranslations,
  type CheckoutLocale,
} from "@/data/translations/checkout";

type CheckoutPageClientProps = {
  locale?: CheckoutLocale;
};

function withLocalePath(locale: CheckoutLocale, path: string) {
  if (locale === "az") {
    return path;
  }

  return `/${locale}${path}`;
}

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
    [items]
  );

  return (
    <main className="min-h-screen bg-[#f6f6f4] pt-16 lg:pt-[8.25rem] xl:pt-[7.5rem]">
      <section className="border-b border-black/10 bg-white">
        <Container className="py-12">
          <p className="text-xs uppercase tracking-[0.28em] text-neutral-400">
            {t.eyebrow}
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-neutral-950 md:text-6xl">
            {t.title}
          </h1>
          <p className="mt-5 max-w-2xl leading-8 text-neutral-600">
            {t.description}
          </p>
        </Container>
      </section>

      <section className="py-10 lg:py-14">
        <Container>
          {items.length > 0 ? (
            <form
              action={createOrder}
              className="grid gap-8 lg:grid-cols-[1fr_380px]"
            >
              <input
                type="hidden"
                name="items"
                value={JSON.stringify(checkoutItems)}
              />
<input type="hidden" name="locale" value={locale} />
              <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm lg:p-8">
                <h2 className="text-2xl font-semibold text-neutral-950">
                  {t.customerInfoTitle}
                </h2>

                {error ? (
                  <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    {error}
                  </div>
                ) : null}

                {isSyncing ? (
                  <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-700">
                    {t.syncingMessage}
                  </div>
                ) : null}

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      {t.fullNameLabel}
                    </label>
                    <input
                      name="customer_name"
                      required
                      minLength={2}
                      className="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                      placeholder={t.fullNamePlaceholder}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      {t.phoneLabel}
                    </label>
                    <PhoneInput name="phone" required />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      {t.emailLabel}
                    </label>
                    <input
                      name="email"
                      type="email"
                      className="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                      placeholder={t.emailPlaceholder}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      {t.cityLabel}
                    </label>
                    <input
                      name="city"
                      required
                      defaultValue={t.cityDefault}
                      className="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                      placeholder={t.cityPlaceholder}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium">
                      {t.addressLabel}
                    </label>
                    <input
                      name="address"
                      required
                      minLength={5}
                      className="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                      placeholder={t.addressPlaceholder}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium">
                      {t.noteLabel}
                    </label>
                    <textarea
                      name="note"
                      rows={4}
                      className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none transition focus:border-neutral-950"
                      placeholder={t.notePlaceholder}
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-neutral-950">
                    {t.paymentTitle}
                  </h3>

                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-neutral-950 bg-neutral-950 p-4 text-white">
                      <input
                        name="payment_method"
                        type="radio"
                        value="cash"
                        defaultChecked
                        className="mt-1"
                      />
                      <span>
                        <span className="flex items-center gap-2 font-semibold">
                          <WalletCards className="size-4" />
                          {t.cashPaymentTitle}
                        </span>
                        <span className="mt-1 block text-sm text-white/60">
                          {t.cashPaymentDescription}
                        </span>
                      </span>
                    </label>

                    <label className="flex cursor-not-allowed items-start gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-neutral-400">
                      <input
                        name="payment_method"
                        type="radio"
                        value="card"
                        disabled
                        className="mt-1"
                      />
                      <span>
                        <span className="flex items-center gap-2 font-semibold">
                          <CreditCard className="size-4" />
                          {t.cardPaymentTitle}
                        </span>
                        <span className="mt-1 block text-sm">
                          {t.cardPaymentDescription}
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <aside className="h-fit rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-neutral-950">
                  {t.summaryTitle}
                </h2>

                <div className="mt-5 space-y-4 border-b border-neutral-100 pb-5">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between gap-4">
                      <div>
                        <p className="line-clamp-2 text-sm font-medium text-neutral-950">
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
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500">{t.subtotal}</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500">{t.delivery}</span>
                    <span className="font-medium">0.00 AZN</span>
                  </div>

                  <div className="flex justify-between border-t border-neutral-100 pt-4">
                    <span className="text-sm text-neutral-500">{t.total}</span>
                    <strong className="text-2xl text-neutral-950">
                      {formatPrice(subtotal)}
                    </strong>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSyncing}
                  className="mt-6 h-12 w-full rounded-full bg-neutral-950 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300"
                >
                  {isSyncing ? t.updatingButton : t.confirmButton}
                </button>

                <Link
                  href={withLocalePath(locale, "/cart")}
                  className="mt-3 inline-flex w-full justify-center rounded-full border border-neutral-200 px-6 py-3 text-sm font-medium text-neutral-700 transition hover:border-neutral-950 hover:text-neutral-950"
                >
                  {t.backToCart}
                </Link>
              </aside>
            </form>
          ) : (
            <div className="mx-auto max-w-3xl rounded-[2rem] border border-neutral-200 bg-white p-8 text-center shadow-sm lg:p-12">
              <div className="mx-auto flex size-20 items-center justify-center rounded-[2rem] bg-neutral-950 text-white">
                <PackageSearch className="size-9" aria-hidden="true" />
              </div>

              <p className="mt-8 text-xs uppercase tracking-[0.28em] text-neutral-400">
                {t.emptyEyebrow}
              </p>

              <h2 className="mt-4 text-4xl font-semibold leading-tight text-neutral-950 md:text-5xl">
                {t.emptyTitle}
              </h2>

              <Link
                href={withLocalePath(locale, "/products")}
                className="mt-8 inline-flex items-center justify-center rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                {t.emptyButton}
              </Link>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
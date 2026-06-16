"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import {
  ArrowRight,
  Minus,
  PackageSearch,
  Plus,
  ShoppingCart,
  Trash2,
} from "lucide-react";

import { useCart } from "@/components/cart/cart-provider";
import { Container } from "@/components/layout/container";
import { getCategoryName } from "@/data/translations/categories";
import { cartTranslations, type CartLocale } from "@/data/translations/cart";
import { formatPrice } from "@/lib/cart";
import { localizedPath } from "@/lib/i18n";

type CartPageClientProps = {
  locale?: CartLocale;
};

export function CartPageClient({ locale = "az" }: CartPageClientProps) {
  const {
    items,
    subtotal,
    updateQuantity,
    removeItem,
    clearCart,
    syncCart,
    isSyncing,
  } = useCart();

  const t = cartTranslations[locale];

  useEffect(() => {
    void syncCart();
  }, [syncCart]);

  const totalItemCount = items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-[#f5f6f8]">
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
                <ShoppingCart className="size-4" aria-hidden="true" />
                {totalItemCount} {t.stockUnit}
              </div>
            ) : null}
          </div>
        </Container>
      </section>

      <section className="py-8 md:py-10 lg:py-12">
        <Container>
          {items.length > 0 ? (
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
              <div className="space-y-4">
                {items.map((item) => {
                  const localizedCategory = getCategoryName(
                    item.category,
                    locale,
                  );

                  return (
                    <article
                      key={item.id}
                      className="grid gap-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm sm:grid-cols-[120px_minmax(0,1fr)] lg:p-5"
                    >
                      <Link
                        href={localizedPath(`/products/${item.slug}`, locale)}
                        className="relative flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-neutral-100"
                      >
                        {item.imageUrl ? (
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            sizes="120px"
                            className="object-contain p-3 transition duration-300 hover:scale-105"
                          />
                        ) : (
                          <ShoppingCart
                            className="size-8 text-neutral-400"
                            aria-hidden="true"
                          />
                        )}
                      </Link>

                      <div className="min-w-0">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0">
                            <div className="mb-2 flex flex-wrap gap-2">
                              <span className="rounded-lg bg-neutral-100 px-3 py-1 text-xs text-neutral-600">
                                {localizedCategory}
                              </span>

                              {item.brand ? (
                                <span className="rounded-lg bg-neutral-950 px-3 py-1 text-xs text-white">
                                  {item.brand}
                                </span>
                              ) : null}
                            </div>

                            <Link
                              href={localizedPath(
                                `/products/${item.slug}`,
                                locale,
                              )}
                              className="line-clamp-2 text-lg font-semibold leading-6 text-neutral-950 transition hover:text-emerald-700"
                            >
                              {item.name}
                            </Link>

                            <p className="mt-2 text-sm font-medium text-neutral-500">
                              {t.stockLimit}: {item.maxQuantity} {t.stockUnit}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            aria-label={t.removeProductAria}
                            className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-red-100 text-red-600 transition hover:border-red-200 hover:bg-red-50"
                          >
                            <Trash2 className="size-5" aria-hidden="true" />
                          </button>
                        </div>

                        <div className="mt-5 flex flex-col gap-4 border-t border-neutral-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex w-fit items-center rounded-lg border border-neutral-200 bg-white p-1">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1 || isSyncing}
                              aria-label={t.decreaseQuantityAria}
                              className="inline-flex size-9 items-center justify-center rounded-md transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              <Minus className="size-4" aria-hidden="true" />
                            </button>

                            <span className="min-w-12 text-center text-sm font-semibold text-neutral-950">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              disabled={
                                item.quantity >= item.maxQuantity || isSyncing
                              }
                              aria-label={t.increaseQuantityAria}
                              className="inline-flex size-9 items-center justify-center rounded-md transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              <Plus className="size-4" aria-hidden="true" />
                            </button>
                          </div>

                          <div className="text-left sm:text-right">
                            <p className="text-sm text-neutral-500">
                              {t.oneItemPrice}: {item.priceLabel}
                            </p>

                            <p className="mt-1 text-xl font-semibold text-neutral-950">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              <aside className="h-fit rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm lg:sticky lg:top-[11rem]">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-xl font-semibold text-neutral-950">
                    {t.summaryTitle}
                  </h2>

                  <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
                    {totalItemCount}
                  </span>
                </div>

                <div className="mt-5 space-y-3 border-b border-neutral-100 pb-5">
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-neutral-500">{t.productCount}</span>

                    <span className="font-medium text-neutral-950">
                      {totalItemCount} {t.stockUnit}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-neutral-500">{t.subtotal}</span>

                    <span className="font-medium text-neutral-950">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-neutral-500">{t.delivery}</span>

                    <span className="text-right font-medium text-neutral-950">
                      {t.deliveryDescription}
                    </span>
                  </div>
                </div>

                <div className="mt-5 flex items-end justify-between gap-4">
                  <span className="text-sm text-neutral-500">{t.total}</span>

                  <strong className="text-2xl font-semibold text-neutral-950">
                    {formatPrice(subtotal)}
                  </strong>
                </div>

                {isSyncing ? (
                  <p className="mt-3 text-center text-xs text-neutral-500">
                    {t.syncing}
                  </p>
                ) : null}

                <Link
                  href={localizedPath("/checkout", locale)}
                  aria-disabled={isSyncing}
                  className={`mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition ${
                    isSyncing
                      ? "pointer-events-none bg-neutral-300 text-white"
                      : "bg-neutral-950 text-white hover:bg-emerald-700"
                  }`}
                >
                  {t.checkoutButton}

                  <ArrowRight className="ml-2 size-4" aria-hidden="true" />
                </Link>

                <button
                  type="button"
                  onClick={clearCart}
                  disabled={isSyncing}
                  className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-lg border border-neutral-300 px-5 py-3 text-sm font-medium text-neutral-700 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {t.clearCartButton}
                </button>
              </aside>
            </div>
          ) : (
            <div className="mx-auto max-w-2xl rounded-2xl border border-neutral-200 bg-white p-7 text-center shadow-sm md:p-10">
              <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                <ShoppingCart className="size-8" aria-hidden="true" />
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                {t.emptyEyebrow}
              </p>

              <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-neutral-950 md:text-3xl">
                {t.emptyTitle}
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-neutral-600 md:text-base">
                {t.emptyDescription}
              </p>

              <Link
                href={localizedPath("/products", locale)}
                className="mt-6 inline-flex items-center justify-center rounded-lg bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                <PackageSearch className="mr-2 size-4" aria-hidden="true" />

                {t.emptyButton}
              </Link>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}

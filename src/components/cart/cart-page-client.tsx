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
import { formatPrice } from "@/lib/cart";
import { localizedPath } from "@/lib/i18n";
import { getCategoryName } from "@/data/translations/categories";
import {
  cartTranslations,
  type CartLocale,
} from "@/data/translations/cart";

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
            <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
              <div className="space-y-4">
                {items.map((item) => {
                  const localizedCategory = getCategoryName(
                    item.category,
                    locale
                  );

                  return (
                    <article
                      key={item.id}
                      className="grid gap-4 rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm sm:grid-cols-[120px_1fr] lg:p-5"
                    >
                      <Link
                        href={localizedPath(`/products/${item.slug}`, locale)}
                        className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-neutral-100"
                      >
                        {item.imageUrl ? (
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            sizes="120px"
                            className="object-contain p-3"
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
                          <div>
                            <div className="mb-2 flex flex-wrap gap-2">
                              <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-500">
                                {localizedCategory}
                              </span>

                              {item.brand ? (
                                <span className="rounded-full bg-neutral-950 px-3 py-1 text-xs text-white">
                                  {item.brand}
                                </span>
                              ) : null}
                            </div>

                            <Link
                              href={localizedPath(
                                `/products/${item.slug}`,
                                locale
                              )}
                              className="line-clamp-2 text-lg font-semibold text-neutral-950 transition hover:text-neutral-600"
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
                            className="inline-flex size-10 shrink-0 items-center justify-center rounded-full text-red-600 transition hover:bg-red-50"
                          >
                            <Trash2 className="size-5" aria-hidden="true" />
                          </button>
                        </div>

                        <div className="mt-5 flex flex-col gap-4 border-t border-neutral-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex w-fit items-center rounded-full border border-neutral-200 p-1">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1 || isSyncing}
                              aria-label={t.decreaseQuantityAria}
                              className="inline-flex size-9 items-center justify-center rounded-full transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              <Minus className="size-4" aria-hidden="true" />
                            </button>

                            <span className="min-w-12 text-center text-sm font-semibold">
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
                              className="inline-flex size-9 items-center justify-center rounded-full transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
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

              <aside className="h-fit rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-neutral-950">
                  {t.summaryTitle}
                </h2>

                <div className="mt-5 space-y-3 border-b border-neutral-100 pb-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-500">{t.productCount}</span>
                    <span className="font-medium text-neutral-950">
                      {items.reduce((total, item) => total + item.quantity, 0)}{" "}
                      {t.stockUnit}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
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

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-sm text-neutral-500">{t.total}</span>
                  <strong className="text-2xl text-neutral-950">
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
                  className={`mt-6 inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold transition ${
                    isSyncing
                      ? "pointer-events-none bg-neutral-300 text-white"
                      : "bg-neutral-950 text-white hover:bg-neutral-800"
                  }`}
                >
                  {t.checkoutButton}
                  <ArrowRight className="ml-2 size-4" aria-hidden="true" />
                </Link>

                <button
                  type="button"
                  onClick={clearCart}
                  disabled={isSyncing}
                  className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-neutral-200 px-6 py-3 text-sm font-medium text-neutral-700 transition hover:border-red-300 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {t.clearCartButton}
                </button>
              </aside>
            </div>
          ) : (
            <div className="mx-auto max-w-3xl rounded-[2rem] border border-neutral-200 bg-white p-8 text-center shadow-sm lg:p-12">
              <div className="mx-auto flex size-20 items-center justify-center rounded-[2rem] bg-neutral-950 text-white">
                <ShoppingCart className="size-9" aria-hidden="true" />
              </div>

              <p className="mt-8 text-xs uppercase tracking-[0.28em] text-neutral-400">
                {t.emptyEyebrow}
              </p>

              <h2 className="mt-4 text-4xl font-semibold leading-tight text-neutral-950 md:text-5xl">
                {t.emptyTitle}
              </h2>

              <p className="mx-auto mt-5 max-w-xl leading-8 text-neutral-600">
                {t.emptyDescription}
              </p>

              <Link
                href={localizedPath("/products", locale)}
                className="mt-8 inline-flex items-center justify-center rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                <PackageSearch className="mr-2 size-4" aria-hidden="true" />
                {t.emptyButton}
              </Link>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
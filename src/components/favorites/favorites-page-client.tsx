"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import {
  ArrowRight,
  Heart,
  PackageSearch,
  ShoppingCart,
  Trash2,
} from "lucide-react";

import { useCart } from "@/components/cart/cart-provider";
import { useFavorites } from "@/components/favorites/favorites-provider";
import { Container } from "@/components/layout/container";
import { getCategoryName } from "@/data/translations/categories";
import {
  favoritesTranslations,
  type FavoritesLocale,
} from "@/data/translations/favorites";
import { localizedPath } from "@/lib/i18n";

type FavoritesPageClientProps = {
  locale?: FavoritesLocale;
};

function getStockLabel(
  stockStatus: string,
  stockQuantity: number,
  locale: FavoritesLocale,
) {
  const t = favoritesTranslations[locale];

  if (stockStatus === "in_stock" && stockQuantity > 0) {
    return `${t.inStockPrefix} ${stockQuantity} ${t.inStockSuffix}`;
  }

  if (stockStatus === "pre_order") {
    return t.preOrder;
  }

  return t.outOfStock;
}

export function FavoritesPageClient({
  locale = "az",
}: FavoritesPageClientProps) {
  const { items, removeFavorite, clearFavorites, syncFavorites, isSyncing } =
    useFavorites();

  const { addItem } = useCart();
  const t = favoritesTranslations[locale];

  useEffect(() => {
    void syncFavorites();
  }, [syncFavorites]);

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
                <Heart className="size-4" aria-hidden="true" />
                {items.length} {t.countSuffix}
              </div>
            ) : null}
          </div>
        </Container>
      </section>

      <section className="py-8 md:py-10 lg:py-12">
        <Container>
          {items.length > 0 ? (
            <div className="space-y-6">
              {/* Section controls */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-neutral-500">
                  {isSyncing ? t.syncing : `${items.length} ${t.countSuffix}`}
                </p>

                <button
                  type="button"
                  onClick={clearFavorites}
                  disabled={isSyncing}
                  className="inline-flex w-fit items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Trash2 className="mr-2 size-4" aria-hidden="true" />
                  {t.clearAll}
                </button>
              </div>

              {/* Favorite products */}
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {items.map((item) => {
                  const canAddToCart =
                    item.priceAmount !== null &&
                    item.stockStatus === "in_stock" &&
                    item.stockQuantity > 0;

                  const localizedCategory = getCategoryName(
                    item.category,
                    locale,
                  );

                  const productHref = localizedPath(
                    `/products/${item.slug}`,
                    locale,
                  );

                  const stockLabel = getStockLabel(
                    item.stockStatus,
                    item.stockQuantity,
                    locale,
                  );

                  return (
                    <article
                      key={item.id}
                      className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition duration-300 hover:border-neutral-300 hover:shadow-md"
                    >
                      {/* Product image */}
                      <Link
                        href={productHref}
                        className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-neutral-100"
                      >
                        {item.imageUrl ? (
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className="object-contain p-6 transition duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <Heart
                            className="size-10 text-neutral-400"
                            aria-hidden="true"
                          />
                        )}

                        <button
                          type="button"
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            removeFavorite(item.id);
                          }}
                          disabled={isSyncing}
                          aria-label={t.removeAria}
                          className="absolute right-3 top-3 inline-flex size-10 items-center justify-center rounded-lg border border-neutral-200 bg-white/95 text-red-600 shadow-sm backdrop-blur transition hover:border-red-300 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Trash2 className="size-4" aria-hidden="true" />
                        </button>
                      </Link>

                      {/* Product information */}
                      <div className="p-5">
                        <div className="mb-3 flex flex-wrap gap-2">
                          <span className="rounded-lg bg-neutral-100 px-2.5 py-1 text-xs text-neutral-600">
                            {localizedCategory}
                          </span>

                          {item.brand ? (
                            <span className="rounded-lg bg-neutral-950 px-2.5 py-1 text-xs text-white">
                              {item.brand}
                            </span>
                          ) : null}
                        </div>

                        <Link
                          href={productHref}
                          className="line-clamp-2 min-h-12 text-base font-semibold leading-6 text-neutral-950 transition hover:text-emerald-700 md:text-lg"
                        >
                          {item.name}
                        </Link>

                        <div className="mt-4 flex items-end justify-between gap-4">
                          <div>
                            <p className="text-lg font-semibold text-neutral-950">
                              {item.price}
                            </p>

                            <p
                              className={`mt-1 text-xs ${
                                item.stockStatus === "in_stock" &&
                                item.stockQuantity > 0
                                  ? "text-emerald-700"
                                  : item.stockStatus === "pre_order"
                                    ? "text-amber-700"
                                    : "text-red-600"
                              }`}
                            >
                              {stockLabel}
                            </p>
                          </div>
                        </div>

                        <div className="mt-5 border-t border-neutral-100 pt-5">
                          <button
                            type="button"
                            onClick={() => {
                              if (!canAddToCart || item.priceAmount === null) {
                                return;
                              }

                              addItem({
                                id: item.id,
                                name: item.name,
                                slug: item.slug,
                                price: item.priceAmount,
                                priceLabel: item.price,
                                imageUrl: item.imageUrl,
                                category: localizedCategory,
                                brand: item.brand,
                                maxQuantity: item.stockQuantity,
                                quantity: 1,
                              });
                            }}
                            disabled={!canAddToCart || isSyncing}
                            className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-neutral-950 px-4 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-neutral-300"
                          >
                            <ShoppingCart
                              className="mr-2 size-4"
                              aria-hidden="true"
                            />

                            {t.addToCart}
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Empty state */
            <div className="mx-auto max-w-2xl rounded-2xl border border-neutral-200 bg-white p-7 text-center shadow-sm md:p-10">
              <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                <Heart className="size-8" aria-hidden="true" />
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
                className="group mt-6 inline-flex items-center justify-center rounded-lg bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                <PackageSearch className="mr-2 size-4" aria-hidden="true" />

                {t.emptyButton}

                <ArrowRight
                  className="ml-2 size-4 transition group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}

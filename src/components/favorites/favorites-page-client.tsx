"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { Heart, PackageSearch, ShoppingCart, Trash2 } from "lucide-react";
import { useFavorites } from "@/components/favorites/favorites-provider";
import { useCart } from "@/components/cart/cart-provider";
import { Container } from "@/components/layout/container";
import {
  favoritesTranslations,
  type FavoritesLocale,
} from "@/data/translations/favorites";

type FavoritesPageClientProps = {
  locale?: FavoritesLocale;
};

function withLocalePath(locale: FavoritesLocale, path: string) {
  if (locale === "az") {
    return path;
  }

  return `/${locale}${path}`;
}

function getStockLabel(
  stockStatus: string,
  stockQuantity: number,
  locale: FavoritesLocale
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
  const {
    items,
    removeFavorite,
    clearFavorites,
    syncFavorites,
    isSyncing,
  } = useFavorites();

  const { addItem } = useCart();
  const t = favoritesTranslations[locale];

  useEffect(() => {
    void syncFavorites();
  }, [syncFavorites]);

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
            <div className="space-y-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-neutral-500">
                  {isSyncing
                    ? t.syncing
                    : `${items.length} ${t.countSuffix}`}
                </p>

                <button
                  type="button"
                  onClick={clearFavorites}
                  disabled={isSyncing}
                  className="w-fit rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 transition hover:border-red-300 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {t.clearAll}
                </button>
              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {items.map((item) => {
                  const canAddToCart =
                    item.priceAmount !== null &&
                    item.stockStatus === "in_stock" &&
                    item.stockQuantity > 0;

                  return (
                    <article
                      key={item.id}
                      className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm"
                    >
                      <Link
                        href={withLocalePath(locale, `/products/${item.slug}`)}
                        className="relative flex aspect-square items-center justify-center bg-neutral-100"
                      >
                        {item.imageUrl ? (
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            sizes="(min-width: 1280px) 33vw, 50vw"
                            className="object-contain p-8"
                          />
                        ) : (
                          <Heart className="size-10 text-neutral-400" />
                        )}
                      </Link>

                      <div className="p-5">
                        <div className="mb-3 flex flex-wrap gap-2">
                          <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-500">
                            {item.category}
                          </span>

                          {item.brand ? (
                            <span className="rounded-full bg-neutral-950 px-3 py-1 text-xs text-white">
                              {item.brand}
                            </span>
                          ) : null}
                        </div>

                        <Link
                          href={withLocalePath(locale, `/products/${item.slug}`)}
                          className="line-clamp-2 text-lg font-semibold text-neutral-950 transition hover:text-neutral-600"
                        >
                          {item.name}
                        </Link>

                        <p className="mt-3 text-sm font-semibold text-neutral-950">
                          {item.price}
                        </p>

                        <p className="mt-1 text-xs text-neutral-500">
                          {getStockLabel(
                            item.stockStatus,
                            item.stockQuantity,
                            locale
                          )}
                        </p>

                        <div className="mt-5 grid grid-cols-[1fr_auto] gap-2">
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
                                category: item.category,
                                brand: item.brand,
                                maxQuantity: item.stockQuantity,
                                quantity: 1,
                              });
                            }}
                            disabled={!canAddToCart || isSyncing}
                            className="inline-flex h-11 items-center justify-center rounded-full bg-neutral-950 px-4 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300"
                          >
                            <ShoppingCart
                              className="mr-2 size-4"
                              aria-hidden="true"
                            />
                            {t.addToCart}
                          </button>

                          <button
                            type="button"
                            onClick={() => removeFavorite(item.id)}
                            disabled={isSyncing}
                            aria-label={t.removeAria}
                            className="inline-flex size-11 items-center justify-center rounded-full border border-red-200 text-red-600 transition hover:border-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <Trash2 className="size-4" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-3xl rounded-[2rem] border border-neutral-200 bg-white p-8 text-center shadow-sm lg:p-12">
              <div className="mx-auto flex size-20 items-center justify-center rounded-[2rem] bg-neutral-950 text-white">
                <Heart className="size-9" aria-hidden="true" />
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
                href={withLocalePath(locale, "/products")}
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
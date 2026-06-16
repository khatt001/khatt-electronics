"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import {
  ArrowRight,
  BarChart3,
  PackageSearch,
  ShoppingCart,
  Trash2,
} from "lucide-react";

import { useCart } from "@/components/cart/cart-provider";
import { useCompare } from "@/components/compare/compare-provider";
import { Container } from "@/components/layout/container";
import { getCategoryName } from "@/data/translations/categories";
import {
  compareTranslations,
  type CompareLocale,
} from "@/data/translations/compare";
import { localizedPath } from "@/lib/i18n";

type ComparePageClientProps = {
  locale?: CompareLocale;
};

function getStockLabel(
  item: {
    stockStatus: "in_stock" | "out_of_stock" | "pre_order";
    stockQuantity: number;
  },
  locale: CompareLocale,
) {
  const t = compareTranslations[locale];

  if (item.stockStatus === "in_stock" && item.stockQuantity > 0) {
    return `${t.inStockPrefix} ${item.stockQuantity} ${t.inStockSuffix}`;
  }

  if (item.stockStatus === "pre_order") {
    return t.preOrder;
  }

  return t.outOfStock;
}

export function ComparePageClient({
  locale = "az",
}: ComparePageClientProps) {
  const {
    items,
    removeCompare,
    clearCompare,
    syncCompare,
    isSyncing,
    limit,
  } = useCompare();

  const { addItem } = useCart();
  const t = compareTranslations[locale];

  useEffect(() => {
    void syncCompare();
  }, [syncCompare]);

  const specificationKeys = useMemo(() => {
    const keys = new Set<string>();

    items.forEach((item) => {
      item.specifications?.forEach((spec) => {
        if (spec.key.trim()) {
          keys.add(spec.key.trim());
        }
      });
    });

    return Array.from(keys);
  }, [items]);

  function getSpecValue(productId: string, key: string) {
    const product = items.find((item) => item.id === productId);

    const spec = product?.specifications?.find(
      (itemSpec) => itemSpec.key.trim() === key,
    );

    return spec?.value || "—";
  }

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
                <BarChart3 className="size-4" aria-hidden="true" />
                {items.length}/{limit} {t.countText}
              </div>
            ) : null}
          </div>
        </Container>
      </section>

      <section className="py-8 md:py-10 lg:py-12">
        <Container>
          {items.length > 0 ? (
            <div className="space-y-5">
              {/* Controls */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-neutral-500">
                  {isSyncing
                    ? t.syncing
                    : `${items.length}/${limit} ${t.countText}`}
                </p>

                <button
                  type="button"
                  onClick={clearCompare}
                  disabled={isSyncing}
                  className="inline-flex w-fit items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Trash2 className="mr-2 size-4" aria-hidden="true" />
                  {t.clearAll}
                </button>
              </div>

              {/* Compare table */}
              <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[780px] border-collapse">
                    <thead>
                      <tr>
                        <th className="sticky left-0 z-30 w-44 border-b border-neutral-200 bg-neutral-50 p-4 text-left text-sm font-semibold text-neutral-700">
                          {t.featureColumn}
                        </th>

                        {items.map((item) => {
                          const productHref = localizedPath(
                            `/products/${item.slug}`,
                            locale,
                          );

                          return (
                            <th
                              key={item.id}
                              className="min-w-56 border-b border-l border-neutral-200 bg-white p-4 align-top"
                            >
                              <div className="relative">
                                <button
                                  type="button"
                                  onClick={() => removeCompare(item.id)}
                                  disabled={isSyncing}
                                  aria-label={t.removeAria}
                                  className="absolute right-0 top-0 z-10 inline-flex size-9 items-center justify-center rounded-lg border border-red-200 bg-white text-red-600 transition hover:border-red-300 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  <Trash2
                                    className="size-4"
                                    aria-hidden="true"
                                  />
                                </button>

                                <Link
                                  href={productHref}
                                  className="mx-auto flex size-32 items-center justify-center overflow-hidden rounded-xl bg-neutral-100"
                                >
                                  {item.imageUrl ? (
                                    <Image
                                      src={item.imageUrl}
                                      alt={item.name}
                                      width={128}
                                      height={128}
                                      className="h-full w-full object-contain p-4 transition duration-300 hover:scale-105"
                                    />
                                  ) : (
                                    <BarChart3
                                      className="size-9 text-neutral-400"
                                      aria-hidden="true"
                                    />
                                  )}
                                </Link>

                                <Link
                                  href={productHref}
                                  className="mx-auto mt-4 line-clamp-2 block min-h-10 max-w-[190px] text-center text-sm font-semibold leading-5 text-neutral-950 transition hover:text-emerald-700"
                                >
                                  {item.name}
                                </Link>
                              </div>
                            </th>
                          );
                        })}
                      </tr>
                    </thead>

                    <tbody>
                      {/* Price */}
                      <tr>
                        <td className="sticky left-0 z-20 border-b border-neutral-200 bg-neutral-50 p-4 text-sm font-medium text-neutral-700">
                          {t.price}
                        </td>

                        {items.map((item) => (
                          <td
                            key={item.id}
                            className="border-b border-l border-neutral-200 p-4 text-center text-sm font-semibold text-neutral-950"
                          >
                            {item.price}
                          </td>
                        ))}
                      </tr>

                      {/* Category */}
                      <tr>
                        <td className="sticky left-0 z-20 border-b border-neutral-200 bg-neutral-50 p-4 text-sm font-medium text-neutral-700">
                          {t.category}
                        </td>

                        {items.map((item) => (
                          <td
                            key={item.id}
                            className="border-b border-l border-neutral-200 p-4 text-center text-sm text-neutral-700"
                          >
                            {getCategoryName(item.category, locale)}
                          </td>
                        ))}
                      </tr>

                      {/* Brand */}
                      <tr>
                        <td className="sticky left-0 z-20 border-b border-neutral-200 bg-neutral-50 p-4 text-sm font-medium text-neutral-700">
                          {t.brand}
                        </td>

                        {items.map((item) => (
                          <td
                            key={item.id}
                            className="border-b border-l border-neutral-200 p-4 text-center text-sm text-neutral-700"
                          >
                            {item.brand ?? "—"}
                          </td>
                        ))}
                      </tr>

                      {/* Stock */}
                      <tr>
                        <td className="sticky left-0 z-20 border-b border-neutral-200 bg-neutral-50 p-4 text-sm font-medium text-neutral-700">
                          {t.stock}
                        </td>

                        {items.map((item) => {
                          const stockLabel = getStockLabel(item, locale);

                          const stockClass =
                            item.stockStatus === "in_stock" &&
                            item.stockQuantity > 0
                              ? "text-emerald-700"
                              : item.stockStatus === "pre_order"
                                ? "text-amber-700"
                                : "text-red-600";

                          return (
                            <td
                              key={item.id}
                              className={`border-b border-l border-neutral-200 p-4 text-center text-sm font-medium ${stockClass}`}
                            >
                              {stockLabel}
                            </td>
                          );
                        })}
                      </tr>

                      {/* Technical specifications */}
                      {specificationKeys.length > 0 ? (
                        <>
                          <tr>
                            <td
                              colSpan={items.length + 1}
                              className="border-b border-neutral-200 bg-neutral-950 px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-white"
                            >
                              {t.technicalSpecs}
                            </td>
                          </tr>

                          {specificationKeys.map((key) => (
                            <tr key={key}>
                              <td className="sticky left-0 z-20 border-b border-neutral-200 bg-neutral-50 p-4 text-sm font-medium text-neutral-700">
                                {key}
                              </td>

                              {items.map((item) => (
                                <td
                                  key={`${item.id}-${key}`}
                                  className="border-b border-l border-neutral-200 p-4 text-center text-sm leading-6 text-neutral-700"
                                >
                                  {getSpecValue(item.id, key)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </>
                      ) : null}

                      {/* Add to cart */}
                      <tr>
                        <td className="sticky left-0 z-20 bg-neutral-50 p-4 text-sm font-medium text-neutral-700">
                          {t.order}
                        </td>

                        {items.map((item) => {
                          const canAddToCart =
                            item.priceAmount !== null &&
                            item.stockStatus === "in_stock" &&
                            item.stockQuantity > 0;

                          const localizedCategory = getCategoryName(
                            item.category,
                            locale,
                          );

                          return (
                            <td
                              key={item.id}
                              className="border-l border-neutral-200 p-4 text-center"
                            >
                              <button
                                type="button"
                                onClick={() => {
                                  if (
                                    !canAddToCart ||
                                    item.priceAmount === null
                                  ) {
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
                                className="inline-flex h-10 items-center justify-center rounded-lg bg-neutral-950 px-4 text-xs font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-neutral-300"
                              >
                                <ShoppingCart
                                  className="mr-2 size-4"
                                  aria-hidden="true"
                                />

                                {t.addToCart}
                              </button>
                            </td>
                          );
                        })}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <p className="text-xs leading-5 text-neutral-500">
                Mobil cihazlarda müqayisə cədvəlini sağa və sola sürüşdürərək
                bütün məhsullara baxa bilərsiniz.
              </p>
            </div>
          ) : (
            /* Empty state */
            <div className="mx-auto max-w-2xl rounded-2xl border border-neutral-200 bg-white p-7 text-center shadow-sm md:p-10">
              <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                <BarChart3 className="size-8" aria-hidden="true" />
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
                <PackageSearch
                  className="mr-2 size-4"
                  aria-hidden="true"
                />

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
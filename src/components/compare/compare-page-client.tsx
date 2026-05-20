"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { BarChart3, PackageSearch, ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { useCompare } from "@/components/compare/compare-provider";
import { Container } from "@/components/layout/container";
import {
  compareTranslations,
  type CompareLocale,
} from "@/data/translations/compare";

type ComparePageClientProps = {
  locale?: CompareLocale;
};

function withLocalePath(locale: CompareLocale, path: string) {
  if (locale === "az") {
    return path;
  }

  return `/${locale}${path}`;
}

function getStockLabel(
  item: {
    stockStatus: "in_stock" | "out_of_stock" | "pre_order";
    stockQuantity: number;
  },
  locale: CompareLocale
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

export function ComparePageClient({ locale = "az" }: ComparePageClientProps) {
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
      (itemSpec) => itemSpec.key.trim() === key
    );

    return spec?.value || "—";
  }

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
                    : `${items.length}/${limit} ${t.countText}`}
                </p>

                <button
                  type="button"
                  onClick={clearCompare}
                  disabled={isSyncing}
                  className="w-fit rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 transition hover:border-red-300 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {t.clearAll}
                </button>
              </div>

              <div className="overflow-x-auto rounded-3xl border border-neutral-200 bg-white shadow-sm">
                <table className="w-full min-w-[760px] border-collapse">
                  <thead>
                    <tr>
                      <th className="sticky left-0 z-20 w-44 border-b border-neutral-200 bg-neutral-50 p-4 text-left text-sm font-semibold text-neutral-700">
                        {t.featureColumn}
                      </th>

                      {items.map((item) => (
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
                              className="absolute right-0 top-0 inline-flex size-8 items-center justify-center rounded-full border border-red-200 text-red-600 transition hover:border-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <Trash2 className="size-4" aria-hidden="true" />
                            </button>

                            <Link
                              href={withLocalePath(
                                locale,
                                `/products/${item.slug}`
                              )}
                              className="mx-auto flex size-32 items-center justify-center rounded-2xl bg-neutral-100"
                            >
                              {item.imageUrl ? (
                                <Image
                                  src={item.imageUrl}
                                  alt={item.name}
                                  width={128}
                                  height={128}
                                  className="h-full w-full object-contain p-4"
                                />
                              ) : (
                                <BarChart3 className="size-9 text-neutral-400" />
                              )}
                            </Link>

                            <Link
                              href={withLocalePath(
                                locale,
                                `/products/${item.slug}`
                              )}
                              className="mt-4 line-clamp-2 block text-center text-sm font-semibold text-neutral-950 transition hover:text-neutral-600"
                            >
                              {item.name}
                            </Link>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td className="sticky left-0 z-10 border-b border-neutral-200 bg-neutral-50 p-4 text-sm font-medium text-neutral-700">
                        {t.price}
                      </td>
                      {items.map((item) => (
                        <td
                          key={item.id}
                          className="border-b border-l border-neutral-200 p-4 text-center text-sm font-semibold"
                        >
                          {item.price}
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td className="sticky left-0 z-10 border-b border-neutral-200 bg-neutral-50 p-4 text-sm font-medium text-neutral-700">
                        {t.category}
                      </td>
                      {items.map((item) => (
                        <td
                          key={item.id}
                          className="border-b border-l border-neutral-200 p-4 text-center text-sm"
                        >
                          {item.category}
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td className="sticky left-0 z-10 border-b border-neutral-200 bg-neutral-50 p-4 text-sm font-medium text-neutral-700">
                        {t.brand}
                      </td>
                      {items.map((item) => (
                        <td
                          key={item.id}
                          className="border-b border-l border-neutral-200 p-4 text-center text-sm"
                        >
                          {item.brand ?? "—"}
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td className="sticky left-0 z-10 border-b border-neutral-200 bg-neutral-50 p-4 text-sm font-medium text-neutral-700">
                        {t.stock}
                      </td>
                      {items.map((item) => (
                        <td
                          key={item.id}
                          className="border-b border-l border-neutral-200 p-4 text-center text-sm"
                        >
                          {getStockLabel(item, locale)}
                        </td>
                      ))}
                    </tr>

                    {specificationKeys.length > 0 ? (
                      <>
                        <tr>
                          <td
                            colSpan={items.length + 1}
                            className="border-b border-neutral-200 bg-neutral-950 px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-white"
                          >
                            {t.technicalSpecs}
                          </td>
                        </tr>

                        {specificationKeys.map((key) => (
                          <tr key={key}>
                            <td className="sticky left-0 z-10 border-b border-neutral-200 bg-neutral-50 p-4 text-sm font-medium text-neutral-700">
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

                    <tr>
                      <td className="sticky left-0 z-10 bg-neutral-50 p-4 text-sm font-medium text-neutral-700">
                        {t.order}
                      </td>

                      {items.map((item) => {
                        const canAddToCart =
                          item.priceAmount !== null &&
                          item.stockStatus === "in_stock" &&
                          item.stockQuantity > 0;

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
                                  category: item.category,
                                  brand: item.brand,
                                  maxQuantity: item.stockQuantity,
                                  quantity: 1,
                                });
                              }}
                              disabled={!canAddToCart || isSyncing}
                              className="inline-flex h-10 items-center justify-center rounded-full bg-neutral-950 px-4 text-xs font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300"
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
          ) : (
            <div className="mx-auto max-w-3xl rounded-[2rem] border border-neutral-200 bg-white p-8 text-center shadow-sm lg:p-12">
              <div className="mx-auto flex size-20 items-center justify-center rounded-[2rem] bg-neutral-950 text-white">
                <BarChart3 className="size-9" aria-hidden="true" />
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
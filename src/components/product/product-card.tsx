

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { QuickAddToCartButton } from "@/components/cart/quick-add-to-cart-button";
import { FavoriteButton } from "@/components/favorites/favorites-button";
import type { ProductCardItem } from "@/services/products";
import { CompareButton } from "@/components/compare/compare-button";
import {
  productCardTranslations,
  type ProductCardLocale,
} from "@/data/translations/product-card";
import { getCategoryName } from "@/data/translations/categories";
import { localizedPath } from "@/lib/i18n";

type ProductCardProps = {
  product: ProductCardItem;
  locale?: ProductCardLocale;
  priority?: boolean;
  compact?: boolean;
  isNew?: boolean;
};
function getLocalizedBadge(product: ProductCardItem, locale: ProductCardLocale) {
  const t = productCardTranslations[locale];
  if (product.stockStatus === "in_stock") return t.badgeInStock;
  if (product.stockStatus === "pre_order") return t.badgePreOrder;
  return t.badgeOutOfStock;
}

function getLocalizedPrice(product: ProductCardItem, locale: ProductCardLocale) {
  const t = productCardTranslations[locale];
  if (product.priceAmount === null) return t.priceOnRequest;
  return product.price;
}

function getLocalizedStock(product: ProductCardItem, locale: ProductCardLocale) {
  const t = productCardTranslations[locale];
  if (product.stockStatus === "in_stock" && product.stockQuantity > 0) {
    return `${t.inStockPrefix} ${product.stockQuantity} ${t.inStockSuffix}`;
  }
  if (product.stockStatus === "pre_order") return t.preOrder;
  return t.outOfStock;
}

export function ProductCard({
  product,
  locale = "az",
  priority = false,
  compact = false,
  isNew = false,
}: ProductCardProps) {
  const t = productCardTranslations[locale];

  const canAddToCart =
    product.priceAmount !== null &&
    product.stockStatus === "in_stock" &&
    product.stockQuantity > 0;

  const localizedHref = localizedPath(product.href, locale);
  const localizedBadge = getLocalizedBadge(product, locale);
  const localizedPrice = getLocalizedPrice(product, locale);
  const localizedStock = getLocalizedStock(product, locale);
  const localizedCategory = getCategoryName(product.category, locale);

  // Single shared object — both FavoriteButton and CompareButton need the same shape.
  // Previously two identical objects were created on every render.
  const sharedItem = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: localizedPrice,
    priceAmount: product.priceAmount,
    imageUrl: product.imageUrl,
    category: localizedCategory,
    brand: product.brand,
    stockStatus: product.stockStatus,
    stockQuantity: product.stockQuantity,
  };

  return (
    <article
      className={
        compact
          ? "group relative flex h-full min-w-0 flex-col border-b border-r border-neutral-200 bg-white transition hover:shadow-[0_10px_35px_rgba(0,0,0,0.08)]"
          : "group flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-xl"
      }
      aria-label={product.name}
    >
      <div
        className={
          compact
            ? "relative aspect-[1/0.92] overflow-hidden bg-white"
            : "relative aspect-square overflow-hidden bg-gradient-to-br from-neutral-100 via-white to-neutral-50"
        }
      >
        <Link
          href={localizedHref}
          className={
            compact
              ? "absolute inset-0 flex items-center justify-center p-5"
              : "absolute inset-0 flex items-center justify-center p-8"
          }
          aria-label={`${product.name} ${t.viewProductAria}`}
          tabIndex={-1}
          aria-hidden="true"
        >
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              priority={priority}
              sizes={
                compact
                  ? "(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  : "(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
              }
              className={
                compact
                  ? "object-contain p-5 transition duration-500 group-hover:scale-105"
                  : "object-contain p-8 transition duration-500 group-hover:scale-105"
              }
            />
          ) : (
            <div className="flex size-24 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50">
              <ShoppingBag
                className="size-9 text-neutral-600"
                aria-hidden="true"
              />
            </div>
          )}
        </Link>

        {isNew ? (
          <span className="absolute left-4 top-4 z-20 rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-semibold text-white">
            Yeni gələn
          </span>
        ) : (
          <span className="absolute left-4 top-4 z-20 rounded-full border border-white/70 bg-white/90 px-3 py-1 text-xs font-medium text-neutral-700 shadow-sm backdrop-blur">
            {localizedBadge}
          </span>
        )}

        {!compact ? (
          <div className="absolute right-4 top-4 z-30 flex flex-col gap-2">
            <FavoriteButton item={sharedItem} locale={locale} />
            <CompareButton item={sharedItem} locale={locale} />
          </div>
        ) : null}
      </div>

      <div
        className={
          compact
            ? "flex flex-1 flex-col px-5 pb-5 pt-3"
            : "flex flex-1 flex-col p-5"
        }
      >
        {!compact ? (
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-600">
              {localizedCategory}
            </span>

            {product.brand ? (
              <span className="rounded-full bg-neutral-950 px-3 py-1 text-xs text-white">
                {product.brand}
              </span>
            ) : null}
          </div>
        ) : (
          <div className="flex items-center justify-between gap-3">
            <span className="line-clamp-1 text-xs text-neutral-500">
              {localizedCategory}
            </span>

            {product.brand ? (
              <span className="line-clamp-1 text-[11px] font-medium text-neutral-500">
                {product.brand}
              </span>
            ) : null}
          </div>
        )}

        <Link href={localizedHref} className={compact ? "mt-3 block" : "mt-4 block"}>
          <h3
            className={
              compact
                ? "line-clamp-2 min-h-11 text-sm font-medium leading-5 text-neutral-950 transition hover:text-emerald-600"
                : "line-clamp-2 text-lg font-semibold leading-snug text-neutral-950 transition hover:text-neutral-600"
            }
          >
            {product.name}
          </h3>
        </Link>

        <div className={compact ? "mt-3" : "mt-auto pt-5"}>
          <p
            className={
              product.stockStatus === "in_stock"
                ? "text-xs font-medium text-emerald-600"
                : "text-xs font-medium text-neutral-500"
            }
          >
            {localizedStock}
          </p>
        </div>

        <div className="mt-auto pt-4">
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              {!compact ? (
                <p className="text-xs text-neutral-500">{t.priceLabel}</p>
              ) : null}

              <p
                className={
                  compact
                    ? "mt-1 text-base font-semibold text-neutral-950"
                    : "mt-1 text-sm font-semibold text-neutral-900"
                }
              >
                {localizedPrice}
              </p>
            </div>

            {product.priceAmount !== null ? (
              <QuickAddToCartButton
                item={{
                  id: product.id,
                  name: product.name,
                  slug: product.slug,
                  price: product.priceAmount,
                  priceLabel: localizedPrice,
                  imageUrl: product.imageUrl,
                  category: localizedCategory,
                  brand: product.brand,
                  maxQuantity: product.stockQuantity,
                }}
                disabled={!canAddToCart}
                locale={locale}
              />
            ) : (
              <Link
                href={localizedHref}
                aria-label={`${product.name} ${t.viewProductAria}`}
                className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 text-neutral-700 transition hover:bg-neutral-950 hover:text-white"
              >
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

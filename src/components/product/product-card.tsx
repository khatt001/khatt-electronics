import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Flame } from "lucide-react";

import { getCategoryName } from "@/data/translations/categories";
import {
  productCardTranslations,
  type ProductCardLocale,
} from "@/data/translations/product-card";
import { localizedPath } from "@/lib/i18n";
import type { ProductCardItem } from "@/services/products";

type ProductCardProps = {
  product: ProductCardItem;
  locale?: ProductCardLocale;
  priority?: boolean;
  compact?: boolean;
  isNew?: boolean;
};

function getLocalizedBadge(
  product: ProductCardItem,
  locale: ProductCardLocale,
) {
  const t = productCardTranslations[locale];

  if (product.stockStatus === "in_stock") {
    return t.badgeInStock;
  }

  if (product.stockStatus === "pre_order") {
    return t.badgePreOrder;
  }

  return t.badgeOutOfStock;
}

function getLocalizedPrice(
  product: ProductCardItem,
  locale: ProductCardLocale,
) {
  const t = productCardTranslations[locale];

  if (product.priceAmount === null) {
    return t.priceOnRequest;
  }

  return product.price;
}

function getLocalizedStock(
  product: ProductCardItem,
  locale: ProductCardLocale,
) {
  const t = productCardTranslations[locale];

  if (product.stockStatus === "in_stock" && product.stockQuantity > 0) {
    return `${t.inStockPrefix} ${product.stockQuantity} ${t.inStockSuffix}`;
  }

  if (product.stockStatus === "pre_order") {
    return t.preOrder;
  }

  return t.outOfStock;
}

function getNewLabel(locale: ProductCardLocale) {
  if (locale === "en") return "New arrival";
  if (locale === "ru") return "Новинка";

  return "Yeni gələn";
}

export function ProductCard({
  product,
  locale = "az",
  priority = false,
  compact = false,
  isNew = false,
}: ProductCardProps) {
  const t = productCardTranslations[locale];

  const localizedHref = localizedPath(product.href, locale);

  const localizedBadge = getLocalizedBadge(product, locale);

  const localizedPrice = getLocalizedPrice(product, locale);

  const localizedStock = getLocalizedStock(product, locale);

  const localizedCategory = getCategoryName(product.category, locale);

  return (
    <article
      className={
        compact
          ? "group relative flex h-full min-w-0 flex-col border-b border-r border-line bg-surface transition hover:z-10 hover:shadow-[0_10px_35px_rgba(0,0,0,0.08)]"
          : "group flex h-full flex-col overflow-hidden rounded-md border border-line bg-surface transition duration-300 hover:border-ink"
      }
      aria-label={product.name}
    >
      <div
        className={
          compact
            ? "relative aspect-[1/0.92] overflow-hidden bg-surface"
            : "relative aspect-square overflow-hidden bg-surface"
        }
      >
        <Link
          href={localizedHref}
          className={
            compact
              ? "absolute inset-0 flex items-center justify-center p-5"
              : "absolute inset-0 flex items-center justify-center p-6 md:p-8"
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
                  : "object-contain p-7 transition duration-500 group-hover:scale-105"
              }
            />
          ) : (
            <div className="flex size-24 items-center justify-center rounded-md border border-line bg-surface text-muted shadow-sm">
              <Flame className="size-9" aria-hidden="true" />
            </div>
          )}
        </Link>

        {isNew ? (
          <span className="absolute left-4 top-4 z-20 rounded bg-signal px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm">
            {getNewLabel(locale)}
          </span>
        ) : (
          <span className="absolute left-4 top-4 z-20 rounded border border-line bg-white/95 px-3 py-1.5 text-xs font-medium text-ink shadow-sm backdrop-blur">
            {localizedBadge}
          </span>
        )}

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
            <span className="rounded bg-paper px-3 py-1 text-xs text-muted">
              {localizedCategory}
            </span>

            {product.brand ? (
              <span className="rounded bg-ink px-3 py-1 text-xs text-white">
                {product.brand}
              </span>
            ) : null}
          </div>
        ) : (
          <div className="flex items-center justify-between gap-3">
            <span className="line-clamp-1 text-xs text-muted">
              {localizedCategory}
            </span>

            {product.brand ? (
              <span className="line-clamp-1 text-[11px] font-medium text-muted">
                {product.brand}
              </span>
            ) : null}
          </div>
        )}

        <Link
          href={localizedHref}
          className={compact ? "mt-3 block" : "mt-4 block"}
        >
          <h3
            className={
              compact
                ? "line-clamp-2 min-h-11 text-sm font-medium leading-5 text-ink transition hover:text-ok"
                : "line-clamp-2 text-base font-semibold leading-6 text-ink transition hover:text-ok md:text-lg"
            }
          >
            {product.name}
          </h3>
        </Link>

        <div className={compact ? "mt-3" : "mt-auto pt-5"}>
          <p
            className={
              product.stockStatus === "in_stock"
                ? "text-xs font-medium text-ok"
                : "text-xs font-medium text-muted"
            }
          >
            {localizedStock}
          </p>
        </div>

        <div className="mt-auto pt-4">
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              {!compact ? (
                <p className="text-xs text-muted">{t.priceLabel}</p>
              ) : null}

              <p
                className={
                  compact
                    ? "mt-1 text-base font-semibold text-ink"
                    : "mt-1 text-lg font-semibold text-ink"
                }
              >
                {localizedPrice}
              </p>
            </div>

            <Link
              href={`${localizedPath("/contact", locale)}?product=${encodeURIComponent(product.name)}`}
              aria-label={`${product.name}: ${t.quoteAria}`}
              className="inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-md border border-line px-3 text-xs font-semibold text-ink transition hover:border-signal hover:bg-signal hover:text-white"
            >
              {t.quoteButton}
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

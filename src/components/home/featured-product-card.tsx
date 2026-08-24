import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { QuickAddToCartButton } from "@/components/cart/quick-add-to-cart-button";
import { CompareButton } from "@/components/compare/compare-button";
import { FavoriteButton } from "@/components/favorites/favorites-button";
import { getCategoryName } from "@/data/translations/categories";
import {
  productCardTranslations,
  type ProductCardLocale,
} from "@/data/translations/product-card";
import { localizedPath } from "@/lib/i18n";
import type { ProductCardItem } from "@/services/products";

type FeaturedProductCardProps = {
  product: ProductCardItem;
  locale?: ProductCardLocale;
  priority?: boolean;
};

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

  if (
    product.stockStatus === "in_stock" &&
    product.stockQuantity > 0
  ) {
    return `${t.inStockPrefix} ${product.stockQuantity} ${t.inStockSuffix}`;
  }

  if (product.stockStatus === "pre_order") {
    return t.preOrder;
  }

  return t.outOfStock;
}

function getNewLabel(locale: ProductCardLocale) {
  if (locale === "en") return "New";
  if (locale === "ru") return "Новинка";

  return "Yeni";
}

export function FeaturedProductCard({
  product,
  locale = "az",
  priority = false,
}: FeaturedProductCardProps) {
  const t = productCardTranslations[locale];

  const localizedHref = localizedPath(product.href, locale);
  const localizedCategory = getCategoryName(
    product.category,
    locale,
  );
  const localizedPrice = getLocalizedPrice(product, locale);
  const localizedStock = getLocalizedStock(product, locale);

  const canAddToCart =
    product.priceAmount !== null &&
    product.stockStatus === "in_stock" &&
    product.stockQuantity > 0;

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
      aria-label={product.name}
      className="group flex h-full min-w-0 flex-col bg-white"
    >
      <div className="relative aspect-[4/3] overflow-hidden border-b border-neutral-100 bg-[#f7f7f5]">
        <Link
          href={localizedHref}
          aria-label={`${product.name} ${t.viewProductAria}`}
          className="absolute inset-0"
        >
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              priority={priority}
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 85vw"
              className="object-contain p-8 transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />
          ) : null}
        </Link>

        <span className="absolute left-4 top-4 z-20 rounded-full border border-emerald-200 bg-emerald-50/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-700 backdrop-blur">
          {getNewLabel(locale)}
        </span>

        <div className="absolute right-3 top-3 z-30 flex flex-col gap-2">
          <FavoriteButton item={sharedItem} locale={locale} />
          <CompareButton item={sharedItem} locale={locale} />
        </div>

        <Link
          href={localizedHref}
          aria-label={`${product.name} ${t.viewProductAria}`}
          className="absolute bottom-4 right-4 z-20 flex size-10 translate-y-2 items-center justify-center rounded-full bg-neutral-950 text-white opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </Link>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex min-h-5 items-center justify-between gap-3">
          <span className="line-clamp-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-neutral-500">
            {localizedCategory}
          </span>

          {product.brand ? (
            <span className="line-clamp-1 text-[11px] font-semibold text-neutral-800">
              {product.brand}
            </span>
          ) : null}
        </div>

        <Link href={localizedHref} className="mt-3 block">
          <h3 className="line-clamp-2 min-h-12 text-base font-semibold leading-6 text-neutral-950 transition-colors group-hover:text-emerald-700">
            {product.name}
          </h3>
        </Link>

        <p
          className={
            product.stockStatus === "in_stock"
              ? "mt-3 text-xs font-medium text-emerald-700"
              : "mt-3 text-xs font-medium text-neutral-500"
          }
        >
          {localizedStock}
        </p>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-neutral-100 pt-5">
          <div className="min-w-0">
            <p className="text-[11px] text-neutral-400">
              {t.priceLabel}
            </p>

            <p className="mt-1 text-lg font-semibold tracking-tight text-neutral-950">
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
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-neutral-200 text-neutral-700 transition hover:border-emerald-600 hover:bg-emerald-600 hover:text-white"
            >
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
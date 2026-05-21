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
  priority?: boolean
};

function getLocalizedBadge(product: ProductCardItem, locale: ProductCardLocale) {
  const t = productCardTranslations[locale];

  if (product.stockStatus === "in_stock") return t.badgeInStock;
  if (product.stockStatus === "pre_order") return t.badgePreOrder;

  return t.badgeOutOfStock;
}

function getLocalizedPrice(product: ProductCardItem, locale: ProductCardLocale) {
  const t = productCardTranslations[locale];

  if (product.priceAmount === null) {
    return t.priceOnRequest;
  }

  return product.price;
}

function getLocalizedStock(product: ProductCardItem, locale: ProductCardLocale) {
  const t = productCardTranslations[locale];

  if (product.stockStatus === "in_stock" && product.stockQuantity > 0) {
    return `${t.inStockPrefix} ${product.stockQuantity} ${t.inStockSuffix}`;
  }

  if (product.stockStatus === "pre_order") {
    return t.preOrder;
  }

  return t.outOfStock;
}

function getLocalizedHref(product: ProductCardItem, locale: ProductCardLocale) {
  return localizedPath(product.href, locale);
}

export function ProductCard({
  product,
  locale = "az",
  priority = false,
}: ProductCardProps) {
  const t = productCardTranslations[locale];

  const canAddToCart =
    product.priceAmount !== null &&
    product.stockStatus === "in_stock" &&
    product.stockQuantity > 0;

  const localizedHref = getLocalizedHref(product, locale);
  const localizedBadge = getLocalizedBadge(product, locale);
  const localizedPrice = getLocalizedPrice(product, locale);
  const localizedStock = getLocalizedStock(product, locale);
  const localizedCategory = getCategoryName(product.category, locale);

  const favoriteItem = {
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

  const compareItem = {
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
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-xl">
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-neutral-100 via-white to-neutral-50">
        <Link
          href={localizedHref}
          className="absolute inset-0 flex items-center justify-center p-8"
          aria-label={`${product.name} ${t.viewProductAria}`}
        >
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              priority={priority}
              loading={priority ? "eager" : "lazy"}
              sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-contain p-8 transition duration-500 group-hover:scale-105"
            />
            
          ) : (
            <div className="flex size-28 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm">
              <ShoppingBag
                className="size-10 text-neutral-800"
                aria-hidden="true"
              />
            </div>
          )}
        </Link>

        <span className="absolute left-4 top-4 z-20 rounded-full border border-white/70 bg-white/90 px-3 py-1 text-xs font-medium text-neutral-700 shadow-sm backdrop-blur">
          {localizedBadge}
        </span>

        <div className="absolute right-4 top-4 z-30 flex flex-col gap-2">
          <FavoriteButton item={favoriteItem} locale={locale} />
          <CompareButton item={compareItem} locale={locale} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
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

        <Link href={localizedHref} className="mt-4 block">
          <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-neutral-950 transition hover:text-neutral-600">
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto pt-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs text-neutral-400">{t.priceLabel}</p>
              <p className="mt-1 text-sm font-semibold text-neutral-900">
                {localizedPrice}
              </p>

              <p className="mt-1 text-xs text-neutral-500">
                {localizedStock}
              </p>
            </div>

            <Link
              href={localizedHref}
              aria-label={`${product.name} ${t.viewProductAria}`}
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-950 transition hover:border-neutral-950 hover:bg-neutral-950 hover:text-white"
            >
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-4">
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
              <button
                type="button"
                disabled
                className="inline-flex h-10 w-full items-center justify-center rounded-full bg-neutral-200 px-4 text-xs font-semibold text-neutral-500"
              >
                {t.priceInactive}
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { QuickAddToCartButton } from "@/components/cart/quick-add-to-cart-button";
import type { ProductCardItem } from "@/services/products";

type ProductCardProps = {
  product: ProductCardItem;
};

export function ProductCard({ product }: ProductCardProps) {
  const canAddToCart =
    product.priceAmount !== null &&
    product.stockStatus === "in_stock" &&
    product.stockQuantity > 0;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-xl">
      <Link
        href={product.href}
        className="relative flex aspect-square items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-100 via-white to-neutral-50 p-8"
        aria-label={`${product.name} məhsuluna bax`}
      >
        <span className="absolute left-4 top-4 z-10 rounded-full border border-white/70 bg-white/90 px-3 py-1 text-xs font-medium text-neutral-700 shadow-sm backdrop-blur">
          {product.badge}
        </span>

        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
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

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-600">
            {product.category}
          </span>

          {product.brand ? (
            <span className="rounded-full bg-neutral-950 px-3 py-1 text-xs text-white">
              {product.brand}
            </span>
          ) : null}
        </div>

        <Link href={product.href} className="mt-4 block">
          <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-neutral-950 transition hover:text-neutral-600">
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto pt-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs text-neutral-400">Qiymət</p>
              <p className="mt-1 text-sm font-semibold text-neutral-900">
                {product.price}
              </p>
            </div>

            <Link
              href={product.href}
              aria-label={`${product.name} məhsuluna bax`}
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
                  priceLabel: product.price,
                  imageUrl: product.imageUrl,
                  category: product.category,
                  brand: product.brand,
                  maxQuantity: product.stockQuantity,
                }}
                disabled={!canAddToCart}
              />
            ) : (
              <button
                type="button"
                disabled
                className="inline-flex h-10 w-full items-center justify-center rounded-full bg-neutral-200 px-4 text-xs font-semibold text-neutral-500"
              >
                Qiymət aktiv deyil
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
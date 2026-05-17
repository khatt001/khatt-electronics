import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import type { FeaturedProduct } from "@/services/products";

type ProductCardProps = {
  product: FeaturedProduct;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={product.href}
      className="group overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="flex aspect-square items-center justify-center bg-gradient-to-br from-neutral-100 to-white p-8">
        <div className="flex size-28 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm">
          <ShoppingBag className="size-10 text-neutral-800" aria-hidden="true" />
        </div>
      </div>

      <div className="p-5">
        <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-600">
          {product.badge}
        </span>

        <p className="mt-4 text-xs uppercase tracking-[0.18em] text-neutral-400">
          {product.category}
        </p>

        <h3 className="mt-2 text-lg font-semibold text-neutral-950">
          {product.name}
        </h3>

        <p className="mt-3 text-sm font-medium text-neutral-700">
          {product.price}
        </p>
      </div>
    </Link>
  );
}
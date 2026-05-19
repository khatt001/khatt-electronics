"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";

export function CartNavLink() {
  const { itemCount } = useCart();

  return (
    <Link
      href="/cart"
      aria-label="Səbət"
      className="relative hidden size-10 items-center justify-center rounded-full text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-950 md:inline-flex"
    >
      <ShoppingCart size={18} aria-hidden="true" />

      {itemCount > 0 ? (
        <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-emerald-500 text-[11px] font-semibold text-white">
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      ) : null}
    </Link>
  );
}
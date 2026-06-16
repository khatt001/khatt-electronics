"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import { useCart } from "@/components/cart/cart-provider";
import { cartTranslations, type CartLocale } from "@/data/translations/cart";
import { localizedPath } from "@/lib/i18n";

type CartNavLinkProps = {
  locale?: CartLocale;
};

export function CartNavLink({ locale = "az" }: CartNavLinkProps) {
  const { items } = useCart();
  const t = cartTranslations[locale];

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const visibleQuantity = totalQuantity > 99 ? "99+" : totalQuantity;

  return (
    <Link
      href={localizedPath("/cart", locale)}
      aria-label={t.cartAriaLabel}
      className="relative inline-flex size-10 shrink-0 items-center justify-center rounded-lg text-neutral-800 transition hover:bg-emerald-50 hover:text-emerald-700"
    >
      <ShoppingCart className="size-[21px]" aria-hidden="true" />

      {totalQuantity > 0 ? (
        <span className="absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-md bg-emerald-600 px-1 text-[10px] font-semibold leading-none text-white shadow-sm">
          {visibleQuantity}
        </span>
      ) : null}
    </Link>
  );
}

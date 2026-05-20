"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import {
  cartTranslations,
  type CartLocale,
} from "@/data/translations/cart";

type CartNavLinkProps = {
  locale?: CartLocale;
};

function getCartHref(locale: CartLocale) {
  if (locale === "az") {
    return "/cart";
  }

  return `/${locale}/cart`;
}

export function CartNavLink({ locale = "az" }: CartNavLinkProps) {
  const { items } = useCart();
  const t = cartTranslations[locale];

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link
      href={getCartHref(locale)}
      aria-label={t.cartAriaLabel}
      className="relative inline-flex size-10 items-center justify-center rounded-full text-neutral-800 transition hover:bg-neutral-100"
    >
      <ShoppingCart size={21} aria-hidden="true" />

      {totalQuantity > 0 ? (
        <span className="absolute -right-1 -top-1 flex min-w-5 items-center justify-center rounded-full bg-neutral-950 px-1.5 text-[11px] font-semibold text-white">
          {totalQuantity}
        </span>
      ) : null}
    </Link>
  );
}
"use client";

import { Zap } from "lucide-react";
import { useRouter } from "next/navigation";

import { useCart } from "@/components/cart/cart-provider";
import { localizedPath } from "@/lib/i18n";
import type { CartItem } from "@/types/cart";

export type BuyNowLocale = "az" | "en" | "ru";

const buyNowTranslations = {
  az: {
    buyNow: "İndi al",
  },
  en: {
    buyNow: "Buy now",
  },
  ru: {
    buyNow: "Купить сейчас",
  },
} as const;

type BuyNowButtonProps = {
  item: Omit<CartItem, "quantity">;
  disabled?: boolean;
  locale?: BuyNowLocale;
};

export function BuyNowButton({
  item,
  disabled = false,
  locale = "az",
}: BuyNowButtonProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const t = buyNowTranslations[locale];

  function handleBuyNow() {
    if (disabled) return;

    addItem({
      ...item,
      quantity: 1,
    });

    router.push(localizedPath("/checkout", locale));
  }

  return (
    <button
      type="button"
      onClick={handleBuyNow}
      disabled={disabled}
      className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-neutral-300"
    >
      <Zap className="mr-2 size-4" aria-hidden="true" />
      {t.buyNow}
    </button>
  );
}

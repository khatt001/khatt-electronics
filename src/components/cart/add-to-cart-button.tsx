"use client";

import { CheckCircle2, ShoppingCart } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useCart } from "@/components/cart/cart-provider";
import type { CartItem } from "@/types/cart";

export type AddToCartLocale = "az" | "en" | "ru";

const addToCartTranslations = {
  az: {
    added: "Səbətə əlavə olundu",
    stockLimit: "Stok limiti",
    addToCart: "Səbətə əlavə et",
  },
  en: {
    added: "Added to cart",
    stockLimit: "Stock limit",
    addToCart: "Add to cart",
  },
  ru: {
    added: "Добавлено в корзину",
    stockLimit: "Лимит склада",
    addToCart: "В корзину",
  },
} as const;

type AddToCartButtonProps = {
  item: Omit<CartItem, "quantity">;
  maxQuantity: number;
  disabled?: boolean;
  locale?: AddToCartLocale;
};

export function AddToCartButton({
  item,
  maxQuantity,
  disabled = false,
  locale = "az",
}: AddToCartButtonProps) {
  const { addItem, items } = useCart();
  const [added, setAdded] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const t = addToCartTranslations[locale];

  const currentQuantity =
    items.find((cartItem) => cartItem.id === item.id)?.quantity ?? 0;

  const remainingQuantity = Math.max(0, maxQuantity - currentQuantity);

  const canAdd = !disabled && maxQuantity > 0 && remainingQuantity > 0;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  function handleAdd() {
    if (!canAdd) return;

    addItem({
      ...item,
      quantity: 1,
    });

    setAdded(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setAdded(false);
    }, 1200);
  }

  const buttonLabel = added
    ? t.added
    : remainingQuantity === 0
      ? t.stockLimit
      : t.addToCart;

  return (
    <button
      type="button"
      onClick={handleAdd}
      disabled={!canAdd}
      aria-live="polite"
      className={`inline-flex min-h-12 w-full items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold text-white transition ${
        added ? "bg-emerald-600" : "bg-neutral-950 hover:bg-emerald-700"
      } disabled:cursor-not-allowed disabled:bg-neutral-300`}
    >
      {added ? (
        <CheckCircle2 className="mr-2 size-4" aria-hidden="true" />
      ) : (
        <ShoppingCart className="mr-2 size-4" aria-hidden="true" />
      )}

      {buttonLabel}
    </button>
  );
}

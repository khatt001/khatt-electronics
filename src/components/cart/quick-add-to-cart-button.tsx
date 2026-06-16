"use client";

import {
  CheckCircle2,
  ShoppingCart,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import { useCart } from "@/components/cart/cart-provider";
import type { CartItem } from "@/types/cart";

export type QuickAddToCartLocale =
  | "az"
  | "en"
  | "ru";

const quickAddTranslations = {
  az: {
    added: "Əlavə olundu",
    stockLimit: "Stok limiti",
    addToCart: "Səbətə əlavə et",
  },
  en: {
    added: "Added",
    stockLimit: "Stock limit",
    addToCart: "Add to cart",
  },
  ru: {
    added: "Добавлено",
    stockLimit: "Лимит склада",
    addToCart: "В корзину",
  },
} as const;

type QuickAddToCartButtonProps = {
  item: Omit<CartItem, "quantity">;
  disabled?: boolean;
  locale?: QuickAddToCartLocale;
};

export function QuickAddToCartButton({
  item,
  disabled = false,
  locale = "az",
}: QuickAddToCartButtonProps) {
  const { addItem, items } = useCart();
  const [added, setAdded] = useState(false);

  const timeoutRef =
    useRef<ReturnType<typeof setTimeout> | null>(
      null,
    );

  const t = quickAddTranslations[locale];

  const currentQuantity =
    items.find(
      (cartItem) => cartItem.id === item.id,
    )?.quantity ?? 0;

  const remainingQuantity = Math.max(
    0,
    item.maxQuantity - currentQuantity,
  );

  const canAdd =
    !disabled &&
    item.maxQuantity > 0 &&
    remainingQuantity > 0;

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

  const label = added
    ? t.added
    : remainingQuantity === 0
      ? t.stockLimit
      : t.addToCart;

  return (
    <button
      type="button"
      onClick={handleAdd}
      disabled={!canAdd}
      aria-label={label}
      aria-live="polite"
      className={`inline-flex min-h-10 items-center justify-center rounded-lg px-4 py-2 text-xs font-semibold text-white transition ${
        added
          ? "bg-emerald-600"
          : "bg-neutral-950 hover:bg-emerald-700"
      } disabled:cursor-not-allowed disabled:bg-neutral-300`}
    >
      {added ? (
        <CheckCircle2
          className="mr-2 size-4"
          aria-hidden="true"
        />
      ) : (
        <ShoppingCart
          className="mr-2 size-4"
          aria-hidden="true"
        />
      )}

      {label}
    </button>
  );
}
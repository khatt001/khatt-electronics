"use client";

import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useMemo, useState } from "react";
import { useCart } from "@/components/cart/cart-provider";
import type { CartItem } from "@/types/cart";

type AddToCartButtonProps = {
  item: Omit<CartItem, "quantity">;
  maxQuantity: number;
  disabled?: boolean;
};

export function AddToCartButton({
  item,
  maxQuantity,
  disabled = false,
}: AddToCartButtonProps) {
  const { addItem, items } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const currentCartQuantity = useMemo(() => {
    return items.find((cartItem) => cartItem.id === item.id)?.quantity ?? 0;
  }, [items, item.id]);

  const remainingQuantity = Math.max(0, maxQuantity - currentCartQuantity);
  const canAdd = !disabled && maxQuantity > 0 && remainingQuantity > 0;

  function decreaseQuantity() {
    setQuantity((current) => Math.max(1, current - 1));
  }

  function increaseQuantity() {
    setQuantity((current) => Math.min(remainingQuantity, current + 1));
  }

  function handleAddToCart() {
    if (!canAdd) return;

    const safeQuantity = Math.min(quantity, remainingQuantity);

    addItem({ ...item, quantity: safeQuantity });
    setAdded(true);
    setQuantity(1);

    window.setTimeout(() => {
      setAdded(false);
    }, 1600);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3 rounded-full border border-neutral-200 bg-white p-1">
        <button
          type="button"
          onClick={decreaseQuantity}
          disabled={!canAdd || quantity <= 1}
          aria-label="Say azalt"
          className="inline-flex size-10 items-center justify-center rounded-full text-neutral-700 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Minus className="size-4" aria-hidden="true" />
        </button>

        <span className="min-w-10 text-center text-sm font-semibold text-neutral-950">
          {canAdd ? quantity : 0}
        </span>

        <button
          type="button"
          onClick={increaseQuantity}
          disabled={!canAdd || quantity >= remainingQuantity}
          aria-label="Say artır"
          className="inline-flex size-10 items-center justify-center rounded-full text-neutral-700 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Plus className="size-4" aria-hidden="true" />
        </button>
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        disabled={!canAdd}
        className="inline-flex w-full items-center justify-center rounded-full bg-neutral-950 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300"
      >
        <ShoppingCart className="mr-2 size-4" aria-hidden="true" />
        {added
          ? "Səbətə əlavə olundu"
          : remainingQuantity === 0
            ? "Stok limiti dolub"
            : "Səbətə əlavə et"}
      </button>

      {currentCartQuantity > 0 ? (
        <p className="text-center text-xs text-neutral-500">
          Səbətdə: {currentCartQuantity} ədəd
        </p>
      ) : null}
    </div>
  );
}
"use client";

import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/cart/cart-provider";
import type { CartItem } from "@/types/cart";

type QuickAddToCartButtonProps = {
  item: Omit<CartItem, "quantity">;
  disabled?: boolean;
};

export function QuickAddToCartButton({
  item,
  disabled = false,
}: QuickAddToCartButtonProps) {
  const { addItem, items } = useCart();
  const [added, setAdded] = useState(false);

  const currentQuantity =
    items.find((cartItem) => cartItem.id === item.id)?.quantity ?? 0;

  const remainingQuantity = Math.max(0, item.maxQuantity - currentQuantity);
  const canAdd = !disabled && item.maxQuantity > 0 && remainingQuantity > 0;

  function handleAdd() {
    if (!canAdd) return;

    addItem({
      ...item,
      quantity: 1,
    });

    setAdded(true);

    window.setTimeout(() => {
      setAdded(false);
    }, 1200);
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      disabled={!canAdd}
      className="inline-flex h-10 w-full items-center justify-center rounded-full bg-neutral-950 px-4 text-xs font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300"
    >
      <ShoppingCart className="mr-2 size-4" aria-hidden="true" />
      {added
        ? "Əlavə olundu"
        : remainingQuantity === 0
          ? "Stok limiti"
          : "Səbətə əlavə et"}
    </button>
  );
}
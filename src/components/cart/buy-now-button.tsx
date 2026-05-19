"use client";

import { useRouter } from "next/navigation";
import { Zap } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import type { CartItem } from "@/types/cart";

type BuyNowButtonProps = {
  item: Omit<CartItem, "quantity">;
  disabled?: boolean;
};

export function BuyNowButton({ item, disabled = false }: BuyNowButtonProps) {
  const router = useRouter();
  const { addItem } = useCart();

  function handleBuyNow() {
    if (disabled) return;

    addItem({
      ...item,
      quantity: 1,
    });

    router.push("/checkout");
  }

  return (
    <button
      type="button"
      onClick={handleBuyNow}
      disabled={disabled}
      className="inline-flex items-center justify-center rounded-full bg-neutral-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300"
    >
      <Zap className="mr-2 size-4" aria-hidden="true" />
      İndi al
    </button>
  );
}
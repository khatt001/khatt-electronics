"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem } from "@/types/cart";
import {
  CART_STORAGE_KEY,
  getCartItemCount,
  getCartSubtotal,
  normalizeQuantity,
} from "@/lib/cart";

type AddToCartInput = Omit<CartItem, "quantity"> & {
  quantity?: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (item: AddToCartInput) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

function readCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw) as unknown;

    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((item): item is CartItem => {
        if (!item || typeof item !== "object") return false;

        const candidate = item as CartItem;

        return (
          typeof candidate.id === "string" &&
          typeof candidate.name === "string" &&
          typeof candidate.slug === "string" &&
          typeof candidate.price === "number" &&
          typeof candidate.priceLabel === "string" &&
          typeof candidate.category === "string" &&
          typeof candidate.quantity === "number"
        );
      })
      .map((item) => ({
        ...item,
        quantity: normalizeQuantity(item.quantity),
      }));
  } catch {
    return [];
  }
}

function writeCartToStorage(items: CartItem[]) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setItems(readCartFromStorage());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    writeCartToStorage(items);
  }, [items, mounted]);

  const addItem = useCallback((item: AddToCartInput) => {
    setItems((currentItems) => {
      const quantityToAdd = normalizeQuantity(item.quantity ?? 1);
      const existingItem = currentItems.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        return currentItems.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
               quantity: Math.min(
  cartItem.maxQuantity,
  normalizeQuantity(cartItem.quantity + quantityToAdd)
),
              }
            : cartItem
        );
      }

      return [
        ...currentItems,
        {
          ...item,
        quantity: Math.min(item.maxQuantity, quantityToAdd),
        },
      ];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId
          ? {
              ...item,
             quantity: Math.min(item.maxQuantity, normalizeQuantity(quantity)),
            }
          : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const isInCart = useCallback(
    (productId: string) => items.some((item) => item.id === productId),
    [items]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount: getCartItemCount(items),
      subtotal: getCartSubtotal(items),
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isInCart,
    }),
    [items, addItem, removeItem, updateQuantity, clearCart, isInCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
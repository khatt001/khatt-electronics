"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
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

type CartToastState = {
  productName: string;
} | null;

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  toast: CartToastState;
  isSyncing: boolean;
  addItem: (item: AddToCartInput) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  hideToast: () => void;
  syncCart: () => Promise<void>;
};

const CartContext = createContext<CartContextValue | null>(null);

function normalizeMaxQuantity(value: number) {
  if (!Number.isFinite(value)) return 1;
  return Math.max(0, Math.floor(value));
}

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
          typeof candidate.quantity === "number" &&
          typeof candidate.maxQuantity === "number" &&
          (typeof candidate.imageUrl === "string" ||
            candidate.imageUrl === null) &&
          (typeof candidate.brand === "string" || candidate.brand === null)
        );
      })
      .map((item) => {
        const maxQuantity = normalizeMaxQuantity(item.maxQuantity);
        const quantity = Math.min(
          maxQuantity,
          normalizeQuantity(item.quantity)
        );

        return {
          ...item,
          maxQuantity,
          quantity,
        };
      })
      .filter((item) => item.maxQuantity > 0 && item.quantity > 0);
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
  const [toast, setToast] = useState<CartToastState>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hideToast = useCallback(() => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = null;
    }

    setToast(null);
  }, []);

  const showToast = useCallback((productName: string) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    setToast({ productName });

    toastTimeoutRef.current = setTimeout(() => {
      setToast(null);
      toastTimeoutRef.current = null;
    }, 3000);
  }, []);

  useEffect(() => {
    setItems(readCartFromStorage());
    setMounted(true);

    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;
    writeCartToStorage(items);
  }, [items, mounted]);

  const addItem = useCallback(
    (item: AddToCartInput) => {
      const maxQuantity = normalizeMaxQuantity(item.maxQuantity);

      if (maxQuantity <= 0) return;

      setItems((currentItems) => {
        const quantityToAdd = Math.min(
          maxQuantity,
          normalizeQuantity(item.quantity ?? 1)
        );

        const existingItem = currentItems.find(
          (cartItem) => cartItem.id === item.id
        );

        if (existingItem) {
          return currentItems.map((cartItem) => {
            if (cartItem.id !== item.id) return cartItem;

            return {
              ...cartItem,
              ...item,
              maxQuantity,
              quantity: Math.min(
                maxQuantity,
                normalizeQuantity(cartItem.quantity + quantityToAdd)
              ),
            };
          });
        }

        return [
          ...currentItems,
          {
            ...item,
            maxQuantity,
            quantity: quantityToAdd,
          },
        ];
      });

      showToast(item.name);
    },
    [showToast]
  );

  const removeItem = useCallback((productId: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems((currentItems) =>
      currentItems
        .map((item) => {
          if (item.id !== productId) return item;

          const maxQuantity = normalizeMaxQuantity(item.maxQuantity);
          const nextQuantity = Math.min(
            maxQuantity,
            normalizeQuantity(quantity)
          );

          return {
            ...item,
            maxQuantity,
            quantity: nextQuantity,
          };
        })
        .filter((item) => item.maxQuantity > 0 && item.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    hideToast();
  }, [hideToast]);

const syncCart = useCallback(async () => {
  if (!mounted) return;

  const currentItems = readCartFromStorage();

  if (currentItems.length === 0) {
    setItems([]);
    return;
  }

  setIsSyncing(true);

  try {
    const response = await fetch("/api/cart/validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: currentItems.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
      }),
    });

    if (!response.ok) return;

    const data = (await response.json()) as {
      items?: CartItem[];
    };

    if (!Array.isArray(data.items)) return;

    setItems(data.items);
  } finally {
    setIsSyncing(false);
  }
}, [mounted]);

  const isInCart = useCallback(
    (productId: string) => items.some((item) => item.id === productId),
    [items]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount: getCartItemCount(items),
      subtotal: getCartSubtotal(items),
      toast,
      isSyncing,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isInCart,
      hideToast,
      syncCart,
    }),
    [
      items,
      toast,
      isSyncing,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isInCart,
      hideToast,
      syncCart,
    ]
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
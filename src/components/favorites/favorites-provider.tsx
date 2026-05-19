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
import type { FavoriteItem } from "@/types/favorites";
import {
  FAVORITES_STORAGE_KEY,
  getFavoritesCount,
  isValidFavoriteItem,
} from "@/lib/favorites";

type FavoritesContextValue = {
  items: FavoriteItem[];
  count: number;
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (productId: string) => void;
  toggleFavorite: (item: FavoriteItem) => void;
  clearFavorites: () => void;
  isFavorite: (productId: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

function readFavoritesFromStorage(): FavoriteItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw) as unknown;

    if (!Array.isArray(parsed)) return [];

    return parsed.filter(isValidFavoriteItem);
  } catch {
    return [];
  }
}

function writeFavoritesToStorage(items: FavoriteItem[]) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(items));
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<FavoriteItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setItems(readFavoritesFromStorage());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    writeFavoritesToStorage(items);
  }, [items, mounted]);

  const addFavorite = useCallback((item: FavoriteItem) => {
    setItems((currentItems) => {
      if (currentItems.some((favorite) => favorite.id === item.id)) {
        return currentItems;
      }

      return [item, ...currentItems];
    });
  }, []);

  const removeFavorite = useCallback((productId: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  }, []);

  const toggleFavorite = useCallback((item: FavoriteItem) => {
    setItems((currentItems) => {
      const exists = currentItems.some((favorite) => favorite.id === item.id);

      if (exists) {
        return currentItems.filter((favorite) => favorite.id !== item.id);
      }

      return [item, ...currentItems];
    });
  }, []);

  const clearFavorites = useCallback(() => {
    setItems([]);
  }, []);

  const isFavorite = useCallback(
    (productId: string) => items.some((item) => item.id === productId),
    [items]
  );

  const value = useMemo<FavoritesContextValue>(
    () => ({
      items,
      count: getFavoritesCount(items),
      addFavorite,
      removeFavorite,
      toggleFavorite,
      clearFavorites,
      isFavorite,
    }),
    [
      items,
      addFavorite,
      removeFavorite,
      toggleFavorite,
      clearFavorites,
      isFavorite,
    ]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used inside FavoritesProvider");
  }

  return context;
}
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
import type { CompareItem } from "@/types/compare";
import {
  COMPARE_STORAGE_KEY,
  MAX_COMPARE_ITEMS,
  getCompareCount,
  isValidCompareItem,
} from "@/lib/compare";

type CompareContextValue = {
  items: CompareItem[];
  count: number;
  isSyncing: boolean;
  limit: number;
  addCompare: (item: CompareItem) => boolean;
  removeCompare: (productId: string) => void;
  toggleCompare: (item: CompareItem) => boolean;
  clearCompare: () => void;
  isCompared: (productId: string) => boolean;
  syncCompare: () => Promise<void>;
};

const CompareContext = createContext<CompareContextValue | null>(null);

function readCompareFromStorage(): CompareItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(COMPARE_STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw) as unknown;

    if (!Array.isArray(parsed)) return [];

    return parsed.filter(isValidCompareItem).slice(0, MAX_COMPARE_ITEMS);
  } catch {
    return [];
  }
}

function writeCompareToStorage(items: CompareItem[]) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(
    COMPARE_STORAGE_KEY,
    JSON.stringify(items.slice(0, MAX_COMPARE_ITEMS))
  );
}

export function CompareProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CompareItem[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setItems(readCompareFromStorage());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    writeCompareToStorage(items);
  }, [items, mounted]);

  const addCompare = useCallback((item: CompareItem) => {
    let added = false;

    setItems((currentItems) => {
      if (currentItems.some((compareItem) => compareItem.id === item.id)) {
        added = true;
        return currentItems;
      }

      if (currentItems.length >= MAX_COMPARE_ITEMS) {
        added = false;
        return currentItems;
      }

      added = true;
      return [item, ...currentItems].slice(0, MAX_COMPARE_ITEMS);
    });

    return added;
  }, []);

  const removeCompare = useCallback((productId: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  }, []);

  const toggleCompare = useCallback((item: CompareItem) => {
    let changed = false;

    setItems((currentItems) => {
      const exists = currentItems.some(
        (compareItem) => compareItem.id === item.id
      );

      if (exists) {
        changed = true;
        return currentItems.filter((compareItem) => compareItem.id !== item.id);
      }

      if (currentItems.length >= MAX_COMPARE_ITEMS) {
        changed = false;
        return currentItems;
      }

      changed = true;
      return [item, ...currentItems].slice(0, MAX_COMPARE_ITEMS);
    });

    return changed;
  }, []);

  const clearCompare = useCallback(() => {
    setItems([]);
  }, []);

  const syncCompare = useCallback(async () => {
    if (!mounted) return;

    const currentItems = readCompareFromStorage();

    if (currentItems.length === 0) {
      setItems([]);
      return;
    }

    setIsSyncing(true);

    try {
      const response = await fetch("/api/compare/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: currentItems.map((item) => ({
            id: item.id,
          })),
        }),
      });

      if (!response.ok) return;

      const data = (await response.json()) as {
        items?: CompareItem[];
      };

      if (!Array.isArray(data.items)) return;

      setItems(data.items.slice(0, MAX_COMPARE_ITEMS));
    } finally {
      setIsSyncing(false);
    }
  }, [mounted]);

  const isCompared = useCallback(
    (productId: string) => items.some((item) => item.id === productId),
    [items]
  );

  const value = useMemo<CompareContextValue>(
    () => ({
      items,
      count: getCompareCount(items),
      isSyncing,
      limit: MAX_COMPARE_ITEMS,
      addCompare,
      removeCompare,
      toggleCompare,
      clearCompare,
      isCompared,
      syncCompare,
    }),
    [
      items,
      isSyncing,
      addCompare,
      removeCompare,
      toggleCompare,
      clearCompare,
      isCompared,
      syncCompare,
    ]
  );

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);

  if (!context) {
    throw new Error("useCompare must be used inside CompareProvider");
  }

  return context;
}
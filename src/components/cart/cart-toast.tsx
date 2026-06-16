"use client";

import Link from "next/link";
import {
  CheckCircle2,
  X,
} from "lucide-react";

import { useCart } from "@/components/cart/cart-provider";
import { localizedPath } from "@/lib/i18n";

type CartToastLocale =
  | "az"
  | "en"
  | "ru";

type CartToastProps = {
  locale?: CartToastLocale;
};

const cartToastTranslations = {
  az: {
    title: "Səbətə əlavə olundu",
    viewCart: "Səbətə bax",
    continue: "Davam et",
    closeAria: "Bildirişi bağla",
  },
  en: {
    title: "Added to cart",
    viewCart: "View cart",
    continue: "Continue",
    closeAria: "Close notification",
  },
  ru: {
    title: "Добавлено в корзину",
    viewCart: "Смотреть корзину",
    continue: "Продолжить",
    closeAria: "Закрыть уведомление",
  },
} as const;

export function CartToast({
  locale = "az",
}: CartToastProps) {
  const { toast, hideToast } = useCart();
  const t = cartToastTranslations[locale];

  if (!toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-24 right-4 z-[80] w-[calc(100%-2rem)] max-w-sm rounded-2xl border border-neutral-200 bg-white p-4 shadow-2xl lg:bottom-5 lg:right-5"
    >
      <div className="flex gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
          <CheckCircle2
            className="size-5"
            aria-hidden="true"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-semibold text-neutral-950">
            {t.title}
          </p>

          <p className="mt-1 line-clamp-1 text-sm text-neutral-500">
            {toast.productName}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              href={localizedPath(
                "/cart",
                locale,
              )}
              onClick={hideToast}
              className="inline-flex min-h-9 items-center justify-center rounded-lg bg-neutral-950 px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700"
            >
              {t.viewCart}
            </Link>

            <button
              type="button"
              onClick={hideToast}
              className="inline-flex min-h-9 items-center justify-center rounded-lg border border-neutral-200 px-4 py-2 text-xs font-medium text-neutral-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
            >
              {t.continue}
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={hideToast}
          aria-label={t.closeAria}
          className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-neutral-400 transition hover:bg-red-50 hover:text-red-600"
        >
          <X
            className="size-4"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
}
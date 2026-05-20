"use client";

import Link from "next/link";
import { CheckCircle2, X } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";

type CartToastLocale = "az" | "en" | "ru";

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

function getCartHref(locale: CartToastLocale) {
  if (locale === "az") {
    return "/cart";
  }

  return `/${locale}/cart`;
}

export function CartToast({ locale = "az" }: CartToastProps) {
  const { toast, hideToast } = useCart();
  const t = cartToastTranslations[locale];

  if (!toast) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[80] w-[calc(100%-2.5rem)] max-w-sm rounded-3xl border border-neutral-200 bg-white p-4 shadow-2xl">
      <div className="flex gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
          <CheckCircle2 className="size-5" aria-hidden="true" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-semibold text-neutral-950">{t.title}</p>

          <p className="mt-1 line-clamp-1 text-sm text-neutral-500">
            {toast.productName}
          </p>

          <div className="mt-3 flex gap-2">
            <Link
              href={getCartHref(locale)}
              onClick={hideToast}
              className="inline-flex h-9 items-center justify-center rounded-full bg-neutral-950 px-4 text-xs font-semibold text-white transition hover:bg-neutral-800"
            >
              {t.viewCart}
            </Link>

            <button
              type="button"
              onClick={hideToast}
              className="inline-flex h-9 items-center justify-center rounded-full border border-neutral-200 px-4 text-xs font-medium text-neutral-700 transition hover:border-neutral-950 hover:text-neutral-950"
            >
              {t.continue}
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={hideToast}
          aria-label={t.closeAria}
          className="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-950"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
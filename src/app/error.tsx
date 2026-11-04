"use client";

import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { usePathname } from "next/navigation";

import { getLocaleFromPathname, localizedPath, type Locale } from "@/lib/i18n";

const translations: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    description: string;
    retry: string;
    home: string;
  }
> = {
  az: {
    eyebrow: "Xəta",
    title: "Nəsə düzgün işləmədi",
    description:
      "Səhifə yüklənərkən xəta baş verdi. Yenidən cəhd edə və ya ana səhifəyə qayıda bilərsiniz.",
    retry: "Yenidən yoxla",
    home: "Ana səhifə",
  },
  en: {
    eyebrow: "Error",
    title: "Something went wrong",
    description:
      "An error occurred while loading the page. You can try again or return to the home page.",
    retry: "Try again",
    home: "Home page",
  },
  ru: {
    eyebrow: "Ошибка",
    title: "Что-то пошло не так",
    description:
      "При загрузке страницы произошла ошибка. Попробуйте снова или вернитесь на главную.",
    retry: "Попробовать снова",
    home: "Главная",
  },
};

type ErrorPageProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);

  const t = translations[locale];

  return (
    <div className="min-h-screen bg-[#f5f6f8]">
      <section className="px-5 py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl rounded-md border border-line bg-surface p-7 text-center shadow-sm md:p-10 lg:p-12">
          <div className="mx-auto flex size-16 items-center justify-center rounded-md bg-red-50 text-red-700 md:size-20">
            <AlertTriangle className="size-8 md:size-9" aria-hidden="true" />
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
            {t.eyebrow}
          </p>

          <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl lg:text-5xl">
            {t.title}
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted md:text-base">
            {t.description}
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={reset}
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-ink"
            >
              <RefreshCw className="mr-2 size-4" aria-hidden="true" />

              {t.retry}
            </button>

            <Link
              href={localizedPath("/", locale)}
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-line bg-surface px-5 py-3 text-sm font-semibold text-ink transition hover:border-ink hover:bg-paper hover:text-signal"
            >
              {t.home}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

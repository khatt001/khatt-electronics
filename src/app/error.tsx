"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AlertTriangle, RefreshCw } from "lucide-react";
import {
  getLocaleFromPathname,
  localizedPath,
  type Locale,
} from "@/lib/i18n";

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
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const t = translations[locale];

  return (
    <main className="min-h-screen bg-[#f6f6f4] pt-16 lg:pt-[8.25rem] xl:pt-[7.5rem]">
      <section className="px-5 py-20">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-neutral-200 bg-white p-8 text-center shadow-sm lg:p-12">
          <div className="mx-auto flex size-20 items-center justify-center rounded-[2rem] bg-red-50 text-red-700">
            <AlertTriangle className="size-9" aria-hidden="true" />
          </div>

          <p className="mt-8 text-xs uppercase tracking-[0.28em] text-neutral-400">
            {t.eyebrow}
          </p>

          <h1 className="mt-4 text-4xl font-semibold leading-tight text-neutral-950 md:text-6xl">
            {t.title}
          </h1>

          <p className="mx-auto mt-5 max-w-xl leading-8 text-neutral-600">
            {t.description}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center justify-center rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              <RefreshCw className="mr-2 size-4" aria-hidden="true" />
              {t.retry}
            </button>

            <Link
              href={localizedPath("/", locale)}
              className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:border-neutral-950"
            >
              {t.home}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
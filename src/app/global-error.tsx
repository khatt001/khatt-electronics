"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

const translations = {
  title: "Kritik xəta baş verdi",
  description:
    "Sayt yüklənərkən kritik xəta baş verdi. Səhifəni yeniləyərək yenidən cəhd edin.",
  retry: "Səhifəni yenilə",
};

type GlobalErrorProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function GlobalError({ reset }: GlobalErrorProps) {
  return (
    <html lang="az">
      <body>
        <main className="flex min-h-screen items-center bg-[#f5f6f8] px-5 py-12">
          <div className="mx-auto w-full max-w-3xl rounded-2xl border border-neutral-200 bg-white p-7 text-center shadow-sm md:p-10 lg:p-12">
            <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-red-50 text-red-700 md:size-20">
              <AlertTriangle className="size-8 md:size-9" aria-hidden="true" />
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
              500
            </p>

            <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-neutral-950 md:text-4xl lg:text-5xl">
              {translations.title}
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-neutral-600 md:text-base">
              {translations.description}
            </p>

            <button
              type="button"
              onClick={reset}
              className="mt-7 inline-flex min-h-12 items-center justify-center rounded-lg bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              <RefreshCw className="mr-2 size-4" aria-hidden="true" />

              {translations.retry}
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}

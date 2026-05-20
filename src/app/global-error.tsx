"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

const translations = {
  title: "Critical error",
  description:
    "A critical error occurred while loading the website. Please try refreshing the page.",
  retry: "Refresh",
};

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ reset }: GlobalErrorProps) {
  return (
    <html lang="az">
      <body>
        <main className="min-h-screen bg-[#f6f6f4] px-5 py-20">
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-neutral-200 bg-white p-8 text-center shadow-sm lg:p-12">
            <div className="mx-auto flex size-20 items-center justify-center rounded-[2rem] bg-red-50 text-red-700">
              <AlertTriangle className="size-9" aria-hidden="true" />
            </div>

            <p className="mt-8 text-xs uppercase tracking-[0.28em] text-neutral-400">
              500
            </p>

            <h1 className="mt-4 text-4xl font-semibold leading-tight text-neutral-950 md:text-6xl">
              {translations.title}
            </h1>

            <p className="mx-auto mt-5 max-w-xl leading-8 text-neutral-600">
              {translations.description}
            </p>

            <button
              type="button"
              onClick={reset}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
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
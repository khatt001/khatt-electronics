"use client";

import Link from "next/link";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

type GlobalErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalErrorPage({
  error,
  reset,
}: GlobalErrorPageProps) {
  return (
    <html lang="az">
      <body>
        <main className="min-h-screen bg-[#f6f6f4] px-5 py-10">
          <section className="flex min-h-screen items-center justify-center">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto flex size-20 items-center justify-center rounded-[2rem] border border-red-100 bg-white shadow-sm">
                <AlertTriangle
                  className="size-9 text-red-600"
                  aria-hidden="true"
                />
              </div>

              <p className="mt-8 text-xs uppercase tracking-[0.35em] text-neutral-400">
                Kritik xəta
              </p>

              <h1 className="mt-4 text-4xl font-semibold leading-tight text-neutral-950 md:text-6xl">
                Sayt yüklənərkən problem yarandı
              </h1>

              <p className="mx-auto mt-5 max-w-xl leading-8 text-neutral-600">
                Müvəqqəti texniki problem ola bilər. Səhifəni yenidən yoxlayın
                və ya ana səhifəyə qayıdın.
              </p>

              {process.env.NODE_ENV === "development" ? (
                <div className="mt-6 rounded-2xl border border-red-100 bg-white p-4 text-left text-xs text-red-700">
                  <p className="font-semibold">Development error:</p>
                  <p className="mt-2 break-words">{error.message}</p>
                </div>
              ) : null}

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center justify-center rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
                >
                  <RefreshCw className="mr-2 size-4" aria-hidden="true" />
                  Yenidən yoxla
                </button>

                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:border-neutral-950"
                >
                  <Home className="mr-2 size-4" aria-hidden="true" />
                  Ana səhifə
                </Link>
              </div>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
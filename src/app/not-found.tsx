import Link from "next/link";
import { ArrowLeft, Home, PackageSearch, SearchX } from "lucide-react";
import { Container } from "@/components/layout/container";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#f6f6f4] pt-16 lg:pt-[8.25rem] xl:pt-[7.5rem]">
      <section className="flex min-h-[calc(100vh-7.5rem)] items-center py-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex size-20 items-center justify-center rounded-[2rem] border border-neutral-200 bg-white shadow-sm">
              <SearchX className="size-9 text-neutral-950" aria-hidden="true" />
            </div>

            <p className="mt-8 text-xs uppercase tracking-[0.35em] text-neutral-400">
              404 / Səhifə tapılmadı
            </p>

            <h1 className="mt-4 text-4xl font-semibold leading-tight text-neutral-950 md:text-6xl">
              Axtardığınız səhifə mövcud deyil
            </h1>

            <p className="mx-auto mt-5 max-w-xl leading-8 text-neutral-600">
              Link dəyişdirilmiş, silinmiş və ya səhv yazılmış ola bilər.
              Məhsul kataloquna keçərək axtardığınız avadanlığı tapa bilərsiniz.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                <PackageSearch className="mr-2 size-4" aria-hidden="true" />
                Məhsul kataloqu
              </Link>

              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:border-neutral-950"
              >
                <Home className="mr-2 size-4" aria-hidden="true" />
                Ana səhifə
              </Link>
            </div>

            <Link
              href="/contact"
              className="mt-6 inline-flex items-center text-sm font-semibold text-neutral-600 underline underline-offset-4 transition hover:text-neutral-950"
            >
              <ArrowLeft className="mr-2 size-4" aria-hidden="true" />
              Dəstək üçün əlaqə saxla
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
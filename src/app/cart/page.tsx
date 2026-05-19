import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, PackageSearch, ShoppingCart } from "lucide-react";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = {
  title: "Səbət",
  description:
    "KHATT Electronics səbət səhifəsi. Məhsulları səbətə əlavə edib qiymət təklifi sorğusu göndərə biləcəksiniz.",
  alternates: {
    canonical: "/cart",
  },
};

export default function CartPage() {
  return (
    <main className="min-h-screen bg-[#f6f6f4] pt-16 lg:pt-[8.25rem] xl:pt-[7.5rem]">
      <section className="flex min-h-[calc(100vh-7.5rem)] items-center py-16">
        <Container>
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-neutral-200 bg-white p-8 text-center shadow-sm lg:p-12">
            <div className="mx-auto flex size-20 items-center justify-center rounded-[2rem] bg-neutral-950 text-white">
              <ShoppingCart className="size-9" aria-hidden="true" />
            </div>

            <p className="mt-8 text-xs uppercase tracking-[0.28em] text-neutral-400">
              Səbət
            </p>

            <h1 className="mt-4 text-4xl font-semibold leading-tight text-neutral-950 md:text-5xl">
              Səbət funksiyası hazırlanır
            </h1>

            <p className="mx-auto mt-5 max-w-xl leading-8 text-neutral-600">
              Tezliklə məhsulları səbətə əlavə edib bir neçə məhsul üçün eyni
              anda qiymət təklifi sorğusu göndərə biləcəksiniz.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                <PackageSearch className="mr-2 size-4" aria-hidden="true" />
                Məhsullara bax
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:border-neutral-950"
              >
                Qiymət təklifi al
                <ArrowRight className="ml-2 size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
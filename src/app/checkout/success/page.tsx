import Link from "next/link";
import { CheckCircle2, Home, PackageSearch } from "lucide-react";
import { Container } from "@/components/layout/container";
import { ClearCartOnSuccess } from "@/components/checkout/clear-cart-on-success";
type CheckoutSuccessPageProps = {
  searchParams: Promise<{
    order?: string;
  }>;
};

export default async function CheckoutSuccessPage({
  searchParams,
}: CheckoutSuccessPageProps) {
  const params = await searchParams;
  const orderNumber = params.order;

  return (
    <main className="min-h-screen bg-[#f6f6f4] pt-16 lg:pt-[8.25rem] xl:pt-[7.5rem]">
            <ClearCartOnSuccess />

      <section className="flex min-h-[calc(100vh-7.5rem)] items-center py-16">
        <Container>
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-neutral-200 bg-white p-8 text-center shadow-sm lg:p-12">
            <div className="mx-auto flex size-20 items-center justify-center rounded-[2rem] bg-emerald-50 text-emerald-700">
              <CheckCircle2 className="size-10" aria-hidden="true" />
            </div>

            <p className="mt-8 text-xs uppercase tracking-[0.28em] text-neutral-400">
              Sifariş qəbul edildi
            </p>

            <h1 className="mt-4 text-4xl font-semibold leading-tight text-neutral-950 md:text-5xl">
              Sifarişiniz uğurla yaradıldı
            </h1>

            {orderNumber ? (
              <p className="mt-5 text-lg font-semibold text-neutral-950">
                Sifariş nömrəsi: {orderNumber}
              </p>
            ) : null}

            <p className="mx-auto mt-4 max-w-xl leading-8 text-neutral-600">
              Sifarişiniz sistemə daxil oldu. Əməkdaşımız sizinlə əlaqə saxlayıb
              sifarişi təsdiqləyəcək.
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
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:border-neutral-950"
              >
                <Home className="mr-2 size-4" aria-hidden="true" />
                Ana səhifə
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
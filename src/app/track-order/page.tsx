import type { Metadata } from "next";
import Link from "next/link";
import { PackageSearch, Search } from "lucide-react";
import { Container } from "@/components/layout/container";
import { formatPrice } from "@/lib/cart";
import { trackOrder } from "@/services/order-tracking";
import { PhoneInput } from "@/components/checkout/phone-input";
export const metadata: Metadata = {
  title: "Sifariş izləmə",
  description:
    "KHATT Electronics sifariş izləmə səhifəsi. Sifariş nömrəsi və telefonla sifariş statusunu yoxlayın.",
  alternates: {
    canonical: "/track-order",
  },
};

type TrackOrderPageProps = {
  searchParams: Promise<{
    order?: string;
    phone?: string;
  }>;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("az-AZ", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function getOrderStatusLabel(status: string) {
  if (status === "new") return "Yeni";
  if (status === "confirmed") return "Təsdiqləndi";
  if (status === "preparing") return "Hazırlanır";
  if (status === "delivered") return "Təhvil verildi";
  if (status === "cancelled") return "Ləğv edildi";
  return status;
}

function getPaymentStatusLabel(status: string) {
  if (status === "pending") return "Gözləyir";
  if (status === "paid") return "Ödənilib";
  if (status === "failed") return "Uğursuz";
  return status;
}

function getPaymentMethodLabel(method: string) {
  if (method === "cash") return "Nağd ödəniş";
  if (method === "card") return "Kartla ödəniş";
  return method;
}

function getStepClass(currentStatus: string, step: string) {
  const order = ["new", "confirmed", "preparing", "delivered"];
  const currentIndex = order.indexOf(currentStatus);
  const stepIndex = order.indexOf(step);

  if (currentStatus === "cancelled") {
    return step === "cancelled"
      ? "border-red-600 bg-red-50 text-red-700"
      : "border-neutral-200 bg-white text-neutral-400";
  }

  if (stepIndex <= currentIndex) {
    return "border-emerald-600 bg-emerald-50 text-emerald-700";
  }

  return "border-neutral-200 bg-white text-neutral-400";
}

export default async function TrackOrderPage({
  searchParams,
}: TrackOrderPageProps) {
  const params = await searchParams;
  const orderNumber = params.order ?? "";
  const phone = params.phone ?? "";

  const hasSearch = Boolean(orderNumber || phone);
  const order =
    orderNumber && phone
      ? await trackOrder({
          orderNumber,
          phone,
        })
      : null;

  return (
    <main className="min-h-screen bg-[#f6f6f4] pt-16 lg:pt-[8.25rem] xl:pt-[7.5rem]">
      <section className="border-b border-black/10 bg-white">
        <Container className="py-12">
          <p className="text-xs uppercase tracking-[0.28em] text-neutral-400">
            Sifariş izləmə
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-neutral-950 md:text-6xl">
            Sifariş statusunu yoxla
          </h1>
          <p className="mt-5 max-w-2xl leading-8 text-neutral-600">
            Sifariş nömrənizi və telefon nömrənizi daxil edərək sifarişin
            hazırkı vəziyyətini görə bilərsiniz.
          </p>
        </Container>
      </section>

      <section className="py-10 lg:py-14">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
            <form
              action="/track-order"
              className="h-fit rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-2xl font-semibold text-neutral-950">
                Sifarişi tap
              </h2>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Sifariş nömrəsi
                  </label>
                  <input
                    name="order"
                    defaultValue={orderNumber}
                    required
                    className="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm uppercase outline-none transition focus:border-neutral-950"
                    placeholder="KH-20260519-1234"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Telefon nömrəsi
                  </label>
                <PhoneInput name="phone" defaultValue={phone} required />
                </div>

                <button
                  type="submit"
                  className="inline-flex h-12 w-full items-center justify-center rounded-full bg-neutral-950 text-sm font-semibold text-white transition hover:bg-neutral-800"
                >
                  <Search className="mr-2 size-4" aria-hidden="true" />
                  Yoxla
                </button>
              </div>
            </form>

            <div>
              {order ? (
                <div className="space-y-6">
                  <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                      <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-neutral-400">
                          Sifariş tapıldı
                        </p>
                        <h2 className="mt-2 text-3xl font-semibold text-neutral-950">
                          {order.order_number}
                        </h2>
                        <p className="mt-2 text-sm text-neutral-500">
                          {formatDate(order.created_at)}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-neutral-950 px-5 py-3 text-white">
                        <p className="text-xs text-white/60">Cəmi</p>
                        <strong className="text-xl">
                          {formatPrice(order.total)}
                        </strong>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-3 md:grid-cols-4">
                      {[
                        ["new", "Yeni"],
                        ["confirmed", "Təsdiqləndi"],
                        ["preparing", "Hazırlanır"],
                        ["delivered", "Təhvil verildi"],
                      ].map(([step, label]) => (
                        <div
                          key={step}
                          className={`rounded-2xl border p-4 text-center text-sm font-semibold ${getStepClass(
                            order.order_status,
                            step
                          )}`}
                        >
                          {label}
                        </div>
                      ))}

                      {order.order_status === "cancelled" ? (
                        <div className="rounded-2xl border border-red-600 bg-red-50 p-4 text-center text-sm font-semibold text-red-700 md:col-span-4">
                          Sifariş ləğv edilib
                        </div>
                      ) : null}
                    </div>

                    <div className="mt-6 grid gap-4 md:grid-cols-3">
                      <div className="rounded-2xl border border-neutral-200 p-4">
                        <p className="text-xs text-neutral-500">
                          Sifariş statusu
                        </p>
                        <p className="mt-1 font-semibold text-neutral-950">
                          {getOrderStatusLabel(order.order_status)}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-neutral-200 p-4">
                        <p className="text-xs text-neutral-500">
                          Ödəniş üsulu
                        </p>
                        <p className="mt-1 font-semibold text-neutral-950">
                          {getPaymentMethodLabel(order.payment_method)}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-neutral-200 p-4">
                        <p className="text-xs text-neutral-500">
                          Ödəniş statusu
                        </p>
                        <p className="mt-1 font-semibold text-neutral-950">
                          {getPaymentStatusLabel(order.payment_status)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
                    <h3 className="text-xl font-semibold text-neutral-950">
                      Məhsullar
                    </h3>

                    <div className="mt-5 divide-y divide-neutral-100">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between gap-4 py-4"
                        >
                          <div>
                            <Link
                              href={`/products/${item.product_slug}`}
                              className="font-medium text-neutral-950 transition hover:underline"
                            >
                              {item.product_name}
                            </Link>
                            <p className="mt-1 text-sm text-neutral-500">
                              {item.quantity} × {formatPrice(item.unit_price)}
                            </p>
                          </div>

                          <p className="shrink-0 font-semibold text-neutral-950">
                            {formatPrice(item.line_total)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : hasSearch ? (
                <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
                  <PackageSearch className="mx-auto size-10 text-red-600" />
                  <h2 className="mt-4 text-2xl font-semibold text-red-800">
                    Sifariş tapılmadı
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-red-700">
                    Sifariş nömrəsi və telefon nömrəsini düzgün daxil etdiyinizə
                    əmin olun.
                  </p>
                </div>
              ) : (
                <div className="rounded-3xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
                  <PackageSearch className="mx-auto size-10 text-neutral-400" />
                  <h2 className="mt-4 text-2xl font-semibold text-neutral-950">
                    Sifariş məlumatlarını daxil edin
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-neutral-500">
                    Checkout sonrası verilən sifariş nömrəsini və telefon
                    nömrənizi yazın.
                  </p>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
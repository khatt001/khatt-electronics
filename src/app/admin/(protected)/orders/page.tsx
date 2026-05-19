import Link from "next/link";
import { Eye, ShoppingBag } from "lucide-react";
import { getAdminOrders } from "@/services/admin-orders";
import { formatPrice } from "@/lib/cart";
type AdminOrdersPageProps = {
  searchParams: Promise<{
    search?: string;
    status?: string;
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

function getPaymentMethodLabel(method: string) {
  if (method === "cash") return "Nağd";
  if (method === "card") return "Kart";
  return method;
}

export default async function AdminOrdersPage({
  searchParams,
}: AdminOrdersPageProps) {
  const params = await searchParams;

  const search = params.search ?? "";
  const status = params.status ?? "all";

  const orders = await getAdminOrders({
    search,
    status,
  });
  return (
    <div>
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-neutral-400">
            Sifarişlər
          </p>
          <h2 className="mt-2 text-3xl font-semibold">Gələn sifarişlər</h2>
          <p className="mt-2 text-sm text-neutral-500">
            Müştərilərin checkout-dan göndərdiyi sifarişlər.
          </p>
        </div>
      </div>
<form
  action="/admin/orders"
  className="mb-6 grid gap-3 rounded-3xl border border-neutral-200 bg-neutral-50 p-4 md:grid-cols-[1fr_220px_auto_auto]"
>
  <input
    name="search"
    defaultValue={search}
    placeholder="Sifariş nömrəsi, ad və ya telefon..."
    className="h-12 rounded-2xl border border-neutral-200 bg-white px-4 text-sm outline-none transition focus:border-neutral-950"
  />

  <select
    name="status"
    defaultValue={status}
    className="h-12 rounded-2xl border border-neutral-200 bg-white px-4 text-sm outline-none transition focus:border-neutral-950"
  >
    <option value="all">Bütün statuslar</option>
    <option value="new">Yeni</option>
    <option value="confirmed">Təsdiqləndi</option>
    <option value="preparing">Hazırlanır</option>
    <option value="delivered">Təhvil verildi</option>
    <option value="cancelled">Ləğv edildi</option>
  </select>

  <button
    type="submit"
    className="h-12 rounded-full bg-neutral-950 px-6 text-sm font-semibold text-white transition hover:bg-neutral-800"
  >
    Filterlə
  </button>

  <Link
    href="/admin/orders"
    className="inline-flex h-12 items-center justify-center rounded-full border border-neutral-200 bg-white px-6 text-sm font-medium text-neutral-700 transition hover:border-neutral-950 hover:text-neutral-950"
  >
    Sıfırla
  </Link>
</form>
      <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white">
        {orders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="border-b border-neutral-200 bg-neutral-50 text-xs uppercase tracking-[0.14em] text-neutral-500">
                <tr>
                  <th className="px-5 py-4 font-medium">Sifariş</th>
                  <th className="px-5 py-4 font-medium">Müştəri</th>
                  <th className="px-5 py-4 font-medium">Telefon</th>
                  <th className="px-5 py-4 font-medium">Ödəniş</th>
                  <th className="px-5 py-4 font-medium">Status</th>
                  <th className="px-5 py-4 font-medium">Məbləğ</th>
                  <th className="px-5 py-4 font-medium">Tarix</th>
                  <th className="px-5 py-4 text-right font-medium">Əməliyyat</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-neutral-100">
                {orders.map((order) => (
                  <tr key={order.id} className="transition hover:bg-neutral-50">
                    <td className="px-5 py-4 font-semibold text-neutral-950">
                      {order.orderNumber}
                    </td>
                    <td className="px-5 py-4 text-neutral-700">
                      {order.customerName}
                    </td>
                    <td className="px-5 py-4 text-neutral-700">
                      {order.phone}
                    </td>
                    <td className="px-5 py-4 text-neutral-700">
                      {getPaymentMethodLabel(order.paymentMethod)}
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
                        {getOrderStatusLabel(order.orderStatus)}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-semibold text-neutral-950">
                      {formatPrice(order.total)}
                    </td>
                    <td className="px-5 py-4 text-neutral-500">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="inline-flex items-center rounded-full border border-neutral-200 px-4 py-2 text-xs font-medium transition hover:border-neutral-950"
                      >
                        <Eye className="mr-2 size-4" aria-hidden="true" />
                        Bax
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-10 text-center">
            <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-500">
              <ShoppingBag className="size-7" aria-hidden="true" />
            </div>
           <h3 className="mt-5 text-xl font-semibold text-neutral-950">
  {search || status !== "all"
    ? "Filterə uyğun sifariş tapılmadı"
    : "Hələ sifariş yoxdur"}
</h3>
            <p className="mt-2 text-sm text-neutral-500">
              Checkout-dan sifariş gəldikdə burada görünəcək.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
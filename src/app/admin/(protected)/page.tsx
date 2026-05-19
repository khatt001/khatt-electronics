import Link from "next/link";
import {
  getAdminDashboardStats,
  getRecentAdminInquiries,
  getRecentAdminOrders,
  getRecentAdminProducts,
} from "@/services/admin-dashboard";
import { formatPrice } from "@/lib/cart";
function formatDate(value: string) {
  return new Intl.DateTimeFormat("az-AZ", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function getStatusLabel(status: string) {
  if (status === "active") return "Aktiv";
  if (status === "draft") return "Qaralama";
  if (status === "archived") return "Arxiv";

  if (status === "new") return "Yeni";
  if (status === "contacted") return "Əlaqə saxlanılıb";
  if (status === "closed") return "Bağlanıb";

  if (status === "confirmed") return "Təsdiqləndi";
  if (status === "preparing") return "Hazırlanır";
  if (status === "delivered") return "Təhvil verildi";
  if (status === "cancelled") return "Ləğv edildi";

  if (status === "pending") return "Gözləyir";
  if (status === "paid") return "Ödənilib";
  if (status === "failed") return "Uğursuz";

  return status;
}

function getStatusClassName(status: string) {
  if (status === "active" || status === "new" || status === "paid") {
    return "bg-emerald-50 text-emerald-700";
  }

  if (status === "draft" || status === "contacted" || status === "confirmed") {
    return "bg-blue-50 text-blue-700";
  }

  if (status === "preparing" || status === "pending") {
    return "bg-amber-50 text-amber-700";
  }

  if (status === "cancelled" || status === "failed") {
    return "bg-red-50 text-red-700";
  }

  return "bg-neutral-100 text-neutral-500";
}

export default async function AdminDashboardPage() {
 const [stats, recentProducts, recentOrders, recentInquiries] = await Promise.all([
  getAdminDashboardStats(),
  getRecentAdminProducts(),
  getRecentAdminOrders(),
  getRecentAdminInquiries(),
]);
  const statCards = [
    {
      label: "Ümumi məhsul",
      value: stats.totalProducts,
      href: "/admin/products",
    },
    {
      label: "Aktiv məhsul",
      value: stats.activeProducts,
      href: "/admin/products",
    },
    {
      label: "Qaralama",
      value: stats.draftProducts,
      href: "/admin/products",
    },
    {
      label: "Yeni sorğu",
      value: stats.newInquiries,
      href: "/admin/inquiries",
    },
    {
      label: "Kateqoriya",
      value: stats.totalCategories,
      href: "/admin/categories",
    },
    {
      label: "Brend",
      value: stats.totalBrands,
      href: "/admin/brands",
    },
    {
  label: "Ümumi sifariş",
  value: stats.totalOrders,
  href: "/admin/orders",
},
{
  label: "Yeni sifariş",
  value: stats.newOrders,
  href: "/admin/orders",
},
{
  label: "Bugünkü sifariş",
  value: stats.todayOrders,
  href: "/admin/orders",
},
  ];

  return (
    <div>
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.24em] text-neutral-400">
          Dashboard
        </p>
        <h2 className="mt-2 text-3xl font-semibold">İdarəetmə paneli</h2>
        <p className="mt-2 text-sm text-neutral-500">
          KHATT Electronics saytının ümumi vəziyyəti.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-3xl border border-neutral-200 p-5 transition hover:-translate-y-0.5 hover:shadow-sm"
          >
            <p className="text-sm text-neutral-500">{card.label}</p>
            <strong className="mt-3 block text-4xl font-semibold text-neutral-950">
              {card.value}
            </strong>
          </Link>
        ))}
      </div>
<div className="mt-8 rounded-3xl border border-neutral-200 bg-neutral-950 p-6 text-white">
  <p className="text-sm text-white/60">Ümumi satış məbləği</p>
  <strong className="mt-3 block text-4xl font-semibold">
    {formatPrice(stats.totalSales)}
  </strong>
  <p className="mt-3 text-sm text-white/60">
    Ləğv edilməmiş sifarişlərin ümumi məbləği.
  </p>
</div>
      <div className="mt-8 grid gap-8 xl:grid-cols-3">
        <section className="rounded-3xl border border-neutral-200 p-5">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold">Son məhsullar</h3>
              <p className="mt-1 text-sm text-neutral-500">
                Ən son əlavə olunan məhsullar.
              </p>
            </div>

            <Link
              href="/admin/products"
              className="rounded-full border border-neutral-200 px-4 py-2 text-xs font-medium transition hover:border-neutral-950"
            >
              Hamısı
            </Link>
          </div>

          {recentProducts.length > 0 ? (
            <div className="divide-y divide-neutral-200">
              {recentProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between gap-4 py-4"
                >
                  <div>
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="font-medium text-neutral-950 transition hover:underline"
                    >
                      {product.name_az}
                    </Link>
                    <p className="mt-1 text-xs text-neutral-500">
                      {formatDate(product.created_at)}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${getStatusClassName(
                      product.status
                    )}`}
                  >
                    {getStatusLabel(product.status)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="rounded-2xl border border-dashed border-neutral-300 p-5 text-sm text-neutral-500">
              Hələ məhsul yoxdur.
            </p>
          )}
        </section>
<section className="rounded-3xl border border-neutral-200 p-5">
  <div className="mb-5 flex items-center justify-between gap-4">
    <div>
      <h3 className="text-xl font-semibold">Son sifarişlər</h3>
      <p className="mt-1 text-sm text-neutral-500">
        Checkout-dan gələn son sifarişlər.
      </p>
    </div>

    <Link
      href="/admin/orders"
      className="rounded-full border border-neutral-200 px-4 py-2 text-xs font-medium transition hover:border-neutral-950"
    >
      Hamısı
    </Link>
  </div>

  {recentOrders.length > 0 ? (
    <div className="divide-y divide-neutral-200">
      {recentOrders.map((order) => (
        <div
          key={order.id}
          className="flex items-start justify-between gap-4 py-4"
        >
          <div>
            <Link
              href={`/admin/orders/${order.id}`}
              className="font-medium text-neutral-950 transition hover:underline"
            >
              {order.order_number}
            </Link>

            <p className="mt-1 text-sm text-neutral-700">
              {order.customer_name}
            </p>

            <p className="mt-1 text-xs text-neutral-500">
              {order.phone}
            </p>

            <p className="mt-1 text-xs text-neutral-400">
              {formatDate(order.created_at)}
            </p>
          </div>

          <div className="shrink-0 text-right">
            <p className="text-sm font-semibold text-neutral-950">
              {formatPrice(Number(order.total))}
            </p>

            <span
              className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusClassName(
                order.order_status
              )}`}
            >
              {getStatusLabel(order.order_status)}
            </span>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="rounded-2xl border border-dashed border-neutral-300 p-5 text-sm text-neutral-500">
      Hələ sifariş yoxdur.
    </p>
  )}
</section>
        <section className="rounded-3xl border border-neutral-200 p-5">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold">Son sorğular</h3>
              <p className="mt-1 text-sm text-neutral-500">
                Müştərilərdən gələn son mesajlar.
              </p>
            </div>

            <Link
              href="/admin/inquiries"
              className="rounded-full border border-neutral-200 px-4 py-2 text-xs font-medium transition hover:border-neutral-950"
            >
              Hamısı
            </Link>
          </div>

          {recentInquiries.length > 0 ? (
            <div className="divide-y divide-neutral-200">
              {recentInquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  className="flex items-center justify-between gap-4 py-4"
                >
                  <div>
                    <p className="font-medium text-neutral-950">
                      {inquiry.full_name}
                    </p>
                    <p className="mt-1 text-xs text-neutral-500">
                      {inquiry.phone || inquiry.email || "Əlaqə məlumatı yoxdur"}
                    </p>
                    <p className="mt-1 text-xs text-neutral-400">
                      {formatDate(inquiry.created_at)}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${getStatusClassName(
                      inquiry.status
                    )}`}
                  >
                    {getStatusLabel(inquiry.status)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="rounded-2xl border border-dashed border-neutral-300 p-5 text-sm text-neutral-500">
              Hələ sorğu yoxdur.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
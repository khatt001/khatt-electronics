import Link from "next/link";
import {
  getAdminDashboardStats,
  getRecentAdminInquiries,
  getRecentAdminProducts,
} from "@/services/admin-dashboard";

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
  if (status === "contacted") return "Əlaqə saxlanılıb";
  if (status === "closed") return "Bağlanıb";
  return "Yeni";
}

function getStatusClassName(status: string) {
  if (status === "active" || status === "new") {
    return "bg-emerald-50 text-emerald-700";
  }

  if (status === "draft" || status === "contacted") {
    return "bg-blue-50 text-blue-700";
  }

  return "bg-neutral-100 text-neutral-500";
}

export default async function AdminDashboardPage() {
  const [stats, recentProducts, recentInquiries] = await Promise.all([
    getAdminDashboardStats(),
    getRecentAdminProducts(),
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

      <div className="mt-8 grid gap-8 xl:grid-cols-2">
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
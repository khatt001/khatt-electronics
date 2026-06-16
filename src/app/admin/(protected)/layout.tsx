import Link from "next/link";

import { LogoutButton } from "@/components/admin/logout-button";
import { requireAdmin } from "@/services/admin";

const adminLinks = [
  {
    name: "Dashboard",
    href: "/admin",
  },
  {
    name: "Məhsullar",
    href: "/admin/products",
  },
  {
    name: "Kateqoriyalar",
    href: "/admin/categories",
  },
  {
    name: "Brendlər",
    href: "/admin/brands",
  },
  {
    name: "Sifarişlər",
    href: "/admin/orders",
  },
  {
    name: "Sorğular",
    href: "/admin/inquiries",
  },
];

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="min-h-screen bg-[#f5f6f8]">
      <div className="container-custom py-8">
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="h-fit rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm lg:sticky lg:top-6">
            <div className="mb-6 px-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                KHATT Admin
              </p>

              <h1 className="mt-2 text-2xl font-semibold text-neutral-950">
                İdarəetmə
              </h1>
            </div>

            <nav className="space-y-1">
              {adminLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-lg px-4 py-3 text-sm font-medium text-neutral-700 transition hover:bg-emerald-50 hover:text-emerald-700"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="mt-6 border-t border-neutral-100 pt-4">
              <LogoutButton />
            </div>
          </aside>

          <section className="min-w-0 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm md:p-6">
            {children}
          </section>
        </div>
      </div>
    </div>
  );
}

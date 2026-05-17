import Link from "next/link";
import { requireAdmin } from "@/services/admin";
import { LogoutButton } from "@/components/admin/logout-button";
const adminLinks = [
  { name: "Dashboard", href: "/admin" },
  { name: "Məhsullar", href: "/admin/products" },
  { name: "Kateqoriyalar", href: "/admin/categories" },
  { name: "Brendlər", href: "/admin/brands" },
  { name: "Sorğular", href: "/admin/inquiries" },
];

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <main className="min-h-screen bg-neutral-100 pt-16 lg:pt-[8.25rem] xl:pt-[7.5rem]">
      <div className="container-custom py-8">
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm">
            <div className="mb-6 px-3">
              <p className="text-xs uppercase tracking-[0.24em] text-neutral-400">
                KHATT Admin
              </p>
              <h1 className="mt-2 text-2xl font-semibold">İdarəetmə</h1>
            </div>

            <nav className="space-y-1">
              {adminLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-2xl px-4 py-3 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-950"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <LogoutButton />
          </aside>

          <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            {children}
          </section>
        </div>
      </div>
    </main>
  );
}
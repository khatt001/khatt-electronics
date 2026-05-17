import Link from "next/link";
import { Package, Tags, Building2, Inbox } from "lucide-react";

const stats = [
  {
    title: "Məhsullar",
    value: "0",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Kateqoriyalar",
    value: "0",
    href: "/admin/categories",
    icon: Tags,
  },
  {
    title: "Brendlər",
    value: "0",
    href: "/admin/brands",
    icon: Building2,
  },
  {
    title: "Sorğular",
    value: "0",
    href: "/admin/inquiries",
    icon: Inbox,
  },
];

export default function AdminPage() {
  return (
    <div>
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.24em] text-neutral-400">
          Dashboard
        </p>
        <h2 className="mt-2 text-3xl font-semibold">Ümumi baxış</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-3xl border border-neutral-200 p-5 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-8 flex size-11 items-center justify-center rounded-2xl bg-neutral-100">
                <Icon className="size-5" aria-hidden="true" />
              </div>

              <p className="text-sm text-neutral-500">{item.title}</p>
              <strong className="mt-2 block text-3xl">{item.value}</strong>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
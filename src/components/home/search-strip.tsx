import Link from "next/link";
import { Search } from "lucide-react";
import { miniCategories } from "@/data/home";

export function SearchStrip() {
  return (
    <section className="border-b border-black/10 bg-white">
      <div className="container-custom py-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-neutral-400"
              aria-hidden="true"
            />
            <input
              type="search"
              placeholder="Məhsul, kategoriya və ya model axtar..."
              className="h-14 w-full rounded-2xl border border-neutral-200 bg-[#f6f6f4] pl-12 pr-4 text-sm outline-none transition focus:border-neutral-950"
            />
          </div>

          <div className="grid grid-cols-3 gap-3 lg:w-[420px]">
            {miniCategories.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-neutral-200 bg-white px-3 py-4 text-xs font-medium transition hover:border-neutral-950"
                >
                  <Icon className="size-4" aria-hidden="true" />
                  <span className="hidden sm:inline">{item.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
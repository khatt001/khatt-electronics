import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { promoItems } from "@/data/home";
import { cn } from "@/lib/utils";

export function PromoCards() {
  return (
    <aside className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
      {promoItems.map((item, index) => {
        const Icon = item.icon;
        const featured = index === 0;

        return (
          <Link
            key={item.title}
            href={item.href}
            className={cn(
              "group relative overflow-hidden rounded-[2rem] border p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg",
              featured
                ? "border-emerald-300/30 bg-emerald-400 text-neutral-950"
                : "border-neutral-200 bg-white text-neutral-950"
            )}
          >
            {featured ? (
              <div className="absolute -right-16 -top-16 size-40 rounded-full bg-white/25 blur-2xl" />
            ) : (
              <div className="absolute -right-16 -top-16 size-40 rounded-full bg-emerald-100 blur-2xl" />
            )}

            <div
              className={cn(
                "relative mb-8 flex size-12 items-center justify-center rounded-2xl",
                featured ? "bg-neutral-950 text-white" : "bg-neutral-950 text-white"
              )}
            >
              <Icon className="size-6" aria-hidden="true" />
            </div>

            <h3 className="relative text-xl font-semibold">{item.title}</h3>

            <p
              className={cn(
                "relative mt-3 text-sm leading-6",
                featured ? "text-neutral-800" : "text-neutral-600"
              )}
            >
              {item.description}
            </p>

            <span className="relative mt-6 inline-flex items-center text-sm font-semibold">
              Ətraflı
              <ArrowRight
                className="ml-2 size-4 transition group-hover:translate-x-1"
                aria-hidden="true"
              />
            </span>
          </Link>
        );
      })}
    </aside>
  );
}
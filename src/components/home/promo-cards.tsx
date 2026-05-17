import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { promoItems } from "@/data/home";

export function PromoCards() {
  return (
    <aside className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
      {promoItems.map((item) => {
        const Icon = item.icon;

        return (
          <Link
            key={item.title}
            href={item.href}
            className="group rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <Icon className="mb-8 size-7 text-neutral-950" aria-hidden="true" />

            <h3 className="text-xl font-semibold">{item.title}</h3>

            <p className="mt-3 text-sm leading-6 text-neutral-600">
              {item.description}
            </p>

            <span className="mt-6 inline-flex items-center text-sm font-medium">
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
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { fireServices } from "@/data/fire-services";
import { localizedPath, type Locale } from "@/lib/i18n";

export function ServicesIndex({ locale }: { locale: Locale }) {
  const servicesHref = localizedPath("/services", locale);
  const items = fireServices.filter((service) => service.group === "fire");

  return (
    <ul className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      {items.map((service) => {
        const c = service.content[locale];

        return (
          <li key={service.id} className="min-w-0 bg-surface">
            <Link
              href={`${servicesHref}#${service.id}`}
              className="group flex h-full flex-col p-6 transition hover:bg-paper"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-muted">{service.zone}</span>
                <ArrowUpRight
                  className="size-4 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal"
                  aria-hidden="true"
                />
              </div>
              <h3 className="mt-8 font-sans text-lg leading-snug font-semibold text-ink">{c.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{c.summary}</p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

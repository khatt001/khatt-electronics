import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { serviceIcons } from "@/components/shared/service-icon";
import { fireServices } from "@/data/fire-services";
import { localizedPath, type Locale } from "@/lib/i18n";

export function ServicesIndex({ locale }: { locale: Locale }) {
  const servicesHref = localizedPath("/services", locale);
  const items = fireServices.filter((service) => service.group === "fire");

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((service) => {
        const c = service.content[locale];
        const Icon = serviceIcons[service.id];

        return (
          <li key={service.id} className="min-w-0">
            <Link
              href={`${servicesHref}#${service.id}`}
              className="group flex h-full flex-col rounded-xl border border-line bg-surface p-6 transition hover:border-ink/40 hover:shadow-[0_14px_34px_-18px_rgba(15,28,23,0.35)]"
            >
              <span className="flex size-12 items-center justify-center rounded-lg bg-paper text-ink transition group-hover:bg-signal group-hover:text-white">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-lg leading-snug font-semibold text-ink">{c.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-muted">{c.summary}</p>
              <ArrowRight className="mt-5 size-4 text-muted transition group-hover:translate-x-0.5 group-hover:text-signal" aria-hidden="true" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

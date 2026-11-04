import { Building, Building2, Hospital, Server, Store, Warehouse } from "lucide-react";

import { objectTypes } from "@/data/fire-services";
import type { Locale } from "@/lib/i18n";

// Same order as objectTypes
const icons = [Building, Building2, Store, Warehouse, Hospital, Server];

export function ObjectTypes({ locale }: { locale: Locale }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {objectTypes[locale].map((item, index) => {
        const Icon = icons[index];

        return (
          <li key={item.title} className="flex min-w-0 gap-4 rounded-xl border border-line bg-surface p-6">
            <Icon className="mt-0.5 size-6 shrink-0 text-ink" aria-hidden="true" />
            <div className="min-w-0">
              <h3 className="text-base font-semibold text-ink">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-muted">{item.systems}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

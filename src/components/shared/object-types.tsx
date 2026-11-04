import { objectTypes } from "@/data/fire-services";
import type { Locale } from "@/lib/i18n";

export function ObjectTypes({ locale }: { locale: Locale }) {
  return (
    <ul className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {objectTypes[locale].map((item) => (
        <li key={item.title} className="min-w-0 bg-surface p-6">
          <h3 className="font-sans text-base font-semibold text-ink">{item.title}</h3>
          <p className="mt-2 text-sm leading-6 text-muted">{item.systems}</p>
        </li>
      ))}
    </ul>
  );
}

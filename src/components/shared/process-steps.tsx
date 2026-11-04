import { processSteps } from "@/data/fire-services";
import type { Locale } from "@/lib/i18n";

export function ProcessSteps({ locale }: { locale: Locale }) {
  return (
    <ol className="grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-3">
      {processSteps[locale].map((step, index) => (
        <li key={step.title} className="min-w-0 border-r border-b border-line bg-surface p-6 md:p-8">
          <span className="font-mono text-xs text-signal">{String(index + 1).padStart(2, "0")}</span>
          <h3 className="mt-4 font-sans text-lg font-semibold text-ink">{step.title}</h3>
          <p className="mt-2 text-sm leading-6 text-muted">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}

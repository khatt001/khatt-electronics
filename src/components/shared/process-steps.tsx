import { stepIcons } from "@/components/shared/service-icon";
import { processSteps } from "@/data/fire-services";
import type { Locale } from "@/lib/i18n";

export function ProcessSteps({ locale }: { locale: Locale }) {
  return (
    <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {processSteps[locale].map((step, index) => {
        const Icon = stepIcons[index];

        return (
          <li key={step.title} className="flex min-w-0 gap-5">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-signal">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <div className="min-w-0 pt-1">
              <h3 className="text-base font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{step.text}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

import Link from "next/link";
import { ArrowRight, Calculator, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { homeTranslations } from "@/data/translations/home";
import type { Locale } from "@/lib/i18n";

type PromoCardsProps = {
  locale?: Locale;
};

const promoIcons = [Calculator, FileText];

export function PromoCards({ locale = "az" }: PromoCardsProps) {
  const t = homeTranslations[locale];

  return (
    <aside className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
      {t.promoItems.map((item, index) => {
        const Icon = promoIcons[index % promoIcons.length];
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
              {t.promoReadMore}
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
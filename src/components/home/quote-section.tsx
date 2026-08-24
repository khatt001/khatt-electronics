import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { localizedPath, type Locale } from "@/lib/i18n";

type QuoteSectionProps = {
  locale?: Locale;
};

const translations = {
  az: {
    eyebrow: "Layihəniz var?",
    title: "Obyektiniz üçün uyğun sistem və qiymət təklifi hazırlayaq",
    description:
      "Obyektin növünü, təxmini sahəsini və tələb olunan sistemi qeyd edin. Ehtiyacınıza uyğun avadanlıq və xidmət təklifi hazırlayaq.",
    button: "Layihə üçün müraciət et",
  },

  en: {
    eyebrow: "Planning a project?",
    title: "Let us prepare the right system and quotation for your property",
    description:
      "Provide the property type, approximate area and required system. We will prepare a suitable equipment and service proposal.",
    button: "Submit project request",
  },

  ru: {
    eyebrow: "Планируете проект?",
    title: "Подготовим подходящую систему и предложение для вашего объекта",
    description:
      "Укажите тип объекта, примерную площадь и необходимую систему. Мы подготовим предложение по оборудованию и услугам.",
    button: "Оставить заявку",
  },
} as const;

export function QuoteSection({ locale = "az" }: QuoteSectionProps) {
  const t = translations[locale];

  return (
    <section className="bg-neutral-950 py-14 text-white md:py-20">
      <Container>
        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
              {t.eyebrow}
            </p>

            <h2 className="mt-5 max-w-4xl text-3xl font-semibold leading-tight tracking-[-0.035em] md:text-4xl lg:text-5xl">
              {t.title}
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/60 md:text-base">
              {t.description}
            </p>
          </div>

          <Link
            href={`${localizedPath(
              "/contact",
              locale,
            )}?source=estimate`}
            className="inline-flex min-h-12 w-fit items-center justify-center rounded-lg bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
          >
            {t.button}

            <ArrowRight
              className="ml-2 size-4"
              aria-hidden="true"
            />
          </Link>
        </div>
      </Container>
    </section>
  );
}
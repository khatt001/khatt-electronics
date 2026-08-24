import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  Ruler,
  Settings2,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { localizedPath, type Locale } from "@/lib/i18n";

type QuoteSectionProps = {
  locale?: Locale;
};

const translations = {
  az: {
    eyebrow: "Layihəniz var?",
    title: "Obyektiniz üçün ilkin texniki təklif hazırlayaq",
    description:
      "Müraciət zamanı yalnız üç əsas məlumat kifayətdir. Detalları mütəxəssisimiz sizinlə birlikdə dəqiqləşdirəcək.",
    button: "Layihə üçün müraciət et",
    details: [
      {
        title: "Obyektin növü",
        value: "Ofis, mağaza, anbar və s.",
      },
      {
        title: "Təxmini sahə",
        value: "Obyektin ölçüsü və mərtəbə sayı",
      },
      {
        title: "Tələb olunan sistem",
        value: "Yanğın, elektrik, HVAC və s.",
      },
    ],
  },

  en: {
    eyebrow: "Have a project?",
    title: "Let us prepare an initial technical proposal",
    description:
      "Only three basic details are needed when submitting a request. Our specialist will clarify the remaining requirements with you.",
    button: "Submit a project request",
    details: [
      {
        title: "Property type",
        value: "Office, retail, warehouse and more",
      },
      {
        title: "Approximate area",
        value: "Property size and number of floors",
      },
      {
        title: "Required system",
        value: "Fire, electrical, HVAC and more",
      },
    ],
  },

  ru: {
    eyebrow: "Есть проект?",
    title: "Подготовим предварительное техническое предложение",
    description:
      "Для обращения достаточно трёх основных сведений. Остальные требования наш специалист уточнит вместе с вами.",
    button: "Оставить заявку",
    details: [
      {
        title: "Тип объекта",
        value: "Офис, магазин, склад и другое",
      },
      {
        title: "Примерная площадь",
        value: "Размер объекта и количество этажей",
      },
      {
        title: "Необходимая система",
        value: "Пожарная, электрическая, HVAC и другое",
      },
    ],
  },
} as const;

const icons = [Building2, Ruler, Settings2];

export function QuoteSection({
  locale = "az",
}: QuoteSectionProps) {
  const t = translations[locale];

  return (
    <section className="border-t border-neutral-200 bg-[#f4f5f2] py-16 md:py-20">
      <Container>
        <div className="overflow-hidden rounded-2xl border border-neutral-300 bg-white shadow-[0_18px_50px_rgba(0,0,0,0.05)]">
          <div className="h-1 w-full bg-emerald-600" />

          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="border-b border-neutral-200 p-7 md:p-10 lg:border-b-0 lg:border-r lg:p-12">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
                {t.eyebrow}
              </p>

              <h2 className="mt-5 max-w-2xl font-serif text-3xl leading-[1.1] tracking-[-0.035em] text-neutral-950 md:text-4xl">
                {t.title}
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-neutral-600 md:text-base">
                {t.description}
              </p>

              <Link
                href={localizedPath("/contact", locale)}
                className="group mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-neutral-950 px-6 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                {t.button}

                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>

            <div className="divide-y divide-neutral-200">
              {t.details.map((detail, index) => {
                const Icon = icons[index];

                return (
                  <div
                    key={detail.title}
                    className="group flex min-h-32 items-center gap-5 p-6 transition-colors hover:bg-emerald-50/50 md:px-9"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-700 transition-colors group-hover:border-emerald-200 group-hover:bg-white group-hover:text-emerald-700">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>

                    <div>
                      <h3 className="text-sm font-semibold text-neutral-950">
                        {detail.title}
                      </h3>

                      <p className="mt-1.5 text-sm leading-6 text-neutral-500">
                        {detail.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
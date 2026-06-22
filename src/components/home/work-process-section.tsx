import {
  ClipboardList,
  FileCheck2,
  MapPinned,
  Wrench,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import type { Locale } from "@/lib/i18n";

type WorkProcessSectionProps = {
  locale?: Locale;
};

const translations = {
  az: {
    eyebrow: "İş prosesi",
    title: "Obyektiniz üçün tam həll",
    description:
      "İlkin baxışdan sistemin təhvilinə və sonrakı texniki xidmətə qədər bütün mərhələləri idarə edirik.",

    steps: [
      {
        number: "01",
        title: "Obyektə baxış",
        description:
          "Obyektin sahəsi, təyinatı və texniki tələbləri müəyyənləşdirilir.",
      },
      {
        number: "02",
        title: "Layihə və təklif",
        description:
          "Avadanlıq siyahısı, yerləşmə planı və qiymət təklifi hazırlanır.",
      },
      {
        number: "03",
        title: "Quraşdırma",
        description:
          "Avadanlıqlar montaj edilir, proqramlaşdırılır və sistem sazlanır.",
      },
      {
        number: "04",
        title: "Təhvil və xidmət",
        description:
          "Sistem test edilir, müştəriyə təhvil verilir və texniki dəstək göstərilir.",
      },
    ],
  },

  en: {
    eyebrow: "Our process",
    title: "A complete solution for your property",
    description:
      "We manage every stage, from the initial site inspection to handover and ongoing maintenance.",

    steps: [
      {
        number: "01",
        title: "Site inspection",
        description:
          "We assess the size, purpose and technical requirements of the site.",
      },
      {
        number: "02",
        title: "Design and quotation",
        description:
          "We prepare the equipment list, layout and commercial quotation.",
      },
      {
        number: "03",
        title: "Installation",
        description:
          "Equipment is installed, programmed and commissioned.",
      },
      {
        number: "04",
        title: "Handover and service",
        description:
          "The system is tested, handed over and supported through maintenance.",
      },
    ],
  },

  ru: {
    eyebrow: "Процесс работы",
    title: "Комплексное решение для вашего объекта",
    description:
      "Мы управляем всеми этапами: от осмотра объекта до сдачи системы и последующего обслуживания.",

    steps: [
      {
        number: "01",
        title: "Осмотр объекта",
        description:
          "Определяются площадь, назначение и технические требования объекта.",
      },
      {
        number: "02",
        title: "Проект и предложение",
        description:
          "Подготавливаются список оборудования, схема размещения и стоимость.",
      },
      {
        number: "03",
        title: "Монтаж",
        description:
          "Оборудование устанавливается, программируется и настраивается.",
      },
      {
        number: "04",
        title: "Сдача и обслуживание",
        description:
          "Система тестируется, сдаётся заказчику и обслуживается.",
      },
    ],
  },
} as const;

const icons = [
  MapPinned,
  ClipboardList,
  Wrench,
  FileCheck2,
];

export function WorkProcessSection({
  locale = "az",
}: WorkProcessSectionProps) {
  const t = translations[locale];

  return (
    <section className="bg-[#14171a] py-12 text-white md:py-16">
      <Container>
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-500">
            {t.eyebrow}
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
            {t.title}
          </h2>

          <p className="mt-4 text-sm leading-7 text-white/60 md:text-base">
            {t.description}
          </p>
        </div>

        <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {t.steps.map((step, index) => {
            const Icon = icons[index];

            return (
              <div
                key={step.number}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6"
              >
                <div className="absolute right-5 top-4 text-5xl font-semibold text-white/[0.04]">
                  {step.number}
                </div>

                <div className="flex size-11 items-center justify-center rounded-xl bg-red-600 text-white">
                  <Icon className="size-5" aria-hidden="true" />
                </div>

                <p className="mt-6 text-xs font-semibold tracking-[0.16em] text-red-500">
                  {step.number}
                </p>

                <h3 className="mt-2 text-lg font-semibold">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/60">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
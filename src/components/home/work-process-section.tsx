import Link from "next/link";
import {
  ArrowUpRight,
  ClipboardList,
  FileCheck2,
  MapPinned,
  Wrench,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { localizedPath, type Locale } from "@/lib/i18n";

type WorkProcessSectionProps = {
  locale?: Locale;
};

const translations = {
  az: {
    eyebrow: "Layihə axını",
    title: "Baxışdan texniki xidmətə qədər vahid komanda",
    description:
      "Hər mərhələ bir-birini tamamlayır. Obyektin ilkin qiymətləndirilməsindən işlək sistemin təhvilinə qədər prosesə tam nəzarət edirik.",
    cta: "Layihəni müzakirə et",
    principleLabel: "İş prinsipi",
    principle: "Bir layihə · Bir komanda · Vahid məsuliyyət",
    steps: [
      {
        title: "Obyektə baxış",
        result: "Texniki tələblər",
        description:
          "Sahə, risklər, mövcud infrastruktur və layihənin əsas ehtiyacları yerində müəyyənləşdirilir.",
      },
      {
        title: "Layihə və təklif",
        result: "Plan və dəqiq smeta",
        description:
          "Avadanlıq seçimi, yerləşmə planı, iş həcmi və kommersiya təklifi hazırlanır.",
      },
      {
        title: "Quraşdırma və sazlama",
        result: "İşlək sistem",
        description:
          "Montaj, kabel infrastrukturu, proqramlaşdırma və bütün texniki sınaqlar həyata keçirilir.",
      },
      {
        title: "Təhvil və texniki xidmət",
        result: "Davamlı dəstək",
        description:
          "Sistem təhvil verilir, istifadə qaydaları izah olunur və sonrakı texniki xidmət təmin edilir.",
      },
    ],
  },

  en: {
    eyebrow: "Project workflow",
    title: "One team from site inspection to maintenance",
    description:
      "Every stage supports the next. We control the complete process from the initial assessment to the handover of a working system.",
    cta: "Discuss your project",
    principleLabel: "Working principle",
    principle: "One project · One team · Unified responsibility",
    steps: [
      {
        title: "Site inspection",
        result: "Technical requirements",
        description:
          "The facility, risks, existing infrastructure and main project requirements are assessed on site.",
      },
      {
        title: "Design and quotation",
        result: "Plan and clear budget",
        description:
          "Equipment selection, layout, scope of work and commercial proposal are prepared.",
      },
      {
        title: "Installation and setup",
        result: "Operational system",
        description:
          "Installation, cabling, programming and all required technical tests are completed.",
      },
      {
        title: "Handover and maintenance",
        result: "Ongoing support",
        description:
          "The system is handed over, operating instructions are provided and maintenance support continues.",
      },
    ],
  },

  ru: {
    eyebrow: "Процесс проекта",
    title: "Одна команда от осмотра до обслуживания",
    description:
      "Каждый этап дополняет следующий. Мы полностью контролируем процесс от первичной оценки объекта до сдачи готовой системы.",
    cta: "Обсудить проект",
    principleLabel: "Принцип работы",
    principle: "Один проект · Одна команда · Единая ответственность",
    steps: [
      {
        title: "Осмотр объекта",
        result: "Технические требования",
        description:
          "На объекте оцениваются площадь, риски, существующая инфраструктура и основные требования.",
      },
      {
        title: "Проект и предложение",
        result: "План и точная смета",
        description:
          "Подготавливаются подбор оборудования, схема размещения, объём работ и коммерческое предложение.",
      },
      {
        title: "Монтаж и настройка",
        result: "Рабочая система",
        description:
          "Выполняются монтаж, кабельная инфраструктура, программирование и технические испытания.",
      },
      {
        title: "Сдача и обслуживание",
        result: "Постоянная поддержка",
        description:
          "Система сдаётся заказчику, проводится инструктаж и обеспечивается дальнейшее обслуживание.",
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
    <section className="relative overflow-hidden bg-neutral-950 py-16 text-white md:py-20 lg:py-24">
      <div
        aria-hidden="true"
        className="absolute -right-32 -top-48 size-[520px] rounded-full border border-white/[0.04]"
      />

      <div
        aria-hidden="true"
        className="absolute -right-16 -top-32 size-[360px] rounded-full border border-white/[0.04]"
      />

      <Container>
        <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-400">
              {t.eyebrow}
            </p>

            <h2 className="mt-5 max-w-2xl font-serif text-3xl leading-[1.08] tracking-[-0.035em] md:text-4xl lg:text-[46px]">
              {t.title}
            </h2>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/55 md:text-base">
              {t.description}
            </p>
          </div>

          <Link
            href={localizedPath("/contact", locale)}
            className="group inline-flex min-h-12 w-fit items-center justify-center gap-3 rounded-xl bg-emerald-600 px-6 text-sm font-semibold text-white transition hover:bg-emerald-500"
          >
            {t.cta}

            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <div className="relative mt-12 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] md:mt-16">
          <div className="border-b border-white/10 px-6 py-5 md:flex md:items-center md:justify-between md:px-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
              {t.principleLabel}
            </p>

            <p className="mt-2 text-sm font-medium text-white/75 md:mt-0">
              {t.principle}
            </p>
          </div>

          <div className="relative px-6 py-8 md:px-8 md:py-10">
            <div
              aria-hidden="true"
              className="absolute bottom-10 left-[12.5%] right-[12.5%] top-[69px] hidden h-px bg-gradient-to-r from-emerald-500/20 via-emerald-400/80 to-emerald-500/20 md:block"
            />

            <div className="grid gap-0 md:grid-cols-4">
              {t.steps.map((step, index) => {
                const Icon = icons[index];
                const isLast = index === t.steps.length - 1;

                return (
                  <div
                    key={step.title}
                    className="group relative grid grid-cols-[48px_1fr] gap-4 pb-9 last:pb-0 md:block md:px-5 md:pb-0"
                  >
                    {!isLast ? (
                      <div
                        aria-hidden="true"
                        className="absolute bottom-0 left-[23px] top-12 w-px bg-emerald-500/35 md:hidden"
                      />
                    ) : null}

                    <div className="relative z-10 flex size-12 items-center justify-center rounded-full border border-emerald-400/35 bg-neutral-950 text-emerald-400 shadow-[0_0_0_8px_rgba(10,10,10,0.85)] transition group-hover:border-emerald-400 group-hover:bg-emerald-500 group-hover:text-neutral-950 md:mx-auto">
                      <Icon aria-hidden="true" className="size-5" />
                    </div>

                    <div className="md:mt-8 md:text-center">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-400">
                        {step.result}
                      </p>

                      <h3 className="mt-2 text-lg font-semibold text-white">
                        {step.title}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-white/50">
                        {step.description}
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
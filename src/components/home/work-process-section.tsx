import { Container } from "@/components/layout/container";
import type { Locale } from "@/lib/i18n";

type WorkProcessSectionProps = {
  locale?: Locale;
};

const translations = {
  az: {
    title: "Layihədən texniki xidmətə qədər vahid yanaşma",
    description:
      "Sistemin yalnız satışını deyil, düzgün layihələndirilməsini, quraşdırılmasını və stabil işləməsini təmin edirik.",
    services: [
      {
        number: "01",
        title: "Layihələndirmə və texniki seçim",
        description:
          "Obyektin təyinatı və texniki tələbləri qiymətləndirilir, uyğun sistem və avadanlıq siyahısı hazırlanır.",
      },
      {
        number: "02",
        title: "Təchizat və quraşdırma",
        description:
          "Seçilmiş avadanlıqlar təmin edilir, sistem standartlara uyğun quraşdırılır, proqramlaşdırılır və sınaqdan keçirilir.",
      },
      {
        number: "03",
        title: "Texniki xidmət və dəstək",
        description:
          "Sistemlərin periodik yoxlanılması, sazlanması, nasazlıqların aradan qaldırılması və yenilənməsi həyata keçirilir.",
      },
    ],
  },

  en: {
    title: "One approach from system design to technical maintenance",
    description:
      "We provide more than equipment supply. We ensure correct design, professional installation and reliable operation.",
    services: [
      {
        number: "01",
        title: "System design and technical selection",
        description:
          "We assess the property and its technical requirements, then prepare the appropriate system and equipment list.",
      },
      {
        number: "02",
        title: "Supply and installation",
        description:
          "Selected equipment is supplied, professionally installed, configured and tested according to required standards.",
      },
      {
        number: "03",
        title: "Maintenance and support",
        description:
          "We provide periodic inspection, configuration, troubleshooting and system upgrades.",
      },
    ],
  },

  ru: {
    title: "Единый подход от проектирования до технического обслуживания",
    description:
      "Мы не ограничиваемся поставкой оборудования, а обеспечиваем правильное проектирование, монтаж и стабильную работу системы.",
    services: [
      {
        number: "01",
        title: "Проектирование и технический подбор",
        description:
          "Оцениваем назначение объекта и технические требования, подготавливаем подходящую систему и перечень оборудования.",
      },
      {
        number: "02",
        title: "Поставка и монтаж",
        description:
          "Поставляем выбранное оборудование, устанавливаем, программируем и тестируем систему согласно требованиям.",
      },
      {
        number: "03",
        title: "Обслуживание и поддержка",
        description:
          "Проводим периодические проверки, настройку, устранение неисправностей и модернизацию систем.",
      },
    ],
  },
} as const;

export function WorkProcessSection({
  locale = "az",
}: WorkProcessSectionProps) {
  const t = translations[locale];

  return (
    <section className="border-b border-neutral-200 bg-white py-14 md:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800">
              KHATT Electronics
            </p>

            <h2 className="mt-5 max-w-xl text-3xl font-semibold leading-tight tracking-[-0.035em] text-neutral-950 md:text-4xl">
              {t.title}
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-neutral-600 md:text-base">
              {t.description}
            </p>
          </div>

          <div className="border-t border-neutral-300">
            {t.services.map((service) => (
              <div
                key={service.number}
                className="grid gap-4 border-b border-neutral-300 py-7 sm:grid-cols-[50px_minmax(0,1fr)] md:py-8"
              >
                <span className="text-sm font-semibold text-emerald-800">
                  {service.number}
                </span>

                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.02em] text-neutral-950">
                    {service.title}
                  </h3>

                  <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-600">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
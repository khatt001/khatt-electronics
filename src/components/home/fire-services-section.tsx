import Link from "next/link";
import {
  AlarmSmoke,
  ArrowRight,
  BellRing,
  ClipboardPenLine,
  Flame,
  PackageCheck,
  Settings,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { localizedPath, type Locale } from "@/lib/i18n";

type FireServicesSectionProps = {
  locale?: Locale;
};

const translations = {
  az: {
    eyebrow: "Yanğın təhlükəsizliyi",
    title: "Yanğın təhlükəsizliyi xidmətlərimiz",
    description:
      "Kiçik obyektlərdən iri kommersiya və sənaye sahələrinə qədər yanğın təhlükəsizliyi sistemlərinin layihələndirilməsi, təchizatı və quraşdırılmasını həyata keçiririk.",
    button: "Layihənizi müzakirə edək",

    services: [
      {
        title: "Yanğın siqnalizasiya sistemləri",
        description:
          "Ünvanlı və ünvansız yanğın siqnalizasiya sistemlərinin qurulması.",
      },
      {
        title: "Tüstü və istilik aşkarlama",
        description:
          "Obyektə uyğun tüstü, istilik və kombinə edilmiş detektorların seçilməsi.",
      },
      {
        title: "Xəbərdarlıq sistemləri",
        description:
          "Sirena, işıqlı xəbərverici və səsli təxliyə sistemlərinin quraşdırılması.",
      },
      {
        title: "Layihələndirmə",
        description:
          "Avadanlıq yerləşmə planı, kabel xətləri və sistem sxemlərinin hazırlanması.",
      },
      {
        title: "Texniki xidmət",
        description:
          "Sistemlərin periodik yoxlanılması, sazlanması, təmiri və yenilənməsi.",
      },
      {
        title: "Avadanlıq təchizatı",
        description:
          "Panel, detektor, modul, sirena və digər yanğın avadanlıqlarının satışı.",
      },
    ],
  },

  en: {
    eyebrow: "Fire safety",
    title: "Our fire safety services",
    description:
      "We design, supply and install fire safety systems for small sites, commercial buildings and industrial facilities.",
    button: "Discuss your project",

    services: [
      {
        title: "Fire alarm systems",
        description:
          "Installation of addressable and conventional fire alarm systems.",
      },
      {
        title: "Smoke and heat detection",
        description:
          "Selection of smoke, heat and combined detectors for your property.",
      },
      {
        title: "Alarm notification",
        description:
          "Installation of sounders, visual alarms and evacuation systems.",
      },
      {
        title: "System design",
        description:
          "Equipment layouts, cable routes and system diagrams.",
      },
      {
        title: "Technical maintenance",
        description:
          "Periodic inspection, configuration, repair and system upgrades.",
      },
      {
        title: "Equipment supply",
        description:
          "Control panels, detectors, modules, sounders and related equipment.",
      },
    ],
  },

  ru: {
    eyebrow: "Пожарная безопасность",
    title: "Наши услуги пожарной безопасности",
    description:
      "Мы проектируем, поставляем и устанавливаем системы пожарной безопасности для коммерческих, промышленных и других объектов.",
    button: "Обсудить проект",

    services: [
      {
        title: "Пожарная сигнализация",
        description:
          "Монтаж адресных и неадресных систем пожарной сигнализации.",
      },
      {
        title: "Обнаружение дыма и тепла",
        description:
          "Подбор дымовых, тепловых и комбинированных извещателей.",
      },
      {
        title: "Системы оповещения",
        description:
          "Установка сирен, световых оповещателей и систем эвакуации.",
      },
      {
        title: "Проектирование",
        description:
          "Планы размещения оборудования, кабельные линии и схемы системы.",
      },
      {
        title: "Техническое обслуживание",
        description:
          "Периодическая проверка, настройка, ремонт и модернизация.",
      },
      {
        title: "Поставка оборудования",
        description:
          "Панели, извещатели, модули, сирены и другое оборудование.",
      },
    ],
  },
} as const;

const icons = [
  Flame,
  AlarmSmoke,
  BellRing,
  ClipboardPenLine,
  Settings,
  PackageCheck,
];

export function FireServicesSection({
  locale = "az",
}: FireServicesSectionProps) {
  const t = translations[locale];

  return (
    <section className="bg-[#f5f6f8] py-10 md:py-16">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.8fr_2.2fr] lg:gap-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">
              {t.eyebrow}
            </p>

            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.03em] text-neutral-950 md:text-4xl">
              {t.title}
            </h2>

            <p className="mt-5 text-sm leading-7 text-neutral-600 md:text-base">
              {t.description}
            </p>

            <Link
              href={localizedPath("/contact", locale)}
              className="mt-7 inline-flex items-center rounded-xl bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              {t.button}

              <ArrowRight
                className="ml-2 size-4"
                aria-hidden="true"
              />
            </Link>
          </div>

          <div className="grid overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm sm:grid-cols-2 xl:grid-cols-3">
            {t.services.map((service, index) => {
              const Icon = icons[index];

              return (
                <div
                  key={service.title}
                  className="group border-b border-r border-neutral-200 p-6 transition hover:bg-red-50/50 md:p-7"
                >
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-red-50 text-red-600 transition group-hover:bg-red-600 group-hover:text-white">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>

                  <h3 className="mt-5 text-base font-semibold leading-6 text-neutral-950">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-neutral-600">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
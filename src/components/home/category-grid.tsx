import Link from "next/link";
import {
  AirVent,
  ArrowUpRight,
  Camera,
  Flame,
  Network,
  ScanFace,
  Zap,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { localizedPath, type Locale } from "@/lib/i18n";

type CategoryGridProps = {
  locale?: Locale;
};

const content = {
  az: {
    eyebrow: "Həllərimiz",
    title: "Obyektin bütün mühəndis sistemləri bir ünvanda",
    description:
      "Təhlükəsizlik, enerji, iqlim və zəif axın sistemlərini vahid layihə yanaşması ilə birləşdiririk.",
    viewAll: "Bütün həlləri nəzərdən keçir",
    featured: "Əsas istiqamət",
    items: [
      {
        title: "Yanğın təhlükəsizliyi",
        description:
          "Aşkarlama, xəbərdarlıq və təxliyə sistemləri",
        anchor: "fire-safety",
        icon: Flame,
      },
      {
        title: "Videomüşahidə",
        description:
          "Kamera, qeydiyyat və videoanalitika",
        anchor: "video-surveillance",
        icon: Camera,
      },
      {
        title: "Girişə nəzarət",
        description:
          "Keçid, domofon və işçi nəzarəti",
        anchor: "access-control",
        icon: ScanFace,
      },
      {
        title: "Elektrik sistemləri",
        description:
          "Enerji xətləri, panellər və qoruma",
        anchor: "electrical",
        icon: Zap,
      },
      {
        title: "İsitmə və soyutma",
        description:
          "HVAC, havalandırma və iqlim nəzarəti",
        anchor: "hvac",
        icon: AirVent,
      },
      {
        title: "Şəbəkə sistemləri",
        description:
          "Struktur kabel və zəif axın infrastrukturu",
        anchor: "network",
        icon: Network,
      },
    ],
  },

  en: {
    eyebrow: "Our solutions",
    title: "All engineering systems for your facility in one place",
    description:
      "We combine security, power, climate and low-current systems through a unified project approach.",
    viewAll: "Explore all solutions",
    featured: "Primary direction",
    items: [
      {
        title: "Fire safety",
        description:
          "Detection, notification and evacuation systems",
        anchor: "fire-safety",
        icon: Flame,
      },
      {
        title: "Video surveillance",
        description:
          "Cameras, recording and video analytics",
        anchor: "video-surveillance",
        icon: Camera,
      },
      {
        title: "Access control",
        description:
          "Entry, intercom and staff control",
        anchor: "access-control",
        icon: ScanFace,
      },
      {
        title: "Electrical systems",
        description:
          "Power lines, panels and protection",
        anchor: "electrical",
        icon: Zap,
      },
      {
        title: "Heating and cooling",
        description:
          "HVAC, ventilation and climate control",
        anchor: "hvac",
        icon: AirVent,
      },
      {
        title: "Network systems",
        description:
          "Structured cabling and low-current infrastructure",
        anchor: "network",
        icon: Network,
      },
    ],
  },

  ru: {
    eyebrow: "Наши решения",
    title: "Все инженерные системы объекта в одном месте",
    description:
      "Мы объединяем безопасность, электроснабжение, климат и слаботочные системы в рамках единого проекта.",
    viewAll: "Посмотреть все решения",
    featured: "Основное направление",
    items: [
      {
        title: "Пожарная безопасность",
        description:
          "Обнаружение, оповещение и эвакуация",
        anchor: "fire-safety",
        icon: Flame,
      },
      {
        title: "Видеонаблюдение",
        description:
          "Камеры, запись и видеоаналитика",
        anchor: "video-surveillance",
        icon: Camera,
      },
      {
        title: "Контроль доступа",
        description:
          "Доступ, домофон и контроль персонала",
        anchor: "access-control",
        icon: ScanFace,
      },
      {
        title: "Электрические системы",
        description:
          "Силовые линии, щиты и защита",
        anchor: "electrical",
        icon: Zap,
      },
      {
        title: "Отопление и охлаждение",
        description:
          "HVAC, вентиляция и климат-контроль",
        anchor: "hvac",
        icon: AirVent,
      },
      {
        title: "Сетевые системы",
        description:
          "Структурированные кабельные и слаботочные системы",
        anchor: "network",
        icon: Network,
      },
    ],
  },
} as const;

export function CategoryGrid({
  locale = "az",
}: CategoryGridProps) {
  const t = content[locale];
  const solutionsHref = localizedPath("/solutions", locale);

  return (
    <section className="border-y border-neutral-200 bg-[#f4f5f2] py-16 md:py-20 lg:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div className="lg:py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
              {t.eyebrow}
            </p>

            <h2 className="mt-5 max-w-lg font-serif text-3xl leading-[1.08] tracking-[-0.035em] text-neutral-950 md:text-4xl lg:text-[44px]">
              {t.title}
            </h2>

            <p className="mt-6 max-w-md text-sm leading-7 text-neutral-600 md:text-base">
              {t.description}
            </p>

            <Link
              href={solutionsHref}
              className="group mt-8 inline-flex items-center gap-3 border-b border-neutral-950 pb-2 text-sm font-semibold text-neutral-950 transition hover:border-emerald-700 hover:text-emerald-700"
            >
              {t.viewAll}

              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          <div className="grid overflow-hidden rounded-2xl border border-neutral-300 bg-neutral-300 shadow-[0_20px_55px_rgba(0,0,0,0.06)] sm:grid-cols-2">
            {t.items.map((item, index) => {
              const Icon = item.icon;
              const isFeatured = index === 0;

              return (
                <Link
                  key={item.anchor}
                  href={`${solutionsHref}#${item.anchor}`}
                  className={
                    isFeatured
                      ? "group relative min-h-44 overflow-hidden bg-neutral-950 p-6 text-white sm:min-h-52"
                      : "group relative min-h-40 bg-white p-6 transition-colors hover:bg-emerald-50 sm:min-h-52"
                  }
                >
                  {isFeatured ? (
                    <Icon
                      aria-hidden="true"
                      className="absolute -bottom-8 -right-7 size-40 text-white/[0.045]"
                    />
                  ) : null}

                  <div className="relative flex h-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <span
                        className={
                          isFeatured
                            ? "flex size-11 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-400"
                            : "flex size-11 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-700 transition group-hover:border-emerald-200 group-hover:bg-white group-hover:text-emerald-700"
                        }
                      >
                        <Icon aria-hidden="true" className="size-5" />
                      </span>

                      <ArrowUpRight
                        aria-hidden="true"
                        className={
                          isFeatured
                            ? "size-4 text-white/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald-400"
                            : "size-4 text-neutral-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald-700"
                        }
                      />
                    </div>

                    <div className="mt-auto pt-8">
                      {isFeatured ? (
                        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-400">
                          {t.featured}
                        </p>
                      ) : null}

                      <h3 className="text-lg font-semibold tracking-tight">
                        {item.title}
                      </h3>

                      <p
                        className={
                          isFeatured
                            ? "mt-2 text-sm leading-6 text-white/55"
                            : "mt-2 text-sm leading-6 text-neutral-500"
                        }
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
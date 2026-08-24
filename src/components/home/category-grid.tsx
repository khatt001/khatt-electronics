import Link from "next/link";
import {
  ArrowUpRight,
  Camera,
  Flame,
  Network,
  ScanFace,
  Wind,
  Zap,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { localizedPath, type Locale } from "@/lib/i18n";

type CategoryGridProps = {
  locale?: Locale;
};

const translations = {
  az: {
    eyebrow: "Fəaliyyət istiqamətləri",
    title: "Həllərimiz",
    description:
      "Təhlükəsizlik, mühəndis və infrastruktur sistemləri üzrə layihələndirmə, avadanlıq təchizatı, quraşdırma və texniki xidmət.",
    viewAll: "Bütün həllər",
    solutions: [
      {
        title: "Yanğın təhlükəsizliyi sistemləri",
        description:
          "Yanğın siqnalizasiyası, tüstü və istilik aşkarlanması, xəbərdarlıq və təxliyə sistemləri.",
        anchor: "fire-safety",
      },
      {
        title: "Videomüşahidə sistemləri",
        description:
          "IP və analoq kameralar, qeydiyyat sistemləri, uzaqdan izləmə və videoanalitika.",
        anchor: "video-surveillance",
      },
      {
        title: "Girişə nəzarət sistemləri",
        description:
          "Kartlı keçid, biometrik sistemlər, turniket, domofon və elektron kilid həlləri.",
        anchor: "access-control",
      },
      {
        title: "Elektrik sistemləri",
        description:
          "Elektrik layihələri, kabel xətləri, paylayıcı lövhələr, işıqlandırma və torpaqlama.",
        anchor: "electrical",
      },
      {
        title: "İsitmə, soyutma və havalandırma",
        description:
          "İsitmə-soyutma, kondisioner və havalandırma sistemlərinin quraşdırılması və xidməti.",
        anchor: "hvac",
      },
      {
        title: "Şəbəkə və zəif axın sistemləri",
        description:
          "Strukturlaşdırılmış kabel, şəbəkə avadanlıqları, rack sistemləri və fiber-optik infrastruktur.",
        anchor: "networking",
      },
    ],
  },

  en: {
    eyebrow: "Areas of expertise",
    title: "Our solutions",
    description:
      "Design, equipment supply, installation and maintenance across security, engineering and infrastructure systems.",
    viewAll: "View all solutions",
    solutions: [
      {
        title: "Fire safety systems",
        description:
          "Fire alarms, smoke and heat detection, notification and evacuation systems.",
        anchor: "fire-safety",
      },
      {
        title: "Video surveillance systems",
        description:
          "IP and analogue cameras, recording systems, remote monitoring and video analytics.",
        anchor: "video-surveillance",
      },
      {
        title: "Access control systems",
        description:
          "Card access, biometric systems, turnstiles, intercoms and electronic locking solutions.",
        anchor: "access-control",
      },
      {
        title: "Electrical systems",
        description:
          "Electrical design, cabling, distribution panels, lighting and grounding systems.",
        anchor: "electrical",
      },
      {
        title: "Heating, cooling and ventilation",
        description:
          "Installation and maintenance of heating, cooling, air conditioning and ventilation systems.",
        anchor: "hvac",
      },
      {
        title: "Network and low-current systems",
        description:
          "Structured cabling, network equipment, rack systems and fibre-optic infrastructure.",
        anchor: "networking",
      },
    ],
  },

  ru: {
    eyebrow: "Направления деятельности",
    title: "Наши решения",
    description:
      "Проектирование, поставка, монтаж и обслуживание систем безопасности, инженерии и инфраструктуры.",
    viewAll: "Все решения",
    solutions: [
      {
        title: "Системы пожарной безопасности",
        description:
          "Пожарная сигнализация, обнаружение дыма и тепла, оповещение и эвакуация.",
        anchor: "fire-safety",
      },
      {
        title: "Системы видеонаблюдения",
        description:
          "IP и аналоговые камеры, видеорегистраторы, удалённый мониторинг и видеоаналитика.",
        anchor: "video-surveillance",
      },
      {
        title: "Системы контроля доступа",
        description:
          "Карточный доступ, биометрия, турникеты, домофоны и электронные замки.",
        anchor: "access-control",
      },
      {
        title: "Электрические системы",
        description:
          "Электропроектирование, кабельные линии, щиты, освещение и заземление.",
        anchor: "electrical",
      },
      {
        title: "Отопление, охлаждение и вентиляция",
        description:
          "Монтаж и обслуживание систем отопления, кондиционирования и вентиляции.",
        anchor: "hvac",
      },
      {
        title: "Сетевые и слаботочные системы",
        description:
          "Структурированные кабельные сети, сетевое оборудование, стойки и оптоволокно.",
        anchor: "networking",
      },
    ],
  },
} as const;

const icons = [
  Flame,
  Camera,
  ScanFace,
  Zap,
  Wind,
  Network,
];

export function CategoryGrid({ locale = "az" }: CategoryGridProps) {
  const t = translations[locale];

  return (
    <section className="bg-[#f6f7f5] py-14 md:py-20">
      <Container>
        <div className="flex flex-col justify-between gap-6 border-b border-neutral-300 pb-7 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800">
              {t.eyebrow}
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-neutral-950 md:text-4xl">
              {t.title}
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-neutral-600 md:text-base">
              {t.description}
            </p>
          </div>

          <Link
            href={localizedPath("/solutions", locale)}
            className="inline-flex w-fit items-center text-sm font-semibold text-neutral-900 transition hover:text-emerald-800"
          >
            {t.viewAll}

            <ArrowUpRight
              className="ml-2 size-4"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="mt-8 grid overflow-hidden border-l border-t border-neutral-300 sm:grid-cols-2 lg:grid-cols-3">
          {t.solutions.map((solution, index) => {
            const Icon = icons[index];

            return (
              <Link
                key={solution.anchor}
                href={`${localizedPath(
                  "/solutions",
                  locale,
                )}#${solution.anchor}`}
                className="group min-h-[280px] border-b border-r border-neutral-300 bg-white p-6 transition hover:bg-neutral-950 md:p-8"
              >
                <div className="flex items-start justify-between gap-5">
                  <span className="text-xs font-semibold text-emerald-700 transition group-hover:text-emerald-400">
                    0{index + 1}
                  </span>

                  <Icon
                    className="size-6 text-neutral-500 transition group-hover:text-white"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>

                <div className="mt-16">
                  <h3 className="max-w-sm text-xl font-semibold leading-7 tracking-[-0.02em] text-neutral-950 transition group-hover:text-white">
                    {solution.title}
                  </h3>

                  <p className="mt-4 max-w-sm text-sm leading-7 text-neutral-600 transition group-hover:text-white/60">
                    {solution.description}
                  </p>

                  <ArrowUpRight
                    className="mt-6 size-5 text-neutral-500 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-emerald-400"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
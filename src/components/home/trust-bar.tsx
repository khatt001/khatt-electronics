import {
  BadgeCheck,
  ClipboardCheck,
  Headphones,
  Wrench,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import type { Locale } from "@/lib/i18n";

type TrustBarProps = {
  locale?: Locale;
};

const translations = {
  az: [
    {
      title: "Layihələndirmə",
      description: "Obyektə uyğun texniki həll",
    },
    {
      title: "Peşəkar quraşdırma",
      description: "Standartlara uyğun montaj",
    },
    {
      title: "Texniki xidmət",
      description: "Yoxlama, sazlama və təmir",
    },
    {
      title: "Rəsmi zəmanət",
      description: "Avadanlıq və işlərə dəstək",
    },
  ],

  en: [
    {
      title: "System design",
      description: "A solution tailored to your site",
    },
    {
      title: "Professional installation",
      description: "Installation to required standards",
    },
    {
      title: "Technical maintenance",
      description: "Inspection, setup and repair",
    },
    {
      title: "Official warranty",
      description: "Support for equipment and work",
    },
  ],

  ru: [
    {
      title: "Проектирование",
      description: "Решение с учётом объекта",
    },
    {
      title: "Профессиональный монтаж",
      description: "Монтаж согласно требованиям",
    },
    {
      title: "Техническое обслуживание",
      description: "Проверка, настройка и ремонт",
    },
    {
      title: "Официальная гарантия",
      description: "Поддержка оборудования и работ",
    },
  ],
} as const;

const icons = [
  ClipboardCheck,
  Wrench,
  Headphones,
  BadgeCheck,
];

export function TrustBar({ locale = "az" }: TrustBarProps) {
  const items = translations[locale];

  return (
    <section className="bg-[#f5f6f8] py-4 md:py-5">
      <Container>
        <div className="grid overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => {
            const Icon = icons[index];

            return (
              <div
                key={item.title}
                className="flex items-center gap-4 border-b border-r border-neutral-200 p-5 last:border-b-0 lg:border-b-0"
              >
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <Icon className="size-5" aria-hidden="true" />
                </div>

                <div>
                  <h2 className="text-sm font-semibold text-neutral-950">
                    {item.title}
                  </h2>

                  <p className="mt-1 text-xs leading-5 text-neutral-500">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
import Link from "next/link";
import {
  BadgeCheck,
  Headphones,
  PackageCheck,
  ShieldCheck,
  Truck,
  Wrench,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { localizedPath, type Locale } from "@/lib/i18n";

type ServicesSectionProps = {
  locale?: Locale;
};

const servicesTranslations = {
  az: {
    eyebrow: "Kompleks xidmət",
    title: "Satışdan quraşdırmaya qədər yanınızdayıq",
    description:
      "Obyektiniz üçün uyğun avadanlığın seçilməsi, layihələndirmə, quraşdırma və texniki dəstəyi bir yerdən əldə edin.",
    contact: "Bizimlə əlaqə saxlayın",
    advantages: [
      {
        title: "Rəsmi zəmanət",
        description:
          "Satılan məhsullara uyğun zəmanət və satış sonrası dəstək.",
      },
      {
        title: "Peşəkar quraşdırma",
        description:
          "Təhlükəsizlik sistemlərinin layihələndirilməsi və montajı.",
      },
      {
        title: "Texniki dəstək",
        description:
          "Avadanlıq seçimi, sazlama və texniki məsələlər üzrə dəstək.",
      },
      {
        title: "Sürətli çatdırılma",
        description: "Sifarişlərin Bakı və bölgələrə təhlükəsiz çatdırılması.",
      },
    ],
    originalProducts: "Orijinal məhsullar",
    safePurchase: "Təhlükəsiz alış",
    fastSupport: "Operativ dəstək",
  },
  en: {
    eyebrow: "Complete service",
    title: "We support you from sales to installation",
    description:
      "Get equipment selection, system design, installation and technical support for your property from one place.",
    contact: "Contact us",
    advantages: [
      {
        title: "Official warranty",
        description:
          "Warranty and after-sales support for the products we sell.",
      },
      {
        title: "Professional installation",
        description: "Design and installation of security systems.",
      },
      {
        title: "Technical support",
        description:
          "Support with equipment selection, configuration and technical matters.",
      },
      {
        title: "Fast delivery",
        description: "Safe delivery of orders across Baku and the regions.",
      },
    ],
    originalProducts: "Original products",
    safePurchase: "Secure purchase",
    fastSupport: "Responsive support",
  },
  ru: {
    eyebrow: "Комплексный сервис",
    title: "Мы рядом от продажи до установки",
    description:
      "Получите подбор оборудования, проектирование, монтаж и техническую поддержку для вашего объекта в одном месте.",
    contact: "Связаться с нами",
    advantages: [
      {
        title: "Официальная гарантия",
        description:
          "Гарантия и послепродажная поддержка на реализуемые товары.",
      },
      {
        title: "Профессиональный монтаж",
        description: "Проектирование и установка систем безопасности.",
      },
      {
        title: "Техническая поддержка",
        description:
          "Помощь в подборе оборудования, настройке и технических вопросах.",
      },
      {
        title: "Быстрая доставка",
        description: "Безопасная доставка заказов по Баку и регионам.",
      },
    ],
    originalProducts: "Оригинальные товары",
    safePurchase: "Безопасная покупка",
    fastSupport: "Оперативная поддержка",
  },
} as const;

const advantageIcons = [BadgeCheck, Wrench, Headphones, Truck];

export function ServicesSection({ locale = "az" }: ServicesSectionProps) {
  const t = servicesTranslations[locale];

  return (
    <section className="bg-[#f5f6f8] py-8 md:py-12">
      <Container>
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-[0.9fr_2.1fr]">
            <div className="relative overflow-hidden bg-neutral-950 p-7 text-white md:p-9 lg:p-10">
              <div className="absolute -right-20 -top-20 size-64 rounded-full bg-emerald-500/20 blur-3xl" />
              <div className="absolute -bottom-24 -left-20 size-64 rounded-full bg-emerald-800/30 blur-3xl" />

              <div className="relative z-10">
                <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-600">
                  <ShieldCheck className="size-6" aria-hidden="true" />
                </div>

                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                  {t.eyebrow}
                </p>

                <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                  {t.title}
                </h2>

                <p className="mt-4 max-w-md text-sm leading-7 text-white/70">
                  {t.description}
                </p>

                <Link
                  href={localizedPath("/contact", locale)}
                  className="mt-7 inline-flex items-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-emerald-100 hover:text-emerald-800"
                >
                  {t.contact}
                </Link>
              </div>
            </div>

            <div className="grid sm:grid-cols-2">
              {t.advantages.map((item, index) => {
                const Icon = advantageIcons[index];

                return (
                  <div
                    key={item.title}
                    className="border-b border-r border-neutral-200 p-6 transition hover:bg-emerald-50/40 md:p-7"
                  >
                    <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>

                    <h3 className="mt-5 text-base font-semibold text-neutral-950">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-neutral-600">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-5 py-4 shadow-sm">
            <PackageCheck
              className="size-5 shrink-0 text-emerald-700"
              aria-hidden="true"
            />

            <span className="text-sm font-medium text-neutral-800">
              {t.originalProducts}
            </span>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-5 py-4 shadow-sm">
            <ShieldCheck
              className="size-5 shrink-0 text-emerald-700"
              aria-hidden="true"
            />

            <span className="text-sm font-medium text-neutral-800">
              {t.safePurchase}
            </span>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-5 py-4 shadow-sm">
            <Headphones
              className="size-5 shrink-0 text-emerald-700"
              aria-hidden="true"
            />

            <span className="text-sm font-medium text-neutral-800">
              {t.fastSupport}
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { localizedPath, type Locale } from "@/lib/i18n";

type HomeHeroProps = {
  locale?: Locale;
};

const translations = {
  az: {
    eyebrow: "KHATT Electronics",
    title: "Obyektlər üçün peşəkar təhlükəsizlik və mühəndis sistemləri",
    description:
      "Yanğın təhlükəsizliyi, videomüşahidə, girişə nəzarət və şəbəkə sistemlərini layihələndirir, təchiz edir, quraşdırır və texniki xidmət göstəririk.",
    primaryButton: "Layihə üçün təklif al",
    secondaryButton: "Məhsullara bax",
    directions: [
      "Yanğın təhlükəsizliyi",
      "Videomüşahidə və girişə nəzarət",
      "Şəbəkə və mühəndis sistemləri",
    ],
    imageEyebrow: "Tam xidmət",
    imageTitle:
      "Layihələndirmə, təchizat, quraşdırma və texniki xidmət",
  },

  en: {
    eyebrow: "KHATT Electronics",
    title:
      "Professional security and engineering systems for commercial properties",
    description:
      "We design, supply, install and maintain fire safety, video surveillance, access control and network systems.",
    primaryButton: "Request a project quote",
    secondaryButton: "View products",
    directions: [
      "Fire safety systems",
      "Video surveillance and access control",
      "Network and engineering systems",
    ],
    imageEyebrow: "Complete service",
    imageTitle:
      "Design, equipment supply, installation and technical maintenance",
  },

  ru: {
    eyebrow: "KHATT Electronics",
    title:
      "Профессиональные системы безопасности и инженерные решения для объектов",
    description:
      "Проектируем, поставляем, устанавливаем и обслуживаем системы пожарной безопасности, видеонаблюдения, контроля доступа и сетевую инфраструктуру.",
    primaryButton: "Получить предложение",
    secondaryButton: "Смотреть товары",
    directions: [
      "Пожарная безопасность",
      "Видеонаблюдение и контроль доступа",
      "Сетевые и инженерные системы",
    ],
    imageEyebrow: "Полный комплекс услуг",
    imageTitle:
      "Проектирование, поставка, монтаж и техническое обслуживание",
  },
} as const;

export function HomeHero({ locale = "az" }: HomeHeroProps) {
  const t = translations[locale];

  return (
    <section className="border-b border-neutral-200 bg-white">
      <Container className="py-10 md:py-14 lg:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.9fr)] lg:gap-14">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span
                className="h-px w-10 bg-emerald-700"
                aria-hidden="true"
              />

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800">
                {t.eyebrow}
              </p>
            </div>

            <h1 className="mt-6 text-[2.5rem] font-semibold leading-[1.06] tracking-[-0.045em] text-neutral-950 sm:text-5xl md:text-6xl lg:text-[4rem]">
              {t.title}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-neutral-600 md:text-lg">
              {t.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`${localizedPath(
                  "/contact",
                  locale,
                )}?source=estimate`}
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                {t.primaryButton}

                <ArrowRight
                  className="ml-2 size-4"
                  aria-hidden="true"
                />
              </Link>

              <Link
                href={localizedPath("/products", locale)}
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:border-neutral-950"
              >
                {t.secondaryButton}
              </Link>
            </div>

            <div className="mt-10 grid border-y border-neutral-200 sm:grid-cols-3">
              {t.directions.map((direction, index) => (
                <div
                  key={direction}
                  className="flex items-start gap-3 border-b border-neutral-200 py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-r-0"
                >
                  <span className="pt-0.5 text-xs font-semibold text-emerald-700">
                    0{index + 1}
                  </span>

                  <span className="text-sm font-medium leading-6 text-neutral-700">
                    {direction}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[430px] overflow-hidden rounded-2xl bg-neutral-900 sm:min-h-[520px] lg:min-h-[620px]">
            <Image
              src="/banners/side-fire.webp"
              alt={t.title}
              fill
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/10 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                {t.imageEyebrow}
              </p>

              <p className="mt-3 max-w-md text-xl font-semibold leading-8 md:text-2xl">
                {t.imageTitle}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
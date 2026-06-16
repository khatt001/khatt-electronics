import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import {
  localizedPath,
  type Locale,
} from "@/lib/i18n";

type HomeHeroProps = {
  locale?: Locale;
};

const heroTranslations = {
  az: {
    mainAlt:
      "Videomüşahidə və təhlükəsizlik sistemləri",
    eyebrow: "Yeni nəsil təhlükəsizlik",
    title:
      "Obyektiniz üçün tam təhlükəsizlik həlləri",
    description:
      "Videomüşahidə, yanğın siqnalizasiya, keçidə nəzarət və şəbəkə avadanlıqlarını bir ünvandan seçin.",
    productsButton: "Məhsullara bax",
    fireAlt:
      "Yanğın siqnalizasiya sistemləri",
    fireEyebrow: "Yanğın təhlükəsizliyi",
    fireTitle: "Yanğın sistemləri",
    fireDescription:
      "Detektor, panel və xəbərdarlıq avadanlıqları.",
    fireButton: "Kataloqa keç",
    networkAlt: "Şəbəkə avadanlıqları",
    networkEyebrow: "Professional şəbəkə",
    networkTitle: "Şəbəkə avadanlıqları",
    networkDescription:
      "Router, switch, access point və kabel həlləri.",
    networkButton: "Məhsullara bax",
  },
  en: {
    mainAlt:
      "Video surveillance and security systems",
    eyebrow: "Next-generation security",
    title:
      "Complete security solutions for your property",
    description:
      "Choose video surveillance, fire alarms, access control and networking equipment from one place.",
    productsButton: "View products",
    fireAlt: "Fire alarm systems",
    fireEyebrow: "Fire safety",
    fireTitle: "Fire systems",
    fireDescription:
      "Detectors, control panels and alarm equipment.",
    fireButton: "View catalog",
    networkAlt: "Network equipment",
    networkEyebrow: "Professional networking",
    networkTitle: "Network equipment",
    networkDescription:
      "Routers, switches, access points and cabling solutions.",
    networkButton: "View products",
  },
  ru: {
    mainAlt:
      "Системы видеонаблюдения и безопасности",
    eyebrow: "Безопасность нового поколения",
    title:
      "Комплексные решения безопасности для вашего объекта",
    description:
      "Выбирайте видеонаблюдение, пожарную сигнализацию, контроль доступа и сетевое оборудование в одном месте.",
    productsButton: "Смотреть товары",
    fireAlt: "Системы пожарной сигнализации",
    fireEyebrow: "Пожарная безопасность",
    fireTitle: "Пожарные системы",
    fireDescription:
      "Датчики, панели управления и оборудование оповещения.",
    fireButton: "Перейти в каталог",
    networkAlt: "Сетевое оборудование",
    networkEyebrow: "Профессиональная сеть",
    networkTitle: "Сетевое оборудование",
    networkDescription:
      "Роутеры, коммутаторы, точки доступа и кабельные решения.",
    networkButton: "Смотреть товары",
  },
} as const;

export function HomeHero({
  locale = "az",
}: HomeHeroProps) {
  const t = heroTranslations[locale];

  return (
    <section className="border-b border-black/5 bg-[#f5f6f8]">
      <Container className="py-5 md:py-7">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,2.2fr)_minmax(300px,0.8fr)]">
          <Link
            href={localizedPath(
              "/products",
              locale,
            )}
            className="group relative min-h-[420px] overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm md:min-h-[470px]"
          >
            <Image
              src="/banners/main-cctv.webp"
              alt={t.mainAlt}
              fill
              priority
              sizes="(min-width: 1024px) 72vw, 100vw"
              className="object-cover transition duration-700 group-hover:scale-[1.015]"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/10" />

            <div className="relative z-10 flex min-h-[420px] max-w-[78%] flex-col justify-center p-6 sm:max-w-[65%] md:min-h-[470px] md:max-w-[58%] md:p-10 lg:p-12">
              <span className="inline-flex w-fit items-center rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white">
                {t.eyebrow}
              </span>

              <h1 className="mt-5 text-3xl font-semibold leading-[1.06] tracking-[-0.035em] text-neutral-950 sm:text-4xl md:text-5xl lg:text-6xl">
                {t.title}
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-neutral-600 md:mt-5 md:text-base">
                {t.description}
              </p>

              <span className="mt-6 inline-flex w-fit items-center rounded-lg bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition group-hover:bg-emerald-700">
                {t.productsButton}

                <ArrowRight
                  className="ml-2 size-4 transition group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </div>

            <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
              <span className="h-2 w-6 rounded-md bg-emerald-600" />
              <span className="size-2 rounded-md bg-white/80" />
              <span className="size-2 rounded-md bg-white/80" />
            </div>
          </Link>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <Link
              href={`${localizedPath(
                "/products",
                locale,
              )}?category=siqnalizasiya`}
              className="group relative min-h-[225px] overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm"
            >
              <Image
                src="/banners/side-fire.webp"
                alt={t.fireAlt}
                fill
                sizes="(min-width: 1024px) 28vw, 50vw"
                className="object-cover transition duration-700 group-hover:scale-[1.03]"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/75 to-transparent" />

              <div className="relative z-10 flex h-full min-h-[225px] max-w-[78%] flex-col justify-between p-6">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-red-600">
                    {t.fireEyebrow}
                  </span>

                  <h2 className="mt-3 text-2xl font-semibold leading-tight text-neutral-950">
                    {t.fireTitle}
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-neutral-600">
                    {t.fireDescription}
                  </p>
                </div>

                <span className="mt-5 inline-flex w-fit items-center rounded-lg bg-neutral-950 px-4 py-2.5 text-sm font-semibold text-white transition group-hover:bg-red-700">
                  {t.fireButton}

                  <ArrowRight
                    className="ml-2 size-4 transition group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </Link>

            <Link
              href={`${localizedPath(
                "/products",
                locale,
              )}?category=sebeke`}
              className="group relative min-h-[225px] overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm"
            >
              <Image
                src="/banners/side-network.webp"
                alt={t.networkAlt}
                fill
                sizes="(min-width: 1024px) 28vw, 50vw"
                className="object-cover transition duration-700 group-hover:scale-[1.03]"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/75 to-transparent" />

              <div className="relative z-10 flex h-full min-h-[225px] max-w-[78%] flex-col justify-between p-6">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">
                    {t.networkEyebrow}
                  </span>

                  <h2 className="mt-3 text-2xl font-semibold leading-tight text-neutral-950">
                    {t.networkTitle}
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-neutral-600">
                    {t.networkDescription}
                  </p>
                </div>

                <span className="mt-5 inline-flex w-fit items-center rounded-lg bg-neutral-950 px-4 py-2.5 text-sm font-semibold text-white transition group-hover:bg-emerald-700">
                  {t.networkButton}

                  <ArrowRight
                    className="ml-2 size-4 transition group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
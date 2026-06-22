import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Camera,
  CheckCircle2,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { localizedPath, type Locale } from "@/lib/i18n";

type HomeHeroProps = {
  locale?: Locale;
};

const translations = {
  az: {
    zoneStatus: "Bütün zonalar aktiv",
    title: "Obyektiniz üçün etibarlı yanğın təhlükəsizliyi həlləri",
    description:
      "Yanğın siqnalizasiya sistemlərinin layihələndirilməsi, avadanlıq təchizatı, peşəkar quraşdırılması və texniki xidmətini bir ünvandan əldə edin.",
    quoteButton: "Layihə üçün müraciət et",
    productsButton: "Yanğın avadanlıqlarına bax",

    benefitOne: "Obyektə uyğun layihələndirmə",
    benefitTwo: "Peşəkar quraşdırma və sazlama",
    benefitThree: "Texniki xidmət və dəstək",

    cctvEyebrow: "Videomüşahidə",
    cctvTitle: "Kamera sistemləri",
    cctvDescription:
      "Obyektlər üçün peşəkar kamera, qeydiyyat və uzaqdan izləmə həlləri.",
    cctvButton: "Məhsullara bax",

    securityEyebrow: "Kompleks təhlükəsizlik",
    securityTitle: "Girişə nəzarət",
    securityDescription:
      "Turniket, kartlı keçid, biometrik cihazlar və domofon sistemləri.",
    securityButton: "Ətraflı bax",
  },

  en: {
    zoneStatus: "All zones active",
    title: "Reliable fire safety solutions for your property",
    description:
      "Get fire alarm system design, equipment supply, professional installation and technical maintenance from one provider.",
    quoteButton: "Request a project quote",
    productsButton: "View fire equipment",

    benefitOne: "Site-specific system design",
    benefitTwo: "Professional installation",
    benefitThree: "Technical maintenance and support",

    cctvEyebrow: "Video surveillance",
    cctvTitle: "Camera systems",
    cctvDescription:
      "Professional cameras, recording and remote monitoring solutions.",
    cctvButton: "View products",

    securityEyebrow: "Complete security",
    securityTitle: "Access control",
    securityDescription:
      "Turnstiles, card access, biometric devices and intercom systems.",
    securityButton: "Learn more",
  },

  ru: {
    zoneStatus: "Все зоны активны",
    title: "Надёжные решения пожарной безопасности для вашего объекта",
    description:
      "Проектирование пожарной сигнализации, поставка оборудования, профессиональный монтаж и техническое обслуживание в одном месте.",
    quoteButton: "Получить предложение",
    productsButton: "Смотреть пожарное оборудование",

    benefitOne: "Проектирование под объект",
    benefitTwo: "Профессиональный монтаж",
    benefitThree: "Техническое обслуживание",

    cctvEyebrow: "Видеонаблюдение",
    cctvTitle: "Системы видеонаблюдения",
    cctvDescription:
      "Профессиональные камеры, видеорегистраторы и удалённый мониторинг.",
    cctvButton: "Смотреть товары",

    securityEyebrow: "Комплексная безопасность",
    securityTitle: "Контроль доступа",
    securityDescription:
      "Турникеты, карточный доступ, биометрия и домофонные системы.",
    securityButton: "Подробнее",
  },
} as const;

export function HomeHero({ locale = "az" }: HomeHeroProps) {
  const t = translations[locale];
  const zoneCount = 6;

  return (
    <section className="border-b border-black/5 bg-[#f5f6f8]">
      <Container className="py-5 md:py-7">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,2.1fr)_minmax(310px,0.9fr)]">
          <div className="relative min-h-[500px] overflow-hidden rounded-3xl border border-black/5 bg-[#14171a] shadow-sm md:min-h-[560px]">
            <Image
              src="/banners/side-fire.webp"
              alt={t.title}
              fill
              priority
              sizes="(min-width: 1024px) 72vw, 100vw"
              className="object-cover object-right opacity-90"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#14171a] via-[#14171a]/88 to-[#14171a]/15" />

            <div className="relative z-10 flex min-h-[500px] max-w-[760px] flex-col justify-center p-6 sm:p-8 md:min-h-[560px] md:p-12 lg:p-14">
              <div className="inline-flex w-fit items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2.5">
                <span className="flex items-center gap-[3px]" aria-hidden="true">
                  {Array.from({ length: zoneCount }).map((_, index) => (
                    <span
                      key={index}
                      className="khatt-zone-dot block size-[5px] rounded-full bg-emerald-500"
                      style={{ animationDelay: `${index * 0.18}s` }}
                    />
                  ))}
                </span>

                <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/60">
                  {t.zoneStatus}
                </span>
              </div>

              <h1 className="mt-6 max-w-3xl text-3xl font-semibold leading-[1.08] tracking-[-0.01em] text-white sm:text-4xl md:text-5xl lg:text-[56px]">
                {t.title}
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/60 md:text-base md:leading-8">
                {t.description}
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={localizedPath("/contact", locale)}
                  className="inline-flex items-center justify-center rounded-xl bg-red-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-red-500"
                >
                  {t.quoteButton}

                  <ArrowRight
                    className="ml-2 size-4"
                    aria-hidden="true"
                  />
                </Link>

                <Link
                  href={`${localizedPath(
                    "/products",
                    locale,
                  )}?category=yangin-sistemleri`}
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-transparent px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
                >
                  {t.productsButton}
                </Link>
              </div>

              <div className="mt-8 grid gap-3 border-t border-white/10 pt-6 text-sm text-white/70 sm:grid-cols-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                  <span>{t.benefitOne}</span>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                  <span>{t.benefitTwo}</span>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                  <span>{t.benefitThree}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <Link
              href={`${localizedPath(
                "/products",
                locale,
              )}?category=video-nezaret`}
              className="group relative min-h-[270px] overflow-hidden rounded-3xl border border-black/5 bg-neutral-950 shadow-sm"
            >
              <Image
                src="/banners/main-cctv.webp"
                alt={t.cctvTitle}
                fill
                sizes="(min-width: 1024px) 28vw, 50vw"
                className="object-cover transition duration-700 group-hover:scale-[1.03]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/55 to-transparent" />

              <div className="relative z-10 flex min-h-[270px] flex-col justify-end p-6 text-white">
                <div className="mb-auto flex size-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                  <Camera className="size-5" aria-hidden="true" />
                </div>

                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-300">
                  {t.cctvEyebrow}
                </p>

                <h2 className="mt-2 text-2xl font-semibold">
                  {t.cctvTitle}
                </h2>

                <p className="mt-2 text-sm leading-6 text-white/70">
                  {t.cctvDescription}
                </p>

                <span className="mt-4 inline-flex items-center text-sm font-semibold text-white">
                  {t.cctvButton}

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
              )}?category=girise-nezaret`}
              className="group relative min-h-[270px] overflow-hidden rounded-3xl border border-[#14171a]/10 bg-[#14171a] shadow-sm"
            >
              <div className="absolute -right-14 -top-14 size-44 rounded-full bg-emerald-500/10 blur-3xl" />

              <div className="relative z-10 flex min-h-[270px] flex-col justify-between p-6">
                <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
                  <Building2 className="size-5" aria-hidden="true" />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-400">
                    {t.securityEyebrow}
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold text-white">
                    {t.securityTitle}
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-white/60">
                    {t.securityDescription}
                  </p>

                  <span className="mt-5 inline-flex items-center text-sm font-semibold text-white transition group-hover:text-emerald-400">
                    {t.securityButton}

                    <ArrowRight
                      className="ml-2 size-4 transition group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
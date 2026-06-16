import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { localizedPath, type Locale } from "@/lib/i18n";

type PromoBannersProps = {
  locale?: Locale;
};

const promoTranslations = {
  az: {
    cctvAlt: "Videomüşahidə sistemi",
    cctvEyebrow: "Tam CCTV həlli",
    cctvTitle: "Obyektiniz üçün videomüşahidə sistemi",
    cctvDescription:
      "Kamera, qeydiyyat cihazı, disk və şəbəkə avadanlıqlarını bir yerdən seçin.",
    cctvButton: "Məhsullara bax",
    fireAlt: "Yanğın təhlükəsizlik layihəsi",
    fireEyebrow: "Layihələndirmə və quraşdırma",
    fireTitle: "Yanğın sistemi üçün qiymət təklifi",
    fireDescription:
      "Obyektinizə uyğun avadanlıq siyahısı və texniki həll hazırlayaq.",
    fireButton: "Sorğu göndər",
  },
  en: {
    cctvAlt: "Video surveillance system",
    cctvEyebrow: "Complete CCTV solution",
    cctvTitle: "Video surveillance system for your property",
    cctvDescription:
      "Choose cameras, recorders, storage and network equipment in one place.",
    cctvButton: "View products",
    fireAlt: "Fire safety project",
    fireEyebrow: "Design and installation",
    fireTitle: "Get a quote for a fire system",
    fireDescription:
      "Let us prepare an equipment list and technical solution for your property.",
    fireButton: "Send inquiry",
  },
  ru: {
    cctvAlt: "Система видеонаблюдения",
    cctvEyebrow: "Полное CCTV-решение",
    cctvTitle: "Система видеонаблюдения для вашего объекта",
    cctvDescription:
      "Выбирайте камеры, регистраторы, накопители и сетевое оборудование в одном месте.",
    cctvButton: "Смотреть товары",
    fireAlt: "Проект пожарной безопасности",
    fireEyebrow: "Проектирование и монтаж",
    fireTitle: "Получите предложение на пожарную систему",
    fireDescription:
      "Подготовим перечень оборудования и техническое решение для вашего объекта.",
    fireButton: "Отправить заявку",
  },
} as const;

export function PromoBanners({ locale = "az" }: PromoBannersProps) {
  const t = promoTranslations[locale];

  return (
    <section className="bg-[#f5f6f8] py-8 md:py-12">
      <Container>
        <div className="grid gap-5 lg:grid-cols-2">
          <Link
            href={`${localizedPath(
              "/products",
              locale,
            )}?category=video-nezaret`}
            className="group relative min-h-[340px] overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm"
          >
            <Image
              src="/banners/promo-cctv.webp"
              alt={t.cctvAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition duration-700 group-hover:scale-[1.02]"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/15" />

            <div className="relative z-10 flex min-h-[340px] max-w-[78%] flex-col justify-center p-6 sm:max-w-[65%] md:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
                {t.cctvEyebrow}
              </p>

              <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-neutral-950 md:text-4xl">
                {t.cctvTitle}
              </h2>

              <p className="mt-4 max-w-md text-sm leading-6 text-neutral-600">
                {t.cctvDescription}
              </p>

              <span className="mt-6 inline-flex w-fit items-center rounded-lg bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition group-hover:bg-emerald-700">
                {t.cctvButton}

                <ArrowRight
                  className="ml-2 size-4 transition group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </div>
          </Link>

          <Link
            href={localizedPath("/contact", locale)}
            className="group relative min-h-[340px] overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm"
          >
            <Image
              src="/banners/promo-fire.webp"
              alt={t.fireAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition duration-700 group-hover:scale-[1.02]"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/15" />

            <div className="relative z-10 flex min-h-[340px] max-w-[78%] flex-col justify-center p-6 sm:max-w-[65%] md:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-600">
                {t.fireEyebrow}
              </p>

              <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-neutral-950 md:text-4xl">
                {t.fireTitle}
              </h2>

              <p className="mt-4 max-w-md text-sm leading-6 text-neutral-600">
                {t.fireDescription}
              </p>

              <span className="mt-6 inline-flex w-fit items-center rounded-lg bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition group-hover:bg-red-700">
                {t.fireButton}

                <ArrowRight
                  className="ml-2 size-4 transition group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </div>
          </Link>
        </div>
      </Container>
    </section>
  );
}

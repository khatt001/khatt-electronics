import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  PhoneCall,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { localizedPath, type Locale } from "@/lib/i18n";

type QuoteSectionProps = {
  locale?: Locale;
};

const translations = {
  az: {
    eyebrow: "Layihə və qiymət təklifi",
    title: "Obyektiniz üçün uyğun sistemi birlikdə müəyyən edək",
    description:
      "Obyektiniz barədə qısa məlumat göndərin. Mütəxəssislərimiz ehtiyacınıza uyğun avadanlıq və xidmət təklifi hazırlasın.",
    button: "Qiymət təklifi al",
    secondaryButton: "Bizimlə əlaqə saxlayın",

    benefits: [
      "Obyektə uyğun avadanlıq seçimi",
      "İlkin texniki məsləhət",
      "Aydın və detallı qiymət təklifi",
    ],

    cardTitle: "Müraciət zamanı",
    cardDescription:
      "Obyektin növünü, təxmini sahəsini və tələb olunan sistemi qeyd etməyiniz kifayətdir.",
  },

  en: {
    eyebrow: "Project and quotation",
    title: "Let us determine the right system for your property",
    description:
      "Send us brief information about your site and our specialists will prepare a suitable equipment and service proposal.",
    button: "Request a quotation",
    secondaryButton: "Contact us",

    benefits: [
      "Equipment selected for your site",
      "Initial technical consultation",
      "Clear and detailed quotation",
    ],

    cardTitle: "When submitting a request",
    cardDescription:
      "Simply specify the type, approximate area and required system for your property.",
  },

  ru: {
    eyebrow: "Проект и ценовое предложение",
    title: "Подберём подходящую систему для вашего объекта",
    description:
      "Отправьте краткую информацию об объекте, и наши специалисты подготовят предложение по оборудованию и услугам.",
    button: "Получить предложение",
    secondaryButton: "Связаться с нами",

    benefits: [
      "Подбор оборудования под объект",
      "Первичная техническая консультация",
      "Понятное и подробное предложение",
    ],

    cardTitle: "При обращении",
    cardDescription:
      "Достаточно указать тип объекта, примерную площадь и необходимую систему.",
  },
} as const;

export function QuoteSection({ locale = "az" }: QuoteSectionProps) {
  const t = translations[locale];

  return (
    <section className="bg-[#f5f6f8] py-10 md:py-16">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-[#14171a] px-6 py-9 text-white shadow-sm md:px-10 md:py-12 lg:px-14">
          <div className="absolute -right-24 -top-24 size-72 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute -bottom-28 left-1/3 size-72 rounded-full bg-red-600/10 blur-3xl" />

          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1.5fr_0.8fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
                {t.eyebrow}
              </p>

              <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-4xl">
                {t.title}
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65 md:text-base">
                {t.description}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {t.benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-start gap-2 text-sm text-white/80"
                  >
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />

                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={localizedPath("/contact", locale)}
                  className="inline-flex items-center justify-center rounded-xl bg-red-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-red-500"
                >
                  {t.button}

                  <ArrowRight
                    className="ml-2 size-4"
                    aria-hidden="true"
                  />
                </Link>

                <Link
                  href={localizedPath("/contact", locale)}
                  className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  <PhoneCall
                    className="mr-2 size-4"
                    aria-hidden="true"
                  />

                  {t.secondaryButton}
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 md:p-7">
              <div className="flex size-12 items-center justify-center rounded-xl bg-red-600 text-white">
                <FileText className="size-5" aria-hidden="true" />
              </div>

              <h3 className="mt-5 text-xl font-semibold">
                {t.cardTitle}
              </h3>

              <p className="mt-3 text-sm leading-7 text-white/60">
                {t.cardDescription}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ShieldCheck,
  Target,
  Users,
  Wrench,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Haqqımızda",
  description:
    "KHATT Electronics təhlükəsizlik sistemləri, videomüşahidə, keçidə nəzarət, domofon, siqnalizasiya və ağıllı texnologiya həlləri üzrə peşəkar xidmət göstərir.",
  alternates: {
    canonical: "/about",
  },
};

const values = [
  {
    title: "Düzgün məhsul seçimi",
    description:
      "Sadəcə məhsul satmırıq, obyektə və ehtiyaca uyğun texniki həll seçməyə kömək edirik.",
    icon: Target,
  },
  {
    title: "Peşəkar yanaşma",
    description:
      "Layihə, qiymət təklifi, avadanlıq siyahısı və quraşdırma mərhələlərində səliqəli yanaşma tətbiq edirik.",
    icon: BadgeCheck,
  },
  {
    title: "Texniki dəstək",
    description:
      "Məhsul seçimi, sazlama, sistem yoxlanışı və modernləşdirmə üzrə dəstək göstəririk.",
    icon: Wrench,
  },
];

const stats = [
  { label: "Xidmət istiqaməti", value: "6+" },
  { label: "Məhsul kateqoriyası", value: "10+" },
  { label: "Texniki yanaşma", value: "360°" },
];

const capabilities = [
  "Videomüşahidə və CCTV sistemləri",
  "Keçidə nəzarət və giriş sistemləri",
  "Domofon və siqnalizasiya həlləri",
  "PoE switch, router və şəbəkə avadanlıqları",
  "Kabel infrastrukturu və montaj",
  "Texniki məsləhət və qiymət təklifi hazırlığı",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f6f6f4] pt-16 lg:pt-[8.25rem] xl:pt-[7.5rem]">
      <section className="border-b border-black/10 bg-white">
        <Container className="py-12 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-neutral-400">
                Haqqımızda
              </p>
              <h1 className="mt-3 text-4xl font-semibold leading-tight text-neutral-950 md:text-6xl">
                Təhlükəsizlik və elektronika həllərində etibarlı texniki tərəfdaş
              </h1>
              <p className="mt-5 max-w-3xl leading-8 text-neutral-600">
                {siteConfig.name} olaraq məqsədimiz obyektlər üçün stabil,
                ölçülə bilən və uzunmüddətli işləyən təhlükəsizlik və elektronika
                həlləri təqdim etməkdir.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
                >
                  Bizimlə əlaqə
                  <ArrowRight className="ml-2 size-4" aria-hidden="true" />
                </Link>

                <Link
                  href="/services"
                  className="inline-flex items-center rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:border-neutral-950"
                >
                  Xidmətlərə bax
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-neutral-200 bg-neutral-950 p-6 text-white shadow-sm">
              <Building2 className="size-8" aria-hidden="true" />
              <h2 className="mt-5 text-2xl font-semibold">
                Biz nə edirik?
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/65">
                Kamera sistemləri, keçidə nəzarət, siqnalizasiya, domofon,
                şəbəkə infrastrukturu və texniki dəstək istiqamətində məhsul və
                layihə əsaslı həllər təqdim edirik.
              </p>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <p className="text-2xl font-semibold">{stat.value}</p>
                    <p className="mt-1 text-xs leading-5 text-white/50">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-10 lg:py-14">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <article
                  key={value.title}
                  className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-neutral-950 text-white">
                    <Icon className="size-6" aria-hidden="true" />
                  </div>

                  <h2 className="mt-5 text-xl font-semibold text-neutral-950">
                    {value.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-neutral-600">
                    {value.description}
                  </p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="pb-16 lg:pb-24">
        <Container>
          <div className="grid gap-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm lg:grid-cols-[0.8fr_1fr] lg:p-10">
            <div>
              <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                <ShieldCheck className="size-6" aria-hidden="true" />
              </div>
              <h2 className="mt-5 text-3xl font-semibold text-neutral-950">
                Əsas fəaliyyət istiqamətlərimiz
              </h2>
              <p className="mt-4 leading-8 text-neutral-600">
                Layihəyə başlamazdan əvvəl ehtiyacları analiz edir, uyğun
                avadanlıq seçir və daha sonra obyektə uyğun həll təqdim edirik.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {capabilities.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-700"
                >
                  <CheckCircle2
                    className="mt-0.5 size-4 shrink-0 text-emerald-600"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-[2rem] border border-neutral-200 bg-neutral-950 p-6 text-white shadow-sm lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="flex items-center gap-3">
                  <Users className="size-6" aria-hidden="true" />
                  <p className="text-xs uppercase tracking-[0.28em] text-white/40">
                    Əməkdaşlıq
                  </p>
                </div>
                <h2 className="mt-4 text-3xl font-semibold">
                  Layihəniz üçün uyğun məhsul və texniki həll seçək
                </h2>
                <p className="mt-4 max-w-2xl leading-8 text-white/65">
                  Obyektiniz barədə məlumat göndərin, sizə uyğun avadanlıq
                  siyahısı və ilkin texniki yanaşma hazırlayaq.
                </p>
              </div>

              <Link
                href="/contact"
                className="inline-flex justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-100"
              >
                Qiymət təklifi al
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
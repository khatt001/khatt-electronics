import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Factory,
  Home,
  Hotel,
  Landmark,
  School,
  ShieldCheck,
  Store,
  Warehouse,
} from "lucide-react";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = {
  title: "Layihələr",
  description:
    "KHATT Electronics tərəfindən təqdim olunan videomüşahidə, təhlükəsizlik, keçidə nəzarət və şəbəkə infrastrukturu layihə istiqamətləri.",
  alternates: {
    canonical: "/projects",
  },
};

const solutions = [
  {
    title: "Ofislər və biznes mərkəzləri",
    description:
      "Ofis sahələri üçün kamera sistemi, keçidə nəzarət, işçi giriş-çıxış nəzarəti və stabil şəbəkə infrastrukturu.",
    icon: Building2,
    items: ["IP kamera sistemi", "Access control", "Wi-Fi və LAN", "Server/rack avadanlığı"],
  },
  {
    title: "Mağaza və satış nöqtələri",
    description:
      "Satış sahələrində müştəri axını, kassalar, giriş-çıxış və anbar zonalarının izlənməsi üçün həllər.",
    icon: Store,
    items: ["Kassa nəzarəti", "Giriş zonası kameraları", "Anbar izləmə", "Uzaqdan baxış"],
  },
  {
    title: "Anbar və logistika",
    description:
      "Böyük sahələr üçün geniş bucaqlı kameralar, PoE switch-lər, NVR yaddaş planlaması və şəbəkə xəritəsi.",
    icon: Warehouse,
    items: ["Perimetr nəzarəti", "Geniş sahə kameraları", "PoE infrastruktur", "Yaddaş hesablanması"],
  },
  {
    title: "Zavod və istehsalat",
    description:
      "İstehsal xətləri, təhlükəli zonalar, giriş-çıxış nöqtələri və iş təhlükəsizliyi üçün texniki həllər.",
    icon: Factory,
    items: ["İstehsal zonası nəzarəti", "Giriş-çıxış sistemi", "Alarm inteqrasiyası", "Texniki monitorinq"],
  },
  {
    title: "Yaşayış binaları və villalar",
    description:
      "Giriş blokları, həyət, qaraj, domofon, siqnalizasiya və smart təhlükəsizlik həlləri.",
    icon: Home,
    items: ["Domofon sistemi", "Həyət kameraları", "Siqnalizasiya", "Mobil izləmə"],
  },
  {
    title: "Hotel və obyektlər",
    description:
      "Qonaq zonaları, reception, koridorlar, giriş-çıxış və servis sahələri üçün təhlükəsizlik planlaması.",
    icon: Hotel,
    items: ["Reception nəzarəti", "Koridor kameraları", "Access zonalar", "Şəbəkə planlaması"],
  },
  {
    title: "Təhsil müəssisələri",
    description:
      "Məktəb, kurs və tədris mərkəzləri üçün giriş nəzarəti, kamera sistemi və təhlükəsiz şəbəkə həlləri.",
    icon: School,
    items: ["Giriş nəzarəti", "Sinif/koridor kameraları", "Wi-Fi coverage", "Uzaqdan monitorinq"],
  },
  {
    title: "Dövlət və inzibati obyektlər",
    description:
      "Daha ciddi təhlükəsizlik tələbləri olan obyektlər üçün strukturlaşdırılmış və etibarlı sistem yanaşması.",
    icon: Landmark,
    items: ["Çoxzonallı nəzarət", "Access control", "Perimetr təhlükəsizliyi", "Texniki sənədləşmə"],
  },
];

const steps = [
  "Obyekt tipi və risk zonaları analiz edilir",
  "Kamera, keçid və şəbəkə nöqtələri planlanır",
  "Uyğun avadanlıq siyahısı və smeta hazırlanır",
  "Quraşdırma və texniki təhvil mərhələsi icra olunur",
];

export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-[#f6f6f4] pt-16 lg:pt-[8.25rem] xl:pt-[7.5rem]">
      <section className="border-b border-black/10 bg-white">
        <Container className="py-12 lg:py-16">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.28em] text-neutral-400">
              Həllər
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight text-neutral-950 md:text-6xl">
              Hər obyekt üçün uyğun təhlükəsizlik və elektronika həlli
            </h1>
            <p className="mt-5 leading-8 text-neutral-600">
              Ofis, mağaza, anbar, yaşayış binası və istehsalat obyektləri üçün
              ehtiyaca uyğun kamera, keçidə nəzarət, siqnalizasiya və şəbəkə
              həlləri hazırlayırıq.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                Layihə üçün smeta al
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
        </Container>
      </section>

      <section className="py-10 lg:py-14">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {solutions.map((solution) => {
              const Icon = solution.icon;

              return (
                <article
                  key={solution.title}
                  className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-neutral-950 text-white">
                    <Icon className="size-6" aria-hidden="true" />
                  </div>

                  <h2 className="mt-5 text-xl font-semibold text-neutral-950">
                    {solution.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-neutral-600">
                    {solution.description}
                  </p>

                  <div className="mt-5 space-y-3">
                    {solution.items.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-2 text-sm text-neutral-700"
                      >
                        <CheckCircle2
                          className="mt-0.5 size-4 shrink-0 text-emerald-600"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="pb-16 lg:pb-24">
        <Container>
          <div className="grid gap-8 rounded-[2rem] border border-neutral-200 bg-neutral-950 p-6 text-white shadow-sm lg:grid-cols-[0.8fr_1fr] lg:p-10">
            <div>
              <div className="flex size-12 items-center justify-center rounded-2xl bg-white text-neutral-950">
                <ShieldCheck className="size-6" aria-hidden="true" />
              </div>
              <h2 className="mt-5 text-3xl font-semibold">
                Həlləri obyektə görə planlayırıq
              </h2>
              <p className="mt-4 leading-8 text-white/65">
                Eyni məhsul hər obyekt üçün doğru seçim olmaya bilər. Buna görə
                kamera sayı, baxış bucağı, yaddaş müddəti, kabel məsafəsi və
                şəbəkə yükü ayrıca hesablanmalıdır.
              </p>
            </div>

            <div className="space-y-3">
              {steps.map((step, index) => (
                <div
                  key={step}
                  className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-neutral-950">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-6 text-white/75">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
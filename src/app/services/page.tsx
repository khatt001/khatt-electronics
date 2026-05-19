import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Cable,
  Camera,
  CheckCircle2,
  DoorOpen,
  ShieldAlert,
  ShieldCheck,
  Wifi,
} from "lucide-react";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = {
  title: "Xidmətlər",
  description:
    "KHATT Electronics təhlükəsizlik sistemləri, videomüşahidə, keçidə nəzarət, domofon, siqnalizasiya və şəbəkə infrastrukturu üzrə peşəkar xidmətlər təqdim edir.",
  alternates: {
    canonical: "/services",
  },
};

const services = [
  {
    title: "Videomüşahidə sistemləri",
    description:
      "Obyektin ölçüsünə uyğun IP kamera, analoq kamera, NVR/DVR və yaddaş həllərinin seçimi və quraşdırılması.",
    icon: Camera,
    items: ["IP və analoq kamera sistemləri", "NVR/DVR seçimi", "Uzaqdan izləmə", "Obyektə uyğun kamera planlaması"],
  },
  {
    title: "Keçidə nəzarət",
    description:
      "Ofis, anbar, bina və kommersiya obyektləri üçün kartlı keçid, turniket və giriş nəzarət sistemləri.",
    icon: DoorOpen,
    items: ["Kartlı giriş sistemləri", "Turniket inteqrasiyası", "İşçi giriş-çıxış nəzarəti", "Access control avadanlığı"],
  },
  {
    title: "Siqnalizasiya sistemləri",
    description:
      "Məkanın təhlükəsizliyi üçün hərəkət sensorları, maqnit kontaktlar, sirenalar və alarm panelləri.",
    icon: ShieldAlert,
    items: ["Hərəkət sensorları", "Alarm panelləri", "Siren və xəbərdarlıq", "Obyekt təhlükəsizliyi"],
  },
  {
    title: "Şəbəkə infrastrukturu",
    description:
      "PoE switch, router, access point, rack kabinet və kabel infrastrukturu üzrə stabil şəbəkə qurulması.",
    icon: Wifi,
    items: ["PoE switch seçimi", "Wi-Fi coverage planlaması", "LAN kabel infrastrukturu", "Rack və patch panel"],
  },
  {
    title: "Kabel və quraşdırma",
    description:
      "Kabel çəkilişi, montaj, konnektorlaşdırma, test və təhvil mərhələlərini səliqəli şəkildə həyata keçiririk.",
    icon: Cable,
    items: ["UTP/FTP kabel çəkilişi", "Konnektorlaşdırma", "Kabel testləri", "Səliqəli montaj"],
  },
  {
    title: "Texniki dəstək",
    description:
      "Mövcud sistemlərin yoxlanması, sazlanması, diaqnostikası və ehtiyac olduqda modernləşdirilməsi.",
    icon: ShieldCheck,
    items: ["Sistem yoxlanışı", "Diaqnostika", "Parametrlərin sazlanması", "Modernləşdirmə təklifi"],
  },
];

const processSteps = [
  "Ehtiyac və obyekt məlumatları toplanır",
  "Avadanlıq siyahısı və ilkin smeta hazırlanır",
  "Uyğun məhsullar və texniki həll seçilir",
  "Quraşdırma və təhvil prosesi planlanır",
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#f6f6f4] pt-16 lg:pt-[8.25rem] xl:pt-[7.5rem]">
      <section className="border-b border-black/10 bg-white">
        <Container className="py-12 lg:py-16">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.28em] text-neutral-400">
              Xidmətlər
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight text-neutral-950 md:text-6xl">
              Təhlükəsizlik və elektronika layihələri üçün tam texniki dəstək
            </h1>
            <p className="mt-5 leading-8 text-neutral-600">
              Məhsul seçimi, sistem planlaması, quraşdırma və texniki dəstək
              mərhələlərində biznes və fərdi obyektlər üçün peşəkar həllər
              təqdim edirik.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                Smeta al
                <ArrowRight className="ml-2 size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:border-neutral-950"
              >
                Məhsullara bax
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-10 lg:py-14">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.title}
                  className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-neutral-950 text-white">
                    <Icon className="size-6" aria-hidden="true" />
                  </div>

                  <h2 className="mt-5 text-xl font-semibold text-neutral-950">
                    {service.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-neutral-600">
                    {service.description}
                  </p>

                  <div className="mt-5 space-y-3">
                    {service.items.map((item) => (
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
          <div className="grid gap-8 rounded-[2rem] border border-neutral-200 bg-neutral-950 p-6 text-white shadow-sm lg:grid-cols-[1fr_0.8fr] lg:p-10">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-white/40">
                İş prosesi
              </p>
              <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
                Layihəni səliqəli və ölçülə bilən mərhələlərlə aparırıq
              </h2>
              <p className="mt-4 max-w-2xl leading-8 text-white/65">
                Məqsəd sadəcə avadanlıq satmaq deyil, obyektə uyğun və stabil
                işləyən sistem qurmaqdır.
              </p>
            </div>

            <div className="space-y-3">
              {processSteps.map((step, index) => (
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
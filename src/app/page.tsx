import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/layout/container";
import { categories, services } from "@/data/home";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white pt-16 lg:pt-20">
      <section className="relative overflow-hidden border-b border-black/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(17,24,39,0.16),_transparent_36%),linear-gradient(180deg,_#ffffff_0%,_#f7f7f5_100%)]" />

        <Container className="relative grid min-h-[calc(100vh-4rem)] items-center gap-12 py-20 lg:grid-cols-[1.08fr_0.92fr] lg:py-28">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.32em] text-neutral-500">
              Təhlükəsizlik · Elektronika · Ağıllı Sistemlər
            </p>

            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tight text-neutral-950 md:text-7xl lg:text-8xl">
              Premium təhlükəsizlik və ağıllı texnologiya həlləri
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-neutral-600 md:text-lg">
              KHATT Electronics evlər, ofislər və korporativ layihələr üçün
              videomüşahidə, keçidə nəzarət, şəbəkə və ağıllı təhlükəsizlik
              sistemləri təqdim edir.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full bg-neutral-950 px-7 py-3.5 text-sm font-medium text-white transition hover:bg-neutral-800"
              >
                Məhsullara bax
                <ArrowRight className="ml-2 size-4" aria-hidden="true" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-7 py-3.5 text-sm font-medium text-neutral-950 transition hover:border-neutral-950"
              >
                Konsultasiya al
              </Link>
            </div>

            <div className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-neutral-200 pt-8">
              <div>
                <strong className="block text-2xl font-semibold">24/7</strong>
                <span className="text-sm text-neutral-500">
                  Monitorinqə hazır
                </span>
              </div>

              <div>
                <strong className="block text-2xl font-semibold">IP/AI</strong>
                <span className="text-sm text-neutral-500">
                  Müasir sistemlər
                </span>
              </div>

              <div>
                <strong className="block text-2xl font-semibold">B2B</strong>
                <span className="text-sm text-neutral-500">
                  Layihə dəstəyi
                </span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] rounded-[2rem] border border-black/10 bg-neutral-950 p-5 shadow-2xl">
              <div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),_transparent_34%),linear-gradient(145deg,_#181818,_#050505)] p-6 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.3em] text-white/50">
                    KHATT System
                  </span>

                  <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs text-emerald-200">
                    Aktiv
                  </span>
                </div>

                <div>
                  <div className="grid grid-cols-2 gap-3">
                    {["CCTV", "Keçid", "Siqnal", "Şəbəkə"].map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                      >
                        <div className="mb-8 h-1.5 w-12 rounded-full bg-white/20" />
                        <p className="font-medium">{item}</p>
                      </div>
                    ))}
                  </div>

                  <p className="mt-8 max-w-sm text-sm leading-6 text-white/60">
                    Etibarlı monitorinq, ağıllı keçid və genişlənə bilən
                    infrastruktur üçün inteqrasiya olunmuş təhlükəsizlik
                    arxitekturası.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-spacing">
        <Container>
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">
              Məhsul kateqoriyaları
            </p>

            <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
              Tam texnologiya ekosistemi
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <Link
                  key={category.href}
                  href={category.href}
                  className="group rounded-[1.5rem] border border-neutral-200 bg-white p-6 transition hover:-translate-y-1 hover:border-neutral-950 hover:shadow-xl"
                >
                  <Icon
                    className="mb-10 size-7 text-neutral-950"
                    aria-hidden="true"
                  />

                  <h3 className="text-2xl font-semibold">{category.title}</h3>

                  <p className="mt-3 leading-7 text-neutral-600">
                    {category.description}
                  </p>

                  <span className="mt-8 inline-flex items-center text-sm font-medium">
                    Kateqoriyaya bax
                    <ArrowRight className="ml-2 size-4 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-neutral-950 py-20 text-white lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-white/40">
              Xidmətlər
            </p>

            <h2 className="text-4xl font-semibold md:text-5xl">
              Planlamadan quraşdırılmaya qədər
            </h2>

            <p className="mt-6 leading-8 text-white/60">
              Konsultasiya, sistem layihələndirilməsi, cihaz seçimi,
              quraşdırılma, konfiqurasiya və texniki dəstəyi əhatə edən tam
              layihə prosesi təqdim edirik.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {services.map((service) => (
              <div
                key={service}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5"
              >
                <CheckCircle2
                  className="size-5 text-emerald-300"
                  aria-hidden="true"
                />
                <span>{service}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
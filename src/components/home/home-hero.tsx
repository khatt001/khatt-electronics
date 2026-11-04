import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, HardHat, Phone, Wrench } from "lucide-react";

import { Container } from "@/components/layout/container";
import { licenses } from "@/data/licenses";
import { siteConfig } from "@/data/site";
import { homeCopy } from "@/data/translations/home";
import { localizedPath, type Locale } from "@/lib/i18n";

export function HomeHero({ locale }: { locale: Locale }) {
  const t = homeCopy[locale];
  const [fire, construction] = licenses;

  const trust = [
    { icon: BadgeCheck, title: t.trust1, text: fire.number },
    { icon: HardHat, title: t.trust2, text: construction.number },
    { icon: Wrench, title: t.trust3, text: t.trust3Text },
  ];

  return (
    <section className="bg-surface">
      <Container className="pt-10 pb-12 md:pt-16 md:pb-16 lg:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="min-w-0">
            <p className="inline-flex items-center gap-2 rounded-full bg-paper px-3 py-1.5 text-[13px] font-semibold text-ink">
              <span className="size-1.5 rounded-full bg-signal" aria-hidden="true" />
              {t.heroEyebrow}
            </p>

            <h1 className="mt-6 max-w-[20ch] text-[2.1rem] leading-[1.12] font-bold text-ink md:text-5xl lg:text-[3.35rem]">
              {t.heroTitle}
            </h1>

            <p className="mt-6 max-w-[58ch] text-base leading-7 text-muted md:text-lg md:leading-8">{t.heroText}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={localizedPath("/contact", locale)}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-signal px-7 text-sm font-semibold text-white transition hover:bg-signal-deep"
              >
                {t.heroPrimary}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <a
                href={siteConfig.phoneHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-line px-7 text-sm font-semibold text-ink transition hover:border-ink"
              >
                <Phone className="size-4" aria-hidden="true" />
                <span className="tabular">{siteConfig.phone}</span>
              </a>
            </div>
          </div>

          <div className="relative min-w-0">
            <div className="overflow-hidden rounded-xl bg-paper">
              <Image
                src="/banners/side-fire.webp"
                alt=""
                width={1254}
                height={1254}
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="aspect-[5/4] h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
          {trust.map((item) => (
            <li key={item.title} className="flex items-center gap-4 bg-surface p-5">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-paper text-ink">
                <item.icon className="size-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-ink">{item.title}</span>
                <span className="mt-0.5 block text-sm text-muted tabular">{item.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

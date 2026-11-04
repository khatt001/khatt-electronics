import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { homeCopy } from "@/data/translations/home";
import { localizedPath, type Locale } from "@/lib/i18n";
import { getCatalogCategories, type CatalogCategory } from "@/services/categories";

// Categories come from the admin panel; the picture is matched by slug keywords.
const imageRules: [RegExp, string][] = [
  [/yangin|yanğın|fire|sondur/i, "/categories/fire-systems.webp"],
  [/video|kamera|camera|cctv|nezaret-kamera/i, "/categories/video-surveillance.webp"],
  [/siqnal|alarm|muhafize/i, "/categories/alarm.webp"],
  [/giris|access|kecid|turnik/i, "/categories/access-control.webp"],
  [/domofon|intercom/i, "/categories/intercom.webp"],
  [/sebek|network|router|switch/i, "/categories/network.webp"],
  [/kabel|cable/i, "/categories/cables.webp"],
  [/ups|enerji|power|akkumul/i, "/categories/ups.webp"],
  [/smart|agilli|ağıllı/i, "/categories/smart-home.webp"],
];

function categoryImage(category: CatalogCategory) {
  const key = `${category.slug} ${category.name}`;
  return imageRules.find(([rule]) => rule.test(key))?.[1] ?? "/categories/accessories.webp";
}

export async function CatalogCategories({ locale }: { locale: Locale }) {
  const t = homeCopy[locale];
  let categories: CatalogCategory[] = [];

  try {
    categories = await getCatalogCategories(locale);
  } catch {
    categories = [];
  }

  const productsHref = localizedPath("/products", locale);

  return (
    <section className="bg-surface">
      <Container className="section-spacing">
        <SectionHeading
          eyebrow={t.catalogEyebrow}
          title={t.catalogTitle}
          text={t.catalogText}
          action={
            <Link href={productsHref} className="inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-signal">
              {t.catalogLink}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          }
        />

        {categories.length > 0 ? (
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.slice(0, 8).map((category) => (
              <li key={category.id} className="min-w-0">
                <Link
                  href={localizedPath(`/category/${category.slug}`, locale)}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface transition hover:border-ink/40 hover:shadow-[0_14px_34px_-18px_rgba(15,28,23,0.35)]"
                >
                  <div className="overflow-hidden bg-paper">
                    <Image
                      src={categoryImage(category)}
                      alt=""
                      width={1448}
                      height={1086}
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="aspect-[4/3] h-auto w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-1 items-center justify-between gap-3 p-5">
                    <h3 className="text-base font-semibold text-ink">{category.name}</h3>
                    <ArrowRight className="size-4 shrink-0 text-muted transition group-hover:translate-x-0.5 group-hover:text-signal" aria-hidden="true" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <Link
            href={productsHref}
            className="mt-10 flex items-center justify-between gap-4 rounded-xl border border-line bg-surface p-6 text-sm font-semibold text-ink hover:border-ink/40"
          >
            {t.catalogLink}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        )}
      </Container>
    </section>
  );
}

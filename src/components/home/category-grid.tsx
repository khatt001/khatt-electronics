import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { categoryCards } from "@/data/home";

export function CategoryGrid() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">
            Kateqoriyalar
          </p>
          <h2 className="text-3xl font-semibold md:text-5xl">
            Əsas məhsul istiqamətləri
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categoryCards.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.href}
                href={category.href}
                className="group rounded-3xl border border-neutral-200 bg-white p-6 transition hover:-translate-y-1 hover:border-neutral-950 hover:shadow-xl"
              >
                <Icon className="mb-10 size-7 text-neutral-950" aria-hidden="true" />

                <h3 className="text-2xl font-semibold">{category.title}</h3>

                <p className="mt-3 leading-7 text-neutral-600">
                  {category.description}
                </p>

                <span className="mt-8 inline-flex items-center text-sm font-medium">
                  Kateqoriyaya bax
                  <ArrowRight
                    className="ml-2 size-4 transition group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
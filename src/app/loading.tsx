import { Container } from "@/components/layout/container";

function SkeletonCard() {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="aspect-square animate-pulse rounded-2xl bg-neutral-100" />
      <div className="mt-5 h-4 w-24 animate-pulse rounded-full bg-neutral-100" />
      <div className="mt-4 h-5 w-4/5 animate-pulse rounded-full bg-neutral-100" />
      <div className="mt-2 h-5 w-3/5 animate-pulse rounded-full bg-neutral-100" />
      <div className="mt-6 flex items-center justify-between">
        <div className="h-4 w-24 animate-pulse rounded-full bg-neutral-100" />
        <div className="size-10 animate-pulse rounded-full bg-neutral-100" />
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <main className="min-h-screen bg-[#f6f6f4] pt-16 lg:pt-[8.25rem] xl:pt-[7.5rem]">
      <section className="border-b border-black/10 bg-white">
        <Container className="py-12 lg:py-16">
          <div className="h-4 w-32 animate-pulse rounded-full bg-neutral-100" />
          <div className="mt-5 h-12 max-w-2xl animate-pulse rounded-2xl bg-neutral-100 md:h-16" />
          <div className="mt-4 h-5 max-w-xl animate-pulse rounded-full bg-neutral-100" />
          <div className="mt-2 h-5 max-w-md animate-pulse rounded-full bg-neutral-100" />
        </Container>
      </section>

      <section className="py-10 lg:py-14">
        <Container>
          <div className="mb-6 rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
              <div className="h-12 animate-pulse rounded-2xl bg-neutral-100" />
              <div className="h-12 animate-pulse rounded-2xl bg-neutral-100" />
              <div className="h-12 animate-pulse rounded-2xl bg-neutral-100" />
              <div className="h-12 animate-pulse rounded-2xl bg-neutral-100" />
              <div className="h-12 animate-pulse rounded-2xl bg-neutral-100" />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
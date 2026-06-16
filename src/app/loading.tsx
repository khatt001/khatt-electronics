import { Container } from "@/components/layout/container";

function SkeletonLine({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`animate-pulse rounded-md bg-neutral-100 ${className}`}
    />
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="aspect-square animate-pulse rounded-xl bg-neutral-100" />

      <SkeletonLine className="mt-5 h-4 w-24" />
      <SkeletonLine className="mt-4 h-5 w-4/5" />
      <SkeletonLine className="mt-2 h-5 w-3/5" />

      <div className="mt-6 flex items-center justify-between">
        <SkeletonLine className="h-4 w-24" />
        <div className="size-10 animate-pulse rounded-lg bg-neutral-100" />
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f5f6f8]">
      <section className="border-b border-neutral-200 bg-white">
        <Container className="py-8 md:py-10 lg:py-12">
          <SkeletonLine className="h-4 w-32" />

          <SkeletonLine className="mt-5 h-10 max-w-2xl md:h-12" />

          <SkeletonLine className="mt-4 h-5 max-w-xl" />

          <SkeletonLine className="mt-2 h-5 max-w-md" />
        </Container>
      </section>

      <section className="py-8 md:py-10 lg:py-12">
        <Container>
          <div className="mb-6 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
              {Array.from({
                length: 5,
              }).map((_, index) => (
                <div
                  key={index}
                  className="h-12 animate-pulse rounded-lg bg-neutral-100"
                />
              ))}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({
              length: 8,
            }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Images, ShoppingBag } from "lucide-react";
import { useState } from "react";

type ProductGalleryImage = {
  id: string;
  url: string;
  alt: string | null;
  isPrimary: boolean;
};

type ProductGalleryProps = {
  images: ProductGalleryImage[];
  productName: string;
};

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const initialIndex = Math.max(
    0,
    images.findIndex((image) => image.isPrimary),
  );

  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const safeActiveIndex =
    images.length === 0 ? 0 : Math.min(activeIndex, images.length - 1);

  const activeImage = images[safeActiveIndex];

  function goPrevious() {
    if (images.length <= 1) return;

    setActiveIndex((current) => {
      const safeCurrent = Math.min(current, images.length - 1);

      return safeCurrent === 0 ? images.length - 1 : safeCurrent - 1;
    });
  }

  function goNext() {
    if (images.length <= 1) return;

    setActiveIndex((current) => {
      const safeCurrent = Math.min(current, images.length - 1);

      return safeCurrent === images.length - 1 ? 0 : safeCurrent + 1;
    });
  }

  return (
    <div className="min-w-0 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm md:p-5">
      <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-neutral-100 to-white">
        {activeImage?.url ? (
          <Image
            src={activeImage.url}
            alt={activeImage.alt ?? productName}
            fill
            priority
            sizes="(min-width: 1280px) 46vw, (min-width: 1024px) 50vw, 100vw"
            className="object-contain p-5 transition duration-300 md:p-8"
          />
        ) : (
          <div className="flex size-32 items-center justify-center rounded-2xl border border-neutral-200 bg-white text-neutral-400 shadow-sm md:size-40">
            <ShoppingBag className="size-12 md:size-16" aria-hidden="true" />
          </div>
        )}

        {images.length > 1 ? (
          <>
            <button
              type="button"
              onClick={goPrevious}
              className="absolute left-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-lg border border-neutral-200 bg-white/95 text-neutral-800 shadow-sm backdrop-blur transition hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 md:left-4"
              aria-label="Əvvəlki şəkil"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={goNext}
              className="absolute right-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-lg border border-neutral-200 bg-white/95 text-neutral-800 shadow-sm backdrop-blur transition hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 md:right-4"
              aria-label="Növbəti şəkil"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>

            <div className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white/95 px-3 py-2 text-xs font-medium text-neutral-700 shadow-sm backdrop-blur">
              <Images className="size-4" aria-hidden="true" />
              {safeActiveIndex + 1}/{images.length}
            </div>
          </>
        ) : null}
      </div>

      {images.length > 1 ? (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
          {images.map((image, index) => {
            const isActive = index === safeActiveIndex;

            return (
              <button
                key={image.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`relative size-20 shrink-0 overflow-hidden rounded-xl border bg-neutral-50 transition md:size-24 ${
                  isActive
                    ? "border-emerald-600 ring-2 ring-emerald-600/10"
                    : "border-neutral-200 hover:border-neutral-400"
                }`}
                aria-label={`${productName} şəkil ${index + 1}`}
                aria-current={isActive ? "true" : undefined}
              >
                <Image
                  src={image.url}
                  alt={image.alt ?? productName}
                  fill
                  sizes="96px"
                  className="object-contain p-2.5"
                />

                {image.isPrimary ? (
                  <span className="absolute left-1.5 top-1.5 rounded-md bg-neutral-950 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white">
                    Əsas
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

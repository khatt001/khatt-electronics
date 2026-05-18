"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
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
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];

  function goPrevious() {
    setActiveIndex((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  }

  function goNext() {
    setActiveIndex((current) =>
      current === images.length - 1 ? 0 : current + 1
    );
  }

  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-neutral-100 to-white">
        {activeImage?.url ? (
          <Image
            src={activeImage.url}
            alt={activeImage.alt ?? productName}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-contain p-8"
          />
        ) : (
          <div className="flex size-40 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm">
            <ShoppingBag
              className="size-16 text-neutral-800"
              aria-hidden="true"
            />
          </div>
        )}

        {images.length > 1 ? (
          <>
            <button
              type="button"
              onClick={goPrevious}
              className="absolute left-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white/90 shadow-sm transition hover:border-neutral-950"
              aria-label="Əvvəlki şəkil"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={goNext}
              className="absolute right-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white/90 shadow-sm transition hover:border-neutral-950"
              aria-label="Növbəti şəkil"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </>
        ) : null}
      </div>

      {images.length > 1 ? (
        <div className="mt-4 grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative aspect-square overflow-hidden rounded-2xl border bg-neutral-50 transition ${
                index === activeIndex
                  ? "border-neutral-950"
                  : "border-neutral-200 hover:border-neutral-500"
              }`}
              aria-label={`${productName} şəkil ${index + 1}`}
            >
              <Image
                src={image.url}
                alt={image.alt ?? productName}
                fill
                sizes="120px"
                className="object-contain p-3"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Expand, X } from "lucide-react";

type LicenseViewerProps = {
  image: string;
  thumb: string;
  alt: string;
  openLabel: string;
  closeLabel: string;
  sizes: string;
  priority?: boolean;
  showLabel?: boolean;
};

export function LicenseViewer({ image, thumb, alt, openLabel, closeLabel, sizes, priority, showLabel = true }: LicenseViewerProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`${openLabel}: ${alt}`}
        className="group relative block w-full cursor-zoom-in bg-surface p-2 shadow-[0_1px_2px_rgba(15,28,23,0.08),0_12px_32px_-12px_rgba(15,28,23,0.25)] ring-1 ring-line transition hover:shadow-[0_1px_2px_rgba(15,28,23,0.08),0_20px_44px_-14px_rgba(15,28,23,0.35)]"
      >
        <Image src={thumb} alt={alt} width={600} height={840} sizes={sizes} priority={priority} className="h-auto w-full" />
        {showLabel ? (
        <span className="absolute right-4 bottom-4 inline-flex items-center gap-1.5 rounded bg-ink/85 px-2.5 py-1.5 text-[11px] font-semibold text-white opacity-90 transition group-hover:opacity-100">
          <Expand className="size-3.5" aria-hidden="true" />
          {openLabel}
        </span>
        ) : null}
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/92 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={closeLabel}
            className="absolute top-4 right-4 inline-flex size-11 items-center justify-center rounded-md border border-white/20 text-white"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
          <div className="max-h-full overflow-auto" onClick={(event) => event.stopPropagation()}>
            <Image
              src={image}
              alt={alt}
              width={1200}
              height={1680}
              sizes="(min-width: 768px) 60vw, 100vw"
              className="h-auto max-h-[88vh] w-auto bg-white"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

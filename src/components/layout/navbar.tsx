"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { Container } from "@/components/layout/container";
import { navLinks } from "@/data/navigation";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-black/10 bg-white/80 backdrop-blur-xl">
      <Container>
        <div className="flex h-16 items-center justify-between lg:h-20">
          <Link
            href="/"
            aria-label="KHATT Electronics ana səhifə"
            className="font-serif text-xl font-semibold tracking-[0.24em] text-neutral-950 lg:text-2xl"
          >
            KHATT
          </Link>

          <nav
            aria-label="Əsas naviqasiya"
            className="hidden items-center gap-8 lg:flex"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-950"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Məhsul axtarışı"
              className="inline-flex size-10 items-center justify-center rounded-full text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-950"
            >
              <Search size={18} aria-hidden="true" />
            </button>

            <Link
              href="/contact"
              className="hidden rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800 lg:inline-flex"
            >
              Smeta al
            </Link>

            <button
              type="button"
              aria-label="Mobil menyunu aç"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
              className="inline-flex size-10 items-center justify-center rounded-full text-neutral-800 transition hover:bg-neutral-100 lg:hidden"
            >
              <Menu size={22} aria-hidden="true" />
            </button>
          </div>
        </div>
      </Container>

      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-50 bg-white transition-transform duration-300 lg:hidden",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-black/10 px-5">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            aria-label="KHATT Electronics ana səhifə"
            className="font-serif text-xl font-semibold tracking-[0.24em]"
          >
            KHATT
          </Link>

          <button
            type="button"
            aria-label="Mobil menyunu bağla"
            onClick={() => setOpen(false)}
            className="inline-flex size-10 items-center justify-center rounded-full hover:bg-neutral-100"
          >
            <X size={22} aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Mobil menyu" className="flex flex-col px-6 py-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-neutral-100 py-5 text-xl font-medium text-neutral-900"
            >
              {link.name}
            </Link>
          ))}

          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-8 inline-flex justify-center rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white"
          >
            Smeta al
          </Link>
        </nav>
      </div>
    </header>
  );
}
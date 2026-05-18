"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type NavbarSearchProduct = {
  id: string;
  name: string;
  href: string;
  category: string;
  brand: string | null;
  imageUrl: string | null;
  price: string;
};

type NavbarSearchProps = {
  placeholder?: string;
  onNavigate?: () => void;
};

export function NavbarSearch({
  placeholder = "Məhsul, model və ya kateqoriya axtar...",
  onNavigate,
}: NavbarSearchProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<NavbarSearchProduct[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const cleanQuery = query.trim();

    if (cleanQuery.length < 2) {
      setProducts([]);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    const timeout = window.setTimeout(async () => {
      try {
        setIsLoading(true);

        const response = await fetch(
          `/api/search/products?q=${encodeURIComponent(cleanQuery)}`,
          {
            signal: controller.signal,
          }
        );

        const result = (await response.json()) as {
          products: NavbarSearchProduct[];
        };

        setProducts(result.products ?? []);
        setIsOpen(true);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    }, 250);

    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [query]);

  function closeSearch() {
    setIsOpen(false);
    setQuery("");
    setProducts([]);
  }

  return (
    <div ref={wrapperRef} className="relative">
      <label className="relative block">
        <span className="sr-only">Məhsul axtarışı</span>
        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
        <input
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            if (query.trim().length >= 2) {
              setIsOpen(true);
            }
          }}
          placeholder={placeholder}
          className="h-11 w-full rounded-full border border-neutral-200 bg-neutral-50 pl-11 pr-11 text-sm outline-none transition focus:border-neutral-950 focus:bg-white"
        />

        {query ? (
          <button
            type="button"
            onClick={closeSearch}
            aria-label="Axtarışı təmizlə"
            className="absolute right-3 top-1/2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-950"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        ) : null}
      </label>

      {isOpen && query.trim().length >= 2 ? (
        <div className="absolute left-0 right-0 top-[calc(100%+0.75rem)] z-50 overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-2xl shadow-black/10">
          <div className="border-b border-neutral-100 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.18em] text-neutral-400">
              Axtarış nəticələri
            </p>
          </div>

          {isLoading ? (
            <div className="p-4 text-sm text-neutral-500">Axtarılır...</div>
          ) : products.length > 0 ? (
            <div className="max-h-[420px] overflow-y-auto p-2">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={product.href}
                  onClick={() => {
                    closeSearch();
                    onNavigate?.();
                  }}
                  className="flex gap-3 rounded-2xl p-3 transition hover:bg-neutral-50"
                >
                  <div className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-neutral-100">
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        sizes="64px"
                        className="object-contain p-2"
                      />
                    ) : (
                      <ShoppingBag
                        className="size-6 text-neutral-500"
                        aria-hidden="true"
                      />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap gap-1">
                      <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] text-neutral-500">
                        {product.category}
                      </span>

                      {product.brand ? (
                        <span className="rounded-full bg-neutral-950 px-2 py-0.5 text-[11px] text-white">
                          {product.brand}
                        </span>
                      ) : null}
                    </div>

                    <p className="mt-1 line-clamp-2 text-sm font-semibold leading-5 text-neutral-950">
                      {product.name}
                    </p>
                    <p className="mt-1 text-xs font-medium text-neutral-500">
                      {product.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-5 text-sm text-neutral-500">
              Bu axtarışa uyğun məhsul tapılmadı.
            </div>
          )}

          <div className="border-t border-neutral-100 p-3">
            <Link
              href={`/products?search=${encodeURIComponent(query.trim())}`}
              onClick={() => {
                closeSearch();
                onNavigate?.();
              }}
              className="flex justify-center rounded-full bg-neutral-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800"
            >
              Bütün nəticələrə bax
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
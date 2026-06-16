import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

import { cn } from "@/lib/utils";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
  ariaLabel?: string;
};

export function Breadcrumbs({
  items,
  className,
  ariaLabel = "Naviqasiya yolu",
}: BreadcrumbsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav aria-label={ariaLabel} className={cn("overflow-x-auto", className)}>
      <ol className="flex min-w-max items-center gap-2 whitespace-nowrap text-sm">
        {items.map((item, index) => {
          const isFirst = index === 0;
          const isLast = index === items.length - 1;

          return (
            <li
              key={`${item.label}-${index}`}
              className="flex min-w-0 items-center gap-2"
            >
              {index > 0 ? (
                <ChevronRight
                  className="size-4 shrink-0 text-neutral-300"
                  aria-hidden="true"
                />
              ) : null}

              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="inline-flex min-w-0 items-center gap-1.5 rounded-md px-1 py-1 text-neutral-500 transition hover:bg-emerald-50 hover:text-emerald-700"
                >
                  {isFirst ? (
                    <Home className="size-4 shrink-0" aria-hidden="true" />
                  ) : null}

                  <span className="truncate">{item.label}</span>
                </Link>
              ) : (
                <span
                  className="inline-flex min-w-0 items-center gap-1.5 rounded-md px-1 py-1 font-medium text-neutral-950"
                  aria-current={isLast ? "page" : undefined}
                >
                  {isFirst ? (
                    <Home className="size-4 shrink-0" aria-hidden="true" />
                  ) : null}

                  <span className="truncate">{item.label}</span>
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

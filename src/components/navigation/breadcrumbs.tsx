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
};

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex overflow-x-auto", className)}
    >
      <ol className="flex min-w-0 items-center gap-2 whitespace-nowrap text-sm">
        {items.map((item, index) => {
          const isFirst = index === 0;
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 ? (
                <ChevronRight
                  className="size-4 shrink-0 text-neutral-300"
                  aria-hidden="true"
                />
              ) : null}

              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 rounded-full px-1 text-neutral-500 transition hover:text-neutral-950"
                >
                  {isFirst ? <Home className="size-4" aria-hidden="true" /> : null}
                  <span>{item.label}</span>
                </Link>
              ) : (
                <span
                  className="inline-flex min-w-0 items-center gap-1.5 rounded-full px-1 font-medium text-neutral-950"
                  aria-current={isLast ? "page" : undefined}
                >
                  {isFirst ? <Home className="size-4" aria-hidden="true" /> : null}
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
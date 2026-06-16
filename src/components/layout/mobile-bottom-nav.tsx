"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Heart,
  Home,
  MenuSquare,
  PackageSearch,
  ShoppingCart,
} from "lucide-react";

import { useCart } from "@/components/cart/cart-provider";
import { useFavorites } from "@/components/favorites/favorites-provider";
import { localizedPath, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type MobileBottomNavProps = {
  locale?: Locale;
};

export function MobileBottomNav({ locale = "az" }: MobileBottomNavProps) {
  const pathname = usePathname();
  const { items: cartItems } = useCart();
  const { count: favoritesCount } = useFavorites();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const visibleCartCount = cartCount > 99 ? "99+" : cartCount;

  const visibleFavoritesCount = favoritesCount > 99 ? "99+" : favoritesCount;

  const homeHref = localizedPath("/", locale);
  const productsHref = localizedPath("/products", locale);

  const items = [
    {
      label: locale === "az" ? "Ana" : locale === "en" ? "Home" : "Главная",
      href: homeHref,
      route: homeHref,
      icon: Home,
      count: null,
      accent: "emerald",
    },
    {
      label:
        locale === "az" ? "Kataloq" : locale === "en" ? "Catalog" : "Каталог",
      href: productsHref,
      route: productsHref,
      icon: MenuSquare,
      count: null,
      accent: "emerald",
    },
    {
      label: locale === "az" ? "Axtarış" : locale === "en" ? "Search" : "Поиск",
      href: `${productsHref}?focus=search`,
      route: "",
      icon: PackageSearch,
      count: null,
      accent: "emerald",
    },
    {
      label:
        locale === "az" ? "Sevimli" : locale === "en" ? "Favorites" : "Избр.",
      href: localizedPath("/favorites", locale),
      route: localizedPath("/favorites", locale),
      icon: Heart,
      count: visibleFavoritesCount,
      accent: "red",
    },
    {
      label: locale === "az" ? "Səbət" : locale === "en" ? "Cart" : "Корз.",
      href: localizedPath("/cart", locale),
      route: localizedPath("/cart", locale),
      icon: ShoppingCart,
      count: visibleCartCount,
      accent: "emerald",
    },
  ] as const;

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-neutral-200 bg-white/95 px-2 pb-[calc(env(safe-area-inset-bottom)+0.35rem)] pt-2 shadow-[0_-12px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl lg:hidden"
      aria-label={
        locale === "az"
          ? "Alt naviqasiya"
          : locale === "en"
            ? "Bottom navigation"
            : "Нижняя навигация"
      }
    >
      <div className="mx-auto grid max-w-md grid-cols-5 gap-1">
        {items.map((item) => {
          const Icon = item.icon;

          const active =
            item.route === homeHref
              ? pathname === homeHref
              : Boolean(item.route && pathname.startsWith(item.route));

          const activeClass =
            item.accent === "red"
              ? "bg-red-50 text-red-600"
              : "bg-emerald-50 text-emerald-700";

          const hoverClass =
            item.accent === "red"
              ? "hover:bg-red-50 hover:text-red-600"
              : "hover:bg-emerald-50 hover:text-emerald-700";

          return (
            <Link
              key={item.label}
              href={item.href}
              aria-label={item.label}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative flex min-h-[48px] touch-manipulation flex-col items-center justify-center rounded-lg px-1 py-2 text-[11px] font-medium transition",
                active ? activeClass : cn("text-neutral-500", hoverClass),
              )}
            >
              <span className="relative">
                <Icon className="size-5" aria-hidden="true" />

                {item.count ? (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -right-2.5 -top-2.5 flex min-h-4 min-w-4 items-center justify-center rounded-md px-1 text-[9px] font-bold leading-none text-white shadow-sm",
                      item.accent === "red" ? "bg-red-600" : "bg-emerald-600",
                    )}
                  >
                    {item.count}
                  </span>
                ) : null}
              </span>

              <span className="mt-1 max-w-full truncate">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

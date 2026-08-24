"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Boxes,
  Heart,
  Home,
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

const labels = {
  az: {
    home: "Ana",
    products: "Məhsullar",
    solutions: "Həllər",
    favorites: "Sevimli",
    cart: "Səbət",
    navigation: "Alt naviqasiya",
  },
  en: {
    home: "Home",
    products: "Products",
    solutions: "Solutions",
    favorites: "Favorites",
    cart: "Cart",
    navigation: "Bottom navigation",
  },
  ru: {
    home: "Главная",
    products: "Товары",
    solutions: "Решения",
    favorites: "Избр.",
    cart: "Корз.",
    navigation: "Нижняя навигация",
  },
} as const;

export function MobileBottomNav({
  locale = "az",
}: MobileBottomNavProps) {
  const pathname = usePathname();
  const { items: cartItems } = useCart();
  const { count: favoritesCount } = useFavorites();

  const t = labels[locale];

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const visibleCartCount = cartCount > 99 ? "99+" : cartCount;
  const visibleFavoritesCount =
    favoritesCount > 99 ? "99+" : favoritesCount;

  const homeHref = localizedPath("/", locale);
  const productsHref = localizedPath("/products", locale);
  const solutionsHref = localizedPath("/solutions", locale);
  const favoritesHref = localizedPath("/favorites", locale);
  const cartHref = localizedPath("/cart", locale);

  const items = [
    {
      label: t.home,
      href: homeHref,
      route: homeHref,
      icon: Home,
      count: null,
      accent: "emerald",
    },
    {
      label: t.products,
      href: productsHref,
      route: productsHref,
      icon: PackageSearch,
      count: null,
      accent: "emerald",
    },
    {
      label: t.solutions,
      href: solutionsHref,
      route: solutionsHref,
      icon: Boxes,
      count: null,
      accent: "emerald",
    },
    {
      label: t.favorites,
      href: favoritesHref,
      route: favoritesHref,
      icon: Heart,
      count: visibleFavoritesCount,
      accent: "red",
    },
    {
      label: t.cart,
      href: cartHref,
      route: cartHref,
      icon: ShoppingCart,
      count: visibleCartCount,
      accent: "emerald",
    },
  ] as const;

  return (
    <nav
      aria-label={t.navigation}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-neutral-200 bg-white/95 px-2 pb-[calc(env(safe-area-inset-bottom)+0.35rem)] pt-1.5 shadow-[0_-10px_30px_rgba(0,0,0,0.07)] backdrop-blur-xl lg:hidden"
    >
      <div className="mx-auto grid max-w-md grid-cols-5 gap-1">
        {items.map((item) => {
          const Icon = item.icon;

          const active =
            item.route === homeHref
              ? pathname === homeHref
              : pathname === item.route ||
                pathname.startsWith(`${item.route}/`);

          const activeClass =
            item.accent === "red"
              ? "text-red-600"
              : "text-emerald-700";

          const hoverClass =
            item.accent === "red"
              ? "hover:text-red-600"
              : "hover:text-emerald-700";

          return (
            <Link
              key={item.label}
              href={item.href}
              aria-label={item.label}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative flex min-h-[52px] touch-manipulation flex-col items-center justify-center rounded-xl px-1 py-1.5 text-[10px] font-medium transition",
                active
                  ? activeClass
                  : cn("text-neutral-500", hoverClass),
              )}
            >
              <span
                className={cn(
                  "relative flex h-7 min-w-10 items-center justify-center rounded-full px-2 transition",
                  active &&
                    (item.accent === "red"
                      ? "bg-red-50"
                      : "bg-emerald-50"),
                )}
              >
                <Icon aria-hidden="true" className="size-[19px]" />

                {item.count ? (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -right-0.5 -top-1 flex min-h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-bold leading-none text-white shadow-sm",
                      item.accent === "red"
                        ? "bg-red-600"
                        : "bg-emerald-600",
                    )}
                  >
                    {item.count}
                  </span>
                ) : null}
              </span>

              <span className="mt-0.5 max-w-full truncate">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
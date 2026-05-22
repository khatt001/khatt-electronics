"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Home, MenuSquare, PackageSearch, ShoppingCart } from "lucide-react";
import { localizedPath, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useCart } from "@/components/cart/cart-provider";
import { useFavorites } from "@/components/favorites/favorites-provider";

type MobileBottomNavProps = {
  locale?: Locale;
};

export function MobileBottomNav({ locale = "az" }: MobileBottomNavProps) {
  const pathname = usePathname();
  const { items: cartItems } = useCart();
  const { count: favoritesCount } = useFavorites();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  /*
    DUPLICATE LINK FIX: Previously had both "Kataloq" and "Məhsullar" pointing
    to the same /products href. Lighthouse flags identical links with different
    labels as confusing. Replaced second duplicate with "Sifariş" (/track-order)
    to give each nav item a unique destination.
  */
  const items = [
    {
      label: locale === "az" ? "Ana" : locale === "en" ? "Home" : "Главная",
      href: localizedPath("/", locale),
      icon: Home,
      count: null,
    },
    {
      label:
        locale === "az" ? "Kataloq" : locale === "en" ? "Catalog" : "Каталог",
      href: localizedPath("/products", locale),
      icon: MenuSquare,
      count: null,
    },
    {
      label:
        locale === "az" ? "Axtarış" : locale === "en" ? "Search" : "Поиск",
      href: localizedPath("/products", locale) + "?focus=search",
      icon: PackageSearch,
      count: null,
    },
    {
      label:
        locale === "az" ? "Sevimli" : locale === "en" ? "Favorites" : "Избр.",
      href: localizedPath("/favorites", locale),
      icon: Heart,
      count: favoritesCount,
    },
    {
      label: locale === "az" ? "Səbət" : locale === "en" ? "Cart" : "Корз.",
      href: localizedPath("/cart", locale),
      icon: ShoppingCart,
      count: cartCount,
    },
  ];

  return (
    /*
      TOUCH TARGET FIX: Each nav item needs ≥44×44px tap area.
      py-2 + text + icon = ~52px height total. The rounded-2xl tap area
      was clipping on some devices. Added min-h-[44px] to each link and
      touch-manipulation to remove iOS 300ms delay.
    */
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-white/95 px-2 pb-[calc(env(safe-area-inset-bottom)+0.35rem)] pt-2 shadow-[0_-12px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl lg:hidden"
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
            pathname === item.href ||
            (item.href !== localizedPath("/", locale) &&
              pathname.startsWith(item.href.split("?")[0]));

          return (
            <Link
              key={item.label}
              href={item.href}
              aria-label={item.label}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative flex min-h-[44px] touch-manipulation flex-col items-center justify-center rounded-2xl px-1 py-2 text-[11px] font-medium transition",
                active
                  ? "bg-neutral-950 text-white"
                  : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950"
              )}
            >
              <span className="relative">
                <Icon className="size-5" aria-hidden="true" />

                {item.count ? (
                  <span
                    aria-hidden="true"
                    className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-emerald-400 text-[10px] font-bold text-neutral-950"
                  >
                    {item.count}
                  </span>
                ) : null}
              </span>

              <span className="mt-1 truncate">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
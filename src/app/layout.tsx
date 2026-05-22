import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart/cart-provider";
import { FavoritesProvider } from "@/components/favorites/favorites-provider";
import { CompareProvider } from "@/components/compare/compare-provider";
import { JsonLd } from "@/components/seo/json-ld";
import { SiteShell } from "@/components/layout/site-shell";
import { createOrganizationSchema, createWebsiteSchema } from "@/lib/seo";

// next/font downloads fonts at build time and serves them locally.
// No runtime requests to fonts.googleapis.com or fonts.gstatic.com are made,
// so preconnect hints to those origins are useless (and Lighthouse flags them).
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://khatt.electronics";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "KHATT Electronics",
    template: "%s | KHATT Electronics",
  },
  description:
    "KHATT Electronics — təhlükəsizlik sistemləri, videomüşahidə, keçidə nəzarət, domofon, siqnalizasiya və ağıllı texnologiya həlləri.",
  applicationName: "KHATT Electronics",
  keywords: [
    "KHATT Electronics",
    "təhlükəsizlik sistemləri",
    "videomüşahidə",
    "kamera sistemləri",
    "CCTV",
    "IP kamera",
    "NVR",
    "DVR",
    "keçidə nəzarət",
    "domofon",
    "siqnalizasiya",
    "ağıllı texnologiya",
    "Bakı",
    "Azərbaycan",
  ],
  alternates: {
    canonical: "/",
    languages: {
      az: "/",
      en: "/en",
      ru: "/ru",
    },
  },
  openGraph: {
    title: "KHATT Electronics",
    description:
      "Təhlükəsizlik sistemləri, videomüşahidə, keçidə nəzarət, domofon, siqnalizasiya və ağıllı texnologiya həlləri.",
    url: siteUrl,
    siteName: "KHATT Electronics",
    locale: "az_AZ",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="az" data-scroll-behavior="smooth" suppressHydrationWarning>
      {/* No manual <head> needed — next/font handles everything automatically */}
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <JsonLd data={[createOrganizationSchema(), createWebsiteSchema()]} />
        <CartProvider>
          <FavoritesProvider>
            <CompareProvider>
              <SiteShell>{children}</SiteShell>
            </CompareProvider>
          </FavoritesProvider>
        </CartProvider>
      </body>
    </html>
  );
}
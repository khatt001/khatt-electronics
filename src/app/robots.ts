import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/products",
          "/category",
          "/services",
          "/solutions",
          "/projects",
          "/about",
          "/contact",
          "/track-order",
          "/favorites",
          "/compare",
        ],
        disallow: [
          "/admin",
          "/cart",
          "/checkout",
          "/checkout/success",
          "/api",
          "/en",
          "/ru",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}

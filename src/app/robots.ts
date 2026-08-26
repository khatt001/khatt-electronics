import type { MetadataRoute } from "next";

import { getBaseUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/",
          "/api",
          "/api/",
          "/cart",
          "/checkout",
          "/checkout/",
          "/en/cart",
          "/en/checkout",
          "/en/checkout/",
          "/ru/cart",
          "/ru/checkout",
          "/ru/checkout/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
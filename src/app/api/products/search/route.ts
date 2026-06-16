import { NextResponse } from "next/server";
import { searchCatalogProducts, type ProductLocale } from "@/services/products";

function getLocale(value: string | null): ProductLocale {
  if (value === "en" || value === "ru") return value;

  return "az";
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("q") ?? "";
  const locale = getLocale(searchParams.get("locale"));

  const products = await searchCatalogProducts(query, locale, 6);

  return NextResponse.json({
    products,
  });
}

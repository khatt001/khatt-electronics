import { NextResponse } from "next/server";
import { getCatalogCategories } from "@/services/categories";
import { isLocale } from "@/lib/i18n";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const localeParam = searchParams.get("locale");
  const locale = localeParam && isLocale(localeParam) ? localeParam : "az";

  const categories = await getCatalogCategories(locale);

  return NextResponse.json({ categories });
}
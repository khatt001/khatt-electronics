import { NextResponse } from "next/server";
import { getCatalogCategories } from "@/services/categories";

export async function GET() {
  const categories = await getCatalogCategories();

  return NextResponse.json({ categories });
}
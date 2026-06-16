import {
  CategoryPageView,
  getCategoryStaticParams,
  type CategorySearchParams,
} from "@/components/category/category-page-view";
import { generateCategoryPageMetadata } from "@/lib/page-metadata";

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<CategorySearchParams>;
};

export async function generateStaticParams() {
  return getCategoryStaticParams();
}

export async function generateMetadata({
  params,
  searchParams,
}: CategoryPageProps) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);

  return generateCategoryPageMetadata({
    slug,
    query,
    locale: "en",
  });
}

export default async function EnglishCategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);

  return <CategoryPageView slug={slug} query={query} locale="en" />;
}

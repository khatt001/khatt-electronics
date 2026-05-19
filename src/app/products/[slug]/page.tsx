import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Download,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { ProductGallery } from "@/components/product/product-gallery";
import { getProductBySlug } from "@/services/products";
import { siteConfig } from "@/data/site";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { FavoriteButton } from "@/components/favorites/favorites-button";
import { BuyNowButton } from "@/components/cart/buy-now-button";
import { CompareButton } from "@/components/compare/compare-button";
import { JsonLd } from "@/components/seo/json-ld";
import { createBreadcrumbSchema, getBaseUrl } from "@/lib/seo";

type ProductDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type ProductDetailData = Awaited<ReturnType<typeof getProductBySlug>>;

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Məhsul tapılmadı",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = product.seoTitle ?? product.name;
  const description =
    product.seoDescription ??
    product.shortDescription ??
    `${product.name} — KHATT Electronics məhsul səhifəsi.`;

  const imageUrl = product.images[0]?.url;

  return {
    title,
    description,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/products/${product.slug}`,
      type: "website",
      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt: product.name,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

function getPriceAmount(price: string) {
  if (price === "Qiymət sorğu ilə") return null;

  const normalizedPrice = Number(String(price).replace("AZN", "").trim());

  if (!Number.isFinite(normalizedPrice)) return null;

  return normalizedPrice;
}

function getProductJsonLd(product: ProductDetailData) {
  if (!product) return null;

  const baseUrl = getBaseUrl();
  const priceNumber = getPriceAmount(product.price);
  const productUrl = `${baseUrl}/products/${product.slug}`;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description:
      product.seoDescription ??
      product.shortDescription ??
      product.description ??
      product.name,
    image: product.images.map((image) => image.url),
    brand: product.brand
      ? {
          "@type": "Brand",
          name: product.brand,
        }
      : undefined,
    category: product.category,
    sku: product.slug,
    url: productUrl,
    offers:
      priceNumber !== null
        ? {
            "@type": "Offer",
            price: priceNumber,
            priceCurrency: "AZN",
            availability:
              product.stockStatus === "in_stock" && product.stockQuantity > 0
                ? "https://schema.org/InStock"
                : product.stockStatus === "pre_order"
                  ? "https://schema.org/PreOrder"
                  : "https://schema.org/OutOfStock",
            itemCondition: "https://schema.org/NewCondition",
            url: productUrl,
            seller: {
              "@type": "Organization",
              name: siteConfig.name,
            },
          }
        : undefined,
  };

  const breadcrumbSchema = createBreadcrumbSchema([
    {
      name: "Ana səhifə",
      url: baseUrl,
    },
    {
      name: "Məhsullar",
      url: `${baseUrl}/products`,
    },
    {
      name: product.name,
      url: productUrl,
    },
  ]);

  return [productSchema, breadcrumbSchema];
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const jsonLd = getProductJsonLd(product);
  const priceAmount = getPriceAmount(product.price);

  const canBuy =
    priceAmount !== null &&
    product.stockStatus === "in_stock" &&
    product.stockQuantity > 0;

  const cartItem = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: priceAmount ?? 0,
    priceLabel: product.price,
    imageUrl: product.images[0]?.url ?? null,
    category: product.category,
    brand: product.brand,
    maxQuantity: product.stockQuantity,
  };

  const favoriteItem = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price,
    priceAmount,
    imageUrl: product.images[0]?.url ?? null,
    category: product.category,
    brand: product.brand,
    stockStatus: product.stockStatus,
    stockQuantity: product.stockQuantity,
  };

  const compareItem = {
  id: product.id,
  name: product.name,
  slug: product.slug,
  price: product.price,
  priceAmount,
  imageUrl: product.images[0]?.url ?? null,
  category: product.category,
  brand: product.brand,
  stockStatus: product.stockStatus,
  stockQuantity: product.stockQuantity,
};

  return (
    <main className="min-h-screen bg-[#f6f6f4] pt-16 lg:pt-[8.25rem] xl:pt-[7.5rem]">
     {jsonLd ? <JsonLd data={jsonLd} /> : null}

      <section className="border-b border-black/10 bg-white">
        <Container className="py-6">
          <Link
            href="/products"
            className="inline-flex items-center text-sm font-medium text-neutral-600 transition hover:text-neutral-950"
          >
            <ArrowLeft className="mr-2 size-4" aria-hidden="true" />
            Məhsullara qayıt
          </Link>
        </Container>
      </section>

      <section className="py-10 lg:py-14">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
            <ProductGallery images={product.images} productName={product.name} />

            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm lg:p-8">
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
                  {product.category}
                </span>

                {product.brand ? (
                  <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
                    {product.brand}
                  </span>
                ) : null}

                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                  {product.badge}
                </span>

               <div className="ml-auto flex gap-2">
  <FavoriteButton item={favoriteItem} />
  <CompareButton item={compareItem} />
</div>
              </div>

              <h1 className="text-4xl font-semibold leading-tight text-neutral-950 md:text-5xl">
                {product.name}
              </h1>

              {product.shortDescription ? (
                <p className="mt-5 leading-8 text-neutral-600">
                  {product.shortDescription}
                </p>
              ) : null}

              <div className="mt-8 rounded-3xl border border-neutral-200 bg-neutral-50 p-5">
                <p className="text-sm text-neutral-500">Qiymət</p>
                <strong className="mt-2 block text-3xl text-neutral-950">
                  {product.price}
                </strong>

                {priceAmount === null ? (
                  <p className="mt-2 text-sm text-neutral-500">
                    Bu məhsul üçün sifarişdən əvvəl məsləhət almağınız tövsiyə
                    olunur.
                  </p>
                ) : null}
              </div>

              <div className="mt-4 rounded-3xl border border-neutral-200 bg-white p-5">
                <p className="text-sm text-neutral-500">Stok vəziyyəti</p>

                {product.stockStatus === "in_stock" &&
                product.stockQuantity > 0 ? (
                  <strong className="mt-2 block text-lg text-emerald-700">
                    Stokda {product.stockQuantity} ədəd var
                  </strong>
                ) : product.stockStatus === "pre_order" ? (
                  <strong className="mt-2 block text-lg text-amber-700">
                    Öncədən sifariş mümkündür
                  </strong>
                ) : (
                  <strong className="mt-2 block text-lg text-red-700">
                    Stokda yoxdur
                  </strong>
                )}
              </div>

              <div className="mt-8 grid gap-3">
                <AddToCartButton
                  item={cartItem}
                  maxQuantity={product.stockQuantity}
                  disabled={!canBuy}
                />

                <div className="grid gap-3 sm:grid-cols-2">
                  <BuyNowButton item={cartItem} disabled={!canBuy} />

                  <Link
                    href="/cart"
                    className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3.5 text-sm font-medium text-neutral-950 transition hover:border-neutral-950"
                  >
                    Səbətə bax
                  </Link>
                </div>

                <a
                  href={`${siteConfig.whatsappHref}?text=${encodeURIComponent(
                    `Salam. Bu məhsul haqqında məlumat almaq istəyirəm: ${product.name}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 px-6 py-3.5 text-sm font-medium text-emerald-700 transition hover:border-emerald-600"
                >
                  WhatsApp ilə məsləhət al
                </a>
              </div>

              <div className="mt-8 grid gap-3 border-t border-neutral-200 pt-6 sm:grid-cols-3">
                {["Zəmanət", "Quraşdırılma", "Texniki dəstək"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm">
                    <CheckCircle2
                      className="size-4 text-emerald-600"
                      aria-hidden="true"
                    />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-16 lg:pb-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm lg:p-8">
              <div className="mb-6 flex items-center gap-3">
                <FileText
                  className="size-5 text-neutral-700"
                  aria-hidden="true"
                />
                <h2 className="text-2xl font-semibold">Məhsul haqqında</h2>
              </div>

              <p className="leading-8 text-neutral-600">
                {product.description ??
                  "Bu məhsul üçün detallı məlumat tezliklə əlavə olunacaq."}
              </p>

              <div className="mt-10">
                <h3 className="mb-4 text-xl font-semibold">
                  Texniki göstəricilər
                </h3>

                {product.specifications.length > 0 ? (
                  <div className="overflow-hidden rounded-2xl border border-neutral-200">
                    {product.specifications.map((spec) => (
                      <div
                        key={spec.id}
                        className="grid grid-cols-1 border-b border-neutral-200 last:border-b-0 sm:grid-cols-[220px_1fr]"
                      >
                        <div className="bg-neutral-50 px-4 py-3 text-sm font-medium text-neutral-700">
                          {spec.key}
                        </div>
                        <div className="px-4 py-3 text-sm text-neutral-600">
                          {spec.value}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-neutral-300 p-6 text-sm text-neutral-600">
                    Texniki göstəricilər hələ əlavə edilməyib.
                  </div>
                )}
              </div>
            </div>

            <aside className="h-fit rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <ShieldCheck
                  className="size-5 text-neutral-700"
                  aria-hidden="true"
                />
                <h2 className="text-xl font-semibold">Sənədlər</h2>
              </div>

              {product.downloads.length > 0 ? (
                <div className="space-y-3">
                  {product.downloads.map((download) => (
                    <a
                      key={download.id}
                      href={download.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between rounded-2xl border border-neutral-200 p-4 text-sm font-medium transition hover:border-neutral-950"
                    >
                      <span>{download.title}</span>
                      <Download className="size-4" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              ) : (
                <p className="rounded-2xl border border-dashed border-neutral-300 p-5 text-sm leading-6 text-neutral-600">
                  Datasheet və sənədlər tezliklə əlavə olunacaq.
                </p>
              )}
            </aside>
          </div>
        </Container>
      </section>
    </main>
  );
}
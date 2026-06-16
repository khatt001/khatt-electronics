import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Download,
  FileText,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { BuyNowButton } from "@/components/cart/buy-now-button";
import { CompareButton } from "@/components/compare/compare-button";
import { FavoriteButton } from "@/components/favorites/favorites-button";
import { Container } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { ProductCard } from "@/components/product/product-card";
import { ProductGallery } from "@/components/product/product-gallery";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/data/site";
import { getCategoryName } from "@/data/translations/categories";
import {
  productDetailTranslations,
  type ProductDetailLocale,
} from "@/data/translations/product-detail";
import { localizedPath } from "@/lib/i18n";
import { createBreadcrumbSchema, getBaseUrl } from "@/lib/seo";
import { getProductBySlug, getRelatedProducts } from "@/services/products";

type ProductDetailData = Awaited<ReturnType<typeof getProductBySlug>>;

type ProductDetailPageViewProps = {
  slug: string;
  locale?: ProductDetailLocale;
};

export function getPriceAmount(price: string) {
  if (price === "Qiymət sorğu ilə") return null;
  if (price === "Price on request") return null;
  if (price === "Цена по запросу") return null;

  const normalizedPrice = Number(String(price).replace("AZN", "").trim());

  if (!Number.isFinite(normalizedPrice)) {
    return null;
  }

  return normalizedPrice;
}

function getLocalizedPrice(
  product: NonNullable<ProductDetailData>,
  locale: ProductDetailLocale,
) {
  const t = productDetailTranslations[locale];
  const priceAmount = getPriceAmount(product.price);

  if (priceAmount === null) {
    return t.priceOnRequest;
  }

  return product.price;
}

export function getProductDetailJsonLd(
  product: ProductDetailData,
  locale: ProductDetailLocale = "az",
) {
  if (!product) return null;

  const t = productDetailTranslations[locale];
  const baseUrl = getBaseUrl();
  const priceNumber = getPriceAmount(product.price);
  const localizedCategory = getCategoryName(product.category, locale);

  const productPath = localizedPath(`/products/${product.slug}`, locale);

  const productUrl = `${baseUrl}${productPath}`;

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
    category: localizedCategory,
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

  const breadcrumbItems: {
    name: string;
    url: string;
  }[] = [
    {
      name: t.homeBreadcrumb,
      url: `${baseUrl}${localizedPath("/", locale)}`,
    },
    {
      name: t.productsBreadcrumb,
      url: `${baseUrl}${localizedPath("/products", locale)}`,
    },
  ];

  if (product.categorySlug) {
    breadcrumbItems.push({
      name: localizedCategory,
      url: `${baseUrl}${localizedPath(
        `/category/${product.categorySlug}`,
        locale,
      )}`,
    });
  }

  breadcrumbItems.push({
    name: product.name,
    url: productUrl,
  });

  const breadcrumbSchema = createBreadcrumbSchema(breadcrumbItems);

  return [productSchema, breadcrumbSchema];
}

export async function ProductDetailPageView({
  slug,
  locale = "az",
}: ProductDetailPageViewProps) {
  const product = await getProductBySlug(slug, locale);
  const t = productDetailTranslations[locale];

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(
    product.categorySlug,
    product.slug,
    locale,
    4,
  );

  const jsonLd = getProductDetailJsonLd(product, locale);
  const priceAmount = getPriceAmount(product.price);
  const localizedPrice = getLocalizedPrice(product, locale);
  const localizedCategory = getCategoryName(product.category, locale);

  const backHref = product.categorySlug
    ? localizedPath(`/category/${product.categorySlug}`, locale)
    : localizedPath("/products", locale);

  const canBuy =
    priceAmount !== null &&
    product.stockStatus === "in_stock" &&
    product.stockQuantity > 0;

  const cartItem = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: priceAmount ?? 0,
    priceLabel: localizedPrice,
    imageUrl: product.images[0]?.url ?? null,
    category: localizedCategory,
    brand: product.brand,
    maxQuantity: product.stockQuantity,
  };

  const favoriteItem = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: localizedPrice,
    priceAmount,
    imageUrl: product.images[0]?.url ?? null,
    category: localizedCategory,
    brand: product.brand,
    stockStatus: product.stockStatus,
    stockQuantity: product.stockQuantity,
  };

  const compareItem = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: localizedPrice,
    priceAmount,
    imageUrl: product.images[0]?.url ?? null,
    category: localizedCategory,
    brand: product.brand,
    stockStatus: product.stockStatus,
    stockQuantity: product.stockQuantity,
  };

  return (
    <div className="min-h-screen bg-[#f5f6f8]">
      {jsonLd ? <JsonLd data={jsonLd} /> : null}

      {/* Breadcrumb and back navigation */}
      <section className="border-b border-neutral-200 bg-white">
        <Container className="py-5 md:py-6">
          <Breadcrumbs
            items={[
              {
                label: t.homeBreadcrumb,
                href: localizedPath("/", locale),
              },
              {
                label: t.productsBreadcrumb,
                href: localizedPath("/products", locale),
              },
              ...(product.categorySlug
                ? [
                    {
                      label: localizedCategory,
                      href: localizedPath(
                        `/category/${product.categorySlug}`,
                        locale,
                      ),
                    },
                  ]
                : []),
              {
                label: product.name,
              },
            ]}
          />

          <Link
            href={backHref}
            className="mt-4 inline-flex items-center text-sm font-medium text-neutral-500 transition hover:text-emerald-700"
          >
            <ArrowLeft className="mr-2 size-4" aria-hidden="true" />

            {t.backToProducts}
          </Link>
        </Container>
      </section>

      {/* Main product area */}
      <section className="py-8 md:py-10 lg:py-12">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.9fr)] lg:items-start">
            <ProductGallery
              images={product.images}
              productName={product.name}
            />

            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm md:p-7 lg:sticky lg:top-[11rem]">
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="rounded-lg bg-neutral-100 px-3 py-1.5 text-xs font-medium text-neutral-700">
                  {localizedCategory}
                </span>

                {product.brand ? (
                  <span className="rounded-lg bg-neutral-950 px-3 py-1.5 text-xs font-medium text-white">
                    {product.brand}
                  </span>
                ) : null}

                {product.badge ? (
                  <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
                    {product.badge}
                  </span>
                ) : null}

                <div className="ml-auto flex gap-2">
                  <FavoriteButton item={favoriteItem} locale={locale} />

                  <CompareButton item={compareItem} locale={locale} />
                </div>
              </div>

              <h1 className="text-2xl font-semibold leading-tight tracking-tight text-neutral-950 md:text-3xl lg:text-4xl">
                {product.name}
              </h1>

              {product.shortDescription ? (
                <p className="mt-4 text-sm leading-7 text-neutral-600 md:text-base">
                  {product.shortDescription}
                </p>
              ) : null}

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {/* Price */}
                <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-5">
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-neutral-500">
                    {t.price}
                  </p>

                  <strong className="mt-2 block text-2xl font-semibold text-neutral-950 md:text-3xl">
                    {localizedPrice}
                  </strong>

                  {priceAmount === null ? (
                    <p className="mt-2 text-xs leading-5 text-neutral-500">
                      {t.priceAdvice}
                    </p>
                  ) : null}
                </div>

                {/* Stock */}
                <div className="rounded-xl border border-neutral-200 bg-white p-5">
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-neutral-500">
                    {t.stockStatus}
                  </p>

                  {product.stockStatus === "in_stock" &&
                  product.stockQuantity > 0 ? (
                    <strong className="mt-2 block text-base font-semibold text-emerald-700 md:text-lg">
                      {t.inStockPrefix} {product.stockQuantity}{" "}
                      {t.inStockSuffix}
                    </strong>
                  ) : product.stockStatus === "pre_order" ? (
                    <strong className="mt-2 block text-base font-semibold text-amber-700 md:text-lg">
                      {t.preOrderAvailable}
                    </strong>
                  ) : (
                    <strong className="mt-2 block text-base font-semibold text-red-700 md:text-lg">
                      {t.outOfStock}
                    </strong>
                  )}
                </div>
              </div>

              {/* Product actions */}
              <div className="mt-6 grid gap-3 border-t border-neutral-100 pt-6">
                <AddToCartButton
                  item={cartItem}
                  maxQuantity={product.stockQuantity}
                  disabled={!canBuy}
                  locale={locale}
                />

                <div className="grid gap-3 sm:grid-cols-2">
                  <BuyNowButton item={cartItem} disabled={!canBuy} />

                  <Link
                    href={localizedPath("/cart", locale)}
                    className="inline-flex min-h-12 items-center justify-center rounded-lg border border-neutral-300 bg-white px-5 py-3 text-sm font-medium text-neutral-950 transition hover:border-neutral-950"
                  >
                    {t.viewCart}
                  </Link>
                </div>

                <a
                  href={`${siteConfig.whatsappHref}?text=${encodeURIComponent(
                    `${t.whatsappTextPrefix} ${product.name}`,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-700 transition hover:border-emerald-600 hover:bg-emerald-100"
                >
                  <MessageCircle className="mr-2 size-4" aria-hidden="true" />

                  {t.whatsappButton}
                </a>
              </div>

              {/* Trust items */}
              <div className="mt-6 grid gap-3 border-t border-neutral-100 pt-5 sm:grid-cols-3">
                {t.trustItems.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-2 text-sm leading-6 text-neutral-700"
                  >
                    <CheckCircle2
                      className="mt-1 size-4 shrink-0 text-emerald-600"
                      aria-hidden="true"
                    />

                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Product details */}
      <section className="pb-10 md:pb-14">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm md:p-7 lg:p-8">
              <div className="mb-5 flex items-center gap-3 border-b border-neutral-100 pb-5">
                <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <FileText className="size-5" aria-hidden="true" />
                </span>

                <h2 className="text-xl font-semibold text-neutral-950 md:text-2xl">
                  {t.aboutProduct}
                </h2>
              </div>

              <p className="text-sm leading-7 text-neutral-600 md:text-base">
                {product.description ?? t.fallbackDescription}
              </p>

              <div className="mt-8">
                <h3 className="mb-4 text-lg font-semibold text-neutral-950 md:text-xl">
                  {t.technicalSpecs}
                </h3>

                {product.specifications.length > 0 ? (
                  <div className="overflow-hidden rounded-xl border border-neutral-200">
                    {product.specifications.map((spec, index) => (
                      <div
                        key={spec.id}
                        className={`grid grid-cols-1 sm:grid-cols-[220px_minmax(0,1fr)] ${
                          index < product.specifications.length - 1
                            ? "border-b border-neutral-200"
                            : ""
                        }`}
                      >
                        <div className="bg-neutral-50 px-4 py-3 text-sm font-medium text-neutral-700">
                          {spec.key}
                        </div>

                        <div className="px-4 py-3 text-sm leading-6 text-neutral-600">
                          {spec.value}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 p-6 text-sm leading-6 text-neutral-600">
                    {t.emptySpecs}
                  </div>
                )}
              </div>
            </div>

            {/* Documents */}
            <aside className="h-fit rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm lg:sticky lg:top-[11rem]">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <ShieldCheck className="size-5" aria-hidden="true" />
                </span>

                <h2 className="text-xl font-semibold text-neutral-950">
                  {t.documents}
                </h2>
              </div>

              {product.downloads.length > 0 ? (
                <div className="space-y-3">
                  {product.downloads.map((download) => (
                    <a
                      key={download.id}
                      href={download.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between gap-4 rounded-xl border border-neutral-200 p-4 text-sm font-medium text-neutral-800 transition hover:border-emerald-500 hover:bg-emerald-50/40 hover:text-emerald-700"
                    >
                      <span className="min-w-0 truncate">{download.title}</span>

                      <Download
                        className="size-4 shrink-0 transition group-hover:translate-y-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  ))}
                </div>
              ) : (
                <p className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 p-5 text-sm leading-6 text-neutral-600">
                  {t.emptyDocuments}
                </p>
              )}
            </aside>
          </div>
        </Container>
      </section>

      {/* Related products */}
      {relatedProducts.length > 0 ? (
        <section className="border-t border-neutral-200 bg-white py-10 md:py-12">
          <Container>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  Oxşar məhsullar
                </p>

                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950 md:text-3xl">
                  Bu kateqoriyadan digər məhsullar
                </h2>
              </div>

              {product.categorySlug ? (
                <Link
                  href={localizedPath(
                    `/category/${product.categorySlug}`,
                    locale,
                  )}
                  className="group inline-flex items-center text-sm font-semibold text-neutral-700 transition hover:text-emerald-700"
                >
                  Kateqoriyaya bax
                  <ArrowRight
                    className="ml-2 size-4 transition group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              ) : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  locale={locale}
                />
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </div>
  );
}

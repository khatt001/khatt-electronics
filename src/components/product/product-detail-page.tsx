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
import {
    productDetailTranslations,
    type ProductDetailLocale,
} from "@/data/translations/product-detail";

type ProductDetailData = Awaited<ReturnType<typeof getProductBySlug>>;

type ProductDetailPageViewProps = {
    slug: string;
    locale?: ProductDetailLocale;
};

function withLocalePath(locale: ProductDetailLocale, path: string) {
    if (locale === "az") {
        return path;
    }

    return `/${locale}${path}`;
}

export function getPriceAmount(price: string) {
    if (price === "Qiymət sorğu ilə") return null;
    if (price === "Price on request") return null;
    if (price === "Цена по запросу") return null;

    const normalizedPrice = Number(String(price).replace("AZN", "").trim());

    if (!Number.isFinite(normalizedPrice)) return null;

    return normalizedPrice;
}

function getLocalizedPrice(product: NonNullable<ProductDetailData>, locale: ProductDetailLocale) {
    const t = productDetailTranslations[locale];
    const priceAmount = getPriceAmount(product.price);

    if (priceAmount === null) {
        return t.priceOnRequest;
    }

    return product.price;
}

export function getProductDetailJsonLd(
    product: ProductDetailData,
    locale: ProductDetailLocale = "az"
) {
    if (!product) return null;

    const t = productDetailTranslations[locale];
    const baseUrl = getBaseUrl();
    const priceNumber = getPriceAmount(product.price);
    const productPath = withLocalePath(locale, `/products/${product.slug}`);
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
            name: t.homeBreadcrumb,
            url: `${baseUrl}${withLocalePath(locale, "/")}`,
        },
        {
            name: t.productsBreadcrumb,
            url: `${baseUrl}${withLocalePath(locale, "/products")}`,
        },
        {
            name: product.name,
            url: productUrl,
        },
    ]);

    return [productSchema, breadcrumbSchema];
}

export async function ProductDetailPageView({
    slug,
    locale = "az",
}: ProductDetailPageViewProps) {
    const product = await getProductBySlug(slug,locale);
    const t = productDetailTranslations[locale];

    if (!product) {
        notFound();
    }

    const jsonLd = getProductDetailJsonLd(product, locale);
    const priceAmount = getPriceAmount(product.price);
    const localizedPrice = getLocalizedPrice(product, locale);

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
        category: product.category,
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
        category: product.category,
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
                        href={withLocalePath(locale, "/products")}
                        className="inline-flex items-center text-sm font-medium text-neutral-600 transition hover:text-neutral-950"
                    >
                        <ArrowLeft className="mr-2 size-4" aria-hidden="true" />
                        {t.backToProducts}
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
                                    <FavoriteButton item={favoriteItem} locale={locale} />
                                    <CompareButton item={compareItem} locale={locale} />
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
                                <p className="text-sm text-neutral-500">{t.price}</p>
                                <strong className="mt-2 block text-3xl text-neutral-950">
                                    {localizedPrice}
                                </strong>

                                {priceAmount === null ? (
                                    <p className="mt-2 text-sm text-neutral-500">
                                        {t.priceAdvice}
                                    </p>
                                ) : null}
                            </div>

                            <div className="mt-4 rounded-3xl border border-neutral-200 bg-white p-5">
                                <p className="text-sm text-neutral-500">{t.stockStatus}</p>

                                {product.stockStatus === "in_stock" &&
                                    product.stockQuantity > 0 ? (
                                    <strong className="mt-2 block text-lg text-emerald-700">
                                        {t.inStockPrefix} {product.stockQuantity} {t.inStockSuffix}
                                    </strong>
                                ) : product.stockStatus === "pre_order" ? (
                                    <strong className="mt-2 block text-lg text-amber-700">
                                        {t.preOrderAvailable}
                                    </strong>
                                ) : (
                                    <strong className="mt-2 block text-lg text-red-700">
                                        {t.outOfStock}
                                    </strong>
                                )}
                            </div>

                            <div className="mt-8 grid gap-3">
                                <AddToCartButton
                                    item={cartItem}
                                    maxQuantity={product.stockQuantity}
                                    disabled={!canBuy}
                                    locale={locale}
                                />

                                <div className="grid gap-3 sm:grid-cols-2">
                                    <BuyNowButton item={cartItem} disabled={!canBuy} />
                                    <Link
                                        href={withLocalePath(locale, "/cart")}
                                        className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3.5 text-sm font-medium text-neutral-950 transition hover:border-neutral-950"
                                    >
                                        {t.viewCart}
                                    </Link>
                                </div>

                                <a
                                    href={`${siteConfig.whatsappHref}?text=${encodeURIComponent(
                                        `${t.whatsappTextPrefix} ${product.name}`
                                    )}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 px-6 py-3.5 text-sm font-medium text-emerald-700 transition hover:border-emerald-600"
                                >
                                    {t.whatsappButton}
                                </a>
                            </div>

                            <div className="mt-8 grid gap-3 border-t border-neutral-200 pt-6 sm:grid-cols-3">
                                {t.trustItems.map((item) => (
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
                                <h2 className="text-2xl font-semibold">{t.aboutProduct}</h2>
                            </div>

                            <p className="leading-8 text-neutral-600">
                                {product.description ?? t.fallbackDescription}
                            </p>

                            <div className="mt-10">
                                <h3 className="mb-4 text-xl font-semibold">
                                    {t.technicalSpecs}
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
                                        {t.emptySpecs}
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
                                <h2 className="text-xl font-semibold">{t.documents}</h2>
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
                                    {t.emptyDocuments}
                                </p>
                            )}
                        </aside>
                    </div>
                </Container>
            </section>
        </main>
    );
}
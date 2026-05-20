import Link from "next/link";
import { PackageSearch, Search } from "lucide-react";
import { Container } from "@/components/layout/container";
import { formatPrice } from "@/lib/cart";
import { trackOrder } from "@/services/order-tracking";
import { PhoneInput } from "@/components/checkout/phone-input";
import {
    trackOrderTranslations,
    type TrackOrderLocale,
} from "@/data/translations/track-order";

type TrackOrderPageProps = {
    locale?: TrackOrderLocale;
    orderNumber?: string;
    phone?: string;
};

function withLocalePath(locale: TrackOrderLocale, path: string) {
    if (locale === "az") {
        return path;
    }

    return `/${locale}${path}`;
}

function formatDate(value: string, localeCode: string) {
    return new Intl.DateTimeFormat(localeCode, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(value));
}

function getOrderStatusLabel(status: string, locale: TrackOrderLocale) {
    const t = trackOrderTranslations[locale];

    if (status === "new") return t.statusNew;
    if (status === "confirmed") return t.statusConfirmed;
    if (status === "preparing") return t.statusPreparing;
    if (status === "delivered") return t.statusDelivered;
    if (status === "cancelled") return t.statusCancelled;

    return status;
}

function getPaymentStatusLabel(status: string, locale: TrackOrderLocale) {
    const t = trackOrderTranslations[locale];

    if (status === "pending") return t.paymentPending;
    if (status === "paid") return t.paymentPaid;
    if (status === "failed") return t.paymentFailed;

    return status;
}

function getPaymentMethodLabel(method: string, locale: TrackOrderLocale) {
    const t = trackOrderTranslations[locale];

    if (method === "cash") return t.paymentCash;
    if (method === "card") return t.paymentCard;

    return method;
}

function getStepClass(currentStatus: string, step: string) {
    const order = ["new", "confirmed", "preparing", "delivered"];
    const currentIndex = order.indexOf(currentStatus);
    const stepIndex = order.indexOf(step);

    if (currentStatus === "cancelled") {
        return step === "cancelled"
            ? "border-red-600 bg-red-50 text-red-700"
            : "border-neutral-200 bg-white text-neutral-400";
    }

    if (stepIndex <= currentIndex) {
        return "border-emerald-600 bg-emerald-50 text-emerald-700";
    }

    return "border-neutral-200 bg-white text-neutral-400";
}

export async function TrackOrderPage({
    locale = "az",
    orderNumber = "",
    phone = "",
}: TrackOrderPageProps) {
    const t = trackOrderTranslations[locale];

    const hasSearch = Boolean(orderNumber || phone);
    const order =
        orderNumber && phone
            ? await trackOrder({
                orderNumber,
                phone,
            })
            : null;

    const steps = [
        ["new", t.statusNew],
        ["confirmed", t.statusConfirmed],
        ["preparing", t.statusPreparing],
        ["delivered", t.statusDelivered],
    ];

    return (
        <main className="min-h-screen bg-[#f6f6f4] pt-16 lg:pt-[8.25rem] xl:pt-[7.5rem]">
            <section className="border-b border-black/10 bg-white">
                <Container className="py-12">
                    <p className="text-xs uppercase tracking-[0.28em] text-neutral-400">
                        {t.eyebrow}
                    </p>
                    <h1 className="mt-3 text-4xl font-semibold leading-tight text-neutral-950 md:text-6xl">
                        {t.title}
                    </h1>
                    <p className="mt-5 max-w-2xl leading-8 text-neutral-600">
                        {t.description}
                    </p>
                </Container>
            </section>

            <section className="py-10 lg:py-14">
                <Container>
                    <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
                        <form
                            action={withLocalePath(locale, "/track-order")}
                            className="h-fit rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
                        >
                            <h2 className="text-2xl font-semibold text-neutral-950">
                                {t.formTitle}
                            </h2>

                            <div className="mt-6 space-y-4">
                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        {t.orderNumberLabel}
                                    </label>
                                    <input
                                        name="order"
                                        defaultValue={orderNumber}
                                        required
                                        className="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm uppercase outline-none transition focus:border-neutral-950"
                                        placeholder="KH-20260519-1234"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        {t.phoneLabel}
                                    </label>
                                    <PhoneInput
                                        name="phone"
                                        defaultValue={phone}
                                        required
                                        locale={locale}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="inline-flex h-12 w-full items-center justify-center rounded-full bg-neutral-950 text-sm font-semibold text-white transition hover:bg-neutral-800"
                                >
                                    <Search className="mr-2 size-4" aria-hidden="true" />
                                    {t.submitButton}
                                </button>
                            </div>
                        </form>

                        <div>
                            {order ? (
                                <div className="space-y-6">
                                    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
                                        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                                            <div>
                                                <p className="text-xs uppercase tracking-[0.24em] text-neutral-400">
                                                    {t.orderFound}
                                                </p>
                                                <h2 className="mt-2 text-3xl font-semibold text-neutral-950">
                                                    {order.order_number}
                                                </h2>
                                                <p className="mt-2 text-sm text-neutral-500">
                                                    {formatDate(order.created_at, t.localeCode)}
                                                </p>
                                            </div>

                                            <div className="rounded-2xl bg-neutral-950 px-5 py-3 text-white">
                                                <p className="text-xs text-white/60">{t.total}</p>
                                                <strong className="text-xl">
                                                    {formatPrice(order.total)}
                                                </strong>
                                            </div>
                                        </div>

                                        <div className="mt-6 grid gap-3 md:grid-cols-4">
                                            {steps.map(([step, label]) => (
                                                <div
                                                    key={step}
                                                    className={`rounded-2xl border p-4 text-center text-sm font-semibold ${getStepClass(
                                                        order.order_status,
                                                        step
                                                    )}`}
                                                >
                                                    {label}
                                                </div>
                                            ))}

                                            {order.order_status === "cancelled" ? (
                                                <div className="rounded-2xl border border-red-600 bg-red-50 p-4 text-center text-sm font-semibold text-red-700 md:col-span-4">
                                                    {t.cancelledNotice}
                                                </div>
                                            ) : null}
                                        </div>

                                        <div className="mt-6 grid gap-4 md:grid-cols-3">
                                            <div className="rounded-2xl border border-neutral-200 p-4">
                                                <p className="text-xs text-neutral-500">
                                                    {t.orderStatus}
                                                </p>
                                                <p className="mt-1 font-semibold text-neutral-950">
                                                    {getOrderStatusLabel(order.order_status, locale)}
                                                </p>
                                            </div>

                                            <div className="rounded-2xl border border-neutral-200 p-4">
                                                <p className="text-xs text-neutral-500">
                                                    {t.paymentMethod}
                                                </p>
                                                <p className="mt-1 font-semibold text-neutral-950">
                                                    {getPaymentMethodLabel(order.payment_method, locale)}
                                                </p>
                                            </div>

                                            <div className="rounded-2xl border border-neutral-200 p-4">
                                                <p className="text-xs text-neutral-500">
                                                    {t.paymentStatus}
                                                </p>
                                                <p className="mt-1 font-semibold text-neutral-950">
                                                    {getPaymentStatusLabel(order.payment_status, locale)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
                                        <h3 className="text-xl font-semibold text-neutral-950">
                                            {t.products}
                                        </h3>

                                        <div className="mt-5 divide-y divide-neutral-100">
                                            {order.items.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="flex justify-between gap-4 py-4"
                                                >
                                                    <div>
                                                        <Link
                                                            href={withLocalePath(
                                                                locale,
                                                                `/products/${item.product_slug}`
                                                            )}
                                                            className="font-medium text-neutral-950 transition hover:underline"
                                                        >
                                                            {item.product_name}
                                                        </Link>
                                                        <p className="mt-1 text-sm text-neutral-500">
                                                            {item.quantity} × {formatPrice(item.unit_price)}
                                                        </p>
                                                    </div>

                                                    <p className="shrink-0 font-semibold text-neutral-950">
                                                        {formatPrice(item.line_total)}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : hasSearch ? (
                                <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
                                    <PackageSearch className="mx-auto size-10 text-red-600" />
                                    <h2 className="mt-4 text-2xl font-semibold text-red-800">
                                        {t.notFoundTitle}
                                    </h2>
                                    <p className="mt-3 text-sm leading-7 text-red-700">
                                        {t.notFoundDescription}
                                    </p>
                                </div>
                            ) : (
                                <div className="rounded-3xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
                                    <PackageSearch className="mx-auto size-10 text-neutral-400" />
                                    <h2 className="mt-4 text-2xl font-semibold text-neutral-950">
                                        {t.emptyTitle}
                                    </h2>
                                    <p className="mt-3 text-sm leading-7 text-neutral-500">
                                        {t.emptyDescription}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    );
}
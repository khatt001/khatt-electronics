import Link from "next/link";
import { notFound } from "next/navigation";
import {
    ArrowLeft,
    ExternalLink,
    Mail,
    MapPin,
    Phone,
    Trash2,
} from "lucide-react";

import {
    deleteOrder,
    updateOrderStatus,
} from "@/app/admin/(protected)/orders/actions";
import { DeleteSubmitButton } from "@/components/admin/delete-submit-button";
import { formatPrice } from "@/lib/cart";
import { getAdminOrderById } from "@/services/admin-orders";

type AdminOrderDetailPageProps = {
    params: Promise<{
        id: string;
    }>;
    searchParams: Promise<{
        error?: string;
    }>;
};

function formatDate(value: string) {
    return new Intl.DateTimeFormat("az-AZ", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(value));
}

function getOrderStatusLabel(status: string) {
    if (status === "new") return "Yeni";
    if (status === "confirmed") return "Təsdiqləndi";
    if (status === "preparing") return "Hazırlanır";
    if (status === "delivered") return "Təhvil verildi";
    if (status === "cancelled") return "Ləğv edildi";

    return status;
}

function getOrderStatusClassName(status: string) {
    if (status === "new") {
        return "border-emerald-200 bg-emerald-50 text-emerald-700";
    }

    if (status === "confirmed") {
        return "border-blue-200 bg-blue-50 text-blue-700";
    }

    if (status === "preparing") {
        return "border-amber-200 bg-amber-50 text-amber-700";
    }

    if (status === "delivered") {
        return "border-violet-200 bg-violet-50 text-violet-700";
    }

    if (status === "cancelled") {
        return "border-red-200 bg-red-50 text-red-700";
    }

    return "border-neutral-200 bg-neutral-100 text-neutral-600";
}

function getPaymentStatusLabel(status: string) {
    if (status === "pending") return "Gözləyir";
    if (status === "paid") return "Ödənilib";
    if (status === "failed") return "Uğursuz";

    return status;
}

function getPaymentStatusClassName(status: string) {
    if (status === "paid") {
        return "border-emerald-200 bg-emerald-50 text-emerald-700";
    }

    if (status === "failed") {
        return "border-red-200 bg-red-50 text-red-700";
    }

    return "border-amber-200 bg-amber-50 text-amber-700";
}

function getPaymentMethodLabel(method: string) {
    if (method === "cash") return "Nağd";
    if (method === "card") return "Kart";

    return method;
}

function normalizePhoneForWhatsapp(phone: string) {
    const digits = phone.replace(/\D/g, "");

    if (digits.startsWith("994")) {
        return digits;
    }

    if (digits.startsWith("0")) {
        return `994${digits.slice(1)}`;
    }

    return digits;
}

function createWhatsappOrderMessage(order: {
    order_number: string;
    customer_name: string;
    total: number;
}) {
    return encodeURIComponent(
        `Salam, ${order.customer_name}. KHATT Electronics sifarişiniz qəbul olunub.

Sifariş nömrəsi: ${order.order_number}
Məbləğ: ${order.total.toFixed(2)} AZN

Sifarişinizi təsdiqləmək üçün sizinlə əlaqə saxlayırıq.`,
    );
}

export default async function AdminOrderDetailPage({
    params,
    searchParams,
}: AdminOrderDetailPageProps) {
    const { id } = await params;
    const query = await searchParams;
    const order = await getAdminOrderById(id);

    if (!order) {
        notFound();
    }

    const updateOrderStatusWithId = updateOrderStatus.bind(
        null,
        order.id,
    );

    const deleteOrderWithId = deleteOrder.bind(null, order.id);

    const whatsappHref = `https://wa.me/${normalizePhoneForWhatsapp(
        order.phone,
    )}?text=${createWhatsappOrderMessage({
        order_number: order.order_number,
        customer_name: order.customer_name,
        total: order.total,
    })}`;

    return (
        <div>
            {query.error ? (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    {decodeURIComponent(query.error)}
                </div>
            ) : null}

            <div className="mb-8">
                <Link
                    href="/admin/orders"
                    className="mb-5 inline-flex items-center text-sm font-medium text-neutral-600 transition hover:text-emerald-700"
                >
                    <ArrowLeft
                        className="mr-2 size-4"
                        aria-hidden="true"
                    />

                    Sifarişlərə qayıt
                </Link>

                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                            Sifariş detalları
                        </p>

                        <h1 className="mt-2 text-3xl font-semibold text-neutral-950">
                            {order.order_number}
                        </h1>

                        <p className="mt-2 text-sm text-neutral-500">
                            Yaradılma tarixi: {formatDate(order.created_at)}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <span
                            className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${getOrderStatusClassName(
                                order.order_status,
                            )}`}
                        >
                            {getOrderStatusLabel(order.order_status)}
                        </span>

                        <span
                            className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${getPaymentStatusClassName(
                                order.payment_status,
                            )}`}
                        >
                            {getPaymentStatusLabel(order.payment_status)}
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_380px]">
                <div className="min-w-0 space-y-6">
                    <section className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
                        <div className="border-b border-neutral-100 px-6 py-5">
                            <h2 className="text-xl font-semibold text-neutral-950">
                                Məhsullar
                            </h2>

                            <p className="mt-1 text-sm text-neutral-500">
                                Sifarişdə {order.items.length} məhsul mövqeyi var.
                            </p>
                        </div>

                        <div className="divide-y divide-neutral-100">
                            {order.items.length > 0 ? (
                                order.items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="grid gap-4 p-5 transition hover:bg-neutral-50/70 md:grid-cols-[minmax(0,1fr)_160px]"
                                    >
                                        <div className="min-w-0">
                                            <p className="font-semibold leading-6 text-neutral-950">
                                                {item.product_name}
                                            </p>

                                            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-neutral-500">
                                                <span>{item.quantity} ədəd</span>
                                                <span>•</span>

                                                <span>
                                                    Bir ədəd: {formatPrice(item.unit_price)}
                                                </span>
                                            </div>

                                            {item.product_slug ? (
                                                <Link
                                                    href={`/products/${item.product_slug}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="mt-3 inline-flex items-center text-xs font-medium text-neutral-600 transition hover:text-emerald-700"
                                                >
                                                    Məhsula bax

                                                    <ExternalLink
                                                        className="ml-1 size-3"
                                                        aria-hidden="true"
                                                    />
                                                </Link>
                                            ) : null}
                                        </div>

                                        <div className="rounded-xl bg-neutral-50 p-4 text-left md:text-right">
                                            <p className="text-xs text-neutral-500">
                                                Məhsul üzrə cəm
                                            </p>

                                            <p className="mt-1 text-lg font-semibold text-neutral-950">
                                                {formatPrice(item.line_total)}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-8 text-center text-sm text-neutral-500">
                                    Bu sifarişdə məhsul tapılmadı.
                                </div>
                            )}
                        </div>
                    </section>

                    {order.note ? (
                        <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold text-neutral-950">
                                Müştəri qeydi
                            </h2>

                            <p className="mt-4 whitespace-pre-line rounded-xl bg-neutral-50 p-4 text-sm leading-7 text-neutral-600">
                                {order.note}
                            </p>
                        </section>
                    ) : null}

                    <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-semibold text-neutral-950">
                            Sifariş məlumatları
                        </h2>

                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                            <div className="rounded-xl border border-neutral-200 p-4">
                                <p className="text-xs text-neutral-500">
                                    Sifariş statusu
                                </p>

                                <p className="mt-2 font-semibold text-neutral-950">
                                    {getOrderStatusLabel(order.order_status)}
                                </p>
                            </div>

                            <div className="rounded-xl border border-neutral-200 p-4">
                                <p className="text-xs text-neutral-500">
                                    Ödəniş statusu
                                </p>

                                <p className="mt-2 font-semibold text-neutral-950">
                                    {getPaymentStatusLabel(order.payment_status)}
                                </p>
                            </div>

                            <div className="rounded-xl border border-neutral-200 p-4">
                                <p className="text-xs text-neutral-500">
                                    Ödəniş üsulu
                                </p>

                                <p className="mt-2 font-semibold text-neutral-950">
                                    {getPaymentMethodLabel(order.payment_method)}
                                </p>
                            </div>

                            <div className="rounded-xl border border-neutral-200 p-4">
                                <p className="text-xs text-neutral-500">
                                    Yaradılma tarixi
                                </p>

                                <p className="mt-2 font-semibold text-neutral-950">
                                    {formatDate(order.created_at)}
                                </p>
                            </div>
                        </div>
                    </section>
                </div>

                <aside className="space-y-5">
                    <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-semibold text-neutral-950">
                            Müştəri
                        </h2>

                        <div className="mt-5 space-y-4 text-sm">
                            <div>
                                <p className="text-neutral-500">Ad və soyad</p>

                                <p className="mt-1 font-semibold text-neutral-950">
                                    {order.customer_name}
                                </p>
                            </div>

                            <a
                                href={`tel:${order.phone}`}
                                className="flex items-center gap-3 rounded-xl border border-neutral-200 p-3 transition hover:border-emerald-300 hover:bg-emerald-50"
                            >
                                <Phone
                                    className="size-4 shrink-0 text-neutral-500"
                                    aria-hidden="true"
                                />

                                <span>{order.phone}</span>
                            </a>

                            <a
                                href={whatsappHref}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-semibold text-emerald-700 transition hover:border-emerald-500 hover:bg-emerald-100"
                            >
                                WhatsApp ilə təsdiqlə
                            </a>

                            {order.email ? (
                                <a
                                    href={`mailto:${order.email}`}
                                    className="flex items-center gap-3 rounded-xl border border-neutral-200 p-3 transition hover:border-emerald-300 hover:bg-emerald-50"
                                >
                                    <Mail
                                        className="size-4 shrink-0 text-neutral-500"
                                        aria-hidden="true"
                                    />

                                    <span className="break-all">
                                        {order.email}
                                    </span>
                                </a>
                            ) : null}

                            <div className="rounded-xl border border-neutral-200 p-4">
                                <div className="flex items-center gap-3">
                                    <MapPin
                                        className="size-4 shrink-0 text-neutral-500"
                                        aria-hidden="true"
                                    />

                                    <span className="font-medium text-neutral-950">
                                        {order.city ?? "Şəhər qeyd edilməyib"}
                                    </span>
                                </div>

                                <p className="mt-3 leading-6 text-neutral-600">
                                    {order.address ?? "Ünvan qeyd edilməyib"}
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-semibold text-neutral-950">
                            Statusu dəyiş
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-neutral-500">
                            Sifariş və ödəniş statusunu yeniləyin.
                        </p>

                        <form
                            action={updateOrderStatusWithId}
                            className="mt-5 space-y-4"
                        >
                            <div>
                                <label
                                    htmlFor="order-status"
                                    className="mb-2 block text-sm font-medium text-neutral-700"
                                >
                                    Sifariş statusu
                                </label>

                                <select
                                    id="order-status"
                                    name="order_status"
                                    defaultValue={order.order_status}
                                    className="h-12 w-full rounded-lg border border-neutral-200 bg-white px-4 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10"
                                >
                                    <option value="new">Yeni</option>
                                    <option value="confirmed">
                                        Təsdiqləndi
                                    </option>
                                    <option value="preparing">Hazırlanır</option>
                                    <option value="delivered">
                                        Təhvil verildi
                                    </option>
                                    <option value="cancelled">
                                        Ləğv edildi
                                    </option>
                                </select>
                            </div>

                            <div>
                                <label
                                    htmlFor="payment-status"
                                    className="mb-2 block text-sm font-medium text-neutral-700"
                                >
                                    Ödəniş statusu
                                </label>

                                <select
                                    id="payment-status"
                                    name="payment_status"
                                    defaultValue={order.payment_status}
                                    className="h-12 w-full rounded-lg border border-neutral-200 bg-white px-4 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10"
                                >
                                    <option value="pending">Gözləyir</option>
                                    <option value="paid">Ödənilib</option>
                                    <option value="failed">Uğursuz</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="h-12 w-full rounded-lg bg-neutral-950 text-sm font-semibold text-white transition hover:bg-emerald-700"
                            >
                                Statusu yadda saxla
                            </button>
                        </form>
                    </section>

                    <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-semibold text-neutral-950">
                            Xülasə
                        </h2>

                        <div className="mt-5 space-y-3 text-sm">
                            <div className="flex justify-between gap-4">
                                <span className="text-neutral-500">
                                    Ara cəm
                                </span>

                                <span className="font-medium text-neutral-950">
                                    {formatPrice(order.subtotal)}
                                </span>
                            </div>

                            <div className="flex justify-between gap-4">
                                <span className="text-neutral-500">
                                    Çatdırılma
                                </span>

                                <span className="font-medium text-neutral-950">
                                    {formatPrice(order.delivery_fee)}
                                </span>
                            </div>

                            <div className="flex items-end justify-between gap-4 border-t border-neutral-100 pt-4">
                                <span className="font-medium text-neutral-700">
                                    Ümumi məbləğ
                                </span>

                                <strong className="text-xl text-neutral-950">
                                    {formatPrice(order.total)}
                                </strong>
                            </div>
                        </div>
                    </section>

                    <section className="rounded-2xl border border-red-200 bg-red-50 p-6">
                        <div className="flex size-11 items-center justify-center rounded-xl bg-red-100 text-red-700">
                            <Trash2
                                className="size-5"
                                aria-hidden="true"
                            />
                        </div>

                        <h2 className="mt-4 text-lg font-semibold text-red-900">
                            Sifarişi sil
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-red-700">
                            Sifariş və ona bağlı məhsul qeydləri birdəfəlik
                            silinəcək. Bu əməliyyatı geri qaytarmaq mümkün
                            deyil.
                        </p>

                        <form
                            action={deleteOrderWithId}
                            className="mt-5"
                        >
                            <DeleteSubmitButton
                                label="Sifarişi birdəfəlik sil"
                                confirmMessage={`${order.order_number} nömrəli sifarişi birdəfəlik silmək istədiyinizə əminsiniz?`}
                                className="h-11 w-full rounded-lg bg-red-600 px-5 text-sm font-semibold text-white transition hover:bg-red-700"
                            />
                        </form>
                    </section>
                </aside>
            </div>
        </div>
    );
}
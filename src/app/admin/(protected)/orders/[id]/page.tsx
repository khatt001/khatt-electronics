import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Phone, Mail, MapPin } from "lucide-react";
import { getAdminOrderById } from "@/services/admin-orders";
import { formatPrice } from "@/lib/cart";
import { updateOrderStatus } from "@/app/admin/(protected)/orders/actions";
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

function getPaymentStatusLabel(status: string) {
    if (status === "pending") return "Gözləyir";
    if (status === "paid") return "Ödənilib";
    if (status === "failed") return "Uğursuz";
    return status;
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

Sifarişinizi təsdiqləmək üçün sizinlə əlaqə saxlayırıq.`
    );
}
export default async function AdminOrderDetailPage({
    params,
    searchParams,
}: AdminOrderDetailPageProps) {
    const { id } = await params;
    const query = await searchParams;
    const order = await getAdminOrderById(id);

    if (!order) notFound();
    const updateOrderStatusWithId = updateOrderStatus.bind(null, order.id);
    const whatsappHref = `https://wa.me/${normalizePhoneForWhatsapp(
        order.phone
    )}?text=${createWhatsappOrderMessage({
        order_number: order.order_number,
        customer_name: order.customer_name,
        total: order.total,
    })}`;
    return (
        <div>
            <div className="mb-8">
                {query.error ? (
                    <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                        {decodeURIComponent(query.error)}
                    </div>
                ) : null}
                <Link
                    href="/admin/orders"
                    className="mb-5 inline-flex items-center text-sm font-medium text-neutral-600 transition hover:text-neutral-950"
                >
                    <ArrowLeft className="mr-2 size-4" aria-hidden="true" />
                    Sifarişlərə qayıt
                </Link>

                <p className="text-xs uppercase tracking-[0.24em] text-neutral-400">
                    Sifariş detalları
                </p>
                <h2 className="mt-2 text-3xl font-semibold">{order.order_number}</h2>
                <p className="mt-2 text-sm text-neutral-500">
                    Yaradılma tarixi: {formatDate(order.created_at)}
                </p>
            </div>

            <div className="grid gap-8 xl:grid-cols-[1fr_360px]">
                <div className="space-y-6">
                    <div className="rounded-3xl border border-neutral-200 bg-white p-6">
                        <h3 className="text-xl font-semibold text-neutral-950">
                            Məhsullar
                        </h3>

                        <div className="mt-5 overflow-hidden rounded-2xl border border-neutral-200">
                            {order.items.map((item) => (
                                <div
                                    key={item.id}
                                    className="grid gap-4 border-b border-neutral-100 p-4 last:border-b-0 md:grid-cols-[1fr_auto]"
                                >
                                    <div>
                                        <p className="font-semibold text-neutral-950">
                                            {item.product_name}
                                        </p>

                                        <div className="mt-2 flex flex-wrap gap-2 text-xs text-neutral-500">
                                            <span>{item.quantity} ədəd</span>
                                            <span>•</span>
                                            <span>Bir ədəd: {formatPrice(item.unit_price)}</span>
                                        </div>

                                        <Link
                                            href={`/products/${item.product_slug}`}
                                            target="_blank"
                                            className="mt-3 inline-flex items-center text-xs font-medium text-neutral-600 transition hover:text-neutral-950"
                                        >
                                            Məhsula bax
                                            <ExternalLink className="ml-1 size-3" aria-hidden="true" />
                                        </Link>
                                    </div>

                                    <div className="text-left md:text-right">
                                        <p className="text-sm text-neutral-500">Cəm</p>
                                        <p className="mt-1 text-lg font-semibold text-neutral-950">
                                            {formatPrice(item.line_total)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {order.note ? (
                        <div className="rounded-3xl border border-neutral-200 bg-white p-6">
                            <h3 className="text-xl font-semibold text-neutral-950">Qeyd</h3>
                            <p className="mt-3 leading-7 text-neutral-600">{order.note}</p>
                        </div>
                    ) : null}
                </div>

                <aside className="space-y-5">
                    <div className="rounded-3xl border border-neutral-200 bg-white p-6">
                        <h3 className="text-xl font-semibold text-neutral-950">
                            Müştəri
                        </h3>

                        <div className="mt-5 space-y-4 text-sm">
                            <div>
                                <p className="text-neutral-500">Ad soyad</p>
                                <p className="mt-1 font-semibold text-neutral-950">
                                    {order.customer_name}
                                </p>
                            </div>

                            <a
                                href={`tel:${order.phone}`}
                                className="flex items-center gap-3 rounded-2xl border border-neutral-200 p-3 transition hover:border-neutral-950"
                            >
                                <Phone className="size-4 text-neutral-500" aria-hidden="true" />
                                <span>{order.phone}</span>
                            </a>
                            <a
                                href={whatsappHref}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-semibold text-emerald-700 transition hover:border-emerald-600"
                            >
                                WhatsApp ilə təsdiqlə
                            </a>
                            {order.email ? (
                                <a
                                    href={`mailto:${order.email}`}
                                    className="flex items-center gap-3 rounded-2xl border border-neutral-200 p-3 transition hover:border-neutral-950"
                                >
                                    <Mail className="size-4 text-neutral-500" aria-hidden="true" />
                                    <span>{order.email}</span>
                                </a>
                            ) : null}

                            <div className="rounded-2xl border border-neutral-200 p-3">
                                <div className="flex items-center gap-3">
                                    <MapPin className="size-4 text-neutral-500" aria-hidden="true" />
                                    <span className="font-medium text-neutral-950">
                                        {order.city ?? "Şəhər qeyd edilməyib"}
                                    </span>
                                </div>
                                <p className="mt-2 leading-6 text-neutral-600">
                                    {order.address ?? "Ünvan qeyd edilməyib"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-neutral-200 bg-white p-6">
                        <h3 className="text-xl font-semibold text-neutral-950">
                            Xülasə
                        </h3>
                        <form
                            action={updateOrderStatusWithId}
                            className="rounded-3xl border border-neutral-200 bg-white p-6"
                        >
                            <h3 className="text-xl font-semibold text-neutral-950">
                                Statusu dəyiş
                            </h3>

                            <div className="mt-5 space-y-4">
                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        Sifariş statusu
                                    </label>
                                    <select
                                        name="order_status"
                                        defaultValue={order.order_status}
                                        className="h-12 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm outline-none transition focus:border-neutral-950"
                                    >
                                        <option value="new">Yeni</option>
                                        <option value="confirmed">Təsdiqləndi</option>
                                        <option value="preparing">Hazırlanır</option>
                                        <option value="delivered">Təhvil verildi</option>
                                        <option value="cancelled">Ləğv edildi</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        Ödəniş statusu
                                    </label>
                                    <select
                                        name="payment_status"
                                        defaultValue={order.payment_status}
                                        className="h-12 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm outline-none transition focus:border-neutral-950"
                                    >
                                        <option value="pending">Gözləyir</option>
                                        <option value="paid">Ödənilib</option>
                                        <option value="failed">Uğursuz</option>
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    className="h-12 w-full rounded-full bg-neutral-950 text-sm font-semibold text-white transition hover:bg-neutral-800"
                                >
                                    Statusu yadda saxla
                                </button>
                            </div>
                        </form>
                        <div className="mt-5 space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-neutral-500">Sifariş statusu</span>
                                <span className="font-medium text-neutral-950">
                                    {getOrderStatusLabel(order.order_status)}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-neutral-500">Ödəniş üsulu</span>
                                <span className="font-medium text-neutral-950">
                                    {getPaymentMethodLabel(order.payment_method)}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-neutral-500">Ödəniş statusu</span>
                                <span className="font-medium text-neutral-950">
                                    {getPaymentStatusLabel(order.payment_status)}
                                </span>
                            </div>

                            <div className="flex justify-between border-t border-neutral-100 pt-4">
                                <span className="text-neutral-500">Ara cəm</span>
                                <span className="font-medium text-neutral-950">
                                    {formatPrice(order.subtotal)}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-neutral-500">Çatdırılma</span>
                                <span className="font-medium text-neutral-950">
                                    {formatPrice(order.delivery_fee)}
                                </span>
                            </div>

                            <div className="flex justify-between border-t border-neutral-100 pt-4">
                                <span className="text-neutral-500">Cəmi</span>
                                <strong className="text-xl text-neutral-950">
                                    {formatPrice(order.total)}
                                </strong>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
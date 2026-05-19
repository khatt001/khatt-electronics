import type { Metadata } from "next";
import Link from "next/link";
import {
    CheckCircle2,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
    ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { createInquiry } from "@/app/contact/actions";
import { ContactSubmitButton } from "@/app/contact/submit-button";
import { siteConfig } from "@/data/site";
export const metadata: Metadata = {
    title: "Əlaqə | KHATT Electronics",
    description:
        "KHATT Electronics ilə əlaqə saxlayın. Kamera sistemləri, şəbəkə avadanlıqları və təhlükəsizlik həlləri üçün qiymət təklifi və konsultasiya alın.",
};

type ContactPageProps = {
    searchParams: Promise<{
        success?: string;
        error?: string;
        product?: string;
        source?: string;
    }>;
};

function getSourceLabel(source?: string) {
    if (source === "estimate") return "Qiymət təklifi";
    if (source === "consultation") return "Konsultasiya sorğusu";
    return "Ümumi sorğu";
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
    const query = await searchParams;

    const sourceLabel = getSourceLabel(query.source);
    const defaultMessage = query.product
        ? `${sourceLabel}: ${query.product}`
        : "";

    return (
        <main className="min-h-screen bg-[#f6f6f4] pt-16 lg:pt-[8.25rem] xl:pt-[7.5rem]">
            <section className="border-b border-black/10 bg-white">
                <Container className="py-12 lg:py-16">
                    <div className="max-w-3xl">
                        <p className="text-xs uppercase tracking-[0.28em] text-neutral-400">
                            Əlaqə
                        </p>
                        <h1 className="mt-3 text-4xl font-semibold leading-tight text-neutral-950 md:text-6xl">
                            Layihəniz üçün uyğun texniki həlli birlikdə seçək
                        </h1>
                        <p className="mt-5 leading-8 text-neutral-600">
                            Kamera sistemi, şəbəkə infrastrukturu və elektronika məhsulları
                            üzrə qiymət təklifi, məsləhət və texniki seçim üçün sorğu göndərin.
                        </p>
                    </div>
                </Container>
            </section>

            <section className="py-10 lg:py-14">
                <Container>
                    <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
                        <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm lg:p-8">
                            <div className="mb-6">
                                <h2 className="text-2xl font-semibold">Sorğu göndər</h2>
                                <p className="mt-2 text-sm leading-6 text-neutral-500">
                                    Məlumatları yazın, admin paneldə sorğunuz görünəcək və sizinlə
                                    əlaqə saxlanılacaq.
                                </p>
                            </div>

                            {query.success ? (
                                <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
                                    Sorğunuz uğurla göndərildi. Tezliklə sizinlə əlaqə
                                    saxlanılacaq.
                                </div>
                            ) : null}

                            {query.error ? (
                                <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                                    {decodeURIComponent(query.error)}
                                </div>
                            ) : null}

                            {query.product ? (
                                <div className="mb-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-700">
                                    Sorğu məhsulu:{" "}
                                    <span className="font-semibold">{query.product}</span>
                                </div>
                            ) : null}

                            <form action={createInquiry} className="space-y-5">
                                <input
                                    type="hidden"
                                    name="source"
                                    value={query.source ?? "contact_page"}
                                />

                                <div className="grid gap-5 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium">
                                            Ad və soyad
                                        </label>
                                        <input
                                            name="full_name"
                                            required
                                            minLength={2}
                                            placeholder="Adınız"
                                            className="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium">
                                            Telefon
                                        </label>
                                        <input
                                            name="phone"
                                            required
                                            placeholder="+994..."
                                            className="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                                        />
                                    </div>
                                </div>

                                <div className="grid gap-5 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium">
                                            Email
                                        </label>
                                        <input
                                            name="email"
                                            type="email"
                                            placeholder="email@example.com"
                                            className="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium">
                                            Şirkət adı
                                        </label>
                                        <input
                                            name="company_name"
                                            placeholder="Şirkət adı"
                                            className="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        Mesaj
                                    </label>
                                    <textarea
                                        name="message"
                                        rows={6}
                                        defaultValue={defaultMessage}
                                        placeholder="Layihə və ya məhsul sorğunuzu yazın..."
                                        className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none transition focus:border-neutral-950"
                                    />
                                </div>

                                <ContactSubmitButton />
                            </form>
                        </div>

                        <aside className="space-y-5">
                            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
                                <h2 className="text-xl font-semibold">Əlaqə məlumatları</h2>

                                <div className="mt-5 space-y-4">
                                    <a
                                        href={siteConfig.phoneHref}
                                        className="flex items-center gap-3 rounded-2xl border border-neutral-200 p-4 text-sm transition hover:border-neutral-950"
                                    >
                                        <Phone className="size-5 text-neutral-700" />
                                        <span>{siteConfig.phone}</span>
                                    </a>

                                    <a
                                        href={siteConfig.emailHref}
                                        className="flex items-center gap-3 rounded-2xl border border-neutral-200 p-4 text-sm transition hover:border-neutral-950"
                                    >
                                        <Mail className="size-5 text-neutral-700" />
                                        <span>{siteConfig.email}</span>
                                    </a>

                                    <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 p-4 text-sm">
                                        <MapPin className="size-5 text-neutral-700" />
                                        <span>{siteConfig.address}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-3xl border border-neutral-200 bg-neutral-950 p-6 text-white shadow-sm">
                                <ShieldCheck className="size-7" aria-hidden="true" />
                                <h3 className="mt-4 text-xl font-semibold">
                                    Texniki seçimdə dəstək
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-white/70">
                                    Məhsul seçimi, kamera sayı, NVR/DVR, PoE switch və kabel
                                    ehtiyaclarını birlikdə hesablaya bilərik.
                                </p>

                                <div className="mt-5 space-y-3 text-sm text-white/80">
                                    {[
                                        "Obyektə uyğun məhsul seçimi",
                                        "Qiymət təklifi və avadanlıq siyahısı",
                                        "Quraşdırma üçün texniki məsləhət",
                                    ].map((item) => (
                                        <div key={item} className="flex items-center gap-2">
                                            <CheckCircle2 className="size-4" aria-hidden="true" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Link
                                href="/products"
                                className="flex items-center justify-between rounded-3xl border border-neutral-200 bg-white p-6 text-sm font-medium shadow-sm transition hover:border-neutral-950"
                            >
                                <span>Məhsullara bax</span>
                                <MessageCircle className="size-5" aria-hidden="true" />
                            </Link>
                        </aside>
                    </div>
                </Container>
            </section>
        </main>
    );
}
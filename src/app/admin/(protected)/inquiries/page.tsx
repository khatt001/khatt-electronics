import {
  deleteInquiry,
  updateInquiryStatus,
} from "@/app/admin/(protected)/inquiries/actions";
import { getAdminInquiries } from "@/services/admin-inquiries";

type AdminInquiriesPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("az-AZ", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function getStatusLabel(status: string) {
  if (status === "contacted") return "Əlaqə saxlanılıb";
  if (status === "closed") return "Bağlanıb";
  return "Yeni";
}

function getStatusClassName(status: string) {
  if (status === "contacted") {
    return "bg-blue-50 text-blue-700";
  }

  if (status === "closed") {
    return "bg-neutral-100 text-neutral-500";
  }

  return "bg-emerald-50 text-emerald-700";
}

export default async function AdminInquiriesPage({
  searchParams,
}: AdminInquiriesPageProps) {
  const query = await searchParams;
  const inquiries = await getAdminInquiries();

  return (
    <div>
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.24em] text-neutral-400">
          Sorğular
        </p>
        <h2 className="mt-2 text-3xl font-semibold">Müştəri sorğuları</h2>
        <p className="mt-2 text-sm text-neutral-500">
          Son {inquiries.length} sorğu göstərilir
        </p>
      </div>

      {query.error ? (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {decodeURIComponent(query.error)}
        </div>
      ) : null}

      <div className="space-y-4">
        {inquiries.length > 0 ? (
          inquiries.map((inquiry) => (
            <article
              key={inquiry.id}
              className="rounded-3xl border border-neutral-200 p-5"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold text-neutral-950">
                      {inquiry.full_name}
                    </h3>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusClassName(
                        inquiry.status
                      )}`}
                    >
                      {getStatusLabel(inquiry.status)}
                    </span>

                    {inquiry.source ? (
                      <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
                        {inquiry.source}
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-1 text-xs text-neutral-400">
                    {formatDate(inquiry.created_at)}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {inquiry.status !== "contacted" ? (
                    <form action={updateInquiryStatus.bind(null, inquiry.id)}>
                      <input type="hidden" name="status" value="contacted" />
                      <button
                        type="submit"
                        className="rounded-full border border-neutral-200 px-4 py-2 text-xs font-medium transition hover:border-neutral-950"
                      >
                        Əlaqə saxlanıldı
                      </button>
                    </form>
                  ) : null}

                  {inquiry.status !== "closed" ? (
                    <form action={updateInquiryStatus.bind(null, inquiry.id)}>
                      <input type="hidden" name="status" value="closed" />
                      <button
                        type="submit"
                        className="rounded-full border border-neutral-200 px-4 py-2 text-xs font-medium transition hover:border-neutral-950"
                      >
                        Bağla
                      </button>
                    </form>
                  ) : null}

                  {inquiry.status !== "new" ? (
                    <form action={updateInquiryStatus.bind(null, inquiry.id)}>
                      <input type="hidden" name="status" value="new" />
                      <button
                        type="submit"
                        className="rounded-full border border-neutral-200 px-4 py-2 text-xs font-medium transition hover:border-neutral-950"
                      >
                        Yeniyə qaytar
                      </button>
                    </form>
                  ) : null}

                  <form action={deleteInquiry.bind(null, inquiry.id)}>
                    <button
                      type="submit"
                      className="rounded-full border border-red-200 px-4 py-2 text-xs font-medium text-red-600 transition hover:border-red-600"
                    >
                      Sil
                    </button>
                  </form>
                </div>
              </div>

              <div className="mt-5 grid gap-3 text-sm text-neutral-600 md:grid-cols-3">
                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="mb-1 text-xs uppercase tracking-[0.16em] text-neutral-400">
                    Telefon
                  </p>
                  {inquiry.phone ? (
                    <a
                      href={`tel:${inquiry.phone}`}
                      className="underline underline-offset-4"
                    >
                      {inquiry.phone}
                    </a>
                  ) : (
                    <p>Yoxdur</p>
                  )}
                </div>

                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="mb-1 text-xs uppercase tracking-[0.16em] text-neutral-400">
                    Email
                  </p>
                  {inquiry.email ? (
                    <a
                      href={`mailto:${inquiry.email}`}
                      className="underline underline-offset-4"
                    >
                      {inquiry.email}
                    </a>
                  ) : (
                    <p>Yoxdur</p>
                  )}
                </div>

                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="mb-1 text-xs uppercase tracking-[0.16em] text-neutral-400">
                    Şirkət
                  </p>
                  <p>{inquiry.company_name || "Yoxdur"}</p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl bg-neutral-50 p-4">
                <p className="mb-2 text-xs uppercase tracking-[0.16em] text-neutral-400">
                  Mesaj
                </p>
                <p className="whitespace-pre-line leading-7 text-neutral-700">
                  {inquiry.message}
                </p>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-3xl border border-dashed border-neutral-300 p-10 text-center text-sm text-neutral-500">
            Hələ sorğu yoxdur.
          </div>
        )}
      </div>
    </div>
  );
}
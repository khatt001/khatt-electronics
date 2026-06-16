import type { Metadata } from "next";
import { Suspense } from "react";

import { AdminLoginForm } from "@/components/admin/admin-login-form";

export const metadata: Metadata = {
  title: "Admin giriş",
  description: "KHATT Electronics admin panelinə giriş.",
};

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-neutral-950 px-4 py-12 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-md items-center">
        <div className="w-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur md:p-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
            KHATT Admin
          </p>

          <h1 className="text-4xl font-semibold tracking-tight">Giriş</h1>

          <p className="mt-4 leading-7 text-white/60">
            Admin panelə daxil olmaq üçün hesab məlumatlarını daxil edin.
          </p>

          <Suspense fallback={null}>
            <AdminLoginForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}

"use client";

import { useSearchParams } from "next/navigation";

import { loginAdmin } from "@/app/admin/login/actions";

export function AdminLoginForm() {
  const searchParams = useSearchParams();

  const nextPath = searchParams.get("next") ?? "/admin";

  const error = searchParams.get("error");

  return (
    <form action={loginAdmin} className="mt-8 space-y-4">
      <input type="hidden" name="nextPath" value={nextPath} />

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-white/75"
        >
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="h-12 w-full rounded-lg border border-white/15 bg-white/10 px-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/15"
          placeholder="admin@khatt.electronics"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-white/75"
        >
          Şifrə
        </label>

        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          minLength={8}
          className="h-12 w-full rounded-lg border border-white/15 bg-white/10 px-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/15"
          placeholder="••••••••"
        />
      </div>

      {error === "invalid" ? (
        <p className="rounded-lg border border-red-400/20 bg-red-500/10 p-3 text-sm text-red-200">
          Email və ya şifrə yanlışdır.
        </p>
      ) : null}

      {error === "missing" ? (
        <p className="rounded-lg border border-red-400/20 bg-red-500/10 p-3 text-sm text-red-200">
          Email və şifrə daxil edilməlidir.
        </p>
      ) : null}

      <button
        type="submit"
        className="h-12 w-full rounded-lg bg-white text-sm font-semibold text-neutral-950 transition hover:bg-emerald-100 hover:text-emerald-800"
      >
        Daxil ol
      </button>
    </form>
  );
}

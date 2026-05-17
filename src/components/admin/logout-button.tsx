import { LogOut } from "lucide-react";
import { logoutAdmin } from "@/app/admin/(protected)/actions";

export function LogoutButton() {
  return (
    <form action={logoutAdmin}>
      <button
        type="submit"
        className="mt-6 inline-flex w-full items-center justify-center rounded-2xl border border-neutral-200 px-4 py-3 text-sm font-medium text-neutral-700 transition hover:border-neutral-950 hover:text-neutral-950"
      >
        <LogOut className="mr-2 size-4" aria-hidden="true" />
        Çıxış et
      </button>
    </form>
  );
}
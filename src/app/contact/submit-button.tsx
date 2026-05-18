"use client";

import { useFormStatus } from "react-dom";

export function ContactSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="h-12 rounded-full bg-neutral-950 px-8 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Göndərilir..." : "Sorğu göndər"}
    </button>
  );
}
"use client";

import { LoaderCircle, Send } from "lucide-react";
import { useFormStatus } from "react-dom";

type ContactSubmitButtonProps = {
  label?: string;
  pendingLabel?: string;
};

export function ContactSubmitButton({
  label = "Sorğu göndər",
  pendingLabel = "Göndərilir...",
}: ContactSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className="inline-flex min-h-12 items-center justify-center rounded-lg bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-white"
    >
      {pending ? (
        <LoaderCircle
          className="mr-2 size-4 animate-spin"
          aria-hidden="true"
        />
      ) : (
        <Send
          className="mr-2 size-4"
          aria-hidden="true"
        />
      )}

      {pending ? pendingLabel : label}
    </button>
  );
}
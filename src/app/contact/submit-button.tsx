"use client";

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
      className="inline-flex h-12 items-center justify-center rounded-full bg-neutral-950 px-7 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? pendingLabel : label}
    </button>
  );
}
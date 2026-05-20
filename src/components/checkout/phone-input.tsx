"use client";

import { useMemo, useState } from "react";

export type PhoneInputLocale = "az" | "en" | "ru";

type PhoneInputProps = {
  name: string;
  required?: boolean;
  defaultValue?: string;
  locale?: PhoneInputLocale;
};

const phoneInputTranslations = {
  az: {
    placeholder: "+994 XX XXX XX XX",
    ariaLabel: "Telefon nömrəsi",
  },
  en: {
    placeholder: "+994 XX XXX XX XX",
    ariaLabel: "Phone number",
  },
  ru: {
    placeholder: "+994 XX XXX XX XX",
    ariaLabel: "Номер телефона",
  },
} as const;

function normalizePhoneValue(value: string) {
  const digits = value.replace(/\D/g, "");

  if (!digits) return "";

  if (digits.startsWith("994")) {
    return `+${digits.slice(0, 12)}`;
  }

  if (digits.startsWith("0")) {
    return `+994${digits.slice(1, 10)}`;
  }

  return `+994${digits.slice(0, 9)}`;
}

function formatPhoneValue(value: string) {
  const normalized = normalizePhoneValue(value);
  const digits = normalized.replace(/\D/g, "");

  if (!digits) return "";

  const country = digits.slice(0, 3);
  const operator = digits.slice(3, 5);
  const first = digits.slice(5, 8);
  const second = digits.slice(8, 10);
  const third = digits.slice(10, 12);

  return [
    country ? `+${country}` : "",
    operator,
    first,
    second,
    third,
  ]
    .filter(Boolean)
    .join(" ");
}

export function PhoneInput({
  name,
  required = false,
  defaultValue = "",
  locale = "az",
}: PhoneInputProps) {
  const t = phoneInputTranslations[locale];

  const [displayValue, setDisplayValue] = useState(() =>
    formatPhoneValue(defaultValue)
  );

  const normalizedValue = useMemo(
    () => normalizePhoneValue(displayValue),
    [displayValue]
  );

  return (
    <>
      <input type="hidden" name={name} value={normalizedValue} />

      <input
        type="tel"
        required={required}
        value={displayValue}
        onChange={(event) => {
          setDisplayValue(formatPhoneValue(event.target.value));
        }}
        placeholder={t.placeholder}
        aria-label={t.ariaLabel}
        className="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
      />
    </>
  );
}
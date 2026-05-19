"use client";

type PhoneInputProps = {
  name: string;
  defaultValue?: string;
  required?: boolean;
};

function formatAzerbaijanPhone(value: string) {
  const digits = value.replace(/\D/g, "");

  let localDigits = digits;

  if (localDigits.startsWith("994")) {
    localDigits = localDigits.slice(3);
  }

  if (localDigits.startsWith("0")) {
    localDigits = localDigits.slice(1);
  }

  localDigits = localDigits.slice(0, 9);

  const p1 = localDigits.slice(0, 2);
  const p2 = localDigits.slice(2, 5);
  const p3 = localDigits.slice(5, 7);
  const p4 = localDigits.slice(7, 9);

  let result = "+994";

  if (p1) result += ` ${p1}`;
  if (p2) result += ` ${p2}`;
  if (p3) result += ` ${p3}`;
  if (p4) result += ` ${p4}`;

  return result;
}

export function PhoneInput({
  name,
  defaultValue = "",
  required = false,
}: PhoneInputProps) {
  return (
    <input
      name={name}
      required={required}
      type="tel"
      inputMode="tel"
      defaultValue={defaultValue || "+994 "}
      onChange={(event) => {
        event.currentTarget.value = formatAzerbaijanPhone(
          event.currentTarget.value
        );
      }}
      onFocus={(event) => {
        if (!event.currentTarget.value.trim()) {
          event.currentTarget.value = "+994 ";
        }
      }}
      className="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
      placeholder="+994 50 123 45 67"
    />
  );
}
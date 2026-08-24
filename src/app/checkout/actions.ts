"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { localizedPath } from "@/lib/i18n";
import { supabaseAdmin } from "@/lib/supabase/admin";

type CheckoutLocale = "az" | "en" | "ru";

type CreatedOrder = {
  order_id: string;
  order_number: string;
};
type TurnstileResponse = {
  success: boolean;
  "error-codes"?: string[];
};
const translations = {
  az: {
    fullNameMin: "Ad və soyad minimum 2 simvol olmalıdır.",
    phoneInvalid: "Telefon nömrəsi düzgün deyil.",
    emailInvalid: "Email düzgün deyil.",
    cityRequired: "Şəhər yazılmalıdır.",
    addressMin: "Ünvan minimum 5 simvol olmalıdır.",
    emptyCart: "Səbət boşdur.",
    invalidCart: "Səbət məlumatı düzgün deyil.",
    securityFailed:
  "Təhlükəsizlik yoxlaması uğursuz oldu. Yenidən cəhd edin.",
    unavailable:
      "Sifariş yaradıla bilmədi. Stoku yoxlayıb yenidən cəhd edin.",
  },
  en: {
    fullNameMin: "Full name must be at least 2 characters.",
    phoneInvalid: "Phone number is invalid.",
    emailInvalid: "Email is invalid.",
    cityRequired: "City is required.",
    addressMin: "Address must be at least 5 characters.",
    emptyCart: "Cart is empty.",
    invalidCart: "Cart data is invalid.",
    securityFailed:
  "Security verification failed. Please try again.",
    unavailable:
      "The order could not be created. Check stock and try again.",
  },
  ru: {
    fullNameMin: "Имя и фамилия должны быть минимум 2 символа.",
    phoneInvalid: "Номер телефона неверный.",
    emailInvalid: "Email неверный.",
    cityRequired: "Укажите город.",
    addressMin: "Адрес должен содержать минимум 5 символов.",
    emptyCart: "Корзина пуста.",
    invalidCart: "Данные корзины неверны.",
    securityFailed:
  "Проверка безопасности не пройдена. Попробуйте снова.",
    unavailable:
      "Не удалось создать заказ. Проверьте наличие и повторите попытку.",
  },
} as const;

const itemSchema = z.object({
  id: z.string().uuid(),
  quantity: z.coerce.number().int().min(1).max(999),
});
async function verifyTurnstileToken(token: string) {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey || !token) {
    return false;
  }

  try {
    const body = new URLSearchParams({
      secret: secretKey,
      response: token,
    });

    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return false;
    }

    const result = (await response.json()) as TurnstileResponse;

    return result.success;
  } catch {
    return false;
  }
}
function getCheckoutSchema(locale: CheckoutLocale) {
  const t = translations[locale];

  return z.object({
    customer_name: z.string().trim().min(2, t.fullNameMin).max(120),
    phone: z.string().trim().min(7, t.phoneInvalid).max(30),
    email: z
      .string()
      .trim()
      .email(t.emailInvalid)
      .max(254)
      .optional()
      .or(z.literal("")),
    city: z.string().trim().min(2, t.cityRequired).max(100),
    address: z.string().trim().min(5, t.addressMin).max(500),
    note: z.string().trim().max(2000).optional(),
    payment_method: z.literal("cash"),
    items: z.array(itemSchema).min(1, t.emptyCart).max(100),
  });
}

function errorUrl(locale: CheckoutLocale, message: string) {
  return `${localizedPath(
    "/checkout",
    locale,
  )}?error=${encodeURIComponent(message)}`;
}

function successUrl(locale: CheckoutLocale, orderNumber: string) {
  return `${localizedPath(
    "/checkout/success",
    locale,
  )}?order=${encodeURIComponent(orderNumber)}`;
}

function revalidateOrderPaths() {
  for (const path of [
    "/",
    "/en",
    "/ru",
    "/products",
    "/en/products",
    "/ru/products",
    "/admin/orders",
    "/admin/products",
  ]) {
    revalidatePath(path);
  }
}

export async function createOrder(formData: FormData) {
  const localeValue = String(formData.get("locale") ?? "az");

  const locale: CheckoutLocale =
    localeValue === "en" || localeValue === "ru"
      ? localeValue
      : "az";

const t = translations[locale];

const turnstileToken = String(
  formData.get("cf-turnstile-response") ?? "",
).trim();

const isHuman = await verifyTurnstileToken(turnstileToken);

if (!isHuman) {
  redirect(errorUrl(locale, t.securityFailed));
}

let items: unknown;

  try {
    items = JSON.parse(String(formData.get("items") ?? "[]"));
  } catch {
    redirect(errorUrl(locale, t.invalidCart));
  }

  const parsed = getCheckoutSchema(locale).safeParse({
    customer_name: String(formData.get("customer_name") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    email: String(formData.get("email") ?? ""),
    city: String(formData.get("city") ?? ""),
    address: String(formData.get("address") ?? ""),
    note: String(formData.get("note") ?? ""),
    payment_method: String(
      formData.get("payment_method") ?? "cash",
    ),
    items,
  });

  if (!parsed.success) {
    redirect(
      errorUrl(
        locale,
        parsed.error.issues[0]?.message ?? t.invalidCart,
      ),
    );
  }

  const data = parsed.data;

  const uniqueProductIds = new Set(
    data.items.map((item) => item.id),
  );

  if (uniqueProductIds.size !== data.items.length) {
    redirect(errorUrl(locale, t.invalidCart));
  }

  const { data: result, error } = await supabaseAdmin.rpc(
    "create_order_transactional",
    {
      p_customer_name: data.customer_name,
      p_phone: data.phone,
      p_email: data.email || "",
      p_city: data.city,
      p_address: data.address,
      p_note: data.note || "",
      p_payment_method: data.payment_method,
      p_locale: locale,
      p_items: data.items,
    },
  );

  const order = Array.isArray(result)
    ? (result[0] as CreatedOrder | undefined)
    : undefined;

  if (error || !order?.order_number) {
    redirect(errorUrl(locale, t.unavailable));
  }

  revalidateOrderPaths();

  redirect(successUrl(locale, order.order_number));
}
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { localizedPath } from "@/lib/i18n";

type CheckoutLocale = "az" | "en" | "ru";

type ProductForCheckout = {
  id: string;
  name_az: string;
  name_en: string | null;
  name_ru: string | null;
  slug: string;
  price: number | string | null;
  price_visible: boolean;
  stock_status: "in_stock" | "out_of_stock" | "pre_order";
  stock_quantity: number | null;
  status: string;
};

const checkoutActionTranslations = {
  az: {
    fullNameMin: "Ad və soyad minimum 2 simvol olmalıdır.",
    phoneInvalid: "Telefon nömrəsi düzgün deyil.",
    emailInvalid: "Email düzgün deyil.",
    cityRequired: "Şəhər yazılmalıdır.",
    addressMin: "Ünvan minimum 5 simvol olmalıdır.",
    emptyCart: "Səbət boşdur.",
    invalidCartData: "Səbət məlumatı düzgün deyil.",
    invalidData: "Məlumatlar düzgün deyil.",
    cardUnavailable:
      "Kartla ödəniş hələ aktiv deyil. Zəhmət olmasa nağd ödənişi seçin.",
    productNotFound: "Səbətdəki məhsullardan biri tapılmadı.",
    productInactive: "artıq aktiv məhsul deyil.",
    productNotInStock: "stokda deyil.",
    productOutOfStock: "stokda yoxdur.",
    stockOnlyPrefix: "üçün stokda yalnız",
    stockOnlySuffix: "ədəd var.",
    priceNotActive: "üçün qiymət aktiv deyil.",
    priceInvalid: "üçün qiymət düzgün deyil.",
    orderNotCreated: "Sifariş yaradılmadı.",
    orderItemsNotAdded: "Sifariş məhsulları əlavə edilmədi.",
    stockUpdateFailed: "üçün stok yenilənmədi:",
  },
  en: {
    fullNameMin: "Full name must be at least 2 characters.",
    phoneInvalid: "Phone number is invalid.",
    emailInvalid: "Email is invalid.",
    cityRequired: "City is required.",
    addressMin: "Address must be at least 5 characters.",
    emptyCart: "Cart is empty.",
    invalidCartData: "Cart data is invalid.",
    invalidData: "Information is invalid.",
    cardUnavailable:
      "Card payment is not active yet. Please choose cash payment.",
    productNotFound: "One of the products in the cart was not found.",
    productInactive: "is no longer an active product.",
    productNotInStock: "is not in stock.",
    productOutOfStock: "is out of stock.",
    stockOnlyPrefix: "has only",
    stockOnlySuffix: "pcs in stock.",
    priceNotActive: "price is not active.",
    priceInvalid: "price is invalid.",
    orderNotCreated: "Order was not created.",
    orderItemsNotAdded: "Order products were not added.",
    stockUpdateFailed: "stock was not updated:",
  },
  ru: {
    fullNameMin: "Имя и фамилия должны быть минимум 2 символа.",
    phoneInvalid: "Номер телефона неверный.",
    emailInvalid: "Email неверный.",
    cityRequired: "Укажите город.",
    addressMin: "Адрес должен быть минимум 5 символов.",
    emptyCart: "Корзина пуста.",
    invalidCartData: "Данные корзины неверные.",
    invalidData: "Данные неверные.",
    cardUnavailable:
      "Оплата картой пока не активна. Пожалуйста, выберите оплату наличными.",
    productNotFound: "Один из товаров в корзине не найден.",
    productInactive: "больше не является активным товаром.",
    productNotInStock: "нет в наличии.",
    productOutOfStock: "нет в наличии.",
    stockOnlyPrefix: "в наличии только",
    stockOnlySuffix: "шт.",
    priceNotActive: "цена не активна.",
    priceInvalid: "цена неверная.",
    orderNotCreated: "Заказ не создан.",
    orderItemsNotAdded: "Товары заказа не добавлены.",
    stockUpdateFailed: "наличие не обновлено:",
  },
} as const;

const checkoutItemSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  slug: z.string().min(1),
  price: z.coerce.number().min(0),
  quantity: z.coerce.number().int().min(1),
});

function getLocalizedProductName(
  product: ProductForCheckout,
  locale: CheckoutLocale,
) {
  if (locale === "en") return product.name_en || product.name_az;
  if (locale === "ru") return product.name_ru || product.name_az;

  return product.name_az;
}

function getCheckoutSchema(locale: CheckoutLocale) {
  const t = checkoutActionTranslations[locale];

  return z.object({
    locale: z.enum(["az", "en", "ru"]).default("az"),
    customer_name: z.string().min(2, t.fullNameMin),
    phone: z.string().min(7, t.phoneInvalid),
    email: z.string().email(t.emailInvalid).optional().or(z.literal("")),
    city: z.string().min(2, t.cityRequired),
    address: z.string().min(5, t.addressMin),
    note: z.string().optional(),
    payment_method: z.enum(["cash", "card"]),
    items: z.array(checkoutItemSchema).min(1, t.emptyCart),
  });
}

function createOrderNumber() {
  const date = new Date();
  const datePart = date.toISOString().slice(0, 10).replaceAll("-", "");
  const randomPart = Math.floor(1000 + Math.random() * 9000);

  return `KH-${datePart}-${randomPart}`;
}

function getErrorUrl(message: string, locale: CheckoutLocale = "az") {
  return `${localizedPath("/checkout", locale)}?error=${encodeURIComponent(
    message,
  )}`;
}

function getSuccessUrl(orderNumber: string, locale: CheckoutLocale) {
  return `${localizedPath(
    "/checkout/success",
    locale,
  )}?order=${encodeURIComponent(orderNumber)}`;
}

function normalizePrice(value: number | string | null) {
  if (value === null) return null;

  const price = Number(value);

  if (!Number.isFinite(price) || price < 0) {
    return null;
  }

  return price;
}

function productMessage(productName: string, message: string) {
  return `${productName} ${message}`;
}

function stockLimitMessage(
  productName: string,
  stockQuantity: number,
  locale: CheckoutLocale,
) {
  const t = checkoutActionTranslations[locale];

  if (locale === "ru") {
    return `${productName}: ${t.stockOnlyPrefix} ${stockQuantity} ${t.stockOnlySuffix}`;
  }

  return `${productName} ${t.stockOnlyPrefix} ${stockQuantity} ${t.stockOnlySuffix}`;
}

function revalidateProductPaths(productSlug: string) {
  revalidatePath(`/products/${productSlug}`);
  revalidatePath(`/en/products/${productSlug}`);
  revalidatePath(`/ru/products/${productSlug}`);
}

function revalidateCheckoutRelatedPaths() {
  revalidatePath("/");
  revalidatePath("/en");
  revalidatePath("/ru");

  revalidatePath("/products");
  revalidatePath("/en/products");
  revalidatePath("/ru/products");

  revalidatePath("/admin/orders");
  revalidatePath("/admin/products");
}

export async function createOrder(formData: FormData) {
  const localeRaw = String(formData.get("locale") ?? "az");
  const locale: CheckoutLocale =
    localeRaw === "en" || localeRaw === "ru" ? localeRaw : "az";
  const t = checkoutActionTranslations[locale];

  const rawItems = String(formData.get("items") ?? "[]");

  let items: unknown;

  try {
    items = JSON.parse(rawItems);
  } catch {
    redirect(getErrorUrl(t.invalidCartData, locale));
  }

  const checkoutSchema = getCheckoutSchema(locale);

  const parsed = checkoutSchema.safeParse({
    locale,
    customer_name: String(formData.get("customer_name") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    email: String(formData.get("email") ?? ""),
    city: String(formData.get("city") ?? ""),
    address: String(formData.get("address") ?? ""),
    note: String(formData.get("note") ?? ""),
    payment_method: String(formData.get("payment_method") ?? "cash"),
    items,
  });

  if (!parsed.success) {
    redirect(
      getErrorUrl(parsed.error.issues[0]?.message ?? t.invalidData, locale),
    );
  }

  const data = parsed.data;

  if (data.payment_method === "card") {
    redirect(getErrorUrl(t.cardUnavailable, locale));
  }

  const productIds = data.items.map((item) => item.id);

  const { data: products, error: productsError } = await supabaseAdmin
    .from("products")
    .select(
      `
      id,
      name_az,
      name_en,
      name_ru,
      slug,
      price,
      price_visible,
      stock_status,
      stock_quantity,
      status
    `,
    )
    .in("id", productIds)
    .returns<ProductForCheckout[]>();

  if (productsError) {
    redirect(getErrorUrl(productsError.message, locale));
  }

  if (!products || products.length !== data.items.length) {
    redirect(getErrorUrl(t.productNotFound, locale));
  }

  const productsById = new Map(
    products.map((product) => [product.id, product]),
  );

  const verifiedItems = data.items.map((item) => {
    const product = productsById.get(item.id);

    if (!product) {
      redirect(getErrorUrl(t.productNotFound, locale));
    }

    const productName = getLocalizedProductName(product, locale);

    if (product.status !== "active") {
      redirect(
        getErrorUrl(productMessage(productName, t.productInactive), locale),
      );
    }

    if (product.stock_status !== "in_stock") {
      redirect(
        getErrorUrl(productMessage(productName, t.productNotInStock), locale),
      );
    }

    const stockQuantity = product.stock_quantity ?? 0;

    if (stockQuantity <= 0) {
      redirect(
        getErrorUrl(productMessage(productName, t.productOutOfStock), locale),
      );
    }

    if (item.quantity > stockQuantity) {
      redirect(
        getErrorUrl(
          stockLimitMessage(productName, stockQuantity, locale),
          locale,
        ),
      );
    }

    if (!product.price_visible) {
      redirect(
        getErrorUrl(productMessage(productName, t.priceNotActive), locale),
      );
    }

    const unitPrice = normalizePrice(product.price);

    if (unitPrice === null) {
      redirect(
        getErrorUrl(productMessage(productName, t.priceInvalid), locale),
      );
    }

    return {
      productId: product.id,
      productName,
      productSlug: product.slug,
      unitPrice,
      quantity: item.quantity,
      lineTotal: unitPrice * item.quantity,
      stockQuantity,
    };
  });

  const subtotal = verifiedItems.reduce(
    (total, item) => total + item.lineTotal,
    0,
  );
  const deliveryFee = 0;
  const total = subtotal + deliveryFee;

  const { data: order, error: orderError } = await supabaseAdmin
    .from("orders")
    .insert({
      order_number: createOrderNumber(),
      customer_name: data.customer_name.trim(),
      phone: data.phone.trim(),
      email: data.email?.trim() || null,
      city: data.city.trim(),
      address: data.address.trim(),
      note: data.note?.trim() || null,
      payment_method: data.payment_method,
      payment_status: "pending",
      order_status: "new",
      subtotal,
      delivery_fee: deliveryFee,
      total,
    })
    .select("id, order_number")
    .single();

  if (orderError || !order) {
    redirect(getErrorUrl(orderError?.message ?? t.orderNotCreated, locale));
  }

  const orderItems = verifiedItems.map((item) => ({
    order_id: order.id,
    product_id: item.productId,
    product_name: item.productName,
    product_slug: item.productSlug,
    unit_price: item.unitPrice,
    quantity: item.quantity,
    line_total: item.lineTotal,
  }));

  const { error: itemsError } = await supabaseAdmin
    .from("order_items")
    .insert(orderItems);

  if (itemsError) {
    await supabaseAdmin.from("orders").delete().eq("id", order.id);
    redirect(getErrorUrl(itemsError.message || t.orderItemsNotAdded, locale));
  }

  for (const item of verifiedItems) {
    const newStockQuantity = Math.max(0, item.stockQuantity - item.quantity);

    const { error: stockError } = await supabaseAdmin
      .from("products")
      .update({
        stock_quantity: newStockQuantity,
        stock_status: newStockQuantity > 0 ? "in_stock" : "out_of_stock",
      })
      .eq("id", item.productId);

    if (stockError) {
      await supabaseAdmin.from("order_items").delete().eq("order_id", order.id);
      await supabaseAdmin.from("orders").delete().eq("id", order.id);

      redirect(
        getErrorUrl(
          `${item.productName} ${t.stockUpdateFailed} ${stockError.message}`,
          locale,
        ),
      );
    }

    revalidateProductPaths(item.productSlug);
  }

  revalidateCheckoutRelatedPaths();

  redirect(getSuccessUrl(order.order_number, locale));
}
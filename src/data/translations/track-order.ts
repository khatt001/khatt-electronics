export type TrackOrderLocale = "az" | "en" | "ru";

export const trackOrderTranslations = {
  az: {
    metadataTitle: "Sifariş izləmə",
    metadataDescription:
      "KHATT Electronics sifariş izləmə səhifəsi. Sifariş nömrəsi və telefonla sifariş statusunu yoxlayın.",

    eyebrow: "Sifariş izləmə",
    title: "Sifariş statusunu yoxla",
    description:
      "Sifariş nömrənizi və telefon nömrənizi daxil edərək sifarişin hazırkı vəziyyətini görə bilərsiniz.",

    formTitle: "Sifarişi tap",
    orderNumberLabel: "Sifariş nömrəsi",
    phoneLabel: "Telefon nömrəsi",
    submitButton: "Yoxla",

    orderFound: "Sifariş tapıldı",
    total: "Cəmi",
    orderStatus: "Sifariş statusu",
    paymentMethod: "Ödəniş üsulu",
    paymentStatus: "Ödəniş statusu",
    products: "Məhsullar",

    notFoundTitle: "Sifariş tapılmadı",
    notFoundDescription:
      "Sifariş nömrəsi və telefon nömrəsini düzgün daxil etdiyinizə əmin olun.",

    emptyTitle: "Sifariş məlumatlarını daxil edin",
    emptyDescription:
      "Checkout sonrası verilən sifariş nömrəsini və telefon nömrənizi yazın.",

    statusNew: "Yeni",
    statusConfirmed: "Təsdiqləndi",
    statusPreparing: "Hazırlanır",
    statusDelivered: "Təhvil verildi",
    statusCancelled: "Ləğv edildi",
    cancelledNotice: "Sifariş ləğv edilib",

    paymentPending: "Gözləyir",
    paymentPaid: "Ödənilib",
    paymentFailed: "Uğursuz",

    paymentCash: "Nağd ödəniş",
    paymentCard: "Kartla ödəniş",

    localeCode: "az-AZ",
  },

  en: {
    metadataTitle: "Track order",
    metadataDescription:
      "KHATT Electronics order tracking page. Check your order status with order number and phone number.",

    eyebrow: "Track order",
    title: "Check your order status",
    description:
      "Enter your order number and phone number to see the current status of your order.",

    formTitle: "Find order",
    orderNumberLabel: "Order number",
    phoneLabel: "Phone number",
    submitButton: "Check",

    orderFound: "Order found",
    total: "Total",
    orderStatus: "Order status",
    paymentMethod: "Payment method",
    paymentStatus: "Payment status",
    products: "Products",

    notFoundTitle: "Order not found",
    notFoundDescription:
      "Make sure you entered the correct order number and phone number.",

    emptyTitle: "Enter order information",
    emptyDescription:
      "Enter the order number given after checkout and your phone number.",

    statusNew: "New",
    statusConfirmed: "Confirmed",
    statusPreparing: "Preparing",
    statusDelivered: "Delivered",
    statusCancelled: "Cancelled",
    cancelledNotice: "Order has been cancelled",

    paymentPending: "Pending",
    paymentPaid: "Paid",
    paymentFailed: "Failed",

    paymentCash: "Cash payment",
    paymentCard: "Card payment",

    localeCode: "en-US",
  },

  ru: {
    metadataTitle: "Отследить заказ",
    metadataDescription:
      "Страница отслеживания заказа KHATT Electronics. Проверьте статус заказа по номеру заказа и телефону.",

    eyebrow: "Отследить заказ",
    title: "Проверьте статус заказа",
    description:
      "Введите номер заказа и телефон, чтобы увидеть текущий статус заказа.",

    formTitle: "Найти заказ",
    orderNumberLabel: "Номер заказа",
    phoneLabel: "Номер телефона",
    submitButton: "Проверить",

    orderFound: "Заказ найден",
    total: "Итого",
    orderStatus: "Статус заказа",
    paymentMethod: "Способ оплаты",
    paymentStatus: "Статус оплаты",
    products: "Товары",

    notFoundTitle: "Заказ не найден",
    notFoundDescription:
      "Убедитесь, что номер заказа и телефон введены правильно.",

    emptyTitle: "Введите данные заказа",
    emptyDescription:
      "Введите номер заказа, полученный после checkout, и ваш номер телефона.",

    statusNew: "Новый",
    statusConfirmed: "Подтвержден",
    statusPreparing: "Готовится",
    statusDelivered: "Доставлен",
    statusCancelled: "Отменен",
    cancelledNotice: "Заказ отменен",

    paymentPending: "Ожидает",
    paymentPaid: "Оплачен",
    paymentFailed: "Ошибка",

    paymentCash: "Наличная оплата",
    paymentCard: "Оплата картой",

    localeCode: "ru-RU",
  },
} as const;

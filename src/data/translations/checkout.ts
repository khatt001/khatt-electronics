export type CheckoutLocale = "az" | "en" | "ru";

export const checkoutTranslations = {
  az: {
    metadataTitle: "Checkout",
    metadataDescription:
      "KHATT Electronics checkout səhifəsi. Sifariş məlumatlarını daxil edin və sifarişi tamamlayın.",

    eyebrow: "Checkout",
    title: "Sifarişi tamamla",
    description:
      "Əlaqə və çatdırılma məlumatlarını daxil edin, sifarişinizi tamamlayın.",

    customerInfoTitle: "Müştəri məlumatları",
    syncingMessage:
      "Səbət məlumatları yenilənir. Zəhmət olmasa gözləyin...",

    fullNameLabel: "Ad və soyad",
    fullNamePlaceholder: "Ad Soyad",
    phoneLabel: "Telefon",
    emailLabel: "Email",
    emailPlaceholder: "email@example.com",
    cityLabel: "Şəhər",
    cityPlaceholder: "Bakı",
    cityDefault: "Bakı",
    addressLabel: "Ünvan",
    addressPlaceholder: "Küçə, bina, mənzil / obyekt ünvanı",
    noteLabel: "Qeyd",
    notePlaceholder: "Əlavə qeydiniz varsa yazın...",

    paymentTitle: "Ödəniş üsulu",
    cashPaymentTitle: "Nağd ödəniş",
    cashPaymentDescription:
      "Sifariş təsdiqləndikdən sonra nağd ödəniş.",
    cardPaymentTitle: "Kartla ödəniş",
    cardPaymentDescription: "Tezliklə aktiv olacaq.",

    summaryTitle: "Sifariş xülasəsi",
    subtotal: "Ara cəm",
    delivery: "Çatdırılma",
    total: "Cəmi",
    confirmButton: "Sifarişi təsdiqlə",
    updatingButton: "Yenilənir...",
    backToCart: "Səbətə qayıt",

    emptyEyebrow: "Boş səbət",
    emptyTitle: "Checkout üçün səbətdə məhsul yoxdur",
    emptyButton: "Məhsullara bax",
  },

  en: {
    metadataTitle: "Checkout",
    metadataDescription:
      "KHATT Electronics checkout page. Enter your order details and complete your order.",

    eyebrow: "Checkout",
    title: "Complete order",
    description:
      "Enter your contact and delivery information to complete your order.",

    customerInfoTitle: "Customer information",
    syncingMessage: "Cart data is updating. Please wait...",

    fullNameLabel: "Full name",
    fullNamePlaceholder: "Full name",
    phoneLabel: "Phone",
    emailLabel: "Email",
    emailPlaceholder: "email@example.com",
    cityLabel: "City",
    cityPlaceholder: "Baku",
    cityDefault: "Baku",
    addressLabel: "Address",
    addressPlaceholder: "Street, building, apartment / facility address",
    noteLabel: "Note",
    notePlaceholder: "Write additional notes if needed...",

    paymentTitle: "Payment method",
    cashPaymentTitle: "Cash payment",
    cashPaymentDescription: "Cash payment after order confirmation.",
    cardPaymentTitle: "Card payment",
    cardPaymentDescription: "Coming soon.",

    summaryTitle: "Order summary",
    subtotal: "Subtotal",
    delivery: "Delivery",
    total: "Total",
    confirmButton: "Confirm order",
    updatingButton: "Updating...",
    backToCart: "Back to cart",

    emptyEyebrow: "Empty cart",
    emptyTitle: "There are no products in the cart for checkout",
    emptyButton: "View products",
  },

  ru: {
    metadataTitle: "Checkout",
    metadataDescription:
      "Страница checkout KHATT Electronics. Введите данные заказа и завершите оформление.",

    eyebrow: "Checkout",
    title: "Завершить заказ",
    description:
      "Введите контактные данные и информацию о доставке, чтобы завершить заказ.",

    customerInfoTitle: "Данные клиента",
    syncingMessage: "Данные корзины обновляются. Пожалуйста, подождите...",

    fullNameLabel: "Имя и фамилия",
    fullNamePlaceholder: "Имя Фамилия",
    phoneLabel: "Телефон",
    emailLabel: "Email",
    emailPlaceholder: "email@example.com",
    cityLabel: "Город",
    cityPlaceholder: "Баку",
    cityDefault: "Баку",
    addressLabel: "Адрес",
    addressPlaceholder: "Улица, здание, квартира / адрес объекта",
    noteLabel: "Примечание",
    notePlaceholder: "Если есть дополнительное примечание, напишите...",

    paymentTitle: "Способ оплаты",
    cashPaymentTitle: "Наличная оплата",
    cashPaymentDescription: "Оплата наличными после подтверждения заказа.",
    cardPaymentTitle: "Оплата картой",
    cardPaymentDescription: "Скоро будет доступно.",

    summaryTitle: "Сводка заказа",
    subtotal: "Промежуточный итог",
    delivery: "Доставка",
    total: "Итого",
    confirmButton: "Подтвердить заказ",
    updatingButton: "Обновляется...",
    backToCart: "Назад в корзину",

    emptyEyebrow: "Пустая корзина",
    emptyTitle: "В корзине нет товаров для checkout",
    emptyButton: "Смотреть товары",
  },
} as const;
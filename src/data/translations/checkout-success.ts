export type CheckoutSuccessLocale = "az" | "en" | "ru";

export const checkoutSuccessTranslations = {
  az: {
    metadataTitle: "Sifariş tamamlandı",
    metadataDescription:
      "KHATT Electronics sifarişiniz qəbul edildi. Sifariş məlumatlarınızı yoxlayın.",

    eyebrow: "Sifariş tamamlandı",
    title: "Sifarişiniz qəbul edildi",
    description:
      "Sorğunuz sistemə daxil edildi. Komandamız sifarişi yoxladıqdan sonra sizinlə əlaqə saxlayacaq.",

    orderNumberLabel: "Sifariş nömrəsi",
    orderStatusLabel: "Status",
    orderStatusValue: "Qəbul edildi",

    nextStepsTitle: "Növbəti addımlar",
    nextSteps: [
      "Sifariş məlumatları yoxlanılır",
      "Stok və qiymət təsdiqlənir",
      "Sizinlə telefon və ya email vasitəsilə əlaqə saxlanılır",
    ],

    productsButton: "Məhsullara qayıt",
    homeButton: "Ana səhifə",
  },

  en: {
    metadataTitle: "Order completed",
    metadataDescription:
      "Your KHATT Electronics order has been received. Review your order information.",

    eyebrow: "Order completed",
    title: "Your order has been received",
    description:
      "Your request has been submitted to the system. Our team will review the order and contact you afterwards.",

    orderNumberLabel: "Order number",
    orderStatusLabel: "Status",
    orderStatusValue: "Received",

    nextStepsTitle: "Next steps",
    nextSteps: [
      "Order details are reviewed",
      "Stock and price are confirmed",
      "We contact you by phone or email",
    ],

    productsButton: "Back to products",
    homeButton: "Home page",
  },

  ru: {
    metadataTitle: "Заказ завершен",
    metadataDescription:
      "Ваш заказ KHATT Electronics принят. Проверьте информацию о заказе.",

    eyebrow: "Заказ завершен",
    title: "Ваш заказ принят",
    description:
      "Ваш запрос отправлен в систему. Наша команда проверит заказ и свяжется с вами.",

    orderNumberLabel: "Номер заказа",
    orderStatusLabel: "Статус",
    orderStatusValue: "Принят",

    nextStepsTitle: "Следующие шаги",
    nextSteps: [
      "Данные заказа проверяются",
      "Наличие и цена подтверждаются",
      "Мы свяжемся с вами по телефону или email",
    ],

    productsButton: "Вернуться к товарам",
    homeButton: "Главная",
  },
} as const;

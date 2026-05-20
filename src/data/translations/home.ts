export type Locale = "az" | "en" | "ru";

export type HomeTranslation = {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  heroPoints: string[];
  productsButton: string;
  consultationButton: string;
  quickStats: {
    value: string;
    label: string;
  }[];
};

export const homeTranslations: Record<Locale, HomeTranslation> = {
  az: {
    heroEyebrow: "KHATT Electronics",
    heroTitle: "Təhlükəsizlik və smart elektronika məhsulları",
    heroDescription:
      "Kamera sistemləri, keçidə nəzarət, domofon, siqnalizasiya və şəbəkə avadanlıqlarını onlayn seçin, səbətə əlavə edin və sifarişinizi tamamlayın.",
    heroPoints: ["Stok və qiymət", "Sürətli sifariş", "Texniki dəstək"],
    productsButton: "Məhsullara bax",
    consultationButton: "Məsləhət al",
    quickStats: [
      { value: "24/7", label: "Texniki dəstək" },
      { value: "100+", label: "Məhsul seçimi" },
      { value: "AZ", label: "Lokal xidmət" },
    ],
  },

  en: {
    heroEyebrow: "KHATT Electronics",
    heroTitle: "Security and smart electronics products",
    heroDescription:
      "Choose CCTV systems, access control, intercoms, alarm systems and networking equipment online, add products to your cart and complete your order.",
    heroPoints: ["Stock and pricing", "Fast ordering", "Technical support"],
    productsButton: "View products",
    consultationButton: "Get consultation",
    quickStats: [
      { value: "24/7", label: "Technical support" },
      { value: "100+", label: "Product range" },
      { value: "AZ", label: "Local service" },
    ],
  },

  ru: {
    heroEyebrow: "KHATT Electronics",
    heroTitle: "Товары для безопасности и умной электроники",
    heroDescription:
      "Выбирайте системы видеонаблюдения, контроль доступа, домофоны, сигнализацию и сетевое оборудование онлайн, добавляйте товары в корзину и оформляйте заказ.",
    heroPoints: ["Наличие и цены", "Быстрый заказ", "Техническая поддержка"],
    productsButton: "Смотреть товары",
    consultationButton: "Получить консультацию",
    quickStats: [
      { value: "24/7", label: "Техническая поддержка" },
      { value: "100+", label: "Ассортимент товаров" },
      { value: "AZ", label: "Локальный сервис" },
    ],
  },
};
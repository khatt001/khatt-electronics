export const STANDARD_SPEC_KEYS = [
  "Görüntü keyfiyyəti",
  "Gecə görmə məsafəsi",
  "Gecə görmə",
  "Korpus materialı",
  "Korpus növü",
  "Qida mənbəyi",
  "Qoşulma növü",
  "Quraşdırma yeri",
  "Səsli-səssiz",
  "Zoom",
  "Kanal sayı",
  "Dəstəklənən kamera tipi",
  "Port sayı",
  "PoE port sayı",
  "PoE budget",
  "Sürət",
  "Managed",
  "Rack mount",
  "Yaddaş dəstəyi",
  "Sıxılma formatı",
  "IP qoruma dərəcəsi",
  "İş temperaturu",
] as const;

export function getSpecSortIndex(label: string) {
  const index = STANDARD_SPEC_KEYS.findIndex(
    (item) => item.toLowerCase() === label.toLowerCase(),
  );

  return index === -1 ? 999 : index;
}

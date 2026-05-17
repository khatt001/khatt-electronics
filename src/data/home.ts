import {
  Cable,
  Camera,
  Fingerprint,
  Flame,
  Home,
  Monitor,
  Network,
  Router,
  ShieldCheck,
  Video,
  Zap,
} from "lucide-react";

export const catalogCategories = [
  {
    title: "Video Nəzarət Sistemi",
    href: "/products/video-nezaret",
    subcategories: ["IP kameralar", "Analog kameralar", "NVR", "DVR", "PTZ kameralar"],
  },
  {
    title: "Girişə Nəzarət",
    href: "/products/girise-nezaret",
    subcategories: ["Biometrik terminallar", "Kart oxuyucular", "Turniketlər", "Elektron kilidlər"],
  },
  {
    title: "Domofoniya",
    href: "/products/domofoniya",
    subcategories: ["IP domofonlar", "Analog domofonlar", "Monitorlar", "Çağırış panelləri"],
  },
  {
    title: "Ağıllı Ev Sistemləri",
    href: "/products/agilli-ev",
    subcategories: ["Smart hub", "Sensorlar", "İşıqlandırma", "Avtomatlaşdırma"],
  },
  {
    title: "Yanğın Sistemləri",
    href: "/products/yangin-sistemleri",
    subcategories: ["Detektorlar", "İdarəetmə panelləri", "Sirena", "Yanğın kabeli"],
  },
  {
    title: "Təhlükəsizlik Siqnalizasiyası",
    href: "/products/siqnalizasiya",
    subcategories: ["Simli sistemlər", "Simsiz sistemlər", "Sensorlar", "Sirenalar"],
  },
  {
    title: "Şəbəkə Avadanlıqları",
    href: "/products/sebeke",
    subcategories: ["PoE switch", "Routerlər", "Access point", "SFP modullar"],
  },
  {
    title: "Kabellər və Aksessuarlar",
    href: "/products/kabeller",
    subcategories: ["UTP kabel", "Koaksial kabel", "BNC", "Adapterlər"],
  },
] as const;

export const categoryCards = [
  {
    title: "Videomüşahidə",
    description: "IP, Turbo HD, PTZ və smart kamera sistemləri.",
    href: "/products/video-nezaret",
    icon: Camera,
  },
  {
    title: "Keçidə Nəzarət",
    description: "Biometrik, kartlı və korporativ keçid sistemləri.",
    href: "/products/girise-nezaret",
    icon: Fingerprint,
  },
  {
    title: "Domofon",
    description: "Ev və obyektlər üçün IP və analog domofon sistemləri.",
    href: "/products/domofoniya",
    icon: Video,
  },
  {
    title: "Siqnalizasiya",
    description: "Mühafizə və yanğın siqnalizasiya həlləri.",
    href: "/products/siqnalizasiya",
    icon: ShieldCheck,
  },
  {
    title: "Şəbəkə",
    description: "PoE switch, router, access point və optik avadanlıqlar.",
    href: "/products/sebeke",
    icon: Network,
  },
  {
    title: "Ağıllı Ev",
    description: "Smart təhlükəsizlik və avtomatlaşdırma sistemləri.",
    href: "/products/agilli-ev",
    icon: Home,
  },
] as const;

export const featuredProducts = [
  {
    name: "4MP IP Dome Kamera",
    category: "IP Kamera",
    price: "Qiymət sorğu ilə",
    badge: "Populyar",
    href: "/products/4mp-ip-dome-kamera",
  },
  {
    name: "8 Kanal NVR Qeydiyyatçı",
    category: "NVR",
    price: "Qiymət sorğu ilə",
    badge: "Yeni",
    href: "/products/8-kanal-nvr",
  },
  {
    name: "PoE Switch 8 Port",
    category: "Şəbəkə",
    price: "Qiymət sorğu ilə",
    badge: "Tövsiyə",
    href: "/products/poe-switch-8-port",
  },
  {
    name: "Üz Tanıma Terminalı",
    category: "Access Control",
    price: "Qiymət sorğu ilə",
    badge: "B2B",
    href: "/products/uz-tanima-terminali",
  },
] as const;

export const quickStats = [
  { label: "Kamera sistemləri", value: "CCTV" },
  { label: "Keçid həlləri", value: "Access" },
  { label: "Şəbəkə avadanlığı", value: "PoE" },
] as const;

export const services = [
  "Sistem layihələndirilməsi",
  "Professional quraşdırılma",
  "Uzaqdan konfiqurasiya",
  "Texniki dəstək",
  "Servis və baxım",
  "Korporativ həllər",
] as const;

export const promoItems = [
  {
    title: "Obyekt üçün tam kamera sistemi",
    description: "Kamera, qeydiyyatçı, kabel və quraşdırılma üzrə kompleks təklif.",
    href: "/contact",
    icon: Monitor,
  },
  {
    title: "Şəbəkə və PoE infrastrukturu",
    description: "Stabil internet, switch və access point həlləri.",
    href: "/products/sebeke",
    icon: Router,
  },
] as const;

export const miniCategories = [
  { title: "Enerji təminatı", href: "/products/enerji", icon: Zap },
  { title: "Yanğın sistemi", href: "/products/yangin-sistemleri", icon: Flame },
  { title: "Kabellər", href: "/products/kabeller", icon: Cable },
] as const;
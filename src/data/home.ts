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
    href: "/products?category=video-nezaret",
    subcategories: ["IP kameralar", "Analog kameralar", "NVR", "DVR", "PTZ kameralar"],
  },
  {
    title: "Girişə Nəzarət",
    href: "/products?category=girise-nezaret",
    subcategories: ["Biometrik terminallar", "Kart oxuyucular", "Turniketlər", "Elektron kilidlər"],
  },
  {
    title: "Domofoniya",
    href: "/products?category=domofoniya",
    subcategories: ["IP domofonlar", "Analog domofonlar", "Monitorlar", "Çağırış panelləri"],
  },
  {
    title: "Ağıllı Ev Sistemləri",
    href: "/products?category=agilli-ev",
    subcategories: ["Smart hub", "Sensorlar", "İşıqlandırma", "Avtomatlaşdırma"],
  },
  {
    title: "Yanğın Sistemləri",
    href: "/products?category=yangin-sistemleri",
    subcategories: ["Detektorlar", "İdarəetmə panelləri", "Sirena", "Yanğın kabeli"],
  },
  {
    title: "Təhlükəsizlik Siqnalizasiyası",
    href: "/products?category=siqnalizasiya",
    subcategories: ["Simli sistemlər", "Simsiz sistemlər", "Sensorlar", "Sirenalar"],
  },
  {
    title: "Şəbəkə Avadanlıqları",
    href: "/products?category=sebeke",
    subcategories: ["PoE switch", "Routerlər", "Access point", "SFP modullar"],
  },
  {
    title: "Kabellər və Aksessuarlar",
    href: "/products?category=kabeller",
    subcategories: ["UTP kabel", "Koaksial kabel", "BNC", "Adapterlər"],
  },
] as const;

export const categoryCards = [
  {
    title: "Videomüşahidə",
    description: "IP, Turbo HD, PTZ və smart kamera sistemləri.",
    href: "/products?category=video-nezaret",
    icon: Camera,
  },
  {
    title: "Keçidə Nəzarət",
    description: "Biometrik, kartlı və korporativ keçid sistemləri.",
    href: "/products?category=girise-nezaret",
    icon: Fingerprint,
  },
  {
    title: "Domofon",
    description: "Ev və obyektlər üçün IP və analog domofon sistemləri.",
    href: "/products?category=domofoniya",
    icon: Video,
  },
  {
    title: "Siqnalizasiya",
    description: "Mühafizə və yanğın siqnalizasiya həlləri.",
    href: "/products?category=siqnalizasiya",
    icon: ShieldCheck,
  },
  {
    title: "Şəbəkə",
    description: "PoE switch, router, access point və optik avadanlıqlar.",
    href: "/products?category=sebeke",
    icon: Network,
  },
  {
    title: "Ağıllı Ev",
    description: "Smart təhlükəsizlik və avtomatlaşdırma sistemləri.",
    href: "/products?category=agilli-ev",
    icon: Home,
  },
] as const;

export const featuredProducts = [
  {
    name: "4MP IP Dome Kamera",
    category: "IP Kamera",
    price: "Qiymət sorğu ilə",
    badge: "Populyar",
    href: "/products",
  },
  {
    name: "8 Kanal NVR Qeydiyyatçı",
    category: "NVR",
    price: "Qiymət sorğu ilə",
    badge: "Yeni",
    href: "/products",
  },
  {
    name: "PoE Switch 8 Port",
    category: "Şəbəkə",
    price: "Qiymət sorğu ilə",
    badge: "Tövsiyə",
    href: "/products",
  },
  {
    name: "Üz Tanıma Terminalı",
    category: "Access Control",
    price: "Qiymət sorğu ilə",
    badge: "B2B",
    href: "/products",
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
    href: "/products",
    icon: Monitor,
  },
  {
    title: "Şəbəkə və PoE infrastrukturu",
    description: "Stabil internet, switch və access point həlləri.",
    href: "/products?category=sebeke",
    icon: Router,
  },
] as const;

export const miniCategories = [
  { title: "Enerji təminatı", href: "/products", icon: Zap },
  { title: "Yanğın sistemi", href: "/products?category=yangin-sistemleri", icon: Flame },
  { title: "Kabellər", href: "/products?category=kabeller", icon: Cable },
] as const;
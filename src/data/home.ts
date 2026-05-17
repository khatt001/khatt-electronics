import {
  Camera,
  Fingerprint,
  Home,
  Network,
  ShieldCheck,
  Video,
} from "lucide-react";

export const categories = [
  {
    title: "Videomüşahidə Sistemləri",
    description: "IP, Turbo HD, PTZ və ağıllı kamera sistemləri.",
    href: "/products/cctv",
    icon: Camera,
  },
  {
    title: "Keçidə Nəzarət",
    description: "Biometrik, kartlı və korporativ keçid sistemləri.",
    href: "/products/access-control",
    icon: Fingerprint,
  },
  {
    title: "Videodomofonlar",
    description: "Ev və biznes obyektləri üçün IP və analog domofon sistemləri.",
    href: "/products/video-intercom",
    icon: Video,
  },
  {
    title: "Siqnalizasiya Sistemləri",
    description: "Mühafizə, yanğın siqnalizasiyası və smart bildiriş sistemləri.",
    href: "/products/alarm-systems",
    icon: ShieldCheck,
  },
  {
    title: "Şəbəkə Avadanlıqları",
    description: "PoE switch-lər, routerlər, access point-lər və saxlama həlləri.",
    href: "/products/networking",
    icon: Network,
  },
  {
    title: "Ağıllı Ev",
    description: "Smart təhlükəsizlik və avtomatlaşdırma həlləri.",
    href: "/solutions/smart-home",
    icon: Home,
  },
] as const;

export const services = [
  "Sistem layihələndirilməsi",
  "Professional quraşdırılma",
  "Uzaqdan konfiqurasiya",
  "Texniki dəstək",
  "Servis və baxım",
  "Korporativ həllər",
] as const;
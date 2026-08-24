"use client";

import Link from "next/link";
import {
  AirVent,
  Camera,
  ChevronDown,
  Flame,
  Network,
  ScanFace,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { localizedPath, type Locale } from "@/lib/i18n";

type SolutionsMenuProps = {
  locale: Locale;
  label: string;
};

const content = {
  az: {
    eyebrow: "Mühəndis həlləri",
    description:
      "Obyektiniz üçün təhlükəsizlik, elektrik və mühəndis sistemləri.",
    allSolutions: "Bütün həllərə bax",
    items: [
      {
        title: "Yanğın təhlükəsizliyi",
        description: "Siqnalizasiya, detektor və xəbərdarlıq sistemləri",
        anchor: "fire-safety",
        icon: Flame,
      },
      {
        title: "Videomüşahidə",
        description: "Kamera, qeydiyyat və analitika sistemləri",
        anchor: "video-surveillance",
        icon: Camera,
      },
      {
        title: "Girişə nəzarət",
        description: "Keçid, domofon və işçi nəzarəti",
        anchor: "access-control",
        icon: ScanFace,
      },
      {
        title: "Elektrik sistemləri",
        description: "Elektrik xətləri, panellər və enerji həlləri",
        anchor: "electrical",
        icon: Zap,
      },
      {
        title: "İsitmə və soyutma",
        description: "HVAC, havalandırma və iqlim sistemləri",
        anchor: "hvac",
        icon: AirVent,
      },
      {
        title: "Şəbəkə sistemləri",
        description: "Strukturlaşdırılmış kabel və zəif axın həlləri",
        anchor: "network",
        icon: Network,
      },
    ],
  },
  en: {
    eyebrow: "Engineering solutions",
    description:
      "Security, electrical and engineering systems for your facility.",
    allSolutions: "View all solutions",
    items: [
      {
        title: "Fire safety",
        description: "Alarm, detection and notification systems",
        anchor: "fire-safety",
        icon: Flame,
      },
      {
        title: "Video surveillance",
        description: "Camera, recording and analytics systems",
        anchor: "video-surveillance",
        icon: Camera,
      },
      {
        title: "Access control",
        description: "Entry, intercom and staff control systems",
        anchor: "access-control",
        icon: ScanFace,
      },
      {
        title: "Electrical systems",
        description: "Electrical lines, panels and power solutions",
        anchor: "electrical",
        icon: Zap,
      },
      {
        title: "Heating and cooling",
        description: "HVAC, ventilation and climate systems",
        anchor: "hvac",
        icon: AirVent,
      },
      {
        title: "Network systems",
        description: "Structured cabling and low-current solutions",
        anchor: "network",
        icon: Network,
      },
    ],
  },
  ru: {
    eyebrow: "Инженерные решения",
    description:
      "Системы безопасности, электрики и инженерии для вашего объекта.",
    allSolutions: "Все решения",
    items: [
      {
        title: "Пожарная безопасность",
        description: "Сигнализация, датчики и системы оповещения",
        anchor: "fire-safety",
        icon: Flame,
      },
      {
        title: "Видеонаблюдение",
        description: "Камеры, запись и видеоаналитика",
        anchor: "video-surveillance",
        icon: Camera,
      },
      {
        title: "Контроль доступа",
        description: "Доступ, домофон и контроль персонала",
        anchor: "access-control",
        icon: ScanFace,
      },
      {
        title: "Электрические системы",
        description: "Линии, щиты и решения электроснабжения",
        anchor: "electrical",
        icon: Zap,
      },
      {
        title: "Отопление и охлаждение",
        description: "HVAC, вентиляция и климатические системы",
        anchor: "hvac",
        icon: AirVent,
      },
      {
        title: "Сетевые системы",
        description: "Структурированные кабельные и слаботочные системы",
        anchor: "network",
        icon: Network,
      },
    ],
  },
} as const;

export function SolutionsMenu({ locale, label }: SolutionsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const translation = content[locale];

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onClick={() => setIsOpen((current) => !current)}
        className="flex items-center gap-1.5 text-sm font-medium text-neutral-700 transition-colors hover:text-black"
      >
        {label}

        <ChevronDown
          aria-hidden="true"
          className={`size-3.5 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen ? (
        <div
          role="menu"
          className="absolute left-1/2 top-full z-50 mt-7 w-[760px] -translate-x-1/2 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_24px_70px_rgba(0,0,0,0.14)]"
        >
          <div className="grid grid-cols-[230px_1fr]">
            <div className="flex flex-col justify-between bg-neutral-950 p-7 text-white">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
                  {translation.eyebrow}
                </span>

                <p className="mt-4 text-sm leading-6 text-neutral-300">
                  {translation.description}
                </p>
              </div>

              <Link
                href={localizedPath("/solutions", locale)}
                onClick={() => setIsOpen(false)}
                className="mt-10 inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-emerald-400"
              >
                {translation.allSolutions}
                <span aria-hidden="true">↗</span>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-px bg-neutral-200">
              {translation.items.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.anchor}
                    role="menuitem"
                    href={`${localizedPath("/solutions", locale)}#${
                      item.anchor
                    }`}
                    onClick={() => setIsOpen(false)}
                    className="group flex min-h-32 gap-4 bg-white p-5 transition-colors hover:bg-neutral-50"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-700 transition-colors group-hover:border-emerald-200 group-hover:bg-emerald-50 group-hover:text-emerald-700">
                      <Icon aria-hidden="true" className="size-[18px]" />
                    </span>

                    <span>
                      <span className="block text-sm font-semibold text-neutral-950">
                        {item.title}
                      </span>

                      <span className="mt-1.5 block text-xs leading-5 text-neutral-500">
                        {item.description}
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
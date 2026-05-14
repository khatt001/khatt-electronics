"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Search } from "lucide-react";
import { Container } from "./container";
import { cn } from "../../lib/utils";

const navLinks = [
  { name: "Products", href: "/products" },
  { name: "Solutions", href: "/solutions" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-neutral-200 bg-white/70 backdrop-blur-md">
      <Container>
        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <Link href="/" className="text-xl tracking-widest font-bold">
            KHATT
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-neutral-700 hover:text-black transition"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-3">

            <button className="p-2 hover:bg-neutral-100 rounded-full">
              <Search size={18} />
            </button>

            <button
              onClick={() => setOpen(true)}
              className="md:hidden p-2 hover:bg-neutral-100 rounded-full"
            >
              <Menu size={20} />
            </button>

            <Link
              href="/contact"
              className="hidden md:inline-flex px-4 py-2 bg-black text-white text-sm rounded-full hover:bg-neutral-800 transition"
            >
              Get Quote
            </Link>
          </div>
        </div>
      </Container>

      {/* MOBILE MENU */}
      <div
        className={cn(
          "fixed inset-0 bg-white z-50 transition-transform md:hidden",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-5 border-b">
          <span className="font-bold tracking-widest">KHATT</span>

          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        <div className="flex flex-col p-6 gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-lg font-medium"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
"use client";

import { useState } from "react";
import Link from "next/link";
import { basePath } from "@/lib/basePath";
import { useSearchFocus } from "@/lib/SearchFocusContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Sobre o projeto", href: "/sobre" },
  { label: "Metodologia", href: "/metodologia" },
  { label: "Contato", href: "/contato" },
];

/** Same path data as public/assets/icons/close-large-line.svg, recolored to #1c1b17. */
function MenuCloseIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"
        fill="#1C1B17"
      />
    </svg>
  );
}

export default function Navbar() {
  const { focused } = useSearchFocus();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 flex w-full items-center justify-between px-[120px] py-6 ${
          focused ? "bg-transparent" : "bg-white"
        }`}
      >
        <div className="flex w-[121px] items-start">
          <span
            onClick={() => setMenuOpen(true)}
            className={`cursor-pointer text-base font-bold text-kape-brown transition-opacity duration-200 ${
              focused ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          >
            Menu
          </span>
        </div>

        <Link href="/" className="flex w-[121px] items-center justify-center">
          <img src={`${basePath}/assets/logo/Logo.svg`} alt="Kapé" className="h-10 w-auto" />
        </Link>

        <div className="flex w-[121px] items-start justify-end">
          <span
            className={`text-base font-bold text-kape-brown transition-opacity duration-200 ${
              focused ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          >
            Login
          </span>
        </div>
      </header>

      <div
        className={`fixed left-[24px] top-[20px] bottom-[24px] z-[60] w-[568px] overflow-hidden rounded-2xl bg-[#b8e519] ease-out ${
          menuOpen
            ? "translate-x-0 opacity-100 duration-[250ms] transition-all"
            : "pointer-events-none -translate-x-[20px] opacity-0 duration-200 transition-all"
        }`}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          onClick={() => setMenuOpen(false)}
          aria-label="Fechar menu"
          className="absolute left-[40px] top-[40px] flex h-[48px] w-[48px] items-center justify-center rounded-full bg-transparent"
        >
          <MenuCloseIcon className="h-6 w-6" />
        </button>

        <nav className="absolute left-[40px] top-[108px] w-[488px]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block cursor-pointer border-b border-[#1c1b17] px-[20px] py-[24px] font-serif text-[40px] leading-none tracking-[-0.8px] text-[#1c1b17]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <span className="absolute bottom-[48px] left-[60px] cursor-pointer text-[16px] font-bold text-[#1c1b17]">
          Login
        </span>
      </div>
    </>
  );
}

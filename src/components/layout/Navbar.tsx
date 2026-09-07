"use client";

import Link from "next/link";
import { basePath } from "@/lib/basePath";
import { useSearchFocus } from "@/lib/SearchFocusContext";

export default function Navbar() {
  const { focused } = useSearchFocus();

  return (
    <header
      className={`flex w-full items-center justify-between bg-white px-[120px] py-6 ${
        focused ? "fixed inset-x-0 top-0 z-50" : "relative z-[41]"
      }`}
    >
      <div className="flex w-[121px] items-start">
        <span
          className={`text-base font-bold text-kape-brown transition-opacity duration-200 ${
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
  );
}

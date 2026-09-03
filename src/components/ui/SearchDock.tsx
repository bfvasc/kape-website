"use client";

import { useEffect, useRef, useState } from "react";
import { basePath } from "@/lib/basePath";

const categories = ["Estado", "Município", "Terra Indígena", "Unidade de Conservação"];

function DockBar({ elevated = false }: { elevated?: boolean }) {
  return (
    <div
      className={`group inline-flex items-center gap-[16px] rounded-full p-[4px] ${
        elevated
          ? "bg-kape-sand/90 shadow-xl backdrop-blur-md"
          : "bg-kape-sand shadow-sm"
      }`}
    >
      <div className="flex flex-1 items-center justify-between gap-[8px] px-[48px]">
        {categories.map((label) => (
          <button
            key={label}
            type="button"
            className="whitespace-nowrap rounded-[4px] border border-transparent px-[14px] py-[8px] text-[14px] text-kape-brown transition-colors duration-200 group-hover:border-kape-brown/10 group-hover:bg-kape-cream"
          >
            {label}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="flex h-[48px] shrink-0 items-center gap-[8px] rounded-full bg-kape-brown px-[16px]"
      >
        <img src={`${basePath}/assets/icons/search-line.svg`} alt="" className="h-6 w-6" />
        <span className="whitespace-nowrap text-[16px] text-white">Buscar</span>
      </button>
    </div>
  );
}

export default function SearchDock() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(sentinel);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef}>
        <DockBar />
      </div>

      <div
        aria-hidden={!isSticky}
        className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transition-all duration-300 ${
          isSticky
            ? "translate-y-0 opacity-100 ease-out"
            : "pointer-events-none translate-y-4 opacity-0 ease-in"
        }`}
      >
        <DockBar elevated />
      </div>
    </>
  );
}

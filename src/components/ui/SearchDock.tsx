"use client";

import { useEffect, useRef, useState } from "react";
import { basePath } from "@/lib/basePath";

const categories = ["Estado", "Município", "Terra Indígena", "Unidade de Conservação"];

function BuscarButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      className={`flex h-[48px] items-center gap-[8px] whitespace-nowrap rounded-full bg-kape-brown px-[16px] text-white ${className}`}
    >
      <img src={`${basePath}/assets/icons/search-line.svg`} alt="" className="h-6 w-6" />
      <span className="text-[16px]">Buscar</span>
    </button>
  );
}

/**
 * The fixed dock: the Buscar button is the "seed" — the beige bar scales out
 * from behind it, the chips fade/rise in, and the button slides to the right
 * edge, all driven by `expanded` (== isSticky).
 */
function Dock({ expanded }: { expanded: boolean }) {
  return (
    <div className="group relative flex h-[56px] w-[700px] max-w-[90vw] items-center">
      <div
        className={`absolute inset-0 origin-center rounded-full bg-kape-sand/90 shadow-xl backdrop-blur-md transition-transform duration-[400ms] ease-out ${
          expanded ? "scale-x-100" : "scale-x-0"
        }`}
      />

      <div
        className={`absolute inset-y-0 left-[4px] right-[152px] flex items-center justify-between px-[48px] transition-all duration-[400ms] ease-out ${
          expanded
            ? "translate-y-0 opacity-100 delay-100"
            : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
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

      <BuscarButton
        className={`absolute right-[4px] top-1/2 z-10 -translate-y-1/2 transition-transform duration-[400ms] ease-out ${
          expanded ? "translate-x-0" : "translate-x-[-280px]"
        }`}
      />
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
      {/* Initial state: just the Buscar button, in normal page flow */}
      <div ref={sentinelRef}>
        <BuscarButton />
      </div>

      {/* Fixed dock: rises from the bottom and blooms open from the button */}
      <div
        aria-hidden={!isSticky}
        className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transition-all duration-[400ms] ${
          isSticky
            ? "translate-y-0 opacity-100 ease-out"
            : "pointer-events-none translate-y-4 opacity-0 ease-in"
        }`}
      >
        <Dock expanded={isSticky} />
      </div>
    </>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { basePath } from "@/lib/basePath";

const categoryOptions = [
  "Estado",
  "Município",
  "Terra Indígena",
  "Unidade de conservação",
  "Floresta pública não destinada",
];

const BUTTON_HEIGHT = 48;
const BOTTOM_OFFSET = 24;
/** Scroll distance (px) over which the button travels from its inline spot to the bottom. */
const TRAVEL_DISTANCE = 250;

type Metrics = {
  /** Viewport-relative top of the button's original inline position. */
  startTop: number;
  /** window.scrollY captured when startTop was measured. */
  scrollYAtMount: number;
  /** Viewport-relative top of the button once docked at the bottom. */
  endTop: number;
};

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

/** Custom category dropdown — no native <select>. Opens upward, closes on outside click. */
function CategoryDropdown() {
  const [selected, setSelected] = useState("Todos");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  return (
    <div ref={containerRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-[40px] items-center gap-[4px] rounded-full bg-kape-cream px-[12px]"
      >
        <span className="max-w-[110px] truncate text-[14px] text-kape-brown">{selected}</span>
        <img
          src={`${basePath}/assets/icons/arrow-down-s-line.svg`}
          alt=""
          className={`h-6 w-6 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute bottom-full left-0 mb-[8px] w-max overflow-hidden rounded-xl bg-kape-sand shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
          {categoryOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                setSelected(option);
                setOpen(false);
              }}
              className="flex h-[40px] w-full items-center whitespace-nowrap px-[12px] text-left text-[14px] text-kape-brown hover:bg-kape-cream"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * The bar + chips that bloom out from behind the Buscar button once it has
 * finished traveling to the bottom of the viewport.
 */
function Dock({ expanded }: { expanded: boolean }) {
  return (
    <div className="relative flex h-[56px] w-[729px] max-w-[90vw] items-center">
      <div
        className={`absolute inset-0 origin-center rounded-full bg-kape-sand/90 shadow-xl backdrop-blur-md transition-transform duration-[400ms] ease-out ${
          expanded ? "scale-x-100" : "scale-x-0"
        }`}
      />

      <div
        className={`absolute inset-y-0 left-[8px] right-[152px] flex items-center gap-[12px] transition-all duration-[400ms] ease-out ${
          expanded
            ? "translate-y-0 opacity-100 delay-100"
            : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        <CategoryDropdown />

        <input
          type="text"
          placeholder="Buscar..."
          className="min-w-0 flex-1 border-none bg-transparent text-[14px] text-kape-brown outline-none placeholder:text-[#a19e91]"
        />
      </div>

      <BuscarButton
        className={`absolute right-[4px] top-1/2 z-10 -translate-y-1/2 transition-transform duration-[400ms] ease-out ${
          expanded ? "translate-x-0" : "translate-x-[-294px]"
        }`}
      />
    </div>
  );
}

export default function SearchDock() {
  const spacerRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<Metrics | null>(null);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    function measure() {
      if (!spacerRef.current) return;
      const rect = spacerRef.current.getBoundingClientRect();
      const previous = metricsRef.current;
      metricsRef.current = {
        startTop: previous ? previous.startTop : rect.top,
        scrollYAtMount: previous ? previous.scrollYAtMount : window.scrollY,
        endTop: window.innerHeight - BOTTOM_OFFSET - BUTTON_HEIGHT,
      };
    }

    measure();
    setReady(true);

    let ticking = false;
    function applyScroll() {
      const m = metricsRef.current;
      if (m) {
        const p = Math.min(1, Math.max(0, (window.scrollY - m.scrollYAtMount) / TRAVEL_DISTANCE));
        setProgress(p);
      }
      ticking = false;
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(applyScroll);
    }

    function onResize() {
      measure();
      applyScroll();
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const expanded = progress >= 1;
  const m = metricsRef.current;
  const top = m ? m.startTop + (m.endTop - m.startTop) * progress : undefined;

  return (
    <>
      {/* Reserves the button's original space in the hero flow */}
      <div ref={spacerRef} style={{ height: BUTTON_HEIGHT }} aria-hidden="true" />

      {ready && (
        <div className="fixed left-1/2 z-50 -translate-x-1/2" style={{ top }}>
          <Dock expanded={expanded} />
        </div>
      )}
    </>
  );
}

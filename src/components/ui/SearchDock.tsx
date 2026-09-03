"use client";

import { useEffect, useRef, useState } from "react";
import { basePath } from "@/lib/basePath";

const categories = ["Estado", "Município", "Terra Indígena", "Unidade de Conservação"];

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

/**
 * The bar + chips that bloom out from behind the Buscar button once it has
 * finished traveling to the bottom of the viewport.
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

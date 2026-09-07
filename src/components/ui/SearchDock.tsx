"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { useRouter } from "next/navigation";
import { basePath } from "@/lib/basePath";
import { useSearchFocus } from "@/lib/SearchFocusContext";

const categoryOptions = [
  "Estado",
  "Município",
  "Terra Indígena",
  "Unidade de conservação",
  "Floresta pública não destinada",
  "Todos",
];

const SUGGESTION_CARDS = [
  { category: "Estado", label: "Amazônia" },
  { category: "Estado", label: "Amazônia" },
  { category: "Estado", label: "Amazônia" },
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

/** Same path data as public/assets/icons/close-large-line.svg, recolored to match the Focus-state spec (#1c1b17 instead of the file's grey). */
function CloseIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"
        fill="#1C1B17"
      />
    </svg>
  );
}

function BuscarButton({
  className = "",
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-[48px] items-center gap-[8px] whitespace-nowrap rounded-full bg-kape-brown px-[16px] text-white ${className}`}
    >
      <img src={`${basePath}/assets/icons/search-line.svg`} alt="" className="h-6 w-6" />
      <span className="text-[16px]">Buscar</span>
    </button>
  );
}

/** Icon-only Close/Submit pair shown in place of the Buscar button while Focus state is active. */
function FocusButtons({ onClose, onSubmit }: { onClose: () => void; onSubmit: () => void }) {
  return (
    <div className="absolute right-[4px] top-1/2 z-10 flex -translate-y-1/2 items-center gap-[8px]">
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar"
        className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-transparent"
      >
        <CloseIcon className="h-6 w-6" />
      </button>
      <button
        type="button"
        onClick={onSubmit}
        aria-label="Buscar"
        className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#1c1b17]"
      >
        <img src={`${basePath}/assets/icons/arrow-up-line.svg`} alt="" className="h-6 w-6" />
      </button>
    </div>
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
        <div className="absolute bottom-full left-0 mb-[16px] w-max overflow-hidden rounded-xl bg-kape-sand shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
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
function Dock({
  expanded,
  focused,
  inputRef,
  onInputFocus,
  onBuscarClick,
  onClose,
  onSubmit,
}: {
  expanded: boolean;
  focused: boolean;
  inputRef: RefObject<HTMLInputElement>;
  onInputFocus: () => void;
  onBuscarClick: () => void;
  onClose: () => void;
  onSubmit: () => void;
}) {
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
          ref={inputRef}
          type="text"
          placeholder="Buscar..."
          onFocus={onInputFocus}
          className="min-w-0 flex-1 border-none bg-transparent text-[14px] text-kape-brown outline-none placeholder:text-[#a19e91]"
        />
      </div>

      {focused ? (
        <FocusButtons onClose={onClose} onSubmit={onSubmit} />
      ) : (
        <BuscarButton
          onClick={onBuscarClick}
          className={`absolute right-[4px] top-1/2 z-10 -translate-y-1/2 transition-transform duration-[400ms] ease-out ${
            expanded ? "translate-x-0" : "translate-x-[-294px]"
          }`}
        />
      )}
    </div>
  );
}

export default function SearchDock() {
  const spacerRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<Metrics | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pendingFocusRef = useRef(false);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const { focused, setFocused } = useSearchFocus();
  const router = useRouter();

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

  // Once a Buscar-button click while collapsed has driven the dock to fully
  // expand, auto-focus the input so Focus state activates immediately after.
  useEffect(() => {
    if (expanded && pendingFocusRef.current) {
      pendingFocusRef.current = false;
      inputRef.current?.focus();
    }
  }, [expanded]);

  // Lock page scroll while Focus is active, without changing scroll position.
  useEffect(() => {
    document.body.style.overflow = focused ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [focused]);

  function handleBuscarClick() {
    if (expanded) {
      inputRef.current?.focus();
      return;
    }
    const metrics = metricsRef.current;
    if (!metrics) return;
    pendingFocusRef.current = true;
    window.scrollTo({ top: metrics.scrollYAtMount + TRAVEL_DISTANCE, behavior: "smooth" });
  }

  function handleInputFocus() {
    setFocused(true);
  }

  function handleClose() {
    setFocused(false);
    inputRef.current?.blur();
  }

  function handleSubmit() {
    setFocused(false);
    router.push("/busca");
  }

  return (
    <>
      {/* Reserves the button's original space in the hero flow */}
      <div ref={spacerRef} style={{ height: BUTTON_HEIGHT }} aria-hidden="true" />

      {ready && (
        <>
          <div
            className={`fixed inset-0 z-40 bg-[#f7f6f2]/[0.96] backdrop-blur-md transition-opacity duration-200 ease-out ${
              focused ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-hidden="true"
          />

          <div
            className={`fixed left-1/2 top-[208px] z-[42] flex -translate-x-1/2 flex-col items-center transition-opacity delay-100 duration-200 ease-out ${
              focused ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <h2 className="text-center text-[24px] text-[#1c1b17]">
              Explore mais de 3k territórios e dados
            </h2>

            <div className="relative mt-[48px]">
              <div className="absolute bottom-0 left-1/2 -z-10 h-[400px] w-[1176px] -translate-x-1/2 translate-y-1/2 rounded-2xl bg-[#b8e519]" />

              <div className="flex w-[725px] gap-[24px]">
                {SUGGESTION_CARDS.map((card, index) => (
                  <div key={index} className="flex-1">
                    <div className="relative h-[146px] w-full overflow-hidden rounded-xl bg-[#2d4a3e]">
                      <img
                        src={`${basePath}/assets/images/Frame%201321317785.png`}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute left-[16px] top-[16px] flex h-[32px] items-center gap-[8px] rounded-full bg-[#f7f6f2] px-[12px]">
                        <img
                          src={`${basePath}/assets/icons/map-2-line.svg`}
                          alt=""
                          className="h-5 w-5"
                        />
                        <span className="text-[14px] font-medium text-[#1c1b17]">
                          {card.category}
                        </span>
                      </div>
                    </div>
                    <p className="mt-[20px] text-[16px] text-[#1c1b17]">{card.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="fixed left-1/2 z-50 -translate-x-1/2" style={{ top }}>
            <Dock
              expanded={expanded}
              focused={focused}
              inputRef={inputRef}
              onInputFocus={handleInputFocus}
              onBuscarClick={handleBuscarClick}
              onClose={handleClose}
              onSubmit={handleSubmit}
            />
          </div>
        </>
      )}
    </>
  );
}

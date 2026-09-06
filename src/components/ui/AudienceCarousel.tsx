"use client";

import { useEffect, useRef, useState } from "react";

type AudienceCard = {
  title: string;
  description: string;
};

function Card({ card }: { card: AudienceCard }) {
  return (
    <div className="flex h-[480px] w-[360px] shrink-0 flex-col justify-between rounded-2xl border border-[#d0cec8] p-[40px]">
      <div className="h-[64px] w-[64px] rounded-2xl bg-kape-green" />
      <div className="flex flex-col gap-[16px]">
        <p className="text-[20px] font-medium leading-[1.2] text-kape-brown">{card.title}</p>
        <p className="text-[16px] leading-[1.4] text-kape-text">{card.description}</p>
      </div>
    </div>
  );
}

/**
 * Pins itself for the height of one viewport plus the row's horizontal
 * overflow, and maps that extra scroll distance 1:1 to translateX on the
 * card row — so the row slides left as the user scrolls through the section,
 * starting with the first card at the page margin and ending with the last
 * card flush with the right margin.
 */
export default function AudienceCarousel({ cards }: { cards: AudienceCard[] }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const travelRef = useRef(0);
  const [travel, setTravel] = useState(0);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    function measure() {
      if (!rowRef.current) return;
      const row = rowRef.current;
      // The row's own box starts at its container's edge; its padding-left is
      // what actually positions the cards, so add it to get the true margin.
      const paddingLeft = parseFloat(getComputedStyle(row).paddingLeft) || 0;
      const margin = row.getBoundingClientRect().left + paddingLeft;
      const contentWidth = window.innerWidth - margin * 2;
      const distance = Math.max(0, row.scrollWidth - paddingLeft - contentWidth);
      travelRef.current = distance;
      setTravel(distance);
    }

    function applyScroll() {
      const wrapper = wrapperRef.current;
      const distance = travelRef.current;
      if (wrapper && distance > 0) {
        const top = wrapper.getBoundingClientRect().top;
        const p = Math.min(1, Math.max(0, -top / distance));
        setOffset(p * distance);
      } else {
        setOffset(0);
      }
      ticking = false;
    }

    let ticking = false;

    measure();
    applyScroll();

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

  return (
    <div ref={wrapperRef} className="relative w-full" style={{ height: `calc(100vh + ${travel}px)` }}>
      <div className="sticky top-0 flex h-screen w-full items-center">
        <div
          ref={rowRef}
          className="flex gap-[20px]"
          style={{
            paddingLeft: "calc(8.33% + 22px)",
            transform: `translateX(-${offset}px)`,
          }}
        >
          {cards.map((card) => (
            <Card key={card.title} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
}

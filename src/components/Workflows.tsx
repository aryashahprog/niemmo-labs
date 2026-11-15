"use client";

import { useEffect, useState } from "react";
import { INDUSTRIES } from "@/lib/industries";

type Item = { title: string; color: string };

const ALL: Item[] = INDUSTRIES.flatMap((ind) => ind.workflows.map((w) => ({ title: w.title, color: ind.color })));
// interleave industries so neighbouring items differ
const ORDERED: Item[] = [];
for (let i = 0; i < 5; i++) INDUSTRIES.forEach((ind) => ORDERED.push({ title: ind.workflows[i].title, color: ind.color }));
const ROW_A = ORDERED.slice(0, 25);
const ROW_B = ORDERED.slice(25);

function Row({ items, reverse }: { items: Item[]; reverse?: boolean }) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#161616] to-transparent md:w-40" />
      <div className="absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#161616] to-transparent md:w-40" />
      <div className="flex overflow-hidden">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 ? true : undefined}
            className={`marquee-track flex shrink-0 items-center gap-12 pr-12 md:gap-16 md:pr-16 ${reverse ? "reverse" : ""}`}
            style={{ animationDuration: "90s" }}
          >
            {items.map((it) => (
              <li key={it.title} className="flex h-10 shrink-0 items-center gap-3 whitespace-nowrap">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: it.color, opacity: 0.8 }} />
                <span className="text-[22px] font-light tracking-tight text-white/75">{it.title}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

function FlipTile({ items, offset }: { items: Item[]; offset: number }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let iv: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      setI((v) => (v + 1) % items.length);
      iv = setInterval(() => setI((v) => (v + 1) % items.length), 3200);
    }, 2400 + offset * 350);
    return () => {
      clearTimeout(start);
      clearInterval(iv);
    };
  }, [items.length, offset]);

  return (
    <div className="relative flex h-[84px] items-center justify-center overflow-hidden" style={{ perspective: 600 }}>
      {items.map((it, k) => {
        const rel = (k - i + items.length) % items.length;
        const rot = rel === 0 ? 0 : rel === items.length - 1 ? 90 : -90;
        return (
          <div
            key={it.title}
            aria-hidden={rel !== 0}
            className="absolute inset-0 flex items-center justify-center gap-2 px-3 text-center"
            style={{
              transform: `rotateX(${rot}deg)`,
              opacity: rel === 0 ? 1 : 0,
              visibility: rel === 0 ? "visible" : "hidden",
              transition: "transform 600ms ease-in-out, opacity 600ms ease-in-out, visibility 600ms",
              backfaceVisibility: "hidden",
            }}
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: it.color, opacity: 0.8 }} />
            <span className="text-[15px] font-light leading-tight tracking-tight text-white/80">{it.title}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function Workflows() {
  const tiles = Array.from({ length: 8 }, (_, t) => [ORDERED[t], ORDERED[t + 10], ORDERED[t + 20]]);
  return (
    <>
      <div className="w-full border-t border-white/[0.08] md:hidden">
        <div className="grid grid-cols-2">
          {tiles.map((items, t) => (
            <div key={t} className={`border-b border-white/[0.08] ${t % 2 === 0 ? "border-r" : ""}`}>
              <FlipTile items={items} offset={t} />
            </div>
          ))}
        </div>
      </div>
      <div className="hidden space-y-6 md:block">
        <Row items={ROW_A} />
        <Row items={ROW_B} reverse />
      </div>
      <p className="sr-only">
        Example workflows include {ALL.slice(0, 12).map((a) => a.title.toLowerCase()).join(", ")} and more.
      </p>
    </>
  );
}

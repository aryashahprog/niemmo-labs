"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { INDUSTRIES } from "@/lib/industries";

const pad = (n: number) => String(n).padStart(2, "0");

export default function Industries() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const mobileTabs = useRef<(HTMLButtonElement | null)[]>([]);
  const ind = INDUSTRIES[active];
  const n = INDUSTRIES.length;

  const select = (i: number, focus?: "desktop" | "mobile") => {
    setActive(i);
    const list = focus === "mobile" ? mobileTabs.current : tabs.current;
    if (focus) {
      list[i]?.focus();
      list[i]?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
    }
  };

  const onKey = (e: KeyboardEvent, which: "desktop" | "mobile") => {
    const map: Record<string, number> = {
      ArrowDown: active + 1,
      ArrowRight: active + 1,
      ArrowUp: active - 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: n - 1,
    };
    if (!(e.key in map)) return;
    e.preventDefault();
    select((map[e.key] + n) % n, which);
  };

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-[background] duration-700"
        style={{
          background: `radial-gradient(ellipse 55% 50% at 62% 42%, ${ind.color}1f 0%, transparent 70%)`,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[3vw] top-1/2 hidden -translate-y-1/2 select-none md:right-[5vw] lg:block"
      >
        <span
          key={ind.slug}
          className="industry-number block font-pixel"
          style={{ fontSize: "clamp(180px, 35vw, 500px)", lineHeight: 0.85, color: ind.color }}
        >
          {pad(active + 1)}
        </span>
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 pb-28 pt-[6vh] md:px-10 md:pb-36 lg:pt-[12vh]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-20">
          {/* Desktop: vertical tab list */}
          <div className="hidden flex-col justify-center lg:flex">
            <div role="tablist" aria-label="Industries" aria-orientation="vertical" className="space-y-3">
              {INDUSTRIES.map((it, i) => {
                const on = i === active;
                return (
                  <button
                    key={it.slug}
                    ref={(el) => {
                      tabs.current[i] = el;
                    }}
                    role="tab"
                    id={`tab-${it.slug}`}
                    aria-selected={on}
                    aria-controls="industry-panel"
                    tabIndex={on ? 0 : -1}
                    onClick={() => select(i)}
                    onKeyDown={(e) => onKey(e, "desktop")}
                    className="group flex w-full items-center gap-4 rounded-sm text-left"
                  >
                    <span
                      aria-hidden="true"
                      className="w-[3px] shrink-0 self-stretch rounded-full transition-all duration-500"
                      style={{ backgroundColor: on ? it.color : "transparent", transform: on ? "scaleY(1)" : "scaleY(0)" }}
                    />
                    <span
                      className={`font-light leading-[1.05] tracking-tight transition-all duration-500 ${
                        on ? "translate-x-0 text-white" : "-translate-x-2 text-white/30 group-hover:text-white/60"
                      }`}
                      style={{ fontSize: "clamp(26px, 2.65vw, 40px)" }}
                    >
                      {it.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile/tablet: horizontal tab strip */}
          <div className="-mx-6 lg:hidden">
            <div
              role="tablist"
              aria-label="Industries"
              className="no-scrollbar flex snap-x gap-6 overflow-x-auto px-6 pb-2"
            >
              {INDUSTRIES.map((it, i) => {
                const on = i === active;
                return (
                  <button
                    key={it.slug}
                    ref={(el) => {
                      mobileTabs.current[i] = el;
                    }}
                    role="tab"
                    aria-selected={on}
                    aria-controls="industry-panel"
                    tabIndex={on ? 0 : -1}
                    onClick={() => select(i, "mobile")}
                    onKeyDown={(e) => onKey(e, "mobile")}
                    className={`relative shrink-0 snap-start whitespace-nowrap py-3 text-2xl font-light tracking-tight transition-colors ${
                      on ? "text-white" : "text-white/30"
                    }`}
                  >
                    {it.short}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-[2px] rounded-full transition-opacity"
                      style={{ backgroundColor: it.color, opacity: on ? 1 : 0 }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div
              id="industry-panel"
              role="tabpanel"
              aria-labelledby={`tab-${ind.slug}`}
              aria-live="polite"
              className="relative overflow-hidden rounded-lg border border-white/[0.08] p-7 md:p-10"
              style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
            >
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px transition-[background] duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${ind.color}66, transparent)` }}
              />
              <div key={ind.slug} className="panel-in">
                <p className="font-pixel text-[11px] uppercase tracking-[0.2em] text-white/35">
                  <span style={{ color: ind.color }}>{pad(active + 1)}</span> / {pad(n)} · {ind.audience}
                </p>
                <p className="mt-5 text-base font-light leading-relaxed tracking-tight text-white/75 md:text-lg">{ind.summary}</p>
                <p className="mt-7 text-[11px] uppercase tracking-[0.2em] text-white/30">Example workflows</p>
                <ol className="mt-3 divide-y divide-white/[0.06] border-y border-white/[0.06]">
                  {ind.workflows.map((w, i) => (
                    <li key={w.title} className="grid grid-cols-[28px_1fr] gap-x-3 py-3 md:grid-cols-[28px_190px_1fr] md:gap-x-4">
                      <span className="font-pixel text-xs leading-5" style={{ color: ind.color }}>
                        {pad(i + 1)}
                      </span>
                      <span className="text-sm font-medium leading-5 text-white/90">{w.title}</span>
                      <span className="col-start-2 mt-1 text-sm leading-relaxed text-white/50 md:col-start-3 md:mt-0">{w.body}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="mt-7 flex items-center justify-between gap-4">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  {INDUSTRIES.map((it, i) => (
                    <span
                      key={it.slug}
                      className="h-1.5 w-1.5 rounded-full transition-all duration-500"
                      style={{
                        backgroundColor: i === active ? ind.color : "rgba(255,255,255,0.12)",
                        opacity: i === active ? 0.9 : 0.6,
                      }}
                    />
                  ))}
                </div>
                <Link
                  href={`/industries/${ind.slug}/`}
                  className="hit-area group inline-flex items-center gap-2 rounded-sm text-xs font-medium uppercase tracking-widest text-white/70 transition-colors hover:text-white"
                >
                  Explore {ind.short}
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
            <div aria-hidden="true" className="mt-6 hidden space-y-[6px] px-6 opacity-60 lg:block">
              {ind.workflows.map((w, i) => (
                <div key={`${ind.slug}-${i}`} className="flex gap-[6px]" style={{ paddingLeft: `${(i % 3) * 24}px` }}>
                  <span className="h-[7px] rounded-[1px]" style={{ width: `${40 + w.title.length * 3}px`, backgroundColor: `${ind.color}14` }} />
                  <span className="h-[7px] rounded-[1px]" style={{ width: `${30 + w.body.length}px`, backgroundColor: `${ind.color}0d` }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 md:bottom-12" aria-hidden="true">
        {INDUSTRIES.map((it, i) => (
          <button
            key={it.slug}
            tabIndex={-1}
            onClick={() => select(i)}
            className="-my-[3px] py-[11px]"
          >
            <span
              className="block h-[3px] w-6 overflow-hidden rounded-full md:w-9"
              style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
            >
              <span
                className="block h-full rounded-full transition-all duration-500"
                style={{ backgroundColor: it.color, opacity: i <= active ? 0.6 : 0, width: i <= active ? "100%" : "0%" }}
              />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

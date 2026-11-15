"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { FEATURED_INDUSTRIES as LIST } from "@/lib/industries";

const pad = (n: number) => String(n).padStart(2, "0");

export default function Industries() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const ind = LIST[active];
  const n = LIST.length;

  const select = (i: number, focus?: boolean) => {
    setActive(i);
    if (focus) tabs.current[i]?.focus({ preventScroll: true });
  };

  const onKey = (e: KeyboardEvent) => {
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
    select((map[e.key] + n) % n, true);
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

      <div className="relative mx-auto w-full max-w-7xl px-6 pb-20 pt-[6vh] md:px-10 md:pb-28 lg:pt-[10vh]">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col justify-center">
            <div
              role="tablist"
              aria-label="Industries"
              className="grid grid-cols-2 gap-2 lg:grid-cols-1 lg:gap-0 lg:space-y-4"
            >
              {LIST.map((it, i) => {
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
                    onKeyDown={onKey}
                    className={`group flex w-full items-center gap-3 rounded-md border px-4 py-3 text-left transition-colors lg:gap-4 lg:rounded-sm lg:border-0 lg:p-0 ${
                      on ? "border-white/30 bg-white/[0.06] lg:bg-transparent" : "border-white/[0.1] lg:bg-transparent"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="hidden w-[3px] shrink-0 self-stretch rounded-full transition-all duration-500 lg:block"
                      style={{ backgroundColor: on ? it.color : "transparent", transform: on ? "scaleY(1)" : "scaleY(0)" }}
                    />
                    <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full lg:hidden" style={{ backgroundColor: it.color }} />
                    <span
                      className={`text-sm font-normal leading-tight transition-all duration-500 lg:text-[clamp(26px,2.65vw,40px)] lg:font-light lg:leading-[1.05] lg:tracking-tight ${
                        on ? "text-white lg:translate-x-0" : "text-white/70 lg:-translate-x-2 lg:text-white/45 lg:group-hover:text-white/60"
                      }`}
                    >
                      {it.name}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="mt-6 text-sm text-white/60 lg:mt-12">
              Other workflows?{" "}
              <Link href="/contact/" className="hit-area rounded-sm text-white/80 underline underline-offset-4 transition-colors hover:text-white">
                Let’s talk.
              </Link>
            </p>
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
                <p className="font-pixel text-[11px] uppercase tracking-[0.2em] text-white/50">
                  <span style={{ color: ind.color }}>{pad(active + 1)}</span> / {pad(n)} · {ind.audience}
                </p>
                <p className="mt-5 text-base font-light leading-relaxed tracking-tight text-white/75 md:text-lg">{ind.summary}</p>
                <p className="mt-7 text-[11px] uppercase tracking-[0.2em] text-white/45">Example workflows</p>
                <ol className="mt-3 divide-y divide-white/[0.06] border-y border-white/[0.06]">
                  {ind.workflows.map((w, i) => (
                    <li key={w.title} className="grid grid-cols-[28px_1fr] gap-x-3 py-3 md:grid-cols-[28px_190px_1fr] md:gap-x-4">
                      <span className="font-pixel text-xs leading-5" style={{ color: ind.color }}>
                        {pad(i + 1)}
                      </span>
                      <span className="text-sm font-medium leading-5 text-white/90">{w.title}</span>
                      <span className="col-start-2 mt-1 text-sm leading-relaxed text-white/60 md:col-start-3 md:mt-0">{w.body}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="mt-7 flex justify-end">
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
          </div>
        </div>
      </div>
    </div>
  );
}

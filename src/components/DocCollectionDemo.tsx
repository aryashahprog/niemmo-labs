"use client";

import { useRef, useState, type KeyboardEvent } from "react";

type Status = "requested" | "ready" | "missing" | "flagged" | "waiting";

const STATUS: Record<Status, { label: string; color: string }> = {
  requested: { label: "Requested", color: "rgba(255,255,255,0.45)" },
  ready: { label: "Matched", color: "#7ED957" },
  missing: { label: "Missing", color: "#F5A623" },
  flagged: { label: "Needs review", color: "#FF6F61" },
  waiting: { label: "Waiting on client", color: "#F5A623" },
};

const ITEMS: { name: string; status: Status[]; note: string[] }[] = [
  {
    name: "Business checking statement",
    status: ["requested", "ready", "ready", "ready"],
    note: ["", "October 1–31, filed", "", "Filed to October"],
  },
  {
    name: "Credit card statement",
    status: ["requested", "ready", "ready", "ready"],
    note: ["", "October 1–31, filed", "", "Filed to October"],
  },
  {
    name: "Payroll summary",
    status: ["requested", "missing", "missing", "waiting"],
    note: ["", "Reminder scheduled", "", "Second reminder scheduled"],
  },
  {
    name: "Equipment loan statement",
    status: ["requested", "flagged", "flagged", "waiting"],
    note: ["", "Covers September, not October", "Staff: request the October statement", "October statement requested"],
  },
  {
    name: "Receipts over $75",
    status: ["requested", "flagged", "ready", "ready"],
    note: ["", "12 matched, 2 unreadable", "Staff: matched 2 by hand", "14 of 14 filed"],
  },
];

const STAGES = [
  { label: "Trigger", title: "October checklist opens", body: "Built from the firm’s monthly bookkeeping template. Requests go out through the client portal." },
  { label: "Automated steps", title: "Files matched and tracked", body: "Uploads are matched to the client and period. The tracker updates and reminders are scheduled for gaps." },
  { label: "Staff review", title: "A bookkeeper checks the exceptions", body: "Only the flagged items reach a person: a statement for the wrong period and two unreadable receipts." },
  { label: "Expected output", title: "A clear status for the close", body: "Matched files are filed. The firm sees exactly what is still outstanding and who it’s waiting on." },
];

export default function DocCollectionDemo() {
  const [stage, setStage] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const n = STAGES.length;
  const go = (i: number, focus?: boolean) => {
    const next = (i + n) % n;
    setStage(next);
    if (focus) tabs.current[next]?.focus({ preventScroll: true });
  };
  const onKey = (e: KeyboardEvent) => {
    const map: Record<string, number> = { ArrowRight: stage + 1, ArrowDown: stage + 1, ArrowLeft: stage - 1, ArrowUp: stage - 1, Home: 0, End: n - 1 };
    if (!(e.key in map)) return;
    e.preventDefault();
    go(map[e.key], true);
  };
  const s = STAGES[stage];
  const outstanding = ITEMS.filter((it) => it.status[stage] !== "ready").length;

  return (
    <div className="overflow-hidden rounded-lg border border-white/[0.08] bg-black/30">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] px-6 py-4 md:px-8">
        <h3 className="text-lg font-light tracking-tight text-white md:text-xl">Client document collection</h3>
        <span className="rounded-sm border border-white/[0.15] px-2 py-1 font-pixel text-[10px] uppercase tracking-[0.2em] text-white/60">
          Illustrative example · fictional data
        </span>
      </div>

      <div role="tablist" aria-label="Workflow stages" className="grid grid-cols-2 border-b border-white/[0.08] md:grid-cols-4">
        {STAGES.map((st, i) => {
          const on = i === stage;
          return (
            <button
              key={st.label}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`demo-tab-${i}`}
              aria-selected={on}
              aria-controls="demo-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => go(i)}
              onKeyDown={onKey}
              className={`relative flex items-center gap-2 px-6 py-4 text-left text-xs uppercase tracking-[0.15em] transition-colors md:px-8 ${
                on ? "text-white" : "text-white/55 hover:text-white/80"
              } ${i % 2 === 0 ? "border-r border-white/[0.08]" : "md:border-r"} ${i < 2 ? "border-b border-white/[0.08] md:border-b-0" : ""} md:last:border-r-0`}
            >
              <span className="font-pixel text-white/45">{String(i + 1).padStart(2, "0")}</span>
              {st.label}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-[2px] transition-opacity"
                style={{ backgroundColor: "#B48CFF", opacity: on ? 1 : 0 }}
              />
            </button>
          );
        })}
      </div>

      <div id="demo-panel" role="tabpanel" aria-labelledby={`demo-tab-${stage}`} className="grid gap-8 p-6 md:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-12">
        <div key={stage} className="panel-in">
          <p className="text-2xl font-light tracking-tight text-white">{s.title}</p>
          <p className="mt-3 text-sm leading-relaxed text-white/70 md:text-base">{s.body}</p>
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => go(stage - 1)}
              disabled={stage === 0}
              className="h-10 rounded-sm border border-white/[0.15] px-4 text-xs uppercase tracking-widest text-white/80 transition-colors hover:border-white/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => go(stage + 1)}
              className="h-10 rounded-sm bg-white px-4 text-xs font-medium uppercase tracking-widest text-black transition-colors hover:bg-white/85"
            >
              {stage === n - 1 ? "Start over" : "Next step"}
            </button>
          </div>
        </div>

        <div className="rounded-md border border-white/[0.08] bg-[#121212]">
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/[0.08] px-4 py-3">
            <p className="text-sm text-white/85">Harbor &amp; Pine Landscaping (fictional) · October close</p>
            <p className="font-pixel text-[11px] uppercase tracking-[0.15em] text-white/55">
              {outstanding === 0 ? "All matched" : `${outstanding} of ${ITEMS.length} open`}
            </p>
          </div>
          <ul>
            {ITEMS.map((it) => {
              const st = STATUS[it.status[stage]];
              const note = it.note[stage];
              return (
                <li key={it.name} className="grid grid-cols-1 gap-1 border-b border-white/[0.06] px-4 py-3 last:border-b-0 sm:grid-cols-[1fr_auto] sm:gap-4">
                  <div>
                    <p className="text-sm text-white/85">{it.name}</p>
                    {note && <p className="mt-0.5 text-xs text-white/55">{note}</p>}
                  </div>
                  <p className="flex items-center gap-2 text-xs text-white/75 sm:justify-end">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: st.color }} />
                    {st.label}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

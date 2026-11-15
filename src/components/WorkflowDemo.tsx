"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";

type Status = "requested" | "ready" | "missing" | "flagged" | "waiting";

const COLORS: Record<Status, string> = {
  requested: "rgba(255,255,255,0.45)",
  ready: "#7ED957",
  missing: "#F5A623",
  flagged: "#FF6F61",
  waiting: "#F5A623",
};

type Scenario = {
  id: string;
  tab: string;
  title: string;
  record: string;
  href: string;
  linkLabel: string;
  labels: Record<Status, string>;
  stages: { title: string; body: string }[];
  items: { name: string; status: Status[]; note: string[] }[];
};

const STAGE_LABELS = ["Trigger", "Automated steps", "Staff review", "Expected output"];

const SCENARIOS: Scenario[] = [
  {
    id: "clinic",
    tab: "Clinic intake",
    title: "New patient intake",
    record: "Fictional patient · new visit Thursday 9:30",
    href: "/industries/healthcare/",
    linkLabel: "Explore clinic workflows",
    labels: { requested: "Requested", ready: "Complete", missing: "Not received", flagged: "Needs review", waiting: "Waiting on referrer" },
    stages: [
      { title: "A new patient books a visit", body: "The booking sends the practice’s own intake forms by text or email." },
      { title: "Forms checked as they arrive", body: "Responses are checked for missing fields, reminders go out for gaps, and the referral letter is requested from the referring office." },
      { title: "The front desk checks the exceptions", body: "Only what needs a person reaches staff: an unreadable insurance card. Clinical questions stay with clinicians." },
      { title: "Ready before the visit", body: "Completed details are prepared for staff to confirm in the EMR, and the front desk sees what’s still outstanding." },
    ],
    items: [
      { name: "Patient details form", status: ["requested", "ready", "ready", "ready"], note: ["", "All fields complete", "", "Prepared for EMR, staff to confirm"] },
      { name: "Insurance card", status: ["requested", "flagged", "flagged", "ready"], note: ["", "Back of card unreadable", "Staff: request a clearer photo", "Verified by front desk"] },
      { name: "Health history questionnaire", status: ["requested", "missing", "missing", "ready"], note: ["", "Reminder sent", "", "Received after reminder"] },
      { name: "Referral letter", status: ["requested", "waiting", "waiting", "waiting"], note: ["", "Requested from referring office", "", "Front desk notified"] },
      { name: "Consent and privacy forms", status: ["requested", "ready", "ready", "ready"], note: ["", "Signed", "", "Filed"] },
    ],
  },
  {
    id: "bookkeeping",
    tab: "Bookkeeping close",
    title: "Client document collection",
    record: "Fictional client · October close",
    href: "/industries/accounting/",
    linkLabel: "Explore accounting workflows",
    labels: { requested: "Requested", ready: "Matched", missing: "Missing", flagged: "Needs review", waiting: "Waiting on client" },
    stages: [
      { title: "October checklist opens", body: "Built from the firm’s monthly bookkeeping template. Requests go out through the client portal." },
      { title: "Files matched and tracked", body: "Uploads are matched to the client and period. The tracker updates and reminders are scheduled for gaps." },
      { title: "A bookkeeper checks the exceptions", body: "Only the flagged items reach a person: a statement for the wrong period and two unreadable receipts." },
      { title: "A clear status for the close", body: "Matched files are filed. The firm sees exactly what is still outstanding and who it’s waiting on." },
    ],
    items: [
      { name: "Business checking statement", status: ["requested", "ready", "ready", "ready"], note: ["", "October 1–31, filed", "", "Filed to October"] },
      { name: "Credit card statement", status: ["requested", "ready", "ready", "ready"], note: ["", "October 1–31, filed", "", "Filed to October"] },
      { name: "Payroll summary", status: ["requested", "missing", "missing", "waiting"], note: ["", "Reminder scheduled", "", "Second reminder scheduled"] },
      { name: "Equipment loan statement", status: ["requested", "flagged", "flagged", "waiting"], note: ["", "Covers September, not October", "Staff: request the October statement", "October statement requested"] },
      { name: "Receipts over $75", status: ["requested", "flagged", "ready", "ready"], note: ["", "12 matched, 2 unreadable", "Staff: matched 2 by hand", "14 of 14 filed"] },
    ],
  },
];

export default function WorkflowDemo() {
  const [sc, setSc] = useState(0);
  const [stage, setStage] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const n = STAGE_LABELS.length;
  const S = SCENARIOS[sc];
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
  const s = S.stages[stage];
  const outstanding = S.items.filter((it) => it.status[stage] !== "ready").length;

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-white/[0.08] bg-black/30">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] px-6 py-4 md:px-8">
          <div role="group" aria-label="Choose an example" className="flex gap-2">
            {SCENARIOS.map((x, i) => (
              <button
                key={x.id}
                type="button"
                aria-pressed={i === sc}
                onClick={() => {
                  setSc(i);
                  setStage(0);
                }}
                className={`h-10 rounded-sm border px-3 text-xs uppercase tracking-[0.12em] transition-colors ${
                  i === sc ? "border-white/40 bg-white/[0.08] text-white" : "border-white/[0.12] text-white/60 hover:text-white/85"
                }`}
              >
                {x.tab}
              </button>
            ))}
          </div>
          <span className="rounded-sm border border-white/[0.15] px-2 py-1 font-pixel text-[10px] uppercase tracking-[0.2em] text-white/60">
            Illustrative example · fictional data
          </span>
        </div>

        <div role="tablist" aria-label={`${S.title}: workflow stages`} className="grid grid-cols-2 border-b border-white/[0.08] md:grid-cols-4">
          {STAGE_LABELS.map((label, i) => {
            const on = i === stage;
            return (
              <button
                key={label}
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
                {label}
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
          <div key={`${S.id}-${stage}`} className="panel-in">
            <p className="text-xs uppercase tracking-[0.15em] text-white/50">{S.title}</p>
            <p className="mt-3 text-2xl font-light tracking-tight text-white">{s.title}</p>
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
              <p className="text-sm text-white/85">{S.record}</p>
              <p className="font-pixel text-[11px] uppercase tracking-[0.15em] text-white/55">
                {outstanding === 0 ? "All complete" : `${outstanding} of ${S.items.length} open`}
              </p>
            </div>
            <ul>
              {S.items.map((it) => {
                const status = it.status[stage];
                const note = it.note[stage];
                return (
                  <li key={it.name} className="grid grid-cols-1 gap-1 border-b border-white/[0.06] px-4 py-3 last:border-b-0 sm:grid-cols-[1fr_auto] sm:gap-4">
                    <div>
                      <p className="text-sm text-white/85">{it.name}</p>
                      {note && <p className="mt-0.5 text-xs text-white/55">{note}</p>}
                    </div>
                    <p className="flex items-center gap-2 text-xs text-white/75 sm:justify-end">
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: COLORS[status] }} />
                      {S.labels[status]}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <Link
        href={S.href}
        className="hit-area group mt-6 inline-flex items-center gap-2 rounded-sm text-xs font-medium uppercase tracking-widest text-white/70 transition-colors hover:text-white"
      >
        {S.linkLabel}
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </Link>
    </>
  );
}

import type { FlowExample as Flow } from "@/lib/industries";

const STAGES = ["Trigger", "Automated steps", "Human review", "Result"] as const;

/** Illustrative workflow: trigger → automated steps → human review → result. Not a client deployment. */
export default function FlowExample({ flow, color, headingId }: { flow: Flow; color: string; headingId?: string }) {
  const cells: (string | string[])[] = [flow.trigger, flow.steps, flow.review, flow.result];
  return (
    <div className="overflow-hidden rounded-lg border border-white/[0.08] bg-black/30">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] px-6 py-4 md:px-8">
        <h3 id={headingId} className="text-lg font-light tracking-tight text-white md:text-xl">
          {flow.name}
        </h3>
        <span className="rounded-sm border border-white/[0.15] px-2 py-1 font-pixel text-[10px] uppercase tracking-[0.2em] text-white/60">
          Illustrative example
        </span>
      </div>
      <ol className="grid lg:grid-cols-4">
        {cells.map((c, i) => (
          <li
            key={STAGES[i]}
            className={`relative px-6 py-6 md:px-8 ${i < 3 ? "border-b border-white/[0.08] lg:border-b-0 lg:border-r" : ""}`}
          >
            <p className="flex items-center gap-2 font-pixel text-[11px] uppercase tracking-[0.2em] text-white/55">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color, opacity: i === 2 ? 1 : 0.7 }} />
              {STAGES[i]}
            </p>
            {Array.isArray(c) ? (
              <ul className="mt-4 space-y-3">
                {c.map((s) => (
                  <li key={s} className="flex gap-3 text-sm leading-relaxed text-white/75">
                    <span aria-hidden="true" className="mt-[9px] h-px w-3 shrink-0" style={{ backgroundColor: color }} />
                    {s}
                  </li>
                ))}
              </ul>
            ) : (
              <p className={`mt-4 text-sm leading-relaxed md:text-base ${i === 3 ? "text-white" : "text-white/75"}`}>{c}</p>
            )}
            {i < 3 && (
              <span
                aria-hidden="true"
                className="absolute -bottom-[9px] left-6 z-10 flex h-[18px] w-[18px] items-center justify-center rounded-full border border-white/[0.12] bg-[#161616] text-[10px] text-white/60 md:left-8 lg:-right-[9px] lg:bottom-auto lg:left-auto lg:top-7"
              >
                <span className="lg:hidden">↓</span>
                <span className="hidden lg:inline">→</span>
              </span>
            )}
          </li>
        ))}
      </ol>
      <p className="border-t border-white/[0.08] px-6 py-4 text-xs leading-relaxed text-white/55 md:px-8">
        An example of a workflow we can build, not a description of a client deployment or an existing product.
      </p>
    </div>
  );
}

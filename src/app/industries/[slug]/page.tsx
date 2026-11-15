import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import ClosingCta from "@/components/ClosingCta";
import Footer from "@/components/Footer";
import { INDUSTRIES, getIndustry } from "@/lib/industries";
import { STEPS } from "@/lib/site";

const pad = (n: number) => String(n).padStart(2, "0");

export const dynamicParams = false;

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const ind = getIndustry((await params).slug);
  if (!ind) return {};
  return {
    title: `${ind.name} automation`,
    description: `${ind.summary} For ${ind.audience.toLowerCase()}.`,
    alternates: { canonical: `industries/${ind.slug}/` },
  };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const ind = getIndustry((await params).slug);
  if (!ind) notFound();
  const idx = INDUSTRIES.indexOf(ind);
  const prev = INDUSTRIES[(idx - 1 + INDUSTRIES.length) % INDUSTRIES.length];
  const next = INDUSTRIES[(idx + 1) % INDUSTRIES.length];

  return (
    <div className="relative min-h-screen w-full bg-[#161616] text-white">
      <Nav />
      <main id="main">
        <header className="relative overflow-hidden px-6 pb-20 pt-40 md:px-10 md:pb-28 md:pt-52">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(ellipse 60% 55% at 70% 35%, ${ind.color}24 0%, transparent 70%)` }}
          />
          <div aria-hidden="true" className="pointer-events-none absolute right-[4vw] top-24 hidden select-none font-pixel md:block" style={{ fontSize: "clamp(160px, 28vw, 420px)", lineHeight: 0.85, color: ind.color, opacity: 0.07 }}>
            {pad(idx + 1)}
          </div>
          <div className="relative mx-auto max-w-7xl">
            <Reveal immediate>
              <nav aria-label="Breadcrumb" className="mb-10 font-pixel text-[11px] uppercase tracking-[0.3em] text-white/30">
                <Link href="/#industries" className="hit-area rounded-sm transition-colors hover:text-white/60">
                  Industries
                </Link>{" "}
                / <span style={{ color: ind.color }}>{pad(idx + 1)}</span>
              </nav>
            </Reveal>
            <Reveal immediate y={20} delay={0.1}>
              <h1 className="flex items-stretch gap-5 text-4xl font-light leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">
                <span aria-hidden="true" className="w-[3px] shrink-0 rounded-full" style={{ backgroundColor: ind.color }} />
                <span className="max-w-4xl">{ind.name}</span>
              </h1>
            </Reveal>
            <Reveal immediate y={14} delay={0.2} className="mt-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
              <p className="max-w-2xl text-lg font-light leading-relaxed text-white/75 md:text-xl">{ind.summary}</p>
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/35 md:text-right">For {ind.audience}</p>
            </Reveal>
          </div>
        </header>

        <section aria-labelledby="wf-heading" className="relative px-6 md:px-10">
          <div className="mx-auto max-w-7xl">
            <SectionLabel>Example workflows</SectionLabel>
            <h2 id="wf-heading" className="sr-only">
              Example workflows
            </h2>
            <ol className="grid gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] md:grid-cols-2 lg:grid-cols-3">
              {ind.workflows.map((w, i) => (
                <li key={w.title} className="bg-[#161616]">
                  <Reveal y={24} delay={0.06 * i} duration={0.8} className="flex h-full flex-col p-7 md:p-9">
                  <span className="font-pixel text-sm" style={{ color: ind.color }}>
                    {pad(i + 1)}
                  </span>
                  <h3 className="mt-8 text-2xl font-light tracking-tight text-white">{w.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/55 md:text-base">{w.body}</p>
                  </Reveal>
                </li>
              ))}
              <li className="flex flex-col justify-between bg-[#161616] p-7 md:p-9">
                <span className="font-pixel text-sm text-white/30">+</span>
                <p className="mt-8 text-sm leading-relaxed text-white/55 md:text-base">
                  These are examples of what we can build, not a fixed menu. We start from how your team works today and
                  shape automations around it.
                </p>
              </li>
            </ol>
            <p className="mt-6 text-xs leading-relaxed text-white/35">
              Workflows described here illustrate what can be built; they are not past client deployments.
            </p>
          </div>
        </section>

        <section aria-labelledby="tools-heading" className="relative px-6 pt-24 md:px-10 md:pt-32">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
            <div>
              <SectionLabel>Connects with</SectionLabel>
              <h2 id="tools-heading" className="text-3xl font-light leading-[1.1] tracking-tight md:text-4xl">
                Works with the systems <span className="text-white/60">you already run.</span>
              </h2>
              <div className="mt-8 flex flex-wrap gap-3">
                {ind.tools.map((t) => (
                  <span key={t} className="rounded-lg border border-white/[0.08] px-4 py-2 font-pixel text-[11px] uppercase tracking-[0.15em] text-white/45 md:text-xs">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <SectionLabel>How we work</SectionLabel>
              <ol className="border-t border-white/[0.06]">
                {STEPS.map((s, i) => (
                  <li key={s.label} className="grid grid-cols-[44px_120px_1fr] items-baseline gap-x-3 border-b border-white/[0.06] py-4">
                    <span className="font-pixel text-xs text-white/30">{pad(i + 1)}</span>
                    <span className="text-base text-white">{s.label}</span>
                    <span className="text-sm leading-relaxed text-white/55">{s.body}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <nav aria-label="More industries" className="px-6 pt-24 md:px-10 md:pt-32">
          <div className="mx-auto grid max-w-7xl grid-cols-2 border-y border-white/[0.08]">
            {[
              { label: "Previous", it: prev, align: "text-left" },
              { label: "Next", it: next, align: "text-right" },
            ].map(({ label, it, align }) => (
              <Link
                key={label}
                href={`/industries/${it.slug}/`}
                className={`group py-8 ${align} ${label === "Previous" ? "border-r border-white/[0.08] pr-4" : "pl-4"}`}
              >
                <span className="block text-[11px] uppercase tracking-[0.2em] text-white/30">{label}</span>
                <span className="mt-2 block text-xl font-light tracking-tight text-white/60 transition-colors group-hover:text-white md:text-3xl">
                  {it.name}
                </span>
              </Link>
            ))}
          </div>
        </nav>

        <ClosingCta />
      </main>
      <Footer />
    </div>
  );
}

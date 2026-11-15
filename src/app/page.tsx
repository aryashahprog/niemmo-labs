import Nav from "@/components/Nav";
import HeroCanvas from "@/components/HeroCanvas";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import Workflows from "@/components/Workflows";
import Industries from "@/components/Industries";
import ClosingCta from "@/components/ClosingCta";
import Footer from "@/components/Footer";
import { PrimaryButton, SecondaryButton } from "@/components/Buttons";
import { CAPABILITIES, CTA, STEPS, TOOL_TYPES, asset } from "@/lib/site";

const pad = (n: number) => String(n).padStart(2, "0");

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-[#161616] text-white">
      <Nav />
      <main id="main">
        {/* Hero */}
        <header className="relative w-full overflow-hidden bg-[#2a2a2a]" style={{ minHeight: "100svh" }}>
          <HeroCanvas />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.25)_100%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/55 to-transparent" />
          <div className="relative z-10 flex flex-col justify-end pb-20 md:pb-[8vh]" style={{ minHeight: "100svh" }}>
            <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
              <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                <h1 className="relative">
                  {["Your business.", "Less busywork."].map((line, i) => (
                    <span
                      key={line}
                      className="hero-in text-glow-metallic font-display block"
                      style={{ fontSize: "clamp(36px, 8vw, 64px)", lineHeight: 0.86, letterSpacing: "-0.045em", fontWeight: 400, paddingBottom: "0.06em", animationDelay: `${0.15 + i * 0.12}s` }}
                    >
                      {line}
                    </span>
                  ))}
                </h1>
                <div className="hero-in max-w-sm md:pb-1" style={{ animationDelay: "0.45s" }}>
                  <p className="text-sm leading-relaxed text-white/75 md:text-base">
                    We build and deploy AI automations around the way your business works. Less manual work. Smoother
                    operations. More room to grow.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <PrimaryButton href={CTA.href}>{CTA.label}</PrimaryButton>
                    <SecondaryButton href="#solutions">Explore Solutions</SecondaryButton>
                  </div>
                </div>
              </div>
            </div>
            <Reveal immediate delay={1} className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 md:bottom-8 md:block">
              <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-bob h-6 w-6 text-white/40">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </Reveal>
          </div>
        </header>

        {/* Mission */}
        <section aria-labelledby="mission-heading" className="relative z-10 overflow-hidden pb-20 pt-32 md:pb-28 md:pt-48">
          <div
            aria-hidden="true"
            className="smoke-mask pointer-events-none absolute inset-0"
            style={{ backgroundImage: `url(${asset("/textures/smoke.webp")})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.15, mixBlendMode: "screen" }}
          />
          <div className="relative mx-auto max-w-7xl px-6 md:px-10">
            <SectionLabel>Our Mission</SectionLabel>
            <Reveal y={40}>
              <h2 id="mission-heading" className="mx-auto mb-12 max-w-3xl text-left text-3xl font-light leading-[1.15] tracking-tight text-white md:mb-16 md:text-4xl lg:text-5xl xl:text-6xl">
                <span className="block">Built around</span>{" "}
                <span className="mt-2 block font-pixel text-white/60">your business.</span>
              </h2>
              <div className="mx-auto flex max-w-2xl items-start gap-6 md:gap-8">
                <div
                  className="mt-1 h-24 w-[2px] shrink-0"
                  style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.25), rgba(255,255,255,0.08), transparent)" }}
                />
                <p className="text-base leading-relaxed text-white/60 md:text-lg">
                  Every business runs differently. We work alongside your team to understand the details, connect your
                  systems and automate the work that slows you down.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Workflow marquee */}
        <div className="relative">
          <section aria-labelledby="workflows-heading" className="relative w-full overflow-hidden py-20 md:py-28">
            <div className="mx-auto mb-12 max-w-7xl px-6 md:mb-16 md:px-10">
              <Reveal y={20}>
                <h2 id="workflows-heading" className="text-center font-pixel text-sm uppercase tracking-[0.2em] text-white/50">
                  Work we take off your plate
                </h2>
              </Reveal>
            </div>
            <Workflows />
          </section>
        </div>

        {/* Solutions */}
        <section id="solutions" aria-labelledby="solutions-heading" className="relative w-full overflow-hidden pb-4 pt-12 md:pb-6 md:pt-16">
          <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
            <SectionLabel>Solutions</SectionLabel>
            <Reveal y={40} className="mb-12 md:mb-16">
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <h2 id="solutions-heading" className="text-4xl font-light leading-[0.95] tracking-tight md:text-5xl lg:text-6xl">
                  <span>Automation is</span>
                  <br />
                  <span className="text-white/60">the backbone.</span>
                </h2>
                <p className="max-w-sm text-sm leading-relaxed text-white/60 md:pb-1 md:text-base">
                  Five capabilities, combined to fit the job. Every industry solution we build sits on top of them.
                </p>
              </div>
            </Reveal>
            <ul className="border-t border-white/[0.06]">
              {CAPABILITIES.map((c, i) => (
                <Reveal
                  as="li"
                  key={c.title}
                  y={24}
                  delay={0.08 * i}
                  duration={0.8}
                  className="group grid grid-cols-[44px_1fr] gap-x-4 gap-y-2 border-b border-white/[0.06] py-7 md:grid-cols-[80px_1fr_1fr] md:items-baseline md:gap-x-8 md:py-9"
                >
                  <span className="font-pixel text-sm text-white/30 transition-colors duration-300 group-hover:text-white/70 md:text-base">{pad(i + 1)}</span>
                  <h3 className="text-2xl font-light tracking-tight text-white transition-transform duration-500 md:text-3xl md:group-hover:translate-x-1 lg:text-4xl">
                    {c.title}
                  </h3>
                  <p className="col-start-2 max-w-md text-sm leading-relaxed text-white/60 md:col-start-3 md:text-base">{c.body}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* Integrations */}
        <section aria-labelledby="tools-heading" className="relative w-full overflow-hidden pb-4 pt-24 md:pb-6 md:pt-32">
          <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
            <SectionLabel className="mb-12 md:mb-16">Integrations</SectionLabel>
            <Reveal as="h2" y={20} duration={0.8} className="text-center text-3xl font-light leading-[1.1] tracking-tight md:text-4xl lg:text-5xl">
              <span id="tools-heading" className="text-white">Built on the tools</span> <span className="text-white/60">you already use</span>
            </Reveal>
            <Reveal as="p" y={12} delay={0.1} duration={0.8} className="mx-auto mt-8 max-w-2xl text-center text-base leading-relaxed text-white/60 md:text-lg">
              No rip-and-replace. We connect the systems your team already relies on, so work moves between them without
              re-keying, copy and paste or extra logins.
            </Reveal>
            <Reveal y={12} delay={0.2} duration={0.8} className="mt-10 flex flex-wrap justify-center gap-3 md:mt-14 md:gap-4">
              {TOOL_TYPES.map((t) => (
                <span key={t} className="rounded-lg border border-white/[0.08] px-4 py-2 font-pixel text-[11px] uppercase tracking-[0.15em] text-white/40 md:text-xs">
                  {t}
                </span>
              ))}
            </Reveal>
          </div>
        </section>

        {/* Industries */}
        <section id="industries" aria-labelledby="industries-heading" className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[60vh]"
            style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "6px 6px", maskImage: "radial-gradient(ellipse 60% 60% at 75% 30%, black 0%, transparent 70%)", WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 75% 30%, black 0%, transparent 70%)" }}
          />
          <div className="relative mx-auto max-w-7xl px-6 pb-4 pt-24 md:px-10 md:pb-0 md:pt-32">
            <SectionLabel>Industries</SectionLabel>
            <Reveal y={30} className="max-w-3xl">
              <h2 id="industries-heading" className="text-3xl font-light leading-[1.15] tracking-tight text-white md:text-4xl lg:text-5xl">
                Industries we <span className="font-pixel text-white/60">work across</span>
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60">
                Automation is the backbone; industry-specific workflows sit on top of it. Choose an industry to see the kinds
                of workflows we build — each one shaped around the business and the tools it already runs on.
              </p>
            </Reveal>
          </div>
          <Industries />
        </section>

        {/* How we work */}
        <section id="how-we-work" aria-labelledby="how-heading" className="relative w-full overflow-hidden pb-4 pt-12 md:pb-6 md:pt-16">
          <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
            <SectionLabel>How We Work</SectionLabel>
            <Reveal y={40} className="mb-16 md:mb-20">
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <h2 id="how-heading" className="text-4xl font-light leading-[0.95] tracking-tight md:text-5xl lg:text-6xl">
                  <span>Forward deployed,</span>
                  <br />
                  <span className="text-white/60">start to finish.</span>
                </h2>
                <p className="max-w-sm text-sm leading-relaxed text-white/60 md:pb-1 md:text-base">
                  We embed with your team and own the work end to end — discovery, development, deployment and ongoing
                  improvement.
                </p>
              </div>
            </Reveal>
            <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((s, i) => (
                <Reveal
                  as="li"
                  key={s.label}
                  y={30}
                  delay={0.1 * i}
                  duration={0.8}
                  className={`relative border-white/[0.06] py-8 lg:px-8 lg:py-0 lg:first:pl-0 lg:last:pr-0 ${
                    i < STEPS.length - 1 ? "border-b lg:border-b-0 lg:border-r" : ""
                  } ${i % 2 === 0 ? "md:pr-8" : "md:pl-8"} ${i < 2 ? "md:border-b" : "md:border-b-0"} ${i % 2 === 0 ? "md:border-r" : "md:border-r-0"} lg:pl-8 lg:pr-8`}
                >
                  <span className="mb-4 block text-[11px] uppercase tracking-[0.2em] text-white/30 md:text-xs">Step {pad(i + 1)}</span>
                  <div className="mb-3 font-pixel text-5xl leading-none tracking-tighter text-white md:text-6xl lg:text-[64px]">{s.label}</div>
                  <p className="max-w-[260px] text-sm leading-relaxed text-white/60 md:text-base">{s.body}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <ClosingCta />
      </main>
      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { STEPS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Let’s Talk",
  description: "Tell us what slows your business down. We’ll find where automation can make a difference.",
};

export default function ContactPage() {
  return (
    <div className="relative min-h-screen w-full bg-[#161616] text-white">
      <Nav />
      <main id="main" className="relative overflow-hidden px-6 pb-12 pt-40 md:px-10 md:pt-52">
        <div
          aria-hidden="true"
          className="smoke-mask pointer-events-none absolute inset-0"
          style={{ backgroundImage: "url(/textures/smoke.webp)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.1, mixBlendMode: "screen" }}
        />
        <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
          <div>
            <Reveal immediate>
              <p className="mb-10 font-pixel text-[11px] uppercase tracking-[0.3em] text-white/30">Let’s Talk</p>
            </Reveal>
            <Reveal immediate y={20} delay={0.1}>
              <h1 className="text-glow-metallic font-display" style={{ fontSize: "clamp(36px, 6vw, 64px)", lineHeight: 0.9, letterSpacing: "-0.045em" }}>
                Show us what
                <br />
                slows you down.
              </h1>
            </Reveal>
            <Reveal immediate y={14} delay={0.2}>
              <p className="mt-8 max-w-md text-base leading-relaxed text-white/60 md:text-lg">
                Tell us a little about your business and the work that eats up your team’s time. We’ll find where automation
                can make a difference.
              </p>
              <p className="mt-12 text-[11px] uppercase tracking-[0.2em] text-white/30">What happens next</p>
              <ol className="mt-4 border-t border-white/[0.06]">
                {STEPS.map((s, i) => (
                  <li key={s.label} className="grid grid-cols-[36px_1fr] gap-x-3 border-b border-white/[0.06] py-3 text-sm">
                    <span className="font-pixel text-white/30">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-white/60">
                      <span className="text-white">{s.label}.</span> {s.body}
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
          <Reveal immediate y={20} delay={0.25} className="lg:pt-20">
            <ContactForm />
          </Reveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}

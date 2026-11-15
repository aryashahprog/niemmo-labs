import Reveal from "./Reveal";
import { PrimaryButton } from "./Buttons";
import { CTA, asset } from "@/lib/site";

export default function ClosingCta() {
  return (
    <section aria-labelledby="cta-heading" className="relative overflow-hidden px-6 pb-8 pt-32 md:px-10 md:pt-44">
      <div
        aria-hidden="true"
        className="smoke-mask pointer-events-none absolute inset-0"
        style={{ backgroundImage: `url(${asset("/textures/smoke.webp")})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.12, mixBlendMode: "screen" }}
      />
      <div className="relative mx-auto max-w-7xl text-center">
        <Reveal y={20}>
          <h2 id="cta-heading" className="text-glow-metallic font-display mx-auto max-w-4xl" style={{ fontSize: "clamp(36px, 6vw, 72px)", lineHeight: 0.95, letterSpacing: "-0.045em" }}>
            Show us what
            <br />
            slows you down.
          </h2>
        </Reveal>
        <Reveal y={12} delay={0.1}>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-white/60 md:text-lg">
            Let’s find where automation can make a difference.
          </p>
        </Reveal>
        <Reveal y={12} delay={0.2} className="mt-10 flex justify-center">
          <PrimaryButton href={CTA.href}>{CTA.label}</PrimaryButton>
        </Reveal>
      </div>
    </section>
  );
}

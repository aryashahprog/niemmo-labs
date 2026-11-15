import Link from "next/link";
import { Mark } from "./Logo";
import { CTA, NAV_LINKS } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative z-10 overflow-hidden px-6 pb-0 pt-24 md:px-10 md:pt-32">
      <div className="relative mx-auto max-w-7xl">
        <div className="mt-12 flex flex-col-reverse items-center justify-between gap-6 border-t border-white/[0.12] pt-12 sm:flex-row">
          <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {[...NAV_LINKS, CTA].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="hit-area rounded-sm text-xs tracking-wide text-white/60 transition-colors duration-300 hover:text-white"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="text-center sm:text-right">
            <p className="text-xs tracking-wide text-white/50">© {new Date().getFullYear()} Niemmo Labs</p>
            <p className="mt-0.5 text-xs tracking-wide text-white/50">All Rights Reserved.</p>
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="relative -mb-[1.2vw] mt-16 flex select-none items-center justify-center gap-[3vw] overflow-hidden text-[#9a9a9a] md:mt-24"
        style={{
          maskImage: "linear-gradient(to top, transparent 0%, black 60%)",
          WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 60%)",
        }}
      >
        <Mark className="h-[14vw] w-auto opacity-80" r={0.42} />
        <span className="font-sans font-normal leading-[0.8] tracking-[-0.01em] opacity-80" style={{ fontSize: "17.5vw" }}>
          NIEMMO
        </span>
      </div>
    </footer>
  );
}

import Reveal from "./Reveal";

export default function SectionLabel({ children, className = "mb-10 md:mb-14" }: { children: string; className?: string }) {
  return (
    <Reveal className={`flex items-center gap-6 ${className}`}>
      <span className="font-pixel text-[11px] uppercase tracking-[0.3em] text-white/40">{children}</span>
      <div className="h-px flex-1 bg-white/[0.04]" />
    </Reveal>
  );
}

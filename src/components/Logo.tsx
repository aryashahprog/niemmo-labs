const DOTS: [number, number][] = [];
for (let r = 0; r < 5; r++) {
  DOTS.push([0, r], [3, r]);
}
DOTS.push([1, 1], [1, 2], [2, 2], [2, 3]);

export function Mark({ className = "", r = 0.4 }: { className?: string; r?: number }) {
  return (
    <svg viewBox="0 0 4 5" className={className} aria-hidden="true" fill="currentColor">
      {DOTS.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x + 0.5} cy={y + 0.5} r={r} />
      ))}
    </svg>
  );
}

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2 text-white ${className}`}>
      <Mark className="h-7 w-auto md:h-9" />
      <span className="flex flex-col justify-center leading-none">
        <span className="text-[17px] font-medium tracking-[0.02em] md:text-[21px]">NIEMMO LABS</span>
        <span className="mt-1 whitespace-nowrap text-[8px] font-medium uppercase tracking-[0.04em] text-white/90 md:text-[9px]">
          AI automation, forward deployed
        </span>
      </span>
    </span>
  );
}

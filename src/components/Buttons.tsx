import Link from "next/link";
import type { ReactNode } from "react";

export function PrimaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex h-11 items-center gap-2 rounded-sm bg-white px-5 text-xs font-medium uppercase tracking-widest text-black transition-colors duration-200 hover:bg-white/85"
    >
      {children}
    </Link>
  );
}

export function SecondaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex h-11 items-center gap-2 rounded-sm border border-white/25 px-5 text-xs font-medium uppercase tracking-widest text-white/85 backdrop-blur-sm transition-colors duration-200 hover:border-white/60 hover:text-white"
    >
      {children}
    </Link>
  );
}

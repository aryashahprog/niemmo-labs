"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import { CTA, NAV_LINKS } from "@/lib/site";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const first = menuRef.current?.querySelector<HTMLElement>("a");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
      if (e.key === "Tab" && menuRef.current) {
        const items = [buttonRef.current, ...menuRef.current.querySelectorAll<HTMLElement>("a")].filter(
          Boolean,
        ) as HTMLElement[];
        const i = items.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && i <= 0) {
          e.preventDefault();
          items[items.length - 1].focus();
        } else if (!e.shiftKey && i === items.length - 1) {
          e.preventDefault();
          items[0].focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled && !open;

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          solid ? "border-b border-white/[0.08] bg-black/70 py-4 backdrop-blur-lg" : "bg-transparent py-5 md:py-6"
        }`}
      >
        <div className="flex w-full items-center justify-between px-5 md:px-8">
          <Link href="/" className="relative z-50 flex items-center rounded-sm">
            <Logo />
          </Link>
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-12 md:flex">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="-mx-1 rounded-sm px-1 text-xs font-medium uppercase tracking-widest text-white/70 transition-all duration-200 hover:text-white"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <Link
            href={CTA.href}
            aria-current={pathname?.startsWith("/contact") ? "page" : undefined}
            className="hidden rounded-sm border border-white/20 px-4 py-2 text-xs font-medium uppercase tracking-widest text-white/90 transition-colors duration-200 hover:border-white/60 hover:bg-white hover:text-black md:inline-flex"
          >
            {CTA.label}
          </Link>
          <button
            ref={buttonRef}
            type="button"
            className="relative z-50 -mr-2 rounded-sm p-2 text-white/90 transition-colors hover:text-white md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? (
                <>
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </>
              ) : (
                <>
                  <path d="M4 12h16" />
                  <path d="M4 18h16" />
                  <path d="M4 6h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!open}
        className="fixed inset-0 z-40 bg-black px-6 pt-24 md:hidden"
      >
        <ul className="flex flex-col">
          {[...NAV_LINKS, CTA].map((l, i) => (
            <li
              key={l.href}
              className="border-b border-white/[0.1]"
              style={{ animation: open ? `menu-in 0.5s var(--ease-out-quint) ${0.05 * i}s both` : undefined }}
            >
              <Link href={l.href} onClick={() => setOpen(false)} className="block py-6 text-lg font-medium uppercase tracking-[0.12em] text-white">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

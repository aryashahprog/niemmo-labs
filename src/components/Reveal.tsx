"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

type Props = {
  as?: ElementType;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  y?: number;
  delay?: number;
  duration?: number;
  immediate?: boolean;
  margin?: string;
  id?: string;
};

export default function Reveal({
  as: Tag = "div",
  children,
  className,
  style,
  y = 0,
  delay = 0,
  duration = 1,
  immediate = false,
  margin = "0px 0px -80px 0px",
  id,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (immediate) {
      const t = requestAnimationFrame(() => el.setAttribute("data-in", "true"));
      return () => cancelAnimationFrame(t);
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.setAttribute("data-in", "true");
            io.disconnect();
          }
        }
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [immediate, margin]);

  return (
    <Tag
      ref={ref}
      id={id}
      data-reveal=""
      className={className}
      style={
        {
          ...style,
          "--ry": `${y}px`,
          "--delay": `${delay}s`,
          "--rd": `${duration}s`,
        } as CSSProperties
      }
    >
      {children}
    </Tag>
  );
}

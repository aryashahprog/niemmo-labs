import type { CSSProperties, ElementType, ReactNode } from "react";

type Props = {
  as?: ElementType;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  y?: number;
  delay?: number;
  duration?: number;
  immediate?: boolean;
  id?: string;
};

/** Fades content in on scroll. Driven by the inline script in the root layout, not React. */
export default function Reveal({
  as: Tag = "div",
  children,
  className,
  style,
  y = 0,
  delay = 0,
  duration = 1,
  immediate = false,
  id,
}: Props) {
  return (
    <Tag
      id={id}
      data-reveal=""
      data-immediate={immediate ? "" : undefined}
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

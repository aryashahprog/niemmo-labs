import type { CSSProperties, ElementType, ReactNode } from "react";

/**
 * Metallic gradient text with a soft glow. The glow is a text-shadow on an aria-hidden copy
 * behind the text, which rasterizes far cheaper than chained drop-shadow filters.
 */
export default function GlowText({
  as: Tag = "span",
  children,
  className = "",
  style,
  id,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  id?: string;
}) {
  return (
    <Tag id={id} className={`glow-text ${className}`} style={style}>
      <span aria-hidden="true" className="glow-text-shadow">
        {children}
      </span>
      <span className="glow-text-fill">{children}</span>
    </Tag>
  );
}

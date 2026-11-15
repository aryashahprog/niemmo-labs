import type { CSSProperties } from "react";
import { asset } from "@/lib/site";

/** Decorative smoke texture; the image is only fetched as the section nears the viewport. */
export default function SmokeLayer({ opacity }: { opacity: number }) {
  return (
    <div
      aria-hidden="true"
      data-lazy-bg=""
      className="smoke-layer smoke-mask pointer-events-none absolute inset-0"
      style={{ "--smoke": `url(${asset("/textures/smoke.webp")})`, opacity } as CSSProperties}
    />
  );
}

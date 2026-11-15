import type { MetadataRoute } from "next";
import { FEATURED_INDUSTRIES, OTHER_INDUSTRIES } from "@/lib/industries";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

const url = (path: string) => `${SITE_URL.replace(/\/$/, "")}/${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: url(""), priority: 1 },
    ...FEATURED_INDUSTRIES.map((i) => ({ url: url(`industries/${i.slug}/`), priority: 0.8 })),
    { url: url("contact/"), priority: 0.6 },
    ...OTHER_INDUSTRIES.map((i) => ({ url: url(`industries/${i.slug}/`), priority: 0.3 })),
  ];
}

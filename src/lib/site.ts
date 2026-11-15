export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

/** Prefix a public/ asset path with the deployment base path. */
export const asset = (path: string) => `${BASE_PATH}${path}`;

export const NAV_LINKS = [
  { label: "Solutions", href: "/#solutions" },
  { label: "Industries", href: "/#industries" },
  { label: "How We Work", href: "/#how-we-work" },
] as const;

export const CTA = { label: "Let’s Talk", href: "/contact/" } as const;

/**
 * Contact delivery. Both are unset until real details exist; the contact form
 * stays disabled (never silently discards) until at least one is configured.
 * - NEXT_PUBLIC_CONTACT_ENDPOINT: URL that accepts a JSON POST (e.g. a form backend).
 * - NEXT_PUBLIC_CONTACT_EMAIL: inbox used for a mailto handoff.
 */
export const CONTACT = {
  endpoint: process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
};

export const CAPABILITIES = [
  {
    title: "Workflow automation",
    body: "Straightforward rules handle routine routing, reminders and updates, with people stepping in where judgment matters.",
  },
  {
    title: "AI agents and assistants",
    body: "AI that classifies incoming messages and drafts responses for your team to review, within limits you set.",
  },
  {
    title: "Document processing",
    body: "AI reads invoices, statements, forms and emails and turns them into structured data your systems can use.",
  },
  {
    title: "System integrations",
    body: "Inboxes, spreadsheets, CRM and operational tools connected, filling the gaps between them.",
  },
  {
    title: "Custom operational software",
    body: "When off-the-shelf doesn’t fit, lightweight internal tools built for how your team actually works.",
  },
] as const;

export const STEPS = [
  { label: "Identify", body: "We find one bottleneck worth fixing first." },
  { label: "Map", body: "We map the current process with the people who do the work, including what your software already handles." },
  { label: "Scope", body: "We agree a scoped pilot: what it covers and where staff approve." },
  { label: "Build", body: "We implement it in your tools, with approval points where judgment matters." },
  { label: "Support", body: "We monitor, maintain and adjust it as your business changes." },
] as const;

export const TOOL_TYPES = [
  "CRM",
  "Email & Calendar",
  "Spreadsheets",
  "Accounting",
  "Property Management",
  "Field Service",
  "Project Management",
  "Document Storage",
  "E-signature",
] as const;

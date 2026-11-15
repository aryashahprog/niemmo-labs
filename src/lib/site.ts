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
    body: "Repetitive, rules-based work runs on its own — intake, routing, reminders, updates — with people stepping in where judgment matters.",
  },
  {
    title: "AI agents and assistants",
    body: "Assistants that answer questions, draft responses and take routine actions inside your tools, within limits you set.",
  },
  {
    title: "Document processing",
    body: "Forms, invoices, PDFs and emails read, checked and turned into structured data your systems can use.",
  },
  {
    title: "System integrations",
    body: "Your systems connected, so information moves between them without copy and paste.",
  },
  {
    title: "Custom operational software",
    body: "When off-the-shelf doesn’t fit, lightweight internal tools built for how your team actually works.",
  },
] as const;

export const STEPS = [
  { label: "Understand", body: "We map your workflows with the people doing the work." },
  { label: "Build", body: "We build the automations and connect them to your systems." },
  { label: "Deploy", body: "We put the solution into daily use and help your team adopt it." },
  { label: "Improve", body: "We monitor, maintain and refine it as your business evolves." },
] as const;

export const TOOL_TYPES = [
  "CRM",
  "Email & Calendar",
  "Spreadsheets",
  "Accounting",
  "EMR / Practice Management",
  "Field Service",
  "E-commerce",
  "ERP & Inventory",
  "Document Storage",
] as const;

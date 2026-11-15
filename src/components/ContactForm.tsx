"use client";

import { useState, type FormEvent } from "react";
import { FEATURED_INDUSTRIES } from "@/lib/industries";
import { CONTACT } from "@/lib/site";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "mailto"; href: string; body: string }
  | { kind: "error"; message: string };

const field =
  "mt-2 w-full rounded-md border border-white/[0.12] bg-black/30 px-4 py-3 text-base text-white placeholder:text-white/35 transition-colors focus:border-white/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50";
const label = "block text-[11px] uppercase tracking-[0.2em] text-white/60";

export default function ContactForm() {
  const configured = Boolean(CONTACT.endpoint || CONTACT.email);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!configured) return;
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    if (CONTACT.endpoint) {
      setStatus({ kind: "sending" });
      try {
        const res = await fetch(CONTACT.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        form.reset();
        setStatus({ kind: "sent" });
      } catch {
        setStatus({
          kind: "error",
          message: CONTACT.email
            ? `We couldn’t send your message. Please email us at ${CONTACT.email}.`
            : "We couldn’t send your message. Please try again in a moment.",
        });
      }
      return;
    }

    const body = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      data.company && `Company: ${data.company}`,
      data.industry && `Industry: ${data.industry}`,
      "",
      data.message,
    ]
      .filter((l) => l !== undefined && l !== "")
      .join("\n");
    const href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      `Let’s talk — ${data.company || data.name}`,
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setStatus({ kind: "mailto", href, body });
  }

  if (status.kind === "sent") {
    return (
      <div role="status" className="rounded-lg border border-white/[0.08] bg-black/30 p-8">
        <p className="text-2xl font-light tracking-tight">Thanks — your message is in.</p>
        <p className="mt-3 text-white/70">We’ll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate={false} aria-describedby={configured ? undefined : "contact-unavailable"}>
      {!configured && (
        <div id="contact-unavailable" role="note" className="mb-8 rounded-md border border-[#F5A623]/30 bg-[#F5A623]/[0.06] p-4 text-sm leading-relaxed text-white/75">
          Our contact inbox isn’t connected yet, so this form is turned off rather than risk losing your message. Please
          check back shortly.
        </div>
      )}
      <fieldset disabled={!configured || status.kind === "sending"} className="grid gap-6 md:grid-cols-2">
        <legend className="sr-only">Tell us about your business</legend>
        <div>
          <label htmlFor="name" className={label}>Name</label>
          <input id="name" name="name" required autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor="email" className={label}>Work email</label>
          <input id="email" name="email" type="email" required autoComplete="email" className={field} />
        </div>
        <div>
          <label htmlFor="company" className={label}>Company</label>
          <input id="company" name="company" autoComplete="organization" className={field} />
        </div>
        <div>
          <label htmlFor="industry" className={label}>Industry</label>
          <select id="industry" name="industry" className={`${field} appearance-none`} defaultValue="">
            <option value="">Select an industry</option>
            {FEATURED_INDUSTRIES.map((i) => (
              <option key={i.slug} value={i.name}>{i.name}</option>
            ))}
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="message" className={label}>What slows you down?</label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="The repetitive tasks, handoffs or tools that eat up your team’s time."
            className={`${field} resize-y`}
          />
        </div>
        <div className="flex flex-wrap items-center gap-4 md:col-span-2">
          <button
            type="submit"
            className="inline-flex h-11 items-center rounded-sm bg-white px-6 text-xs font-medium uppercase tracking-widest text-black transition-colors hover:bg-white/85 disabled:cursor-not-allowed disabled:bg-white/30"
          >
            {status.kind === "sending" ? "Sending…" : "Send message"}
          </button>
          {CONTACT.email && !CONTACT.endpoint && (
            <span className="text-xs text-white/55">Opens your email app with your message ready to send.</span>
          )}
        </div>
      </fieldset>
      <div aria-live="polite" className="mt-6 text-sm">
        {status.kind === "error" && <p className="text-[#ff8a7a]">{status.message}</p>}
        {status.kind === "mailto" && (
          <p className="text-white/70">
            Your email app should have opened with your message. If it didn’t,{" "}
            <a href={status.href} className="underline underline-offset-4 hover:text-white">open it here</a> or email{" "}
            <a href={`mailto:${CONTACT.email}`} className="underline underline-offset-4 hover:text-white">{CONTACT.email}</a>.
          </p>
        )}
      </div>
    </form>
  );
}

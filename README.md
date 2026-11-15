# Niemmo Labs website

Marketing site for Niemmo Labs. Next.js 15 (App Router, static export), React 19, Tailwind CSS v4, Geist + Inter.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to ./out
```

Requires Node 22.12+.

## Structure

- `src/app/page.tsx` — home page (hero, mission, workflows, solutions, integrations, industries, how we work, CTA)
- `src/app/industries/[slug]/` — one statically generated page per industry
- `src/app/contact/` — Let's Talk page and form
- `src/lib/industries.ts` — industry content (add an entry to add a page)
- `src/lib/site.ts` — navigation, capabilities, process steps, contact config
- `src/components/HeroCanvas.tsx` — WebGL hero (pauses off-screen and under reduced motion)

## Before launch: contact details

No contact endpoint or email is configured, so the contact form is **disabled** and says so,
rather than accepting submissions it can't deliver. Set one or both at build time:

| Variable | Behavior |
| --- | --- |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | Form POSTs JSON (`name`, `email`, `company`, `industry`, `message`) to this URL (e.g. Formspree, a serverless function). Shows success only on a 2xx response; errors are shown to the user. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Without an endpoint, the form opens the visitor's email app with the message prefilled. Also used as a fallback in error messages. |

Also confirm the production domain in `metadataBase` (`src/app/layout.tsx`, currently `https://niemmolabs.com`).

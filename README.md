# BUCKBOTICS — Marketing Website

Next.js 16 (App Router, static/SSG) implementation of the **BUCKBOTICS Master Website Developer Specification V2** — all 36 mandated routes, 9 robot families / 27 models, 30-industry directory, 5 BUCKi PERSONA collections, BUCKCORE technology section, and a validated lead-enquiry system.

## Quick start

```bash
npm install
npm run dev          # development — http://localhost:3000

npm run build        # production build (fully static)
npm run start        # serve the build — e.g. npm run start -- -p 3111

npm run lint         # eslint (must be 0 errors)
npx tsc --noEmit     # type check
```

## Project structure

```
src/
  app/                  App Router pages — one folder per spec chapter
    robots/             robots index + 9 family pages + 6 PERSONA pages
    industries/         30-industry directory + 5 industry detail pages
    technology/buckcore/  BUCKCORE platform (10 planned modules)
    solutions/          solutions + pilot programme
    company/            about + partnerships
    resources/faq/      FAQ
    legal/              privacy, terms, cookies, accessibility (draft for counsel)
    actions/enquiry.ts  server action for the contact/lead form
  components/
    layout/             Header (sticky mega menu + mobile drawer), Footer
    ui/                 SmartImage, Wordmark, ModelGallery, EnquiryForm, Cards, Primitives, Content
    legal/              LegalShell
  data/                 ✍ content layer (CMS-swappable — see below)
    site.ts families.ts industries.ts persona.ts buckcore.ts
    status.ts faq.ts navigation.ts
  lib/                  metadata helpers, enquiry storage/validation
public/images/          image assets (see IMAGES_REQUIRED.md for the full list)
.leads/enquiries.jsonl  lead store (git-ignored; created at runtime)
```

## Content / data layer

All copy lives in `src/data/*` as typed TypeScript modules. There is **no external CMS** — the data files are designed so each module can later be swapped for a CMS adapter (Sanity, Contentful, Payload, markdown, …) without touching the page components, because pages only import typed objects (`FAMILIES`, `INDUSTRIES`, `PERSONA_COLLECTIONS`, `BUCKCORE_MODULES`, …).

To migrate to a CMS: keep the exported interfaces, replace the constant with an async fetch, and add revalidation. No page markup changes needed.

### Content rules baked into the data

- Concept-stage disclaimer appears on every product surface (spec mandate).
- Unknown specifications render exactly as `Not specified / under engineering evaluation.` — never fabricated numbers.
- No certifications, deployments, prices, or performance claims are invented.
- Status labels come only from `status.ts` (the spec's controlled vocabulary).

## Lead form & storage

`src/app/actions/enquiry.ts` (server action):

- Zod validation, honeypot field, 3-second time-trap, per-IP throttle.
- Lead tags derived from `?type=` / persona selection (FORGE, CARE, PERSONA-M200, …).
- Consent + timestamp recorded with every submission.
- Stores to a JSONL file; optionally forwards to a CRM.

Environment variables (copy `.env.example` to `.env.local`):

| Variable | Purpose |
| --- | --- |
| `LEADS_FILE` | Override lead file path (default `.leads/enquiries.jsonl`) |
| `CRM_WEBHOOK_URL` | If set, every lead is POSTed here as JSON (CRM/Zapier/Make webhook) |

Without any env vars the site works out of the box — leads simply accumulate in `.leads/enquiries.jsonl`.

## Images

Logo and product renders are delivered separately by the client. Until they arrive, `SmartImage` shows labelled concept placeholders and `Wordmark` renders a text lockup (spec-compliant fallback). **See `IMAGES_REQUIRED.md`** for the complete file list, sizes, and naming.

## UI motion (React Bits)

Select animated components from [reactbits.dev](https://reactbits.dev) (MIT) live in `src/components/bits/`, adapted for this codebase:

- **SplitText** (GSAP) — hero headline word reveal; `aria-label` keeps the accessible name intact.
- **DecryptedText** — hero eyebrow "decode" effect (motion dependency removed; sr-only always holds the real text).
- **CountUp** — hero stats strip (9 / 27 / 30 / 10) rewritten with IntersectionObserver + rAF; SSR renders final values.
- **Particles** — WebGL constellation backdrop in the BUCKCORE section (`aria-hidden` canvas).
- **GlareHover** — sheen sweep on family/persona cards.
- **SpotlightCard** — cursor-following glow on BUCKCORE module cards.
- **AnimatedContent** (GSAP ScrollTrigger) — grid entrance reveals; hidden state is the `.ac-init` CSS class, which is overridden for `prefers-reduced-motion` and no-JS browsers.

Runtime deps added: `gsap` + `@gsap/react` (homepage bundle only). Every effect honours `prefers-reduced-motion`, and the axe suite must stay at 0 violations.

## Accessibility

- Target: **WCAG 2.2 AA** (spec mandate).
- axe-core scans (A/AA tags) run over **all 36 routes + the 404 page** — 0 violations required.
- Skip link, keyboard mega-menu/drawer, focus-visible outlines, `prefers-reduced-motion` respected.
- Brand blue darkened to `#0e6eb8` so white-on-blue text passes AA (4.9:1); `#158de6` retained as `--color-blue-bright` for dark surfaces.

## Deployment

Any Node host (Vercel, Railway, Fly, VPS). Build is fully static except the enquiry server action, which needs a Node runtime:

```bash
npm ci && npm run build && npm run start
```

Set `CRM_WEBHOOK_URL` in the host's environment to push leads into your CRM.

## Legal pages

`/legal/*` pages are **drafts for counsel review** and are labelled as such in the UI — final review by qualified counsel is required before launch (spec acceptance item).

# IBCR — Indian Business Chamber in Rwanda

A premium institutional website for the Indian Business Chamber in Rwanda: a business
platform strengthening trade, investment and economic collaboration between India and
Rwanda.

> **Connect · Collaborate · Grow**

---

## Stack

| Layer      | Choice                                                                 |
| ---------- | ---------------------------------------------------------------------- |
| Framework  | Next.js 16 (App Router, React 19, TypeScript, Turbopack)                |
| Styling    | Tailwind CSS v4 with a token-first `@theme` design system               |
| Motion     | Motion (Framer Motion) for reveals · GSAP ScrollTrigger for scrubbing   |
| Scrolling  | Lenis, synced to GSAP's ticker                                          |
| 3D         | three.js via React Three Fiber + drei                                   |
| Icons      | lucide-react                                                            |
| Hero media | three.js scenes rendered offline to MP4 (see `tools/media`)             |

No CSS framework overrides, no component library — the UI is bespoke.

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint (flat config)
npm run typecheck  # next typegen && tsc --noEmit
```

---

## Design system

Everything visual is driven by tokens in `src/app/globals.css`.

**Colour** — every surface is **pure white**. There is no tinted band anywhere: sections
are separated by hairlines (`--color-hairline`), whitespace and typography. The single
surface tint on the site is a neutral light grey (`--color-hover`, `#f4f4f5`), used only
for hover and selected states.

Navy is ink (`--color-navy-900` and friends) and gold (`--color-gold`) is a hairline
accent — a rule, an icon, a small cap, or the fill behind navy text on the primary button.
Neither is ever a page background. Flag hues (saffron, India green, Rwanda blue) appear
only in the wordmark and the India × Rwanda material.

Gold never carries body text — its contrast on white is too low.

The one dark surface on the entire site is the hero video, which needs a dark grade for
the white headline to read against it.

**Type** — three families, loaded through `next/font`:

- **Manrope** — display and UI, tight tracking on headings
- **Instrument Serif** (italic) — the editorial accent inside a heading, one phrase at a time
- **JetBrains Mono** — eyebrows, numerals and metadata (`.label-mono`)

**Motion** — the rule is *premium, subtle, purposeful*. Reveals are 0.7s with an
`ease-out-expo` curve, hovers are 300ms, parallax is a few percent. Everything collapses to
a plain fade under `prefers-reduced-motion`, and Lenis switches itself off entirely for
reduced-motion visitors and coarse pointers.

Reusable utilities: `.container-page`, `.accent-serif`, `.label-mono`, `.dot-veil`
(hero only), `.rule-gold`, `.link-underline`.

---

## Structure

```
src/
├── app/
│   ├── page.tsx                 Home — the 14-section blueprint
│   ├── about/                   Who we are, vision, board, team, partners
│   ├── membership/              Why join, benefits, categories
│   │   └── join/                Application form (pre-selects ?tier=)
│   ├── services/                Six services, each with a deep-link anchor
│   ├── india-rwanda/            Why Rwanda, why India, corridor, opportunities
│   ├── events/                  Flagship, upcoming, registration, past
│   ├── insights/                Filterable index + article pages
│   ├── members/                 Searchable member directory
│   ├── contact/                 Details, enquiry form, map
│   ├── privacy | terms | cookies
│   └── api/                     enquiry · membership · events/register · newsletter
├── components/
│   ├── brand/IbcrMark.tsx       The wordmark, as real vector outlines
│   ├── home/                    One component per homepage section
│   ├── layout/                  Header (mega-nav), Footer, PageHero, LegalPage
│   ├── forms/                   Field primitives + the four forms
│   ├── members/                 Directory with live search and filters
│   ├── motion/                  SmoothScroll, Reveal, Parallax, ScrollProgress
│   ├── three/                   R3F corridor globe + lazy mounting stage
│   └── ui/                      Button, Section, cards, Counter
├── lib/
│   ├── content.ts               All site content in one typed module
│   ├── forms.ts                 Shared submit hook
│   └── server/submissions.ts    Validation, rate limiting, delivery
└── tools/media/                 Offline hero-footage renderer
```

---

## The hero

The hero is a single looping video, full-bleed, graded with a navy gradient and a halftone
dot veil so the headline reads against it. No carousel, no controls — just the footage, the
eyebrow, the headline, one line of copy and two calls to action.

The footage is **not** stock. `tools/media/scenes.mjs` defines three deterministic,
seamlessly-looping three.js scenes — `corridor` is the one the hero uses; the other two are
rendered spares you can swap in by pointing `HERO.video` at them in `src/lib/content.ts`:

| Scene       | What it shows                                              |
| ----------- | ---------------------------------------------------------- |
| `corridor`  | A point-shell globe with live trade arcs, India → Kigali    |
| `filaments` | Light filaments streaming through a navy field              |
| `lattice`   | A drifting network lattice with gold hubs                   |

They are rendered headlessly and encoded to H.264:

```bash
npm run media:preview    # sample frames into tools/media/__preview
npm run media:render     # full render → public/video/*.mp4 + posters
```

The renderer needs a Chromium binary and ffmpeg:

```bash
CHROMIUM_PATH=/path/to/chromium FFMPEG_PATH=/path/to/ffmpeg npm run media:render
```

Each scene's `update(t)` takes normalised progress, so the last frame joins back to the
first and the loop is invisible. Output is ~6 MB total for all three clips; a poster frame
sits underneath the video so there is never a blank hero.

The same corridor scene also runs **live** in WebGL in the India × Rwanda section
(`components/three/`), where it is draggable. It only mounts once it is near the viewport,
so the three.js bundle and the GPU context are never paid for above the fold.

---

## The wordmark

`components/brand/IbcrMark.tsx` is the IBCR logo as real vector outlines — Playfair
Display 700 glyphs converted to paths once with opentype.js (`tools/ibcr-logo-paths.json`),
so it renders identically without shipping a webfont. The "I" carries the Indian tricolour
with the Ashoka Chakra, the "R" carries the flag of Rwanda with its sun, and every letter
is edged in IBCR gold. Pass `tone="dark"` for the one place it sits on dark — the header
while it is over the hero video.

A standalone `public/brand/ibcr-logo.svg` is available for decks and email signatures.

---

## Forms

Four forms post JSON to route handlers under `src/app/api/`:

| Endpoint               | Used by                       |
| ---------------------- | ----------------------------- |
| `/api/enquiry`         | Contact form                  |
| `/api/membership`      | Membership application        |
| `/api/events/register` | Event registration            |
| `/api/newsletter`      | Footer subscription           |

Every handler validates field-by-field, checks a honeypot, and rate-limits by client IP
(6 requests per minute). They return `{ message }` on success and `{ error }` with a 4xx on
failure, which the UI surfaces inline.

### Wiring the forms up

`src/lib/server/submissions.ts` currently records submissions to the server log. To deliver
them somewhere real, either:

1. Set `IBCR_SUBMISSION_WEBHOOK` to a URL (Zapier, Make, a CRM inbox) — every submission is
   POSTed there as `{ kind, receivedAt, data }`; or
2. Replace the body of `deliver()` with your mail transport or database write.

Nothing else needs to change.

---

## Replacing sample content

`src/lib/content.ts` is the single source of truth for the whole site. It carries a
**placeholder notice** at the top: member companies, testimonials, board members, event
dates and statistics are illustrative sample content used to build the experience out.
Replace them with verified IBCR data — or point the module at a CMS (Sanity or Strapi, per
the project blueprint) — before launch.

Also review before going live:

- `SITE.phone`, `SITE.email`, `SITE.address` and the social URLs in `content.ts`
- `SITE.url`, which drives canonical URLs, `sitemap.xml` and Open Graph metadata

---

## Accessibility & performance notes

- Skip link, visible focus rings (gold, 2px), and semantic landmarks throughout
- Every interactive control is at least 44×44px on touch, with `cursor-pointer`
- Body text meets 4.5:1 against white; gold is never used for body copy
- `prefers-reduced-motion` disables Lenis, parallax and counters, and reduces reveals to a fade
- The map iframe and the WebGL globe both load lazily
- Videos are `muted`, `playsInline` and paired with poster frames, so no layout shift
- Responsive from 375px up; verified at 390, 768, 1024 and 1440

---

## Licence

© Indian Business Chamber in Rwanda. All rights reserved.

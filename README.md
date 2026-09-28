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
│   └── ui/                      Button, Section, cards, Counter,
│                                parallax-scroll-feature-section,
│                                card-fan-carousel
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

## The globe

The India × Rwanda section runs a **real world map** in WebGL
(`components/three/CorridorGlobe.tsx`), draggable, with the Chamber's routes
drawn from Kigali to Delhi, Mumbai and Ahmedabad.

Geography is Natural Earth at 1:50m, rasterised offline by
`tools/media/worldmap.mjs` into `public/textures/world-map.png`:

```bash
node tools/media/worldmap.mjs     # → public/textures/world-map.png
```

That file is two masks rather than a picture — red is land, green is national
borders — so the colours are mixed in the shader and stay in the design system.
Change `uLand`, `uOcean` or `uBorder` in the component and nothing needs
regenerating; regenerate only to change the resolution or the source data.

The globe only mounts once it is near the viewport, so the three.js bundle and
the GPU context are never paid for above the fold.

---

## Membership, pricing and the board

`components/ui/pricing-section.tsx` (with `pricing-card` and `pricing-tab`)
renders the Chamber's four categories — Silver, Gold, Platinum and Corporate —
on the homepage and again on `/membership#categories`. The toggle above the
grid switches between the standard annual fee and the Chamber's limited offer
rate; the figure springs between the two and the standard rate stays visible,
struck through, so the discount is legible rather than implied. Platinum
inverts to navy, which is the whole hierarchy on a white page — no coloured
rings and no "most popular" claim. Each card's CTA carries its category into
the application form via `?tier=`.

`components/ui/team-showcase.tsx` renders the seven board members on
`/about#leadership`: a staggered wall of portraits beside the list of names.
Pointing at, tabbing to or tapping a name brings that portrait to full colour
and swaps the person's full details into the panel below. The panel has a
reserved height and cross-fades, so moving down the list never shifts the page
under the cursor. A member with no portrait yet shows their initials on a
drawn plate.

Both read from `src/lib/content.ts` (`MEMBERSHIP_TIERS`, `BOARD`), which now
carries the Chamber's verified categories, fees, board, mission and vision.

**`components/ui/integration-hero.tsx`** drives *Our strategic partners*: two
rows of circular tiles drifting in opposite directions over a dotted ground.
Each row is doubled and travels exactly half its width, so the loop has no
seam; the keyframes live in `globals.css` beside the ones the rest of the site
uses. A partner with no logo file shows their initials.

**`components/ui/clean-testimonial.tsx`** drives *Testimonials*: one quote at a
time, advanced by clicking anywhere in the panel, with the cursor replaced by a
magnetic "Next" disc. That swap only happens where a real pointer exists, and
the same action is a focusable button, so it works from the keyboard and on
touch without one.

**`components/ui/logo-clouds.tsx`** drives the member logo wall, on the
homepage under the partners marquee and again on `/membership#member-logos`.
Each mark wipes away left-to-right and back on a timer, staggered across the
grid, so the wall refreshes without moving. A company with no logo file shows
its initials — which matters more here than anywhere else, since a half-filled
logo wall reads as a half-empty chamber. The wipe never runs under reduced
motion.

**`components/ui/SectionBackdrop.tsx`** puts a photograph behind a full-width
section, veiled in white and faded from alternating sides. Two places use it,
and both reuse images the site already has rather than adding new slots: each
service section on `/services` takes that service's own card photograph, and
each sector section on `/india-rwanda#opportunities` takes that sector's own
card photograph. The corridor page shows the eight sectors in long form; the
homepage keeps the compact card grid, so the two read as detail and preview.

**The footer is revealed from underneath.** `.footer-reveal` in `globals.css`
gives the footer a `clip-path`, which makes it the containing block for its own
fixed child; the contact section then slides up off it as you reach the bottom
of the page. Below `lg` — and under `prefers-reduced-motion` — the footer stays
in normal flow, because a pinned footer taller than the screen would simply
clip.

**`components/layout/PageHeroMedia.tsx`** puts a photograph behind an inner
page's masthead — veiled in white and faded towards the copy, so the page still
opens white and the navy headline keeps its contrast. Six pages are wired for
one; until the file is supplied each falls back to the drawn corridor motif.

---

## Three showcase components

All three live in `components/ui/` and are used on the homepage.

**`parallax-scroll-feature-section.tsx`** drives *Why IBCR* and *The Corridor*.
Each row scrubs a media panel in from the left while the copy column drifts
upward, so the two settle together. Media is either an image or an arbitrary
node — the corridor row passes the live WebGL globe through it. Rows alternate
sides via `reverse`.

Two notes for anyone extending it. The upstream snippet called `useScroll` and
`useTransform` inside `.map()`, which breaks the rules of hooks as soon as the
list length changes; each row is its own component here. And reduced motion
resolves the transforms to their resting values rather than dropping the
`style` prop — removing the prop leaves the last `opacity: 0` painted on the
element and hides the media permanently.

**`card-fan-carousel.tsx`** drives *What We Do*: the six services fan out as a
deck on entry, lift individually on hover, and compress on narrow viewports.
GSAP owns the transforms; the layout height and the card footprint come from
the `.fan-layout` / `.fan-card` rules in `globals.css` — the breakpoints there
must stay in step with `getHeightMultiplier` in the component. Past seven cards
it paginates itself with arrows and dots.

**`color-change-card.tsx`** drives *Investment opportunities*, on the homepage
and again on `/india-rwanda#opportunities` — both render `OpportunityGrid`
from `components/home/Opportunities.tsx`, so the two can never drift apart.
Each sector sits behind a desaturated photograph that resolves to full colour
on hover while the heading rolls over letter by letter and the arrow swings
up. Letters are grouped per word, so a long sector name still wraps at spaces.

The photograph sits on an oversized layer that drifts a few percent with
scroll, which is what keeps the grid moving with the rest of the page rather
than sitting dead still in it. Below `md` the photographs stay in colour: the
desaturation is a pointer affordance, and hover on touch is a tap away.

All three fall back to a drawn corridor plate when a photograph is missing, so
an asset you have not supplied yet degrades to something deliberate. On the
opportunity cards that fallback is white with navy type rather than a dark
frame, so a gap in the photography does not put a dark block on a white page.

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

Every submission goes to **info@ibcr.rw** — the site has one inbox, used for
enquiries, membership and press alike. `src/lib/server/submissions.ts`
always writes the record to the server log, and emails it when a key is
present:

| Variable                  | Purpose                                                       |
| ------------------------- | ------------------------------------------------------------- |
| `IBCR_RESEND_API_KEY`     | **Required to receive email.** A Resend API key.                |
| `IBCR_SUBMISSION_EMAIL`   | Where submissions are sent. Defaults to `info@ibcr.rw`.         |
| `IBCR_SUBMISSION_FROM`    | The From address. Defaults to `IBCR Website <website@ibcr.rw>`. |
| `IBCR_SUBMISSION_WEBHOOK` | Optional. Also POSTs `{ kind, receivedAt, to, data }` to a URL. |

Until `IBCR_RESEND_API_KEY` is set, forms still validate, still succeed and
still record — but nothing arrives in the inbox. Set the key (and verify the
sending domain with the provider) before launch. The sender's own address is
set as `reply_to`, so replying from the inbox goes straight back to them.

Any other transport works the same way: replace the body of `email()`.

---

## Replacing sample content

`src/lib/content.ts` is the single source of truth for the whole site. It carries a
**placeholder notice** at the top: member companies, testimonials, board members, event
dates and statistics are illustrative sample content used to build the experience out.
Replace them with verified IBCR data — or point the module at a CMS (Sanity or Strapi, per
the project blueprint) — before launch.

**Photography.** `public/images/README.md` lists every file the site expects,
which ones are already in place, and the crop each one needs. Twenty slots are
still open — six page backgrounds, seven board portraits, five opportunity
sectors and two service cards. Until they are dropped in, each renders a drawn
plate, a set of initials or the masthead motif rather than a broken image.

**Verified content.** Membership categories and fees, the board, the mission
and vision statements, the key sectors and the sub-committees come from the
Chamber's presentation. The 25 member companies come from the Chamber's
membership register. Events, insight articles and the secretariat units are
still sample content — `src/lib/content.ts` says which is which at the top of
the file.

**Testimonial quotes are drafts and are not approved.** The names, roles and
companies are real members; the words are placeholder copy. Get each quote
confirmed in writing by that member, or replace it with what they send back,
before this goes live.

**Member contact details are deliberately not published.** The register holds a
phone number and email address for each representative; the directory shows
only the company, the representative, their role and the membership category.

The photographs currently in `public/images/` were supplied for the build and
are stock frames, one of them still watermarked. Clear the licensing, or
replace them with the Chamber's own photography, before launch.

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

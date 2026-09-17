# Image assets

Photography for the site. Filenames are referenced from `src/lib/content.ts`,
`src/components/home/WhyIbcrCorridor.tsx` and the `image` prop on each page's
`PageHero`, so the names below have to match exactly.

Every slot degrades on its own until the file is present — a drawn corridor
plate, a set of initials, or the original masthead motif — so nothing looks
broken while you are collecting assets. Drop a file in and it takes over with
no code change.

`.jpg` throughout: the paths carry the extension, so a `.png` or `.webp` saved
under one of these names will not be found.

---

## 1. Page backgrounds — **6 to upload**

Folder: `public/images/heroes/`

| File                        | Page           |
| --------------------------- | -------------- |
| `about.jpg`                 | /about         |
| `membership.jpg`            | /membership    |
| `services.jpg`              | /services      |
| `india-rwanda.jpg`          | /india-rwanda  |
| `events.jpg`                | /events        |
| `insights.jpg`              | /insights      |

The masthead veils the photograph in white and fades it out towards the
headline, so it reads as ground rather than as a banner. That means:

- **Landscape, at least 2000px wide**, 16:9 or wider. Only the top ~560px of
  the frame is seen on a desktop screen.
- **Keep the subject on the right.** The left 45% sits under the copy and is
  faded almost to white.
- Avoid busy or high-contrast detail — the veil flattens it into noise.
- Under ~500KB each. These load above the fold on every inner page.

Until a file is there, the page keeps the drawn corridor motif it has today.

## 2. Board portraits — **7 to upload**

Folder: `public/images/board/` — shown on `/about#leadership`.

| File                                  | Member                                                      |
| ------------------------------------- | ----------------------------------------------------------- |
| `mangesh-kumar-verma.jpg`             | Mr. Mangesh Kumar Verma — Chairman                           |
| `suman-alla.jpg`                      | Mr. Suman Alla — Vice Chairman                               |
| `tiwari-himanshu.jpg`                 | Mr. Tiwari Himanshu — Treasurer & Director, Corp. Governance |
| `manoj-thaipparampil-skariah.jpg`     | Mr. Manoj Thaipparampil Skariah — General Secretary          |
| `thomas-binoy.jpg`                    | Mr. Thomas Binoy — Director, Membership                      |
| `harlalka-natwarlal-murarilal.jpg`    | Mr. Harlalka Natwarlal Murarilal — Director, PR & Events     |
| `palaparthy-vinay.jpg`                | Mr. Palaparthy Vinay — Director, Investment & Intl. Trading  |

- **Portrait, roughly 4:5**, about 800×1000px. Head and shoulders, face in the
  upper half — the tiles crop from the centre.
- They sit in greyscale until pointed at, so a plain, even background works
  best; a busy one reads as grey mush.
- Under ~250KB each.

Until a portrait is there, the tile shows that member's initials on a drawn
plate, and the name list and details panel work exactly the same.

## 3. Opportunity sectors — **5 to upload**

Folder: `public/images/opportunities/`

| File                  | Sector                          | Status     |
| --------------------- | ------------------------------- | ---------- |
| `agriculture.jpg`     | 01 Agriculture & Agribusiness   | ✅ in place |
| `manufacturing.jpg`   | 02 Manufacturing                | ✅ in place |
| `infrastructure.jpg`  | 03 Infrastructure               | to upload  |
| `healthcare.jpg`      | 04 Healthcare                   | ✅ in place |
| `technology.jpg`      | 05 Technology & Innovation      | to upload  |
| `tourism.jpg`         | 06 Tourism & Hospitality        | to upload  |
| `energy.jpg`          | 07 Energy                       | to upload  |
| `logistics.jpg`       | 08 Logistics                    | to upload  |

Landscape-leaning, around 1200×900. Shown desaturated until hover, so pick
frames that read in greyscale.

## 4. Service cards — **2 to upload**

Folder: `public/images/services/`

| File                          | Card                     | Status     |
| ----------------------------- | ------------------------ | ---------- |
| `market-entry.jpg`            | 01 Market Entry          | ✅ in place |
| `trade-facilitation.jpg`      | 02 Trade Facilitation    | ✅ in place |
| `investment-advisory.jpg`     | 03 Investment Advisory   | to upload  |
| `business-delegations.jpg`    | 04 Business Delegations  | ✅ in place |
| `business-intelligence.jpg`   | 05 Business Intelligence | to upload  |
| `advocacy-policy.jpg`         | 06 Advocacy & Policy     | ✅ in place |

Portrait, 5:7 — 640×896 is the size shipped here. Crop before exporting: the
card fills, it does not letterbox.

## 5. Why IBCR

| File                       | Used by                     | Status     |
| -------------------------- | --------------------------- | ---------- |
| `images/kigali-night.jpg`  | Why IBCR (parallax feature) | ✅ in place |

Landscape, 4:3 or wider, at least 1600px across.

---

**Licensing.** The photographs currently in place are stock frames supplied
for the build, one of them still watermarked. Clear the licensing or replace
them with the Chamber's own photography before launch.

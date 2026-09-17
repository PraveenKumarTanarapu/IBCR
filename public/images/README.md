# Image assets

Photography for the site. Filenames are referenced from `src/lib/content.ts`
and `src/components/home/WhyIbcrCorridor.tsx`, so the names below have to match
exactly.

Until a file is present the site falls back to a drawn corridor plate rather
than a broken image, so nothing looks broken while you are collecting assets.

## Supplied

| Path                                           | Used by                          |
| ---------------------------------------------- | -------------------------------- |
| `images/kigali-night.jpg`                      | Why IBCR (parallax feature)      |
| `images/services/market-entry.jpg`             | What We Do — card 01             |
| `images/services/trade-facilitation.jpg`       | What We Do — card 02             |
| `images/services/business-delegations.jpg`     | What We Do — card 04             |
| `images/services/advocacy-policy.jpg`          | What We Do — card 06             |
| `images/opportunities/agriculture.jpg`         | Investment opportunities — 01    |
| `images/opportunities/manufacturing.jpg`       | Investment opportunities — 02    |
| `images/opportunities/healthcare.jpg`          | Investment opportunities — 04    |

## Still to come

| Path                                           | Used by                          |
| ---------------------------------------------- | -------------------------------- |
| `images/services/investment-advisory.jpg`      | What We Do — card 03             |
| `images/services/business-intelligence.jpg`    | What We Do — card 05             |
| `images/opportunities/infrastructure.jpg`      | Investment opportunities — 03    |
| `images/opportunities/technology.jpg`          | Investment opportunities — 05    |
| `images/opportunities/tourism.jpg`             | Investment opportunities — 06    |
| `images/opportunities/energy.jpg`              | Investment opportunities — 07    |
| `images/opportunities/logistics.jpg`           | Investment opportunities — 08    |

## Guidance

- **Why IBCR** wants a landscape frame, 4:3 or wider, at least 1600px across.
- **Service cards** are portrait (roughly 5:7) — 640×896 is the size shipped
  here. Crop to that before exporting, or the subject will be cut off: the
  card fills, it does not letterbox.
- **Opportunity cards** are landscape-leaning, about 290×272 on a desktop
  four-up grid. Export around 1200×900 and let the card crop; they are shown
  desaturated until hover, so pick frames that read in greyscale.
- Keep each file under ~400KB. Everything below the fold lazy-loads, but a
  dozen large photographs still add up.
- `.jpg` throughout — the paths in `content.ts` carry the extension, so a
  `.png` or `.webp` dropped in under one of these names will not be found.

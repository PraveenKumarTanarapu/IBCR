# Image assets

Drop the Chamber's photography here. Filenames are referenced from
`src/lib/content.ts` and `src/components/home/WhyIbcrCorridor.tsx`, so the
names below have to match exactly.

Until a file is present the site falls back to a drawn corridor plate rather
than a broken image, so nothing looks broken while you are collecting assets.

## Required

| Path                                        | Used by                          |
| ------------------------------------------- | -------------------------------- |
| `images/kigali-night.jpg`                   | Why IBCR (parallax feature)      |
| `images/services/market-entry.jpg`          | What We Do — card 01             |
| `images/services/trade-facilitation.png`    | What We Do — card 02             |
| `images/services/investment-advisory.jpeg`  | What We Do — card 03             |
| `images/services/business-delegations.png`  | What We Do — card 04             |
| `images/services/business-intelligence.avif`| What We Do — card 05             |
| `images/services/advocacy-policy.png`       | What We Do — card 06             |

## Guidance

- **Why IBCR** wants a landscape frame, 4:3 or wider, at least 1600px across.
- **Service cards** are portrait (roughly 5:7). Crop to that before exporting,
  or the subject will be cut off — the card fills, it does not letterbox.
- Keep each file under ~400KB. The cards lazy-load, but six large photographs
  in one section still add up.

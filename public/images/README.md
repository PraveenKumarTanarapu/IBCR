# Image sitemap

Every image the site can use, where it appears, and what to export. Filenames
are referenced from `src/lib/content.ts` and the components, so they have to
match exactly.

**Nothing here is blocking.** Every slot degrades on its own — a drawn corridor
plate, a set of initials, the masthead motif, or simply no background — so the
site is complete without any of them and each file takes over the moment it
lands. No code change is needed.

**Extensions matter.** `.jpg` everywhere except logos, which are `.png` with a
transparent background. A file saved under one of these names with a different
extension will not be found.

---

## Summary

| # | Set                  | Folder                      | Files | Status        |
| - | -------------------- | --------------------------- | ----- | ------------- |
| 1 | Page backgrounds     | `images/heroes/`            | 6     | 6 to upload   |
| 2 | Board portraits      | `images/board/`             | 7     | 7 to upload   |
| 3 | Member logos         | `images/members/`           | 25    | 25 to upload  |
| 4 | Partner logos        | `images/partners/`          | 9     | 9 to upload   |
| 5 | Opportunity sectors  | `images/opportunities/`     | 8     | 5 to upload   |
| 6 | Service photographs  | `images/services/`          | 6     | 2 to upload   |
| 7 | Why IBCR             | `images/`                   | 1     | ✅ in place    |

Sets 5 and 6 each do double duty — see their notes.

---

## 1. Page backgrounds — 6 to upload

`public/images/heroes/` · behind the masthead of each inner page.

| File               | Page          |
| ------------------ | ------------- |
| `about.jpg`        | /about        |
| `membership.jpg`   | /membership   |
| `services.jpg`     | /services     |
| `india-rwanda.jpg` | /india-rwanda |
| `events.jpg`       | /events       |
| `insights.jpg`     | /insights     |

Landscape, at least 2000px wide, 16:9 or wider. Only the top ~560px is seen on
a desktop screen. **Keep the subject on the right** — the left 45% sits under
the headline and is faded nearly to white. Avoid busy, high-contrast detail;
the white veil flattens it into noise. Under ~500KB.

Falls back to: the drawn corridor motif.

## 2. Board portraits — 7 to upload

`public/images/board/` · the portrait wall on `/about#leadership`.

| File                               | Member                                      |
| ---------------------------------- | ------------------------------------------- |
| `mangesh-kumar-verma.jpg`          | Mr. Mangesh Kumar Verma — Chairman           |
| `suman-alla.jpg`                   | Mr. Suman Alla — Vice Chairman               |
| `tiwari-himanshu.jpg`              | Mr. Tiwari Himanshu — Treasurer              |
| `manoj-thaipparampil-skariah.jpg`  | Mr. Manoj Thaipparampil Skariah — Gen. Sec.  |
| `thomas-binoy.jpg`                 | Mr. Thomas Binoy — Director, Membership      |
| `harlalka-natwarlal-murarilal.jpg` | Mr. Harlalka Natwarlal Murarilal — PR        |
| `palaparthy-vinay.jpg`             | Mr. Palaparthy Vinay — Investment            |

Portrait, roughly 4:5, about 800×1000. Head and shoulders, face in the upper
half — the tiles crop from the centre. They sit in greyscale until pointed at,
so a plain, even background reads best. Under ~250KB.

Falls back to: the member's initials on a drawn plate.

## 3. Member logos — 25 to upload

`public/images/members/` · the logo wall on the homepage and on
`/membership#member-logos`.

| File                                     | Company                        |
| ---------------------------------------- | ------------------------------ |
| `imana-steel-rwanda-ltd.png`             | Imana Steel Rwanda Ltd         |
| `konnect-analysis-ltd.png`               | Konnect Analysis Ltd           |
| `alpine-holidays-ltd.png`                | Alpine Holidays Ltd            |
| `quadinfra-ltd.png`                      | Quadinfra Ltd                  |
| `yuvikhetani-ltd.png`                    | Yuvikhetani Ltd                |
| `satguru-travel-and-tours.png`           | Satguru Travel & Tours         |
| `orbit-healthcare-service-ltd.png`       | Orbit Healthcare Service Ltd   |
| `sabari-ltd.png`                         | Sabari Ltd                     |
| `savita-builders-rwanda-ltd.png`         | Savita Builders Rwanda Ltd     |
| `imprisco-plus-ltd.png`                  | Imprisco Plus Ltd              |
| `ashree-com-ltd.png`                     | Ashree Com Ltd                 |
| `shyam-group-ltd.png`                    | Shyam Group Ltd                |
| `d-p-singh-associates-ltd.png`           | D.P Singh Associates Ltd       |
| `hi-fi-trading-service-ltd.png`          | Hi-Fi Trading Service Ltd      |
| `finex-investment-ltd.png`               | Finex Investment Ltd           |
| `care-group-international.png`           | Care Group International       |
| `ram-associates.png`                     | Ram Associates                 |
| `sai-info-tech-ltd.png`                  | Sai Info-Tech Ltd              |
| `impact-technology.png`                  | Impact Technology              |
| `gyan-ltd.png`                           | Gyan Ltd                       |
| `alsm.png`                               | ALSM                           |
| `ssv-shop-and-general-trading-ltd.png`   | SSV Shop & General Trading Ltd |
| `flexipay-finance-ltd.png`               | Flexipay Finance Ltd           |
| `artab-biobag-ltd.png`                   | Artab Biobag Ltd               |
| `techin1000hills-ltd.png`                | Techin1000Hills Ltd            |

PNG with a transparent background, roughly 400×160, the mark trimmed to its
own edges. Displayed at 40px tall inside a 6.5rem tile, so a wordmark works
better than a detailed crest. Under ~60KB each.

Falls back to: the company's initials.

## 4. Partner logos — 9 to upload

`public/images/partners/` · the marquee on the homepage and on `/about#partners`.

| File                             | Institution                |
| -------------------------------- | -------------------------- |
| `high-commission-of-india.png`   | High Commission of India   |
| `rwanda-development-board.png`   | Rwanda Development Board   |
| `private-sector-federation.png`  | Private Sector Federation  |
| `rwanda-revenue-authority.png`   | Rwanda Revenue Authority   |
| `ficci.png`                      | FICCI                      |
| `cii.png`                        | CII                        |
| `bank-of-kigali.png`             | Bank of Kigali             |
| `norrsken-east-africa.png`       | Norrsken East Africa       |
| `exim-bank-of-india.png`         | EXIM Bank of India         |

Square-ish PNG, transparent, around 200×200. The tile is 48px, so a mark works
better than a full lockup. Use each institution's own approved artwork — do not
redraw or recolour it.

Falls back to: the institution's initials.

## 5. Opportunity sectors — 5 to upload

`public/images/opportunities/` · **used twice.** As the card face in the
homepage grid, and as the section background on `/india-rwanda#opportunities`,
where each sector gets a full-width section.

| File                 | Sector                     | Status      |
| -------------------- | -------------------------- | ----------- |
| `agriculture.jpg`    | 01 Agriculture             | ✅ in place  |
| `manufacturing.jpg`  | 02 Manufacturing           | ✅ in place  |
| `infrastructure.jpg` | 03 Infrastructure          | to upload   |
| `healthcare.jpg`     | 04 Healthcare              | ✅ in place  |
| `technology.jpg`     | 05 Technology & Innovation | to upload   |
| `tourism.jpg`        | 06 Tourism & Hospitality   | to upload   |
| `energy.jpg`         | 07 Energy                  | to upload   |
| `logistics.jpg`      | 08 Logistics               | to upload   |

Landscape, around 1600×1000 (larger than before, since they now also run
full-width). On the card they are shown desaturated until hover, so pick
frames that read in greyscale; as a section background they sit under a white
veil, so avoid fussy detail. Under ~400KB.

Falls back to: a drawn corridor plate on the card, and no background on the
section.

## 6. Service photographs — 2 to upload

`public/images/services/` · **used twice.** As the card face in the What We Do
fan on the homepage, and as the section background for that service on
`/services`.

| File                         | Service                  | Status      |
| ---------------------------- | ------------------------ | ----------- |
| `market-entry.jpg`           | 01 Market Entry          | ✅ in place  |
| `trade-facilitation.jpg`     | 02 Trade Facilitation    | ✅ in place  |
| `investment-advisory.jpg`    | 03 Investment Advisory   | to upload   |
| `business-delegations.jpg`   | 04 Business Delegations  | ✅ in place  |
| `business-intelligence.jpg`  | 05 Business Intelligence | to upload   |
| `advocacy-policy.jpg`        | 06 Advocacy & Policy     | ✅ in place  |

Portrait, 5:7 — 640×896 is what the four in place use. The fan card fills, it
does not letterbox, so crop before exporting. Under ~150KB.

Falls back to: a drawn corridor plate on the card, and no background on the
section.

## 7. Why IBCR

| File                      | Used by                     | Status     |
| ------------------------- | --------------------------- | ---------- |
| `images/kigali-night.jpg` | Why IBCR (parallax feature) | ✅ in place |

Landscape, 4:3 or wider, at least 1600px across.

## Generated — do not replace by hand

| File                        | What it is                                          |
| --------------------------- | --------------------------------------------------- |
| `images/globe-poster.png`   | A still of the corridor globe, shown until WebGL draws |
| `textures/world-map.png`    | The land and border masks the globe samples           |

Both come out of the repo rather than a camera. Regenerate the texture with
`node tools/media/worldmap.mjs`; re-capture the poster only if the globe's
resting rotation or colours change.

---

**Licensing.** The photographs currently in place are stock frames supplied for
the build, one of them still watermarked. Clear the licensing or replace them
with the Chamber's own photography before launch.

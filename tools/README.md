# tools

Build-time and QA helpers. None of this ships to the browser.

## `media/` — hero footage renderer

| File          | Purpose                                                                    |
| ------------- | -------------------------------------------------------------------------- |
| `scenes.mjs`  | Three deterministic, seamlessly-looping three.js scenes (`update(t)`, 0..1) |
| `render.html` | Harness page — imports three from `node_modules` via an import map          |
| `serve.mjs`   | Tiny static server (ES modules need an http origin; `file://` is blocked)   |
| `preview.mjs` | Renders a few sample frames per scene for a quick look                      |
| `capture.mjs` | Full render → JPEG frames → H.264 MP4 + poster in `public/video`            |

```bash
npm run media:preview                 # sample frames
npm run media:render                  # all scenes
node tools/media/capture.mjs corridor # one scene
```

Environment:

- `CHROMIUM_PATH` — Chromium binary (default `/opt/pw-browsers/chromium`)
- `FFMPEG_PATH` — ffmpeg binary with libx264 (default `ffmpeg` on PATH)
- `WORK_DIR` — scratch directory for frames (deleted after encoding)

Rendering runs through SwiftShader, so it does not need a GPU. Roughly a minute per
twelve-second scene.

## Logo outlines

`ibcr-logo-paths.json` holds the "IBCR" glyph outlines extracted once from Playfair
Display 700 with opentype.js. `src/components/brand/IbcrMark.tsx` was generated from it —
regenerate only if the letterforms need to change, and re-check the Chakra and sun
positions against the artwork afterwards.

## QA helpers

| File              | Purpose                                                    |
| ----------------- | ---------------------------------------------------------- |
| `pageshots.mjs`   | Screenshot pages at a given viewport (`FULL=1` for tall)    |
| `scrollshots.mjs` | Screenshot at specific scroll offsets — most reliable       |
| `slice.mjs`       | Slice a tall screenshot into readable chunks                |
| `measure.mjs`     | Report document and per-section heights                     |
| `find404.mjs`     | List failing network requests on a page                     |
| `shot.mjs`        | Screenshot any file or URL                                  |

```bash
SHOT_DIR=/tmp/shots node tools/scrollshots.mjs / 0 2900 8000
```

All of them accept `BASE_URL` (default `http://127.0.0.1:3100`).

// Slice a tall screenshot into readable chunks using Chromium (no image libs needed).
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
const src = process.argv[2];
const outDir = process.argv[3];
const sliceH = Number(process.argv[4] || 1400);
fs.mkdirSync(outDir, { recursive: true });
const b64 = fs.readFileSync(src).toString("base64");
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const p = await b.newPage();
await p.setContent(`<body style="margin:0"><img id="i" src="data:image/png;base64,${b64}"></body>`);
await p.waitForFunction(() => { const i = document.getElementById("i"); return i && i.complete && i.naturalWidth > 0; });
const { w, h } = await p.evaluate(() => { const i = document.getElementById("i"); return { w: i.naturalWidth, h: i.naturalHeight }; });
console.log("size", w, h);
const n = Math.ceil(h / sliceH);
for (let k = 0; k < n; k++) {
  const top = k * sliceH;
  const height = Math.min(sliceH, h - top);
  await p.setViewportSize({ width: w, height });
  await p.evaluate(([t]) => { document.getElementById("i").style.marginTop = `-${t}px`; }, [top]);
  await p.screenshot({ path: path.join(outDir, `slice-${String(k).padStart(2, "0")}.png`), clip: { x: 0, y: 0, width: w, height } });
}
console.log("slices", n);
await b.close();

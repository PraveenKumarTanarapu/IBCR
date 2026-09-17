/**
 * Screenshot a section at rest and again with one element hovered.
 *
 *   node tools/hovershot.mjs <path> <scrollSelector> <hoverSelector> <tag>
 *
 * Runs with motion enabled — the point is usually to see a hover state
 * resolve, which reduced motion would flatten.
 */
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const OUT = process.env.SHOT_DIR || "/tmp/shots";
fs.mkdirSync(OUT, { recursive: true });

const base = process.env.BASE_URL || "http://127.0.0.1:3100";
const [route = "/", scrollSel, hoverSel, tag = "hover"] = process.argv.slice(2);
const W = Number(process.env.W || 1440);
const H = Number(process.env.H || 900);

const browser = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium",
  args: [
    "--use-gl=angle",
    "--use-angle=swiftshader",
    "--enable-unsafe-swiftshader",
    "--autoplay-policy=no-user-gesture-required",
  ],
});
const page = await browser.newPage({ viewport: { width: W, height: H } });
await page.goto(base + route, { waitUntil: "networkidle" }).catch(() => {});
await page.waitForTimeout(1500);

await page.locator(scrollSel).first().scrollIntoViewIfNeeded();
await page.waitForTimeout(2500);
await page.screenshot({ path: path.join(OUT, `${tag}-rest.png`) });
console.log("rest");

await page.locator(hoverSel).first().hover();
await page.waitForTimeout(1200);
await page.screenshot({ path: path.join(OUT, `${tag}-hover.png`) });
console.log("hover");

await browser.close();

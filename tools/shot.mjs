// Headless screenshot helper: node tools/shot.mjs <file-or-url> <out.png> [width] [height] [full]
import { chromium } from "playwright";

const EXE = process.env.CHROMIUM_PATH || "/opt/pw-browsers/chromium";
const [, , target, out, w = "1440", h = "900", full = "1"] = process.argv;

const browser = await chromium.launch({ executablePath: EXE });
const page = await browser.newPage({
  viewport: { width: Number(w), height: Number(h) },
  deviceScaleFactor: 1,
});
const url = target.startsWith("http") ? target : "file://" + target;
await page.goto(url, { waitUntil: "networkidle" }).catch(() => page.goto(url));
await page.waitForTimeout(1200);
await page.screenshot({ path: out, fullPage: full === "1" });
await browser.close();
console.log("saved", out);

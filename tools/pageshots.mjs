import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const OUT = process.env.SHOT_DIR || "/tmp/shots";
const BASE = process.env.BASE_URL || "http://127.0.0.1:3100";
fs.mkdirSync(OUT, { recursive: true });

const targets = process.argv.slice(2);
const width = Number(process.env.W || 1440);
const height = Number(process.env.H || 900);
const full = process.env.FULL === "1";

const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium", args:["--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader","--autoplay-policy=no-user-gesture-required"] });
const p = await b.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
// Reduced motion keeps Lenis out of the way so scripted scrolling is reliable.
if (full) await p.emulateMedia({ reducedMotion: "reduce" });
p.on("pageerror", e => console.log("[pageerror]", e.message.slice(0, 300)));
p.on("console", m => { if (m.type() === "error") console.log("[console]", m.text().slice(0, 300)); });

for (const t of targets) {
  const url = BASE + t;
  await p.goto(url, { waitUntil: "networkidle" }).catch(() => p.goto(url));
  await p.waitForTimeout(2500);
  if (full) {
    // trigger all scroll reveals
    await p.evaluate(async () => {
      const step = window.innerHeight * 0.45;
      for (let y = 0; y <= document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise(r => setTimeout(r, 260));
      }
      window.scrollTo(0, 0);
      await new Promise(r => setTimeout(r, 600));
    });
    await p.waitForTimeout(800);
  }
  const name = (t === "/" ? "home" : t.replace(/[/?=&]/g, "_").replace(/^_/, "")) + `-${width}` + (full ? "-full" : "") + ".png";
  await p.screenshot({ path: path.join(OUT, name), fullPage: full });
  console.log("shot", name);
}
await b.close();

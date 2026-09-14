import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
const OUT = process.env.SHOT_DIR || "/tmp/shots";
fs.mkdirSync(OUT, { recursive: true });
const url = (process.env.BASE_URL||"http://127.0.0.1:3100") + (process.argv[2]||"/");
const positions = process.argv.slice(3).map(Number);
const W = Number(process.env.W || 1440), H = Number(process.env.H || 900);
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium", args:["--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader","--autoplay-policy=no-user-gesture-required"] });
const p = await b.newPage({ viewport: { width: W, height: H } });
await p.emulateMedia({ reducedMotion: "reduce" });
await p.goto(url, { waitUntil: "networkidle" }).catch(()=>{});
await p.waitForTimeout(2000);
for (const y of positions) {
  await p.evaluate((yy) => window.scrollTo(0, yy), y);
  await p.waitForTimeout(1200);
  const tag = (process.argv[2]||"/").replace(/[/?=&]/g,"_").replace(/^_/,"") || "home";
  await p.screenshot({ path: path.join(OUT, `${tag}-y${y}.png`) });
  console.log("shot", y);
}
await b.close();

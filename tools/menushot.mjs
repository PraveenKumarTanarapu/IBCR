import { chromium } from "playwright";
import fs from "node:fs";
const OUT = process.env.SHOT_DIR || "/tmp/shots";
fs.mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium", args:["--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader"] });
// mobile drawer
const m = await b.newPage({ viewport: { width: 390, height: 844 } });
await m.goto("http://127.0.0.1:3100/", { waitUntil: "networkidle" }).catch(()=>{});
await m.waitForTimeout(1500);
await m.getByRole("button", { name: "Open menu" }).click();
await m.waitForTimeout(900);
await m.screenshot({ path: OUT + "/mobile-menu.png" });
await m.close();
// desktop mega menu
const d = await b.newPage({ viewport: { width: 1440, height: 900 } });
await d.goto("http://127.0.0.1:3100/about", { waitUntil: "networkidle" }).catch(()=>{});
await d.waitForTimeout(1500);
await d.getByRole("link", { name: "Membership", exact: true }).first().hover();
await d.waitForTimeout(900);
await d.screenshot({ path: OUT + "/mega-menu.png" });
await d.close();
await b.close();
console.log("done");

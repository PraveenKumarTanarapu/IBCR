import { chromium } from "playwright";
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium", args:["--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader"] });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.emulateMedia({ reducedMotion: "reduce" });
await p.goto((process.env.BASE_URL||"http://127.0.0.1:3100") + (process.argv[2]||"/"), { waitUntil: "networkidle" }).catch(()=>{});
await p.waitForTimeout(2500);
console.log(await p.evaluate(() => ({
  scrollHeight: document.documentElement.scrollHeight,
  bodyHeight: document.body.scrollHeight,
  bodyRect: document.body.getBoundingClientRect().height,
  sections: [...document.querySelectorAll("main > *")].map(el => [el.tagName + (el.id ? "#"+el.id : ""), Math.round(el.getBoundingClientRect().height)]),
})));
await b.close();

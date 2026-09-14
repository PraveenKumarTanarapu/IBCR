import { chromium } from "playwright";
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium", args:["--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader"] });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
p.on("response", r => { if (r.status() >= 400) console.log(r.status(), r.url()); });
await p.goto((process.env.BASE_URL || "http://127.0.0.1:3100") + (process.argv[2] || "/"), { waitUntil: "networkidle" }).catch(()=>{});
await p.waitForTimeout(3000);
await b.close();

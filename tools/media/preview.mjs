// Renders a few sample frames per scene so the look can be checked quickly.
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { serve } from "./serve.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = process.env.PREVIEW_DIR || path.join(HERE, "__preview");
fs.mkdirSync(OUT, { recursive: true });

const W = 1200;
const H = 675;
const scenes = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ["corridor", "silk", "lattice"];
const times = [0.0, 0.33, 0.66];

const server = await serve(path.resolve(HERE, "../.."));
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/opt/pw-browsers/chromium",
  args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});

for (const scene of scenes) {
  const page = await browser.newPage({ viewport: { width: W, height: H } });
  page.on("pageerror", (e) => console.error("[page]", scene, e.message));
  page.on("console", (m) => m.type() === "error" && console.error("[console]", scene, m.text()));
  await page.goto(`http://127.0.0.1:${server.port}/tools/media/render.html?scene=${scene}&w=${W}&h=${H}`);
  await page.waitForFunction("window.__ready === true", null, { timeout: 60000 });
  for (const t of times) {
    const b64 = await page.evaluate(
      ([time]) => {
        window.__renderFrame(time);
        return window.__grab(0.92);
      },
      [t],
    );
    fs.writeFileSync(path.join(OUT, `${scene}-${t}.jpg`), Buffer.from(b64, "base64"));
  }
  await page.close();
  console.log("rendered", scene);
}
await browser.close();
server.close();

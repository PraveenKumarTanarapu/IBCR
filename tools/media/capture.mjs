/**
 * Renders the WebGL hero scenes to frames and encodes them into the MP4/WebM
 * files shipped in public/video. Run manually — the output is committed.
 *
 *   node tools/media/capture.mjs [sceneName ...]
 */
import { chromium } from "playwright";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { serve } from "./serve.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "../..");
const OUT = path.join(ROOT, "public/video");
const WORK = process.env.WORK_DIR || path.join(ROOT, ".media-frames");
const FFMPEG = process.env.FFMPEG_PATH || "ffmpeg";
const CHROMIUM = process.env.CHROMIUM_PATH || "/opt/pw-browsers/chromium";

const W = 1600;
const H = 900;
const FPS = 24;

const JOBS = [
  { scene: "corridor", name: "hero-corridor", seconds: 16 },
  { scene: "filaments", name: "hero-filaments", seconds: 12 },
  { scene: "lattice", name: "hero-lattice", seconds: 10 },
];

const only = process.argv.slice(2);
const jobs = only.length ? JOBS.filter((j) => only.includes(j.scene)) : JOBS;

fs.mkdirSync(OUT, { recursive: true });

const server = await serve(ROOT);
const browser = await chromium.launch({
  executablePath: CHROMIUM,
  args: [
    "--use-gl=angle",
    "--use-angle=swiftshader",
    "--enable-unsafe-swiftshader",
    "--disable-lcd-text",
  ],
});

for (const job of jobs) {
  const frames = job.seconds * FPS;
  const dir = path.join(WORK, job.name);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });

  const page = await browser.newPage({ viewport: { width: W, height: H } });
  page.on("pageerror", (e) => console.error("[page]", e.message));
  const url = `http://127.0.0.1:${server.port}/tools/media/render.html?scene=${job.scene}&w=${W}&h=${H}`;
  await page.goto(url);
  await page.waitForFunction("window.__ready === true", null, { timeout: 60000 });

  const started = Date.now();
  for (let i = 0; i < frames; i++) {
    const t = i / frames; // normalised, loops seamlessly at t = 1
    const b64 = await page.evaluate(
      ([time]) => {
        window.__renderFrame(time);
        return window.__grab(0.95);
      },
      [t],
    );
    fs.writeFileSync(
      path.join(dir, `f${String(i).padStart(5, "0")}.jpg`),
      Buffer.from(b64, "base64"),
    );
    if (i % 48 === 0) {
      const pct = ((i / frames) * 100).toFixed(0);
      process.stdout.write(`  ${job.name} ${pct}% (${((Date.now() - started) / 1000).toFixed(0)}s)\n`);
    }
  }
  await page.close();

  const input = path.join(dir, "f%05d.jpg");
  const mp4 = path.join(OUT, `${job.name}.mp4`);
  const poster = path.join(OUT, `${job.name}-poster.jpg`);

  // H.264/MP4 only: universal support, and VP9 came out larger on this
  // material for no visible gain.
  execFileSync(
    FFMPEG,
    [
      "-y", "-hide_banner", "-loglevel", "error",
      "-framerate", String(FPS), "-i", input,
      "-vf", "scale=1600:900:flags=lanczos,format=yuv420p",
      "-c:v", "libx264", "-preset", "slow", "-crf", "29",
      "-profile:v", "high", "-pix_fmt", "yuv420p",
      "-movflags", "+faststart", "-an",
      mp4,
    ],
    { stdio: "inherit" },
  );

  const posterFrame = path.join(dir, `f${String(Math.floor(frames * 0.18)).padStart(5, "0")}.jpg`);
  execFileSync(
    FFMPEG,
    ["-y", "-hide_banner", "-loglevel", "error", "-i", posterFrame, "-q:v", "5", poster],
    { stdio: "inherit" },
  );

  fs.rmSync(dir, { recursive: true, force: true });
  const kb = (p) => (fs.statSync(p).size / 1024).toFixed(0) + "kB";
  console.log(`✓ ${job.name}: mp4 ${kb(mp4)} · poster ${kb(poster)}`);
}

await browser.close();
server.close();
fs.rmSync(WORK, { recursive: true, force: true });

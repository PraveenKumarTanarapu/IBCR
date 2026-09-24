/**
 * Rasterises real world geography into the texture the corridor globe samples.
 *
 *   node tools/media/worldmap.mjs
 *   → public/textures/world-map.png
 *
 * Output is an equirectangular RGB image carrying two masks rather than a
 * picture, so the colours stay in the design system and can be changed in the
 * shader without regenerating:
 *
 *   R — land          (Natural Earth 1:50m coastlines, filled)
 *   G — country lines (the same data's national borders, hairline)
 *   B — unused
 *
 * Geometry comes from `world-atlas`, which is Natural Earth as TopoJSON.
 * Everything is drawn at 2× and downsampled, which is the whole of the
 * antialiasing. Rings are unwrapped across the antimeridian into a canvas
 * three times the width and folded back, so Russia and Fiji do not smear a
 * band across the Pacific.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { feature, mesh } from "topojson-client";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = path.join(ROOT, "public/textures/world-map.png");

const W = 2048;
const H = 1024;
const SS = 2; // supersample
const SW = W * SS;
const SH = H * SS;
const PAD = SW; // the wrap canvas is [-SW, 0, +SW]

const project = ([lon, lat]) => [((lon + 180) / 360) * SW, ((90 - lat) / 180) * SH];

/* ------------------------------------------------------------------ paint */

/** Unwrap a ring so consecutive points never jump more than half the world. */
function unwrap(ring) {
  const out = [];
  let shift = 0;
  let previous = null;
  for (const point of ring) {
    let [x, y] = project(point);
    if (previous !== null) {
      if (x + shift - previous > SW / 2) shift -= SW;
      else if (x + shift - previous < -SW / 2) shift += SW;
    }
    x += shift;
    out.push([x, y]);
    previous = x;
  }
  return out;
}

/** Even-odd scanline fill of a polygon's rings into the wrap canvas. */
function fillRings(canvas, rings) {
  const edges = [];
  let minY = Infinity;
  let maxY = -Infinity;
  for (const ring of rings) {
    const points = unwrap(ring);
    for (let i = 0; i < points.length; i++) {
      const a = points[i];
      const b = points[(i + 1) % points.length];
      if (a[1] === b[1]) continue;
      edges.push([a, b]);
      minY = Math.min(minY, a[1], b[1]);
      maxY = Math.max(maxY, a[1], b[1]);
    }
  }
  if (!edges.length) return;

  const from = Math.max(0, Math.floor(minY));
  const to = Math.min(SH - 1, Math.ceil(maxY));
  const crossings = [];

  for (let y = from; y <= to; y++) {
    const scan = y + 0.5;
    crossings.length = 0;
    for (const [a, b] of edges) {
      const [x1, y1] = a;
      const [x2, y2] = b;
      if (scan < Math.min(y1, y2) || scan >= Math.max(y1, y2)) continue;
      crossings.push(x1 + ((scan - y1) / (y2 - y1)) * (x2 - x1));
    }
    if (crossings.length < 2) continue;
    crossings.sort((p, q) => p - q);
    const row = y * (SW * 3);
    for (let i = 0; i + 1 < crossings.length; i += 2) {
      const start = Math.max(-PAD, Math.ceil(crossings[i] - 0.5));
      const end = Math.min(SW * 2 - 1, Math.floor(crossings[i + 1] - 0.5));
      for (let x = start; x <= end; x++) canvas[row + x + PAD] = 255;
    }
  }
}

/** Bresenham, with a square nib so the line survives the downsample. */
function strokeLine(canvas, x1, y1, x2, y2, nib) {
  let x = Math.round(x1);
  let y = Math.round(y1);
  const ex = Math.round(x2);
  const ey = Math.round(y2);
  const dx = Math.abs(ex - x);
  const dy = -Math.abs(ey - y);
  const sx = x < ex ? 1 : -1;
  const sy = y < ey ? 1 : -1;
  let err = dx + dy;

  for (;;) {
    for (let oy = 0; oy < nib; oy++) {
      const py = y + oy;
      if (py < 0 || py >= SH) continue;
      const row = py * (SW * 3);
      for (let ox = 0; ox < nib; ox++) {
        const px = x + ox;
        if (px < -PAD || px >= SW * 2) continue;
        canvas[row + px + PAD] = 255;
      }
    }
    if (x === ex && y === ey) break;
    const e2 = 2 * err;
    if (e2 >= dy) {
      err += dy;
      x += sx;
    }
    if (e2 <= dx) {
      err += dx;
      y += sy;
    }
  }
}

function strokeCoordinates(canvas, coordinates, nib) {
  const points = unwrap(coordinates);
  for (let i = 0; i + 1 < points.length; i++) {
    strokeLine(canvas, points[i][0], points[i][1], points[i + 1][0], points[i + 1][1], nib);
  }
}

/** Fold the three-wide wrap canvas down to one world width. */
function fold(canvas) {
  const out = Buffer.alloc(SW * SH);
  for (let y = 0; y < SH; y++) {
    const row = y * (SW * 3);
    const dest = y * SW;
    for (let x = 0; x < SW; x++) {
      const a = canvas[row + x];
      const b = canvas[row + x + SW];
      const c = canvas[row + x + SW * 2];
      out[dest + x] = a || b || c;
    }
  }
  return out;
}

/* ------------------------------------------------------------------- run */

const topology = JSON.parse(
  fs.readFileSync(path.join(ROOT, "node_modules/world-atlas/countries-50m.json"), "utf8"),
);

const land = feature(topology, topology.objects.land);
const borders = mesh(topology, topology.objects.countries, (a, b) => a !== b);

const landCanvas = Buffer.alloc(SW * 3 * SH);
let polygons = 0;
for (const f of land.features) {
  const geometries =
    f.geometry.type === "MultiPolygon" ? f.geometry.coordinates : [f.geometry.coordinates];
  for (const rings of geometries) {
    fillRings(landCanvas, rings);
    polygons++;
  }
}
console.log("land polygons", polygons);

const borderCanvas = Buffer.alloc(SW * 3 * SH);
for (const line of borders.coordinates) strokeCoordinates(borderCanvas, line, SS);
console.log("border segments", borders.coordinates.length);

const landMask = fold(landCanvas);
const borderMask = fold(borderCanvas);

// Interleave into RGB, then let sharp do the box downsample.
const rgb = Buffer.alloc(SW * SH * 3);
for (let i = 0; i < SW * SH; i++) {
  rgb[i * 3] = landMask[i];
  rgb[i * 3 + 1] = borderMask[i];
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
const info = await sharp(rgb, { raw: { width: SW, height: SH, channels: 3 } })
  .resize(W, H, { kernel: sharp.kernel.mitchell })
  .png({ compressionLevel: 9, palette: false })
  .toFile(OUT);

console.log(`${path.relative(ROOT, OUT)}  ${info.width}x${info.height}  ${Math.round(info.size / 1024)}KB`);

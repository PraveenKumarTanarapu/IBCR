/**
 * Deterministic, seamlessly-looping WebGL scenes used to render the IBCR hero
 * background footage. Every scene exposes `update(t)` where `t` is normalised
 * 0..1 progress through the loop, so the last frame joins back to the first.
 *
 * Rendered offline by tools/media/capture.mjs — never shipped to the browser.
 */
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";

export const BRAND = {
  ink: 0x050d1f,
  navy: 0x0a1c3d,
  navyMid: 0x123b7a,
  royal: 0x1f5fc4,
  sky: 0x3f8fe0,
  gold: 0xc9a227,
  goldLight: 0xf0d68d,
  ivory: 0xf6f2e8,
};

/* ------------------------------------------------------------------ utils */

export function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function latLonToVec3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function discTexture(inner = 0.0) {
  const size = 128;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(size / 2, size / 2, size * inner, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,255,255,0.85)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

const SNOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`;

function makeComposer(renderer, scene, camera, width, height, bloom) {
  const composer = new EffectComposer(renderer);
  composer.setSize(width, height);
  composer.addPass(new RenderPass(scene, camera));
  if (bloom) {
    composer.addPass(
      new UnrealBloomPass(
        new THREE.Vector2(width, height),
        bloom.strength,
        bloom.radius,
        bloom.threshold,
      ),
    );
  }
  composer.addPass(new OutputPass());
  return composer;
}

/* ---------------------------------------------------- 1. Trade corridor */

function corridor(renderer, width, height) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(BRAND.ink);
  scene.fog = new THREE.FogExp2(BRAND.ink, 0.12);

  const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
  camera.position.set(0.1, 0.3, 4.35);
  camera.lookAt(0, 0.02, 0);

  const world = new THREE.Group();
  world.rotation.z = THREE.MathUtils.degToRad(-13);
  world.position.x = 0.62; // leave the left third clear for the hero copy
  scene.add(world);

  const globe = new THREE.Group();
  world.add(globe);

  // Opaque core so the far side of the point shell stays hidden.
  const core = new THREE.Mesh(
    new THREE.SphereGeometry(0.985, 96, 96),
    new THREE.MeshBasicMaterial({ color: 0x061127 }),
  );
  globe.add(core);

  // Fresnel rim.
  const rim = new THREE.Mesh(
    new THREE.SphereGeometry(1.055, 96, 96),
    new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.BackSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uColor: { value: new THREE.Color(BRAND.royal) } },
      vertexShader: `varying vec3 vN; varying vec3 vP;
        void main(){ vN = normalize(normalMatrix * normal); vec4 mv = modelViewMatrix * vec4(position,1.0); vP = mv.xyz; gl_Position = projectionMatrix * mv; }`,
      fragmentShader: `uniform vec3 uColor; varying vec3 vN; varying vec3 vP;
        void main(){ float f = pow(1.0 - abs(dot(normalize(vN), normalize(-vP))), 3.2);
        gl_FragColor = vec4(uColor * f * 1.5, f * 0.85); }`,
    }),
  );
  globe.add(rim);

  // Fibonacci point shell.
  const COUNT = 16000;
  const pos = new Float32Array(COUNT * 3);
  const col = new Float32Array(COUNT * 3);
  const sz = new Float32Array(COUNT);
  const rand = mulberry32(20260214);
  const golden = Math.PI * (3 - Math.sqrt(5));
  const cA = new THREE.Color(BRAND.navyMid);
  const cB = new THREE.Color(BRAND.sky);
  const cC = new THREE.Color(BRAND.goldLight);
  for (let i = 0; i < COUNT; i++) {
    const y = 1 - (i / (COUNT - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const th = golden * i;
    const v = new THREE.Vector3(Math.cos(th) * r, y, Math.sin(th) * r).multiplyScalar(1.002);
    pos.set([v.x, v.y, v.z], i * 3);
    const t = rand();
    const c = t > 0.965 ? cC : t > 0.62 ? cB : cA;
    col.set([c.r, c.g, c.b], i * 3);
    // World-space radius; the vertex shader converts it to a pixel size.
    sz[i] = t > 0.965 ? 0.026 : 0.009 + rand() * 0.007;
  }
  const shell = new THREE.Points(
    new THREE.BufferGeometry()
      .setAttribute("position", new THREE.BufferAttribute(pos, 3))
      .setAttribute("color", new THREE.BufferAttribute(col, 3))
      .setAttribute("aSize", new THREE.BufferAttribute(sz, 1)),
    new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uMap: { value: discTexture() }, uScale: { value: height / 2 } },
      vertexShader: `attribute float aSize; varying vec3 vC; uniform float uScale;
        void main(){ vC = color; vec4 mv = modelViewMatrix * vec4(position,1.0);
        gl_PointSize = max(1.0, aSize * uScale / -mv.z); gl_Position = projectionMatrix * mv; }`,
      fragmentShader: `uniform sampler2D uMap; varying vec3 vC;
        void main(){ vec4 t = texture2D(uMap, gl_PointCoord); gl_FragColor = vec4(vC, t.a * 0.9); }`,
      vertexColors: true,
    }),
  );
  globe.add(shell);

  // Latitude rings.
  const rings = new THREE.Group();
  for (let i = -4; i <= 4; i++) {
    const lat = (i / 5) * 80;
    const r = Math.cos(THREE.MathUtils.degToRad(lat)) * 1.004;
    const g = new THREE.RingGeometry(r - 0.0012, r + 0.0012, 256);
    const m = new THREE.MeshBasicMaterial({
      color: BRAND.navyMid,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(g, m);
    mesh.rotation.x = Math.PI / 2;
    mesh.position.y = Math.sin(THREE.MathUtils.degToRad(lat)) * 1.004;
    rings.add(mesh);
  }
  globe.add(rings);

  // Great-circle arcs: India <-> Rwanda plus supporting corridors.
  const CITIES = {
    delhi: [28.61, 77.21],
    mumbai: [19.08, 72.88],
    bengaluru: [12.97, 77.59],
    ahmedabad: [23.02, 72.57],
    kigali: [-1.94, 29.87],
    nairobi: [-1.29, 36.82],
    dubai: [25.2, 55.27],
    addis: [8.98, 38.76],
  };
  const ROUTES = [
    ["delhi", "kigali", 0.62],
    ["mumbai", "kigali", 0.44],
    ["bengaluru", "kigali", 0.34],
    ["ahmedabad", "kigali", 0.53],
    ["mumbai", "dubai", 0.2],
    ["dubai", "kigali", 0.26],
    ["kigali", "nairobi", 0.12],
    ["delhi", "addis", 0.42],
  ];

  const arcMats = [];
  ROUTES.forEach(([a, b, lift], idx) => {
    const p0 = latLonToVec3(...CITIES[a], 1.005);
    const p1 = latLonToVec3(...CITIES[b], 1.005);
    const mid = p0
      .clone()
      .add(p1)
      .normalize()
      .multiplyScalar(1 + lift);
    const curve = new THREE.QuadraticBezierCurve3(p0, mid, p1);
    const geo = new THREE.TubeGeometry(curve, 160, 0.0042, 8, false);
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uOffset: { value: idx / ROUTES.length },
        uA: { value: new THREE.Color(BRAND.gold) },
        uB: { value: new THREE.Color(BRAND.goldLight) },
      },
      vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
      fragmentShader: `uniform float uTime; uniform float uOffset; uniform vec3 uA; uniform vec3 uB; varying vec2 vUv;
        void main(){
          float base = 0.20 + 0.12 * sin(6.2831853 * (uTime + uOffset));
          float head = fract(uTime * 1.0 + uOffset);
          float d = vUv.x - head;
          d = d - floor(d + 0.5);
          float pulse = exp(-pow(d / 0.085, 2.0));
          float edge = smoothstep(0.0, 0.06, vUv.x) * smoothstep(1.0, 0.94, vUv.x);
          vec3 c = mix(uA, uB, pulse);
          gl_FragColor = vec4(c, (base + pulse * 1.05) * edge);
        }`,
    });
    arcMats.push(mat);
    globe.add(new THREE.Mesh(geo, mat));
  });

  // Origin / destination markers.
  const markers = [];
  [
    ["delhi", 0xd8b04a],
    ["mumbai", 0xd8b04a],
    ["bengaluru", 0xd8b04a],
    ["kigali", 0x5fb6ef],
  ].forEach(([key, color], i) => {
    const p = latLonToVec3(...CITIES[key], 1.01);
    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: discTexture(),
        color,
        opacity: 0.55,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    sprite.position.copy(p);
    sprite.scale.setScalar(0.05);
    globe.add(sprite);
    markers.push({ sprite, phase: i / 4 });
  });

  // Ambient dust.
  const DUST = 900;
  const dpos = new Float32Array(DUST * 3);
  for (let i = 0; i < DUST; i++) {
    const r = 1.9 + rand() * 3.4;
    const th = rand() * Math.PI * 2;
    const ph = Math.acos(2 * rand() - 1);
    dpos.set(
      [r * Math.sin(ph) * Math.cos(th), (rand() - 0.5) * 3.4, r * Math.sin(ph) * Math.sin(th)],
      i * 3,
    );
  }
  const dust = new THREE.Points(
    new THREE.BufferGeometry().setAttribute("position", new THREE.BufferAttribute(dpos, 3)),
    new THREE.PointsMaterial({
      size: 0.014,
      map: discTexture(),
      color: 0x9fc4ff,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  );
  world.add(dust);

  const composer = makeComposer(renderer, scene, camera, width, height, {
    strength: 0.5,
    radius: 0.8,
    threshold: 0.32,
  });

  // Face the India–Rwanda corridor and breathe around it, instead of spinning
  // it out of frame — a full revolution would hide the story most of the time.
  const FACING = THREE.MathUtils.degToRad(-142);

  return {
    composer,
    update(t) {
      const tau = Math.PI * 2 * t;
      globe.rotation.y = FACING + Math.sin(tau) * 0.26;
      globe.rotation.x = Math.sin(tau + 1.1) * 0.035;
      dust.rotation.y = Math.sin(tau) * 0.12;
      arcMats.forEach((m) => (m.uniforms.uTime.value = t));
      markers.forEach((m) => {
        const s = 0.044 + 0.018 * (0.5 + 0.5 * Math.sin(tau * 2 + m.phase * Math.PI * 2));
        m.sprite.scale.setScalar(s);
      });
      camera.position.x = 0.1 + Math.sin(tau) * 0.06;
      camera.position.y = 0.3 + Math.sin(tau * 2) * 0.025;
      camera.position.z = 4.35 - Math.sin(tau) * 0.12;
      camera.lookAt(0.26, 0.02, 0);
    },
  };
}

/* --------------------------------------------------- 2. Trade filaments */

/** Compact 2D value-noise fBm — enough to shape a flow field. */
function makeNoise2D(seed) {
  const rand = mulberry32(seed);
  const perm = new Uint8Array(512);
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
  const grad = (h, x, y) => {
    const a = ((h & 7) / 8) * Math.PI * 2;
    return Math.cos(a) * x + Math.sin(a) * y;
  };
  const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
  const noise = (x, y) => {
    const xi = Math.floor(x) & 255;
    const yi = Math.floor(y) & 255;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);
    const u = fade(xf);
    const v = fade(yf);
    const aa = perm[perm[xi] + yi];
    const ab = perm[perm[xi] + yi + 1];
    const ba = perm[perm[xi + 1] + yi];
    const bb = perm[perm[xi + 1] + yi + 1];
    const x1 = grad(aa, xf, yf) * (1 - u) + grad(ba, xf - 1, yf) * u;
    const x2 = grad(ab, xf, yf - 1) * (1 - u) + grad(bb, xf - 1, yf - 1) * u;
    return x1 * (1 - v) + x2 * v;
  };
  return (x, y) => {
    let s = 0;
    let a = 0.6;
    let f = 1;
    for (let i = 0; i < 4; i++) {
      s += a * noise(x * f, y * f);
      f *= 2.07;
      a *= 0.5;
    }
    return s;
  };
}

function filaments(renderer, width, height) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x040c1d);

  const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
  camera.position.set(0, 0, 12);
  camera.lookAt(0, 0, 0);

  const group = new THREE.Group();
  group.rotation.z = THREE.MathUtils.degToRad(-7);
  scene.add(group);

  const rand = mulberry32(90210);
  const noise = makeNoise2D(4242);

  const LINES = 190;
  const STEPS = 150;
  const STEP = 0.13;
  const positions = [];
  const params = [];
  const colors = [];
  const cRoyal = new THREE.Color(0x2c6fd6);
  const cSky = new THREE.Color(0x66a6ee);
  const cGold = new THREE.Color(0xd8b04a);
  const cGoldHot = new THREE.Color(0xf3dda3);

  for (let l = 0; l < LINES; l++) {
    let x = -13 + rand() * 3.5;
    let y = (rand() - 0.5) * 11;
    const z = (rand() - 0.5) * 7;
    const tone = rand();
    const base = tone > 0.84 ? cGold : tone > 0.5 ? cSky : cRoyal;
    const weight = tone > 0.84 ? 1 : 0.42 + rand() * 0.3;
    const seed = rand();
    const pts = [];
    for (let s = 0; s < STEPS; s++) {
      pts.push(x, y, z);
      const a = noise(x * 0.075, y * 0.075) * Math.PI * 1.35;
      x += Math.cos(a) * STEP * 0.35 + STEP;
      y += Math.sin(a) * STEP * 1.15;
    }
    for (let s = 0; s < STEPS - 1; s++) {
      positions.push(
        pts[s * 3], pts[s * 3 + 1], pts[s * 3 + 2],
        pts[(s + 1) * 3], pts[(s + 1) * 3 + 1], pts[(s + 1) * 3 + 2],
      );
      const t0 = s / (STEPS - 1);
      const t1 = (s + 1) / (STEPS - 1);
      params.push(t0, seed, weight, t1, seed, weight);
      const c = tone > 0.84 ? cGoldHot : base;
      colors.push(c.r, c.g, c.b, c.r, c.g, c.b);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute("aParam", new THREE.Float32BufferAttribute(params, 3));
  geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    uniforms: { uTime: { value: 0 } },
    vertexShader: `
      attribute vec3 aParam; // x = arc position, y = per-line seed, z = weight
      varying vec3 vC; varying vec3 vP;
      void main(){ vC = color; vP = aParam;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: `
      uniform float uTime; varying vec3 vC; varying vec3 vP;
      void main(){
        float t = vP.x, seed = vP.y, weight = vP.z;
        // Fade both ends so filaments dissolve instead of stopping.
        float ends = smoothstep(0.0, 0.14, t) * smoothstep(1.0, 0.80, t);
        float head = fract(uTime + seed);
        float d = t - head; d = d - floor(d + 0.5);
        float pulse = exp(-pow(d / 0.055, 2.0));
        float a = (0.085 * weight + pulse * 0.85 * weight) * ends;
        gl_FragColor = vec4(vC * (0.8 + pulse * 1.2), a);
      }`,
  });

  group.add(new THREE.LineSegments(geo, mat));

  // Soft depth haze so the field recedes.
  const haze = new THREE.Mesh(
    new THREE.PlaneGeometry(60, 34),
    new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: { uColor: { value: new THREE.Color(0x040c1d) } },
      vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
      fragmentShader: `uniform vec3 uColor; varying vec2 vUv;
        void main(){ vec2 p = vUv - 0.5;
          float v = smoothstep(0.18, 0.62, length(p * vec2(1.0, 1.35)));
          gl_FragColor = vec4(uColor, v * 0.95); }`,
    }),
  );
  haze.position.z = 6.2;
  scene.add(haze);

  const composer = makeComposer(renderer, scene, camera, width, height, {
    strength: 0.62,
    radius: 0.85,
    threshold: 0.2,
  });

  return {
    composer,
    update(t) {
      const tau = Math.PI * 2 * t;
      mat.uniforms.uTime.value = t;
      group.position.y = Math.sin(tau) * 0.32;
      group.rotation.y = Math.sin(tau) * 0.05;
      camera.position.z = 12 - Math.sin(tau) * 0.45;
      camera.position.x = Math.sin(tau + 0.9) * 0.35;
      camera.lookAt(0, 0, 0);
    },
  };
}

/* ------------------------------------------------------- 3. Silk horizon */

function silk(renderer, width, height) {
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uAspect: { value: width / height },
      uInk: { value: new THREE.Color(0x040b1a) },
      uNavy: { value: new THREE.Color(0x0b2452) },
      uRoyal: { value: new THREE.Color(0x1b53ad) },
      uGold: { value: new THREE.Color(0xc9a227) },
    },
    vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position, 1.0); }`,
    fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform float uTime; uniform float uAspect;
      uniform vec3 uInk, uNavy, uRoyal, uGold;
      ${SNOISE}
      // The animation loops because time walks a circle in the noise domain.
      float fbm(vec2 p, float ang, float radius){
        vec2 loop = vec2(cos(ang), sin(ang)) * radius;
        float a = 0.5, s = 0.0;
        vec2 q = p;
        for(int i = 0; i < 4; i++){
          s += a * snoise(vec3(q + loop, float(i) * 7.31));
          q *= 2.02; a *= 0.5;
        }
        return s;
      }
      void main(){
        vec2 uv = vUv;
        vec2 p = vec2((uv.x - 0.5) * uAspect, uv.y - 0.5);
        float ang = uTime * 6.2831853;

        // Domain warp keeps the bands drifting like fabric rather than noise.
        float w1 = fbm(p * 0.85 + vec2(0.0, 0.2), ang, 0.55);
        float w2 = fbm(p * 1.30 - vec2(0.6, 0.0), ang + 2.1, 0.42);

        float flow = p.y * 2.15 + p.x * 0.55 + w1 * 1.15 + w2 * 0.35;
        float band = 0.5 + 0.5 * sin(flow * 3.14159);
        band = smoothstep(0.05, 0.95, band);

        // Depth: ink in the troughs, navy through royal on the crests.
        vec3 col = mix(uInk, uNavy, smoothstep(0.0, 0.62, band));
        col = mix(col, uRoyal, pow(band, 2.6) * 0.62);

        // Broad gold sheen where the "fabric" catches the light.
        float sheen = pow(band, 7.0);
        float lightMask = smoothstep(-0.9, 0.7, p.x + p.y * 0.6 + w2 * 0.5);
        col += uGold * sheen * lightMask * 0.30;

        // Two soft key lights, one warm and one cool.
        col += mix(uGold, vec3(1.0), 0.35) * exp(-length(p - vec2(0.46, 0.16)) * 2.6) * 0.16;
        col += uRoyal * exp(-length(p - vec2(-0.55, -0.22)) * 2.9) * 0.22;

        // Vignette + film grain.
        float vig = smoothstep(1.35, 0.22, length(p * vec2(0.82, 1.22)));
        col *= 0.34 + 0.66 * vig;
        float grain = fract(sin(dot(uv * vec2(1024.0, 768.0) + ang, vec2(12.9898, 78.233))) * 43758.5453);
        col += (grain - 0.5) * 0.014;

        gl_FragColor = vec4(col, 1.0);
      }`,
  });

  scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));

  const composer = makeComposer(renderer, scene, camera, width, height, {
    strength: 0.35,
    radius: 0.9,
    threshold: 0.55,
  });

  return {
    composer,
    update(t) {
      material.uniforms.uTime.value = t;
    },
  };
}

/* ---------------------------------------------------- 3. Network lattice */

function lattice(renderer, width, height) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x050e21);
  scene.fog = new THREE.FogExp2(0x050e21, 0.085);

  const camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 100);
  camera.position.set(0, 0, 9);

  const group = new THREE.Group();
  group.rotation.x = THREE.MathUtils.degToRad(-8);
  scene.add(group);

  const rand = mulberry32(714213);
  const N = 260;
  const base = [];
  for (let i = 0; i < N; i++) {
    base.push({
      home: new THREE.Vector3((rand() - 0.5) * 17, (rand() - 0.5) * 9.5, (rand() - 0.5) * 12),
      amp: new THREE.Vector3(0.35 + rand() * 0.5, 0.28 + rand() * 0.5, 0.3 + rand() * 0.6),
      phase: new THREE.Vector3(rand(), rand(), rand()),
      hub: rand() > 0.86,
    });
  }

  const nodePos = new Float32Array(N * 3);
  const nodeCol = new Float32Array(N * 3);
  const nodeSize = new Float32Array(N);
  const cGold = new THREE.Color(BRAND.goldLight);
  const cSky = new THREE.Color(0x82b4f0);
  base.forEach((b, i) => {
    const c = b.hub ? cGold : cSky;
    nodeCol.set([c.r, c.g, c.b], i * 3);
    nodeSize[i] = b.hub ? 0.115 : 0.042 + rand() * 0.03;
  });

  const nodeGeo = new THREE.BufferGeometry()
    .setAttribute("position", new THREE.BufferAttribute(nodePos, 3))
    .setAttribute("color", new THREE.BufferAttribute(nodeCol, 3))
    .setAttribute("aSize", new THREE.BufferAttribute(nodeSize, 1));
  const nodes = new THREE.Points(
    nodeGeo,
    new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      uniforms: { uMap: { value: discTexture() }, uScale: { value: height / 2 } },
      vertexShader: `attribute float aSize; varying vec3 vC; uniform float uScale;
        void main(){ vC = color; vec4 mv = modelViewMatrix * vec4(position,1.0);
        gl_PointSize = max(1.0, aSize * uScale / -mv.z); gl_Position = projectionMatrix * mv; }`,
      fragmentShader: `uniform sampler2D uMap; varying vec3 vC;
        void main(){ vec4 t = texture2D(uMap, gl_PointCoord); gl_FragColor = vec4(vC, t.a); }`,
    }),
  );
  group.add(nodes);

  const MAX_LINKS = 2600;
  const linkPos = new Float32Array(MAX_LINKS * 6);
  const linkCol = new Float32Array(MAX_LINKS * 6);
  const linkGeo = new THREE.BufferGeometry();
  linkGeo.setAttribute("position", new THREE.BufferAttribute(linkPos, 3));
  linkGeo.setAttribute("color", new THREE.BufferAttribute(linkCol, 3));
  const links = new THREE.LineSegments(
    linkGeo,
    new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  );
  group.add(links);

  // Vignette so the lattice reads as depth rather than wallpaper.
  const haze = new THREE.Mesh(
    new THREE.PlaneGeometry(46, 26),
    new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: { uColor: { value: new THREE.Color(0x040c1d) } },
      vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
      fragmentShader: `uniform vec3 uColor; varying vec2 vUv;
        void main(){ vec2 p = vUv - 0.5;
          float v = smoothstep(0.16, 0.60, length(p * vec2(1.0, 1.4)));
          gl_FragColor = vec4(uColor, v * 0.92); }`,
    }),
  );
  haze.position.z = 6.4;
  scene.add(haze);

  const composer = makeComposer(renderer, scene, camera, width, height, {
    strength: 0.62,
    radius: 0.8,
    threshold: 0.22,
  });

  const LINK_DIST = 2.35;
  const tmp = new THREE.Vector3();
  const live = [];

  return {
    composer,
    update(t) {
      const tau = Math.PI * 2 * t;
      live.length = 0;
      base.forEach((b, i) => {
        tmp.set(
          b.home.x + Math.sin(tau + b.phase.x * Math.PI * 2) * b.amp.x,
          b.home.y + Math.sin(tau + b.phase.y * Math.PI * 2) * b.amp.y,
          b.home.z + Math.sin(tau + b.phase.z * Math.PI * 2) * b.amp.z,
        );
        nodePos.set([tmp.x, tmp.y, tmp.z], i * 3);
        live.push(tmp.clone());
      });
      nodeGeo.attributes.position.needsUpdate = true;

      let n = 0;
      for (let i = 0; i < N && n < MAX_LINKS; i++) {
        for (let j = i + 1; j < N && n < MAX_LINKS; j++) {
          const d = live[i].distanceTo(live[j]);
          if (d > LINK_DIST) continue;
          const f = 1 - d / LINK_DIST;
          const gold = base[i].hub || base[j].hub;
          const c = gold ? cGold : cSky;
          const a = f * (gold ? 0.95 : 0.42);
          linkPos.set([live[i].x, live[i].y, live[i].z, live[j].x, live[j].y, live[j].z], n * 6);
          linkCol.set([c.r * a, c.g * a, c.b * a, c.r * a, c.g * a, c.b * a], n * 6);
          n++;
        }
      }
      for (let k = n; k < MAX_LINKS; k++) {
        linkPos.set([0, 0, 0, 0, 0, 0], k * 6);
        linkCol.set([0, 0, 0, 0, 0, 0], k * 6);
      }
      linkGeo.attributes.position.needsUpdate = true;
      linkGeo.attributes.color.needsUpdate = true;
      linkGeo.setDrawRange(0, MAX_LINKS * 2);

      group.rotation.y = Math.sin(tau) * 0.16;
      group.rotation.z = Math.sin(tau + 1.2) * 0.03;
      camera.position.z = 9 + Math.sin(tau) * 0.9;
      camera.position.x = Math.sin(tau) * 0.5;
      camera.lookAt(0, 0, 0);
    },
  };
}

export const SCENES = { corridor, filaments, silk, lattice };

"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader, type ThreeElements } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "motion/react";

/**
 * The corridor globe: a real world map on a sphere, with the Chamber's routes
 * drawn over it.
 *
 * Geography comes from `public/textures/world-map.png`, generated offline from
 * Natural Earth by `tools/media/worldmap.mjs`. That file is two masks rather
 * than a picture — red is land, green is national borders — so the colours are
 * mixed here and stay in the design system instead of being baked in.
 */

/* --------------------------------------------------------------- helpers */

const CITIES = {
  delhi: [28.61, 77.21],
  mumbai: [19.08, 72.88],
  ahmedabad: [23.02, 72.57],
  kigali: [-1.94, 29.87],
} as const;

/** Kigali to the three Indian cities the Chamber runs its corridor through. */
const ROUTES: [keyof typeof CITIES, keyof typeof CITIES, number][] = [
  ["delhi", "kigali", 0.34],
  ["mumbai", "kigali", 0.22],
  ["ahmedabad", "kigali", 0.28],
];

/**
 * Latitude/longitude to a point on the sphere, in the frame three.js maps an
 * equirectangular texture onto: u = 0 at 180°W, v = 0 at the north pole.
 */
function latLon(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function city(key: keyof typeof CITIES, radius: number) {
  const [lat, lon] = CITIES[key];
  return latLon(lat, lon, radius);
}

function useDiscTexture() {
  return useMemo(() => {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.4, "rgba(255,255,255,0.8)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
}

/* ----------------------------------------------------------------- parts */

/**
 * The world.
 *
 * Shading is deliberately shallow — enough for the sphere to read as a solid
 * object, not so much that a grey ball lands on a white page. The limb is
 * carried by the rim light rather than by darkening the ocean.
 */
function World() {
  const map = useLoader(THREE.TextureLoader, "/textures/world-map.png");

  const material = useMemo(() => {
    // The loader caches and shares its texture, so configure a clone rather
    // than reaching back into what the hook returned.
    const tex = map.clone();
    tex.colorSpace = THREE.NoColorSpace;
    tex.anisotropy = 8;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.wrapS = THREE.RepeatWrapping;
    tex.needsUpdate = true;

    return new THREE.ShaderMaterial({
      uniforms: {
        uMap: { value: tex },
        uOcean: { value: new THREE.Color("#ffffff") },
        uLand: { value: new THREE.Color("#12294d") },
        uBorder: { value: new THREE.Color("#5b7aa8") },
        uLight: { value: new THREE.Vector3(-0.45, 0.6, 0.85).normalize() },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vN;
        void main(){
          vUv = uv;
          vN = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: `
        uniform sampler2D uMap;
        uniform vec3 uOcean;
        uniform vec3 uLand;
        uniform vec3 uBorder;
        uniform vec3 uLight;
        varying vec2 vUv;
        varying vec3 vN;
        void main(){
          vec3 m = texture2D(uMap, vUv).rgb;
          float land = smoothstep(0.32, 0.68, m.r);
          vec3 col = mix(uOcean, uLand, land);
          col = mix(col, uBorder, m.g * 0.8 * land);
          float d = clamp(dot(normalize(vN), normalize(uLight)), 0.0, 1.0);
          gl_FragColor = vec4(col * (0.86 + 0.14 * d), 1.0);
        }`,
    });
  }, [map]);

  return (
    <mesh material={material}>
      <sphereGeometry args={[1, 96, 96]} />
    </mesh>
  );
}

function Arc({
  from,
  to,
  lift,
  index,
}: {
  from: THREE.Vector3;
  to: THREE.Vector3;
  lift: number;
  index: number;
}) {
  const material = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(() => {
    const mid = from.clone().add(to).normalize().multiplyScalar(1 + lift);
    const curve = new THREE.QuadraticBezierCurve3(from, mid, to);
    return new THREE.TubeGeometry(curve, 90, 0.006, 6, false);
  }, [from, to, lift]);

  useFrame(({ clock }) => {
    if (material.current) {
      material.current.uniforms.uTime.value = clock.elapsedTime * 0.16;
    }
  });

  return (
    <mesh geometry={geometry}>
      <shaderMaterial
        ref={material}
        transparent
        depthWrite={false}
        uniforms={{
          uTime: { value: 0 },
          uOffset: { value: index / ROUTES.length },
          uA: { value: new THREE.Color("#c9a227") },
          uB: { value: new THREE.Color("#8f7115") },
        }}
        vertexShader={`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`}
        fragmentShader={`
          uniform float uTime; uniform float uOffset; uniform vec3 uA; uniform vec3 uB;
          varying vec2 vUv;
          void main(){
            float base = 0.62 + 0.16 * sin(6.2831853 * (uTime + uOffset));
            float head = fract(uTime + uOffset);
            float d = vUv.x - head; d = d - floor(d + 0.5);
            float pulse = exp(-pow(d / 0.09, 2.0));
            float edge = smoothstep(0.0, 0.05, vUv.x) * smoothstep(1.0, 0.95, vUv.x);
            gl_FragColor = vec4(mix(uA, uB, pulse), (base + pulse) * edge);
          }`}
      />
    </mesh>
  );
}

function Marker({ position, color }: { position: THREE.Vector3; color: string }) {
  const map = useDiscTexture();
  const ref = useRef<THREE.Sprite>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.scale.setScalar(0.045 + 0.014 * (0.5 + 0.5 * Math.sin(clock.elapsedTime * 1.6)));
    }
  });
  return (
    <sprite ref={ref} position={position} scale={0.045}>
      <spriteMaterial map={map} color={color} transparent opacity={0.95} depthWrite={false} />
    </sprite>
  );
}

/** Atmosphere: what gives the limb its edge without darkening the map. */
function Rim() {
  const uniforms = useMemo(() => ({ uColor: { value: new THREE.Color("#6f8bb3") } }), []);
  return (
    <mesh scale={1.045}>
      <sphereGeometry args={[1, 64, 64]} />
      <shaderMaterial
        transparent
        side={THREE.BackSide}
        depthWrite={false}
        uniforms={uniforms}
        vertexShader={`varying vec3 vN; varying vec3 vP;
          void main(){ vN = normalize(normalMatrix * normal); vec4 mv = modelViewMatrix * vec4(position,1.0); vP = mv.xyz; gl_Position = projectionMatrix * mv; }`}
        fragmentShader={`uniform vec3 uColor; varying vec3 vN; varying vec3 vP;
          void main(){ float f = pow(1.0 - abs(dot(normalize(vN), normalize(-vP))), 3.2);
          gl_FragColor = vec4(uColor, f * 0.5); }`}
      />
    </mesh>
  );
}

/** White sphere under the map, so the globe is never see-through while loading. */
function Blank() {
  return (
    <mesh>
      <sphereGeometry args={[0.995, 48, 48]} />
      <meshBasicMaterial color="#ffffff" />
    </mesh>
  );
}

function Globe({ spin }: { spin: boolean }) {
  const group = useRef<THREE.Group>(null);

  const arcs = useMemo(
    () =>
      ROUTES.map(([a, b, lift], i) => ({
        key: `${a}-${b}`,
        from: city(a, 1.002),
        to: city(b, 1.002),
        lift,
        index: i,
      })),
    [],
  );

  useFrame((_, delta) => {
    if (spin && group.current) group.current.rotation.y += delta * 0.04;
  });

  // Opens on the corridor: Africa on the left, India on the right.
  const groupProps: ThreeElements["group"] = { rotation: [0.16, -2.58, -0.08] };

  return (
    <group ref={group} {...groupProps}>
      <Blank />
      <Suspense fallback={null}>
        <World />
      </Suspense>
      <Rim />
      {arcs.map((arc) => (
        <Arc key={arc.key} from={arc.from} to={arc.to} lift={arc.lift} index={arc.index} />
      ))}
      <Marker position={city("delhi", 1.008)} color="#c9a227" />
      <Marker position={city("mumbai", 1.008)} color="#c9a227" />
      <Marker position={city("ahmedabad", 1.008)} color="#c9a227" />
      <Marker position={city("kigali", 1.008)} color="#1a56b8" />
    </group>
  );
}

/* ------------------------------------------------------------------ root */

export default function CorridorGlobe() {
  const reduced = useReducedMotion();

  return (
    <Canvas
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      camera={{ fov: 34, position: [0, 0.18, 3.9] }}
      frameloop={reduced ? "demand" : "always"}
      style={{ touchAction: "pan-y" }}
    >
      <Globe spin={!reduced} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.42}
        enableDamping
        dampingFactor={0.08}
        minPolarAngle={Math.PI * 0.22}
        maxPolarAngle={Math.PI * 0.78}
      />
    </Canvas>
  );
}

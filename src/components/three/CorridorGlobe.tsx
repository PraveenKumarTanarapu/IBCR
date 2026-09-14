"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "motion/react";

/* --------------------------------------------------------------- helpers */

const CITIES = {
  delhi: [28.61, 77.21],
  mumbai: [19.08, 72.88],
  bengaluru: [12.97, 77.59],
  ahmedabad: [23.02, 72.57],
  kigali: [-1.94, 29.87],
  dubai: [25.2, 55.27],
  nairobi: [-1.29, 36.82],
} as const;

const ROUTES: [keyof typeof CITIES, keyof typeof CITIES, number][] = [
  ["delhi", "kigali", 0.6],
  ["mumbai", "kigali", 0.43],
  ["bengaluru", "kigali", 0.33],
  ["ahmedabad", "kigali", 0.52],
  ["mumbai", "dubai", 0.2],
  ["dubai", "kigali", 0.26],
  ["kigali", "nairobi", 0.12],
];

function latLon(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

/** Position of a named city on the sphere. */
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

function PointShell() {
  const map = useDiscTexture();

  const { positions, colors, sizes } = useMemo(() => {
    const COUNT = 6500;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    const golden = Math.PI * (3 - Math.sqrt(5));
    const a = new THREE.Color("#1b4b96");
    const b = new THREE.Color("#5f9bdd");
    const c = new THREE.Color("#e6c877");
    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const th = golden * i;
      positions.set([Math.cos(th) * r, y, Math.sin(th) * r], i * 3);
      const t = (Math.sin(i * 12.9898) * 43758.5453) % 1;
      const v = t < 0 ? t + 1 : t;
      const col = v > 0.96 ? c : v > 0.6 ? b : a;
      colors.set([col.r, col.g, col.b], i * 3);
      sizes[i] = v > 0.96 ? 0.03 : 0.012 + v * 0.008;
    }
    return { positions, colors, sizes };
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
        uniforms={{ uMap: { value: map }, uScale: { value: 340 } }}
        vertexShader={`
          attribute float aSize;
          varying vec3 vC;
          uniform float uScale;
          void main(){
            vC = color;
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = max(1.0, aSize * uScale / -mv.z);
            gl_Position = projectionMatrix * mv;
          }`}
        fragmentShader={`
          uniform sampler2D uMap;
          varying vec3 vC;
          void main(){
            vec4 t = texture2D(uMap, gl_PointCoord);
            gl_FragColor = vec4(vC, t.a * 0.9);
          }`}
      />
    </points>
  );
}

function Arc({ from, to, lift, index }: { from: THREE.Vector3; to: THREE.Vector3; lift: number; index: number }) {
  const material = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(() => {
    const mid = from.clone().add(to).normalize().multiplyScalar(1 + lift);
    const curve = new THREE.QuadraticBezierCurve3(from, mid, to);
    return new THREE.TubeGeometry(curve, 90, 0.005, 6, false);
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
        blending={THREE.AdditiveBlending}
        uniforms={{
          uTime: { value: 0 },
          uOffset: { value: index / ROUTES.length },
          uA: { value: new THREE.Color("#c9a227") },
          uB: { value: new THREE.Color("#f2ddaa") },
        }}
        vertexShader={`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`}
        fragmentShader={`
          uniform float uTime; uniform float uOffset; uniform vec3 uA; uniform vec3 uB;
          varying vec2 vUv;
          void main(){
            float base = 0.22 + 0.1 * sin(6.2831853 * (uTime + uOffset));
            float head = fract(uTime + uOffset);
            float d = vUv.x - head; d = d - floor(d + 0.5);
            float pulse = exp(-pow(d / 0.09, 2.0));
            float edge = smoothstep(0.0, 0.06, vUv.x) * smoothstep(1.0, 0.94, vUv.x);
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
      ref.current.scale.setScalar(0.05 + 0.016 * (0.5 + 0.5 * Math.sin(clock.elapsedTime * 1.6)));
    }
  });
  return (
    <sprite ref={ref} position={position} scale={0.05}>
      <spriteMaterial
        map={map}
        color={color}
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </sprite>
  );
}

function Rim() {
  const uniforms = useMemo(() => ({ uColor: { value: new THREE.Color("#2a6ad0") } }), []);
  return (
    <mesh scale={1.06}>
      <sphereGeometry args={[1, 64, 64]} />
      <shaderMaterial
        transparent
        side={THREE.BackSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
        vertexShader={`varying vec3 vN; varying vec3 vP;
          void main(){ vN = normalize(normalMatrix * normal); vec4 mv = modelViewMatrix * vec4(position,1.0); vP = mv.xyz; gl_Position = projectionMatrix * mv; }`}
        fragmentShader={`uniform vec3 uColor; varying vec3 vN; varying vec3 vP;
          void main(){ float f = pow(1.0 - abs(dot(normalize(vN), normalize(-vP))), 3.0);
          gl_FragColor = vec4(uColor * f * 1.6, f * 0.8); }`}
      />
    </mesh>
  );
}

function Globe({ spin }: { spin: boolean }) {
  const group = useRef<THREE.Group>(null);

  const arcs = useMemo(
    () =>
      ROUTES.map(([a, b, lift], i) => ({
        key: `${a}-${b}`,
        from: city(a, 1.004),
        to: city(b, 1.004),
        lift,
        index: i,
      })),
    [],
  );

  useFrame((_, delta) => {
    if (spin && group.current) group.current.rotation.y += delta * 0.045;
  });

  const groupProps: ThreeElements["group"] = { rotation: [0.06, -2.45, -0.22] };

  return (
    <group ref={group} {...groupProps}>
      <mesh>
        <sphereGeometry args={[0.985, 64, 64]} />
        <meshBasicMaterial color="#061127" />
      </mesh>
      <Rim />
      <PointShell />
      {arcs.map((arc) => (
        <Arc key={arc.key} from={arc.from} to={arc.to} lift={arc.lift} index={arc.index} />
      ))}
      <Marker position={city("delhi", 1.01)} color="#e9c86a" />
      <Marker position={city("mumbai", 1.01)} color="#e9c86a" />
      <Marker position={city("bengaluru", 1.01)} color="#e9c86a" />
      <Marker position={city("kigali", 1.01)} color="#71c4f5" />
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

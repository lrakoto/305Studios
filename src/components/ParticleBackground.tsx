"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

// ── Particle counts ──────────────────────────────────────────────────────────
const COUNT_DESKTOP = 1364;  // prev × 0.90
const COUNT_MOBILE  = 496;   // prev × 0.90

// ── Section scroll thresholds → formation index + background type ────────────
// Approximates scroll % for each section. Formation morphs at these points.
interface SectionDef { at: number; form: number; dark: boolean }
const SECTIONS: SectionDef[] = [
  { at: 0.00, form: 0, dark: true  }, // Hero       → nebula
  { at: 0.16, form: 1, dark: true  }, // Work Grid  → wave
  { at: 0.38, form: 2, dark: false }, // Services   → grid  (sand bg)
  { at: 0.57, form: 3, dark: true  }, // Studio     → vortex
  { at: 0.77, form: 4, dark: false }, // Contact    → scatter (mist bg)
  { at: 0.92, form: 0, dark: true  }, // Footer     → back to nebula
];

// ── Formation generators ──────────────────────────────────────────────────────
function nebula(n: number) {
  const p = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi   = Math.acos(2 * Math.random() - 1);
    const r     = 2.8 + Math.random() * 3.2;
    p[i*3]   = r * Math.sin(phi) * Math.cos(theta);
    p[i*3+1] = r * Math.sin(phi) * Math.sin(theta) * 0.55; // squash vertically
    p[i*3+2] = r * Math.cos(phi) * 0.6;
  }
  return p;
}

function wave(n: number) {
  const p = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const x = (Math.random() - 0.5) * 15;
    const z = (Math.random() - 0.5) * 9;
    p[i*3]   = x;
    p[i*3+1] = Math.sin(x * 0.75) * Math.cos(z * 0.5) * 2.2 + (Math.random() - 0.5) * 0.6;
    p[i*3+2] = z;
  }
  return p;
}

function grid(n: number) {
  const p = new Float32Array(n * 3);
  const cols = Math.ceil(Math.sqrt(n * 1.8));
  const rows = Math.ceil(n / cols);
  for (let i = 0; i < n; i++) {
    const jitter = 0.25;
    p[i*3]   = ((i % cols) / cols - 0.5) * 14 + (Math.random() - 0.5) * jitter;
    p[i*3+1] = (Math.floor(i / cols) / rows - 0.5) * 8 + (Math.random() - 0.5) * jitter;
    p[i*3+2] = (Math.random() - 0.5) * 3;
  }
  return p;
}

function vortex(n: number) {
  const p = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 10;
    const r = 0.8 + (i / n) * 4.5;
    p[i*3]   = Math.cos(t) * r + (Math.random() - 0.5) * 0.5;
    p[i*3+1] = (i / n - 0.5) * 8;
    p[i*3+2] = Math.sin(t) * r * 0.45 + (Math.random() - 0.5) * 0.5;
  }
  return p;
}

function scatter(n: number) {
  // Wide, sparse — gives an "exhale" feel for the contact/CTA section
  const p = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    p[i*3]   = (Math.random() - 0.5) * 18;
    p[i*3+1] = (Math.random() - 0.5) * 10;
    p[i*3+2] = (Math.random() - 0.5) * 10;
  }
  return p;
}

// ── Easing ────────────────────────────────────────────────────────────────────
function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3); }

// ── Component ─────────────────────────────────────────────────────────────────
export default function ParticleBackground() {
  const mountRef    = useRef<HTMLDivElement>(null);
  const prefersRed  = useReducedMotion();

  useEffect(() => {
    if (prefersRed || !mountRef.current) return;

    let alive  = true;
    let rafId  = 0;
    // Typed after dynamic import
    let renderer: import("three").WebGLRenderer | null = null;
    let geo:      import("three").BufferGeometry | null = null;
    let mat:      import("three").PointsMaterial | null  = null;
    let tex:      import("three").CanvasTexture | null   = null;

    import("three").then((THREE) => {
      if (!alive || !mountRef.current) return;

      const isMobile = window.innerWidth < 768;
      const N        = isMobile ? COUNT_MOBILE : COUNT_DESKTOP;

      // ── Renderer ──────────────────────────────────────────────
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "low-power" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      mountRef.current.appendChild(renderer.domElement);

      // ── Scene / Camera ────────────────────────────────────────
      const scene  = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(72, window.innerWidth / window.innerHeight, 0.1, 100);
      camera.position.z = 5;

      // ── Crisp solid-circle particle texture ───────────────────
      const tc  = document.createElement("canvas");
      tc.width  = tc.height = 32;
      const ctx = tc.getContext("2d")!;
      ctx.beginPath();
      ctx.arc(16, 16, 14, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
      tex = new THREE.CanvasTexture(tc);

      // ── Formations ────────────────────────────────────────────
      const formations = [nebula(N), wave(N), grid(N), vortex(N), scatter(N)];

      // ── Geometry ──────────────────────────────────────────────
      const positions = new Float32Array(formations[0]); // copy of nebula
      geo = new THREE.BufferGeometry();
      const posAttr = new THREE.BufferAttribute(positions, 3);
      posAttr.setUsage(THREE.DynamicDrawUsage);
      geo.setAttribute("position", posAttr);

      // ── Colors: teal for dark sections, near-ink for light ────
      // Neutral silver-grey for dark sections; dark charcoal for light sections
      const LIGHT_NEUTRAL = new THREE.Color("#B0B0BA"); // cool silver-grey
      const DARK_NEUTRAL  = new THREE.Color("#2C2C32"); // dark charcoal
      const currentColor  = LIGHT_NEUTRAL.clone();

      mat = new THREE.PointsMaterial({
        size:             isMobile ? 0.028 : 0.018,
        map:              tex,
        transparent:      true,
        opacity:          0.55,
        depthWrite:       false,
        sizeAttenuation:  true,
        color:            currentColor,
        blending:         THREE.AdditiveBlending, // glow on dark; subtle on light
      });

      const particles = new THREE.Points(geo, mat);
      scene.add(particles);

      // ── Per-particle wobble seeds ─────────────────────────────
      const seeds  = Float32Array.from({ length: N }, () => Math.random() * Math.PI * 2);
      const speeds = Float32Array.from({ length: N }, () => 0.28 + Math.random() * 0.44);

      // ── Animation state ───────────────────────────────────────
      let time        = 0;
      let fromForm    = 0;
      let toForm      = 0;
      let morphT      = 1;    // 0→1 lerp progress
      let lastSection: SectionDef = SECTIONS[0];

      function currentSection(progress: number) {
        let s = SECTIONS[0];
        for (const sec of SECTIONS) { if (progress >= sec.at) s = sec; else break; }
        return s;
      }

      function scrollProgress() {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        return max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      }

      // ── Render loop ───────────────────────────────────────────
      function animate() {
        if (!alive) return;
        rafId = requestAnimationFrame(animate);
        time += 0.007;

        const sp  = scrollProgress();
        const sec = currentSection(sp);

        // Trigger morph on section change
        if (sec !== lastSection) {
          fromForm    = toForm;
          toForm      = sec.form;
          morphT      = 0;
          lastSection = sec;
        }
        morphT = Math.min(morphT + 0.012, 1);
        const ease = easeOutCubic(morphT);

        // Target particle colour based on dark/light section
        const targetCol2 = sec.dark ? LIGHT_NEUTRAL : DARK_NEUTRAL;
        currentColor.lerp(targetCol2, 0.018);
        mat!.color.copy(currentColor);
        mat!.opacity = sec.dark ? 0.55 : 0.28; // dimmer on light backgrounds

        const src = formations[fromForm];
        const dst = formations[toForm];

        for (let i = 0; i < N; i++) {
          const i3  = i * 3;
          const tx  = src[i3]   + (dst[i3]   - src[i3])   * ease;
          const ty  = src[i3+1] + (dst[i3+1] - src[i3+1]) * ease;
          const tz  = src[i3+2] + (dst[i3+2] - src[i3+2]) * ease;
          const w   = Math.sin(time * speeds[i] + seeds[i]) * 0.055;
          positions[i3]   = tx + w;
          positions[i3+1] = ty + Math.cos(time * speeds[i] * 0.65 + seeds[i]) * 0.038;
          positions[i3+2] = tz + w * 0.4;
        }

        posAttr.needsUpdate = true;

        // Slow drift + subtle scroll-linked tilt
        particles.rotation.y  = time * 0.022 + sp * Math.PI * 0.4;
        particles.rotation.x  = Math.sin(time * 0.035) * 0.07;

        renderer!.render(scene, camera);
      }

      animate();

      // ── Resize ────────────────────────────────────────────────
      function onResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer!.setSize(window.innerWidth, window.innerHeight);
      }
      window.addEventListener("resize", onResize, { passive: true });

      // Store resize cleanup on the ref so the return closure can reach it
      (mountRef.current as HTMLElement & { __pCleanup?: () => void }).__pCleanup = () => {
        window.removeEventListener("resize", onResize);
      };
    });

    return () => {
      alive = false;
      cancelAnimationFrame(rafId);
      (mountRef.current as HTMLElement & { __pCleanup?: () => void })?.__pCleanup?.();
      geo?.dispose();
      mat?.dispose();
      tex?.dispose();
      if (renderer) {
        const el = renderer.domElement;
        if (mountRef.current?.contains(el)) mountRef.current.removeChild(el);
        renderer.dispose();
      }
    };
  }, [prefersRed]);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 2 }}
    />
  );
}

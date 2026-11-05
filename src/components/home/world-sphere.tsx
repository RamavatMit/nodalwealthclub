"use client";

import type { MotionValue } from "motion/react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Vec = [number, number, number];
type World = 0 | 1 | 2;

const N = 420;

/** Small deterministic PRNG so every visit draws the same sphere. */
function prng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const norm = ([x, y, z]: Vec): Vec => {
  const l = Math.hypot(x, y, z) || 1;
  return [x / l, y / l, z / l];
};

/** World 0 — AI: an even neural mesh (Fibonacci sphere). */
function layoutMesh(): Vec[] {
  const out: Vec[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const t = golden * i;
    out.push([Math.cos(t) * r, y, Math.sin(t) * r]);
  }
  return out;
}

/** World 1 — Web3: an ordered lattice of latitude rings, like blocks in a chain. */
function layoutLattice(): Vec[] {
  const out: Vec[] = [];
  const rings = 14;
  const perRing = Math.ceil(N / rings);
  for (let i = 0; i < N; i++) {
    const ring = Math.floor(i / perRing);
    const k = i % perRing;
    const lat = -Math.PI / 2 + ((ring + 0.5) / rings) * Math.PI;
    const lon = (k / perRing) * Math.PI * 2 + (ring % 2) * (Math.PI / perRing);
    out.push([Math.cos(lat) * Math.cos(lon), Math.sin(lat), Math.cos(lat) * Math.sin(lon)]);
  }
  return out;
}

/** World 2 — Agents: clusters of points, each a small agent, around hubs. */
function layoutClusters(): Vec[] {
  const rand = prng(11);
  const hubs: Vec[] = Array.from({ length: 7 }, () => norm([rand() - 0.5, rand() - 0.5, rand() - 0.5]));
  return Array.from({ length: N }, (_, i) => {
    const h = hubs[i % hubs.length];
    const spread = 0.35 * Math.sqrt(rand());
    return norm([
      h[0] + (rand() - 0.5) * spread,
      h[1] + (rand() - 0.5) * spread,
      h[2] + (rand() - 0.5) * spread,
    ]);
  });
}

/** k nearest neighbours → undirected edge list. */
function edgesFor(pts: Vec[], k: number): [number, number][] {
  const seen = new Set<string>();
  const edges: [number, number][] = [];
  for (let i = 0; i < pts.length; i++) {
    const d = pts
      .map(
        (p, j) => [j, (p[0] - pts[i][0]) ** 2 + (p[1] - pts[i][1]) ** 2 + (p[2] - pts[i][2]) ** 2] as const,
      )
      .filter(([j]) => j !== i)
      .sort((a, b) => a[1] - b[1])
      .slice(0, k);
    for (const [j] of d) {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (!seen.has(key)) {
        seen.add(key);
        edges.push([i, j]);
      }
    }
  }
  return edges;
}

const LAYOUTS = [layoutMesh(), layoutLattice(), layoutClusters()];
const EDGES = [edgesFor(LAYOUTS[0], 3), edgesFor(LAYOUTS[1], 2), edgesFor(LAYOUTS[2], 2)];
const ACCENT = ["--mint", "--emerald", "--jade"] as const;
// A few points per world pulse in the accent colour ("active" nodes).
const ACTIVE = (() => {
  const rand = prng(5);
  return Array.from({ length: 18 }, () => Math.floor(rand() * N));
})();

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/**
 * Rotating 3D dot sphere for the Home hero. Its structure morphs between the
 * three worlds, it leans towards the pointer, and `zoom` (0 → 1, driven by
 * scroll) grows it from a planet rising out of the bottom edge to filling the
 * screen. Canvas 2D; pauses off-screen; one still frame for reduced motion.
 */
export function WorldSphere({
  world,
  zoom,
  className,
}: {
  world: World;
  zoom: MotionValue<number>;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const worldRef = useRef<World>(world);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const css = getComputedStyle(document.documentElement);
    const col = (n: string) => css.getPropertyValue(n).trim();
    const palette = {
      ink: col("--ink-muted"),
      forest: col("--forest"),
      line: col("--line"),
      mint: col("--mint"),
      linen: col("--linen"),
      paper: col("--paper"),
    };

    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let rot = 0.6;
    let tiltX = 0.32;
    let tiltY = 0;
    const pointer = { x: 0, y: 0 };

    // Morph state: current positions ease toward the active world's layout.
    const pos: Vec[] = LAYOUTS[worldRef.current].map((p) => [...p] as Vec);
    let from = worldRef.current;
    let to = worldRef.current;
    let morph = 1;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(performance.now());
    };

    const draw = (now: number) => {
      if (worldRef.current !== to) {
        from = to;
        to = worldRef.current;
        morph = 0;
      }
      if (morph < 1) morph = Math.min(1, morph + (reduce ? 1 : 0.018));
      const m = ease(morph);
      const A = LAYOUTS[from];
      const B = LAYOUTS[to];
      for (let i = 0; i < N; i++) {
        pos[i][0] = A[i][0] + (B[i][0] - A[i][0]) * m;
        pos[i][1] = A[i][1] + (B[i][1] - A[i][1]) * m;
        pos[i][2] = A[i][2] + (B[i][2] - A[i][2]) * m;
      }

      // Layout: planet rising from the bottom (z=0) → filling the screen (z=1).
      const z = ease(Math.min(1, Math.max(0, zoom.get())));
      // At rest only the top cap shows below the hero copy (planet rising).
      const R0 = Math.min(w < 700 ? w * 0.85 : w * 0.46, h * 0.82);
      const R1 = Math.hypot(w, h) * 0.62;
      const R = R0 + (R1 - R0) * z;
      const cx = w / 2;
      const cy0 = h + R0 * 0.6;
      const cy = cy0 + (h / 2 - cy0) * z;
      const fade = 1 - z * 0.65;

      // Rotation with a gentle lean towards the pointer.
      tiltX += (0.32 + pointer.y * 0.25 - tiltX) * 0.05;
      tiltY += (pointer.x * 0.35 - tiltY) * 0.05;
      const ay = rot + tiltY;
      const cosY = Math.cos(ay);
      const sinY = Math.sin(ay);
      const cosX = Math.cos(tiltX);
      const sinX = Math.sin(tiltX);

      const sx = new Float32Array(N);
      const sy = new Float32Array(N);
      const sz = new Float32Array(N);
      for (let i = 0; i < N; i++) {
        const [x, y, zz] = pos[i];
        const x1 = x * cosY - zz * sinY;
        const z1 = x * sinY + zz * cosY;
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;
        const p = 3.2 / (3.2 - z2);
        sx[i] = cx + x1 * R * p;
        sy[i] = cy - y2 * R * p;
        sz[i] = z2;
      }

      ctx.clearRect(0, 0, w, h);

      // The planet's body: a soft linen disc. Zooming in fills the screen
      // with it, so the manifesto reads "inside" the sphere.
      const body = ctx.createRadialGradient(cx, cy - R * 0.35, R * 0.1, cx, cy, R);
      body.addColorStop(0, palette.paper);
      body.addColorStop(0.7, palette.linen);
      body.addColorStop(1, palette.linen);
      ctx.globalAlpha = 0.55 + z * 0.45;
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 0.5 * (1 - z);
      ctx.strokeStyle = palette.mint;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Edges: outgoing world fades out, incoming fades in.
      const drawEdges = (list: [number, number][], alpha: number) => {
        if (alpha <= 0.01) return;
        ctx.lineWidth = 1;
        for (const [a, b] of list) {
          const depth = (sz[a] + sz[b]) / 2;
          ctx.globalAlpha = alpha * fade * (depth > 0 ? 0.55 : 0.18);
          ctx.strokeStyle = depth > 0 ? palette.mint : palette.line;
          ctx.beginPath();
          ctx.moveTo(sx[a], sy[a]);
          ctx.lineTo(sx[b], sy[b]);
          ctx.stroke();
        }
      };
      if (from !== to) drawEdges(EDGES[from], 1 - m);
      drawEdges(EDGES[to], from !== to ? m : 1);

      // Points, back to front.
      const accent = col(ACCENT[to]);
      for (let i = 0; i < N; i++) {
        const front = sz[i] > 0;
        ctx.globalAlpha = fade * (front ? 0.85 : 0.25);
        ctx.fillStyle = front ? palette.forest : palette.ink;
        ctx.beginPath();
        ctx.arc(sx[i], sy[i], front ? 1.6 + sz[i] * 0.9 : 1, 0, Math.PI * 2);
        ctx.fill();
      }
      for (const [k, i] of ACTIVE.entries()) {
        if (sz[i] <= 0) continue;
        const pulse = reduce ? 0.5 : (Math.sin(now * 0.002 + k) + 1) / 2;
        ctx.globalAlpha = fade * (0.35 + pulse * 0.5);
        ctx.strokeStyle = accent;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(sx[i], sy[i], 4 + pulse * 4, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = accent;
        ctx.beginPath();
        ctx.arc(sx[i], sy[i], 2.6, 0, Math.PI * 2);
        ctx.fill();
      }

      // Agents world: two orbit rings with a travelling agent on each.
      if (to === 2 || from === 2) {
        const o = to === 2 ? m : 1 - m;
        for (const [r, speed, tilt] of [
          [1.25, 0.0004, 0.5],
          [1.42, -0.00028, -0.35],
        ] as const) {
          ctx.globalAlpha = o * fade * 0.6;
          ctx.strokeStyle = palette.forest;
          ctx.lineWidth = 0.8;
          ctx.setLineDash([3, 5]);
          ctx.beginPath();
          ctx.ellipse(cx, cy, R * r, R * r * 0.28, tilt, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);
          const t = now * speed;
          const ex = Math.cos(t) * R * r;
          const ey = Math.sin(t) * R * r * 0.28;
          ctx.fillStyle = col("--jade");
          ctx.globalAlpha = o * fade;
          ctx.beginPath();
          ctx.arc(
            cx + ex * Math.cos(tilt) - ey * Math.sin(tilt),
            cy + ex * Math.sin(tilt) + ey * Math.cos(tilt),
            4,
            0,
            Math.PI * 2,
          );
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      if (!reduce) rot += 0.0016;
    };

    const loop = (now: number) => {
      draw(now);
      if (visible && !document.hidden) raf = requestAnimationFrame(loop);
    };
    const start = () => {
      cancelAnimationFrame(raf);
      if (reduce) {
        draw(performance.now());
        return;
      }
      if (visible && !document.hidden) raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      start();
    });
    io.observe(canvas);
    document.addEventListener("visibilitychange", start);
    window.addEventListener("pointermove", onMove, { passive: true });
    // Reduced motion has no loop: redraw when the world or zoom changes.
    const redraw = () => reduce && draw(performance.now());
    const unsub = zoom.on("change", redraw);
    canvas.addEventListener("nwc-world", redraw);
    resize();
    start();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      unsub();
      canvas.removeEventListener("nwc-world", redraw);
      document.removeEventListener("visibilitychange", start);
      window.removeEventListener("pointermove", onMove);
    };
  }, [zoom]);

  useEffect(() => {
    worldRef.current = world;
    canvasRef.current?.dispatchEvent(new Event("nwc-world"));
  }, [world]);

  return <canvas ref={canvasRef} aria-hidden className={cn("block h-full w-full", className)} />;
}

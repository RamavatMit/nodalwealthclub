"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Node = {
  index: number;
  x: number;
  y: number;
  ox: number;
  oy: number;
  phase: number;
  r: number;
  accent: boolean;
};
type Edge = [number, number];
type Packet = { edge: number; t: number; speed: number; glyph: string; forward: boolean };

const GLYPHS = ["₹", "₹", "◆", "●", "e₹"];

/** Small deterministic PRNG so the network looks the same on every load. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function build(width: number, height: number) {
  const rand = mulberry32(7);
  const cols = width < 640 ? 5 : 9;
  const rows = width < 640 ? 7 : 6;
  const nodes: Node[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (rand() < 0.18) continue;
      const x = ((c + 0.5 + (rand() - 0.5) * 0.7) / cols) * width;
      const y = ((r + 0.5 + (rand() - 0.5) * 0.7) / rows) * height;
      nodes.push({
        index: nodes.length,
        x,
        y,
        ox: x,
        oy: y,
        phase: rand() * Math.PI * 2,
        r: 2 + rand() * 2.2,
        accent: rand() < 0.16,
      });
    }
  }
  const maxDist = Math.max(width / cols, height / rows) * 1.45;
  const edges: Edge[] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
      if (d < maxDist && rand() < 0.62) edges.push([i, j]);
    }
  }
  const packets: Packet[] = Array.from({ length: Math.min(14, Math.floor(edges.length / 4)) }, () => ({
    edge: Math.floor(rand() * edges.length),
    t: rand(),
    speed: 0.0018 + rand() * 0.0025,
    glyph: GLYPHS[Math.floor(rand() * GLYPHS.length)],
    forward: rand() > 0.5,
  }));
  return { nodes, edges, packets, rand };
}

/**
 * The "future money" hero: a living network of nodes where rupee and token
 * glyphs travel along the lines. Canvas 2D (no WebGL) keeps it light on
 * mid-range Android. Pauses off-screen and in background tabs; renders one
 * still frame for prefers-reduced-motion.
 *
 * AI cues, kept calm: nodes near the pointer light up and draw "attention"
 * lines to it, and every few seconds an inference wave ripples outward hop
 * by hop from one node, like the network working through a question.
 */
export function NodeNetwork({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const styles = getComputedStyle(document.documentElement);
    const color = (name: string) => styles.getPropertyValue(name).trim();
    const palette = {
      line: color("--line"),
      ink: color("--ink-muted"),
      forest: color("--forest"),
      mint: color("--mint"),
      emerald: color("--emerald"),
      paper: color("--paper"),
    };

    let width = 0;
    let height = 0;
    let world = build(1, 1);
    let raf = 0;
    let visible = true;
    let time = 0;

    // Pointer "attention"
    const pointer = { x: 0, y: 0, active: false, strength: 0 };
    const ATTENTION_RADIUS = 150;

    // Inference wave: hop distance of every node from a random origin.
    let wave: { start: number; hops: number[] } | null = null;
    let nextWave = 1800;
    const startWave = (now: number) => {
      const { nodes, edges, rand } = world;
      const hops = new Array(nodes.length).fill(Infinity);
      const origin = Math.floor(rand() * nodes.length);
      hops[origin] = 0;
      const queue = [origin];
      while (queue.length) {
        const n = queue.shift()!;
        for (const [a, b] of edges) {
          const m = a === n ? b : b === n ? a : -1;
          if (m >= 0 && hops[m] === Infinity) {
            hops[m] = hops[n] + 1;
            queue.push(m);
          }
        }
      }
      wave = { start: now, hops };
    };
    const HOP_MS = 180;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      world = build(width, height);
      draw();
    };

    const draw = () => {
      const { nodes, edges, packets, rand } = world;
      ctx.clearRect(0, 0, width, height);

      pointer.strength += ((pointer.active ? 1 : 0) - pointer.strength) * 0.12;
      const near = (n: Node) => {
        if (pointer.strength < 0.01) return 0;
        const d = Math.hypot(n.x - pointer.x, n.y - pointer.y);
        return d < ATTENTION_RADIUS ? (1 - d / ATTENTION_RADIUS) * pointer.strength : 0;
      };

      for (const n of nodes) {
        n.x = n.ox + Math.sin(time * 0.0006 + n.phase) * 6;
        n.y = n.oy + Math.cos(time * 0.0005 + n.phase) * 6;
        // Nodes lean gently towards the pointer.
        const k = near(n);
        if (k > 0) {
          n.x += (pointer.x - n.x) * k * 0.08;
          n.y += (pointer.y - n.y) * k * 0.08;
        }
      }

      ctx.lineWidth = 1;
      ctx.strokeStyle = palette.line;
      ctx.beginPath();
      for (const [a, b] of edges) {
        ctx.moveTo(nodes[a].x, nodes[a].y);
        ctx.lineTo(nodes[b].x, nodes[b].y);
      }
      ctx.stroke();

      // Inference wave: edges light up hop by hop, then fade.
      if (wave) {
        const elapsed = time - wave.start;
        let alive = false;
        ctx.lineWidth = 1.4;
        for (const [a, b] of edges) {
          const hop = Math.max(wave.hops[a], wave.hops[b]);
          if (!Number.isFinite(hop)) continue;
          const local = (elapsed - hop * HOP_MS) / 700;
          if (local < 0) {
            alive = true;
            continue;
          }
          if (local > 1) continue;
          alive = true;
          ctx.globalAlpha = Math.sin(local * Math.PI) * 0.9;
          ctx.strokeStyle = palette.mint;
          ctx.beginPath();
          ctx.moveTo(nodes[a].x, nodes[a].y);
          ctx.lineTo(nodes[b].x, nodes[b].y);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
        if (!alive) wave = null;
      } else if (!reduce && time > nextWave) {
        startWave(time);
        nextWave = time + 5200;
      }

      // Attention lines from nearby nodes to the pointer.
      if (pointer.strength > 0.01) {
        for (const n of nodes) {
          const k = near(n);
          if (k <= 0) continue;
          ctx.globalAlpha = k * 0.75;
          ctx.strokeStyle = palette.forest;
          ctx.lineWidth = 0.8;
          ctx.setLineDash([2, 3]);
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
        }
        ctx.setLineDash([]);
        ctx.globalAlpha = pointer.strength;
        ctx.strokeStyle = palette.forest;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 10, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(pointer.x - 15, pointer.y);
        ctx.lineTo(pointer.x - 6, pointer.y);
        ctx.moveTo(pointer.x + 6, pointer.y);
        ctx.lineTo(pointer.x + 15, pointer.y);
        ctx.moveTo(pointer.x, pointer.y - 15);
        ctx.lineTo(pointer.x, pointer.y - 6);
        ctx.moveTo(pointer.x, pointer.y + 6);
        ctx.lineTo(pointer.x, pointer.y + 15);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = palette.paper;
        ctx.fill();
        const waveAt = wave ? time - wave.start - wave.hops[n.index] * HOP_MS : -1;
        const lit = near(n) > 0.15 || (waveAt > 0 && waveAt < 600);
        ctx.strokeStyle = n.accent || lit ? palette.forest : palette.ink;
        ctx.lineWidth = n.accent || lit ? 1.6 : 1;
        ctx.stroke();
        if (lit) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 0.45, 0, Math.PI * 2);
          ctx.fillStyle = palette.forest;
          ctx.fill();
        }
        if (n.accent) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + 5 + Math.sin(time * 0.002 + n.phase) * 1.5, 0, Math.PI * 2);
          ctx.strokeStyle = palette.mint;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      ctx.font = `500 12px ${getComputedStyle(document.body).fontFamily}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (const p of packets) {
        const [a, b] = edges[p.edge] ?? edges[0];
        const [from, to] = p.forward ? [nodes[a], nodes[b]] : [nodes[b], nodes[a]];
        const x = from.x + (to.x - from.x) * p.t;
        const y = from.y + (to.y - from.y) * p.t;
        const label = p.glyph;
        const w = Math.max(18, ctx.measureText(label).width + 10);
        ctx.fillStyle = palette.paper;
        ctx.strokeStyle = palette.emerald;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(x - w / 2, y - 9, w, 18, 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = palette.forest;
        ctx.fillText(label, x, y + 0.5);

        if (!reduce) {
          p.t += p.speed;
          if (p.t >= 1) {
            // Hop to a connected edge so packets flow through the network.
            const end = p.forward ? b : a;
            const next = edges
              .map((e, i) => [e, i] as const)
              .filter(([e, i]) => i !== p.edge && (e[0] === end || e[1] === end));
            const pick = next.length ? next[Math.floor(rand() * next.length)] : null;
            if (pick) {
              p.edge = pick[1];
              p.forward = pick[0][0] === end;
            } else {
              p.edge = Math.floor(rand() * edges.length);
            }
            p.t = 0;
          }
        }
      }
    };

    const loop = (now: number) => {
      time = now;
      draw();
      if (visible && !document.hidden) raf = requestAnimationFrame(loop);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      if (!reduce && visible && !document.hidden) raf = requestAnimationFrame(loop);
    };

    const host = canvas.parentElement ?? canvas;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
      if (reduce) {
        pointer.strength = 1;
        draw();
      }
    };
    const onLeave = () => {
      pointer.active = false;
      if (reduce) {
        pointer.strength = 0;
        draw();
      }
    };
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);

    resize();
    start();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    });
    io.observe(canvas);
    document.addEventListener("visibilitychange", start);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", start);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={cn("block h-full w-full", className)} />;
}

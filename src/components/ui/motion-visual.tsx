import { cn } from "@/lib/utils";

type Tone = "mint" | "sand" | "emerald" | "linen";

const tones: Record<Tone, [string, string, string]> = {
  mint: ["var(--linen)", "var(--mint)", "var(--paper)"],
  sand: ["var(--sand)", "var(--emerald)", "var(--paper)"],
  emerald: ["var(--paper)", "var(--emerald)", "var(--sand)"],
  linen: ["var(--paper)", "var(--linen)", "var(--mint)"],
};

/**
 * Stand-in for MakeLine-style motion-blur photography until real imagery and
 * product videos arrive: soft horizontal streaks over a tonal field.
 */
export function MotionVisual({
  tone = "mint",
  label,
  className,
  seed = 0,
}: {
  tone?: Tone;
  label?: string;
  className?: string;
  seed?: number;
}) {
  const [bg, streak, glow] = tones[tone];
  const streaks = [0, 1, 2, 3, 4].map((i) => {
    const s = (seed * 7 + i * 13) % 17;
    return {
      top: 12 + i * 17 + (s % 5),
      left: -10 + (s % 30),
      width: 55 + (s % 40),
      opacity: 0.35 + (s % 4) * 0.12,
    };
  });

  return (
    <div
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn("relative isolate overflow-hidden rounded-xs", className)}
      style={{ background: bg }}
    >
      <div
        className="absolute -inset-1/4"
        style={{
          background: `radial-gradient(60% 50% at ${30 + (seed % 4) * 12}% 45%, ${glow}, transparent 70%)`,
        }}
      />
      {streaks.map((s, i) => (
        <div
          key={i}
          className="absolute h-[9%] rounded-full blur-xl"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.width}%`,
            background: streak,
            opacity: s.opacity,
          }}
        />
      ))}
      <div
        className="absolute inset-0 opacity-[0.18] mix-blend-multiply"
        style={{
          backgroundImage:
            "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
    </div>
  );
}

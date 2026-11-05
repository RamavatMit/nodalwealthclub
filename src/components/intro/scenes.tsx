import type { CSSProperties, ReactNode } from "react";
import { LogoArt } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

/**
 * The nine scenes of the project intro. Everything animates with CSS
 * keyframes (globals.css, "sr-*") so the whole film can be paused with one
 * class. Delays are seconds from the moment the scene mounts.
 */

const OUT = "cubic-bezier(0.25, 1, 0.5, 1)";
const IN_OUT = "cubic-bezier(0.65, 0, 0.35, 1)";

/** Inline animation shorthand. */
export function a(name: string, dur: number, delay = 0, ease = OUT, rest = "both"): CSSProperties {
  return { animation: `${name} ${dur}s ${ease} ${delay}s ${rest}` };
}

/** Headline words rising from a mask. `*word*` = italic accent. */
function Rise({ text, delay = 0, className }: { text: string; delay?: number; className?: string }) {
  return (
    <p className={cn("display", className)} aria-label={text.replaceAll("*", "")}>
      {text.split(" ").map((w, i) => {
        const m = w.match(/^\*(.+)\*(.*)$/);
        return (
          <span key={i} aria-hidden>
            {i > 0 && " "}
            <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
              <span className="inline-block" style={a("sr-rise", 0.8, delay + i * 0.07)}>
                {m ? (
                  <>
                    <em className="text-forest">{m[1]}</em>
                    {m[2]}
                  </>
                ) : (
                  w
                )}
              </span>
            </span>
          </span>
        );
      })}
    </p>
  );
}

function Eyebrow({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <p className="eyebrow mb-5 flex items-center justify-center gap-3" style={a("sr-fade", 0.6, delay)}>
      <span aria-hidden className="bg-ink-muted/50 inline-block h-px w-8" />
      {children}
      <span aria-hidden className="bg-ink-muted/50 inline-block h-px w-8" />
    </p>
  );
}

const TITLE = "text-[clamp(2.2rem,1.2rem+4vw,4.6rem)] leading-[1.05] tracking-[-0.02em] text-center";

/** The Nodal mark, building itself node by node (globals.css, .logo-animate). */
function DrawnMark({ delay = 0, size = 96 }: { delay?: number; size?: number }) {
  return <LogoArt size={size} animated delay={delay} />;
}

/* 1 ─ Opening ─────────────────────────────────────────────────────────── */
export function SceneOpening() {
  const word = "Nodal Wealth Club";
  return (
    <div className="flex flex-col items-center gap-8">
      <DrawnMark delay={0.2} size={110} />
      <p
        className="display text-[clamp(2.6rem,1.4rem+5vw,5.5rem)] leading-none tracking-[-0.02em]"
        aria-label={word}
      >
        {word.split("").map((c, i) => (
          <span key={i} aria-hidden className="inline-block overflow-hidden align-bottom">
            <span className="inline-block" style={a("sr-rise", 0.7, 1.1 + i * 0.035)}>
              {c === " " ? " " : c}
            </span>
          </span>
        ))}
      </p>
      <span
        aria-hidden
        className="bg-forest block h-px w-40 origin-center"
        style={a("sr-grow-x", 0.9, 1.8, IN_OUT)}
      />
      <p className="eyebrow" style={a("sr-fade", 0.8, 2.3)}>
        Financial-future literacy for India
      </p>
    </div>
  );
}

/* 2 ─ The shift ───────────────────────────────────────────────────────── */
const ERAS = [
  ["⇄", "Barter"],
  ["◎", "Coins"],
  ["₹", "Notes"],
  ["⚡", "UPI"],
  ["e₹", "Digital ₹"],
  ["◆", "Tokens"],
  ["⌘", "Agents"],
] as const;

export function SceneShift() {
  const start = 1.4;
  const step = 0.45;
  return (
    <div className="flex w-full max-w-5xl flex-col items-center gap-16">
      <Rise text="Money keeps *changing* shape." className={TITLE} delay={0.2} />
      <div className="relative w-full px-4">
        <span aria-hidden className="bg-line absolute top-6 right-8 left-8 h-px" />
        <span
          aria-hidden
          className="bg-forest absolute top-6 right-8 left-8 h-px origin-left"
          style={a("sr-grow-x", ERAS.length * step, start, "linear")}
        />
        <ol className="relative flex justify-between">
          {ERAS.map(([g, label], i) => (
            <li
              key={label}
              className="flex w-12 flex-col items-center gap-3"
              style={a("sr-up", 0.5, 0.9 + i * 0.08)}
            >
              <span
                className="border-line bg-paper text-forest grid size-12 place-items-center rounded-xs border font-mono text-sm"
                style={a("sr-light", 0.35, start + i * step, OUT, "forwards")}
              >
                {g}
              </span>
              <span className="text-ink-muted font-mono text-[0.62rem] tracking-wider whitespace-nowrap uppercase">
                {label}
              </span>
            </li>
          ))}
        </ol>
      </div>
      <p className="text-ink-muted max-w-md text-center" style={a("sr-up", 0.7, start + ERAS.length * step)}>
        The next change is already here. Most people are learning it from hype.
      </p>
    </div>
  );
}

/* 3 ─ The noise ───────────────────────────────────────────────────────── */
const NOISE = [
  { t: "100× guaranteed!", x: -38, y: -30, r: -6 },
  { t: "Send your seed phrase", x: 30, y: -34, r: 4 },
  { t: "VIP tips ₹999", x: -44, y: 4, r: 3 },
  { t: "Free airdrop — connect wallet", x: 26, y: 2, r: -3 },
  { t: "Double your money", x: -26, y: 30, r: 5 },
  { t: "Secret signal group", x: 36, y: 30, r: -5 },
  { t: "Can't lose!", x: -8, y: -42, r: 7 },
  { t: "“Recovery agent”", x: 4, y: 40, r: -4 },
  { t: "Last chance to buy", x: 44, y: -12, r: 2 },
];

export function SceneNoise() {
  const collapse = 3.5;
  return (
    <div className="relative grid size-full place-items-center">
      {NOISE.map((n, i) => (
        <span
          key={n.t}
          aria-hidden
          className="absolute top-1/2 left-1/2"
          style={{ transform: `translate(calc(-50% + ${n.x}vw), calc(-50% + ${n.y}vh))` }}
        >
          <span
            className="block"
            style={{
              ...({ "--cx": `${-n.x}vw`, "--cy": `${-n.y}vh` } as CSSProperties),
              ...a("sr-collapse", 0.6, collapse + i * 0.03, IN_OUT, "forwards"),
            }}
          >
            <span
              className="border-emerald/60 bg-paper text-ink-muted relative block rounded-xs border px-3 py-1.5 font-mono text-[0.7rem] whitespace-nowrap shadow-[0_10px_30px_-18px_rgb(31_36_33/0.5)] md:text-xs"
              style={{
                ...({
                  "--r": `${n.r}deg`,
                  "--dx": `${(i % 2 ? 1 : -1) * 14}px`,
                  "--dy": `${(i % 3) * 6 - 6}px`,
                } as CSSProperties),
                animation: `sr-pop 0.4s ${OUT} ${0.2 + i * 0.16}s both, sr-drift ${2.2 + (i % 3) * 0.4}s ease-in-out ${0.6 + i * 0.16}s infinite`,
              }}
            >
              {n.t}
              <span
                aria-hidden
                className="bg-forest absolute inset-x-1 top-1/2 h-px origin-left"
                style={a("sr-grow-x", 0.3, 2.4 + i * 0.09, IN_OUT)}
              />
            </span>
          </span>
        </span>
      ))}
      <div className="relative" style={a("sr-blur", 0.9, collapse + 0.45)}>
        <Rise text="Too much hype. Too little *truth*." className={TITLE} delay={collapse + 0.45} />
      </div>
    </div>
  );
}

/* 4 ─ The answer ──────────────────────────────────────────────────────── */
export function SceneAnswer() {
  return (
    <div className="flex flex-col items-center gap-10">
      <span className="relative grid size-28 place-items-center" aria-hidden>
        {[0, 1, 2].map((r) => (
          <span
            key={r}
            className="border-mint absolute inset-0 rounded-full border"
            style={{ ...a("sr-pop", 1.2, 0.2 + r * 0.25), transform: `scale(${1 + r * 0.45})` }}
          />
        ))}
        <span
          className="bg-forest block size-4 rounded-full"
          style={{ animation: `sr-pop 0.5s ${OUT} 0.1s both, sr-pulse 2.4s ease-in-out 0.8s infinite` }}
        />
      </span>
      <div className="max-w-4xl" style={a("sr-blur", 1, 0.8)}>
        <p className={cn("display", TITLE)}>
          So we built a <em className="text-forest">calm</em> place to learn the new money.
        </p>
      </div>
      <p
        className="text-ink-muted font-mono text-xs tracking-[0.18em] uppercase"
        style={a("sr-up", 0.7, 2.1)}
      >
        Plain language · Reviewed by people · Never a tip
      </p>
    </div>
  );
}

/* 5 ─ Three worlds ────────────────────────────────────────────────────── */
const WORLDS = [
  { name: "AI", line: "How intelligence is reshaping money and work.", accent: "var(--mint)" },
  { name: "Web3", line: "Ownership, wallets and the Digital Rupee — safely.", accent: "var(--emerald)" },
  { name: "Agents", line: "Software that acts for you, within your limits.", accent: "var(--jade)" },
];

function Orb({ accent, delay, kind }: { accent: string; delay: number; kind: number }) {
  return (
    <svg viewBox="0 0 120 120" className="size-32 md:size-40" aria-hidden style={a("sr-pop", 0.7, delay)}>
      <circle cx="60" cy="60" r="44" fill="var(--linen)" stroke="var(--line)" />
      <g style={{ transformOrigin: "60px 60px", ...a("sr-spin", 14, 0, "linear", "infinite") }}>
        {kind === 0 &&
          [0, 45, 90, 135].map((r) => (
            <ellipse
              key={r}
              cx="60"
              cy="60"
              rx="44"
              ry="16"
              fill="none"
              stroke={accent}
              transform={`rotate(${r} 60 60)`}
            />
          ))}
        {kind === 1 &&
          [-30, -15, 0, 15, 30].map((y) => (
            <ellipse
              key={y}
              cx="60"
              cy={60 + y}
              rx={Math.sqrt(44 ** 2 - y ** 2)}
              ry="5"
              fill="none"
              stroke={accent}
            />
          ))}
        {kind === 2 && (
          <>
            <ellipse
              cx="60"
              cy="60"
              rx="56"
              ry="14"
              fill="none"
              stroke={accent}
              strokeDasharray="3 4"
              transform="rotate(-18 60 60)"
            />
            <ellipse
              cx="60"
              cy="60"
              rx="52"
              ry="12"
              fill="none"
              stroke={accent}
              strokeDasharray="3 4"
              transform="rotate(24 60 60)"
            />
            <circle cx="114" cy="42" r="4" fill="var(--jade)" />
            <circle cx="12" cy="74" r="3" fill="var(--jade)" />
          </>
        )}
      </g>
      {[
        [40, 44],
        [72, 38],
        [60, 64],
        [44, 78],
        [80, 74],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.6" fill="var(--forest)" />
      ))}
    </svg>
  );
}

export function SceneWorlds() {
  return (
    <div className="flex w-full max-w-5xl flex-col items-center">
      <Eyebrow delay={0.1}>Three worlds</Eyebrow>
      <ul className="grid w-full gap-10 md:grid-cols-3 md:gap-6">
        {WORLDS.map((w, i) => {
          const d = 0.5 + i * 1.1;
          return (
            <li key={w.name} className="flex flex-col items-center text-center">
              <Orb accent={w.accent} delay={d} kind={i} />
              <Rise text={w.name} className="mt-6 text-5xl md:text-6xl" delay={d + 0.25} />
              <p className="text-ink-muted mt-3 max-w-[16rem]" style={a("sr-up", 0.6, d + 0.5)}>
                {w.line}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* 6 ─ How we work ─────────────────────────────────────────────────────── */
const STEPS = [
  ["Sources", "Primary sources gathered"],
  ["AI drafts", "Plain-language first draft"],
  ["A person checks", "Every claim verified"],
  ["Published", "Reviewer and date shown"],
] as const;

export function SceneProcess() {
  const start = 1.6;
  const step = 0.9;
  return (
    <div className="flex w-full max-w-5xl flex-col items-center gap-14">
      <Rise text="AI drafts. *People* decide." className={TITLE} delay={0.2} />
      <div className="relative w-full">
        <span aria-hidden className="bg-line absolute top-1/2 right-[12%] left-[12%] hidden h-px md:block" />
        <span
          aria-hidden
          className="bg-forest absolute top-1/2 right-[12%] left-[12%] hidden h-px origin-left md:block"
          style={a("sr-grow-x", step * 3, start, "linear")}
        />
        <ol className="relative grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
          {STEPS.map(([title, note], i) => (
            <li
              key={title}
              className="border-line bg-paper rounded-xs border p-4 md:p-5"
              style={{
                animation: `sr-up 0.55s ${OUT} ${0.8 + i * 0.12}s both, sr-light 0.4s ${OUT} ${start + i * step}s forwards`,
              }}
            >
              <p className="font-mono text-[0.65rem] tracking-wider uppercase opacity-70">
                {String(i + 1).padStart(2, "0")} · {i === 1 ? "AI" : i === 2 ? "Human" : "Step"}
              </p>
              <p className="display mt-2 text-xl md:text-2xl">{title}</p>
              <p className="mt-1 text-sm opacity-80">{note}</p>
            </li>
          ))}
        </ol>
      </div>
      <p className="text-ink-muted text-center" style={a("sr-up", 0.6, start + step * 3 + 0.4)}>
        Every page shows who reviewed it, and when.
      </p>
    </div>
  );
}

/* 7 ─ The club ────────────────────────────────────────────────────────── */
export function SceneClub() {
  const tiles = [
    { k: "₹10,00,000", v: "Virtual money in the paper-trading arena", wide: true },
    { k: "5 rooms", v: "#general  #ai  #web3  #agents  #help" },
    { k: "Paths", v: "Lessons that build on each other", bar: true },
    { k: "1 product", v: "Free with membership" },
  ];
  return (
    <div className="flex w-full max-w-4xl flex-col items-center gap-12">
      <Rise text="One club. Everything you need to *grow*." className={TITLE} delay={0.2} />
      <ul className="grid w-full grid-cols-2 gap-3 md:grid-cols-4">
        {tiles.map((t, i) => (
          <li
            key={t.k}
            className={cn("border-line bg-paper rounded-xs border p-5", t.wide && "col-span-2")}
            style={a("sr-pop", 0.6, 1 + i * 0.28)}
          >
            <p className="font-mono text-2xl md:text-3xl">{t.k}</p>
            <p className="text-ink-muted mt-2 text-sm">{t.v}</p>
            {t.bar && (
              <span className="bg-line mt-4 block h-1 overflow-hidden rounded-xs">
                <span className="bg-forest block h-full w-3/4 origin-left" style={a("sr-grow-x", 1.4, 2.2)} />
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* 8 ─ Promises ────────────────────────────────────────────────────────── */
const PROMISES = [
  ["Education only", "No buy/sell calls, no price targets, no return promises."],
  ["Read-only wallets", "We never ask for a seed phrase or a transaction signature."],
  ["Rupees only", "Membership in INR through an RBI-authorised gateway."],
  ["Your data, your call", "Export or delete it any time, under the DPDP Act."],
] as const;

export function ScenePromises() {
  return (
    <div className="flex w-full max-w-3xl flex-col items-center">
      <Eyebrow delay={0.1}>Our promises</Eyebrow>
      <ul className="divide-line border-line w-full divide-y border-y">
        {PROMISES.map(([t, b], i) => {
          const d = 0.5 + i * 0.75;
          return (
            <li key={t} className="flex items-start gap-5 py-5" style={a("sr-up", 0.5, d)}>
              <svg width="30" height="30" viewBox="0 0 28 28" className="text-jade mt-1 shrink-0" aria-hidden>
                <rect
                  x="1"
                  y="1"
                  width="26"
                  height="26"
                  rx="3"
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray="110"
                  strokeDashoffset="110"
                  style={a("sr-draw", 0.6, d + 0.1, IN_OUT, "forwards")}
                />
                <path
                  d="M8 14.5l4 4 8-9"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="24"
                  strokeDashoffset="24"
                  style={a("sr-draw", 0.4, d + 0.55, OUT, "forwards")}
                />
              </svg>
              <div>
                <p className="display text-2xl md:text-3xl">{t}</p>
                <p className="text-ink-muted mt-1">{b}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* 9 ─ Finale ──────────────────────────────────────────────────────────── */
export function SceneFinale({ actions }: { actions: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <DrawnMark delay={0.1} size={84} />
      <Rise
        text="Understand the new money *before* it arrives."
        className={cn(TITLE, "max-w-4xl")}
        delay={0.9}
      />
      <div style={a("sr-up", 0.7, 2)}>{actions}</div>
      <p className="text-ink-muted max-w-xl text-xs" style={a("sr-fade", 0.8, 2.6)}>
        Education only, not investment advice. Nodal Wealth Club is not a SEBI-registered adviser.
      </p>
    </div>
  );
}

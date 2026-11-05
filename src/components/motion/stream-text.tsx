"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { introDelay } from "./intro";

/**
 * Text that streams in word by word with a blinking caret, the way an AI
 * answer arrives. Screen readers get the whole sentence at once. Uses opacity
 * only, so it still plays (gently) for reduced-motion users.
 */
export function StreamText({
  text,
  className,
  delay = 0,
  /** Seconds per word. */
  speed = 0.035,
  as = "p",
  afterIntro = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  as?: "p" | "span";
  /** Wait for the first-visit intro to finish. */
  afterIntro?: boolean;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const words = text.split(" ");
  const start = delay + (afterIntro ? introDelay() : 0);
  const Tag = motion[as];
  // Caret: solid while words stream, then three blinks and gone.
  const streamFor = words.length * speed + 0.35;
  const caretFor = streamFor + 1.6;
  const f = streamFor / caretFor;
  const blink = (k: number) => f + (1 - f) * k;

  return (
    <Tag ref={ref} className={cn("relative", className)} aria-label={text}>
      {words.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          aria-hidden
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={inView ? { opacity: 1, filter: "blur(0px)" } : undefined}
          transition={{ duration: 0.35, delay: start + i * speed, ease: "easeOut" }}
        >
          {w}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
      <motion.span
        aria-hidden
        className="bg-forest ml-0.5 inline-block h-[1.05em] w-[0.45em] translate-y-[0.18em]"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: [0, 1, 1, 0, 1, 0, 1, 0] } : undefined}
        transition={{
          delay: start,
          duration: caretFor,
          ease: "linear",
          times: [0, 0.02, f, blink(0.2), blink(0.4), blink(0.6), blink(0.8), 1],
        }}
      />
    </Tag>
  );
}

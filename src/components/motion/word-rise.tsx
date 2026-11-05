"use client";

import { motion, useInView } from "motion/react";
import { Fragment, useRef } from "react";
import { cn } from "@/lib/utils";
import { introDelay } from "./intro";

type Props = {
  /** Headline text. Wrap the single italic accent word in *asterisks*. */
  text: string;
  as?: "h1" | "h2" | "p";
  className?: string;
  delay?: number;
  /** Wait for the first-visit intro to finish before rising. */
  afterIntro?: boolean;
};

/**
 * Headline words rise one by one from behind a mask.
 * The full sentence stays in the accessible name; the split spans are hidden
 * from assistive tech.
 */
export function WordRise({ text, as = "h1", className, delay = 0, afterIntro = false }: Props) {
  const start = delay + (afterIntro ? introDelay() : 0);
  const Tag = motion[as];
  // Observe the whole heading: each word starts clipped by its mask, so an
  // observer on the word itself would never report it as visible.
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const words = text.split(" ");
  const plain = text.replaceAll("*", "");

  return (
    <Tag ref={ref} className={cn("display", className)} aria-label={plain}>
      {words.map((word, i) => {
        // "*word*" or "*word*," — italic accent word, punctuation stays upright.
        const m = word.match(/^\*(.+)\*([^*]*)$/);
        const content = m ? (
          <>
            <em>{m[1]}</em>
            {m[2]}
          </>
        ) : (
          word
        );
        return (
          <Fragment key={`${word}-${i}`}>
            <span aria-hidden className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
              <motion.span
                className="inline-block will-change-transform"
                initial={{ y: "110%" }}
                animate={inView ? { y: "0%" } : undefined}
                transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1], delay: start + i * 0.06 }}
              >
                {content}
              </motion.span>
            </span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        );
      })}
    </Tag>
  );
}

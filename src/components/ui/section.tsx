import type { ReactNode } from "react";
import { DecodeText } from "@/components/motion/decode-text";
import { WordRise } from "@/components/motion/word-rise";
import { cn } from "@/lib/utils";

/** A framed band of the page: thin grid rules left/right, a top rule, gutters. */
export function Section({
  children,
  className,
  innerClassName,
  tone = "ivory",
  id,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  tone?: "ivory" | "paper" | "sand" | "linen";
  id?: string;
  "aria-labelledby"?: string;
}) {
  const bg = { ivory: "bg-ivory", paper: "bg-paper", sand: "bg-sand", linen: "bg-linen" }[tone];
  return (
    <section id={id} className={cn("border-line border-t", bg, className)} {...rest}>
      <div className={cn("frame gutter py-20 md:py-28", innerClassName)}>{children}</div>
    </section>
  );
}

/** Eyebrow + serif title (one *italic* word) + optional lede. */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  id,
  className,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  lede?: ReactNode;
  id?: string;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <header className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className="eyebrow mb-5 flex items-center gap-3">
          <span aria-hidden className="bg-ink-muted/50 inline-block h-px w-8" />
          <DecodeText text={eyebrow} />
        </p>
      )}
      <div id={id}>
        <WordRise as="h2" text={title} className="text-section" />
      </div>
      {lede && <p className="text-ink-muted mt-5 max-w-2xl">{lede}</p>}
    </header>
  );
}

import type { ComponentProps, ReactNode } from "react";
import { TransitionLink } from "@/components/motion/transition-link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-xs px-5 py-3 text-[0.95rem] font-medium transition-[background-color,color,border-color] duration-300 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-forest text-paper hover:bg-ink",
  outline: "border border-ink/25 text-ink hover:border-forest hover:bg-sand/60",
  ghost: "text-ink underline-offset-4 hover:underline px-0 py-1",
};

function Arrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      aria-hidden
      className="transition-transform duration-300 group-hover:translate-x-0.5"
    >
      <path d="M1 7h11M8 3l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function buttonClass(variant: Variant = "primary", className?: string) {
  return cn(base, variants[variant], className);
}

export function ButtonLink({
  href,
  variant = "primary",
  arrow = true,
  className,
  children,
  ...rest
}: Omit<ComponentProps<typeof TransitionLink>, "children"> & {
  variant?: Variant;
  arrow?: boolean;
  children: ReactNode;
}) {
  return (
    <TransitionLink href={href} className={buttonClass(variant, className)} {...rest}>
      {children}
      {arrow && <Arrow />}
    </TransitionLink>
  );
}

export function Button({
  variant = "primary",
  className,
  children,
  ...rest
}: ComponentProps<"button"> & { variant?: Variant }) {
  return (
    <button className={buttonClass(variant, className)} {...rest}>
      {children}
    </button>
  );
}

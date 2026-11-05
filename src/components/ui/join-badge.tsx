import { TransitionLink } from "@/components/motion/transition-link";
import { cn } from "@/lib/utils";

/**
 * MakeLine-style circular call-to-action. The only round element in the
 * design system: rotating ring text around an arrow.
 */
export function JoinBadge({
  href = "/membership",
  label = "Join the Club",
  className,
}: {
  href?: string;
  label?: string;
  className?: string;
}) {
  const ring = `${label} · ${label} · `;
  return (
    <TransitionLink
      href={href}
      aria-label={label}
      data-magnetic="14"
      className={cn(
        "group bg-forest text-paper relative grid size-32 shrink-0 place-items-center rounded-full transition-transform duration-500 hover:scale-[1.04] md:size-36",
        className,
      )}
    >
      <svg viewBox="0 0 100 100" aria-hidden className="animate-spin-slow absolute inset-0 size-full p-1.5">
        <defs>
          <path id="join-ring" d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" />
        </defs>
        <text className="fill-current font-mono text-[8.6px] tracking-[0.18em] uppercase">
          <textPath href="#join-ring">{ring}</textPath>
        </text>
      </svg>
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        aria-hidden
        className="transition-transform duration-500 group-hover:rotate-45"
      >
        <path d="M5 17 17 5M8 5h9v9" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    </TransitionLink>
  );
}

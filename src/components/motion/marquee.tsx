import { cn } from "@/lib/utils";

type Props = {
  items: string[];
  className?: string;
  /** Seconds per loop. */
  duration?: number;
};

/** MakeLine-style marquee band. Pure CSS; pauses for reduced motion. */
export function Marquee({ items, className, duration = 32 }: Props) {
  const row = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className="flex items-center">
          <span className="px-6 md:px-10">{item}</span>
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden className="text-emerald">
            <circle cx="7" cy="7" r="3" fill="currentColor" />
            <circle cx="7" cy="7" r="6.25" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={cn("relative flex overflow-hidden whitespace-nowrap select-none", className)}
      style={{ ["--marquee-duration" as string]: `${duration}s` }}
    >
      <div className="animate-marquee flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

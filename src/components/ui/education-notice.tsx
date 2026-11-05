import { cn } from "@/lib/utils";

/**
 * Required on every AI-trading, Web3 and club page (compliance rule 1).
 * Keep the wording in sync with messages/en.json footer.disclaimer.
 */
export function EducationNotice({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <aside
      role="note"
      aria-label="Education only disclaimer"
      className={cn(
        "border-emerald/40 bg-paper text-ink-muted flex gap-3 rounded-xs border p-4 text-sm",
        className,
      )}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden className="text-emerald mt-0.5 shrink-0">
        <circle cx="9" cy="9" r="8" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <path d="M9 5v5M9 12.5v.5" stroke="currentColor" strokeWidth="1.6" />
      </svg>
      <p>
        <strong className="text-ink font-medium">Education only, not investment advice.</strong>{" "}
        {compact
          ? "We never give buy/sell calls, price targets or return promises."
          : "We teach how things work. We never give buy/sell calls, price targets, token or stock recommendations, or promises of returns. Crypto assets are unregulated in India and can lose all value."}
      </p>
    </aside>
  );
}

/** Marks copy that the client still has to supply. Visible on purpose. */
export function Placeholder({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "border-emerald/60 bg-emerald/10 text-forest inline-block rounded-xs border border-dashed px-1.5 py-px font-mono text-[0.7rem] tracking-wide uppercase",
        className,
      )}
    >
      {children ?? "Placeholder"}
    </span>
  );
}

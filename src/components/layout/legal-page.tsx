import type { ReactNode } from "react";
import { TransitionLink } from "@/components/motion/transition-link";
import { Placeholder } from "@/components/ui/education-notice";

const LEGAL_NAV = [
  { href: "/legal/privacy", label: "Privacy notice" },
  { href: "/legal/terms", label: "Terms of use" },
  { href: "/legal/disclaimer", label: "Disclaimer" },
  { href: "/legal/refunds", label: "Refunds and cancellation" },
];

/** Shared layout for the legal pages: sticky index on the left, prose on the right. */
export function LegalPage({
  title,
  updated,
  current,
  children,
}: {
  title: string;
  updated: string;
  current: string;
  children: ReactNode;
}) {
  return (
    <div className="frame gutter grid gap-12 py-16 md:py-24 lg:grid-cols-12">
      <aside className="lg:col-span-3">
        <nav aria-label="Legal" className="lg:sticky lg:top-28">
          <p className="eyebrow mb-4">Legal</p>
          <ul className="space-y-2 text-[0.95rem]">
            {LEGAL_NAV.map((l) => (
              <li key={l.href}>
                <TransitionLink
                  href={l.href}
                  aria-current={l.href === current ? "page" : undefined}
                  className={l.href === current ? "text-forest font-medium" : "text-ink-muted hover:text-ink"}
                >
                  {l.label}
                </TransitionLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <article className="lg:col-span-8 lg:col-start-5">
        <h1 className="display text-section">{title}</h1>
        <p className="text-ink-muted mt-4 flex flex-wrap items-center gap-3 font-mono text-xs">
          Last updated {updated}
          <Placeholder>Draft — needs legal review before launch</Placeholder>
        </p>
        <div className="legal-prose mt-10">{children}</div>
      </article>
    </div>
  );
}

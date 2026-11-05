import type { ReactNode } from "react";
import { NodeNetwork, Reveal, StreamText, WordRise } from "@/components/motion";
import { EducationNotice } from "@/components/ui/education-notice";
import { SectionHeading } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { SectionNav } from "./section-nav";

export type HubSection = {
  id: string;
  /** Short label for the section menu. */
  label: string;
  eyebrow: string;
  /** Section title; `*word*` = italic accent. */
  title: string;
  lede: string;
  children: ReactNode;
  tone?: "ivory" | "paper";
};

/**
 * A knowledge hub (AI or Web3): hero, sticky section menu, then each section
 * with its cards, news or lessons, one after another.
 */
export function KnowledgeHub({
  eyebrow,
  title,
  lede,
  sections,
  notice = true,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  sections: HubSection[];
  notice?: boolean;
}) {
  return (
    <>
      <section className="border-line border-b">
        <div className="frame grid lg:grid-cols-12">
          <div className="gutter py-16 md:py-24 lg:col-span-8">
            <p className="eyebrow mb-6">{eyebrow}</p>
            <WordRise text={title} className="text-hero" />
            <StreamText text={lede} className="text-ink-muted mt-8 max-w-xl text-lg" delay={0.45} />
            <Reveal delay={0.9}>
              <ul className="mt-8 flex flex-wrap gap-2" aria-label="Sections">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="border-line bg-paper hover:border-forest flex items-center gap-2 rounded-xs border px-3 py-1.5 text-sm transition-colors"
                    >
                      <span className="text-forest font-mono text-[0.65rem]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div className="border-line relative hidden min-h-80 border-l lg:col-span-4 lg:block">
            <NodeNetwork className="absolute inset-0" />
          </div>
        </div>
      </section>

      <SectionNav items={sections.map((s) => ({ id: s.id, label: s.label }))} />

      {sections.map((s, i) => (
        <section
          key={s.id}
          id={s.id}
          aria-labelledby={`${s.id}-title`}
          className={cn(
            "border-line scroll-mt-32 border-t",
            (s.tone ?? (i % 2 ? "ivory" : "paper")) === "paper" ? "bg-paper" : "bg-ivory",
          )}
        >
          <div className="frame gutter py-16 md:py-24">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                id={`${s.id}-title`}
                eyebrow={`${String(i + 1).padStart(2, "0")} · ${s.eyebrow}`}
                title={s.title}
                lede={s.lede}
              />
            </div>
            <div className="mt-12">{s.children}</div>
          </div>
        </section>
      ))}

      {notice && (
        <div className="border-line bg-paper border-t">
          <div className="frame gutter py-10">
            <EducationNotice />
          </div>
        </div>
      )}
    </>
  );
}

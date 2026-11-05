import { ViewTransition } from "react";
import { Reveal, ScanReveal, StreamText, TransitionLink, WordRise } from "@/components/motion";
import { ButtonLink } from "@/components/ui/button";
import { EducationNotice, Placeholder } from "@/components/ui/education-notice";
import { MotionVisual } from "@/components/ui/motion-visual";
import { SECTION_LABEL, topicsByHub, type Topic } from "@/content/topics";
import { CARD_MORPH_SHARE, cardMorphName } from "@/lib/vt-name";
import { TaxCalculator } from "./tax-calculator";

const HUB_LABEL = { ai: "AI hub", web3: "Web3 hub" } as const;

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Detail page for one AI or Web3 topic. Content builds in as you scroll. */
export function TopicPage({ topic }: { topic: Topic }) {
  const siblings = topicsByHub[topic.hub];
  const index = siblings.findIndex((t) => t.slug === topic.slug);
  const prev = siblings[index - 1];
  const next = siblings[index + 1];
  const hubHref = `/${topic.hub}`;
  const inSection = siblings.filter((t) => t.section === topic.section);
  const sectionIndex = inSection.findIndex((t) => t.slug === topic.slug);

  return (
    <article>
      {/* Hero */}
      {/* Same name as the hub card: the card grows into this hero. */}
      <ViewTransition
        name={cardMorphName(`${hubHref}/${topic.slug}`)}
        share={CARD_MORPH_SHARE}
        default="none"
      >
        <header className="border-line bg-paper border-b">
          <div className="frame gutter pt-10 pb-16 md:pt-14 md:pb-24">
            <TransitionLink
              href={`${hubHref}#${topic.slug}`}
              direction="close"
              className="text-ink-muted hover:text-ink inline-flex items-center gap-2 text-sm"
            >
              <span aria-hidden>←</span> {HUB_LABEL[topic.hub]}
            </TransitionLink>
            <p className="eyebrow mt-12 mb-6">
              {SECTION_LABEL[topic.section]} · {String(sectionIndex + 1).padStart(2, "0")} · {topic.minutes}{" "}
              min read
            </p>
            <WordRise text={topic.title} className="text-hero max-w-4xl" />
            <StreamText
              text={topic.lede}
              className="text-ink-muted mt-8 max-w-2xl text-lg md:text-xl"
              delay={0.4}
            />
            <Reveal delay={0.9}>
              <p className="text-ink-muted mt-6 flex flex-wrap items-center gap-3 font-mono text-xs">
                Last reviewed 9 October 2026 <Placeholder>Reviewer name</Placeholder>
              </p>
            </Reveal>
          </div>
          <ScanReveal className="frame" delay={0.3}>
            <MotionVisual tone={topic.tone} seed={index + 2} className="h-48 rounded-none md:h-72" />
          </ScanReveal>
        </header>
      </ViewTransition>

      {/* Body */}
      <div className="frame gutter grid gap-12 py-16 md:py-24 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <nav aria-label="On this page" className="lg:sticky lg:top-28">
            <p className="eyebrow mb-4">On this page</p>
            <ol className="space-y-2 text-[0.95rem]">
              {topic.sections.map((s, i) => (
                <li key={s.heading}>
                  <a href={`#${slugify(s.heading)}`} className="text-ink-muted hover:text-ink flex gap-3">
                    <span className="font-mono text-xs leading-6">{String(i + 1).padStart(2, "0")}</span>
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <div className="lg:col-span-8 lg:col-start-5">
          {topic.sensitive && <EducationNotice className="mb-12" />}

          <div className="space-y-14">
            {topic.sections.map((s) => (
              <Reveal key={s.heading}>
                <section id={slugify(s.heading)} className="scroll-mt-28">
                  <h2 className="display text-3xl md:text-4xl">{s.heading}</h2>
                  <p className="text-ink-muted mt-4 max-w-2xl text-lg">{s.body}</p>
                  {s.points && (
                    <ul className="mt-6 max-w-2xl space-y-3">
                      {s.points.map((p) => (
                        <li key={p} className="flex gap-3">
                          <span
                            aria-hidden
                            className="border-forest bg-paper mt-2 size-2.5 shrink-0 rounded-full border"
                          />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              </Reveal>
            ))}
          </div>

          {topic.widget === "tax-calculator" && (
            <Reveal className="mt-16">
              <TaxCalculator />
            </Reveal>
          )}

          <Reveal className="mt-16">
            <section aria-labelledby="takeaways" className="bg-sand rounded-xs p-6 md:p-10">
              <h2 id="takeaways" className="eyebrow">
                Key takeaways
              </h2>
              <ol className="mt-6 space-y-4">
                {topic.takeaways.map((t, i) => (
                  <li key={t} className="flex gap-4">
                    <span className="text-forest font-mono text-sm leading-7">{i + 1}</span>
                    <span className="display text-2xl leading-snug">{t}</span>
                  </li>
                ))}
              </ol>
            </section>
          </Reveal>

          <Reveal className="mt-10">
            <section aria-labelledby="coming-next" className="border-line rounded-xs border p-6 md:p-8">
              <h2 id="coming-next" className="font-medium">
                In the full lessons <span className="text-ink-muted font-normal">· opening in Phase 2</span>
              </h2>
              <ul className="text-ink-muted mt-3 flex flex-wrap gap-2 text-sm">
                {topic.comingNext.map((c) => (
                  <li key={c} className="border-line bg-paper rounded-xs border px-3 py-1.5">
                    {c}
                  </li>
                ))}
              </ul>
              <ButtonLink href="/membership" variant="ghost" className="mt-4 text-sm">
                Members get every lesson
              </ButtonLink>
            </section>
          </Reveal>
        </div>
      </div>

      {/* Previous / next */}
      <nav aria-label="More topics" className="border-line bg-paper border-t">
        <div className="frame grid sm:grid-cols-2">
          {[prev, next].map((t, i) =>
            t ? (
              <TransitionLink
                key={t.slug}
                href={`/${t.hub}/${t.slug}`}
                direction={i === 0 ? "back" : "forward"}
                className={`group hover:bg-ivory gutter flex flex-col gap-2 py-10 transition-colors ${
                  i === 1 ? "sm:border-line sm:border-l sm:text-right" : ""
                }`}
              >
                <span className="eyebrow">{i === 0 ? "← Previous" : "Next →"}</span>
                <span className="display group-hover:text-forest text-3xl">{t.name}</span>
              </TransitionLink>
            ) : (
              <TransitionLink
                key={`hub-${i}`}
                href={hubHref}
                direction="down"
                className={`group hover:bg-ivory gutter flex flex-col gap-2 py-10 transition-colors ${
                  i === 1 ? "sm:border-line sm:border-l sm:text-right" : ""
                }`}
              >
                <span className="eyebrow">Back to</span>
                <span className="display group-hover:text-forest text-3xl">{HUB_LABEL[topic.hub]}</span>
              </TransitionLink>
            ),
          )}
        </div>
      </nav>
    </article>
  );
}

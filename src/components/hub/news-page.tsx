import { ViewTransition } from "react";
import { Reveal, ScanReveal, StreamText, TransitionLink, WordRise } from "@/components/motion";
import { EducationNotice, Placeholder } from "@/components/ui/education-notice";
import { MotionVisual } from "@/components/ui/motion-visual";
import { newsFor, type NewsItem } from "@/content/news";
import { CARD_MORPH_SHARE, cardMorphName } from "@/lib/vt-name";
import { formatNewsDate, NewsGrid } from "./cards";

const HUB_LABEL = { ai: "AI news", web3: "Web3 news" } as const;

/** Full news story, opened from a news card. */
export function NewsPage({ item }: { item: NewsItem }) {
  const hubHref = `/${item.hub}`;
  const more = newsFor(item.hub)
    .filter((n) => n.slug !== item.slug)
    .slice(0, 3);

  return (
    <article>
      <ViewTransition
        name={cardMorphName(`${hubHref}/news/${item.slug}`)}
        share={CARD_MORPH_SHARE}
        default="none"
      >
        <header className="border-line bg-paper border-b">
          <div className="frame gutter pt-10 pb-14 md:pt-14 md:pb-20">
            <TransitionLink
              href={`${hubHref}#news-${item.slug}`}
              direction="close"
              className="text-ink-muted hover:text-ink inline-flex items-center gap-2 text-sm"
            >
              <span aria-hidden>←</span> {HUB_LABEL[item.hub]}
            </TransitionLink>
            <p className="mt-10 mb-6 flex flex-wrap items-center gap-3">
              <span className="text-forest flex items-center gap-2 font-mono text-xs tracking-wider uppercase">
                <span aria-hidden className="bg-emerald size-1.5 rounded-full" />
                {item.category}
              </span>
              <time dateTime={item.date} className="text-ink-muted font-mono text-xs">
                {formatNewsDate(item.date)} · {item.minutes} min read
              </time>
              {item.sample && <Placeholder>Sample story — replaced by the daily feed</Placeholder>}
            </p>
            <WordRise
              text={item.title}
              className="max-w-4xl text-[clamp(2.2rem,1.4rem+3.4vw,4rem)] leading-[1.05]"
            />
            <StreamText
              text={item.summary}
              className="text-ink-muted mt-6 max-w-2xl text-lg md:text-xl"
              delay={0.4}
            />
          </div>
          <ScanReveal className="frame" delay={0.3}>
            <MotionVisual tone={item.tone} seed={item.slug.length} className="h-40 rounded-none md:h-60" />
          </ScanReveal>
        </header>
      </ViewTransition>

      <div className="frame gutter grid gap-12 py-14 md:py-20 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="space-y-6 text-lg leading-relaxed">
            {item.body.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12">
            <section
              aria-labelledby="why"
              className="border-forest/30 bg-forest/5 rounded-xs border p-6 md:p-8"
            >
              <h2 id="why" className="eyebrow text-forest">
                Why it matters for you
              </h2>
              <p className="display mt-4 text-2xl leading-snug md:text-3xl">{item.whyItMatters}</p>
            </section>
          </Reveal>

          <div className="text-ink-muted mt-8 flex flex-wrap items-center gap-3 text-sm">
            {item.source ? (
              <>
                Source:{" "}
                <a
                  href={item.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-forest underline"
                >
                  {item.source.name}
                </a>
              </>
            ) : (
              <>
                Source: <Placeholder>Linked on real stories</Placeholder>
              </>
            )}
            <span aria-hidden>·</span> Reviewed by a person before publishing
          </div>

          <EducationNotice className="mt-10" compact />
        </div>
      </div>

      {more.length > 0 && (
        <section aria-labelledby="more-news" className="border-line bg-paper border-t">
          <div className="frame gutter py-14 md:py-20">
            <h2 id="more-news" className="eyebrow mb-8">
              More {HUB_LABEL[item.hub]}
            </h2>
            <NewsGrid items={more} />
          </div>
        </section>
      )}
    </article>
  );
}

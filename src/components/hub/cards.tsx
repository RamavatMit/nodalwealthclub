import { ViewTransition } from "react";
import { Reveal, TransitionLink } from "@/components/motion";
import { Placeholder } from "@/components/ui/education-notice";
import { MotionVisual } from "@/components/ui/motion-visual";
import type { NewsItem } from "@/content/news";
import type { Topic } from "@/content/topics";
import { CARD_MORPH_SHARE, cardMorphName } from "@/lib/vt-name";

/** Blog-style article cards, one after another; each opens its own page. */
export function ArticleGrid({ topics }: { topics: Topic[] }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {topics.map((t, i) => {
        const href = `/${t.hub}/${t.slug}`;
        return (
          <Reveal as="li" key={t.slug} id={t.slug} delay={(i % 3) * 0.08} className="scroll-mt-36">
            <ViewTransition name={cardMorphName(href)} share={CARD_MORPH_SHARE} default="none">
              <TransitionLink
                href={href}
                direction="open"
                data-spotlight
                data-tilt="5"
                className="group border-line bg-paper hover:border-forest/50 flex h-full flex-col overflow-hidden rounded-xs border transition-[border-color,scale] duration-300 active:scale-[0.985]"
              >
                <div className="relative overflow-hidden">
                  <MotionVisual
                    tone={t.tone}
                    seed={i + t.slug.length}
                    className="ease-out-quart aspect-[16/8] rounded-none transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <span className="bg-paper/90 absolute top-3 left-3 rounded-xs px-2 py-1 font-mono text-[0.62rem] tracking-wider uppercase">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <p className="text-ink-muted font-mono text-[0.65rem] tracking-wider uppercase">
                    {t.minutes} min read{t.sensitive ? " · Education only" : ""}
                  </p>
                  <h3 className="display group-hover:text-forest mt-2 text-2xl leading-snug transition-colors">
                    {t.name}
                  </h3>
                  <p className="text-ink-muted mt-2 text-[0.95rem]">{t.summary}</p>
                  <span className="text-forest mt-auto flex items-center gap-2 pt-5 text-sm font-medium">
                    Read article
                    <span
                      aria-hidden
                      className="ease-out-quart transition-transform duration-500 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </div>
              </TransitionLink>
            </ViewTransition>
          </Reveal>
        );
      })}
    </ul>
  );
}

export function formatNewsDate(iso: string) {
  return new Date(`${iso}T00:00:00+05:30`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

/** Daily news cards; each opens the full story. */
export function NewsGrid({ items }: { items: NewsItem[] }) {
  if (items.length === 0) {
    return <p className="text-ink-muted">News arrives here daily.</p>;
  }
  return (
    <ul className="grid gap-5 md:grid-cols-3">
      {items.map((n, i) => {
        const href = `/${n.hub}/news/${n.slug}`;
        return (
          <Reveal as="li" key={n.slug} id={`news-${n.slug}`} delay={(i % 3) * 0.08} className="scroll-mt-36">
            <ViewTransition name={cardMorphName(href)} share={CARD_MORPH_SHARE} default="none">
              <TransitionLink
                href={href}
                direction="open"
                data-tilt="5"
                className="group border-line bg-paper hover:border-forest/50 flex h-full flex-col rounded-xs border p-5 transition-[border-color,scale] duration-300 active:scale-[0.985] md:p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-forest flex items-center gap-2 font-mono text-[0.65rem] tracking-wider uppercase">
                    <span aria-hidden className="bg-emerald size-1.5 rounded-full" />
                    {n.category}
                  </span>
                  <time dateTime={n.date} className="text-ink-muted font-mono text-[0.65rem]">
                    {formatNewsDate(n.date)}
                  </time>
                </div>
                <h3 className="display group-hover:text-forest mt-4 text-2xl leading-snug transition-colors">
                  {n.title}
                </h3>
                <p className="text-ink-muted mt-2 text-[0.95rem]">{n.summary}</p>
                <div className="mt-auto flex items-center justify-between pt-5">
                  <span className="text-forest flex items-center gap-2 text-sm font-medium">
                    Read full story
                    <span
                      aria-hidden
                      className="ease-out-quart transition-transform duration-500 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                  {n.sample && <Placeholder>Sample</Placeholder>}
                </div>
              </TransitionLink>
            </ViewTransition>
          </Reveal>
        );
      })}
    </ul>
  );
}

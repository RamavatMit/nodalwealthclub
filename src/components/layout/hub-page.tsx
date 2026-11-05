import { ViewTransition, type ReactNode } from "react";
import { NodeNetwork, Reveal, StreamText, TransitionLink, WordRise } from "@/components/motion";
import { ButtonLink } from "@/components/ui/button";
import { EducationNotice } from "@/components/ui/education-notice";
import { CARD_MORPH_SHARE, cardMorphName } from "@/lib/vt-name";

export type HubCard = { title: string; body: string; href?: string; meta?: string };

/**
 * Hub page: hero plus a grid of cards. Cards with an `href` open their own
 * detail page with the rise-up transition.
 */
export function HubPage({
  eyebrow,
  title,
  lede,
  status,
  cards,
  cardsLabel = "Explore",
  notice = false,
  children,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  status: string;
  cards: HubCard[];
  cardsLabel?: string;
  notice?: boolean;
  children?: ReactNode;
}) {
  // Filler cells keep the grid lines complete when the last row isn't full.
  const fillLg = (3 - (cards.length % 3)) % 3;
  const fillSm = cards.length % 2;

  return (
    <>
      <section className="border-line border-b">
        <div className="frame grid lg:grid-cols-12">
          <div className="gutter py-20 md:py-28 lg:col-span-8">
            <p className="eyebrow mb-6">{eyebrow}</p>
            <WordRise text={title} className="text-hero" />
            <StreamText text={lede} className="text-ink-muted mt-8 max-w-xl text-lg" delay={0.45} />
            <Reveal delay={0.9}>
              <p className="border-line bg-paper text-ink-muted mt-6 inline-flex items-center gap-2 rounded-xs border px-3 py-1.5 font-mono text-xs">
                <span aria-hidden className="bg-emerald size-1.5 rounded-full" />
                {status}
              </p>
            </Reveal>
          </div>
          <div className="border-line relative hidden min-h-80 border-l lg:col-span-4 lg:block">
            <NodeNetwork className="absolute inset-0" />
          </div>
        </div>
      </section>
      <section className="bg-paper">
        <div className="frame gutter py-16 md:py-24">
          <p className="eyebrow mb-8">{cardsLabel}</p>
          <ul className="border-line bg-line grid gap-px overflow-hidden rounded-xs border sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((c, i) => {
              const inner = (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-ink-muted font-mono text-xs">{String(i + 1).padStart(2, "0")}</span>
                    {c.meta && <span className="text-ink-muted font-mono text-xs">{c.meta}</span>}
                  </div>
                  <h2 className="display group-hover:text-forest mt-4 text-2xl transition-colors">
                    {c.title}
                  </h2>
                  <p className="text-ink-muted mt-2">{c.body}</p>
                  {c.href && (
                    <span className="text-ink mt-auto flex items-center gap-2 pt-6 text-sm font-medium">
                      Open
                      <span
                        aria-hidden
                        className="ease-out-quart transition-transform duration-500 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  )}
                  {c.href && (
                    <span
                      aria-hidden
                      className="bg-forest ease-out-quart absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                    />
                  )}
                </>
              );
              return (
                <Reveal
                  as="li"
                  key={c.title}
                  id={c.href?.split("/").pop()}
                  delay={(i % 3) * 0.08}
                  className="bg-paper scroll-mt-28"
                >
                  {c.href ? (
                    // The whole card is a shared element: on click it grows into the
                    // topic page's hero, and shrinks back into place on return.
                    <ViewTransition name={cardMorphName(c.href)} share={CARD_MORPH_SHARE} default="none">
                      <TransitionLink
                        href={c.href}
                        direction="open"
                        data-spotlight
                        data-tilt="5"
                        className="group bg-paper hover:bg-ivory relative flex h-full flex-col p-6 transition-[background-color,scale] duration-300 active:scale-[0.985] md:p-8"
                      >
                        {inner}
                      </TransitionLink>
                    </ViewTransition>
                  ) : (
                    <div className="relative flex h-full flex-col p-6 md:p-8">{inner}</div>
                  )}
                </Reveal>
              );
            })}
            {Array.from({ length: fillLg }, (_, i) => (
              <li key={`lg-${i}`} aria-hidden className="bg-paper hidden lg:block" />
            ))}
            {fillSm > 0 && <li aria-hidden className="bg-paper hidden sm:block lg:hidden" />}
          </ul>
          {notice && <EducationNotice className="mt-10" />}
          {children}
          <div className="mt-12 flex flex-wrap gap-3">
            <ButtonLink href="/membership">See membership</ButtonLink>
            <ButtonLink href="/" variant="outline" arrow={false}>
              Back to home
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}

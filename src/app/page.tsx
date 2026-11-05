import { ViewTransition } from "react";
import { Bento } from "@/components/home/bento";
import { CardFan } from "@/components/home/card-fan";
import { CinematicIntro } from "@/components/home/cinematic-intro";
import { FutureReadyQuiz } from "@/components/home/future-ready-quiz";
import { HeroWorlds } from "@/components/home/hero-worlds";
import { IntroFilm } from "@/components/intro/intro-film";
import { KineticStatements } from "@/components/home/kinetic-statements";
import {
  AiPipeline,
  CheckDraw,
  HorizontalPin,
  Marquee,
  Parallax,
  Reveal,
  TransitionLink,
} from "@/components/motion";
import { ButtonLink } from "@/components/ui/button";
import { EducationNotice, Placeholder } from "@/components/ui/education-notice";
import { JoinBadge } from "@/components/ui/join-badge";
import { MotionVisual } from "@/components/ui/motion-visual";
import { Section, SectionHeading } from "@/components/ui/section";
import { products } from "@/content/products";
import { CARD_MORPH_SHARE, cardMorphName } from "@/lib/vt-name";

const PROMISES = [
  { title: "Education only", body: "No buy/sell calls, no price targets, no return promises. Ever." },
  { title: "Read-only wallets", body: "We never ask for a seed phrase or for you to sign a transaction." },
  { title: "Rupees only", body: "Membership is paid in INR through an RBI-authorised gateway." },
  { title: "Your data, your call", body: "Export or delete your account any time, under India's DPDP Act." },
];

/**
 * Home. Story order:
 *   intro film (first visit) / cinematic intro (later sessions) → three worlds hero, zoom into the sphere →
 *   why we exist (kinetic statements) → what you get (bento) → how we use AI →
 *   products → find your path (quiz) → membership cards → promises.
 */
export default function HomePage() {
  return (
    <>
      {/* First visit ever: the full intro film, then this page. */}
      <IntroFilm />
      {/* Later sessions: the short cinematic intro. */}
      <CinematicIntro />

      <HeroWorlds />

      {/* Marquee band */}
      <div className="border-line bg-paper border-y py-6 md:py-8">
        <Marquee
          items={["AI", "Web3", "Agents", "Future money"]}
          className="text-ink text-[clamp(2.5rem,6vw,5.5rem)] leading-none font-medium tracking-[-0.03em] uppercase"
        />
      </div>

      <KineticStatements />

      {/* What members get */}
      <Section tone="ivory" aria-labelledby="bento-title">
        <SectionHeading
          id="bento-title"
          eyebrow="Inside the club"
          title="Everything in *one* club"
          lede="Learning paths, a paper-trading arena, rooms for every topic, and products you can use — all reviewed by people."
        />
        <div className="mt-14">
          <Bento />
        </div>
      </Section>

      {/* How we use AI — pinned, scroll-driven pipeline */}
      <Section tone="paper" aria-labelledby="pipeline-title" innerClassName="pb-0 md:pb-0">
        <SectionHeading
          id="pipeline-title"
          eyebrow="How we use AI"
          title="AI drafts. *People* decide."
          lede="We use AI the way we teach it: as a powerful assistant that's checked by a person. Scroll to see how every lesson and update is made."
        />
        <AiPipeline />
      </Section>

      {/* Featured products — pinned horizontal carousel on desktop */}
      <section className="border-line bg-ivory border-t" aria-labelledby="products-title">
        <HorizontalPin className="frame" trackClassName="gutter py-20 md:py-28 lg:h-dvh lg:items-center">
          <div className="flex w-[80vw] shrink-0 snap-start flex-col justify-center sm:w-[60vw] lg:w-[34rem] lg:pr-12">
            <SectionHeading
              id="products-title"
              eyebrow="Products"
              title="Learning you can *use*"
              lede="Tools and courses built by the club. Members claim one free."
            />
            <ButtonLink href="/products" variant="outline" className="mt-8 self-start">
              See all products
            </ButtonLink>
          </div>
          {products.map((p, i) => (
            <TransitionLink
              key={p.slug}
              href={`/products/${p.slug}`}
              direction="open"
              data-tilt="7"
              className="group border-line bg-paper flex w-[80vw] shrink-0 snap-start flex-col rounded-xs border p-4 sm:w-[46vw] lg:w-[26rem]"
            >
              <ViewTransition
                name={cardMorphName(`/products/${p.slug}`)}
                share={CARD_MORPH_SHARE}
                default="none"
              >
                <div className="overflow-hidden rounded-xs">
                  <Parallax distance={30}>
                    <MotionVisual tone={p.tone} seed={i + 3} className="aspect-[4/5] scale-110" />
                  </Parallax>
                </div>
              </ViewTransition>
              <div className="flex items-center justify-between pt-5">
                <span className="eyebrow">{p.tag}</span>
                <Placeholder />
              </div>
              <h3 className="display group-hover:text-forest mt-2 text-3xl">{p.name}</h3>
              <p className="text-ink-muted mt-2">{p.pitch}</p>
            </TransitionLink>
          ))}
        </HorizontalPin>
      </section>

      {/* Future-ready quiz */}
      <Section tone="linen" aria-labelledby="quiz-title" innerClassName="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            id="quiz-title"
            eyebrow="Two minutes"
            title="How *future-ready* is your money sense?"
            lede="Five quick questions. You'll get a score and a learning path that fits where you are today."
          />
        </div>
        <div className="lg:col-span-7">
          <FutureReadyQuiz />
        </div>
      </Section>

      {/* Membership — cards fan out of a stack */}
      <Section
        tone="sand"
        aria-labelledby="club-title"
        className="overflow-hidden"
        innerClassName="grid gap-16 lg:grid-cols-12 lg:items-center"
      >
        <div className="lg:col-span-6">
          <SectionHeading
            id="club-title"
            eyebrow="The Club"
            title="Grow *together*, not alone"
            lede="Members get private rooms, a free product, deeper courses, live sessions and a paper-trading arena where skill — not money — tops the leaderboard."
          />
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <JoinBadge />
            <p className="text-ink-muted max-w-xs text-sm">
              Monthly and yearly plans in rupees. Cancel any time.
            </p>
          </div>
        </div>
        <div className="py-10 lg:col-span-6">
          <CardFan />
        </div>
      </Section>

      {/* Trust strip */}
      <Section tone="paper" aria-labelledby="trust-title" innerClassName="py-16 md:py-20">
        <h2 id="trust-title" className="eyebrow">
          Our promises
        </h2>
        <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PROMISES.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 0.08} className="border-ink/20 border-t pt-5">
              <CheckDraw delay={0.2 + i * 0.15} />
              <p className="mt-4 font-medium">{p.title}</p>
              <p className="text-ink-muted mt-2 text-sm">{p.body}</p>
            </Reveal>
          ))}
        </ul>
        <EducationNotice className="mt-12" />
      </Section>
    </>
  );
}

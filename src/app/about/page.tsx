import type { Metadata } from "next";
import { MoneyTimeline, Reveal, WordRise, type MoneyStage } from "@/components/motion";
import { ButtonLink } from "@/components/ui/button";
import { Placeholder } from "@/components/ui/education-notice";
import { MotionVisual } from "@/components/ui/motion-visual";
import { Section, SectionHeading } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who we are, the journey so far, and how this website teaches, reviews content and protects members.",
};

const MONEY: MoneyStage[] = [
  {
    era: "Before coins",
    title: "Barter",
    glyph: "⇄",
    body: "Grain for cloth, cattle for tools. Value lived in things, and every trade needed two people who wanted each other's goods.",
  },
  {
    era: "~600 BCE",
    title: "Coins",
    glyph: "◎",
    body: "Stamped metal made value portable and countable. The punch-marked coins of ancient India were among the first.",
  },
  {
    era: "1700s – today",
    title: "Paper notes",
    glyph: "₹",
    body: "A promise printed on paper, backed by a central bank. The Reserve Bank of India has issued the rupee since 1935.",
  },
  {
    era: "2016",
    title: "UPI",
    glyph: "⚡",
    body: "Instant bank-to-bank payments from a phone. India now runs more real-time payments than any other country.",
  },
  {
    era: "2022",
    title: "Digital Rupee",
    glyph: "e₹",
    body: "The RBI's own digital currency — the same rupee, issued as a digital token, piloted for retail and wholesale use.",
  },
  {
    era: "Emerging",
    title: "Tokens",
    glyph: "◆",
    body: "Assets like bonds, property or gold recorded on blockchains, so they can be split, moved and settled in new ways.",
  },
  {
    era: "Next",
    title: "AI agents",
    glyph: "⌘",
    body: "Software that can plan and act for you — comparing, paying and managing money within limits you set. Understanding them is the new literacy.",
  },
];

const TEAM = ["Founder", "Head of Learning", "Lead Engineer", "Community Lead"];

const JOURNEY = [
  { when: "Milestone 1", what: "The idea: a calm, honest place to learn the new money." },
  { when: "Milestone 2", what: "First lessons and the first product built and tested." },
  { when: "Milestone 3", what: "Nodal Wealth Club opens to members." },
];

const HOW_WE_WORK = [
  {
    title: "What we teach",
    body: "How AI, Web3 and agentic systems work and how they are arriving in India — concepts, tools, safety and careers. We teach how markets and trading systems work, never what to buy or sell.",
  },
  {
    title: "How content is reviewed",
    body: "AI can help draft our daily updates, but a person checks every fact and approves every post before it goes live. Each page shows when it was last reviewed. Lessons use historical or made-up data, never live price calls.",
  },
  {
    title: "Security and privacy",
    body: "We store as little as possible. Card and UPI details stay with our payment gateway. Wallet connections are read-only, and we will never ask for your seed phrase or private key. You can export or delete your data whenever you like.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-line border-b" aria-labelledby="about-title">
        <div className="frame gutter grid gap-10 py-20 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-6">About us</p>
            <div id="about-title">
              <WordRise text="We teach the money of *tomorrow*, today" className="text-hero" />
            </div>
          </div>
          <Reveal delay={0.3} className="self-end lg:col-span-4">
            <p className="text-ink-muted text-lg">
              Nodal Wealth Club exists because people in India hear about AI and crypto every day but have
              nowhere trustworthy to learn. We explain the new financial system in plain words, build tools
              that put it to work, and keep a members&apos; club where people grow together.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Mission + team */}
      <Section aria-labelledby="team-title">
        <SectionHeading
          id="team-title"
          eyebrow="The people"
          title="A small team with a *clear* job"
          lede={
            <>
              Team names, photos and bios arrive with your details. <Placeholder />
            </>
          }
        />
        <ul className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {TEAM.map((role, i) => (
            <Reveal as="li" key={role} delay={i * 0.08}>
              <MotionVisual
                tone={(["mint", "sand", "linen", "emerald"] as const)[i]}
                seed={i + 5}
                className="aspect-[3/4]"
              />
              <p className="mt-4 font-medium">Team member name</p>
              <p className="text-ink-muted text-sm">{role}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Journey */}
      <Section id="journey" tone="paper" aria-labelledby="journey-title">
        <SectionHeading
          id="journey-title"
          eyebrow="Our journey"
          title="How we *got* here"
          lede={
            <>
              Your milestones go here. <Placeholder />
            </>
          }
        />
        <ol className="border-line bg-line mt-12 grid gap-px overflow-hidden rounded-xs border md:grid-cols-3">
          {JOURNEY.map((j, i) => (
            <Reveal as="li" key={j.when} delay={i * 0.1} className="bg-paper p-6 md:p-8">
              <p className="text-ink-muted font-mono text-xs">{j.when}</p>
              <p className="display mt-4 text-2xl">{j.what}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Money history */}
      <Section tone="ivory" aria-labelledby="money-title">
        <SectionHeading
          id="money-title"
          eyebrow="Why now"
          title="Money keeps *changing* shape"
          lede="Every few generations, money changes form. The next change is already under way. Scroll through it."
          align="center"
          className="mb-10"
        />
        <MoneyTimeline stages={MONEY} />
      </Section>

      {/* About this website */}
      <Section tone="linen" aria-labelledby="site-title">
        <SectionHeading id="site-title" eyebrow="About this website" title="How this site *works*" />
        <div className="border-line bg-line mt-12 grid gap-px overflow-hidden rounded-xs border md:grid-cols-3">
          {HOW_WE_WORK.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1} className="bg-paper p-6 md:p-8">
              <span className="text-ink-muted font-mono text-xs">0{i + 1}</span>
              <h3 className="display mt-4 text-3xl">{item.title}</h3>
              <p className="text-ink-muted mt-3">{item.body}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          <ButtonLink href="/membership">Join the Club</ButtonLink>
          <ButtonLink href="/legal/privacy" variant="outline" arrow={false}>
            Read our privacy notice
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}

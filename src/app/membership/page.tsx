import type { Metadata } from "next";
import { Reveal, WordRise } from "@/components/motion";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { EducationNotice, Placeholder } from "@/components/ui/education-notice";
import { JoinBadge } from "@/components/ui/join-badge";
import { Section, SectionHeading } from "@/components/ui/section";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Membership",
  description:
    "Join Nodal Wealth Club: private member chat, one free product, deeper courses, live sessions and a paper-trading arena. Paid in rupees.",
};

const PLANS = [
  {
    id: "monthly",
    name: "Monthly",
    price: "₹—",
    period: "per month",
    note: "Cancel any time.",
    featured: false,
  },
  {
    id: "yearly",
    name: "Yearly",
    price: "₹—",
    period: "per year",
    note: "Billed once a year.",
    featured: true,
  },
];

const BENEFITS = [
  {
    title: "Member chat",
    body: "Private rooms for General, AI, Web3, Agents and Help — moderated, with a report button.",
  },
  { title: "One free product", body: "Claim one club product free with your membership." },
  {
    title: "Deeper courses",
    body: "Member-only lessons and learning paths with progress, badges and certificates.",
  },
  {
    title: "Paper-trading arena",
    body: "₹10,00,000 in virtual money to test strategies and AI agents. The leaderboard ranks skill, not wealth.",
  },
  { title: "Live sessions", body: "Monthly live sessions with recordings you can watch later." },
  {
    title: "Private portfolio view",
    body: "Connect a wallet read-only to see your own holdings in rupees. Only you can see it.",
  },
];

const COMPARE: { feature: string; free: boolean | string; member: boolean | string }[] = [
  { feature: "AI and Web3 knowledge articles", free: true, member: true },
  { feature: "Daily updates and weekly newsletter", free: true, member: true },
  { feature: "Crypto tax calculator and glossary", free: true, member: true },
  { feature: "Member-only lessons and learning paths", free: false, member: true },
  { feature: "Member chat rooms", free: false, member: true },
  { feature: "One free product", free: false, member: true },
  { feature: "Paper-trading arena and leaderboard", free: false, member: true },
  { feature: "Live sessions and recordings", free: false, member: true },
  { feature: "Private read-only wallet portfolio", free: false, member: true },
  { feature: "Early access to new products", free: false, member: true },
];

const FAQ = [
  {
    q: "Will you tell me what to buy or sell?",
    a: "No. Nodal Wealth Club is education only. We are not a SEBI-registered investment adviser or research analyst, and we never give buy/sell calls, price targets or return promises — not in lessons, not in the chat, not in live sessions.",
  },
  {
    q: "How do I pay?",
    a: "In Indian rupees through Razorpay, an RBI-authorised payment gateway: UPI, cards, net banking or UPI AutoPay for renewals. Your card and bank details stay with Razorpay; we only keep a payment reference. We do not accept crypto.",
  },
  {
    q: "Is connecting a wallet safe?",
    a: "Connecting is optional and read-only. You prove the wallet is yours by signing a plain message — never a transaction. We will never ask for your seed phrase or private key, and nobody else in the club can see your balances.",
  },
  {
    q: "Can I cancel?",
    a: "Yes, any time from your account page. You keep access until the end of the period you paid for. See the refund policy for details.",
  },
  {
    q: "What happens to my data if I leave?",
    a: "You can download everything we hold about you and delete your account from your settings, as India's DPDP Act requires.",
  },
  {
    q: "What does 'paper trading' mean?",
    a: "Practising with virtual money that isn't real. You can test ideas and AI agents without risking a single rupee.",
  },
];

function Mark({ value }: { value: boolean | string }) {
  if (typeof value === "string") return <span className="text-sm">{value}</span>;
  return value ? (
    <span className="text-jade">
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
        <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
      <span className="sr-only">Included</span>
    </span>
  ) : (
    <span className="text-ink-muted/60">
      <span aria-hidden>—</span>
      <span className="sr-only">Not included</span>
    </span>
  );
}

export default function MembershipPage() {
  return (
    <>
      <section className="border-line border-b" aria-labelledby="membership-title">
        <div className="frame gutter grid gap-10 py-20 md:py-28 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-6">Membership</p>
            <div id="membership-title">
              <WordRise text="Learn it, use it, grow it *together*" className="text-hero" />
            </div>
            <Reveal delay={0.4}>
              <p className="text-ink-muted mt-8 max-w-xl text-lg">
                Free knowledge for everyone. Membership adds the club: people, practice, products and live
                sessions — paid in rupees, cancel any time.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <JoinBadge href="#plans" label="See the plans" />
          </div>
        </div>
      </section>

      {/* Plans */}
      <Section id="plans" aria-labelledby="plans-title">
        <SectionHeading
          id="plans-title"
          eyebrow="Plans"
          title="Two plans, *one* club"
          lede={
            <>
              Prices are set once you confirm them. <Placeholder>Prices pending</Placeholder>
            </>
          }
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {PLANS.map((plan, i) => (
            <Reveal
              key={plan.id}
              delay={i * 0.1}
              className={cn(
                "flex flex-col rounded-xs border p-6 md:p-10",
                plan.featured ? "border-forest bg-paper" : "border-line bg-ivory",
              )}
            >
              <div className="flex items-center justify-between">
                <h3 className="display text-3xl">{plan.name}</h3>
                {plan.featured && (
                  <span className="bg-emerald/15 text-forest rounded-xs px-2 py-1 font-mono text-[0.7rem] tracking-wider uppercase">
                    Best value
                  </span>
                )}
              </div>
              <p className="mt-8 flex items-baseline gap-2">
                <span className="text-ink font-mono text-5xl">{plan.price}</span>
                <span className="text-ink-muted">{plan.period}</span>
              </p>
              <p className="text-ink-muted mt-2 text-sm">{plan.note} GST included.</p>
              <button
                type="button"
                disabled
                aria-describedby="checkout-note"
                className="bg-forest text-paper mt-10 inline-flex min-h-12 items-center justify-center rounded-xs px-5 opacity-60"
              >
                Join {plan.name.toLowerCase()}
              </button>
            </Reveal>
          ))}
        </div>
        <p id="checkout-note" className="text-ink-muted mt-6 text-sm">
          Razorpay checkout opens in the next build phase. Leave your email below to be told the day it opens.
        </p>
        <div className="mt-6 max-w-xl">
          <NewsletterForm source="membership" />
        </div>
      </Section>

      {/* Benefits */}
      <Section tone="paper" aria-labelledby="benefits-title">
        <SectionHeading id="benefits-title" eyebrow="What members get" title="Everything in the *club*" />
        <ul className="border-line bg-line mt-12 grid gap-px overflow-hidden rounded-xs border sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <Reveal as="li" key={b.title} delay={(i % 3) * 0.08} className="bg-paper p-6 md:p-8">
              <span className="text-ink-muted font-mono text-xs">0{i + 1}</span>
              <h3 className="display mt-4 text-2xl">{b.title}</h3>
              <p className="text-ink-muted mt-2">{b.body}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Comparison */}
      <Section aria-labelledby="compare-title">
        <SectionHeading id="compare-title" eyebrow="Free vs member" title="What's free, what's *club*" />
        <div className="border-line mt-12 overflow-x-auto rounded-xs border">
          <table className="w-full min-w-[32rem] border-collapse text-left">
            <caption className="sr-only">Free account compared with membership</caption>
            <thead className="bg-sand/50">
              <tr>
                <th scope="col" className="px-5 py-4 font-medium">
                  Feature
                </th>
                <th scope="col" className="w-28 px-5 py-4 text-center font-medium">
                  Free
                </th>
                <th scope="col" className="w-28 px-5 py-4 text-center font-medium">
                  Member
                </th>
              </tr>
            </thead>
            <tbody className="divide-line bg-paper divide-y">
              {COMPARE.map((row) => (
                <tr key={row.feature}>
                  <th scope="row" className="px-5 py-4 font-normal">
                    {row.feature}
                  </th>
                  <td className="px-5 py-4 text-center">
                    <span className="inline-flex justify-center">
                      <Mark value={row.free} />
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className="inline-flex justify-center">
                      <Mark value={row.member} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Testimonials */}
      <Section tone="sand" aria-labelledby="voices-title">
        <SectionHeading
          id="voices-title"
          eyebrow="Members"
          title="In their *own* words"
          lede={
            <>
              Real member quotes, published only with written consent and never about returns.{" "}
              <Placeholder>Awaiting real quotes</Placeholder>
            </>
          }
        />
      </Section>

      {/* FAQ */}
      <Section id="faq" tone="paper" aria-labelledby="faq-title" innerClassName="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading id="faq-title" eyebrow="FAQ" title="Questions, *answered*" />
        </div>
        <div className="lg:col-span-8">
          <div className="divide-line border-line divide-y border-y">
            {FAQ.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span
                    aria-hidden
                    className="border-line grid size-8 shrink-0 place-items-center rounded-xs border transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="text-ink-muted mt-4 max-w-2xl">{item.a}</p>
              </details>
            ))}
          </div>
          <EducationNotice className="mt-10" />
        </div>
      </Section>
    </>
  );
}

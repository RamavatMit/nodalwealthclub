import type { Hub } from "./topics";

/**
 * Daily news cards for the AI and Web3 hubs. Each card opens its own page at
 * /{hub}/news/{slug}.
 *
 * The items below are SAMPLES that show the layout; they describe how to read
 * a type of news rather than reporting real events. They are replaced by the
 * daily feed (CMS, AI-drafted + human-approved) — set `sample: false` on real
 * items and fill in `source`.
 */

export type NewsItem = {
  hub: Hub;
  slug: string;
  title: string;
  summary: string;
  /** ISO date the story was published. */
  date: string;
  category: string;
  minutes: number;
  tone: "mint" | "sand" | "emerald" | "linen";
  /** Full story, paragraph by paragraph. */
  body: string[];
  whyItMatters: string;
  source?: { name: string; url: string };
  sample: boolean;
};

export const news: NewsItem[] = [
  {
    hub: "ai",
    slug: "reading-a-model-launch",
    title: "Sample story: how to read a new AI model launch",
    summary:
      "Every week brings a “best model ever”. Here's what the announcement usually means — and what to ignore.",
    date: "2026-10-10",
    category: "Models",
    minutes: 3,
    tone: "mint",
    body: [
      "New AI models are announced almost every week, each with charts showing it beats the competition. Most announcements follow the same pattern.",
      "Look for three things: what the model is good at (coding, reasoning, Indian languages), how you can use it (app, API, open weights), and what it costs. Benchmarks are useful but measured by the company itself.",
      "The real test is your own task. Try the new model on two or three things you actually do and compare with the tool you already use.",
    ],
    whyItMatters:
      "You don't need to switch tools every week. Switch when a new model is clearly better at your real work — or cheaper.",
    sample: true,
  },
  {
    hub: "ai",
    slug: "ai-pricing-change",
    title: "Sample story: when an AI tool changes its price",
    summary:
      "Free tiers shrink and plans change. How to react calmly when your favourite tool raises prices.",
    date: "2026-10-09",
    category: "Tools",
    minutes: 3,
    tone: "linen",
    body: [
      "AI companies change prices and free limits often, as running models is expensive.",
      "Before paying more, check whether a cheaper plan, a different tool or an open model running locally can do the same job.",
      "If the tool saves you hours every week, a price rise may still be worth it. Do the maths in rupees per hour saved.",
    ],
    whyItMatters:
      "Treat AI tools like any subscription: review them every few months and keep only those that pay for themselves.",
    sample: true,
  },
  {
    hub: "ai",
    slug: "india-ai-programme-update",
    title: "Sample story: reading an IndiaAI programme update",
    summary:
      "Government AI announcements can mean free compute, courses or funding. How to find what applies to you.",
    date: "2026-10-08",
    category: "India",
    minutes: 3,
    tone: "emerald",
    body: [
      "The IndiaAI Mission and state programmes regularly announce new initiatives — compute access, datasets, skilling courses and start-up support.",
      "Read the official notice on the government site rather than social-media summaries, and check eligibility, deadlines and whether there's any fee.",
      "Be wary of messages asking you to pay to “register” for a government AI scheme — official programmes publish their own application portals.",
    ],
    whyItMatters:
      "Free, official courses and resources are often the best starting point — and scammers copy their names.",
    sample: true,
  },
  {
    hub: "web3",
    slug: "digital-rupee-pilot-update",
    title: "Sample story: what a Digital Rupee pilot update means",
    summary:
      "The RBI expands e₹ tests from time to time. Here's how to read the news and whether it affects you.",
    date: "2026-10-10",
    category: "India",
    minutes: 3,
    tone: "linen",
    body: [
      "The Reserve Bank of India runs pilots of the Digital Rupee (e₹) with participating banks, and updates them as it adds banks, users or features.",
      "Check three things in any update: which banks are included, whether it's for retail users or wholesale (bank-to-bank), and what new feature is being tested.",
      "e₹ is a central-bank currency — it isn't a crypto token and doesn't go up or down in value against the rupee.",
    ],
    whyItMatters:
      "If your bank offers an e₹ wallet, you may be able to try it. It's a regulated way to see digital-currency ideas in practice.",
    sample: true,
  },
  {
    hub: "web3",
    slug: "exchange-registration-news",
    title: "Sample story: reading crypto exchange regulation news",
    summary: "When an exchange is registered, warned or blocked in India — what it means for users.",
    date: "2026-10-09",
    category: "Regulation",
    minutes: 3,
    tone: "sand",
    body: [
      "Crypto exchanges serving Indian users must register with the Financial Intelligence Unit (FIU-IND) under anti-money-laundering rules.",
      "News that an exchange is registered is a basic safety signal; news that one is blocked or under action is a reason to check your account and withdrawal options.",
      "Registration isn't a guarantee of safety or returns — it means the exchange must follow reporting rules.",
    ],
    whyItMatters: "Using registered exchanges and keeping records protects you when rules change.",
    sample: true,
  },
  {
    hub: "web3",
    slug: "crypto-tax-headline",
    title: "Sample story: decoding a crypto tax headline",
    summary: "Budget season brings tax headlines. How to tell what changed and what didn't.",
    date: "2026-10-08",
    category: "Tax",
    minutes: 3,
    tone: "emerald",
    body: [
      "Crypto, or “virtual digital assets”, are taxed in India at 30% on gains plus cess, with 1% TDS on transfers above set limits, and losses can't be set off.",
      "When a headline says the rules changed, check the official Budget documents or the Income Tax Department's notification for the exact change and the date it applies from.",
      "Social-media posts often mix up proposals with final rules. Your chartered accountant is the right person to confirm.",
    ],
    whyItMatters:
      "Tax rules decide your real result. Always confirm changes from official sources before acting.",
    sample: true,
  },
];

export function newsFor(hub: Hub) {
  return news.filter((n) => n.hub === hub).sort((a, b) => b.date.localeCompare(a.date));
}

export function getNews(hub: Hub, slug: string) {
  return news.find((n) => n.hub === hub && n.slug === slug);
}

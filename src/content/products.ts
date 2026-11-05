/**
 * Product pages. All copy here is a [PLACEHOLDER] draft that shows the page
 * structure; real names, details, videos and prices come from the client
 * (Phase 5) and move into Payload CMS.
 */

export type Product = {
  slug: string;
  name: string;
  /** `*word*` marks the italic accent word on the product page. */
  headline: string;
  pitch: string;
  tag: "Tool" | "Course" | "Guide";
  tone: "mint" | "sand" | "emerald" | "linen";
  freeWithMembership: boolean;
  /** Shows the education-only notice (trading / crypto related). */
  sensitive?: boolean;
  whatItDoes: { title: string; body: string }[];
  howItWorks: { title: string; body: string }[];
  howWeBuilt: { when: string; title: string; body: string }[];
  stack: string[];
  pricing: { name: string; price: string; period: string; features: string[]; featured?: boolean }[];
  faq: { q: string; a: string }[];
  placeholder: true;
};

export const products: Product[] = [
  {
    slug: "agent-sandbox",
    name: "Agent Sandbox",
    headline: "Build a trading agent, *safely*",
    pitch: "Build and test a trading agent on paper money, with risk limits built in.",
    tag: "Tool",
    tone: "mint",
    freeWithMembership: true,
    sensitive: true,
    whatItDoes: [
      {
        title: "A safe place to experiment",
        body: "Design an AI agent and run it against historical or synthetic data — never real money.",
      },
      {
        title: "Limits it can't break",
        body: "Set position size, maximum daily loss and stop rules. The agent cannot override them.",
      },
      {
        title: "Every decision explained",
        body: "Each simulated action comes with the agent's reasoning, so you learn why, not just what.",
      },
    ],
    howItWorks: [
      { title: "Pick a template", body: "Start from a simple rule-based bot or a blank agent." },
      { title: "Set your risk rules", body: "Choose limits first. The sandbox won't start without them." },
      { title: "Run a back-test", body: "Replay historical or synthetic data and watch every decision." },
      {
        title: "Review honestly",
        body: "See costs, slippage and drawdowns alongside results — the full picture.",
      },
    ],
    howWeBuilt: [
      {
        when: "Idea",
        title: "Learning without the risk",
        body: "Members wanted to understand trading agents without risking money.",
      },
      {
        when: "Build",
        title: "Risk rules first",
        body: "We built the limit engine before the agent, so safety isn't optional.",
      },
      {
        when: "Test",
        title: "Member beta",
        body: "Tested with members on paper money and refined from their feedback.",
      },
    ],
    stack: [
      "Python simulation engine",
      "LLM agent with tool limits",
      "Historical & synthetic data",
      "Next.js dashboard",
    ],
    pricing: [
      {
        name: "Members",
        price: "Free",
        period: "with membership",
        features: ["Full sandbox", "Arena leaderboard", "Member support"],
        featured: true,
      },
      { name: "Standalone", price: "₹—", period: "one-time", features: ["Full sandbox", "Email support"] },
    ],
    faq: [
      {
        q: "Does it trade real money?",
        a: "No. The sandbox only ever uses paper money with historical or synthetic data.",
      },
      {
        q: "Will it tell me what to trade?",
        a: "No. It's a learning tool for how agents work. It gives no signals or recommendations.",
      },
      {
        q: "Do I need to code?",
        a: "No for the templates; some Python helps if you want to build your own logic.",
      },
    ],
    placeholder: true,
  },
  {
    slug: "prompt-lab",
    name: "Prompt Lab",
    headline: "Prompts that *work*, for your field",
    pitch: "Short, copy-ready prompt lessons for your field, in English and Hindi.",
    tag: "Course",
    tone: "sand",
    freeWithMembership: true,
    whatItDoes: [
      { title: "Five-minute lessons", body: "Each lesson teaches one prompting skill with a real task." },
      { title: "Copy-ready prompts", body: "Hundreds of tested prompts, organised by job and task." },
      { title: "English and Hindi", body: "Lessons and prompts in both, with more languages to follow." },
    ],
    howItWorks: [
      { title: "Choose your field", body: "Farming, teaching, retail, finance, law, freelancing and more." },
      { title: "Learn one skill", body: "Context, examples, format, checking — one at a time." },
      { title: "Practise", body: "Try the prompt on your own task and compare with ours." },
      { title: "Save your library", body: "Keep the prompts that work for you in one place." },
    ],
    howWeBuilt: [
      {
        when: "Idea",
        title: "People asked for examples",
        body: "Learners didn't want theory — they wanted prompts for their own job.",
      },
      {
        when: "Build",
        title: "Tested by people in each field",
        body: "Every prompt was tried on real tasks by people who do that work.",
      },
      { when: "Launch", title: "Growing every month", body: "New lessons are added as tools change." },
    ],
    stack: ["Lesson CMS", "Prompt testing workflow", "Bilingual content review"],
    pricing: [
      {
        name: "Members",
        price: "Free",
        period: "with membership",
        features: ["All lessons", "Prompt library", "New lessons monthly"],
        featured: true,
      },
      {
        name: "Standalone",
        price: "₹—",
        period: "one-time",
        features: ["All current lessons", "Prompt library"],
      },
    ],
    faq: [
      {
        q: "Which AI tools does it work with?",
        a: "The skills work with any major assistant — ChatGPT, Gemini, Claude and others.",
      },
      { q: "Is it for beginners?", a: "Yes. Start with lesson one; no technical background needed." },
    ],
    placeholder: true,
  },
  {
    slug: "wallet-safety-kit",
    name: "Wallet Safety Kit",
    headline: "Spot the scam *before* it spots you",
    pitch: "A guided checklist that spots the scams Indian beginners meet most.",
    tag: "Guide",
    tone: "linen",
    freeWithMembership: true,
    sensitive: true,
    whatItDoes: [
      {
        title: "A setup checklist",
        body: "Set up a wallet the safe way, step by step, and store your seed phrase offline.",
      },
      {
        title: "Scam patterns",
        body: "Learn the dozen scams that cause most losses in India, with real examples.",
      },
      {
        title: "A sign-or-stop guide",
        body: "Understand what a wallet pop-up is really asking before you approve it.",
      },
    ],
    howItWorks: [
      { title: "Self-check", body: "Answer a few questions about how you hold crypto today." },
      { title: "Fix the gaps", body: "Get a personal checklist of what to change first." },
      { title: "Practise spotting", body: "Work through realistic scam messages and links safely." },
      { title: "Keep it handy", body: "Download the printable one-page checklist." },
    ],
    howWeBuilt: [
      {
        when: "Idea",
        title: "Most losses are scams",
        body: "We saw beginners lose more to scams than to markets.",
      },
      {
        when: "Build",
        title: "From real cases",
        body: "Built from anonymised scam reports and security best practice.",
      },
      {
        when: "Review",
        title: "Checked by security folks",
        body: "Reviewed for accuracy before release, and updated as scams evolve.",
      },
    ],
    stack: ["Interactive checklist", "Scam simulation (safe, offline)", "Printable PDF"],
    pricing: [
      {
        name: "Members",
        price: "Free",
        period: "with membership",
        features: ["Full kit", "Updates as scams change"],
        featured: true,
      },
      { name: "Standalone", price: "₹—", period: "one-time", features: ["Full kit", "Printable checklist"] },
    ],
    faq: [
      {
        q: "Will you ask for my seed phrase?",
        a: "Never. The kit teaches you why nobody should ever ask for it.",
      },
      {
        q: "Do I need a wallet already?",
        a: "No. It works whether you're about to start or have used crypto for years.",
      },
    ],
    placeholder: true,
  },
  {
    slug: "tax-ledger",
    name: "Crypto Tax Ledger",
    headline: "Crypto tax records, *sorted*",
    pitch: "Track 30% tax and 1% TDS across exchanges, ready for your CA.",
    tag: "Tool",
    tone: "emerald",
    freeWithMembership: false,
    sensitive: true,
    whatItDoes: [
      { title: "One ledger", body: "Bring trades from several exchanges and wallets into one record." },
      {
        title: "India's rules built in",
        body: "Estimates 30% tax plus cess on gains and tracks TDS already deducted.",
      },
      { title: "CA-ready export", body: "Download a clean report your chartered accountant can work from." },
    ],
    howItWorks: [
      { title: "Import", body: "Upload exchange CSV files or add trades by hand." },
      { title: "Review", body: "Check matched buys and sells and fix anything missing." },
      { title: "Estimate", body: "See estimated tax and TDS credit for the year." },
      { title: "Export", body: "Share the report with your CA to file your return." },
    ],
    howWeBuilt: [
      {
        when: "Idea",
        title: "Spreadsheets got messy",
        body: "Members struggled to track trades across apps at tax time.",
      },
      {
        when: "Build",
        title: "Rules from the Income-tax Act",
        body: "Calculations follow the VDA rules and are reviewed after every Budget.",
      },
      {
        when: "Privacy",
        title: "Your data stays yours",
        body: "No exchange passwords or API keys with withdrawal rights — ever.",
      },
    ],
    stack: ["CSV import pipeline", "Indian VDA tax rules engine", "Encrypted storage"],
    pricing: [
      {
        name: "Yearly",
        price: "₹—",
        period: "per financial year",
        features: ["Unlimited trades", "CA-ready export"],
        featured: true,
      },
      {
        name: "Member price",
        price: "₹—",
        period: "per financial year",
        features: ["Member discount", "Priority support"],
      },
    ],
    faq: [
      {
        q: "Is this tax advice?",
        a: "No. It's an estimate and record-keeping tool. Always confirm with a chartered accountant.",
      },
      {
        q: "Do you need my exchange login?",
        a: "No. You upload exported files; we never ask for passwords or keys.",
      },
    ],
    placeholder: true,
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

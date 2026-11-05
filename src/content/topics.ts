/**
 * Article cards for the AI and Web3 hubs. Each is a real, reviewed
 * introduction grouped into a hub section; the full lesson series arrives
 * with the CMS in Phase 2 (Payload CMS).
 */

import { aiTopics } from "./ai-articles";
import { web3Extra } from "./web3-articles";

export type Hub = "ai" | "web3";

/** Sections of the hub pages; every article card belongs to one. */
export type SectionKey = "basics" | "tools" | "agents" | "web3-knowledge";

export const SECTION_LABEL: Record<SectionKey, string> = {
  basics: "AI Basics",
  tools: "AI Tools",
  agents: "Agents",
  "web3-knowledge": "Web3 Knowledge",
};

export type TopicSection = {
  heading: string;
  body: string;
  points?: string[];
};

export type Topic = {
  hub: Hub;
  section: SectionKey;
  slug: string;
  /** Card and page title. `*word*` marks the italic accent word on the page. */
  title: string;
  /** Plain title for metadata and links. */
  name: string;
  summary: string;
  lede: string;
  minutes: number;
  tone: "mint" | "sand" | "emerald" | "linen";
  /** Shows the education-only notice prominently near the top. */
  sensitive?: boolean;
  sections: TopicSection[];
  takeaways: string[];
  /** Interactive widget rendered on the page, if any. */
  widget?: "tax-calculator";
  /** What the full Phase 2 lesson series adds. */
  comingNext: string[];
};

const web3Core: Topic[] = [
  {
    hub: "web3",
    section: "web3-knowledge",
    slug: "knowledge",
    name: "Web3 basics",
    title: "Web3, from the *ground* up",
    summary: "Blockchain, wallets, smart contracts, DeFi, stablecoins and tokenisation.",
    lede: "Strip away the jargon and Web3 is a few simple ideas: a shared record nobody owns, keys that prove what's yours, and programs that run on that record.",
    minutes: 10,
    tone: "linen",
    sensitive: true,
    sections: [
      {
        heading: "Blockchain: a shared record",
        body: "A blockchain is a list of transactions copied across thousands of computers. New entries are grouped into blocks and linked, so changing the past would mean changing every copy at once.",
      },
      {
        heading: "Wallets: keys, not coins",
        body: "A wallet doesn't hold coins; it holds keys. Your public address is like a bank account number you can share. Your private key or seed phrase is the only proof of ownership — whoever has it controls the funds, and there's no bank to call.",
      },
      {
        heading: "Smart contracts and DeFi",
        body: "Smart contracts are small programs stored on a blockchain that run exactly as written. DeFi (decentralised finance) uses them to offer lending, trading and savings without a traditional company in the middle — which also means bugs and scams can cost real money.",
      },
      {
        heading: "Stablecoins and tokenisation",
        body: "Stablecoins are tokens designed to track a currency like the US dollar. Tokenisation records real-world assets — bonds, property, gold — as tokens so they can be split and moved more easily. Both are early and regulated differently around the world.",
      },
    ],
    takeaways: [
      "A blockchain is a shared, hard-to-change record.",
      "Your seed phrase is your ownership. Never share it.",
      "Smart contracts run as written — including their bugs.",
    ],
    comingNext: ["Illustrated lessons for each concept", "Interactive diagrams", "Glossary links throughout"],
  },
  {
    hub: "web3",
    section: "web3-knowledge",
    slug: "safety",
    name: "Safety and scams",
    title: "Stay *safe* in Web3",
    summary: "Seed phrases, fake airdrops, pump-and-dumps and 'recovery agent' scams.",
    lede: "The most valuable thing we teach. Most people who lose crypto in India lose it to a scam, not to the market.",
    minutes: 8,
    tone: "sand",
    sensitive: true,
    sections: [
      {
        heading: "The one rule",
        body: "Never type, photograph, share or store your seed phrase online. No real company, exchange, support agent or “wallet validator” will ever ask for it. Anyone who does is a scammer.",
      },
      {
        heading: "Scams we see most",
        body: "Learn the patterns and you'll recognise new versions.",
        points: [
          "Fake airdrops and free-token links that ask you to connect a wallet and sign.",
          "Pump-and-dump groups on Telegram and WhatsApp promising guaranteed returns.",
          "“Recovery agents” who promise to get back lost crypto for a fee.",
          "Fake exchange apps and look-alike websites.",
          "Romance and job scams that end with an “investment platform”.",
        ],
      },
      {
        heading: "Before you sign anything",
        body: "Read what a wallet pop-up is asking. A plain message to prove ownership is usually safe; a transaction or a token “approval” can give someone permission to move your funds.",
      },
      {
        heading: "If something goes wrong",
        body: "Stop sending money. Report it on India's cyber-crime portal (cybercrime.gov.in) or call 1930, keep screenshots and transaction IDs, and ignore anyone who offers to recover it for a fee.",
      },
    ],
    takeaways: [
      "Nobody legitimate will ever ask for your seed phrase.",
      "Guaranteed returns are a scam, every time.",
      "Report fraud to 1930 / cybercrime.gov.in.",
    ],
    comingNext: ["A scam-spotting quiz", "Real (anonymised) case studies", "A printable safety checklist"],
  },
  {
    hub: "web3",
    section: "web3-knowledge",
    slug: "india",
    name: "Web3 in India",
    title: "Web3 in *India*, today",
    summary: "The Digital Rupee, UPI, account aggregators and the legal position today.",
    lede: "India is building some of the world's most advanced digital money rails — mostly without blockchains. Here's how the pieces fit and where Web3 ideas are being tested.",
    minutes: 8,
    tone: "mint",
    sensitive: true,
    sections: [
      {
        heading: "UPI: the rails everyone uses",
        body: "Launched in 2016 by NPCI, UPI moves money between bank accounts instantly from a phone. It isn't a blockchain, but it set the bar for how fast and cheap digital payments should be.",
      },
      {
        heading: "The Digital Rupee (e₹)",
        body: "The RBI's central bank digital currency began pilots in 2022 for wholesale and retail use. It's the same rupee, issued as a digital token by the RBI, held in wallets offered by participating banks.",
      },
      {
        heading: "Account aggregators",
        body: "The account aggregator framework lets you share your financial data between banks, insurers and lenders with explicit consent — a key idea Web3 also cares about: you control your data.",
      },
      {
        heading: "Where crypto stands legally",
        body: "Crypto assets are not legal tender in India, but holding and trading them is not banned. They are taxed as virtual digital assets, and exchanges serving Indians must register with the Financial Intelligence Unit (FIU-IND). Rules continue to change.",
      },
    ],
    takeaways: [
      "UPI and e₹ are India's digital money rails; most aren't blockchains.",
      "Crypto is taxed and regulated for anti-money-laundering, not legal tender.",
      "Consent-based data sharing is already live through account aggregators.",
    ],
    comingNext: [
      "A timeline of Indian policy",
      "How e₹ differs from UPI and crypto",
      "Updates when rules change",
    ],
  },
  {
    hub: "web3",
    section: "web3-knowledge",
    slug: "tax",
    name: "Crypto tax calculator",
    title: "Crypto tax in India, *simply*",
    summary: "30% tax plus 4% cess on gains, 1% TDS, no loss set-off — with a 'consult a CA' note.",
    lede: "India taxes crypto and other virtual digital assets (VDAs) under special rules. Use the calculator for a rough estimate, then confirm with a chartered accountant.",
    minutes: 5,
    tone: "emerald",
    sensitive: true,
    widget: "tax-calculator",
    sections: [
      {
        heading: "The main rules",
        body: "These apply to gains from transferring VDAs such as crypto and NFTs.",
        points: [
          "Gains are taxed at a flat 30%, plus 4% health and education cess (and surcharge at higher incomes).",
          "Only the cost of acquiring the asset can be deducted — no other expenses.",
          "Losses on one VDA can't be set off against gains on another, or carried forward.",
          "1% TDS is deducted on transfers above ₹10,000 in a year (₹50,000 for some taxpayers).",
        ],
      },
      {
        heading: "What TDS means for you",
        body: "TDS is not an extra tax. It's an advance deduction you can claim against your final tax bill when you file your return.",
      },
      {
        heading: "Keep records",
        body: "Save every buy and sell with date, amount and fees from each exchange and wallet. Your CA will need them.",
      },
    ],
    takeaways: [
      "30% + 4% cess on gains; no loss set-off.",
      "1% TDS is credited against your final tax.",
      "This is an estimate — consult a CA.",
    ],
    comingNext: ["Multi-trade calculator with CSV import", "Explainers updated after each Budget"],
  },
  {
    hub: "web3",
    section: "web3-knowledge",
    slug: "mining",
    name: "How mining works",
    title: "How crypto *mining* works",
    summary: "An interactive block-building animation, proof of work vs proof of stake.",
    lede: "Mining is how some blockchains agree on the next page of their record. Here's what's really going on — and why it's rarely profitable for individuals in India.",
    minutes: 7,
    tone: "sand",
    sensitive: true,
    sections: [
      {
        heading: "Building a block",
        body: "New transactions wait in a queue. A miner bundles some into a block, adds a link to the previous block, and then races to find a number that makes the block's fingerprint (its hash) meet a difficulty target.",
      },
      {
        heading: "Proof of work",
        body: "Finding that number takes trillions of guesses, so it proves real work — electricity and hardware — was spent. Bitcoin uses proof of work. Changing an old block would mean redoing all that work faster than everyone else.",
      },
      {
        heading: "Proof of stake",
        body: "Instead of burning energy, validators lock up (stake) tokens as a deposit. They're chosen to add blocks and lose part of their stake if they cheat. Ethereum switched to proof of stake in 2022, cutting its energy use dramatically.",
      },
      {
        heading: "The cost reality in India",
        body: "Modern mining needs specialised machines, cheap electricity and cooling. With Indian electricity tariffs, hardware import costs and the 30% tax on gains, home mining rarely covers its costs.",
      },
    ],
    takeaways: [
      "Mining is how proof-of-work chains agree on new blocks.",
      "Proof of stake replaces energy with a financial deposit.",
      "Home mining rarely pays in India.",
    ],
    comingNext: ["Interactive block-building animation", "Proof of work vs stake side by side"],
  },
  {
    hub: "web3",
    section: "web3-knowledge",
    slug: "glossary",
    name: "Glossary",
    title: "The Web3 *glossary*",
    summary: "Every Web3 term on the site, searchable in one place.",
    lede: "Plain-language definitions for the words you'll meet most. The full searchable glossary links every term back to the lessons that use it.",
    minutes: 4,
    tone: "linen",
    sections: [
      {
        heading: "Address",
        body: "A public identifier you share to receive tokens, like an account number.",
      },
      { heading: "Airdrop", body: "Free tokens sent to wallets. Often used as bait in scams." },
      { heading: "Gas fee", body: "The fee paid to the network to process a transaction." },
      {
        heading: "Seed phrase",
        body: "12 or 24 words that restore a wallet. Whoever has it owns the funds.",
      },
      { heading: "Stablecoin", body: "A token designed to keep a steady value against a currency." },
      {
        heading: "VDA",
        body: "Virtual digital asset — the Indian legal term covering crypto and NFTs for tax.",
      },
    ],
    takeaways: ["Learn the words, and the scams get easier to spot."],
    comingNext: ["Search across every term", "Hindi and Gujarati definitions", "Links into every lesson"],
  },
];

/** Web3 Knowledge order: the four foundations first, then the existing guides. */
export const web3Topics: Topic[] = [
  web3Extra[0], // what is Web3
  web3Core[0], // basics
  web3Extra[1], // why it matters
  web3Extra[2], // earning
  ...web3Core.slice(1),
];

export { aiTopics };

export const topicsByHub: Record<Hub, Topic[]> = { ai: aiTopics, web3: web3Topics };

export function topicsInSection(section: SectionKey) {
  return [...aiTopics, ...web3Topics].filter((t) => t.section === section);
}

export function getTopic(hub: Hub, slug: string) {
  return topicsByHub[hub].find((t) => t.slug === slug);
}

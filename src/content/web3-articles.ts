import type { Topic } from "./topics";

/** The four Web3 foundation articles (the rest live in topics.ts). */
export const web3Extra: Topic[] = [
  {
    hub: "web3",
    section: "web3-knowledge",
    slug: "what-is-web3",
    name: "What is Web3?",
    title: "What *is* Web3?",
    summary: "Web1 let us read, Web2 let us post, Web3 lets us own — the idea in one page.",
    lede: "Web3 is a simple idea with a lot of jargon around it: an internet where people can own digital things and prove it, without a company in the middle.",
    minutes: 6,
    tone: "linen",
    sensitive: true,
    sections: [
      {
        heading: "Web1, Web2, Web3",
        body: "Web1 (1990s) was read-only pages. Web2 (social media, apps) let everyone create — but platforms own the data and accounts. Web3 adds ownership: your assets and identity live on shared blockchains, controlled by your keys.",
      },
      {
        heading: "The building blocks",
        body: "Blockchains (shared records), wallets (your keys), tokens (digital assets) and smart contracts (programs that run on the blockchain).",
      },
      {
        heading: "Where it's real today",
        body: "Payments and stablecoins, tokenised assets like bonds and gold, digital collectibles and some identity and supply-chain projects. Much of the rest is still experimental.",
      },
      {
        heading: "In India",
        body: "Crypto isn't legal tender but isn't banned; it's taxed and exchanges must register with FIU-IND. Meanwhile, the RBI's Digital Rupee tests some similar ideas inside the regulated system.",
      },
    ],
    takeaways: [
      "Web3 = read, write and own.",
      "Keys, not companies, control your assets.",
      "Useful in parts; much is still experimental.",
    ],
    comingNext: ["Animated explainer: Web1 to Web3", "Glossary links throughout"],
  },
  {
    hub: "web3",
    section: "web3-knowledge",
    slug: "why-web3-matters",
    name: "Why Web3 matters",
    title: "Why Web3 *matters*",
    summary:
      "Ownership, programmable money and open finance — why governments, banks and builders take it seriously.",
    lede: "Ignore the price headlines for a moment. The underlying technology is changing how money and ownership can work — that's why it's worth understanding.",
    minutes: 7,
    tone: "mint",
    sensitive: true,
    sections: [
      {
        heading: "Programmable money",
        body: "Smart contracts let money move automatically when conditions are met — escrow without a middleman, instant settlement, payments that split themselves.",
      },
      {
        heading: "Tokenisation of real assets",
        body: "Banks and asset managers worldwide are testing bonds, funds and property as tokens, so they can be split, moved and settled faster.",
      },
      {
        heading: "Central banks are paying attention",
        body: "Many central banks, including the RBI with the Digital Rupee, are exploring digital currencies — borrowing ideas from Web3 inside regulated systems.",
      },
      {
        heading: "And why caution matters",
        body: "Scams, hacks and wild price swings are real. Understanding the technology helps you separate genuine innovation from hype.",
      },
    ],
    takeaways: [
      "The technology matters more than the prices.",
      "Tokenisation and digital currencies are being tested by real institutions.",
      "Understanding protects you from hype and scams.",
    ],
    comingNext: ["Case studies: tokenised bonds and gold", "Digital Rupee vs crypto vs UPI"],
  },
  {
    hub: "web3",
    section: "web3-knowledge",
    slug: "earning-with-web3",
    name: "Earning with Web3",
    title: "How people *earn* with Web3",
    summary:
      "Careers, building, freelancing and creating — the honest paths, plus the risks and tax rules of investing.",
    lede: "Most people who earn steadily from Web3 do it by working in it — building, writing, designing, auditing — not by trading. Here are the honest paths.",
    minutes: 8,
    tone: "emerald",
    sensitive: true,
    sections: [
      {
        heading: "Work in the industry",
        body: "Blockchain developers, smart-contract auditors, product managers, community managers, compliance and tax specialists, writers and designers are hired by Web3 companies — many remote.",
      },
      {
        heading: "Freelance and create",
        body: "Explainer content in Indian languages, design, research, community moderation and bug bounties (finding security flaws for a reward) are common entry points.",
      },
      {
        heading: "If you choose to invest",
        body: "Investing in crypto is legal in India but risky and heavily taxed: 30% on gains plus cess, 1% TDS on transfers, and losses can't be set off. Prices can fall to zero.",
        points: [
          "Never invest money you can't afford to lose.",
          "Use FIU-registered exchanges.",
          "Keep records for your CA.",
        ],
      },
      {
        heading: "Red flags",
        body: "Guaranteed returns, “double your crypto”, referral pyramids, and anyone asking for your seed phrase. These are scams, every time.",
      },
    ],
    takeaways: [
      "Working in Web3 is the steadiest way to earn from it.",
      "Investing is risky and taxed at 30% + TDS.",
      "Guaranteed returns are always a scam.",
    ],
    comingNext: ["Web3 career map", "Bug-bounty starter guide"],
  },
];

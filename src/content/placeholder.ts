/**
 * Phase 1 placeholder content. Everything here moves into Payload CMS in
 * Phase 2; items marked `placeholder: true` must be replaced with the client's
 * real copy before launch.
 */

export type UpdateTeaser = {
  slug: string;
  title: string;
  category: string;
  minutes: number;
  hub: "ai" | "web3";
  placeholder: true;
};

/** Sample article shapes for the "Latest daily updates" strip. */
export const updates: UpdateTeaser[] = [
  {
    slug: "what-an-ai-agent-actually-is",
    title: "What an AI agent actually is, explained in five minutes",
    category: "AI Knowledge",
    minutes: 5,
    hub: "ai",
    placeholder: true,
  },
  {
    slug: "ai-for-small-shops",
    title: "Three ways a kirana or small retailer can use AI this month",
    category: "AI in your field",
    minutes: 6,
    hub: "ai",
    placeholder: true,
  },
  {
    slug: "digital-rupee-vs-upi",
    title: "Digital Rupee vs UPI: what is actually different for you",
    category: "Web3 in India",
    minutes: 7,
    hub: "web3",
    placeholder: true,
  },
];

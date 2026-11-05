import type { Hub } from "./topics";

/**
 * Video lesson playlists for the AI and Web3 hubs.
 *
 * Videos arrive later. To publish one, set `video` on the lesson:
 *   { kind: "file", src: "https://…/lesson.mp4", poster?: "…" }  — self-hosted / Bunny / Mux URL
 *   { kind: "youtube", id: "VIDEO_ID" }                             — embedded via youtube-nocookie.com
 * Lessons without a video show "Video coming soon".
 */

export type LessonVideo = { kind: "file"; src: string; poster?: string } | { kind: "youtube"; id: string };

export type Lesson = {
  id: string;
  title: string;
  summary: string;
  /** e.g. "8:30" — shown once the video exists. */
  duration?: string;
  video?: LessonVideo;
};

export const lessons: Record<Hub, Lesson[]> = {
  ai: [
    {
      id: "ai-01",
      title: "What AI really is",
      summary: "Patterns, not magic — the one idea behind every AI tool.",
    },
    {
      id: "ai-02",
      title: "How machine learning is built",
      summary: "Data, training, testing and deployment, without code.",
    },
    {
      id: "ai-03",
      title: "How chat assistants answer",
      summary: "Tokens, context and why AI sometimes makes things up.",
    },
    {
      id: "ai-04",
      title: "Prompting that works",
      summary: "Context, examples and format — with live demos.",
    },
    {
      id: "ai-05",
      title: "Choosing the right AI tool",
      summary: "A tour of the market by job: writing, images, video, code.",
    },
    {
      id: "ai-06",
      title: "Free AI on your own laptop",
      summary: "Running open models locally, step by step.",
    },
    {
      id: "ai-07",
      title: "Your first AI agent",
      summary: "Build a simple email-assistant agent with limits.",
    },
    {
      id: "ai-08",
      title: "Trading agents on paper money",
      summary: "How trading systems are built and tested — education only.",
    },
  ],
  web3: [
    {
      id: "w3-01",
      title: "Web3 in ten minutes",
      summary: "Web1, Web2, Web3 — and what ownership online means.",
    },
    {
      id: "w3-02",
      title: "Blockchains explained",
      summary: "Blocks, chains and why the past is hard to change.",
    },
    {
      id: "w3-03",
      title: "Wallets and seed phrases",
      summary: "Keys, not coins — and the one rule that keeps you safe.",
    },
    {
      id: "w3-04",
      title: "Spotting Web3 scams",
      summary: "Fake airdrops, pump-and-dumps and recovery-agent scams.",
    },
    { id: "w3-05", title: "The Digital Rupee and UPI", summary: "India's digital money rails, compared." },
    {
      id: "w3-06",
      title: "Crypto tax in India",
      summary: "30% + cess, 1% TDS and what to keep for your CA.",
    },
  ],
};

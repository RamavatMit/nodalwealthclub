import type { Metadata } from "next";
import { ArticleGrid, NewsGrid } from "@/components/hub/cards";
import { KnowledgeHub } from "@/components/hub/knowledge-hub";
import { LessonPlaylist } from "@/components/hub/lesson-playlist";
import { lessons } from "@/content/lessons";
import { newsFor } from "@/content/news";
import { aiTopics } from "@/content/topics";

export const metadata: Metadata = {
  title: "AI",
  description:
    "AI explained for India: how AI works, the best tools (free, low-cost, Chinese and more), AI agents and trading agents, daily AI news and video lessons. Education only.",
};

const inSection = (s: string) => aiTopics.filter((t) => t.section === s);

export default function AiHubPage() {
  return (
    <KnowledgeHub
      eyebrow="AI hub"
      title="Understand AI, then *use* it"
      lede="From how AI works to the tools worth your time, agents that act for you, daily news and video lessons — in plain language."
      sections={[
        {
          id: "basics",
          label: "AI Basics",
          eyebrow: "Basic knowledge",
          title: "How AI *works*",
          lede: "Understand how AI and machine learning are built and how tools give you answers — no coding required.",
          children: <ArticleGrid topics={inSection("basics")} />,
        },
        {
          id: "tools",
          label: "AI Tools",
          eyebrow: "AI tools",
          title: "The tools worth your *time*",
          lede: "What's in the market, what's free or cheap, where to get free APIs, the Chinese players — and how people earn with them.",
          children: <ArticleGrid topics={inSection("tools")} />,
        },
        {
          id: "agents",
          label: "Agents",
          eyebrow: "AI agents",
          title: "Agents that *act*",
          lede: "What agents are, how they work, how to build one — and the honest truth about trading with them, profit and loss included.",
          children: <ArticleGrid topics={inSection("agents")} />,
        },
        {
          id: "news",
          label: "Latest news",
          eyebrow: "Daily AI news",
          title: "What changed in AI *today*",
          lede: "Short, sourced and reviewed by a person. Open any card for the full story.",
          children: <NewsGrid items={newsFor("ai")} />,
        },
        {
          id: "lessons",
          label: "Lessons",
          eyebrow: "Video lessons",
          title: "Learn AI, lesson by *lesson*",
          lede: "A step-by-step video playlist, from the basics to building your first agent.",
          children: <LessonPlaylist lessons={lessons.ai} title="AI lessons" />,
        },
      ]}
    />
  );
}

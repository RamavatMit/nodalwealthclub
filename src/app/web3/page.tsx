import type { Metadata } from "next";
import { ArticleGrid, NewsGrid } from "@/components/hub/cards";
import { KnowledgeHub } from "@/components/hub/knowledge-hub";
import { LessonPlaylist } from "@/components/hub/lesson-playlist";
import { lessons } from "@/content/lessons";
import { newsFor } from "@/content/news";
import { web3Topics } from "@/content/topics";

export const metadata: Metadata = {
  title: "Web3",
  description:
    "Web3 explained for India: what it is, the basics, why it matters, how people earn with it, safety, tax, daily Web3 news and video lessons. Education only.",
};

export default function Web3HubPage() {
  return (
    <KnowledgeHub
      eyebrow="Web3 hub"
      title="Web3, made *plain*"
      lede="What Web3 is, why it matters, how people earn with it and how to stay safe — plus daily news and video lessons."
      sections={[
        {
          id: "knowledge",
          label: "Web3 Knowledge",
          eyebrow: "Web3 knowledge",
          title: "Web3 from the *ground* up",
          lede: "Start with what Web3 is and why it matters, then how people earn with it — and the safety, tax and India guides every beginner needs.",
          children: <ArticleGrid topics={web3Topics} />,
        },
        {
          id: "news",
          label: "Latest news",
          eyebrow: "Daily Web3 news",
          title: "What changed in Web3 *today*",
          lede: "Regulation, the Digital Rupee, tax and technology — explained. Open any card for the full story.",
          children: <NewsGrid items={newsFor("web3")} />,
        },
        {
          id: "lessons",
          label: "Lessons",
          eyebrow: "Video lessons",
          title: "Learn Web3, lesson by *lesson*",
          lede: "A step-by-step video playlist: blockchains, wallets, safety, the Digital Rupee and tax.",
          children: <LessonPlaylist lessons={lessons.web3} title="Web3 lessons" />,
        },
      ]}
    />
  );
}

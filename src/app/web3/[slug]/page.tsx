import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopicPage } from "@/components/topic/topic-page";
import { getTopic } from "@/content/topics";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const topic = getTopic("web3", (await params).slug);
  return topic ? { title: topic.name, description: topic.summary } : {};
}

export default async function Page({ params }: Props) {
  const topic = getTopic("web3", (await params).slug);
  if (!topic) notFound();
  return <TopicPage topic={topic} />;
}

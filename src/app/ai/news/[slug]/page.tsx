import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsPage } from "@/components/hub/news-page";
import { getNews } from "@/content/news";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = getNews("ai", (await params).slug);
  return item ? { title: item.title, description: item.summary } : {};
}

export default async function Page({ params }: Props) {
  const item = getNews("ai", (await params).slug);
  if (!item) notFound();
  return <NewsPage item={item} />;
}

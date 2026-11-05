import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPage } from "@/components/product/product-page";
import { getProduct } from "@/content/products";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct((await params).slug);
  return product ? { title: product.name, description: product.pitch } : {};
}

export default async function Page({ params }: Props) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  return <ProductPage product={product} />;
}

import type { Metadata } from "next";
import { ViewTransition } from "react";
import { Reveal, ScanReveal, TransitionLink, WordRise } from "@/components/motion";
import { ButtonLink } from "@/components/ui/button";
import { Placeholder } from "@/components/ui/education-notice";
import { MotionVisual } from "@/components/ui/motion-visual";
import { products } from "@/content/products";
import { CARD_MORPH_SHARE, cardMorphName } from "@/lib/vt-name";

export const metadata: Metadata = {
  title: "Products",
  description: "Tools and courses built by Nodal Wealth Club. Members claim one free.",
};

export default function ProductsPage() {
  return (
    <>
      <section className="border-line border-b">
        <div className="frame gutter grid gap-8 py-20 md:py-28 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-6">Products</p>
            <WordRise text="Learning you can *use*" className="text-hero" />
          </div>
          <Reveal delay={0.35} className="lg:col-span-4">
            <p className="text-ink-muted text-lg">
              Tools and courses built by the club to put the learning to work. Members claim one free.
            </p>
            <p className="mt-4">
              <Placeholder>Product details pending</Placeholder>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper">
        <div className="frame gutter py-16 md:py-24">
          <ul className="grid gap-x-6 gap-y-14 md:grid-cols-2">
            {products.map((p, i) => (
              <Reveal as="li" key={p.slug} id={p.slug} delay={(i % 2) * 0.12} className="scroll-mt-28">
                <TransitionLink
                  href={`/products/${p.slug}`}
                  direction="open"
                  data-tilt="6"
                  className="group block transition-[scale] duration-300 active:scale-[0.985]"
                >
                  <ScanReveal delay={(i % 2) * 0.15}>
                    <div className="relative overflow-hidden rounded-xs">
                      <ViewTransition
                        name={cardMorphName(`/products/${p.slug}`)}
                        share={CARD_MORPH_SHARE}
                        default="none"
                      >
                        <div>
                          <MotionVisual
                            tone={p.tone}
                            seed={i + 3}
                            className="ease-out-quart aspect-[16/11] transition-transform duration-700 group-hover:scale-[1.04]"
                          />
                        </div>
                      </ViewTransition>
                      <span className="bg-paper/90 absolute top-4 left-4 rounded-xs px-2 py-1 font-mono text-[0.68rem] tracking-wider uppercase">
                        {p.tag}
                        {p.freeWithMembership && " · Free for members"}
                      </span>
                      <span
                        aria-hidden
                        className="bg-forest text-paper ease-out-quart absolute right-4 bottom-4 grid size-12 translate-y-3 place-items-center rounded-xs opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                      >
                        ↗
                      </span>
                    </div>
                  </ScanReveal>
                  <div className="mt-5 flex items-baseline justify-between gap-4">
                    <h2 className="display group-hover:text-forest text-3xl transition-colors md:text-4xl">
                      {p.name}
                    </h2>
                    <span className="text-ink-muted font-mono text-xs">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <p className="text-ink-muted mt-2 max-w-md">{p.pitch}</p>
                </TransitionLink>
              </Reveal>
            ))}
          </ul>
          <div className="mt-16 flex flex-wrap gap-3">
            <ButtonLink href="/membership">See membership</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}

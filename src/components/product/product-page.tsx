import { ViewTransition } from "react";
import { Reveal, TransitionLink } from "@/components/motion";
import { ButtonLink } from "@/components/ui/button";
import { EducationNotice, Placeholder } from "@/components/ui/education-notice";
import { MotionVisual } from "@/components/ui/motion-visual";
import { Section, SectionHeading } from "@/components/ui/section";
import { products, type Product } from "@/content/products";
import { cn } from "@/lib/utils";
import { CARD_MORPH_SHARE, cardMorphName } from "@/lib/vt-name";
import { ProductHero } from "./product-hero";
import { StickySteps } from "./sticky-steps";

/** Product detail page, following the plan's product layout. */
export function ProductPage({ product }: { product: Product }) {
  const index = products.findIndex((p) => p.slug === product.slug);
  const others = products.filter((p) => p.slug !== product.slug);
  const headline = product.headline.replaceAll("*", "");
  const italic = product.headline.match(/\*(.+?)\*/)?.[1];

  return (
    <article>
      <div className="frame gutter py-5">
        <TransitionLink
          href={`/products#${product.slug}`}
          direction="close"
          className="text-ink-muted hover:text-ink inline-flex items-center gap-2 text-sm"
        >
          <span aria-hidden>←</span> All products
        </TransitionLink>
      </div>

      {/* Hero video that shrinks into a framed player */}
      <ProductHero
        tone={product.tone}
        seed={index + 3}
        morphName={cardMorphName(`/products/${product.slug}`)}
      >
        <p className="mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.14em] uppercase">
          {product.tag} <Placeholder className="bg-paper/90">Placeholder product</Placeholder>
        </p>
        <h1 className="display text-hero max-w-4xl" aria-label={headline}>
          {product.headline
            .split(/\*(.+?)\*/)
            .map((part, i) => (part === italic ? <em key={i}>{part}</em> : <span key={i}>{part}</span>))}
        </h1>
      </ProductHero>

      {/* Intro + CTA */}
      <Section innerClassName="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-4">{product.name}</p>
          <p className="display text-3xl leading-snug md:text-4xl">{product.pitch}</p>
        </div>
        <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
          {product.freeWithMembership && <ButtonLink href="/membership">Free with membership</ButtonLink>}
          <ButtonLink
            href="#pricing"
            variant={product.freeWithMembership ? "outline" : "primary"}
            arrow={false}
          >
            See pricing
          </ButtonLink>
        </div>
        {product.sensitive && <EducationNotice className="lg:col-span-12" />}
      </Section>

      {/* What it does */}
      <Section tone="paper" aria-labelledby="does-title">
        <SectionHeading id="does-title" eyebrow="What it does" title={`Three things, *done* well`} />
        <ul className="border-line bg-line mt-12 grid gap-px overflow-hidden rounded-xs border md:grid-cols-3">
          {product.whatItDoes.map((w, i) => (
            <Reveal as="li" key={w.title} delay={i * 0.1} className="bg-paper p-6 md:p-8">
              <MotionVisual tone={product.tone} seed={i + 7} className="mb-6 aspect-[16/10]" />
              <h3 className="display text-2xl">{w.title}</h3>
              <p className="text-ink-muted mt-2">{w.body}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* How it works */}
      <Section aria-labelledby="how-title">
        <SectionHeading id="how-title" eyebrow="How it works" title="Step by *step*" />
        <div className="mt-12">
          <StickySteps steps={product.howItWorks} tone={product.tone} />
        </div>
      </Section>

      {/* How we built it */}
      <Section tone="sand" aria-labelledby="built-title">
        <SectionHeading id="built-title" eyebrow="How we built it" title="The story *behind* it" />
        <ol className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          <span aria-hidden className="bg-ink/20 absolute top-[0.6rem] right-0 left-0 hidden h-px md:block" />
          {product.howWeBuilt.map((b, i) => (
            <Reveal as="li" key={b.title} delay={i * 0.12} className="relative">
              <span
                aria-hidden
                className="border-forest bg-sand relative block size-5 rounded-full border-2"
              />
              <p className="eyebrow mt-5">{b.when}</p>
              <h3 className="display mt-2 text-2xl">{b.title}</h3>
              <p className="text-ink-muted mt-2">{b.body}</p>
            </Reveal>
          ))}
        </ol>
        <Reveal className="mt-14">
          <p className="eyebrow mb-3">Built with</p>
          <ul className="flex flex-wrap gap-2">
            {product.stack.map((s) => (
              <li key={s} className="border-ink/15 bg-paper rounded-xs border px-3 py-1.5 font-mono text-xs">
                {s}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* Pricing */}
      <Section id="pricing" tone="paper" aria-labelledby="pricing-title">
        <SectionHeading
          id="pricing-title"
          eyebrow="Pricing"
          title="Simple, in *rupees*"
          lede={
            <>
              Prices include GST. <Placeholder>Prices pending</Placeholder>
            </>
          }
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {product.pricing.map((plan, i) => (
            <Reveal
              key={plan.name}
              delay={i * 0.1}
              className={cn(
                "flex flex-col rounded-xs border p-6 md:p-10",
                plan.featured ? "border-forest bg-ivory" : "border-line bg-paper",
              )}
            >
              <h3 className="display text-3xl">{plan.name}</h3>
              <p className="mt-6 flex items-baseline gap-2">
                <span className="text-ink font-mono text-5xl">{plan.price}</span>
                <span className="text-ink-muted">{plan.period}</span>
              </p>
              <ul className="mt-6 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      aria-hidden
                      className="text-jade mt-1 shrink-0"
                    >
                      <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              {plan.price === "Free" ? (
                <ButtonLink href="/membership" className="mt-10">
                  Join to get it free
                </ButtonLink>
              ) : (
                <button
                  type="button"
                  disabled
                  aria-describedby="product-checkout-note"
                  className="bg-forest text-paper mt-10 inline-flex min-h-12 items-center justify-center rounded-xs px-5 opacity-60"
                >
                  Buy {product.name}
                </button>
              )}
            </Reveal>
          ))}
        </div>
        <p id="product-checkout-note" className="text-ink-muted mt-6 text-sm">
          Checkout through Razorpay opens in Phase 3.
        </p>
      </Section>

      {/* FAQ */}
      <Section aria-labelledby="pfaq-title" innerClassName="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading id="pfaq-title" eyebrow="FAQ" title="Good *questions*" />
        </div>
        <div className="divide-line border-line divide-y border-y lg:col-span-8">
          {product.faq.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden
                  className="border-line grid size-8 shrink-0 place-items-center rounded-xs border transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="text-ink-muted mt-4 max-w-2xl">{item.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* More products */}
      <nav aria-label="More products" className="border-line bg-paper border-t">
        <div className="frame gutter py-16">
          <p className="eyebrow mb-8">More products</p>
          <ul className="grid gap-4 sm:grid-cols-3">
            {others.map((p) => (
              <li key={p.slug}>
                <TransitionLink href={`/products/${p.slug}`} direction="open" className="group block">
                  <ViewTransition
                    name={cardMorphName(`/products/${p.slug}`)}
                    share={CARD_MORPH_SHARE}
                    default="none"
                  >
                    <div className="overflow-hidden rounded-xs">
                      <MotionVisual
                        tone={p.tone}
                        seed={products.indexOf(p) + 3}
                        className="ease-out-quart aspect-[4/3] transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                  </ViewTransition>
                  <p className="display group-hover:text-forest mt-4 text-2xl">{p.name}</p>
                  <p className="text-ink-muted text-sm">{p.pitch}</p>
                </TransitionLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </article>
  );
}

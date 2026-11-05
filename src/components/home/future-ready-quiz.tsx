"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { Button, ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PathId = "foundations" | "ai-builder" | "web3-safe" | "agentic";

type Option = { label: string; score: number; leans?: PathId };
type Question = { q: string; options: Option[] };

const QUESTIONS: Question[] = [
  {
    q: "How often do you use AI tools like ChatGPT, Gemini or Claude?",
    options: [
      { label: "Never or almost never", score: 0, leans: "foundations" },
      { label: "A few times a month", score: 1 },
      { label: "Most days, for work or study", score: 2, leans: "ai-builder" },
      { label: "I build things with them", score: 3, leans: "agentic" },
    ],
  },
  {
    q: "What do you know about crypto wallets?",
    options: [
      { label: "Nothing yet", score: 0, leans: "web3-safe" },
      { label: "I've heard of seed phrases", score: 1, leans: "web3-safe" },
      { label: "I've used an exchange app", score: 2 },
      { label: "I manage my own wallet", score: 3 },
    ],
  },
  {
    q: "What do you most want from the next year?",
    options: [
      { label: "Understand what everyone is talking about", score: 1, leans: "foundations" },
      { label: "Use AI to do my job or business better", score: 2, leans: "ai-builder" },
      { label: "Learn Web3 without getting scammed", score: 2, leans: "web3-safe" },
      { label: "Learn how automated trading systems work", score: 3, leans: "agentic" },
    ],
  },
  {
    q: "Could you explain how UPI and the Digital Rupee differ?",
    options: [
      { label: "No", score: 0, leans: "foundations" },
      { label: "Roughly", score: 1 },
      { label: "Yes, clearly", score: 3 },
    ],
  },
  {
    q: "How much time can you give each week?",
    options: [
      { label: "Under 1 hour", score: 0, leans: "foundations" },
      { label: "1–3 hours", score: 1 },
      { label: "3+ hours", score: 2 },
    ],
  },
];

const MAX = QUESTIONS.reduce((s, q) => s + Math.max(...q.options.map((o) => o.score)), 0);

const PATHS: Record<PathId, { name: string; body: string; href: string }> = {
  foundations: {
    name: "Foundations",
    body: "Start with how money is changing: AI basics, UPI to Digital Rupee, and how to stay safe online. Calm, jargon-free, 15 minutes a day.",
    href: "/ai",
  },
  "ai-builder": {
    name: "AI in your field",
    body: "Practical AI for your work: tools that matter in India, prompt lessons you can copy, and the skills employers are hiring for.",
    href: "/ai",
  },
  "web3-safe": {
    name: "Web3, safely",
    body: "Wallets, stablecoins and tokenisation explained, with India's tax rules and a scam-spotting guide before anything else.",
    href: "/web3",
  },
  agentic: {
    name: "Agentic systems",
    body: "How AI trading agents are designed, back-tested and risk-limited — built and tested on paper money only. Education, never signals.",
    href: "/ai",
  },
};

export function FutureReadyQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Option[]>([]);

  const done = step >= QUESTIONS.length;
  const score = Math.round((answers.reduce((s, a) => s + a.score, 0) / MAX) * 100);
  const path: PathId = (() => {
    const tally: Partial<Record<PathId, number>> = {};
    for (const a of answers) if (a.leans) tally[a.leans] = (tally[a.leans] ?? 0) + 1;
    const top = Object.entries(tally).sort((a, b) => b[1] - a[1])[0]?.[0] as PathId | undefined;
    return top ?? "foundations";
  })();

  const choose = (o: Option) => {
    setAnswers((prev) => [...prev.slice(0, step), o]);
    setStep((s) => s + 1);
  };

  const slide = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
    transition: { duration: 0.35, ease: [0.25, 1, 0.5, 1] as const },
  };

  return (
    <div className="border-line bg-paper rounded-xs border">
      <div className="border-line flex items-center justify-between border-b px-5 py-3 md:px-8">
        <p className="eyebrow">Future-ready score</p>
        <p className="text-ink-muted font-mono text-xs" aria-live="polite">
          {done ? "Result" : `${step + 1} / ${QUESTIONS.length}`}
        </p>
      </div>
      <div className="bg-line h-px">
        <div
          className="bg-forest ease-out-quart h-px origin-left transition-transform duration-500"
          style={{ transform: `scaleX(${Math.min(step, QUESTIONS.length) / QUESTIONS.length})` }}
        />
      </div>

      <div className="min-h-[24rem] overflow-hidden p-5 md:p-8">
        <AnimatePresence mode="wait" initial={false}>
          {!done ? (
            <motion.fieldset key={step} {...slide}>
              <legend className="display text-2xl leading-snug md:text-3xl">{QUESTIONS[step].q}</legend>
              <div className="mt-6 grid gap-2.5">
                {QUESTIONS[step].options.map((o) => (
                  <button
                    key={o.label}
                    type="button"
                    onClick={() => choose(o)}
                    className={cn(
                      "border-line bg-ivory hover:border-forest hover:bg-sand/50 flex min-h-12 items-center justify-between rounded-xs border px-4 py-3 text-left transition-colors duration-200",
                      answers[step]?.label === o.label && "border-forest",
                    )}
                  >
                    <span>{o.label}</span>
                    <span aria-hidden className="text-ink-muted">
                      →
                    </span>
                  </button>
                ))}
              </div>
              {step > 0 && (
                <Button variant="ghost" className="mt-5 text-sm" onClick={() => setStep((s) => s - 1)}>
                  ← Back
                </Button>
              )}
            </motion.fieldset>
          ) : (
            <motion.div key="result" {...slide} className="grid gap-8 md:grid-cols-[auto_1fr] md:items-start">
              <div className="flex items-baseline gap-1">
                <span className="display text-forest text-7xl md:text-8xl">{score}</span>
                <span className="text-ink-muted font-mono text-sm">/100</span>
              </div>
              <div>
                <p className="eyebrow">Your suggested path</p>
                <h3 className="display mt-2 text-3xl">{PATHS[path].name}</h3>
                <p className="text-ink-muted mt-3">{PATHS[path].body}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <ButtonLink href={PATHS[path].href}>Start this path</ButtonLink>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setAnswers([]);
                      setStep(0);
                    }}
                  >
                    Retake
                  </Button>
                </div>
                <div className="border-line mt-8 border-t pt-6">
                  <p className="text-ink-muted mb-3 text-sm">Get the weekly guide for this path by email.</p>
                  <NewsletterForm source="quiz" path={path} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

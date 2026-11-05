import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Nodal Wealth Club is education only. It is not investment advice and not a SEBI-registered adviser.",
};

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer" updated="9 October 2026" current="/legal/disclaimer">
      <h2>Education only</h2>
      <p>
        Everything on Nodal Wealth Club — articles, courses, products, tools, live sessions, member chat and
        the paper-trading arena — is for education. Nothing here is investment advice, research, or a
        recommendation to buy, sell or hold any security, crypto asset, token or other financial product.
      </p>

      <h2>Not registered with SEBI</h2>
      <p>
        Nodal Wealth Club is not registered with the Securities and Exchange Board of India as an Investment
        Adviser or a Research Analyst. We do not give buy/sell calls, price targets or stock or token tips,
        and we do not make claims about returns or performance.
      </p>

      <h2>Market data in lessons</h2>
      <p>
        When lessons use price data, it is historical or made-up data used to explain a concept. It is never
        live or recent data presented as a signal.
      </p>

      <h2>Trading and AI agents</h2>
      <p>
        Our material on trading systems and AI agents explains how they work and how to test them on paper
        money. Automated trading can lose money quickly. Back-tested or paper-trading results do not predict
        real results.
      </p>

      <h2>Crypto assets</h2>
      <p>
        Crypto assets are not legal tender in India and are largely unregulated. Their value can fall to zero.
        Gains are taxed at 30% (plus cess) and transfers can attract 1% TDS. Tax rules change; consult a
        chartered accountant for your situation.
      </p>

      <h2>Your decisions</h2>
      <p>
        You are responsible for your own financial decisions. Before investing, do your own research and
        consult a SEBI-registered investment adviser or other qualified professional.
      </p>
    </LegalPage>
  );
}

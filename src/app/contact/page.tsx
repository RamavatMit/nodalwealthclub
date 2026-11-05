import type { Metadata } from "next";
import { Reveal, WordRise } from "@/components/motion";
import { Placeholder } from "@/components/ui/education-notice";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Nodal Wealth Club.",
};

const CHANNELS = [
  { label: "General questions", value: "Email address", note: "We reply within two working days." },
  { label: "Membership and billing", value: "Billing email", note: "Include your payment reference." },
  {
    label: "Privacy and grievances",
    value: "Grievance officer email",
    note: "For DPDP requests and complaints.",
  },
  {
    label: "Security issues",
    value: "security@ address",
    note: "See security.txt for responsible disclosure.",
  },
];

export default function ContactPage() {
  return (
    <div className="frame gutter py-20 md:py-28">
      <p className="eyebrow mb-6">Contact</p>
      <WordRise text="Talk to a *person*" className="text-hero" />
      <p className="text-ink-muted mt-8 max-w-xl text-lg">
        We never contact you first asking for money, OTPs or wallet details. If someone claiming to be us
        does, it&apos;s a scam — please report it.
      </p>
      <ul className="border-line bg-line mt-14 grid gap-px overflow-hidden rounded-xs border md:grid-cols-2">
        {CHANNELS.map((c, i) => (
          <Reveal as="li" key={c.label} delay={i * 0.08} className="bg-paper p-6 md:p-8">
            <p className="eyebrow">{c.label}</p>
            <p className="mt-4">
              <Placeholder>{c.value}</Placeholder>
            </p>
            <p className="text-ink-muted mt-3 text-sm">{c.note}</p>
          </Reveal>
        ))}
      </ul>
      <p className="text-ink-muted mt-10 text-sm">
        Registered address: <Placeholder>Registered business address</Placeholder>
      </p>
    </div>
  );
}

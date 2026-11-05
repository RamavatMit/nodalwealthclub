"use client";

import { useId, useState } from "react";

const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

function Field({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block font-medium">
        {label}
      </label>
      <p id={`${id}-hint`} className="text-ink-muted text-sm">
        {hint}
      </p>
      <div className="border-line bg-paper focus-within:border-forest mt-2 flex items-center rounded-xs border">
        <span aria-hidden className="text-ink-muted pl-4 font-mono">
          ₹
        </span>
        <input
          id={id}
          aria-describedby={`${id}-hint`}
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/[^\d.]/g, ""))}
          className="min-h-12 w-full bg-transparent px-2 font-mono text-lg outline-none"
        />
      </div>
    </div>
  );
}

/**
 * Single-trade estimate of Indian VDA tax: 30% on gains + 4% cess, 1% TDS on
 * the sale value. Deliberately simple; surcharge and multi-trade netting are
 * out of scope and called out in the notes.
 */
export function TaxCalculator() {
  const [sale, setSale] = useState("150000");
  const [cost, setCost] = useState("100000");

  const saleN = Number(sale) || 0;
  const costN = Number(cost) || 0;
  const gain = saleN - costN;
  const taxable = Math.max(0, gain);
  const tax = taxable * 0.3;
  const cess = tax * 0.04;
  const total = tax + cess;
  const tds = saleN * 0.01;

  const rows = [
    { label: "Gain", value: gain < 0 ? `${inr(gain)} (loss)` : inr(gain) },
    { label: "Tax at 30%", value: inr(tax) },
    { label: "Cess at 4% of tax", value: inr(cess) },
  ];

  return (
    <section aria-labelledby="calc-title" className="border-line bg-paper rounded-xs border">
      <div className="border-line flex items-center justify-between border-b px-5 py-3 md:px-8">
        <h2 id="calc-title" className="eyebrow">
          Tax estimate · one trade
        </h2>
        <span className="text-ink-muted font-mono text-xs">FY rules as of Oct 2026</span>
      </div>
      <div className="grid gap-8 p-5 md:grid-cols-2 md:p-8">
        <div className="space-y-6">
          <Field
            label="Sale value"
            hint="What you received when you sold or swapped."
            value={sale}
            onChange={setSale}
          />
          <Field
            label="Cost of acquisition"
            hint="What you paid to buy it. No other costs count."
            value={cost}
            onChange={setCost}
          />
        </div>
        <div aria-live="polite">
          <dl className="divide-line border-line divide-y border-y">
            {rows.map((r) => (
              <div key={r.label} className="flex justify-between py-3">
                <dt className="text-ink-muted">{r.label}</dt>
                <dd className="font-mono">{r.value}</dd>
              </div>
            ))}
            <div className="flex items-baseline justify-between py-4">
              <dt className="font-medium">Estimated tax</dt>
              <dd className="text-forest font-mono text-3xl">{inr(total)}</dd>
            </div>
            <div className="flex justify-between py-3">
              <dt className="text-ink-muted">TDS deducted (1% of sale)</dt>
              <dd className="font-mono">{inr(tds)}</dd>
            </div>
          </dl>
          <p className="text-ink-muted mt-4 text-sm">
            {gain < 0
              ? "A loss on a VDA can't be set off against other income or gains, or carried forward."
              : "The TDS already deducted is credited against this tax when you file your return."}{" "}
            Surcharge may apply at higher incomes. This is an estimate, not tax advice — please consult a
            chartered accountant.
          </p>
        </div>
      </div>
    </section>
  );
}

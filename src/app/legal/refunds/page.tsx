import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { Placeholder } from "@/components/ui/education-notice";

export const metadata: Metadata = {
  title: "Refunds and cancellation",
  description: "How to cancel your Nodal Wealth Club membership and when refunds apply.",
};

export default function RefundsPage() {
  return (
    <LegalPage title="Refunds and cancellation" updated="9 October 2026" current="/legal/refunds">
      <h2>Cancelling membership</h2>
      <p>
        You can cancel any time from your account page. Auto-renewal stops immediately and you keep access
        until the end of the period you have already paid for.
      </p>

      <h2>Refunds on membership</h2>
      <ul>
        <li>
          New members can ask for a full refund within <Placeholder>7</Placeholder> days of their first
          payment.
        </li>
        <li>Renewals are not refunded once the new period has started, unless the law requires it.</li>
        <li>If you were charged twice or in error, we refund the extra charge in full.</li>
      </ul>

      <h2>Products</h2>
      <p>
        Digital products that you have downloaded or accessed are generally not refundable. If a product does
        not work as described, contact us within <Placeholder>14</Placeholder> days and we will fix it or
        refund you.
      </p>

      <h2>How refunds are paid</h2>
      <p>
        Refunds go back to the original payment method through Razorpay, usually within 5–7 working days after
        we approve them.
      </p>

      <h2>Contact</h2>
      <p>
        Email <Placeholder>support email</Placeholder> with your registered email address and payment
        reference.
      </p>
    </LegalPage>
  );
}

import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { Placeholder } from "@/components/ui/education-notice";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "The rules for using Nodal Wealth Club and its membership.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of use" updated="9 October 2026" current="/legal/terms">
      <p>
        These terms are an agreement between you and <Placeholder>Registered entity name</Placeholder>. By
        using the site or becoming a member you accept them.
      </p>

      <h2>1. What we provide</h2>
      <p>
        Educational content about AI, Web3 and related technologies, digital products, and a members&apos;
        club. Everything we provide is for education. It is not investment, tax or legal advice. See the{" "}
        <a href="/legal/disclaimer">Disclaimer</a>.
      </p>

      <h2>2. Your account</h2>
      <ul>
        <li>You must be 18 or older, or use the site with a parent&apos;s or guardian&apos;s consent.</li>
        <li>
          Keep your sign-in secure. Tell us at once if you think someone else has accessed your account.
        </li>
        <li>One person per account. Accounts and memberships cannot be shared or resold.</li>
      </ul>

      <h2>3. Membership and payment</h2>
      <p>
        Membership is billed in Indian rupees, including GST, through Razorpay. Recurring plans renew
        automatically until you cancel. Cancellation and refunds are covered in the{" "}
        <a href="/legal/refunds">Refunds and cancellation policy</a>.
      </p>

      <h2>4. Community rules</h2>
      <ul>
        <li>Be respectful. No harassment, hate speech or spam.</li>
        <li>
          No buy/sell calls, price targets, &ldquo;guaranteed returns&rdquo;, pump schemes, referral codes or
          paid promotions. Posts like this are removed and may lead to suspension.
        </li>
        <li>
          Never ask anyone for — or share — seed phrases, private keys, OTPs or passwords. Report anyone who
          does.
        </li>
        <li>Moderators may remove content and suspend accounts that break these rules.</li>
      </ul>

      <h2>5. Content and intellectual property</h2>
      <p>
        Our lessons, products, videos and designs belong to us or our licensors. You may use them for your own
        learning. You may not copy, resell or redistribute them.
      </p>

      <h2>6. Wallet connections</h2>
      <p>
        Connecting a wallet is optional and read-only. We never request transaction signatures, token
        approvals, seed phrases or private keys. You remain fully responsible for your own wallets and assets.
      </p>

      <h2>7. Limitation of liability</h2>
      <p>
        To the extent the law allows, we are not liable for financial decisions you make or for losses arising
        from them. Our total liability is limited to the fees you paid us in the 12 months before the claim.
      </p>

      <h2>8. Changes and governing law</h2>
      <p>
        We may update these terms and will tell members about material changes. These terms are governed by
        the laws of India; courts at <Placeholder>City</Placeholder> have jurisdiction.
      </p>
    </LegalPage>
  );
}

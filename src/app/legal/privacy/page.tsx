import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { Placeholder } from "@/components/ui/education-notice";

export const metadata: Metadata = {
  title: "Privacy notice",
  description:
    "What personal data Nodal Wealth Club collects, why, where it is stored, and your rights under India's DPDP Act.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy notice" updated="9 October 2026" current="/legal/privacy">
      <p>
        This notice explains what personal data <Placeholder>Registered entity name</Placeholder>{" "}
        (&ldquo;Nodal Wealth Club&rdquo;, &ldquo;we&rdquo;) processes, why, and the rights you have under
        India&apos;s Digital Personal Data Protection Act, 2023 and the DPDP Rules, 2025. We collect as little
        as we can.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Account data:</strong> your email address, and optionally your name, phone number, city and
          interests.
        </li>
        <li>
          <strong>Membership and payments:</strong> your plan, status, and the order, payment and subscription
          IDs our payment gateway gives us. Card, UPI and bank details stay with Razorpay; we never see or
          store them.
        </li>
        <li>
          <strong>Learning activity:</strong> lessons completed, quiz results, badges, certificates and
          paper-trading activity (virtual money only).
        </li>
        <li>
          <strong>Community:</strong> messages you post in member chat, and reports you make.
        </li>
        <li>
          <strong>Wallets (optional):</strong> the public address of any wallet you choose to connect. We read
          balances live from public blockchains and do not keep them. We never ask for, receive or store seed
          phrases or private keys.
        </li>
        <li>
          <strong>Security logs:</strong> sign-in times, device type and a hashed form of your IP address,
          used to protect your account.
        </li>
      </ul>

      <h2>Why we use it</h2>
      <p>
        To run your account and membership, deliver lessons and the club, send emails you asked for, keep the
        service secure, meet tax and legal duties, and — only with your consent — send the newsletter. We do
        not sell personal data and we do not use it for advertising.
      </p>

      <h2>Consent</h2>
      <p>
        We ask for clear consent at sign-up and for the newsletter separately. You can withdraw consent at any
        time from your account settings or by emailing us; withdrawal does not affect processing already done.
      </p>

      <h2>Where it is stored and how it is protected</h2>
      <p>
        Your data is stored in our database on a server in <Placeholder>India data centre</Placeholder>.
        Email, phone and wallet address are encrypted individually in the database. Encrypted backups are kept
        for 30 days. Access is limited to people who need it, and admin actions are logged.
      </p>

      <h2>Who we share it with</h2>
      <ul>
        <li>Razorpay (payments), our email provider (sending emails), and our video host (member videos).</li>
        <li>Authorities, only where Indian law requires it.</li>
      </ul>

      <h2>How long we keep it</h2>
      <p>
        While your account is active, and then only as long as the law requires (for example, tax records).
        When you delete your account, we delete or anonymise your data within 30 days, except where we must
        keep it.
      </p>

      <h2>Your rights</h2>
      <ul>
        <li>Access a summary of your data and download a copy.</li>
        <li>Correct or update it.</li>
        <li>Delete your account and data.</li>
        <li>Withdraw consent.</li>
        <li>Nominate someone to exercise these rights if you cannot.</li>
        <li>Raise a grievance with us, and then with the Data Protection Board of India.</li>
      </ul>

      <h2>Data breaches</h2>
      <p>
        If a breach affects your data, we will tell you and the Data Protection Board of India as the DPDP
        Rules require, explaining what happened and what you can do.
      </p>

      <h2>Contact and grievances</h2>
      <p>
        Grievance officer: <Placeholder>Name</Placeholder>, <Placeholder>email</Placeholder>. We reply within
        the time limits set by law.
      </p>
    </LegalPage>
  );
}

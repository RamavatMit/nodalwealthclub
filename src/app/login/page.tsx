import type { Metadata } from "next";
import { HubPage } from "@/components/layout/hub-page";

export const metadata: Metadata = {
  title: "Log in",
  robots: { index: false },
};

export default function LoginPage() {
  return (
    <HubPage
      eyebrow="Members"
      title="Member log in *opens* soon"
      lede="Accounts arrive with the membership launch: passwordless email codes, Google sign-in, passkeys and optional two-factor."
      status="Opening in Phase 3"
      cardsLabel="What's coming"
      cards={[
        { title: "Passwordless", body: "Sign in with a one-time code by email, Google, or a passkey." },
        {
          title: "Two-factor",
          body: "Optional authenticator-app codes for every member; required for admins.",
        },
        { title: "Your devices", body: "See where you're signed in and log out everywhere with one tap." },
      ]}
    />
  );
}

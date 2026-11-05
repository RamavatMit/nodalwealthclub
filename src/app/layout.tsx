import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { headers } from "next/headers";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import {
  INTRO_BOOT_SCRIPT,
  PointerEffects,
  RouteProgress,
  SiteIntro,
  SmoothScroll,
} from "@/components/motion";
import { MotionProvider } from "@/components/motion/motion-provider";
import { getEnv } from "@/lib/security/env";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getEnv().SITE_URL),
  title: {
    default: "Nodal Wealth Club — Understand the new money before it arrives",
    template: "%s · Nodal Wealth Club",
  },
  description:
    "Plain-language learning on AI, Web3 and agentic systems for India, with real products and a private members' club. Education only, never investment advice.",
  applicationName: "Nodal Wealth Club",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Nodal Wealth Club",
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#F6F2EB",
  colorScheme: "light",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  // Reading headers makes every page render per request, so Next.js can stamp
  // the CSP nonce from src/proxy.ts onto its scripts.
  const requestHeaders = await headers();
  const nonce = requestHeaders.get("x-nonce") ?? undefined;
  const serverPathname = requestHeaders.get("x-pathname") ?? undefined;
  const locale = await getLocale();
  const t = await getTranslations("intro");

  return (
    <html
      lang={locale === "en" ? "en-IN" : locale}
      className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script nonce={nonce} dangerouslySetInnerHTML={{ __html: INTRO_BOOT_SCRIPT }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <NextIntlClientProvider>
          <MotionProvider>
            <SiteIntro skipLabel={t("skip")} />
            <RouteProgress />
            <SmoothScroll />
            <PointerEffects />
            <SiteHeader serverPathname={serverPathname} />
            <main id="main" className="flex-1">
              {children}
            </main>
            <SiteFooter />
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

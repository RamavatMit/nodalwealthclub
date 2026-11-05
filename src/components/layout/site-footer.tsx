import { getTranslations } from "next-intl/server";
import { TransitionLink } from "@/components/motion/transition-link";
import { Logo } from "@/components/ui/logo";
import { NewsletterForm } from "./newsletter-form";

const COLUMNS = [
  {
    key: "learn",
    links: [
      { href: "/ai", label: "AI hub" },
      { href: "/web3", label: "Web3 hub" },
      { href: "/products", label: "Products" },
    ],
  },
  {
    key: "club",
    links: [
      { href: "/membership", label: "Membership" },
      { href: "/membership#faq", label: "Membership FAQ" },
      { href: "/login", label: "Member log in" },
    ],
  },
  {
    key: "company",
    links: [
      { href: "/intro", label: "Watch the intro" },
      { href: "/about", label: "About us" },
      { href: "/about#journey", label: "Our journey" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    key: "legal",
    links: [
      { href: "/legal/privacy", label: "Privacy" },
      { href: "/legal/terms", label: "Terms" },
      { href: "/legal/disclaimer", label: "Disclaimer" },
      { href: "/legal/refunds", label: "Refunds" },
    ],
  },
] as const;

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const n = await getTranslations("newsletter");

  return (
    <footer className="border-line bg-paper border-t">
      <div className="frame gutter grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Logo />
          <p className="display mt-6 max-w-sm text-3xl leading-tight">
            Understand the new money <em>before</em> it arrives.
          </p>
          <div className="mt-10 max-w-md">
            <p className="font-medium">{n("title")}</p>
            <p className="text-ink-muted mt-1 mb-4 text-sm">{n("body")}</p>
            <NewsletterForm source="footer" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:col-span-7 md:pl-8">
          {COLUMNS.map((col) => (
            <nav key={col.key} aria-label={t(col.key)}>
              <p className="eyebrow mb-4">{t(col.key)}</p>
              <ul className="space-y-2.5 text-[0.95rem]">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <TransitionLink href={l.href} className="text-ink hover:text-forest hover:underline">
                      {l.label}
                    </TransitionLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-line border-t">
        <div className="frame gutter text-ink-muted space-y-3 py-8 text-sm">
          <p>
            <strong className="text-ink font-medium">Education only.</strong> {t("disclaimer")}
          </p>
          <p>{t("security")}</p>
          <p className="pt-2 font-mono text-xs">
            © {new Date().getFullYear()} {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}

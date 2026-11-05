"use client";

import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { TransitionLink } from "@/components/motion/transition-link";
import { buttonClass } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { useHydrated } from "@/lib/use-hydrated";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", key: "home" },
  { href: "/ai", key: "ai" },
  { href: "/web3", key: "web3" },
  { href: "/products", key: "products" },
  { href: "/about", key: "about" },
  { href: "/membership", key: "membership" },
] as const;

export function SiteHeader({ serverPathname }: { serverPathname?: string }) {
  const t = useTranslations("nav");
  const livePathname = usePathname();
  // If the visitor navigates before hydration finishes, the live pathname no
  // longer matches the server HTML. Hydrate with the server's view first,
  // then re-render with the live one.
  const hydrated = useHydrated();
  const pathname = hydrated ? livePathname : (serverPathname ?? livePathname);
  // The menu belongs to the page it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (next: boolean) => setOpenOn(next ? pathname : null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        // No backdrop-filter while the menu is open: it would make the header the
        // containing block for the fixed-position menu and clip it.
        open
          ? "border-line bg-ivory"
          : scrolled
            ? "border-line bg-ivory/95 backdrop-blur-sm"
            : "bg-ivory border-transparent",
      )}
    >
      <a
        href="#main"
        className="focus:bg-paper sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-3 focus:py-2"
      >
        {t("skip")}
      </a>
      <div className="frame gutter flex h-16 items-center justify-between border-x-transparent md:h-[4.5rem]">
        <TransitionLink href="/" aria-label="Nodal Wealth Club, home">
          <Logo />
        </TransitionLink>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-6 xl:gap-8">
            {NAV.map((item) => (
              <li key={item.href}>
                <TransitionLink
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="group text-ink relative py-2 text-[0.95rem]"
                >
                  {t(item.key)}
                  <span
                    aria-hidden
                    className={cn(
                      "bg-forest ease-out-quart absolute -bottom-0.5 left-0 h-px w-full origin-left transition-transform duration-500",
                      isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </TransitionLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <TransitionLink
            href="/membership"
            className={buttonClass("primary", "hidden px-4 py-2.5 text-sm sm:inline-flex")}
          >
            {t("join")}
          </TransitionLink>
          <button
            type="button"
            className="border-line grid size-11 place-items-center rounded-xs border lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t("close") : t("menu")}
            onClick={() => setOpen(!open)}
          >
            <span aria-hidden className="relative block h-3 w-5">
              <span
                className={cn(
                  "bg-ink absolute left-0 h-px w-5 transition-transform duration-300",
                  open ? "top-1.5 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "bg-ink absolute left-0 h-px w-5 transition-transform duration-300",
                  open ? "top-1.5 -rotate-45" : "top-3",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-line bg-ivory fixed inset-x-0 top-16 bottom-0 overflow-y-auto border-t lg:hidden"
      >
        <nav aria-label="Mobile" className="gutter py-6">
          <ul className="divide-line border-line divide-y border-y">
            {NAV.map((item, i) => (
              <li key={item.href}>
                <TransitionLink
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="flex items-baseline justify-between py-4"
                >
                  <span className="display text-4xl">{t(item.key)}</span>
                  <span aria-hidden className="text-ink-muted font-mono text-xs">
                    0{i + 1}
                  </span>
                </TransitionLink>
              </li>
            ))}
          </ul>
          <TransitionLink href="/membership" className={buttonClass("primary", "mt-8 w-full")}>
            {t("join")}
          </TransitionLink>
        </nav>
      </div>
    </header>
  );
}

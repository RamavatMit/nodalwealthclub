"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { skipEntranceAnimations } from "./entrance";

/** Site order used to decide whether a navigation slides forward or back. */
export const ROUTE_ORDER = [
  "/",
  "/intro",
  "/ai",
  "/web3",
  "/products",
  "/about",
  "/membership",
  "/contact",
  "/legal",
];

function rank(path: string) {
  if (path === "/") return 0;
  const i = ROUTE_ORDER.findIndex((r) => r !== "/" && (path === r || path.startsWith(`${r}/`)));
  return i === -1 ? ROUTE_ORDER.length : i;
}

type Props = Omit<ComponentProps<typeof Link>, "href" | "transitionTypes"> & {
  href: string;
  /**
   * Override the computed direction. "up" opens a detail page that rises
   * from the bottom; "down" returns from it.
   */
  direction?: "forward" | "back" | "up" | "down" | "open" | "close";
};

/**
 * next/link that tags the navigation with a slide direction: deeper or later
 * in the site slides forward (left), earlier slides back (right).
 */
export function TransitionLink({ href, direction, onClick, ...rest }: Props) {
  const pathname = usePathname();
  const dir =
    direction ??
    (rank(href) < rank(pathname) || (href.length < pathname.length && pathname.startsWith(href))
      ? "back"
      : "forward");
  return (
    <Link
      href={href}
      transitionTypes={[`page-${dir}`]}
      onClick={(e) => {
        // Closing back into a card: the destination's cards must already be visible.
        if (dir === "close") skipEntranceAnimations(3000);
        onClick?.(e);
      }}
      {...rest}
    />
  );
}

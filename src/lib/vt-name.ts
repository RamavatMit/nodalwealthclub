/**
 * Shared-element name for the card → page morph. The same name on a card and
 * on its detail page's hero makes React's <ViewTransition> animate one into
 * the other. Must be a valid CSS identifier, so the href is sanitised.
 */
export function cardMorphName(href: string) {
  return `card${href.replace(/[^a-z0-9]+/gi, "-")}`;
}

/**
 * `share` classes for the card morph. Closing uses its own class so the
 * shrinking page can keep its snapshot longer (see globals.css).
 */
export const CARD_MORPH_SHARE = { "page-close": "card-morph-close", default: "card-morph" };

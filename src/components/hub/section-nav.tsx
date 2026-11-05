"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Sticky chips under the header that jump to each hub section and highlight
 * the one you're reading.
 */
export function SectionNav({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    for (const { id } of items) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="On this page"
      className="border-line bg-ivory/95 sticky top-16 z-30 border-b backdrop-blur-sm md:top-[4.5rem]"
    >
      <ul className="frame gutter flex [scrollbar-width:none] gap-2 overflow-x-auto py-3">
        {items.map((item, i) => (
          <li key={item.id} className="shrink-0">
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "true" : undefined}
              className={cn(
                "flex items-center gap-2 rounded-xs border px-3 py-1.5 text-sm transition-colors",
                active === item.id
                  ? "border-forest bg-forest text-paper"
                  : "border-line bg-paper text-ink hover:border-forest",
              )}
            >
              <span className="font-mono text-[0.65rem] opacity-70">{String(i + 1).padStart(2, "0")}</span>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error" | "rateLimited";

export function NewsletterForm({
  source = "footer",
  path,
  className,
}: {
  source?: "footer" | "quiz" | "membership" | "home";
  path?: string;
  className?: string;
}) {
  const t = useTranslations("newsletter");
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.get("email"),
          consent: form.get("consent") === "on",
          company: form.get("company") || undefined,
          source,
          path,
        }),
      });
      setStatus(res.ok ? "success" : res.status === 429 ? "rateLimited" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p role="status" className={cn("border-jade/40 bg-paper rounded-xs border p-4 text-sm", className)}>
        {t("success")}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn("space-y-3", className)} noValidate={false}>
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor={`${id}-email`} className="sr-only">
          Email
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder={t("placeholder")}
          className="border-line bg-paper text-ink placeholder:text-ink-muted/70 focus:border-forest min-h-12 flex-1 rounded-xs border px-4 focus:outline-none"
        />
        {/* Honeypot, hidden from people and assistive tech. */}
        <input name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
        <Button type="submit" disabled={status === "loading"} className="min-h-12">
          {t("submit")}
        </Button>
      </div>
      <label className="text-ink-muted flex items-start gap-2.5 text-sm">
        <input name="consent" type="checkbox" required className="accent-forest mt-1 size-4" />
        <span>{t("consent")}</span>
      </label>
      <p aria-live="polite" className="text-forest min-h-5 text-sm">
        {status === "error" && t("error")}
        {status === "rateLimited" && t("rateLimited")}
      </p>
    </form>
  );
}

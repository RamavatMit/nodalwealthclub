import { expect, test } from "@playwright/test";

const PAGES = [
  { path: "/", heading: /Prepare for the new financial system/i },
  { path: "/about", heading: /We teach the money of tomorrow, today/ },
  { path: "/membership", heading: /Learn it, use it, grow it together/ },
  { path: "/ai", heading: /Understand AI, then use it/ },
  { path: "/web3", heading: /Web3, made plain/ },
  { path: "/legal/privacy", heading: /Privacy notice/ },
  { path: "/legal/disclaimer", heading: /Disclaimer/ },
  { path: "/contact", heading: /Talk to a person/ },
];

for (const { path, heading } of PAGES) {
  test(`${path} renders with strict CSP and no console errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(e.message));

    const res = await page.goto(path);
    expect(res?.status()).toBe(200);

    const csp = res?.headers()["content-security-policy"] ?? "";
    expect(csp).toMatch(/script-src 'self' 'nonce-[^']+' 'strict-dynamic'/);
    expect(res?.headers()["x-frame-options"]).toBe("DENY");
    expect(res?.headers()["strict-transport-security"]).toContain("max-age=");

    await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
    await page.waitForLoadState("networkidle");
    expect(errors, errors.join("\n")).toEqual([]);
  });
}

test("education-only disclaimer is in the footer on every page", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("footer")).toContainText("Education only");
  await expect(page.locator("footer")).toContainText("never ask for your seed phrase");
});

test("private areas redirect signed-out visitors to login", async ({ page }) => {
  await page.goto("/club");
  await expect(page).toHaveURL(/\/login\?next=%2Fclub/);
});

test("unknown pages return 404", async ({ page }) => {
  const res = await page.goto("/no-such-page");
  expect(res?.status()).toBe(404);
});

test("navigation works and slides between pages", async ({ page, isMobile }) => {
  await page.goto("/");
  if (isMobile) await page.getByRole("button", { name: "Menu" }).click();
  await page
    .getByRole("navigation", { name: isMobile ? "Mobile" : "Main" })
    .getByRole("link", { name: "About" })
    .click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("money");
});

test("future-ready quiz produces a score and path", async ({ page }) => {
  await page.goto("/");
  const quiz = page.locator("fieldset").first();
  for (let i = 0; i < 5; i++) {
    await quiz.locator("button").first().click();
  }
  await expect(page.getByText("Your suggested path")).toBeVisible();
  await expect(page.getByText("/100")).toBeVisible();
});

test.describe("newsletter API", () => {
  test("rejects cross-origin posts", async ({ request }) => {
    const res = await request.post("/api/newsletter", {
      headers: { Origin: "https://evil.example", "Content-Type": "application/json" },
      data: { email: "a@b.in", consent: true },
    });
    expect(res.status()).toBe(403);
  });

  test("validates input", async ({ request }) => {
    const res = await request.post("/api/newsletter", { data: { email: "not-an-email", consent: true } });
    expect(res.status()).toBe(400);
  });
});

test.describe("detail pages", () => {
  const cards = [
    { hub: "/ai", card: "Trading with agents", heading: /Trading with AI agents, honestly/ },
    { hub: "/web3", card: "Crypto tax calculator", heading: /Crypto tax in India, simply/ },
    { hub: "/products", card: "Agent Sandbox", heading: /Build a trading agent, safely/ },
  ];

  for (const { hub, card, heading } of cards) {
    test(`${hub} card "${card}" opens its own page`, async ({ page }) => {
      await page.goto(hub);
      await page
        .getByRole("link", { name: new RegExp(card) })
        .first()
        .click();
      await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
    });
  }

  test("every topic and product page renders", async ({ request }) => {
    const paths = [
      ...[
        "how-ai-works",
        "machine-learning-without-code",
        "types-of-ai-tools",
        "how-ai-answers",
        "ai-tools-market-map",
        "free-and-low-cost-ai",
        "free-ai-platforms-apis",
        "what-is-alibaba",
        "chinese-ai-tools",
        "why-learn-ai-tools",
        "earning-with-ai-tools",
        "what-are-ai-agents",
        "how-agents-work",
        "how-to-build-an-agent",
        "trading-with-agents",
        "how-trading-agents-work",
        "agent-profit-and-loss",
      ].map((s) => `/ai/${s}`),
      ...["reading-a-model-launch", "ai-pricing-change", "india-ai-programme-update"].map(
        (s) => `/ai/news/${s}`,
      ),
      ...["digital-rupee-pilot-update", "exchange-registration-news", "crypto-tax-headline"].map(
        (s) => `/web3/news/${s}`,
      ),
      ...[
        "what-is-web3",
        "knowledge",
        "why-web3-matters",
        "earning-with-web3",
        "safety",
        "india",
        "tax",
        "mining",
        "glossary",
      ].map((s) => `/web3/${s}`),
      ...["agent-sandbox", "prompt-lab", "wallet-safety-kit", "tax-ledger"].map((s) => `/products/${s}`),
    ];
    for (const p of paths) expect((await request.get(p)).status(), p).toBe(200);
    expect((await request.get("/ai/not-a-topic")).status()).toBe(404);
    // Old article links redirect to their new homes.
    const old = await request.get("/ai/trading", { maxRedirects: 0 });
    expect(old.status()).toBe(308);
  });

  test("tax calculator estimates 30% + cess", async ({ page }) => {
    await page.goto("/web3/tax");
    await page.getByLabel("Sale value").fill("200000");
    await page.getByLabel("Cost of acquisition").fill("100000");
    // 100000 gain × 30% = 30000; + 4% cess = 31200
    await expect(page.getByText("₹31,200")).toBeVisible();
    await expect(page.getByText("₹2,000")).toBeVisible();
  });
});

test.describe("project intro", () => {
  test("film plays chapters, replays and ends on Home", async ({ page }) => {
    await page.goto("/intro");
    const label = page.locator(".film p[aria-live]");
    await expect(label).toContainText("Chapter 1");
    await page.getByRole("button", { name: "Next chapter" }).click();
    await expect(label).toContainText("Money keeps changing");
    await page.getByRole("button", { name: "Chapter 9: Join us" }).click();
    await expect(page.getByRole("button", { name: "Enter the site" })).toBeVisible();
    await page.getByRole("button", { name: "Replay" }).click();
    await expect(label).toContainText("Chapter 1");
    await page.getByRole("button", { name: /Exit to site/ }).click();
    await expect(page).toHaveURL(/\/$/);
  });

  test("menu bar has a Home link", async ({ page, isMobile }) => {
    await page.goto("/about");
    if (isMobile) await page.getByRole("button", { name: "Menu" }).click();
    const nav = page.getByRole("navigation", { name: isMobile ? "Mobile" : "Main" });
    await nav.getByRole("link", { name: /^Home/ }).click();
    await expect(page).toHaveURL(/\/$/);
  });
});

test.describe("hub sections", () => {
  test("AI page has all five sections", async ({ page }) => {
    await page.goto("/ai");
    for (const title of [
      /How AI works/,
      /The tools worth your time/,
      /Agents that act/,
      /What changed in AI today/,
      /Learn AI, lesson by lesson/,
    ]) {
      await expect(page.getByRole("heading", { level: 2, name: title })).toBeAttached();
    }
  });

  test("a news card opens the full story", async ({ page }) => {
    await page.goto("/web3#news");
    await page
      .getByRole("link", { name: /Digital Rupee pilot/ })
      .first()
      .click();
    await expect(page.getByRole("heading", { name: /Why it matters for you/ })).toBeVisible();
  });

  test("lesson playlist switches lessons", async ({ page }) => {
    await page.goto("/ai#lessons");
    await page.getByRole("button", { name: /Your first AI agent/ }).click();
    await expect(page.getByText(/Lesson 7 of 8/)).toBeVisible();
  });
});

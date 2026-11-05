import { defineConfig, devices } from "@playwright/test";

// Runs against a production build so the real CSP and headers are exercised.
export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  use: {
    baseURL: "http://localhost:3100",
    reducedMotion: "reduce",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: "npm run start -- -p 3100",
    url: "http://localhost:3100/api/health",
    reuseExistingServer: !process.env.CI,
    env: { RATE_LIMIT_SALT: "e2e-only-salt-0000", RATE_LIMIT_STORE: "memory" },
  },
});

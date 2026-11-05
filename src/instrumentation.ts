export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Fail fast: the server refuses to start with missing or malformed secrets.
    const { getEnv } = await import("./lib/security/env");
    getEnv();
  }
}

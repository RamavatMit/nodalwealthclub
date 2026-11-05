import { z } from "zod";

/** Every form and API body is parsed with one of these before use. */

export const email = z
  .string()
  .trim()
  .toLowerCase()
  .max(254)
  .pipe(z.email({ message: "Enter a valid email address" }));

export const newsletterSchema = z.object({
  email,
  /** Where the signup came from, for consent records. */
  source: z.enum(["footer", "quiz", "membership", "home"]).default("footer"),
  consent: z.literal(true, { message: "Please agree to receive the newsletter" }),
  /** Learning path recommended by the Future-ready quiz, if any. */
  path: z.enum(["foundations", "ai-builder", "web3-safe", "agentic"]).optional(),
  /** Honeypot: real users never fill this. */
  company: z.string().max(0).optional(),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;

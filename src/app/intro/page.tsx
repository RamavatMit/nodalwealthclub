import type { Metadata } from "next";
import { IntroFilm } from "@/components/intro/intro-film";

export const metadata: Metadata = {
  title: "Intro film",
  description:
    "A one-minute animated film introducing Nodal Wealth Club: why we exist, the three worlds we teach, how we use AI, and our promises.",
};

export default function IntroPage() {
  return <IntroFilm mode="page" />;
}

import { PageTransition } from "@/components/motion/page-transition";

/** Templates remount on every navigation, which is what drives the slide. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}

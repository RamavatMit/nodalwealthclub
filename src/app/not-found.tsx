import { NodeNetwork } from "@/components/motion";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="frame grid min-h-[70dvh] lg:grid-cols-2">
      <div className="gutter flex flex-col justify-center py-20">
        <p className="eyebrow">404</p>
        <h1 className="display text-hero mt-4">
          This node is <em>not</em> connected
        </h1>
        <p className="text-ink-muted mt-6 max-w-md">
          The page you were looking for doesn&apos;t exist or has moved.
        </p>
        <ButtonLink href="/" className="mt-8 self-start" direction="back">
          Back to home
        </ButtonLink>
      </div>
      <div className="border-line relative hidden border-l lg:block">
        <NodeNetwork className="absolute inset-0" />
      </div>
    </div>
  );
}

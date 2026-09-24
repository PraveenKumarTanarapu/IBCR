import { PricingCard } from "@/components/ui/pricing-card";
import { cn } from "@/lib/utils";
import type { MembershipTier } from "@/lib/content";

/**
 * The membership categories, five across.
 *
 * There is no rate toggle any more: the Chamber's limited launch offer has
 * closed and the standard annual fee is the only rate, so the grid is the
 * whole component and it can stay on the server.
 */
export function PricingSection({
  tiers,
  className,
}: {
  tiers: MembershipTier[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-3.5",
        className,
      )}
    >
      {tiers.map((tier) => (
        <PricingCard key={tier.id} tier={tier} />
      ))}
    </div>
  );
}

export default PricingSection;

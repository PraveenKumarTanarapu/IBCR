"use client";

import { useId, useState } from "react";
import { PricingCard } from "@/components/ui/pricing-card";
import { Tab } from "@/components/ui/pricing-tab";
import { cn } from "@/lib/utils";
import { MEMBERSHIP_RATES, type MembershipTier } from "@/lib/content";

/**
 * The membership categories, with a toggle between the standard annual fee and
 * the Chamber's limited offer.
 *
 * The upstream component switched monthly/yearly billing; here the same
 * mechanic carries the two rates the Chamber quotes, which is the only thing
 * about a category that changes between them.
 */

/** Largest reduction across the categories, so the badge never overstates. */
function bestSaving(tiers: MembershipTier[]) {
  let best = 0;
  for (const tier of tiers) {
    const standard = tier.price.standard;
    const offer = tier.price["launch offer"];
    if (typeof standard !== "number" || typeof offer !== "number") continue;
    best = Math.max(best, 1 - offer / standard);
  }
  return Math.round(best * 100);
}

export function PricingSection({
  tiers,
  className,
  defaultRate = "launch offer",
}: {
  tiers: MembershipTier[];
  className?: string;
  defaultRate?: string;
}) {
  const [rate, setRate] = useState(defaultRate);
  const layoutId = useId();
  const saving = bestSaving(tiers);

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="flex w-fit rounded-full border border-hairline bg-hover p-1">
        {MEMBERSHIP_RATES.map((option) => (
          <Tab
            key={option}
            text={option}
            selected={rate === option}
            setSelected={setRate}
            badge={option === "launch offer" && saving > 0 ? `Save up to ${saving}%` : undefined}
            layoutId={layoutId}
          />
        ))}
      </div>

      <div className="mt-10 grid w-full gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {tiers.map((tier) => (
          <PricingCard key={tier.id} tier={tier} rate={rate} />
        ))}
      </div>
    </div>
  );
}

export default PricingSection;

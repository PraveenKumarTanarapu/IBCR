import { GlobeStage } from "@/components/three/GlobeStage";
import {
  ParallaxFeatureSection,
  type ParallaxFeature,
} from "@/components/ui/parallax-scroll-feature-section";
import { CORRIDOR_FOCUS, WHY_IBCR } from "@/lib/content";

/**
 * Why IBCR and The Corridor, run through one parallax feature section so the
 * two read as a pair: the case for the Chamber, then the corridor it works.
 */
export function WhyIbcrCorridor() {
  const features: ParallaxFeature[] = [
    {
      id: "why-ibcr",
      eyebrow: "Why IBCR",
      title: "Your gateway to",
      accent: "India–Rwanda business.",
      copy: "Rwanda is a small market with an outsized strategic position. IBCR exists to make that position usable — with introductions, intelligence and representation that would otherwise take years to build.",
      points: WHY_IBCR.map((item) => ({ title: item.title, copy: item.copy })),
      cta: { label: "About the Chamber", href: "/about" },
      media: {
        type: "image",
        src: "/images/kigali-night.jpg",
        alt: "Kigali at dusk — the Convention Centre lit in the colours of the Rwandan flag",
        caption: "Kigali — the Chamber's base, and Rwanda's gateway to the region",
      },
    },
    {
      id: "india-rwanda",
      eyebrow: "The corridor",
      title: "India",
      accent: "× Rwanda",
      lede: "Two markets. One growing relationship.",
      copy: "Indian manufacturing depth, technology and capital meeting Rwandan market access, administrative reform and regional reach. The Chamber works the practical space in between.",
      cta: { label: "Explore the corridor", href: "/india-rwanda" },
      secondary: {
        label: "Investment opportunities",
        href: "/india-rwanda#opportunities",
      },
      reverse: true,
      media: {
        type: "node",
        node: (
          <div className="mx-auto max-w-[34rem]">
            <GlobeStage />
          </div>
        ),
        caption: "Drag to rotate",
      },
    },
  ];

  return (
    <>
      <ParallaxFeatureSection features={features} />
      {/* Focus areas sit under the corridor row rather than inside it, so the
          parallax column stays a single readable block. */}
      <div className="border-t border-hairline bg-white">
        <div className="container-page py-10">
          <ul className="flex flex-wrap items-center gap-2">
            <li className="label-mono mr-3 text-navy-900/35">Focus areas</li>
            {CORRIDOR_FOCUS.map((focus) => (
              <li key={focus}>
                <span className="inline-flex items-center rounded-full border border-hairline px-4 py-2 text-[0.8125rem] text-muted transition-colors duration-300 hover:border-hairline-strong hover:bg-hover hover:text-navy-900">
                  {focus}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

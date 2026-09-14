import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow, Section } from "@/components/ui/Section";
import { PARTNERS } from "@/lib/content";

export function Partners() {
  const loop = [...PARTNERS, ...PARTNERS];

  return (
    <Section className="overflow-hidden py-16 md:py-20">
      <div className="container-page">
        <Reveal className="flex flex-col items-center text-center">
          <Eyebrow>Our strategic partners</Eyebrow>
          <p className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-muted">
            The Chamber works alongside diplomatic missions, government agencies, industry bodies and
            financial institutions in both markets.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="relative mt-12">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-paper to-transparent md:w-40"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-paper to-transparent md:w-40"
          aria-hidden
        />

        <div className="group flex w-max animate-[var(--animate-marquee)] gap-3 hover:[animation-play-state:paused]">
          {loop.map((partner, i) => (
            <div
              key={`${partner.name}-${i}`}
              className="flex h-20 min-w-[15rem] flex-col justify-center rounded-2xl border border-hairline bg-white px-6 transition-colors duration-500 hover:border-navy-800/25 hover:bg-white"
            >
              <p className="text-[0.9375rem] font-semibold tracking-tight text-navy-900/80">
                {partner.name}
              </p>
              <p className="label-mono mt-1 text-[0.5625rem] text-navy-900/35">{partner.category}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

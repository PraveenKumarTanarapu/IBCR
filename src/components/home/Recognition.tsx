import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow, Section } from "@/components/ui/Section";

/**
 * The recognition strip, between the hero and IBCR at a glance.
 *
 * One line of standing, stated plainly. It is deliberately the shortest
 * section on the page: a plate, a sentence and the emblem, on the same white
 * surface as everything below it, so it reads as a mark of standing rather
 * than as another band of content. Nothing above or below it changes.
 *
 * The emblem is the State Emblem of India, supplied by the Chamber and used
 * here at the High Commission's own artwork — never redrawn or recoloured.
 */
export function Recognition() {
  return (
    <Section id="recognition" className="py-10 md:py-12 lg:py-12">
      <div className="container-page">
        <Reveal y={18}>
          <div className="flex max-w-3xl items-center justify-between gap-6 rounded-[var(--radius-card)] border border-gold-200 bg-white px-6 py-5 md:gap-10 md:px-9 md:py-6">
            <div>
              <Eyebrow>Recognised by</Eyebrow>
              <p className="mt-3 text-[clamp(1.15rem,2.6vw,1.75rem)] leading-tight font-semibold tracking-tight text-navy-900">
                High Commission of India, Kigali.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-6">
              <span aria-hidden className="hidden h-16 w-px bg-gold-200 sm:block" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/state-emblem-of-india.png"
                alt="State Emblem of India"
                width={295}
                height={448}
                className="h-16 w-auto md:h-[5.5rem]"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

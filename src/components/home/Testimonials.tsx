import { Reveal } from "@/components/motion/Reveal";
import { Testimonial, type TestimonialItem } from "@/components/ui/clean-testimonial";
import { Eyebrow, Section } from "@/components/ui/Section";
import { TESTIMONIALS } from "@/lib/content";

const ITEMS: TestimonialItem[] = TESTIMONIALS.map((item) => ({ ...item }));

export function Testimonials() {
  return (
    <Section divided>
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>Testimonials</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 text-[clamp(1.9rem,4.4vw,3rem)] leading-[1.05] font-semibold text-navy-900">
                In the words of{" "}
                <span className="accent-serif text-gold-600">our members.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 max-w-sm text-[0.9375rem] leading-[1.7] text-muted">
                Twenty-five companies are on the register today, across Silver, Gold and Platinum.
                These are some of them.
              </p>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-8" delay={0.08} y={24}>
            <Testimonial items={ITEMS} />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

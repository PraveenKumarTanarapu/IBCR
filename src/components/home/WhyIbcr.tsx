import { Parallax } from "@/components/motion/Parallax";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow, Section } from "@/components/ui/Section";
import { WHY_IBCR } from "@/lib/content";

export function WhyIbcr() {
  return (
    <Section id="why-ibcr" tone="ivory">
      <div className="container-page">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* ------------------------------------------------- visual */}
          <Reveal className="lg:col-span-5" y={26}>
            <div className="relative">
              <div className="relative aspect-4/5 overflow-hidden rounded-[var(--radius-card)] bg-navy-950">
                <div
                  className="absolute inset-0 bg-[radial-gradient(120%_90%_at_20%_0%,rgba(26,86,184,0.55),transparent_58%),radial-gradient(90%_70%_at_88%_100%,rgba(201,162,39,0.32),transparent_60%)]"
                  aria-hidden
                />
                <div className="dot-veil absolute inset-0 opacity-30" aria-hidden />

                {/* Corridor diagram — India above, Rwanda below, gold between. */}
                <div className="absolute inset-0 flex flex-col justify-between p-8 lg:p-10">
                  <div>
                    <p className="label-mono text-gold-400">Corridor</p>
                    <p className="mt-4 text-[1.75rem] leading-tight font-semibold text-ivory">
                      India
                    </p>
                    <p className="text-[0.8125rem] text-ivory/50">
                      Manufacturing · technology · capital
                    </p>
                  </div>

                  <Parallax amount={7} className="mx-auto w-full max-w-[16rem]">
                    <svg viewBox="0 0 200 120" className="h-28 w-full" aria-hidden>
                    <defs>
                      <linearGradient id="why-arc" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0" stopColor="#c9a227" stopOpacity="0.1" />
                        <stop offset="0.5" stopColor="#f0dda6" stopOpacity="0.95" />
                        <stop offset="1" stopColor="#c9a227" stopOpacity="0.1" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M14 18 C 70 6, 130 6, 186 18"
                      fill="none"
                      stroke="url(#why-arc)"
                      strokeWidth="1.4"
                    />
                    <path
                      d="M14 60 C 70 46, 130 74, 186 60"
                      fill="none"
                      stroke="url(#why-arc)"
                      strokeWidth="1.4"
                    />
                    <path
                      d="M14 102 C 70 114, 130 114, 186 102"
                      fill="none"
                      stroke="url(#why-arc)"
                      strokeWidth="1.4"
                    />
                      <circle cx="14" cy="18" r="2.6" fill="#f0dda6" />
                      <circle cx="186" cy="102" r="2.6" fill="#7fd0ff" />
                    </svg>
                  </Parallax>

                  <div className="text-right">
                    <p className="text-[1.75rem] leading-tight font-semibold text-ivory">Rwanda</p>
                    <p className="text-[0.8125rem] text-ivory/50">
                      Market access · reform · gateway
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-4 hidden max-w-[13rem] rounded-2xl border border-hairline bg-paper p-5 shadow-[0_18px_40px_-24px_rgba(7,23,48,0.4)] sm:block">
                <p className="label-mono text-gold-600">Tagline</p>
                <p className="mt-2 text-[1.0625rem] leading-snug font-medium text-navy-900">
                  Connect. Collaborate. Grow.
                </p>
              </div>
            </div>
          </Reveal>

          {/* ------------------------------------------------ content */}
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>Why IBCR</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 max-w-xl text-[clamp(1.9rem,4.2vw,3.1rem)] leading-[1.05] font-semibold text-navy-900">
                Your gateway to{" "}
                <span className="accent-serif text-gold-600">India–Rwanda business.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-xl text-[1.0625rem] leading-[1.65] text-muted">
                Rwanda is a small market with an outsized strategic position. IBCR exists to make
                that position usable — with introductions, intelligence and representation that
                would otherwise take years to build.
              </p>
            </Reveal>

            <RevealGroup className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {WHY_IBCR.map((item, i) => (
                <RevealItem key={item.title} className="group">
                  <div className="flex items-baseline gap-3">
                    <span className="label-mono text-gold-600">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-[1.1875rem] font-semibold tracking-tight text-navy-900">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-2.5 text-[0.9375rem] leading-[1.65] text-muted">{item.copy}</p>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.1} className="mt-10">
              <ButtonLink href="/about" variant="outline" withArrow>
                About the Chamber
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}

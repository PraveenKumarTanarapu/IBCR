import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { NAV } from "@/lib/content";

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[100svh] items-center overflow-hidden bg-ink text-ivory">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_100%_at_70%_0%,rgba(26,86,184,0.34),transparent_60%)]"
        aria-hidden
      />
      <div className="dot-veil pointer-events-none absolute inset-0 opacity-25" aria-hidden />

      <div className="container-page relative py-32">
        <Eyebrow tone="light">Error 404</Eyebrow>
        <h1 className="mt-6 max-w-3xl text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.02] font-semibold tracking-[-0.035em]">
          That page is not on{" "}
          <span className="accent-serif text-gold-400">this corridor.</span>
        </h1>
        <p className="mt-6 max-w-xl text-[1.0625rem] leading-[1.65] text-ivory/65">
          The link may be out of date, or the page may have moved. Here is where most people are
          heading.
        </p>

        <ul className="mt-10 flex flex-wrap gap-2">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="inline-flex items-center rounded-full border border-white/15 px-4 py-2 text-[0.875rem] text-ivory/75 transition-colors duration-300 hover:border-gold/55 hover:text-gold-200"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/" size="lg" withArrow>
            Back to home
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline-light" size="lg">
            Contact the Chamber
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { NAV } from "@/lib/content";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-white text-body">
      <div className="container-page relative py-32">
        <Eyebrow>Error 404</Eyebrow>
        <h1 className="mt-6 max-w-3xl text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-navy-900">
          That page is not on{" "}
          <span className="accent-serif text-gold-600">this corridor.</span>
        </h1>
        <p className="mt-6 max-w-xl text-[1.0625rem] leading-[1.65] text-muted">
          The link may be out of date, or the page may have moved. Here is where most people are
          heading.
        </p>

        <ul className="mt-10 flex flex-wrap gap-2">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="inline-flex items-center rounded-full border border-hairline px-4 py-2 text-[0.875rem] text-muted transition-colors duration-300 hover:border-hairline-strong hover:bg-hover hover:text-navy-900"
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
          <ButtonLink href="/contact" variant="outline" size="lg">
            Contact the Chamber
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

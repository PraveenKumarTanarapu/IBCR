import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Glance } from "@/components/home/Glance";
import { WhyIbcrCorridor } from "@/components/home/WhyIbcrCorridor";
import { Services } from "@/components/home/Services";
import { Opportunities } from "@/components/home/Opportunities";
import { Membership } from "@/components/home/Membership";
import { Directory } from "@/components/home/Directory";
import { InsightsSection } from "@/components/home/InsightsSection";
import { Testimonials } from "@/components/home/Testimonials";
import { Partners } from "@/components/home/Partners";
import { MemberLogos } from "@/components/home/MemberLogos";
import { FinalCta } from "@/components/home/FinalCta";
import { ContactSection } from "@/components/home/ContactSection";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: `${SITE.shortName} — ${SITE.positioning}`,
  description: SITE.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Glance />
      <WhyIbcrCorridor />
      <Services />
      <Opportunities />
      <Membership />
      <Directory />
      <InsightsSection />
      <Testimonials />
      <Partners />
      <MemberLogos divided />
      <FinalCta />
      <ContactSection />
    </>
  );
}

import type { Metadata } from "next";
import { ProcessHero } from "@/components/process/ProcessHero";
import { CapabilitiesCardsSection } from "@/components/process/CapabilitiesCardsSection";
import { OurCapabilities } from "@/components/process/OurCapabilities";
import { ColorCTA } from "@/components/sections/ColorCTA";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Manufacturing Process & Inspection",
  description:
    "Explore ASIR Containers' manufacturing process: in-house injection moulding cells, 3 printing routes (Screen Printing, HTL, IML), and multi-stage quality inspection gates.",
  alternates: { canonical: "/process" },
  openGraph: {
    title: "Manufacturing Process & Inspection — ASIR Containers",
    description:
      "Moulded, printed, and packed on one floor. Industrial-grade injection moulding and precision container printing.",
    url: `${site.url}/process`,
  },
};

export default function ProcessPage() {
  return (
    <>
      <ProcessHero />
      <CapabilitiesCardsSection />
      <OurCapabilities />
      <ColorCTA
        className="!pt-3 sm:!pt-4 lg:!pt-[1.2vw] !pb-8 sm:!pb-10 lg:!pb-[2.5vw]"
        eyebrow="Quality Assurance & Custom Runs"
        heading="Looking for process validation or custom batches?"
        body={
          <>
            <span className="sm:block">
              Review batch inspection criteria, in-process quality checklists,{" "}
            </span>
            <span className="sm:block">
              and decorative finishes with our technical engineers.
            </span>
          </>
        }
        ctaLabel="Contact engineering"
        image="/images/facility/dispatch.jpg"
        imageAlt="Pallets of finished containers at the dispatch bay"
      />
    </>
  );
}

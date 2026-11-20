import { ColorCTA } from "@/components/sections/ColorCTA";
import { cta } from "@/data/home";

/**
 * Closing CTA banner — unified with all site banners via ColorCTA.
 */
export function ContactCTA() {
  return (
    <ColorCTA
      eyebrow={cta.eyebrow}
      heading={cta.heading.replace("\n", " ")}
      body={cta.body}
      ctaLabel="Start an enquiry"
      ctaHref="/contact"
      image="/images/facility/dispatch.jpg"
      imageAlt="Dispatch bay and factory floor packaging line"
    />
  );
}

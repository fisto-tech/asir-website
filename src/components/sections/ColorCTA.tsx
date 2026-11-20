import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

type ColorCTAProps = {
  eyebrow: string;
  heading: string;
  body: ReactNode;
  ctaLabel?: string;
  ctaHref?: string;
  image: string;
  imageAlt: string;
};

/**
 * Editorial inset dark photographic banner matching the reference UI.
 * Features rounded corners, side/bottom margins, edge-clipped background photograph,
 * single-line heading alignment, and a responsive brand action button.
 */
export function ColorCTA({
  eyebrow,
  heading,
  body,
  ctaLabel = "Start an enquiry",
  ctaHref = "/contact",
  image,
  imageAlt,
}: ColorCTAProps) {
  return (
    <section className="relative w-full bg-transparent px-4 sm:px-6 md:px-8 lg:px-[4vw] pt-2 sm:pt-3 pb-8 sm:pb-12 lg:pb-[3vw]">
      <div className="mx-auto w-full max-w-[1440px] lg:max-w-[92vw]">
        <Reveal className="relative overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-[1.4vw] bg-charcoal py-7 sm:py-9 lg:py-[2.4vw] px-6 sm:px-10 lg:px-[3.5vw] border border-slate-800/50 shadow-md">
          {/* Backdrop with page-specific industrial photograph */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(min-width: 1024px) 92vw, 100vw"
              className="object-cover opacity-60"
            />
            {/* Rich dark gradient overlay from left */}
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/85 to-charcoal/45" />
          </div>

          <div className="relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex-1 min-w-0">
              {/* Eyebrow marker */}
              <p
                data-reveal
                data-reveal-dir="left"
                data-reveal-delay="0.1"
                className="font-mono text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] text-slate-400"
              >
                {eyebrow}
              </p>

              {/* Heading: Single line alignment on desktop */}
              <h2
                data-reveal
                data-reveal-dir="left"
                data-reveal-delay="0.18"
                className="mt-1.5 lg:mt-[0.35vw] font-display text-[1.45rem] sm:text-[1.8rem] md:text-[2rem] lg:text-[1.45vw] xl:text-[1.62vw] 2xl:text-[1.75vw] font-bold text-white leading-tight tracking-tight whitespace-normal lg:whitespace-nowrap"
              >
                {heading}
              </h2>

              {/* Narrative description */}
              <p
                data-reveal
                data-reveal-dir="up"
                data-reveal-delay="0.25"
                className="mt-2 lg:mt-[0.5vw] max-w-2xl lg:max-w-[50vw] text-[13px] sm:text-[14px] lg:text-[0.95vw] leading-relaxed text-slate-300 font-normal"
              >
                {body}
              </p>
            </div>

            {/* Clean Enquiry Action */}
            <div className="shrink-0" data-reveal data-reveal-dir="right" data-reveal-delay="0.25">
              <Link
                href={ctaHref}
                className="group inline-flex h-11 sm:h-12 lg:h-[3vw] items-center justify-center gap-2 lg:gap-[0.5vw] rounded-full bg-brand px-6 sm:px-7 lg:px-[1.8vw] text-[14px] sm:text-[14.5px] lg:text-[0.95vw] font-semibold text-white transition-all duration-300 hover:bg-brand-dark hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{ctaLabel}</span>
                <ArrowRight
                  aria-hidden
                  className="h-4 w-4 lg:h-[1vw] lg:w-[1vw] transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

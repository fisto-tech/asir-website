"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { allHomeClients } from "@/data/manufacturing";
import { WavyHighlight } from "@/components/ui/WavyHighlight";

export function ClientsSection() {
  // Duplicate array to ensure perfectly seamless infinite loop
  const marqueeList = [...allHomeClients, ...allHomeClients];

  return (
    <section className="relative overflow-hidden bg-white pt-4 sm:pt-5 lg:pt-[1.8vw] pb-2 sm:pb-3 lg:pb-[1.5vw] border-b border-slate-100/70">
      <Reveal className="shell mb-3 sm:mb-4 lg:mb-[1.2vw] max-w-[1440px] lg:max-w-[92vw] px-5 sm:px-8 lg:px-[4vw]">
        <div className="flex flex-col items-start justify-between gap-3 sm:gap-4 lg:flex-row lg:items-end lg:gap-[3vw] text-left">
          <div data-reveal data-reveal-dir="left" data-reveal-delay="0.1" className="w-full max-w-2xl lg:max-w-[42vw] lg:shrink-0">
            <h2 className="font-display text-[2.5rem] sm:text-[3.25rem] lg:text-[3.3vw] font-bold tracking-tight text-slate-900 leading-[1.06]">
              Trusted by Leading Packaging <WavyHighlight dot={true} serif={false} italic={false}>Brands</WavyHighlight>
            </h2>
          </div>
          <p
            data-reveal
            data-reveal-dir="right"
            data-reveal-delay="0.18"
            className="w-full max-w-2xl lg:max-w-[36vw] text-[15.5px] sm:text-[17px] lg:text-[1.05vw] leading-[1.55] text-slate-600"
          >
            From paints and agrochemicals to food-grade and industrial lubricants, manufacturers rely on ASIR Containers for precision-moulded and decorated pails.
          </p>
        </div>
      </Reveal>

      {/* Edge gradient mask for clean marquee fade on white background */}
      <Reveal className="relative w-full overflow-hidden">
        <div data-reveal data-reveal-dir="scale" data-reveal-delay="0.2">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 sm:w-28 lg:w-[7vw] bg-gradient-to-r from-white via-white/80 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 sm:w-28 lg:w-[7vw] bg-gradient-to-l from-white via-white/80 to-transparent" />

          {/* Marquee Track with tighter spacing to eliminate empty gaps */}
          <div className="animate-marquee flex items-center gap-3 sm:gap-4 md:gap-5 lg:gap-[1.2vw] py-1.5 sm:py-2 lg:py-[0.5vw]">
            {marqueeList.map((client, idx) => (
              <div
                key={`${client.name}-${idx}`}
                className="group flex h-14 sm:h-16 md:h-18 lg:h-[4.2vw] w-36 sm:w-40 md:w-44 lg:w-[11.5vw] shrink-0 items-center justify-center px-2 lg:px-[0.6vw] transition-all duration-300"
              >
                <Image
                  src={client.logo}
                  alt={client.alt}
                  width={180}
                  height={46}
                  unoptimized
                  className="h-8 sm:h-9 md:h-10 lg:h-[2.4vw] w-auto max-w-[130px] sm:max-w-[140px] lg:max-w-[9vw] object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

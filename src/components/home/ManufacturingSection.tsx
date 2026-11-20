"use client";

import Image from "next/image";
import { Cog, Printer, ShieldCheck, CheckCircle2, type LucideIcon } from "lucide-react";

type Feature = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  color: string;
};

export function ManufacturingSection() {
  const features: Feature[] = [
    {
      title: "Precision Injection",
      subtitle: "High-tonnage hydraulic & electric moulding with micron accuracy",
      icon: Cog,
      color: "#0284c7", // Technical cyan/blue
    },
    {
      title: "Robotic Labelling",
      subtitle: "In-mould labelling (IML) and automated multi-axis transfer",
      icon: Printer,
      color: "#0066cc", // Technical brand blue
    },
    {
      title: "Hermetic Tooling",
      subtitle: "Custom-built multi-cavity dies ensuring zero leakage",
      icon: ShieldCheck,
      color: "#059669", // Precision emerald green
    },
    {
      title: "Triple-Gate QC",
      subtitle: "Comprehensive drop-weight, seal load and pressure testing",
      icon: CheckCircle2,
      color: "#7c3aed", // Industrial violet
    },
  ];

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-r from-[#d8eeff] via-[#e4ecf2] to-[#d8eeff] py-10 sm:py-14 lg:py-[3.5vw] border-b border-[#cfe6fa]"
    >
      {/* Background Decorative Graphic Elements matching reference style */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 -top-24 h-[520px] w-[520px] lg:h-[35vw] lg:w-[35vw] lg:-left-[5vw] lg:-top-[6vw] rounded-full border-[36px] lg:border-[2.4vw] border-[#0066ff]/[0.05] blur-[1px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-6 -bottom-16 h-[340px] w-[340px] lg:h-[22vw] lg:w-[22vw] lg:-bottom-[4vw] rounded-full bg-gradient-to-tr from-[#0070f3]/[0.08] via-[#0284c7]/[0.04] to-transparent blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-12 top-10 h-32 w-32 opacity-25"
        style={{
          backgroundImage: "radial-gradient(#0052cc 1.5px, transparent 1.5px)",
          backgroundSize: "14px 14px",
        }}
      />

      <div className="shell relative z-10 max-w-[1440px] lg:max-w-[92vw] px-5 sm:px-8 lg:px-[4vw]">
        {/* 2-Column Grid: Interchanged Left Image / Right Content */}
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-[3vw]">
          
          {/* Left Column (5 cols): Rounded Corner Facility Photo */}
          <div className="order-2 lg:order-1 lg:col-span-5 flex flex-col justify-center">
            <div
              className="relative w-full h-[300px] sm:h-[340px] lg:h-[27vw] overflow-hidden rounded-[24px] lg:rounded-[1.7vw] border border-[#cfe6fa] bg-slate-900 shadow-xl transition-all duration-500 hover:shadow-2xl"
            >
              <Image
                src="/images/manufacturing/manufacturing-unit.webp"
                alt="High-tonnage injection moulding plant floor at ASIR Containers"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-103"
              />
              {/* Subtle soft gradient */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
            </div>
          </div>

          {/* Right Column (7 cols): Heading, Paragraph, and 2-per-row Icon + Text features */}
          <div className="order-1 lg:order-2 lg:col-span-7 flex flex-col justify-between lg:pl-[1.5vw]">
            <div>
              {/* Heading: Refined weight */}
              <h2
                className="font-display text-[2.5rem] sm:text-[3.25rem] lg:text-[3.3vw] font-bold tracking-tight text-slate-900 leading-[1.06]"
              >
                <span className="block text-slate-900">Where Design</span>
                <span className="block text-slate-900">
                  Meets <span className="text-[#194e9e]">Manufacturing</span>
                </span>
              </h2>

              {/* Formatted Narrative */}
              <p
                className="mt-3.5 lg:mt-[0.9vw] text-[15px] sm:text-[16px] lg:text-[1.05vw] leading-[1.6] text-slate-600 font-normal max-w-[540px] lg:max-w-[36vw]"
              >
                Our manufacturing facility brings moulding, robotic decoration, and quality auditing together under one roof—ensuring airtight seal integrity and reliable production timelines.
              </p>

              {/* 2 Per Row Grid: [Icon] [Text] horizontal alignment */}
              <div className="mt-8 lg:mt-[1.8vw] grid grid-cols-1 sm:grid-cols-2 gap-x-7 gap-y-5 lg:gap-x-[2vw] lg:gap-y-[1.4vw] pt-1">
                {features.map((feature) => {
                  const IconComponent = feature.icon;
                  return (
                    <div
                      key={feature.title}
                      className="group flex items-start gap-3.5 lg:gap-[0.8vw] transition-transform duration-300 hover:translate-x-1"
                    >
                      {/* Big Icon without card box - direct colored icon */}
                      <div
                        className="shrink-0 transition-transform duration-300 group-hover:scale-110"
                        style={{ color: feature.color }}
                      >
                        <IconComponent
                          className="h-9 w-9 sm:h-10 sm:w-10 lg:h-[2.6vw] lg:w-[2.6vw]"
                          strokeWidth={1.65}
                        />
                      </div>

                      {/* Text block: Title + concise descriptor */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-[15.5px] sm:text-[16.5px] lg:text-[1.1vw] font-semibold text-slate-900 leading-snug tracking-tight group-hover:text-ink transition-colors">
                          {feature.title}
                        </h3>
                        <p className="mt-0.5 lg:mt-[0.15vw] text-[12.5px] sm:text-[13px] lg:text-[0.88vw] leading-relaxed text-slate-600 font-normal">
                          {feature.subtitle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

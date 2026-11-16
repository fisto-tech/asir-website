"use client";

import { Lightbulb, Search, BarChart3, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { WavyHighlight } from "@/components/ui/WavyHighlight";

type Props = {
  index?: string;
};

interface InfographicNode {
  step: string;
  title: string;
  subtitle: string;
  desc: string;
  icon: LucideIcon;
  color: string;
  arcDir: "top" | "bottom";
}

const infographicNodes: InfographicNode[] = [
  {
    step: "01",
    title: "Our Vision",
    subtitle: "Pioneering Innovation",
    desc: "To be a globally trusted partner for rigid packaging solutions, pioneering sustainable mould technology and high-performance industrial containers.",
    icon: Lightbulb,
    color: "#ea5a37", // Coral / Terracotta Orange
    arcDir: "top",
  },
  {
    step: "02",
    title: "Our Mission",
    subtitle: "Certified Quality",
    desc: "Delivering certified, high-grade, 100% leak-proof containers manufactured with virgin food-grade PP to ensure complete client satisfaction and safety.",
    icon: Search,
    color: "#00a89d", // Cyan / Teal
    arcDir: "bottom",
  },
  {
    step: "03",
    title: "Core Values",
    subtitle: "Foundational Excellence",
    desc: "Built on micron-level moulding precision, sustainable polymer stewardship, agile reliability, and enduring customer trust.",
    icon: BarChart3,
    color: "#f5a623", // Amber / Warm Gold
    arcDir: "top",
  },
];

function ShieldBadge({
  color,
  icon: IconComponent,
  className = "-top-[16px] sm:-top-[20px] xl:-top-[5px]",
}: {
  color: string;
  icon: LucideIcon;
  className?: string;
}) {
  return (
    <div className={`absolute left-1/2 -translate-x-1/2 z-10 pointer-events-none ${className}`}>
      <div className="relative w-[36px] h-[46px] sm:w-[44px] sm:h-[56px] xl:w-[3.45vw] xl:h-[4.4vw] flex items-center justify-center">
        <svg viewBox="0 0 52 66" className="w-full h-full drop-shadow-xs" fill="none">
          <path
            d="M0 6 A58 58 0 0 1 52 6 V38 C52 50 26 64 26 64 C26 64 0 50 0 38 Z"
            fill={color}
          />
        </svg>
        <div className="absolute top-2 sm:top-2.5 xl:top-[0.8vw] left-1/2 -translate-x-1/2 text-white transition-transform duration-300 group-hover:scale-110">
          <IconComponent className="w-[17px] h-[17px] sm:w-[21px] sm:h-[21px] xl:w-[1.55vw] xl:h-[1.55vw]" strokeWidth={2.2} />
        </div>
      </div>
    </div>
  );
}

export function VisionMissionSection({ index = "06" }: Props) {
  return (
    <section className="relative overflow-hidden bg-white pt-8 pb-4 lg:pt-[2.5vw] lg:pb-[1.5vw] border-b border-slate-100/80">
      <div className="shell relative z-10 max-w-[1440px] lg:max-w-[92vw] px-5 sm:px-8 lg:px-[4vw]">

        {/* Section Header */}
        <Reveal className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 lg:mb-[2vw]">
          <h2 className="font-display text-[2.4rem] sm:text-[3.1rem] lg:text-[3.3vw] font-bold tracking-tight text-slate-900 leading-[1.08]">
            Our Mission, Vision & <WavyHighlight dot={false}>Core Values</WavyHighlight>
          </h2>
        </Reveal>

        {/* 1. DESKTOP VIEW: Continuous Undulating Smooth Wave with Reduced Inter-Circle Gap (xl and up) */}
        <Reveal data-reveal data-reveal-dir="scale" data-reveal-delay="0.1" className="hidden xl:block">
          <div className="relative w-full max-w-[1140px] xl:max-w-[76vw] mx-auto pt-1 pb-0">
            
            {/* Desktop SVG: viewBox="0 60 1140 380", Centers at 190, 570, 950, Y=250, Curve Radius 180 (Card R=140, Equal Gap=40px) */}
            <svg
              viewBox="0 60 1140 380"
              className="w-full h-auto block select-none pointer-events-none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Concentric guide halo rings around each circle */}
              <circle cx="190" cy="250" r="160" stroke="#f1f5f9" strokeWidth="1" />
              <circle cx="950" cy="250" r="160" stroke="#f1f5f9" strokeWidth="1" />

              {/* Node 1: Coral Arc (Loops Over Top with 40px Equal Gap) + Glides to Midpoint (380, 250) */}
              <path
                d="M 42.6 353.2 A 180 180 0 1 1 360.5 192.4 L 380.0 250.0"
                stroke="#ea5a37"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Node 1 Terminal Dot (Bottom-Left) */}
              <circle cx="42.6" cy="353.2" r="7" fill="#ea5a37" />
              <circle cx="42.6" cy="353.2" r="3.5" fill="#ffffff" />

              {/* Node 2: Teal Arc (Glides from Midpoint 380, 250 + Loops Under Bottom with 40px Equal Gap + Glides to Midpoint 760, 250) */}
              <path
                d="M 380.0 250.0 L 399.5 307.6 A 180 180 0 0 0 740.5 307.6 L 760.0 250.0"
                stroke="#00a89d"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Node 3: Amber Arc (Glides from Midpoint 760, 250 + Loops Over Top with 40px Equal Gap to Terminal Dot) */}
              <path
                d="M 760.0 250.0 L 779.5 192.4 A 180 180 0 1 1 1097.4 353.2"
                stroke="#f5a623"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Node 3 Terminal Dot (Bottom-Right) */}
              <circle cx="1097.4" cy="353.2" r="7" fill="#f5a623" />
              <circle cx="1097.4" cy="353.2" r="3.5" fill="#ffffff" />
            </svg>

            {/* The 3 Circular Nodes (280px x 280px) precisely centered over X=190 (16.667%), 570 (50%), 950 (83.333%) */}
            <div className="absolute inset-0 pointer-events-none">
              {infographicNodes.map((item, idx) => {
                const xPercent = idx === 0
                  ? (190 / 1140) * 100
                  : idx === 1
                  ? 50
                  : (950 / 1140) * 100;

                return (
                  <div
                    key={item.title}
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-auto"
                    style={{ left: `${xPercent.toFixed(3)}%` }}
                  >
                    <div
                      className="group relative w-[280px] h-[280px] xl:w-[18.6vw] xl:h-[18.6vw] rounded-full bg-white shadow-[0_16px_38px_rgba(0,0,0,0.07),0_4px_12px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col items-center justify-center p-6 xl:p-[1.4vw] text-center transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_24px_48px_rgba(0,0,0,0.12)] cursor-default"
                    >
                      <ShieldBadge color={item.color} icon={item.icon} />

                      <div className="mt-7 xl:mt-[1.8vw] flex flex-col items-center max-w-[225px] xl:max-w-[15vw] mx-auto">
                        <h4 className="font-display text-[21.5px] xl:text-[1.4vw] font-bold text-slate-900 leading-tight">
                          {item.title}
                        </h4>
                        <p
                          className="mt-1 xl:mt-[0.25vw] text-[12.5px] xl:text-[0.82vw] font-bold uppercase tracking-wider"
                          style={{ color: item.color }}
                        >
                          {item.subtitle}
                        </p>
                        <p className="mt-2 xl:mt-[0.5vw] text-[14px] xl:text-[0.92vw] leading-[1.48] text-slate-500 font-normal">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </Reveal>

        {/* 2. TABLET & MOBILE VIEW: Responsive Serpentine Flow (Proper padding & auto-fitting on all mobile screens) */}
        <Reveal data-reveal data-reveal-dir="bottom" data-reveal-delay="0.1" className="xl:hidden py-4 sm:py-6">
          <div className="relative w-full max-w-[390px] sm:max-w-[420px] mx-auto">
            
            {/* Vertical SVG: viewBox="0 0 420 1140", Centers at Y=190, 570, 950, X=210, Curve Radius 172 */}
            <svg
              viewBox="0 0 420 1140"
              className="w-full h-auto block select-none pointer-events-none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Concentric guide halo rings around cards */}
              <circle cx="210" cy="190" r="150" stroke="#f1f5f9" strokeWidth="1" />
              <circle cx="210" cy="570" r="150" stroke="#f1f5f9" strokeWidth="1" />
              <circle cx="210" cy="950" r="150" stroke="#f1f5f9" strokeWidth="1" />

              {/* Node 1: Coral Arc (Loops Over Top & Left with 42px Equal Gap) + Glides to Midpoint (210, 380) */}
              <path
                d="M 283.07 34.29 A 172 172 0 1 0 136.93 345.71 L 210.0 380.0"
                stroke="#ea5a37"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Node 1 Terminal Dot (Top-Right) */}
              <circle cx="283.07" cy="34.29" r="7" fill="#ea5a37" />
              <circle cx="283.07" cy="34.29" r="3.5" fill="#ffffff" />

              {/* Node 2: Teal Arc (Glides from Midpoint 210, 380 + Around Right with 42px Equal Gap + Glides to Midpoint 210, 760) */}
              <path
                d="M 210.0 380.0 L 283.07 414.29 A 172 172 0 0 1 283.07 725.71 L 210.0 760.0"
                stroke="#00a89d"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Node 3: Amber Arc (Glides from Midpoint 210, 760 + Around Left & Bottom with 42px Equal Gap to Terminal Dot) */}
              <path
                d="M 210.0 760.0 L 136.93 794.29 A 172 172 0 1 0 283.07 1105.71"
                stroke="#f5a623"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Node 3 Terminal Dot (Bottom-Right) */}
              <circle cx="283.07" cy="1105.71" r="7" fill="#f5a623" />
              <circle cx="283.07" cy="1105.71" r="3.5" fill="#ffffff" />
            </svg>

            {/* The 3 Circular Nodes pinned to exact vertical centers with responsive proportional sizing */}
            <div className="absolute inset-0 pointer-events-none">
              {infographicNodes.map((item, idx) => {
                const yPercent = idx === 0
                  ? (190 / 1140) * 100
                  : idx === 1
                  ? 50
                  : (950 / 1140) * 100;

                return (
                  <div
                    key={item.title}
                    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto w-full flex justify-center"
                    style={{ top: `${yPercent.toFixed(3)}%` }}
                  >
                    <div
                      className="group relative w-[62%] aspect-square max-w-[260px] max-h-[260px] sm:max-w-[275px] sm:max-h-[275px] rounded-full bg-white shadow-[0_16px_38px_rgba(0,0,0,0.07),0_4px_12px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col items-center justify-center pt-5 sm:pt-6 pb-2 sm:pb-3 px-3 sm:px-4 text-center transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(0,0,0,0.12)] cursor-default"
                    >
                      <ShieldBadge color={item.color} icon={item.icon} />

                      {/* Content block: with dedicated top margin to ensure generous breathing room below badge */}
                      <div className="mt-4 sm:mt-5 flex flex-col items-center max-w-[86%] mx-auto px-1">
                        <h4 className="font-display text-[15px] sm:text-[18px] font-bold text-slate-900 leading-tight">
                          {item.title}
                        </h4>
                        <p
                          className="mt-0.5 sm:mt-1 text-[10px] sm:text-[11.5px] font-bold uppercase tracking-wider"
                          style={{ color: item.color }}
                        >
                          {item.subtitle}
                        </p>
                        <p className="mt-1 sm:mt-1.5 text-[10.5px] sm:text-[12.5px] leading-[1.38] sm:leading-[1.42] text-slate-500 font-normal">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </Reveal>

      </div>
    </section>
  );
}

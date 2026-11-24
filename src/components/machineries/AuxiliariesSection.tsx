"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  CheckCircle2,
  Droplets,
  Recycle,
  Snowflake,
  SunMedium,
  Thermometer,
  Wind,
} from "lucide-react";
import { useScrollReveal } from "@/lib/animations";
import { ScrollRotatingLid } from "@/components/machineries/ScrollRotatingLid";
import { HeroFloatingContainer } from "@/components/machineries/HeroFloatingContainer";
import { Reveal } from "@/components/motion/Reveal";

export function AuxiliariesSection() {
  const root = useRef<HTMLElement | null>(null);
  useScrollReveal(root);

  return (
    <>
      <section
        ref={root}
        className="relative overflow-hidden bg-gradient-to-r from-[#d8eeff] via-[#e4ecf2] to-[#d8eeff] py-12 lg:py-[3.5vw]"
      >
        {/* Subtle ambient architectural glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 -top-24 h-[500px] w-[500px] lg:h-[35vw] lg:w-[35vw] rounded-full border-[36px] lg:border-[2.4vw] border-[#0066ff]/[0.04] blur-[1px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -bottom-24 h-[500px] w-[500px] lg:h-[35vw] lg:w-[35vw] rounded-full border-[36px] lg:border-[2.4vw] border-[#0066ff]/[0.04] blur-[1px]"
        />

        <div className="shell relative z-10 max-w-[1440px] lg:max-w-[92vw] px-5 sm:px-8 lg:px-[4vw]">
        {/* Interactive Scroll-Rotating Lid: Positioned inside shell, begins at Topic 1, rotates and glides behind alternating image cards */}
        <ScrollRotatingLid mode="2-topics" />

        <div className="space-y-12 lg:space-y-[3.5vw]">
          {/* Section Header Area — Incorporates floating container in marked position */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[240px] sm:min-h-[260px] lg:min-h-[20vw] pb-6 lg:pb-[2vw] border-b border-slate-300/30">
            <div className="lg:col-span-7 relative z-20 max-w-2xl lg:max-w-[42vw]">
              <h2 className="font-display text-[1.8rem] sm:text-[2.75rem] lg:text-[2.6vw] font-extrabold text-slate-900 tracking-tight leading-tight">
                Continuous Closed-Loop <br />
                <span className="text-[#0066cc]">Chilling & Thermal Control.</span>
              </h2>
              <p className="mt-3 lg:mt-[0.8vw] text-[14.5px] sm:text-[16px] lg:text-[1.05vw] leading-relaxed text-slate-600">
                Uninterrupted cycle times and micron-level container dimensions depend on constant process cooling and precision mold thermal regulation.
              </p>
            </div>
            {/* Right column: Floating container in marked position */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end items-center relative z-20">
              <HeroFloatingContainer />
            </div>
          </div>

          {/* TOPIC 1: Chiller 1 (Image Left, Content Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-[3vw] items-center">
            {/* Image Left - Reduced width, preserved height */}
            <div className="lg:col-span-5 relative z-10 flex justify-start" data-reveal data-reveal-dir="left" data-reveal-delay="0.1">
              <div
                data-topic-card="1"
                className="relative w-full max-w-[430px] lg:max-w-[28vw] h-[360px] sm:h-[400px] lg:h-[27vw] overflow-hidden rounded-2xl lg:rounded-[1.2vw] bg-white shadow-[0_12px_36px_rgba(0,35,80,0.1)] border border-white/80 group"
              >
                <Image
                  src="/images/facility/machinery-01.jpg"
                  alt="Chiller 1 - Central Industrial Water Chiller at Asir Containers"
                  fill
                  sizes="(max-width: 1024px) 100vw, 440px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 lg:bottom-[1vw] lg:left-[1vw] bg-white/90 backdrop-blur-md px-3 py-1.5 lg:px-[0.8vw] lg:py-[0.4vw] rounded-lg lg:rounded-[0.5vw] border border-white/80 shadow-xs flex items-center gap-2 lg:gap-[0.5vw]">
                  <Snowflake className="h-4 w-4 lg:h-[1.1vw] lg:w-[1.1vw] text-[#0066cc]" />
                  <span className="text-[12px] lg:text-[0.78vw] font-bold text-slate-900 font-mono">CHILLER 1 // CENTRAL PLANT</span>
                </div>
              </div>
            </div>

            {/* Text Right */}
            <div className="lg:col-span-7 relative z-20 flex flex-col justify-center pl-0 lg:pl-[2vw]" data-reveal data-reveal-dir="right" data-reveal-delay="0.15">
              <h3 className="font-display text-2xl sm:text-3xl lg:text-[2vw] font-extrabold text-slate-900 tracking-tight">
                Chiller 1 — High-Capacity Industrial Water Chiller
              </h3>

              <p className="mt-3 lg:mt-[0.8vw] text-[15px] sm:text-[16px] lg:text-[1.05vw] leading-relaxed text-slate-700">
                Chiller 1 operates as the central industrial process cooling plant for our heavy-tonnage injection moulding cells. Configured with a multi-stage scroll compressor network and high-efficiency plate heat exchangers, it circulates high-volume chilled water through primary mould core cooling channels. By extracting heat rapidly and evenly during continuous high-speed cycling, Chiller 1 prevents thermal warping, minimizes cycle times, and ensures uniform wall crystallization across large 10-litre to 20-litre rigid containers.
              </p>

              {/* Technical Highlights */}
              <div className="mt-5 lg:mt-[1.2vw] grid grid-cols-1 sm:grid-cols-2 gap-2.5 lg:gap-[0.6vw] pt-4 lg:pt-[1vw] border-t border-slate-300/60">
                <div className="flex items-start gap-2 lg:gap-[0.5vw] text-[13.5px] lg:text-[0.88vw] font-medium text-slate-800">
                  <CheckCircle2 className="h-4 w-4 lg:h-[1.1vw] lg:w-[1.1vw] text-[#0066cc] shrink-0 mt-0.5" />
                  <span>High-volume closed-loop water refrigeration circuit</span>
                </div>
                <div className="flex items-start gap-2 lg:gap-[0.5vw] text-[13.5px] lg:text-[0.88vw] font-medium text-slate-800">
                  <CheckCircle2 className="h-4 w-4 lg:h-[1.1vw] lg:w-[1.1vw] text-[#0066cc] shrink-0 mt-0.5" />
                  <span>Microprocessor PLC temperature stabilization (7°C – 12°C)</span>
                </div>
                <div className="flex items-start gap-2 lg:gap-[0.5vw] text-[13.5px] lg:text-[0.88vw] font-medium text-slate-800">
                  <CheckCircle2 className="h-4 w-4 lg:h-[1.1vw] lg:w-[1.1vw] text-[#0066cc] shrink-0 mt-0.5" />
                  <span>Rapid core heat dissipation eliminating sink marks</span>
                </div>
                <div className="flex items-start gap-2 lg:gap-[0.5vw] text-[13.5px] lg:text-[0.88vw] font-medium text-slate-800">
                  <CheckCircle2 className="h-4 w-4 lg:h-[1.1vw] lg:w-[1.1vw] text-[#0066cc] shrink-0 mt-0.5" />
                  <span>24/7 continuous duty cycle with redundant backup pumps</span>
                </div>
              </div>
            </div>
          </div>

          {/* TOPIC 2: Chiller 2 (Alternate: Content Left, Image Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-[3vw] items-center">
            {/* Text Left */}
            <div className="lg:col-span-7 relative z-20 order-2 lg:order-1 flex flex-col justify-center pr-0 lg:pr-[2vw]" data-reveal data-reveal-dir="left" data-reveal-delay="0.15">
              <h3 className="font-display text-2xl sm:text-3xl lg:text-[2vw] font-extrabold text-slate-900 tracking-tight">
                Chiller 2 — Precision Auxiliary Chilling System
              </h3>

              <p className="mt-3 lg:mt-[0.8vw] text-[15px] sm:text-[16px] lg:text-[1.05vw] leading-relaxed text-slate-700">
                Chiller 2 is dedicated to secondary loop chilling and high-precision mould temperature control across intricate tooling zones. Equipped with independent micro-calibrated temperature controllers, it regulates chilled fluid delivery directly to critical container neck finishes, tamper-evident locking rings, and lid seal channels. This pinpoint thermal management controls differential shrinkage, guarantees leak-tight hermetic sealing, and maintains tight dimensional tolerances within ±0.015mm.
              </p>

              {/* Technical Highlights */}
              <div className="mt-5 lg:mt-[1.2vw] grid grid-cols-1 sm:grid-cols-2 gap-2.5 lg:gap-[0.6vw] pt-4 lg:pt-[1vw] border-t border-slate-300/60">
                <div className="flex items-start gap-2 lg:gap-[0.5vw] text-[13.5px] lg:text-[0.88vw] font-medium text-slate-800">
                  <CheckCircle2 className="h-4 w-4 lg:h-[1.1vw] lg:w-[1.1vw] text-[#0066cc] shrink-0 mt-0.5" />
                  <span>Independent multi-zone auxiliary chilling loops</span>
                </div>
                <div className="flex items-start gap-2 lg:gap-[0.5vw] text-[13.5px] lg:text-[0.88vw] font-medium text-slate-800">
                  <CheckCircle2 className="h-4 w-4 lg:h-[1.1vw] lg:w-[1.1vw] text-[#0066cc] shrink-0 mt-0.5" />
                  <span>Precision thermal regulation within ±0.5°C</span>
                </div>
                <div className="flex items-start gap-2 lg:gap-[0.5vw] text-[13.5px] lg:text-[0.88vw] font-medium text-slate-800">
                  <CheckCircle2 className="h-4 w-4 lg:h-[1.1vw] lg:w-[1.1vw] text-[#0066cc] shrink-0 mt-0.5" />
                  <span>Dedicated cooling for lid grooves & tamper-evident bands</span>
                </div>
                <div className="flex items-start gap-2 lg:gap-[0.5vw] text-[13.5px] lg:text-[0.88vw] font-medium text-slate-800">
                  <CheckCircle2 className="h-4 w-4 lg:h-[1.1vw] lg:w-[1.1vw] text-[#0066cc] shrink-0 mt-0.5" />
                  <span>Closed-circuit rust-inhibited fluid with pressure balance</span>
                </div>
              </div>
            </div>

            {/* Image Right - Reduced width, preserved height */}
            <div className="lg:col-span-5 relative z-10 order-1 lg:order-2 flex justify-end" data-reveal data-reveal-dir="right" data-reveal-delay="0.1">
              <div
                data-topic-card="2"
                className="relative w-full max-w-[430px] lg:max-w-[28vw] h-[360px] sm:h-[400px] lg:h-[27vw] overflow-hidden rounded-2xl lg:rounded-[1.2vw] bg-white shadow-[0_12px_36px_rgba(0,35,80,0.1)] border border-white/80 group"
              >
                <Image
                  src="/images/facility/machinery-02.jpg"
                  alt="Chiller 2 - Dedicated Tool Temperature Control System at Asir Containers"
                  fill
                  sizes="(max-width: 1024px) 100vw, 440px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 lg:bottom-[1vw] lg:left-[1vw] bg-white/90 backdrop-blur-md px-3 py-1.5 lg:px-[0.8vw] lg:py-[0.4vw] rounded-lg lg:rounded-[0.5vw] border border-white/80 shadow-xs flex items-center gap-2 lg:gap-[0.5vw]">
                  <Thermometer className="h-4 w-4 lg:h-[1.1vw] lg:w-[1.1vw] text-[#0066cc]" />
                  <span className="text-[12px] lg:text-[0.78vw] font-bold text-slate-900 font-mono">CHILLER 2 // MTC CONTROL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* Complete Auxiliary Plant Support Ledger (Clean White Strip Matching Banner) */}
      <section className="relative bg-white pt-8 sm:pt-10 lg:pt-[2.5vw] pb-6 sm:pb-8 lg:pb-[2vw]">
        <Reveal className="shell relative z-10 max-w-[1440px] lg:max-w-[92vw] px-5 sm:px-8 lg:px-[4vw]">
          <div data-reveal data-reveal-dir="up" data-reveal-delay="0.1">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 lg:mb-[1.5vw] pb-3 border-b border-slate-200/80">
              <div className="flex items-center gap-2.5">
                <span className="h-[2px] w-6 lg:w-[1.5vw] bg-[#194e9e]" />
                <h3 className="font-display text-[17px] sm:text-[19px] lg:text-[1.25vw] font-bold text-slate-900 tracking-tight">
                  Plant Auxiliary Footprint
                </h3>
                <span className="text-slate-300 select-none">|</span>
                <span className="font-mono text-[11.5px] sm:text-[12px] lg:text-[0.78vw] font-bold uppercase tracking-wider text-[#194e9e]">
                  Complete Inventory
                </span>
              </div>
              <span className="text-[12px] sm:text-[12.5px] lg:text-[0.8vw] font-semibold text-slate-500">
                Synchronized Process Infrastructure
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 lg:gap-[1.2vw]">
              <div className="border-l-2 lg:border-l-[0.18vw] border-[#194e9e] pl-3.5 lg:pl-[0.8vw] py-1">
                <div className="flex items-center gap-1.5 lg:gap-[0.4vw] text-slate-800 font-bold text-[13px] lg:text-[0.85vw]">
                  <Snowflake className="h-4 w-4 lg:h-[1vw] lg:w-[1vw] text-[#194e9e] shrink-0" />
                  <span>Chilling Plants</span>
                </div>
                <div className="font-display font-black text-[20px] lg:text-[1.3vw] text-slate-950 mt-1 lg:mt-[0.25vw]">2 Units</div>
                <div className="text-[11.5px] lg:text-[0.75vw] font-semibold text-slate-600 mt-0.5">Chiller 1 & Chiller 2</div>
              </div>

              <div className="border-l-2 lg:border-l-[0.18vw] border-amber-500 pl-3.5 lg:pl-[0.8vw] py-1">
                <div className="flex items-center gap-1.5 lg:gap-[0.4vw] text-slate-800 font-bold text-[13px] lg:text-[0.85vw]">
                  <SunMedium className="h-4 w-4 lg:h-[1vw] lg:w-[1vw] text-amber-600 shrink-0" />
                  <span>Hopper Dryers</span>
                </div>
                <div className="font-display font-black text-[20px] lg:text-[1.3vw] text-slate-950 mt-1 lg:mt-[0.25vw]">8 Units</div>
                <div className="text-[11.5px] lg:text-[0.75vw] font-semibold text-slate-600 mt-0.5">Continuous Dehumidifying</div>
              </div>

              <div className="border-l-2 lg:border-l-[0.18vw] border-rose-500 pl-3.5 lg:pl-[0.8vw] py-1">
                <div className="flex items-center gap-1.5 lg:gap-[0.4vw] text-slate-800 font-bold text-[13px] lg:text-[0.85vw]">
                  <Thermometer className="h-4 w-4 lg:h-[1vw] lg:w-[1vw] text-rose-600 shrink-0" />
                  <span>Mould Temp</span>
                </div>
                <div className="font-display font-black text-[20px] lg:text-[1.3vw] text-slate-950 mt-1 lg:mt-[0.25vw]">6 Units</div>
                <div className="text-[11.5px] lg:text-[0.75vw] font-semibold text-slate-600 mt-0.5">MTC Micro-Regulation</div>
              </div>

              <div className="border-l-2 lg:border-l-[0.18vw] border-emerald-500 pl-3.5 lg:pl-[0.8vw] py-1">
                <div className="flex items-center gap-1.5 lg:gap-[0.4vw] text-slate-800 font-bold text-[13px] lg:text-[0.85vw]">
                  <Recycle className="h-4 w-4 lg:h-[1vw] lg:w-[1vw] text-emerald-600 shrink-0" />
                  <span>Granulators</span>
                </div>
                <div className="font-display font-black text-[20px] lg:text-[1.3vw] text-slate-950 mt-1 lg:mt-[0.25vw]">4 Units</div>
                <div className="text-[11.5px] lg:text-[0.75vw] font-semibold text-slate-600 mt-0.5">Closed-Loop Recycling</div>
              </div>

              <div className="border-l-2 lg:border-l-[0.18vw] border-indigo-500 pl-3.5 lg:pl-[0.8vw] py-1">
                <div className="flex items-center gap-1.5 lg:gap-[0.4vw] text-slate-800 font-bold text-[13px] lg:text-[0.85vw]">
                  <Wind className="h-4 w-4 lg:h-[1vw] lg:w-[1vw] text-indigo-600 shrink-0" />
                  <span>Compressors</span>
                </div>
                <div className="font-display font-black text-[20px] lg:text-[1.3vw] text-slate-950 mt-1 lg:mt-[0.25vw]">3 Units</div>
                <div className="text-[11.5px] lg:text-[0.75vw] font-semibold text-slate-600 mt-0.5">Multi-Bar Screw Air</div>
              </div>

              <div className="border-l-2 lg:border-l-[0.18vw] border-sky-500 pl-3.5 lg:pl-[0.8vw] py-1">
                <div className="flex items-center gap-1.5 lg:gap-[0.4vw] text-slate-800 font-bold text-[13px] lg:text-[0.85vw]">
                  <Droplets className="h-4 w-4 lg:h-[1vw] lg:w-[1vw] text-sky-600 shrink-0" />
                  <span>Cooling Tower</span>
                </div>
                <div className="font-display font-black text-[20px] lg:text-[1.3vw] text-slate-950 mt-1 lg:mt-[0.25vw]">1 Unit</div>
                <div className="text-[11.5px] lg:text-[0.75vw] font-semibold text-slate-600 mt-0.5">Induced Draft System</div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}


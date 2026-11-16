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

export function AuxiliariesSection() {
  const root = useRef<HTMLElement | null>(null);
  useScrollReveal(root);

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-gradient-to-r from-[#d8eeff] via-[#e4ecf2] to-[#d8eeff] py-12 lg:py-[3.5vw] border-b border-[#cfe6fa]"
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
        {/* Interactive Scroll-Rotating Lid: Positioned inside shell, begins in top-right hero circle, rotates and glides behind alternating image cards */}
        <ScrollRotatingLid mode="2-topics" />

        <div className="space-y-12 lg:space-y-[3.5vw]">
          {/* Section Header Area — Dedicated height & right-side clearance so the lid NEVER merges with text */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[240px] sm:min-h-[260px] lg:min-h-[20vw] pb-6 lg:pb-[2vw] border-b border-slate-300/30">
            <div className="lg:col-span-7 relative z-20 max-w-2xl lg:max-w-[42vw] pr-20 sm:pr-24 lg:pr-0">
              <h2 className="font-display text-[1.8rem] sm:text-[2.75rem] lg:text-[2.6vw] font-extrabold text-slate-900 tracking-tight leading-tight">
                Continuous Closed-Loop <br />
                <span className="text-[#0066cc]">Chilling & Thermal Control.</span>
              </h2>
              <p className="mt-3 lg:mt-[0.8vw] text-[14.5px] sm:text-[16px] lg:text-[1.05vw] leading-relaxed text-slate-600">
                Uninterrupted cycle times and micron-level container dimensions depend on constant process cooling and precision mold thermal regulation.
              </p>
            </div>
            {/* Right column empty spacer — explicitly reserves the space for the lid */}
            <div className="lg:col-span-5 hidden lg:block" aria-hidden="true" />
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

        {/* Complete Auxiliary Plant Support Ledger (Minimal Architectural Strip - No SaaS Cards) */}
        <div className="pt-8 lg:pt-[2vw] border-t border-slate-300/60" data-reveal data-reveal-dir="up" data-reveal-delay="0.1">
          <div className="flex items-center justify-between mb-4 lg:mb-[1vw]">
            <span className="font-mono text-[11px] lg:text-[0.75vw] font-bold tracking-wider text-[#0066cc] uppercase">
              PLANT AUXILIARY FOOTPRINT // COMPLETE INVENTORY
            </span>
            <span className="text-[12px] lg:text-[0.8vw] font-medium text-slate-500">Synchronized Process Infrastructure</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-[1vw]">
            <div className="border-l-2 lg:border-l-[0.15vw] border-[#0066cc] pl-3 lg:pl-[0.8vw] py-1 lg:py-[0.3vw]">
              <div className="flex items-center gap-1.5 lg:gap-[0.4vw] text-slate-500 text-[12px] lg:text-[0.8vw]">
                <Snowflake className="h-3.5 w-3.5 lg:h-[0.9vw] lg:w-[0.9vw] text-[#0066cc]" />
                <span>Chilling Plants</span>
              </div>
              <div className="font-display font-extrabold text-[18px] lg:text-[1.2vw] text-slate-900 mt-0.5 lg:mt-[0.2vw]">2 Units</div>
              <div className="text-[11px] lg:text-[0.72vw] text-slate-500">Chiller 1 & Chiller 2</div>
            </div>

            <div className="border-l-2 lg:border-l-[0.15vw] border-amber-500 pl-3 lg:pl-[0.8vw] py-1 lg:py-[0.3vw]">
              <div className="flex items-center gap-1.5 lg:gap-[0.4vw] text-slate-500 text-[12px] lg:text-[0.8vw]">
                <SunMedium className="h-3.5 w-3.5 lg:h-[0.9vw] lg:w-[0.9vw] text-amber-500" />
                <span>Hopper Dryers</span>
              </div>
              <div className="font-display font-extrabold text-[18px] lg:text-[1.2vw] text-slate-900 mt-0.5 lg:mt-[0.2vw]">8 Units</div>
              <div className="text-[11px] lg:text-[0.72vw] text-slate-500">Continuous Dehumidifying</div>
            </div>

            <div className="border-l-2 lg:border-l-[0.15vw] border-rose-500 pl-3 lg:pl-[0.8vw] py-1 lg:py-[0.3vw]">
              <div className="flex items-center gap-1.5 lg:gap-[0.4vw] text-slate-500 text-[12px] lg:text-[0.8vw]">
                <Thermometer className="h-3.5 w-3.5 lg:h-[0.9vw] lg:w-[0.9vw] text-rose-500" />
                <span>Mould Temp</span>
              </div>
              <div className="font-display font-extrabold text-[18px] lg:text-[1.2vw] text-slate-900 mt-0.5 lg:mt-[0.2vw]">6 Units</div>
              <div className="text-[11px] lg:text-[0.72vw] text-slate-500">MTC Micro-Regulation</div>
            </div>

            <div className="border-l-2 lg:border-l-[0.15vw] border-emerald-500 pl-3 lg:pl-[0.8vw] py-1 lg:py-[0.3vw]">
              <div className="flex items-center gap-1.5 lg:gap-[0.4vw] text-slate-500 text-[12px] lg:text-[0.8vw]">
                <Recycle className="h-3.5 w-3.5 lg:h-[0.9vw] lg:w-[0.9vw] text-emerald-500" />
                <span>Granulators</span>
              </div>
              <div className="font-display font-extrabold text-[18px] lg:text-[1.2vw] text-slate-900 mt-0.5 lg:mt-[0.2vw]">4 Units</div>
              <div className="text-[11px] lg:text-[0.72vw] text-slate-500">Closed-Loop Recycling</div>
            </div>

            <div className="border-l-2 lg:border-l-[0.15vw] border-indigo-500 pl-3 lg:pl-[0.8vw] py-1 lg:py-[0.3vw]">
              <div className="flex items-center gap-1.5 lg:gap-[0.4vw] text-slate-500 text-[12px] lg:text-[0.8vw]">
                <Wind className="h-3.5 w-3.5 lg:h-[0.9vw] lg:w-[0.9vw] text-indigo-500" />
                <span>Compressors</span>
              </div>
              <div className="font-display font-extrabold text-[18px] lg:text-[1.2vw] text-slate-900 mt-0.5 lg:mt-[0.2vw]">3 Units</div>
              <div className="text-[11px] lg:text-[0.72vw] text-slate-500">Multi-Bar Screw Air</div>
            </div>

            <div className="border-l-2 lg:border-l-[0.15vw] border-sky-500 pl-3 lg:pl-[0.8vw] py-1 lg:py-[0.3vw]">
              <div className="flex items-center gap-1.5 lg:gap-[0.4vw] text-slate-500 text-[12px] lg:text-[0.8vw]">
                <Droplets className="h-3.5 w-3.5 lg:h-[0.9vw] lg:w-[0.9vw] text-sky-500" />
                <span>Cooling Tower</span>
              </div>
              <div className="font-display font-extrabold text-[18px] lg:text-[1.2vw] text-slate-900 mt-0.5 lg:mt-[0.2vw]">1 Unit</div>
              <div className="text-[11px] lg:text-[0.72vw] text-slate-500">Induced Draft System</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}


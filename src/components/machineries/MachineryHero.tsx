"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Box,
  Cog,
  Crosshair,
  Snowflake,
  Thermometer,
} from "lucide-react";
import { useScrollReveal } from "@/lib/animations";

const ICON_MAP = {
  box: Box,
  cog: Cog,
  crosshair: Crosshair,
  snowflake: Snowflake,
  thermometer: Thermometer,
  activity: Activity,
} as const;

export type IconKey = keyof typeof ICON_MAP;

export type MetricItem = {
  value: string;
  label: string;
  icon: IconKey;
  bgColor: string;
  textColor: string;
  ringColor: string;
};

export type MachineryHeroProps = {
  badge?: string;
  titleLine1: string;
  titleLine2: string;
  titleHighlight: string;
  description: string;
  metrics: MetricItem[];
  imageSrc: string;
  imageAlt: string;
};

export function MachineryHero({
  badge,
  titleLine1,
  titleLine2,
  titleHighlight,
  description,
  metrics,
  imageSrc,
  imageAlt,
}: MachineryHeroProps) {
  const root = useRef<HTMLElement | null>(null);
  useScrollReveal(root);

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-white pt-24 sm:pt-28 lg:pt-0 border-b border-line/60 w-full"
    >
      {/* Full width split grid without containerisation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px] sm:min-h-[560px] lg:min-h-[38vw] items-stretch w-full">
        {/* Left Column: Heading, Metrics & CTA */}
        <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center pl-6 sm:pl-12 lg:pl-[4.5vw] xl:pl-[5.5vw] pr-6 lg:pr-[2.5vw] py-10 lg:py-[5vw] z-10">
          <div className="max-w-xl lg:max-w-[36vw]">
            {/* Eyebrow Architectural Marker (Optional) */}
            {badge && (
              <div data-reveal data-reveal-dir="left" data-reveal-delay="0.05" className="mb-3 lg:mb-[0.7vw]">
                <span className="font-mono text-[12px] lg:text-[0.82vw] font-bold tracking-wider text-[#0066cc] uppercase">
                  {badge}
                </span>
              </div>
            )}

            {/* Title with Bidirectional Entrance */}
            <div data-reveal data-reveal-dir="left" data-reveal-delay="0.1">
              <h1 className="font-display text-[2.3rem] sm:text-[3.2rem] lg:text-[3.3vw] font-extrabold tracking-tight text-ink leading-[1.06]">
                {titleLine1} <br />
                {titleLine2} <br />
                <span className="text-brand">{titleHighlight}</span>
              </h1>
            </div>

            {/* Description */}
            <div data-reveal data-reveal-dir="up" data-reveal-delay="0.2">
              <p className="mt-4 lg:mt-[1vw] text-[15px] sm:text-[16px] lg:text-[1.05vw] leading-relaxed text-slate-600 max-w-lg lg:max-w-[34vw]">
                {description}
              </p>
            </div>

            {/* 3 Metric Badges */}
            <div className="mt-7 lg:mt-[1.8vw] flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-6 lg:gap-[1.5vw]">
              {metrics.map((metric, idx) => {
                const Icon = ICON_MAP[metric.icon] ?? Cog;
                return (
                  <div
                    key={metric.label}
                    data-reveal
                    data-reveal-dir="scale"
                    data-reveal-delay={(0.25 + idx * 0.07).toFixed(2)}
                    className="flex items-center gap-3 lg:gap-[0.6vw]"
                  >
                    <span
                      className={`flex h-10 w-10 lg:h-[2.6vw] lg:w-[2.6vw] shrink-0 items-center justify-center rounded-xl lg:rounded-[0.7vw] shadow-xs ${metric.bgColor} ${metric.textColor} ring-1 ${metric.ringColor}`}
                    >
                      <Icon className="h-5 w-5 lg:h-[1.3vw] lg:w-[1.3vw]" />
                    </span>
                    <div>
                      <div className="font-display text-[14px] sm:text-[14.5px] lg:text-[1vw] font-bold text-ink leading-tight">
                        {metric.value}
                      </div>
                      <div className="text-[11px] lg:text-[0.76vw] font-medium text-slate-500">{metric.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <div data-reveal data-reveal-dir="up" data-reveal-delay="0.45" className="mt-8 lg:mt-[1.8vw] flex items-center">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2.5 lg:gap-[0.6vw] px-7 lg:px-[1.6vw] py-3.5 lg:py-[0.8vw] rounded-xl lg:rounded-[0.6vw] bg-brand text-white font-semibold text-sm lg:text-[0.95vw] shadow-xs transition-all duration-300 hover:bg-brand-dark hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Request Allocation</span>
                <ArrowRight className="h-4 w-4 lg:h-[1vw] lg:w-[1vw] transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Full-Bleed Hero Visual with Two-Way Animation */}
        <div className="lg:col-span-6 xl:col-span-7 relative min-h-[340px] sm:min-h-[420px] lg:min-h-full w-full overflow-hidden group/techhero">
          <div
            data-reveal
            data-reveal-dir="clip-rtl"
            data-reveal-delay="0.18"
            className="relative h-full w-full min-h-[340px] sm:min-h-[420px] lg:min-h-full"
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-center lg:object-left transition-transform duration-700 ease-out group-hover/techhero:scale-105"
            />

            {/* Top ambient scrim under transparent header for crisp text contrast */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/95 via-white/50 to-transparent z-10" />

            {/* Diagonal Architectural Cut & Blue Accent Stroke */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full hidden sm:block"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <polygon points="0,0 12,0 0,28" fill="#ffffff" />
              <line
                x1="12"
                y1="0"
                x2="0"
                y2="28"
                stroke="#0066cc"
                strokeWidth="1.6"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}


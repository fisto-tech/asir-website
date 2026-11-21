"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  Box,
  Layers,
  Leaf,
  Microwave,
  Recycle,
  ShieldCheck,
  Snowflake,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import { gsap, ScrollTrigger, useGSAP, reduceMotion } from "@/lib/animations";

type FeatureItem = {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  bgColor: string;
  icon: LucideIcon;
  pos: { left: string; top: string };
  posClass?: string;
  align?: "left" | "right" | "top" | "bottom";
};

// 8 feature nodes arranged symmetrically in a PROPER CIRCLE with outward-radiating text
const featuresList: FeatureItem[] = [
  {
    id: "printable",
    title: "PRINTABLE",
    subtitle: "Custom Branding",
    color: "#b45309",
    bgColor: "#fffbeb",
    icon: Box,
    pos: { left: "35%", top: "25%" },
    posClass: "-translate-x-full -translate-y-1/2",
    align: "left",
  },
  {
    id: "oven-safe",
    title: "OVEN SAFE",
    subtitle: "Microwave Friendly",
    color: "#ea580c",
    bgColor: "#fff7ed",
    icon: Microwave,
    pos: { left: "50%", top: "6%" },
    posClass: "-translate-x-1/2 -translate-y-1/2",
    align: "top",
  },
  {
    id: "hygienic",
    title: "HYGIENIC",
    subtitle: "Untouched by Hand",
    color: "#0284c7",
    bgColor: "#f0f9ff",
    icon: ShieldCheck,
    pos: { left: "65%", top: "25%" },
    posClass: "-translate-y-1/2",
    align: "right",
  },
  {
    id: "stackable",
    title: "STACKABLE",
    subtitle: "Compact Storage",
    color: "#1d4ed8",
    bgColor: "#eff6ff",
    icon: Layers,
    pos: { left: "72%", top: "50%" },
    posClass: "-translate-y-1/2",
    align: "right",
  },
  {
    id: "bpa-free",
    title: "BPA FREE",
    subtitle: "100% Non-Toxic",
    color: "#16a34a",
    bgColor: "#f0fdf4",
    icon: Leaf,
    pos: { left: "65%", top: "75%" },
    posClass: "-translate-y-1/2",
    align: "right",
  },
  {
    id: "food-safe",
    title: "FOOD SAFE",
    subtitle: "Food Grade Certified",
    color: "#0d9488",
    bgColor: "#f0fdfa",
    icon: Utensils,
    pos: { left: "50%", top: "94%" },
    posClass: "-translate-x-1/2 -translate-y-1/2",
    align: "bottom",
  },
  {
    id: "freezer-safe",
    title: "FREEZER SAFE",
    subtitle: "Freezer Proof",
    color: "#2563eb",
    bgColor: "#eff6ff",
    icon: Snowflake,
    pos: { left: "35%", top: "75%" },
    posClass: "-translate-x-full -translate-y-1/2",
    align: "left",
  },
  {
    id: "recyclable",
    title: "RECYCLABLE",
    subtitle: "Eco & Sustainable",
    color: "#15803d",
    bgColor: "#f0fdf4",
    icon: Recycle,
    pos: { left: "28%", top: "50%" },
    posClass: "-translate-x-full -translate-y-1/2",
    align: "left",
  },
];

// 5 compact circular arcs with fading opacity on the trailing edge (ending edge fadeout)
const orbitArcs = [
  {
    id: 1,
    x1: 150,
    y1: 30,
    x2: 239.2,
    y2: 69.7,
    d: "M 150 30 A 120 120 0 0 1 239.2 69.7",
  },
  {
    id: 2,
    x1: 264.1,
    y1: 112.9,
    x2: 253.9,
    y2: 210,
    d: "M 264.1 112.9 A 120 120 0 0 1 253.9 210",
  },
  {
    id: 3,
    x1: 220.5,
    y1: 247.1,
    x2: 125.1,
    y2: 267.4,
    d: "M 220.5 247.1 A 120 120 0 0 1 125.1 267.4",
  },
  {
    id: 4,
    x1: 79.5,
    y1: 247.1,
    x2: 30.7,
    y2: 162.5,
    d: "M 79.5 247.1 A 120 120 0 0 1 30.7 162.5",
  },
  {
    id: 5,
    x1: 35.9,
    y1: 112.9,
    x2: 101.2,
    y2: 40.4,
    d: "M 35.9 112.9 A 120 120 0 0 1 101.2 40.4",
  },
];

type Props = {
  index?: string;
};

export function FeaturesSection({ index = "02" }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (reduceMotion()) return;

      const mm = gsap.matchMedia();

      // Tablet and Desktop (>= 768px): animate circular orbit + automatic periodic pop-up loop
      mm.add("(min-width: 768px)", () => {
        // Continuous slow ambient rotation of orbit ring
        gsap.to(".feature-orbit-ring", {
          rotation: 360,
          duration: 60,
          repeat: -1,
          ease: "none",
          transformOrigin: "50% 50%",
        });

        // Automatic Pop-Up Timeline: Highlights each feature node sequentially in a continuous loop
        const autoPopLoop = gsap.timeline({ repeat: -1, delay: 0.3, paused: true });

        featuresList.forEach((item, i) => {
          const badge = `.feature-badge-${i}`;
          const text = `.feature-text-${i}`;
          const icon = `.feature-icon-${i}`;

          autoPopLoop
            // Pop up node i
            .to(badge, {
              scale: 1.22,
              duration: 0.4,
              ease: "back.out(2.2)",
            })
            .to(icon, { scale: 1.15, duration: 0.32, ease: "back.out(2)" }, "<")
            .to(text, { scale: 1.08, duration: 0.32, ease: "power2.out" }, "<")
            // Hold popped-up state for 1.4 seconds
            .to({}, { duration: 1.4 })
            // Ease back to normal rest state
            .to(badge, {
              scale: 1,
              duration: 0.35,
              ease: "power2.out",
            })
            .to(icon, { scale: 1, duration: 0.3, ease: "power2.out" }, "<")
            .to(text, { scale: 1, duration: 0.3, ease: "power2.out" }, "<0.05");
        });

        const tl = gsap.timeline({
          onComplete: () => {
            autoPopLoop.play();
          },
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          },
        });

        // 1. Header reveal
        tl.from(".feature-header-left", {
          x: -25,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        })
        .from(
          ".feature-header-right",
          {
            x: 25,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        )

        // 2. Center Pail Visual
        .from(
          ".feature-center-pails",
          {
            scale: 0.85,
            opacity: 0,
            duration: 0.9,
            ease: "back.out(1.2)",
          },
          "-=0.5"
        )

        // 3. Circular Orbit Arcs
        .from(
          ".feature-orbit-arc",
          {
            opacity: 0,
            scale: 0.94,
            duration: 0.7,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.7"
        )

        // 4. Staggered 8 Feature Nodes
        .from(
          ".feature-node",
          {
            scale: 0.7,
            opacity: 0,
            duration: 0.7,
            stagger: 0.06,
            ease: "back.out(1.4)",
          },
          "-=0.4"
        );

        // Pause auto-pop only when cursor specifically hovers over a feature node
        const nodes = containerRef.current?.querySelectorAll(".feature-node");
        nodes?.forEach((node) => {
          node.addEventListener("mouseenter", () => autoPopLoop.pause());
          node.addEventListener("mouseleave", () => autoPopLoop.resume());
        });

        // Reliable viewport ScrollTrigger: Play when in view, pause when out of view
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top 85%",
          end: "bottom 15%",
          onEnter: () => autoPopLoop.play(),
          onLeave: () => autoPopLoop.pause(),
          onEnterBack: () => autoPopLoop.resume(),
          onLeaveBack: () => autoPopLoop.pause(),
        });
      });

      // Mobile (< 768px): subtle slide-up entrance + sequential card pop-up loop
      mm.add("(max-width: 767px)", () => {
        const mobilePopLoop = gsap.timeline({ repeat: -1, delay: 0.4, paused: true });
        featuresList.forEach((item, i) => {
          const card = `.feature-mobile-card-${i}`;
          const badge = `.feature-mobile-badge-${i}`;

          mobilePopLoop
            .to(card, {
              scale: 1.05,
              borderColor: item.color,
              duration: 0.35,
              ease: "back.out(1.8)",
            })
            .to(badge, { scale: 1.18, duration: 0.3, ease: "back.out(2)" }, "<")
            // Hold for 1.4 seconds
            .to({}, { duration: 1.4 })
            .to(card, {
              scale: 1,
              borderColor: "rgba(226, 232, 240, 0.9)",
              duration: 0.35,
              ease: "power2.out",
            })
            .to(badge, { scale: 1, duration: 0.3, ease: "power2.out" }, "<");
        });

        gsap.from(".feature-mobile-card", {
          y: 8,
          duration: 0.35,
          stagger: 0.02,
          ease: "power2.out",
          onComplete: () => mobilePopLoop.play(),
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            once: true,
          },
        });

        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top 90%",
          end: "bottom 10%",
          onEnter: () => mobilePopLoop.play(),
          onLeave: () => mobilePopLoop.pause(),
          onEnterBack: () => mobilePopLoop.resume(),
          onLeaveBack: () => mobilePopLoop.pause(),
        });
      });

      // Subtle float animation on center pails
      gsap.to(".feature-center-pails-img", {
        y: -5,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative bg-white py-8 sm:py-10 md:py-12 lg:py-[2.5vw] border-b border-slate-100"
    >
      <div className="mx-auto w-full max-w-[1380px] lg:max-w-[92vw] px-4 sm:px-8 lg:px-[4vw] relative z-10">
        
        {/* Top Header: "Product" in black text, "Features" in brand blue across 2 lines */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0 pt-2 lg:pt-[0.5vw]">
          <div className="feature-header-left">
            <h2 className="text-[2.2rem] sm:text-[3.2rem] lg:text-[3.3vw] font-extrabold tracking-tight leading-[1.06]">
              <span className="text-slate-900">Product</span>
              <br />
              <span className="text-[#024182]">Features</span>
            </h2>
          </div>

          <div className="feature-header-right sm:text-right max-w-sm lg:max-w-[26vw]">
            <p className="text-slate-600 text-[14px] sm:text-[15.5px] lg:text-[1.05vw] font-medium leading-relaxed">
              Thoughtfully designed for safer, cleaner and more convenient storage.
            </p>
          </div>
        </div>

        {/* Tablet & Desktop Circular Presentation (>= md: 768px and up) */}
        <div className="hidden md:flex flex-1 items-center justify-center relative w-full my-auto py-6 lg:py-[1.5vw]">
          <div className="relative w-full max-w-[720px] lg:max-w-none lg:w-[64vw] h-[440px] md:h-[450px] lg:h-[36.5vw] mx-auto origin-center">
            
            {/* Arrow Circle with Fading Opacity on Trailing Edges */}
            <div className="feature-orbit-ring absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[320px] md:h-[320px] lg:w-[23vw] lg:h-[23vw] pointer-events-none select-none z-0">
              <svg
                viewBox="0 0 300 300"
                className="w-full h-full pointer-events-none"
                fill="none"
              >
                <defs>
                  {/* Subtle small arrowhead marker */}
                  <marker
                    id="orbit-arrow"
                    viewBox="0 0 6 6"
                    refX="4.5"
                    refY="3"
                    markerWidth="3.5"
                    markerHeight="3.5"
                    orient="auto"
                  >
                    <path d="M 0.5 0.8 L 5 3 L 0.5 5.2 z" fill="#475569" />
                  </marker>

                  {/* Individual gradients for each arc: trailing edge fades out to low opacity */}
                  {orbitArcs.map((arc) => (
                    <linearGradient
                      key={`grad-${arc.id}`}
                      id={`arc-grad-${arc.id}`}
                      x1={arc.x1}
                      y1={arc.y1}
                      x2={arc.x2}
                      y2={arc.y2}
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0%" stopColor="#64748b" stopOpacity="0.04" />
                      <stop offset="60%" stopColor="#64748b" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#334155" stopOpacity="0.85" />
                    </linearGradient>
                  ))}
                </defs>

                {/* 5 Clockwise Directional Arcs with Fading Trailing Edges */}
                {orbitArcs.map((arc) => (
                  <path
                    key={arc.id}
                    d={arc.d}
                    stroke={`url(#arc-grad-${arc.id})`}
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    markerEnd="url(#orbit-arrow)"
                    className="feature-orbit-arc"
                  />
                ))}
              </svg>
            </div>

            {/* Centerpiece: White Buckets with Blue Base Graphic - Sits tightly inside circle */}
            <div className="feature-center-pails absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[120px] md:w-[200px] md:h-[135px] lg:w-[15vw] lg:h-[10vw] flex items-center justify-center pointer-events-none select-none z-10">
              <div className="relative w-full h-full">
                <Image
                  src="/images/features/product-features-pails.webp"
                  alt="ASIR Containers Rigid Plastic Packaging Range"
                  fill
                  priority
                  sizes="(min-width: 1024px) 20vw, 240px"
                  className="feature-center-pails-img object-contain object-center drop-shadow-[0_12px_24px_rgba(0,40,100,0.12)]"
                />
              </div>
            </div>

            {/* 8 Feature Nodes Aligned in a PROPER CIRCLE with Outward-Radiating Labels */}
            {featuresList.map((item, index) => {
              const IconComponent = item.icon;
              const isLeft = item.align === "left";
              const isTop = item.align === "top";
              const isBottom = item.align === "bottom";

              return (
                <div
                  key={item.id}
                  style={{
                    left: item.pos.left,
                    top: item.pos.top,
                  }}
                  className={`feature-node feature-node-${index} absolute ${item.posClass ?? "-translate-y-1/2"} flex ${
                    isLeft
                      ? "flex-row-reverse text-right"
                      : isTop
                      ? "flex-col-reverse items-center text-center"
                      : isBottom
                      ? "flex-col items-center text-center"
                      : "flex-row text-left items-center"
                  } ${
                    isTop || isBottom
                      ? "gap-1.5 md:gap-2 lg:gap-[0.4vw]"
                      : "items-center gap-2.5 md:gap-3 lg:gap-[0.75vw]"
                  } group cursor-default z-20`}
                >
                  {/* Outer container to anchor badge */}
                  <div className="relative shrink-0 flex items-center justify-center">
                    {/* Circular Icon Badge with refined border and soft background color (No shadows) */}
                    <div
                      style={{
                        borderColor: item.color,
                        backgroundColor: item.bgColor,
                      }}
                      className={`feature-badge-${index} relative flex h-10 w-10 md:h-11 md:w-11 lg:h-[3.2vw] lg:w-[3.2vw] items-center justify-center rounded-full border-[1.5px] transition-colors duration-200 shrink-0`}
                    >
                      <IconComponent
                        style={{ color: item.color }}
                        className={`feature-icon-${index} h-5 w-5 md:h-5.5 md:w-5.5 lg:h-[1.6vw] lg:w-[1.6vw]`}
                        strokeWidth={2.2}
                      />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div className={`feature-text-${index} flex flex-col whitespace-nowrap origin-${isLeft ? "right" : isTop || isBottom ? "center" : "left"}`}>
                    <span className="text-[11.5px] md:text-[12.5px] lg:text-[0.9vw] font-bold tracking-wide text-slate-900 group-hover:text-ink transition-colors leading-tight uppercase">
                      {item.title}
                    </span>
                    <span className="text-[9.5px] md:text-[10.5px] lg:text-[0.74vw] font-medium text-slate-500 leading-tight mt-0.5 lg:mt-[0.2vw]">
                      {item.subtitle}
                    </span>
                  </div>
                </div>
              );
            })}

          </div>
        </div>

        {/* Mobile View (< md) */}
        <div className="block md:hidden my-3">
          {/* Mobile Center Graphic */}
          <div className="relative w-full max-w-[180px] sm:max-w-[210px] h-[110px] sm:h-[125px] mx-auto flex items-center justify-center my-2">
            <Image
              src="/images/features/product-features-pails.webp"
              alt="ASIR Containers Rigid Plastic Packaging"
              fill
              sizes="220px"
              priority
              className="object-contain object-center drop-shadow-md"
            />
          </div>

          {/* 8 Features Responsive Grid (Ensures all 8 cards & icons are always 100% visible and unclipped) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 max-w-2xl mx-auto mt-3 pb-3">
            {featuresList.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.id}
                  className={`feature-mobile-card feature-mobile-card-${index} flex items-center gap-2 sm:gap-2.5 p-2 sm:p-2.5 rounded-xl bg-white border border-slate-200/90 transition-colors hover:border-slate-300 min-w-0`}
                >
                  <div
                    style={{
                      borderColor: item.color,
                      backgroundColor: item.bgColor,
                    }}
                    className={`feature-mobile-badge-${index} flex h-8.5 w-8.5 sm:h-9.5 sm:w-9.5 items-center justify-center rounded-full border-[1.5px] shrink-0`}
                  >
                    <IconComponent
                      style={{ color: item.color }}
                      className="h-4 w-4 sm:h-4.5 sm:w-4.5 shrink-0"
                      strokeWidth={2.2}
                    />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-[11px] sm:text-[12px] font-bold tracking-tight text-slate-900 leading-tight uppercase truncate">
                      {item.title}
                    </span>
                    <span className="text-[9.5px] sm:text-[10px] font-medium text-slate-500 leading-tight mt-0.5 truncate">
                      {item.subtitle}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

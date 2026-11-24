"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, reduceMotion } from "@/lib/animations";

export type HeroFloatingContainerProps = {
  className?: string;
};

export function HeroFloatingContainer({
  className = "",
}: HeroFloatingContainerProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const shadowRef = useRef<HTMLDivElement | null>(null);
  const interactiveRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (reduceMotion() || !containerRef.current) return;

      // 1. Continuous smooth floating animation (gentle vertical bob & tilt)
      const floatTween = gsap.to(containerRef.current, {
        y: -16,
        rotateZ: 2,
        duration: 3.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // 2. Dynamic breathing shadow beneath the floating container
      let shadowTween: gsap.core.Tween | null = null;
      if (shadowRef.current) {
        shadowTween = gsap.to(shadowRef.current, {
          scaleX: 0.82,
          scaleY: 0.72,
          opacity: 0.28,
          duration: 3.4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      return () => {
        floatTween.kill();
        shadowTween?.kill();
      };
    },
    { scope: rootRef }
  );

  // 3D Micro-tilt on mouse move (desktop)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion() || !interactiveRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(interactiveRef.current, {
      rotateX: -y * 16,
      rotateY: x * 16,
      scale: 1.03,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!interactiveRef.current) return;
    gsap.to(interactiveRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={rootRef}
      className={`relative flex flex-col items-center justify-center select-none ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Floating container body */}
      <div
        ref={containerRef}
        className="relative will-change-transform [perspective:1000px]"
      >
        <div
          ref={interactiveRef}
          className="relative w-[180px] h-[195px] sm:w-[220px] sm:h-[240px] md:w-[260px] md:h-[285px] lg:w-[320px] lg:h-[350px] xl:w-[360px] xl:h-[395px] cursor-pointer transition-transform duration-300"
          title="ASIR Containers Precision Pail"
        >
          <Image
            src="/images/machineries/Container-image.webp"
            alt="ASIR Containers precision moulded rigid container pail"
            fill
            sizes="(max-width: 640px) 200px, (max-width: 1024px) 280px, 400px"
            priority={true}
            className="object-contain drop-shadow-[0_22px_44px_rgba(0,35,80,0.18)]"
          />
        </div>
      </div>

      {/* Floating contact soft shadow glow */}
      <div
        ref={shadowRef}
        className="mt-[-10px] sm:mt-[-14px] lg:mt-[-18px] w-[130px] sm:w-[160px] lg:w-[210px] h-[16px] sm:h-[20px] lg:h-[24px] bg-slate-900/20 rounded-[100%] blur-[8px] pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}


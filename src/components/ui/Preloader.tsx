"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";

export function Preloader() {
  const [complete, setComplete] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check session storage so return visits in the same tab are instantaneous
    const hasLoaded = sessionStorage.getItem("asir_preloaded_theme_v2");
    if (hasLoaded) {
      setComplete(true);
      return;
    }

    const start = performance.now();
    const duration = 1050; // ms — crisp, responsive pacing

    const frame = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 100) {
        requestAnimationFrame(frame);
      } else {
        // Trigger cinematic dual-curtain shutter exit
        setIsExiting(true);
        setTimeout(() => {
          setComplete(true);
          sessionStorage.setItem("asir_preloaded_theme_v2", "1");
        }, 650);
      }
    };

    const id = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(id);
  }, []);

  if (complete) return null;

  // Technical engineering stage indicator cycling with percentage
  let statusText = "CALIBRATING MOULD MATRICES";
  if (progress >= 30 && progress < 65) {
    statusText = "PRE-HEATING POLYMER RUNNERS";
  } else if (progress >= 65 && progress < 90) {
    statusText = "SYNCHRONIZING ROBOTIC CELLS";
  } else if (progress >= 90) {
    statusText = "SYSTEMS ACTIVE";
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden select-none"
    >
      {/* Top Split Curtain Panel */}
      <div
        className={`absolute inset-x-0 top-0 h-1/2 bg-[#06080f] border-b border-white/[0.06] transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          isExiting ? "-translate-y-full" : "translate-y-0"
        }`}
      />

      {/* Bottom Split Curtain Panel */}
      <div
        className={`absolute inset-x-0 bottom-0 h-1/2 bg-[#06080f] border-t border-white/[0.06] transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          isExiting ? "translate-y-full" : "translate-y-0"
        }`}
      />

      {/* Subtle Architectural Blueprint Grid Overlay */}
      <div
        className={`absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,102,204,0.16)_0%,transparent_65%)] transition-opacity duration-500 ${
          isExiting ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Four-Corner Registration Crosshairs */}
      <div
        className={`absolute inset-6 sm:inset-10 flex flex-col justify-between pointer-events-none transition-opacity duration-300 font-mono text-[10px] sm:text-[11px] text-white/20 tracking-widest ${
          isExiting ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="flex items-center justify-between">
          <span>+ [9.47° N // 77.81° E]</span>
          <span>[SYS.01 // READY] +</span>
        </div>
        <div className="flex items-center justify-between">
          <span>+ [RIGID PACKAGING]</span>
          <span>[ASIR CONTAINERS] +</span>
        </div>
      </div>

      {/* Centered Brand Stage & Precision Telemetry */}
      <div
        className={`relative z-10 flex h-full w-full flex-col items-center justify-center px-6 transition-all duration-400 ease-out ${
          isExiting ? "opacity-0 scale-95" : "opacity-100 scale-100"
        }`}
      >
        <div className="relative flex flex-col items-center">
          {/* Ambient Blue Radial Halo behind Brand Logo */}
          <div className="absolute -inset-10 bg-brand/20 blur-3xl rounded-full pointer-events-none" />

          {/* Official ASIR Containers Brand Logo */}
          <div className="relative mb-3 flex items-center justify-center">
            <Logo
              tone="light"
              imageClassName="!h-11 sm:!h-13 md:!h-16 lg:!h-[3.6vw] drop-shadow-[0_4px_20px_rgba(0,102,204,0.35)]"
            />
          </div>

          {/* Technical Sub-brand Marker */}
          <p className="font-mono text-[9.5px] sm:text-[10.5px] lg:text-[0.72vw] tracking-[0.28em] text-white/50 uppercase text-center">
            PRECISION MOULDING &amp; AUTOMATION
          </p>

          {/* Architectural Numeric Counter */}
          <div className="flex items-baseline gap-1.5 my-3 sm:my-4 lg:my-[0.9vw]">
            <span className="font-display font-light text-[3.25rem] sm:text-[4.2rem] lg:text-[4vw] text-white tracking-tight tabular-nums leading-none">
              {String(progress).padStart(2, "0")}
            </span>
            <span className="font-mono text-sm sm:text-base lg:text-[0.95vw] font-semibold text-[#38bdf8] tracking-widest">
              %
            </span>
          </div>

          {/* High-Precision Hairline Progress Track with Glowing Pip */}
          <div className="w-56 sm:w-72 lg:w-[17vw] h-[2px] bg-white/[0.08] relative overflow-hidden rounded-full">
            <div
              className="h-full bg-gradient-to-r from-[#0052cc] via-[#0066cc] to-[#38bdf8] transition-[width] duration-150 ease-out shadow-[0_0_12px_rgba(56,189,248,0.7)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Live Engineering Stage Status with Pulsing Telemetry Dot */}
          <div className="mt-4 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
            <span className="font-mono text-[9.5px] sm:text-[10.5px] lg:text-[0.68vw] tracking-[0.2em] text-slate-400 uppercase">
              {statusText}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

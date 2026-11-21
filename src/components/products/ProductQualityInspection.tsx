"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { CheckCircle2, ClipboardCheck, PackageCheck, ScanLine, type LucideIcon } from "lucide-react";
import { gsap, useGSAP, reduceMotion } from "@/lib/animations";

type InspectionStage = {
  id: string;
  tabLabel: string;
  icon: LucideIcon;
  tileBg: string;
  tileColor: string;
  activeBar: string;
  defaultBg: string;
  defaultBorder: string;
  activeBorder: string;
  heading: string;
  content: string;
  activities: string[];
  image: string;
  imageAlt: string;
};

const inspectionStages: InspectionStage[] = [
  {
    id: "incoming",
    tabLabel: "Incoming inspection",
    icon: PackageCheck,
    tileBg: "bg-emerald-50",
    tileColor: "text-emerald-600",
    activeBar: "bg-emerald-600",
    defaultBg: "bg-emerald-50/60",
    defaultBorder: "border-emerald-300",
    activeBorder: "border-emerald-300",
    heading: "Ensuring Quality from the Start",
    content:
      "All incoming raw materials and components are thoroughly inspected before entering the production process. Our incoming quality inspection ensures that materials meet specified requirements, approved specifications, and applicable quality standards before acceptance.",
    activities: [
      "Raw material quality verification",
      "Material specifications and grade checking",
      "Visual inspection for defects",
      "Dimensional and weight verification",
      "Supplier documentation verification",
      "Material approval and rejection",
    ],
    image: "/images/inspection/incoming-material-inspection.jpg",
    imageAlt: "Incoming raw material quality verification and lab testing",
  },
  {
    id: "inprocess",
    tabLabel: "In-process inspection",
    icon: ScanLine,
    tileBg: "bg-sky-50",
    tileColor: "text-sky-600",
    activeBar: "bg-sky-600",
    defaultBg: "bg-sky-50/60",
    defaultBorder: "border-sky-300",
    activeBorder: "border-sky-300",
    heading: "Maintaining Quality at Every Production Stage",
    content:
      "In-process inspection is carried out throughout the manufacturing process to monitor product quality, maintain production consistency, and identify potential defects at an early stage. Regular inspections help ensure that every production stage follows defined quality requirements and manufacturing specifications.",
    activities: [
      "Production parameter monitoring",
      "Dimensional and measurement checks",
      "Visual defect identification",
      "Colour and printing quality verification",
      "Product weight and thickness checking",
      "Process consistency monitoring",
      "Defect identification and corrective action",
    ],
    image: "/images/inspection/in-process-inspection.jpg",
    imageAlt: "Plastic injection moulding in-process parameter monitoring",
  },
  {
    id: "finished-goods",
    tabLabel: "Finished Goods (FG)",
    icon: ClipboardCheck,
    tileBg: "bg-orange-50",
    tileColor: "text-orange-600",
    activeBar: "bg-orange-500",
    defaultBg: "bg-orange-50/60",
    defaultBorder: "border-orange-300",
    activeBorder: "border-orange-300",
    heading: "Delivering Quality-Approved Products",
    content:
      "Finished Goods Inspection is the final quality verification process conducted before products are approved for packaging, storage, and dispatch. Each finished product is evaluated against defined quality standards to ensure it meets customer specifications and delivery requirements.",
    activities: [
      "Final visual appearance inspection",
      "Dimensional accuracy verification",
      "Product weight checking",
      "Functional and performance testing",
      "Printing and labelling quality checks",
      "Packaging and quantity verification",
      "Final product approval before dispatch",
    ],
    image: "/images/detail/stacked-pails.jpg",
    imageAlt: "Finished containers stacked after final quality inspection",
  },
];

export function ProductQualityInspection({ className = "" }: { className?: string } = {}) {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const stage = inspectionStages[activeIndex];
  const rootRef = useRef<HTMLElement | null>(null);

  // Reset autoplay whenever navigating to another page and returning
  useEffect(() => {
    setIsAutoPlay(true);
    setActiveIndex(0);
  }, [pathname]);

  // Autoplay tabs every 5 seconds until manually clicked
  useEffect(() => {
    if (!isAutoPlay) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % inspectionStages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlay]);

  const handleTabClick = (idx: number) => {
    setIsAutoPlay(false); // Stop autoplay when user manually clicks any tab
    setActiveIndex(idx);
  };

  useGSAP(
    () => {
      if (!rootRef.current) return;
      const frame = rootRef.current.querySelector<HTMLElement>("[data-image-frame]");
      const img = rootRef.current.querySelector<HTMLElement>("[data-image-el]");
      const panel = rootRef.current.querySelector<HTMLElement>("[data-stage-panel]");

      if (reduceMotion()) {
        if (frame) gsap.set(frame, { clipPath: "inset(0% 0% 0% 0%)" });
        if (img) gsap.set(img, { x: 0, scale: 1 });
        if (panel) gsap.set(panel, { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline();

      // Smooth panel content transition
      if (panel) {
        tl.fromTo(
          panel,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.32, ease: "power2.out" },
          0,
        );
      }

      // Clean Right-to-Left image reveal animation
      if (frame) {
        tl.fromTo(
          frame,
          { clipPath: "inset(0% 0% 0% 100%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "power3.inOut" },
          0.02,
        );
      }

      // Parallax shift from right (+40px)
      if (img) {
        tl.fromTo(
          img,
          { x: 40, scale: 1.12 },
          { x: 0, scale: 1, duration: 1.0, ease: "expo.out" },
          0.02,
        );
      }
    },
    { dependencies: [activeIndex], scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      className={`relative overflow-hidden bg-white pt-6 sm:pt-8 lg:pt-[2.2vw] pb-2 sm:pb-3 lg:pb-[0.8vw] border-t border-slate-200/60 ${className}`}
      aria-labelledby="quality-inspection-heading"
    >
      <div className="shell max-w-[1440px] lg:max-w-[92vw] px-5 sm:px-8 lg:px-[4vw]">
        <div className="grid items-stretch gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-[2.5vw]">
          {/* Left Column: Heading, Quote, and 3 Sub-Tab Buttons */}
          <div className="flex flex-col justify-between lg:col-span-7 min-w-0 w-full">
            <div className="min-w-0 w-full">
              {/* Heading 1: Quality Control (Signature Deep Blue #194e9e) */}
              <div className="flex items-center gap-2.5 lg:gap-[0.6vw]">
                <span className="h-[2px] lg:h-[0.14vw] w-6 lg:w-[1.6vw] bg-[#194e9e]" />
                <h2
                  id="quality-inspection-heading"
                  className="font-display text-[12px] sm:text-[13px] lg:text-[0.85vw] font-bold uppercase tracking-[0.2em] text-[#194e9e]"
                >
                  Quality Control
                </h2>
              </div>

              {/* Slogan Quote with matching blue accent line — responsive font sizing & break words */}
              <blockquote className="mt-3.5 sm:mt-4 lg:mt-[1vw] border-l-[3px] lg:border-l-[0.2vw] border-[#0066cc] pl-4 sm:pl-5 lg:pl-[1.2vw] font-display text-[clamp(1.2rem,3.2vw,2.05rem)] lg:text-[1.8vw] font-bold leading-[1.25] tracking-tight text-ink break-words">
                All incoming materials which is going into the stroke process will be inspected as per
                IS Standards
              </blockquote>

              {/* Heading 2: Inspection (Emerald Green) & 3 Sub-Tab Buttons */}
              <div className="mt-4 sm:mt-5 lg:mt-[1.2vw] border-t border-slate-200/80 pt-3 sm:pt-3.5 lg:pt-[0.9vw] min-w-0 w-full">
                <div className="flex items-center gap-2.5 lg:gap-[0.6vw] mb-2.5 sm:mb-3 lg:mb-[0.7vw]">
                  <span className="h-[2px] lg:h-[0.14vw] w-6 lg:w-[1.6vw] bg-emerald-600" />
                  <h3 className="font-display text-[12px] sm:text-[13px] lg:text-[0.85vw] font-bold uppercase tracking-[0.2em] text-emerald-600">
                    Inspection
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 lg:gap-[0.6vw] min-w-0 w-full">
                {inspectionStages.map((item, idx) => {
                  const Icon = item.icon;
                  const isActive = activeIndex === idx;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleTabClick(idx)}
                      className={`group relative flex items-center gap-2.5 sm:gap-3 lg:gap-[0.6vw] rounded-xl lg:rounded-[0.7vw] p-2.5 sm:p-3 lg:p-[0.7vw] text-left transition-all duration-200 cursor-pointer min-w-0 w-full overflow-hidden ${
                        isActive
                          ? `bg-white shadow-2xs border ${item.activeBorder}`
                          : `${item.defaultBg} border ${item.defaultBorder} hover:bg-white hover:shadow-2xs`
                      }`}
                    >
                      {/* Icon container */}
                      <span
                        className={`flex h-9 w-9 sm:h-10 sm:w-10 lg:h-[2.4vw] lg:w-[2.4vw] shrink-0 items-center justify-center rounded-[10px] lg:rounded-[0.6vw] transition-transform duration-300 group-hover:scale-105 ${
                          isActive ? item.tileBg : "bg-white shadow-2xs"
                        } ${item.tileColor}`}
                      >
                        <Icon aria-hidden className="h-4.5 w-4.5 sm:h-5 sm:w-5 lg:h-[1.2vw] lg:w-[1.2vw]" strokeWidth={2} />
                      </span>

                      {/* Sub-tab text on the SAME line */}
                      <span
                        className={`font-display text-[12.5px] sm:text-[13px] lg:text-[0.9vw] font-bold leading-tight transition-colors min-w-0 flex-1 truncate sm:whitespace-normal ${
                          isActive ? "text-slate-900" : "text-slate-800 group-hover:text-slate-900"
                        }`}
                      >
                        {item.tabLabel}
                      </span>

                      {/* Active bottom border style */}
                      {isActive && (
                        <span
                          className={`absolute bottom-0 inset-x-0 h-[3px] lg:h-[0.2vw] ${item.activeBar}`}
                        />
                      )}
                    </button>
                  );
                })}
                </div>
              </div>
            </div>

            {/* Active Stage Details Panel */}
            <div
              data-stage-panel
              key={stage.id}
              className="mt-4 sm:mt-5 lg:mt-[1.2vw] rounded-2xl lg:rounded-[1.2vw] border border-slate-200/70 bg-[#faf8f5]/80 p-4 sm:p-5 lg:p-[1.4vw] min-w-0 w-full"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 lg:gap-[0.5vw]">
                <h3 className="font-display text-[16px] sm:text-[18px] lg:text-[1.25vw] font-bold tracking-tight text-ink">
                  {stage.heading}
                </h3>
                <span className="text-[11px] sm:text-[12px] lg:text-[0.78vw] font-bold text-slate-500 bg-slate-200/60 px-2.5 py-0.5 rounded-full">
                  {stage.activities.length} Checks
                </span>
              </div>

              <p className="mt-2.5 lg:mt-[0.6vw] text-[14px] sm:text-[15px] lg:text-[1vw] leading-relaxed text-slate-600 break-words font-normal">
                {stage.content}
              </p>

              <ul className="mt-3.5 lg:mt-[0.9vw] grid gap-2 lg:gap-[0.6vw] sm:grid-cols-2 min-w-0">
                {stage.activities.map((act) => (
                  <li
                    key={act}
                    className="flex items-start gap-2.5 lg:gap-[0.5vw] text-[13px] sm:text-[14px] lg:text-[0.92vw] font-medium text-slate-700 min-w-0"
                  >
                    <CheckCircle2
                      className="h-4 w-4 lg:h-[1vw] lg:w-[1vw] text-emerald-600 shrink-0 mt-0.5"
                      strokeWidth={2.4}
                    />
                    <span className="leading-snug break-words">{act}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Photography Card — Responsively scaled on mobile & tablet without overflow */}
          <div className="lg:col-span-5 flex flex-col min-w-0 w-full">
            <div
              data-image-frame
              className="group relative w-full h-[240px] sm:h-[320px] md:h-[380px] lg:h-full lg:min-h-[28vw] overflow-hidden rounded-[20px] sm:rounded-[24px] lg:rounded-[1.5vw] bg-slate-100 border border-slate-200/80 shadow-md transition-shadow duration-500 hover:shadow-xl"
            >
              <div data-image-el className="relative h-full w-full">
                <Image
                  src={stage.image}
                  alt={stage.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 45vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  priority={activeIndex === 0}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

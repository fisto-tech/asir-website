"use client";

import { useRef } from "react";
import Image from "next/image";
import { Box, Bot, Droplets, Printer } from "lucide-react";
import { useScrollReveal } from "@/lib/animations";

const capabilities = [
  {
    title: "Injection Moulding",
    id: "injection-moulding",
    image: "/images/technologies/capability-injection-moulding.webp",
    alt: "Precision multi-cavity injection moulding tooling",
    icon: Box,
    iconColor: "text-brand bg-red-50 ring-red-100",
    href: "#capability-injection-moulding",
  },
  {
    title: "In-Mould Labelling",
    id: "iml",
    image: "/images/technologies/capability-in-mould-labelling.webp",
    alt: "High-speed robotic arm fusing label into mould",
    icon: Bot,
    iconColor: "text-blue-600 bg-blue-50 ring-blue-100",
    href: "#capability-iml",
  },
  {
    title: "Heat Transfer Labelling",
    id: "htl",
    image: "/images/technologies/capability-heat-transfer.webp",
    alt: "Industrial heat transfer labelling application on plastic container",
    icon: Droplets,
    iconColor: "text-emerald-600 bg-emerald-50 ring-emerald-100",
    href: "#capability-htl",
  },
  {
    title: "Screen Printing",
    id: "screen-printing",
    image: "/images/technologies/capability-screen-printing.webp",
    alt: "High-volume conveyor screen printing line",
    icon: Printer,
    iconColor: "text-orange-600 bg-orange-50 ring-orange-100",
    href: "#capability-screen-printing",
  },
];

export function CapabilitiesCardsSection() {
  const root = useRef<HTMLElement | null>(null);
  useScrollReveal(root);

  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("select-capability", { detail: { id } }));
    const target = document.getElementById("capabilities");
    if (target) {
      const topOffset = target.getBoundingClientRect().top + window.scrollY - 84;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  return (
    <section ref={root} className="bg-sandal py-8 sm:py-10 lg:py-[2.2vw] border-b border-line/60">
      <div className="shell max-w-[1440px] lg:max-w-[92vw] px-5 sm:px-8 lg:px-[4vw]">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 pb-5 sm:pb-6 lg:pb-[1.2vw]">
          <div data-reveal data-reveal-dir="left" data-reveal-delay="0.1">
            <h2 className="font-display text-[1.9rem] sm:text-[2.6rem] lg:text-[2.6vw] font-bold text-ink tracking-tight">
              Our Capabilities
            </h2>
          </div>
        </div>

        {/* 4 Cards Grid with Bidirectional Staggered Animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-[1.4vw]">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <a
                key={cap.title}
                href={cap.href}
                onClick={(e) => handleCardClick(e, cap.id)}
                data-reveal
                data-reveal-dir="scale"
                data-reveal-delay={(0.18 + idx * 0.08).toFixed(2)}
                className="group relative flex flex-col rounded-2xl lg:rounded-[1.2vw] border border-slate-200/90 bg-white p-3.5 lg:p-[0.9vw] shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md hover:-translate-y-1 cursor-pointer"
              >
                {/* Card Top Image */}
                <div className="relative aspect-[3/2] w-full overflow-hidden rounded-xl lg:rounded-[0.9vw] bg-slate-100">
                  <Image
                    src={cap.image}
                    alt={cap.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-104"
                  />
                </div>

                {/* Card Bottom: Floating Overlapping Icon Badge + Title */}
                <div className="relative flex items-center justify-between pt-1 px-1 pb-1">
                  <div className="flex items-center gap-3 lg:gap-[0.7vw] min-w-0">
                    <span
                      className={`relative -mt-6 lg:-mt-[1.5vw] z-10 flex h-11 w-11 lg:h-[2.8vw] lg:w-[2.8vw] shrink-0 items-center justify-center rounded-full ring-4 lg:ring-[0.25vw] ring-white shadow-md transition-transform duration-300 group-hover:scale-105 ${cap.iconColor}`}
                    >
                      <Icon className="h-5 w-5 lg:h-[1.3vw] lg:w-[1.3vw]" />
                    </span>
                    <span className="font-display text-[15px] lg:text-[1vw] font-bold text-ink truncate group-hover:text-brand transition-colors pt-1.5 lg:pt-[0.35vw]">
                      {cap.title}
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}


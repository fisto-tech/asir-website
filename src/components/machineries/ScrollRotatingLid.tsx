"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP, reduceMotion } from "@/lib/animations";

export type ScrollRotatingLidProps = {
  /** Mode: "2-topics" (for Auxiliaries) or "3-topics" (for Production Machineries) */
  mode?: "2-topics" | "3-topics";
  className?: string;
};

export function ScrollRotatingLid({
  mode = "2-topics",
  className = "",
}: ScrollRotatingLidProps) {
  const root = useRef<HTMLDivElement | null>(null);
  const lidPositionRef = useRef<HTMLDivElement | null>(null);
  const lidAutoSpinRef = useRef<HTMLDivElement | null>(null);
  const interactiveRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const posWrapper = lidPositionRef.current;
      const spinWrapper = lidAutoSpinRef.current;
      const rootEl = root.current;
      if (!posWrapper || !spinWrapper || !rootEl) return;

      // The shell container where all cards are located
      const shell = (rootEl.closest(".shell") as HTMLElement | null) || rootEl.parentElement;
      if (!shell) return;

      const card1 = shell.querySelector<HTMLElement>("[data-topic-card='1']");
      const card2 = shell.querySelector<HTMLElement>("[data-topic-card='2']");
      const card3 = shell.querySelector<HTMLElement>("[data-topic-card='3']");

      const getLidDimensions = () => {
        const lidBody = rootEl.querySelector<HTMLElement>("[data-lid-body]");
        return {
          width: lidBody?.offsetWidth || 320,
          height: lidBody?.offsetHeight || 320,
        };
      };

      // Helper to calculate target coordinate for Desktop (>= 1024px)
      // Root is at top-0 left-0 of shell, so coordinates are direct positions inside shell.
      const getDesktopCardTarget = (
        card: HTMLElement | null,
        isLeftCard: boolean
      ) => {
        if (!card || !shell) return { x: 0, y: 0 };
        const shellRect = shell.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();
        const { width: lidW, height: lidH } = getLidDimensions();

        const cardXInShell = cardRect.left - shellRect.left;
        const cardYInShell = cardRect.top - shellRect.top;

        // On desktop (>= 1024px):
        // Exactly 40% of the lid visible protruding from card, 60% tucked behind card
        // Card 1 & 3: Tucked behind right edge of card (40% protruding out)
        // Card 2: Tucked behind left edge of card (40% protruding out)
        const targetCenterX = isLeftCard
          ? cardXInShell + cardRect.width - (lidW * 0.10)
          : cardXInShell + (lidW * 0.10);
        const targetCenterY = cardYInShell + (cardRect.height * 0.5);

        return {
          x: targetCenterX - (lidW * 0.5),
          y: targetCenterY - (lidH * 0.5),
        };
      };

      // Helper to calculate target coordinate for Tablet (768px - 1023px)
      const getTabletCardTarget = (
        card: HTMLElement | null,
        isLeftCard: boolean
      ) => {
        if (!card || !shell) return { x: 0, y: 0 };
        const shellRect = shell.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();
        const { width: lidW, height: lidH } = getLidDimensions();

        const cardXInShell = cardRect.left - shellRect.left;
        const cardYInShell = cardRect.top - shellRect.top;

        const targetCenterX = isLeftCard
          ? cardXInShell + cardRect.width - (lidW * 0.10)
          : cardXInShell + (lidW * 0.10);
        const targetCenterY = cardYInShell + (cardRect.height * 0.45);

        return {
          x: targetCenterX - (lidW * 0.5),
          y: targetCenterY - (lidH * 0.5),
        };
      };

      // Helper to calculate target coordinate for Mobile (< 768px)
      const getMobileCardTarget = (
        card: HTMLElement | null,
        isLeftCard: boolean
      ) => {
        if (!card || !shell) return { x: 0, y: 0 };
        const shellRect = shell.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();
        const { width: lidW, height: lidH } = getLidDimensions();

        const cardXInShell = cardRect.left - shellRect.left;
        const cardYInShell = cardRect.top - shellRect.top;

        let targetCenterX = isLeftCard
          ? cardXInShell + cardRect.width - (lidW * 0.10)
          : cardXInShell + (lidW * 0.10);

        // Clamp within shell boundaries so horizontal scroll never happens
        targetCenterX = Math.max(lidW * 0.5, Math.min(shellRect.width - (lidW * 0.5), targetCenterX));
        const targetCenterY = cardYInShell + (cardRect.height * 0.35);

        return {
          x: targetCenterX - (lidW * 0.5),
          y: targetCenterY - (lidH * 0.5),
        };
      };

      if (reduceMotion()) {
        gsap.set(posWrapper, {
          x: () => getDesktopCardTarget(card1, true).x,
          y: () => getDesktopCardTarget(card1, true).y,
          rotation: 0,
        });
        return;
      }

      const mm = gsap.matchMedia();

      // 1. MOBILE SCREEN (< 768px):
      // Starts docked at Card 1, rotates and glides across alternating cards on scroll
      mm.add("(max-width: 767.98px)", () => {
        const autoSpin = gsap.to(spinWrapper, {
          rotation: 360,
          duration: 20,
          repeat: -1,
          ease: "none",
        });

        // Set initial position immediately at Card 1
        gsap.set(posWrapper, {
          x: () => getMobileCardTarget(card1, true).x,
          y: () => getMobileCardTarget(card1, true).y,
          rotation: 0,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card1,
            endTrigger: mode === "3-topics" ? card3 : card2,
            start: "center 75%",
            end: "center 45%",
            scrub: 1.0,
            invalidateOnRefresh: true,
          },
        });

        if (mode === "3-topics") {
          tl.to(posWrapper, {
            x: () => getMobileCardTarget(card2, false).x,
            y: () => getMobileCardTarget(card2, false).y,
            rotation: 180,
            duration: 0.5,
            ease: "power1.inOut",
          })
            .to(posWrapper, {
              x: () => getMobileCardTarget(card3, true).x,
              y: () => getMobileCardTarget(card3, true).y,
              rotation: 360,
              duration: 0.5,
              ease: "power1.inOut",
            });
        } else {
          tl.to(posWrapper, {
            x: () => getMobileCardTarget(card2, false).x,
            y: () => getMobileCardTarget(card2, false).y,
            rotation: 220,
            duration: 1.0,
            ease: "power1.inOut",
          });
        }

        return () => {
          autoSpin.kill();
        };
      });

      // 2. TABLET SCREEN (768px - 1023px):
      // Starts at Card 1, rotates and glides behind alternating cards on scroll
      mm.add("(min-width: 768px) and (max-width: 1023.98px)", () => {
        const autoSpin = gsap.to(spinWrapper, {
          rotation: 360,
          duration: 22,
          repeat: -1,
          ease: "none",
        });

        // Set initial position immediately at Card 1
        gsap.set(posWrapper, {
          x: () => getTabletCardTarget(card1, true).x,
          y: () => getTabletCardTarget(card1, true).y,
          rotation: 0,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card1,
            endTrigger: mode === "3-topics" ? card3 : card2,
            start: "center 70%",
            end: "center 40%",
            scrub: 1.0,
            invalidateOnRefresh: true,
          },
        });

        if (mode === "3-topics") {
          tl.to(posWrapper, {
            x: () => getTabletCardTarget(card2, false).x,
            y: () => getTabletCardTarget(card2, false).y,
            rotation: 180,
            duration: 0.5,
            ease: "power1.inOut",
          })
            .to(posWrapper, {
              x: () => getTabletCardTarget(card3, true).x,
              y: () => getTabletCardTarget(card3, true).y,
              rotation: 360,
              duration: 0.5,
              ease: "power1.inOut",
            });
        } else {
          tl.to(posWrapper, {
            x: () => getTabletCardTarget(card2, false).x,
            y: () => getTabletCardTarget(card2, false).y,
            rotation: 220,
            duration: 1.0,
            ease: "power1.inOut",
          });
        }

        return () => {
          autoSpin.kill();
        };
      });

      // 3. DESKTOP SCREEN (>= 1024px):
      // Starts at Card 1, rotates and glides behind alternating cards across 2-column layout
      mm.add("(min-width: 1024px)", () => {
        const autoSpin = gsap.to(spinWrapper, {
          rotation: 360,
          duration: 24,
          repeat: -1,
          ease: "none",
        });

        // Set initial position immediately at Card 1 (Topic 1)
        gsap.set(posWrapper, {
          x: () => getDesktopCardTarget(card1, true).x,
          y: () => getDesktopCardTarget(card1, true).y,
          rotation: 0,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card1,
            endTrigger: mode === "3-topics" ? card3 : card2,
            start: "center 70%",
            end: "center 40%",
            scrub: 1.0,
            invalidateOnRefresh: true,
          },
        });

        if (mode === "3-topics") {
          // PRODUCTION MACHINERIES (3 topics):
          // Phase 1: Glides from Card 1 (Screen Printing - Left) to Card 2 (HTL - Right)
          tl.to(posWrapper, {
            x: () => getDesktopCardTarget(card2, false).x,
            y: () => getDesktopCardTarget(card2, false).y,
            rotation: 180,
            duration: 0.5,
            ease: "power1.inOut",
          })
            // Phase 2: Glides from Card 2 (HTL - Right) back to Card 3 (IML - Left)
            .to(posWrapper, {
              x: () => getDesktopCardTarget(card3, true).x,
              y: () => getDesktopCardTarget(card3, true).y,
              rotation: 360,
              duration: 0.5,
              ease: "power1.inOut",
            });
        } else {
          // AUXILIARIES (2 topics):
          // Phase 1: Glides from Card 1 (Chiller 1 - Left) to Card 2 (Chiller 2 - Right)
          tl.to(posWrapper, {
            x: () => getDesktopCardTarget(card2, false).x,
            y: () => getDesktopCardTarget(card2, false).y,
            rotation: 220,
            duration: 1.0,
            ease: "power1.inOut",
          });
        }

        return () => {
          autoSpin.kill();
        };
      });

      // Refresh ScrollTrigger after elements settle
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 250);

      return () => {
        clearTimeout(timer);
        mm.revert();
      };
    },
    { scope: root, dependencies: [mode] }
  );

  // 3D Micro-tilt on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion() || !interactiveRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(interactiveRef.current, {
      rotateX: -y * 20,
      rotateY: x * 20,
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

  // Playful spring spin on click
  const handleClick = () => {
    if (!interactiveRef.current) return;
    gsap.to(interactiveRef.current, {
      rotation: "+=360",
      duration: 0.85,
      ease: "back.out(1.6)",
    });
  };

  return (
    <div
      ref={root}
      className={`absolute top-0 left-0 pointer-events-none z-[5] select-none ${className}`}
      aria-hidden="true"
    >
      {/* Scroll-driven translating container */}
      <div ref={lidPositionRef} className="relative will-change-transform pointer-events-auto">
        {/* Continuous slow-motion auto-rotating wrapper */}
        <div ref={lidAutoSpinRef} className="relative will-change-transform">
          {/* Interactive hover/tilt/click container */}
          <div
            ref={interactiveRef}
            data-lid-body
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            role="button"
            tabIndex={0}
            title="Click to spin!"
            className="relative w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[240px] md:h-[240px] lg:w-[330px] lg:h-[330px] xl:w-[380px] xl:h-[380px] cursor-pointer [perspective:1000px] group/lid"
          >
            {/* Pure, Clean High-Resolution Transparent Blue Lid Image */}
            <div className="relative w-full h-full">
              <Image
                src="/images/blue-lid.webp"
                alt="ASIR Containers precision moulded blue plastic lid"
                fill
                sizes="(max-width: 640px) 160px, (max-width: 1024px) 260px, 400px"
                priority={true}
                className="object-contain drop-shadow-[0_16px_36px_rgba(0,35,80,0.22)] transition-transform duration-300 group-hover/lid:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

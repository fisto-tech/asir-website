"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap, useGSAP, reduceMotion } from "@/lib/animations";

interface BannerSlide {
  id: string;
  backgroundImage: string;
  productImage: string;
  productAlt: string;
  eyebrow: string;
  eyebrowHighlight: string;
  highlightClass: string;
  titleLines: string[];
  description: string;
  ctaText: string;
  ctaLink: string;
}

const bannerSlides: BannerSlide[] = [
  {
    id: "paints-coatings",
    backgroundImage: "/images/hero/hero-background-1.webp",
    productImage: "/images/hero/hero-container-image.webp",
    productAlt: "ASIR Industrial Containers Product Lineup",
    eyebrow: "Your Trusted Partner for",
    eyebrowHighlight: "Quality Container Solutions",
    highlightClass: "text-[#f59e0b]", // Amber / Warm Gold
    titleLines: [
      "Premium",
      "Packaging",
      "for Paints &",
      "Coatings",
    ],
    description:
      "Durable, spill-resistant, and high-impact white polypropylene pails engineered for decorative emulsions, primers, and industrial coatings.",
    ctaText: "Explore More....",
    ctaLink: "/products?application=paint",
  },
  {
    id: "agro-chemicals",
    backgroundImage: "/images/hero/hero-background-2.webp",
    productImage: "/images/hero/hero-container-image.webp",
    productAlt: "ASIR Industrial Containers Product Lineup",
    eyebrow: "Your Trusted Partner for",
    eyebrowHighlight: "Quality Container Solutions",
    highlightClass: "text-[#4ade80]", // Fresh Agro Green
    titleLines: [
      "Heavy-Duty",
      "Packaging",
      "for Agro &",
      "Chemicals",
    ],
    description:
      "Chemically-resistant, virgin-grade containers built to safely store and transport fertilizers, crop protection liquids, and micronutrients.",
    ctaText: "Explore More....",
    ctaLink: "/products?application=agro",
  },
  {
    id: "food-grade",
    backgroundImage: "/images/hero/hero-background-3.webp",
    productImage: "/images/hero/hero-container-image.webp",
    productAlt: "ASIR Industrial Containers Product Lineup",
    eyebrow: "Your Trusted Partner for",
    eyebrowHighlight: "Quality Container Solutions",
    highlightClass: "text-[#fbbf24]", // Golden Amber
    titleLines: [
      "Hygienic &",
      "Certified",
      "Food-Grade",
      "Packaging",
    ],
    description:
      "100% virgin, non-toxic, and airtight containers designed to preserve freshness for dairy, edible oils, honey, confectionery, and bulk ingredients.",
    ctaText: "Explore More....",
    ctaLink: "/products?application=food",
  },
  {
    id: "lubricants",
    backgroundImage: "/images/hero/hero-background-4.webp",
    productImage: "/images/hero/hero-container-image.webp",
    productAlt: "ASIR Industrial Containers Product Lineup",
    eyebrow: "Your Trusted Partner for",
    eyebrowHighlight: "Quality Container Solutions",
    highlightClass: "text-[#4ade80]", // High-vis Green/Yellow
    titleLines: [
      "Industrial-Grade",
      "Packaging",
      "for Oils &",
      "Lubricants",
    ],
    description:
      "High-durability, drop-tested pails engineered for automotive greases, gear oils, engine lubricants, and heavy-duty industrial fluids.",
    ctaText: "Explore More....",
    ctaLink: "/products?application=lube",
  },
];

export function HeroBannerSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const rootRef = useRef<HTMLElement | null>(null);
  const textContainerRef = useRef<HTMLDivElement | null>(null);
  const textSlideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prevIndexRef = useRef<number>(0);
  const isFirstRender = useRef<boolean>(true);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const total = bannerSlides.length;
  const currentSlide = bannerSlides[currentIndex];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToSlide = (index: number) => {
    if (index === currentIndex) return;
    setCurrentIndex(index);
  };

  // GSAP Smooth Transitions for Backgrounds, Text, and Foreground Pails
  useGSAP(
    () => {
      if (!rootRef.current) return;

      if (reduceMotion()) {
        bgRefs.current.forEach((bg, idx) => {
          if (bg) {
            bg.style.opacity = idx === currentIndex ? "1" : "0";
            bg.style.zIndex = idx === currentIndex ? "2" : "0";
            bg.style.transform = "none";
          }
        });
        productRefs.current.forEach((p, idx) => {
          if (p) {
            p.style.opacity = idx === currentIndex ? "1" : "0";
            p.style.zIndex = idx === currentIndex ? "2" : "0";
            p.style.transform = "none";
          }
        });
        textSlideRefs.current.forEach((t, idx) => {
          if (t) {
            t.style.opacity = idx === currentIndex ? "1" : "0";
            t.style.transform = "none";
          }
        });
        return;
      }

      const prevIdx = prevIndexRef.current;
      const isInitial = isFirstRender.current;
      isFirstRender.current = false;

      // 1. Initial State on First Mount
      if (isInitial) {
        bgRefs.current.forEach((bg, idx) => {
          if (!bg) return;
          gsap.set(bg, { opacity: idx === currentIndex ? 1 : 0, scale: 1, zIndex: idx === currentIndex ? 2 : 0 });
        });
        productRefs.current.forEach((p, idx) => {
          if (!p) return;
          gsap.set(p, { opacity: idx === currentIndex ? 1 : 0, x: 0, scale: 1, zIndex: idx === currentIndex ? 2 : 0 });
        });
        textSlideRefs.current.forEach((t, idx) => {
          if (!t) return;
          gsap.set(t, {
            opacity: idx === currentIndex ? 1 : 0,
            y: 0,
            zIndex: idx === currentIndex ? 2 : 0,
          });
        });
      } else {
        const outgoingBg = bgRefs.current[prevIdx];
        const incomingBg = bgRefs.current[currentIndex];
        const outgoingProduct = productRefs.current[prevIdx];
        const incomingProduct = productRefs.current[currentIndex];
        const outgoingText = textSlideRefs.current[prevIdx];
        const incomingText = textSlideRefs.current[currentIndex];

        // 1. Background transition with tween cancellation to prevent race conditions
        if (outgoingBg && prevIdx !== currentIndex) {
          gsap.killTweensOf(outgoingBg);
          gsap.set(outgoingBg, { zIndex: 1 });
          gsap.to(outgoingBg, {
            opacity: 0,
            duration: 0.85,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(outgoingBg, { zIndex: 0 });
            },
          });
        }

        if (incomingBg) {
          gsap.killTweensOf(incomingBg);
          gsap.set(incomingBg, { zIndex: 2 });
          gsap.fromTo(
            incomingBg,
            { opacity: 0, scale: 1.03 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.95,
              ease: "power2.out",
            }
          );
        }

        // 2. Product image transition (only crossfade if different image asset)
        const isSameProduct =
          bannerSlides[prevIdx]?.productImage ===
          bannerSlides[currentIndex]?.productImage;

        if (!isSameProduct) {
          if (outgoingProduct && prevIdx !== currentIndex) {
            gsap.killTweensOf(outgoingProduct);
            gsap.set(outgoingProduct, { zIndex: 1 });
            gsap.to(outgoingProduct, {
              opacity: 0,
              x: -24,
              scale: 0.96,
              duration: 0.85,
              ease: "power2.inOut",
              onComplete: () => {
                gsap.set(outgoingProduct, { zIndex: 0, x: 0, scale: 1 });
              },
            });
          }

          if (incomingProduct) {
            gsap.killTweensOf(incomingProduct);
            gsap.set(incomingProduct, { zIndex: 2 });
            gsap.fromTo(
              incomingProduct,
              { opacity: 0, x: 28, scale: 0.96 },
              {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 0.95,
                ease: "power2.out",
                clearProps: "transform",
              }
            );
          }
        } else {
          // If identical product image, keep it steadily visible without jitter
          if (incomingProduct) {
            gsap.killTweensOf(incomingProduct);
            gsap.set(incomingProduct, { opacity: 1, zIndex: 2, x: 0, y: 0, scale: 1 });
          }
          if (outgoingProduct && outgoingProduct !== incomingProduct) {
            gsap.killTweensOf(outgoingProduct);
            gsap.set(outgoingProduct, { opacity: 0, zIndex: 0 });
          }
        }

        // 3. Silky Smooth Text Transition (Fade out previous, slide in incoming)
        if (outgoingText && prevIdx !== currentIndex) {
          gsap.killTweensOf(outgoingText);
          gsap.set(outgoingText, { zIndex: 1 });
          gsap.to(outgoingText, {
            opacity: 0,
            y: -12,
            duration: 0.35,
            ease: "power2.in",
            onComplete: () => {
              gsap.set(outgoingText, { zIndex: 0 });
            },
          });
        }

        if (incomingText) {
          gsap.killTweensOf(incomingText);
          gsap.set(incomingText, { zIndex: 2 });
          gsap.fromTo(
            incomingText,
            { opacity: 0, y: 16 },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              ease: "power3.out",
              clearProps: "transform",
            }
          );
        }

        // Clean up any remaining inactive slides
        bgRefs.current.forEach((bg, idx) => {
          if (!bg || idx === currentIndex || idx === prevIdx) return;
          gsap.set(bg, { opacity: 0, zIndex: 0 });
        });
        textSlideRefs.current.forEach((t, idx) => {
          if (!t || idx === currentIndex || idx === prevIdx) return;
          gsap.set(t, { opacity: 0, zIndex: 0 });
        });
      }

      prevIndexRef.current = currentIndex;
    },
    { dependencies: [currentIndex], scope: rootRef }
  );

  // Auto-play timer (every 5 seconds), resets on manual navigation
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide, currentIndex]);

  // Pause autoplay when browser tab is hidden, resume when active
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        if (timerRef.current) clearInterval(timerRef.current);
      } else if (!isPaused) {
        timerRef.current = setInterval(() => {
          nextSlide();
        }, 5000);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [isPaused, nextSlide]);

  // Keyboard navigation (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
      if (diffX > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <section
      ref={rootRef}
      aria-label="Featured Industrial Container Solutions"
      className="relative w-full bg-[#0a1422] pt-[74px] sm:pt-[80px] overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 
        Responsive Aspect Frame:
        - Mobile & Tablet: flexible column stack (top text, bottom container images)
        - Desktop (>= 1024px): side-by-side overlay matching graphic ratio (7680 / 3368)
      */}
      <div className="relative w-full min-h-[640px] sm:min-h-[700px] md:min-h-[780px] lg:min-h-[580px] xl:min-h-[660px] lg:aspect-[7680/3400] overflow-hidden flex flex-col justify-between lg:block">
        
        {/* ===================================================================
            LAYER 1: Crossfading Background Scenes (Images 5 to 8)
            =================================================================== */}
        <div className="absolute inset-0 z-0">
          {bannerSlides.map((slide, idx) => (
            <div
              key={slide.id}
              ref={(el) => {
                bgRefs.current[idx] = el;
              }}
              className="absolute inset-0 h-full w-full will-change-[opacity,transform]"
              style={{
                opacity: idx === 0 ? 1 : 0,
                zIndex: idx === 0 ? 2 : 0,
              }}
            >
              <Image
                src={slide.backgroundImage}
                alt=""
                fill
                priority={idx === 0}
                quality={90}
                sizes="100vw"
                className="object-cover object-[70%_center] lg:object-center pointer-events-none select-none"
              />
            </div>
          ))}
        </div>

        {/* Mobile/Tablet readability scrim (softens background under top text) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-b from-[#0a1422]/95 via-[#0a1422]/75 to-[#0a1422]/25 lg:hidden"
        />

        {/* Desktop Left Dark Scrim (ensures white text is always 100% readable over any bright background) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-[58vw] z-[5] bg-gradient-to-r from-[#0a1422]/95 via-[#0a1422]/60 to-transparent hidden lg:block"
        />

        {/* ===================================================================
            TOP TEXT on Mobile/Tablet / LEFT TEXT on Desktop
            =================================================================== */}
        <div
          ref={textContainerRef}
          className="relative z-20 w-full pt-4 sm:pt-6 md:pt-8 px-4 sm:px-8 md:px-10 lg:p-0 
                     lg:absolute lg:left-[3.5vw] lg:top-1/2 lg:-translate-y-1/2 
                     max-w-[620px] sm:max-w-[700px] md:max-w-[760px] lg:max-w-none lg:w-[48vw]"
        >
          {/* Slides Content Stack */}
          <div className="relative min-h-[250px] sm:min-h-[290px] md:min-h-[320px] lg:min-h-[19vw]">
            {bannerSlides.map((slide, idx) => {
              const isActive = idx === currentIndex;
              return (
                <div
                  key={slide.id}
                  ref={(el) => {
                    textSlideRefs.current[idx] = el;
                  }}
                  className={`transition-opacity ${
                    isActive ? "relative z-10 pointer-events-auto" : "absolute inset-0 z-0 pointer-events-none"
                  }`}
                  style={{
                    opacity: idx === 0 ? 1 : 0,
                  }}
                >
                  {/* 1. Eyebrow: "Your Trusted Partner for Quality Container Solutions" */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-sans text-[12px] sm:text-[13px] md:text-[14px] lg:text-[0.95vw] font-semibold text-white/90 tracking-normal drop-shadow-xs">
                      {slide.eyebrow}
                    </span>
                    <span
                      className={`font-sans text-[12px] sm:text-[13px] md:text-[14px] lg:text-[0.95vw] font-bold tracking-normal drop-shadow-xs ${slide.highlightClass}`}
                    >
                      {slide.eyebrowHighlight}
                    </span>
                  </div>

                  {/* 2. Main Heading: High-Impact 4-Line Text matching reference image */}
                  <h1
                    className="mt-2.5 sm:mt-3 lg:mt-[0.8vw] font-display font-bold tracking-tight text-white leading-[1.05]
                               text-[2.2rem] sm:text-[2.75rem] md:text-[3.2rem] lg:text-[3.6vw] xl:text-[3.85vw] drop-shadow-[0_2px_14px_rgba(0,0,0,0.45)] max-w-[340px] sm:max-w-[420px] lg:max-w-[28vw]"
                  >
                    {slide.titleLines.map((line, lIdx) => (
                      <span key={lIdx} className="block whitespace-nowrap">
                        {line}
                      </span>
                    ))}
                  </h1>

                  {/* 3. Description Paragraph */}
                  <p
                    className="mt-3 sm:mt-3.5 lg:mt-[1.1vw] font-sans text-white/90 font-normal leading-[1.6] 
                               text-[13px] sm:text-[14px] md:text-[14.5px] lg:text-[1vw] 
                               max-w-[440px] sm:max-w-[500px] lg:max-w-[36vw] drop-shadow-xs"
                  >
                    {slide.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* 4. Action Button (Row 1) + Arrow Controls (Row 2, placed directly below Explore More button) */}
          <div
            className="mt-4 sm:mt-5 md:mt-6 lg:mt-[1.4vw] flex flex-col items-start gap-3 sm:gap-3.5 lg:gap-[0.85vw] relative z-20"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* CTA Button */}
            <Link
              href={currentSlide.ctaLink}
              className="shrink-0 whitespace-nowrap inline-flex h-10 sm:h-11 lg:h-[2.85vw] items-center justify-center rounded-[10px] lg:rounded-[0.6vw] bg-white px-6 sm:px-7 lg:px-[1.8vw] font-sans font-bold text-[13px] sm:text-[14px] lg:text-[1vw] text-[#0b192c] shadow-[0_4px_16px_rgba(0,0,0,0.25)] transition-all duration-300 hover:bg-slate-100 hover:scale-105 active:scale-95 cursor-pointer"
              aria-label={`Explore ${currentSlide.titleLines.join(" ")}`}
            >
              <span>{currentSlide.ctaText}</span>
            </Link>

            {/* Navigation Arrows Row (< and >) placed below Explore More */}
            <div className="flex items-center gap-2.5 sm:gap-3 lg:gap-[0.75vw]">
              {/* Prev Slide Arrow (<) */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  prevSlide();
                }}
                aria-label="Previous slide"
                className="shrink-0 group flex h-10 w-10 sm:h-11 sm:w-11 lg:h-[2.85vw] lg:w-[2.85vw] items-center justify-center rounded-full bg-white text-slate-900 shadow-[0_4px_16px_rgba(0,0,0,0.25)] transition-all duration-300 hover:bg-slate-100 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white border border-white/60 cursor-pointer"
              >
                <ChevronLeft
                  aria-hidden
                  className="h-4.5 w-4.5 sm:h-5 sm:w-5 lg:h-[1.2vw] lg:w-[1.2vw] stroke-[2.5] transition-transform duration-200 group-hover:-translate-x-0.5"
                />
              </button>

              {/* Next Slide Arrow (>) */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  nextSlide();
                }}
                aria-label="Next slide"
                className="shrink-0 group flex h-10 w-10 sm:h-11 sm:w-11 lg:h-[2.85vw] lg:w-[2.85vw] items-center justify-center rounded-full bg-white text-slate-900 shadow-[0_4px_16px_rgba(0,0,0,0.25)] transition-all duration-300 hover:bg-slate-100 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white border border-white/60 cursor-pointer"
              >
                <ChevronRight
                  aria-hidden
                  className="h-4.5 w-4.5 sm:h-5 sm:w-5 lg:h-[1.2vw] lg:w-[1.2vw] stroke-[2.5] transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </button>
            </div>
          </div>
        </div>

        {/* ===================================================================
            BOTTOM CONTAINER IMAGES on Mobile/Tablet / RIGHT CONTAINER IMAGES on Desktop
            =================================================================== */}
        <div
          className="relative z-10 w-full mt-auto pt-4 pb-0 sm:pb-0 px-3 sm:px-6 md:px-8 flex justify-center items-end
                     lg:pointer-events-none lg:p-0 lg:mt-0 lg:flex-none
                     lg:absolute 
                     lg:right-[3.5vw] 
                     lg:bottom-[2.5vw] 
                     lg:w-[47vw] 
                     max-w-[400px] sm:max-w-[520px] md:max-w-[640px] lg:max-w-none 
                     lg:mx-0 mx-auto will-change-transform"
        >
          <div className="relative aspect-[3912/2612] w-full">
            {bannerSlides.map((slide, idx) => (
              <div
                key={`prod-${slide.id}`}
                ref={(el) => {
                  productRefs.current[idx] = el;
                }}
                className="absolute inset-0 h-full w-full will-change-[opacity,transform]"
                style={{
                  opacity: idx === 0 ? 1 : 0,
                  zIndex: idx === 0 ? 2 : 0,
                }}
              >
                <Image
                  src={slide.productImage}
                  alt={slide.productAlt}
                  fill
                  priority={idx === 0}
                  quality={95}
                  sizes="(max-width: 640px) 95vw, (max-width: 1024px) 80vw, 50vw"
                  className="object-contain object-bottom drop-shadow-[0_16px_36px_rgba(0,0,0,0.45)] select-none pointer-events-none"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

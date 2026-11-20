import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  applicationsFor,
  productDisplayName,
  lidsFor,
  type Product,
} from "@/data/products";

type ProductCardProps = {
  product: Product;
  index?: number;
  priority?: boolean;
  aspect?: "square" | "video" | "wide" | "compact";
};

export function ProductCard({
  product,
  index = 0,
  priority = false,
  aspect = "square",
}: ProductCardProps) {
  const productApplications = applicationsFor(product);
  const lids = lidsFor(product);

  const lidOptions =
    product.lids && product.lids.length > 0
      ? product.locks && product.locks.length > 0
        ? `${product.lids.join(", ")}, ${product.locks.join(", ")}`
        : product.lids.join(", ")
      : "Flat lid, outer lid";

  const appsText =
    productApplications.length > 0
      ? productApplications.map((app) => app.name).join(", ")
      : "Paint, Agro, Food";

  return (
    <article
      className="group relative flex flex-col h-full pt-8 sm:pt-9 xl:pt-10 lg:pt-[2.5vw] transition-all duration-300"
      data-card
    >
      <Link
        href={`/products/${product.slug}`}
        prefetch={true}
        className="absolute inset-0 z-30"
        aria-label={`View ${productDisplayName(product)}`}
      />

      {/* Main Card Container: Exactly even height across all cards, deep brand blue default -> soft powder blue on hover */}
      <div
        className="relative w-full h-full rounded-[24px] sm:rounded-[28px] lg:rounded-[1.6vw] px-4 sm:px-5 lg:px-[1.2vw] pb-4 sm:pb-5 lg:pb-[1.2vw] pt-[104px] sm:pt-[114px] xl:pt-[118px] lg:pt-[7.5vw] bg-[#196e98] group-hover:bg-[#cde2fd] border border-[#13597d] group-hover:border-[#b8d6fa]/70 flex flex-col justify-between shadow-xs transition-all duration-400 ease-out group-hover:shadow-[0_24px_45px_rgba(25,110,152,0.28)] group-hover:-translate-y-2"
      >
        {/* Floating Product Image - Shifted down into card to reduce empty space */}
        <div
          className="absolute -top-7 sm:-top-8 xl:-top-9 lg:-top-[2vw] w-32 sm:w-36 xl:w-38 lg:w-[9.2vw] h-32 sm:h-36 xl:h-38 lg:h-[9.2vw] left-1/2 -translate-x-1/2 z-10 pointer-events-none select-none"
        >
          <div className="relative w-full h-full transition-transform duration-500 ease-out group-hover:scale-108 group-hover:-translate-y-2">
            <Image
              src={product.image}
              alt={product.imageAlt}
              fill
              priority={priority}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              className="object-contain object-bottom drop-shadow-[0_16px_28px_rgba(0,0,0,0.3)] group-hover:drop-shadow-[0_12px_20px_rgba(0,35,90,0.15)] transition-all duration-500"
            />
          </div>
        </div>

        {/* Content Section: Flex column filling equal height */}
        <div className="flex flex-col flex-1 justify-between">
          <div>
            {/* Title & Code - Fixed consistent height so 1-line and 2-line titles align identically */}
            <div className="text-center px-1 min-h-[38px] sm:min-h-[42px] lg:min-h-[2.8vw] flex items-center justify-center">
              <h3
                className="font-display text-[13.5px] sm:text-[14.5px] xl:text-[15px] lg:text-[0.98vw] font-bold text-white group-hover:text-[#1a6b96] tracking-tight leading-snug transition-colors duration-300"
              >
                {product.name.toUpperCase()}{" "}
                <span
                  className="font-semibold text-blue-100 group-hover:text-[#1a6b96]/85 text-[11px] sm:text-[11.5px] xl:text-[12px] lg:text-[0.8vw] lowercase transition-colors duration-300"
                >
                  ({product.codes.plain})
                </span>
              </h3>
            </div>

            {/* Subtle Divider Hairline */}
            <div className="w-full max-w-[160px] sm:max-w-[190px] lg:max-w-[12vw] mx-auto my-1.5 sm:my-2 lg:my-[0.5vw] border-b border-white/20 group-hover:border-[#badbf7] transition-colors duration-300" />

            {/* Spec Rows (Lid Options & Applications) - Equal height alignment */}
            <div className="space-y-1.5 lg:space-y-[0.35vw] my-1 lg:my-[0.25vw] px-0.5 min-h-[40px] sm:min-h-[44px] lg:min-h-[2.8vw] flex flex-col justify-center">
              <div className="flex items-start justify-between gap-2 lg:gap-[0.5vw] text-[11.5px] sm:text-[12px] lg:text-[0.8vw]">
                <span className="font-semibold text-blue-100 group-hover:text-[#1a6b96] shrink-0 transition-colors duration-300">Lid Options</span>
                <span className="font-bold text-white group-hover:text-slate-900 text-right line-clamp-1 transition-colors duration-300">
                  {lidOptions}
                </span>
              </div>
              <div className="flex items-start justify-between gap-2 lg:gap-[0.5vw] text-[11.5px] sm:text-[12px] lg:text-[0.8vw]">
                <span className="font-semibold text-blue-100 group-hover:text-[#1a6b96] shrink-0 transition-colors duration-300">Applications</span>
                <span className="font-bold text-white group-hover:text-slate-900 text-right line-clamp-1 transition-colors duration-300">
                  {appsText}
                </span>
              </div>
            </div>
          </div>

          {/* View Details Action Button - Aligns at the exact same bottom position on all cards */}
          <div className="mt-auto pt-2.5 lg:pt-[0.6vw]">
            <div className="w-full flex items-center justify-center gap-2 lg:gap-[0.5vw] py-2 sm:py-2.5 lg:py-[0.6vw] px-3 lg:px-[0.8vw] rounded-xl lg:rounded-[0.7vw] bg-white text-[#196e98] font-semibold text-[12.5px] sm:text-[13px] lg:text-[0.85vw] shadow-xs transition-all duration-300 group-hover:bg-[#196e98] group-hover:text-white group-hover:shadow-md">
              <span>View details</span>
              <ArrowUpRight className="h-3.5 w-3.5 lg:h-[0.9vw] lg:w-[0.9vw] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

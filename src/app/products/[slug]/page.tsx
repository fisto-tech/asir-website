import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Info } from "lucide-react";
import { ProductMedia } from "@/components/products/ProductMedia";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductApplicationsShowcase } from "@/components/products/ProductApplicationsShowcase";
import { ProductQualityInspection } from "@/components/products/ProductQualityInspection";
import { Reveal } from "@/components/motion/Reveal";
import { AnimatedIcon, applicationIcons, type IconMotion } from "@/components/ui/AnimatedIcon";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  applicationsFor,
  capacityDisplay,
  codesFor,
  colorsFor,
  getProduct,
  getRelatedProducts,
  lidsFor,
  products,
} from "@/data/products";
import { site } from "@/data/site";
import { swatches } from "@/lib/colors";

type PageProps = { params: Promise<{ slug: string }> };

const motionByApplication: Record<string, IconMotion> = {
  paint: "swing",
  agro: "float",
  food: "pulse",
  lube: "float",
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) return { title: "Container not found" };

  const codes = codesFor(product).join(" / ");
  const title = `${product.name} — ${capacityDisplay(product)} (${codes})`;
  const description = `${product.summary} Product codes: ${codes}. Available colours: ${colorsFor(product).join(", ")}.`;

  return {
    title,
    description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: `${site.url}/products/${product.slug}`,
      images: [{ url: product.image, alt: product.imageAlt }],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) notFound();

  const productApplications = applicationsFor(product);
  const applicationNames = productApplications.map((application) => application.name);
  const colors = colorsFor(product);
  const lids = lidsFor(product);
  const related = getRelatedProducts(product, 3);

  // Extract GSL and OFC specifications
  const gslMatch = product.specs.gslOfc.match(/GSL\s*([^/]+)/i)?.[1]?.trim();
  const ofcMatch = product.specs.gslOfc.match(/OFC\s*(.+)/i)?.[1]?.trim();

  const brimfulValue = product.specs.brimful
    ? (gslMatch ? `${product.specs.brimful} (${gslMatch})` : product.specs.brimful)
    : (gslMatch || "—");

  const ofcValue = ofcMatch || product.specs.gslOfc || "—";

  const lidStr = lids.length > 0 ? lids.join(", ") : "";
  const lockStr = product.locks.length > 0 ? product.locks.join(", ") : "";
  const lidAndLockValue = [lidStr, lockStr].filter(Boolean).join(" / ") || "Not applicable";

  const specRows: { label: string; value: string }[] = [
    { label: "Capacity", value: capacityDisplay(product) },
    { label: "Material", value: product.material || "Polypropylene (PP)" },
    { label: "Brimful capacity (GSL)", value: brimfulValue },
    { label: "OFC (Optimum Filling Capacity)", value: ofcValue },
    { label: "Height", value: product.specs.height },
    { label: "Weight", value: product.specs.weight ?? "Available on enquiry" },
    { label: "Lid Options / Lock Type", value: lidAndLockValue },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    image: `${site.url}${product.image}`,
    sku: product.codes.plain,
    mpn: product.codes.plain,
    category: applicationNames.join(", "),
    brand: { "@type": "Brand", name: site.name },
    manufacturer: { "@type": "Organization", name: site.name, url: site.url },
    url: `${site.url}/products/${product.slug}`,
    additionalProperty: [
      { "@type": "PropertyValue", name: "Capacity", value: capacityDisplay(product) },
      { "@type": "PropertyValue", name: "Material", value: product.material || "Polypropylene (PP)" },
      { "@type": "PropertyValue", name: "Brimful capacity (GSL)", value: brimfulValue },
      { "@type": "PropertyValue", name: "OFC (Optimum Filling Capacity)", value: ofcValue },
      { "@type": "PropertyValue", name: "Height", value: product.specs.height },
      { "@type": "PropertyValue", name: "Weight", value: product.specs.weight ?? "Available on enquiry" },
      { "@type": "PropertyValue", name: "Lid Options / Lock Type", value: lidAndLockValue },
      { "@type": "PropertyValue", name: "Product codes", value: codesFor(product).join(", ") },
      ...(product.codes.tin
        ? [{ "@type": "PropertyValue", name: "Tinned code", value: product.codes.tin }]
        : []),
    ],
    // Prices, GTINs, dimensions and material grades are intentionally omitted
    // until ASIR Containers supplies verified commercial data.
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Products", item: `${site.url}/products` },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `${site.url}/products/${product.slug}`,
      },
    ],
  };

  return (
    <>
      <div className="border-b border-line bg-white pt-20 lg:pt-[5.5vw]">
        <div className="shell max-w-[1440px] lg:max-w-[92vw] px-5 sm:px-8 lg:px-[4vw]">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 lg:gap-[0.5vw] text-[14px] lg:text-[0.9vw] font-medium text-mid sm:text-[14.5px]"
          >
            <Link href="/" prefetch={true} className="transition-colors hover:text-ink">
              Home
            </Link>
            <span aria-hidden className="text-mid/40">
              /
            </span>
            <Link href="/products" prefetch={true} className="transition-colors hover:text-ink">
              Products
            </Link>
            <span aria-hidden className="text-mid/40">
              /
            </span>
            <span className="font-semibold text-ink">{product.codes.plain}</span>
          </nav>

          <div className="mt-5 lg:mt-[1.2vw] grid items-start lg:items-stretch gap-8 lg:gap-[2.5vw] pb-10 lg:pb-[2.5vw] lg:grid-cols-12">
            <div className="flex flex-col lg:col-span-5 lg:h-full">
              <div className="flex flex-col lg:h-full">
                <ProductMedia
                  src={product.image}
                  alt={product.imageAlt}
                  capacity={capacityDisplay(product)}
                  category={applicationNames.join(" · ")}
                  className="lg:h-full"
                />
              </div>
            </div>

            <Reveal className="lg:col-span-7 min-w-0">          
              <div className="min-w-0">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between min-w-0">
                  <h1 className="sheen-ink font-display text-[clamp(1.85rem,5.2vw,2.75rem)] lg:text-[2.6vw] font-semibold tracking-tight text-ink sm:text-4xl md:text-5xl lg:leading-[1.12] break-words">
                    {product.name}
                  </h1>

                  {/* Product codes badge — responsive layout wrapping on small phones */}
                  <div className="flex flex-wrap shrink-0 items-center gap-2 lg:gap-[0.5vw] self-start sm:mt-1 lg:mt-[0.2vw]">
                    <div className="rounded-xl lg:rounded-[0.7vw] border border-line bg-white px-3 py-1.5 lg:px-[0.8vw] lg:py-[0.35vw] text-center shadow-2xs sm:px-3.5">
                      <span className="block text-[10px] lg:text-[0.65vw] font-semibold uppercase tracking-[0.14em] text-mid">
                        Plain Code
                      </span>
                      <span className="flex items-center justify-center font-mono text-[16px] sm:text-[18px] md:text-[20px] lg:text-[1.2vw] font-semibold tracking-tight text-ink">
                        {product.codes.plain}
                      </span>
                    </div>

                    {product.codes.tin && (
                      <div className="rounded-xl lg:rounded-[0.7vw] border border-brand/25 bg-white px-3 py-1.5 lg:px-[0.8vw] lg:py-[0.35vw] text-center shadow-2xs sm:px-3.5">
                        <span className="block text-[10px] lg:text-[0.65vw] font-semibold uppercase tracking-[0.14em] text-brand">
                          Tin/Sp. Code
                        </span>
                        <span className="flex items-center justify-center font-mono text-[16px] sm:text-[18px] md:text-[20px] lg:text-[1.2vw] font-semibold tracking-tight text-brand">
                          {product.codes.tin}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <p className="mt-3.5 lg:mt-[0.9vw] max-w-xl lg:max-w-[36vw] text-[14.5px] lg:text-[1vw] leading-relaxed text-mid sm:text-[15.5px]" data-reveal>
                  {product.summary}
                </p>

                {/* Specification table — enhanced readability & typography */}
                <dl className="mt-6 sm:mt-7 lg:mt-[1.4vw] border-t border-line" data-reveal>
                  {specRows.map((row) => (
                    <div
                      key={row.label}
                      className="flex flex-col gap-0.5 border-b border-line py-3 sm:py-3.5 lg:py-[0.75vw] sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 lg:gap-[1.5vw]"
                    >
                      <dt className="text-[14px] lg:text-[0.92vw] font-medium text-mid sm:text-[15px]">
                        {row.label}
                      </dt>
                      <dd className="text-[14.5px] lg:text-[0.95vw] font-medium text-slate-800 sm:max-w-[65%] sm:text-right sm:text-[15.5px] break-words">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                {/* CTAs */}
                <div className="mt-6 lg:mt-[1.4vw] flex flex-col gap-3 lg:gap-[0.8vw] sm:flex-row sm:flex-wrap sm:items-center" data-reveal>
                  <Link
                    href={`/contact?product=${product.slug}`}
                    prefetch={true}
                    className="group inline-flex h-11 lg:h-[2.8vw] items-center justify-center gap-2 lg:gap-[0.5vw] rounded-lg lg:rounded-[0.5vw] bg-brand px-5 lg:px-[1.4vw] text-sm lg:text-[0.92vw] font-medium text-white transition-colors hover:bg-brand-dark"
                  >
                    <span>Enquire about {product.codes.plain}</span>
                    <ArrowRight className="h-4 w-4 lg:h-[1vw] lg:w-[1vw] transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/products"
                    prefetch={true}
                    className="inline-flex h-11 lg:h-[2.8vw] items-center justify-center gap-2 lg:gap-[0.5vw] rounded-lg lg:rounded-[0.5vw] border border-ink/20 px-5 lg:px-[1.4vw] text-sm lg:text-[0.92vw] font-medium text-ink transition-colors hover:border-ink hover:bg-slate-50"
                  >
                    <ArrowLeft className="h-4 w-4 lg:h-[1vw] lg:w-[1vw]" />
                    <span>Back to products</span>
                  </Link>
                </div>
              </div>

            </Reveal>
          </div>
        </div>
      </div>

      {/* Applications (auto-updating & interactive hover image showcase) */}
      <Reveal>
        <ProductApplicationsShowcase
          applications={productApplications}
          productName={product.name}
        />
      </Reveal>

      {/* Quality and Inspection */}
      <ProductQualityInspection />

      {/* Related */}
      <section className="bg-white pt-10 sm:pt-12 lg:pt-[3vw] pb-3 sm:pb-4 lg:pb-[1.5vw]">
        <div className="shell max-w-[1440px] lg:max-w-[92vw] px-5 sm:px-8 lg:px-[4vw]">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6 lg:pb-[1.2vw]">
            <div>
              <SectionLabel index={undefined}>Related containers</SectionLabel>
              <h2 className="text-2xl sm:text-3xl lg:text-[2vw] font-bold tracking-tight mt-4 lg:mt-[0.8vw] text-ink">Same applications, other pack sizes.</h2>
            </div>
            <Link
              href="/products"
              prefetch={true}
              className="group inline-flex items-center gap-2 lg:gap-[0.5vw] text-sm lg:text-[0.92vw] font-medium text-ink transition-colors hover:text-brand"
            >
              View all containers
              <ArrowUpRight className="h-4 w-4 lg:h-[1vw] lg:w-[1vw] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <ul className="mt-8 lg:mt-[1.8vw] grid gap-6 lg:gap-[1.5vw] sm:grid-cols-2 lg:grid-cols-3 max-w-[1020px] lg:max-w-[70vw] items-stretch">
            {related.map((item, relatedIndex) => (
              <li key={item.slug} className="h-full flex flex-col">
                <ProductCard product={item} index={relatedIndex} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Enquiry band — matches homepage ContactCTA design */}
      <section className="bg-white pt-1 pb-6 sm:pb-8 lg:pb-[2.5vw]">
        <div className="shell max-w-[1440px] lg:max-w-[92vw] px-5 sm:px-8 lg:px-[4vw]">
          <div className="relative overflow-hidden rounded-[24px] lg:rounded-[1.6vw] bg-charcoal shadow-xl">
            {/* Backdrop with plant photograph */}
            <div className="absolute inset-0">
              <Image
                src="/images/facility/dispatch.jpg"
                alt="Dispatch bay and factory floor packaging line"
                fill
                sizes="100vw"
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/80 to-charcoal/40" />
            </div>

            <div className="relative z-10 flex flex-col justify-between gap-6 px-7 py-8 sm:px-10 sm:py-10 lg:flex-row lg:items-center lg:px-[3vw] lg:py-[2.6vw]">
              <div className="max-w-xl lg:max-w-[36vw]">
                <SectionLabel tone="light">
                  Next Step
                </SectionLabel>

                <h2 className="text-2xl sm:text-3xl lg:text-[2vw] font-display font-semibold text-white mt-2.5 lg:mt-[0.6vw]">
                  Need this container in a specific colour or closure?
                </h2>

                <p className="mt-2.5 lg:mt-[0.6vw] max-w-lg lg:max-w-[32vw] text-[14.5px] lg:text-[1vw] leading-relaxed text-white/80">
                  Send us the code ({codesFor(product).join(" or ")}), required colours and batch volume. We will confirm lead times and mould allocation directly.
                </p>
              </div>

              {/* Clean Enquiry Action */}
              <div className="shrink-0">
                <Link
                  href={`/contact?product=${product.slug}`}
                  className="group inline-flex h-12 lg:h-[3vw] items-center justify-center gap-2.5 lg:gap-[0.6vw] rounded-full bg-brand px-7 lg:px-[1.8vw] text-[14.5px] lg:text-[0.95vw] font-semibold text-white shadow-lg shadow-brand/25 transition-all duration-300 hover:bg-brand-dark hover:shadow-xl hover:shadow-brand/35 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Start an enquiry
                  <ArrowRight
                    aria-hidden
                    className="h-4 w-4 lg:h-[1vw] lg:w-[1vw] transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
    </>
  );
}

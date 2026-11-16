import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * Shared page header for the Products and Contact pages.
 *
 * Editorial masthead: a slim rule of meta across the top, an oversized title
 * set against a soft panel, and the supporting copy pulled into a narrow
 * column on the right. No breadcrumb chain, no divider grid — the rule and the
 * type do the work.
 */
export function PageMasthead({
  index,
  label,
  title,
  intro,
  meta,
  action,
  children,
  rightElement,
  compact = false,
}: {
  index?: string;
  label?: string;
  title: React.ReactNode;
  intro?: string;
  meta?: { label: string; value: React.ReactNode }[];
  action?: { href: string; label: string };
  children?: React.ReactNode;
  rightElement?: React.ReactNode;
  compact?: boolean;
}) {
  const showMetaRule = Boolean(label || (meta && meta.length > 0));

  return (
    <section
      className={`relative overflow-hidden border-b border-ink/10 bg-soft ${
        compact ? "pt-20 pb-3 sm:pt-22 sm:pb-4 lg:pt-[5.5vw] lg:pb-[1.2vw]" : "pb-12 pt-28 lg:pb-[3.5vw] lg:pt-[7vw]"
      }`}
    >
      {/* Soft arc that ties the masthead to the brand red without a band */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-48 h-[520px] w-[520px] lg:h-[35vw] lg:w-[35vw] rounded-full border border-brand/15"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-32 h-[380px] w-[380px] lg:h-[26vw] lg:w-[26vw] rounded-full border border-brand/10"
      />

      <div className="shell relative max-w-[1440px] lg:max-w-[92vw] px-5 sm:px-8 lg:px-[4vw]">
        {/* Meta rule */}
        {showMetaRule && (
          <div className={`flex flex-wrap items-center justify-between gap-4 lg:gap-[1vw] border-b border-ink/15 ${compact ? "pb-3 lg:pb-[0.8vw]" : "pb-4 lg:pb-[1vw]"}`}>
            {label && <SectionLabel index={index ?? "00"}>{label}</SectionLabel>}
            {meta && meta.length > 0 && (
              <dl className="flex flex-wrap items-center gap-x-7 lg:gap-x-[1.8vw] gap-y-2 lg:gap-y-[0.5vw]">
                {meta.map((item) => (
                  <div key={item.label} className="flex items-baseline gap-2 lg:gap-[0.5vw]">
                    <dt className="text-[12px] lg:text-[0.8vw] text-mid">{item.label}</dt>
                    <dd className="tabular text-[13px] lg:text-[0.88vw] font-semibold text-ink">{item.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        )}

        {/* Title block */}
        <div className={`grid items-baseline gap-6 sm:grid-cols-12 sm:gap-8 ${compact ? (showMetaRule ? "mt-6 lg:mt-[1.5vw]" : "mt-0") : "mt-10 lg:mt-[2.5vw] lg:gap-[3vw]"}`}>
          <h1
            className={`font-semibold tracking-tight text-ink sm:col-span-7 lg:col-span-6 ${
              compact ? "text-[32px] sm:text-[40px] lg:text-[3vw] leading-tight" : "text-[36px] sm:text-[48px] lg:text-[3.5vw] font-bold max-w-2xl lg:max-w-[42vw] leading-tight"
            }`}
            data-reveal
            data-reveal-dir="left"
            data-reveal-delay="0.1"
          >
            {title}
          </h1>

          <div className="sm:col-span-5 lg:col-span-6 sm:self-center">
            {rightElement ? (
              rightElement
            ) : (
              <>
                {!compact && <span aria-hidden className="mb-5 lg:mb-[1.2vw] block h-px w-14 lg:w-[3.5vw] bg-brand" />}
                {intro && (
                  <p className={`leading-relaxed text-mid ${compact ? "text-[14.5px] lg:text-[1vw] max-w-lg lg:max-w-[32vw]" : "max-w-sm lg:max-w-[28vw] text-[16px] lg:text-[1.1vw]"}`} data-reveal>
                    {intro}
                  </p>
                )}
                {action && (
                  <Button
                    href={action.href}
                    variant="primary"
                    size="md"
                    className="mt-6 lg:mt-[1.5vw] lg:h-[2.8vw] lg:px-[1.5vw] lg:text-[0.95vw] lg:rounded-[0.5vw]"
                    withArrow
                  >
                    {action.label}
                  </Button>
                )}
              </>
            )}
          </div>
        </div>

        {children}
      </div>
    </section>
  );
}

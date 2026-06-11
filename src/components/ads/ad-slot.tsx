import { cn } from "@/lib/utils";

type AdFormat = "in-article" | "leaderboard" | "rectangle" | "sidebar-half-page";

/** Reserved heights per format → guarantees zero CLS even before the ad fills. */
const RESERVED: Record<AdFormat, string> = {
  "in-article": "min-h-[280px]",
  leaderboard: "min-h-[90px] md:min-h-[90px]",
  rectangle: "min-h-[250px]",
  "sidebar-half-page": "min-h-[600px]",
};

interface AdSlotProps {
  /** AdSense ad unit id (data-ad-slot). */
  slotId: string;
  format?: AdFormat;
  className?: string;
  /** Render a labeled placeholder instead of the live ad (dev/preview). */
  placeholder?: boolean;
}

/**
 * CLS-safe AdSense container.
 * The reserved min-height is the core Web-Vitals protection: the box occupies
 * its space before the ad script paints, so no layout shift occurs.
 *
 * Per the AdSense placement plan, NEVER place this above the calculator tool.
 */
export function AdSlot({
  slotId,
  format = "in-article",
  className,
  placeholder = process.env.NODE_ENV !== "production",
}: AdSlotProps) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  return (
    <aside
      aria-label="Advertisement"
      className={cn(
        "my-8 flex w-full items-center justify-center overflow-hidden rounded-md bg-muted/40",
        RESERVED[format],
        className,
      )}
    >
      <span className="sr-only">Advertisement</span>
      {placeholder || !clientId ? (
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Ad · {format}
        </span>
      ) : (
        <ins
          className="adsbygoogle block w-full"
          style={{ display: "block" }}
          data-ad-client={clientId}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      )}
    </aside>
  );
}

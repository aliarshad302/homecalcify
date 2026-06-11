"use client";

import { Printer, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";
import type { CalculatorResult } from "@/lib/calculator/types";

interface ResultCardProps {
  results: CalculatorResult[];
  /** Shown when there are no valid results yet. */
  emptyHint?: string;
  onShare?: () => void;
  onPrint?: () => void;
}

function renderValue(r: CalculatorResult): string {
  const fmt = (n: number) =>
    r.format === "currency"
      ? formatCurrency(n, r.precision ?? 0)
      : formatNumber(n, r.precision ?? 2);
  // Render a range when valueHigh is set and meaningfully different.
  if (r.valueHigh !== undefined && Math.abs(r.valueHigh - r.value) > 0.001) {
    return `${fmt(r.value)} – ${fmt(r.valueHigh)}`;
  }
  return fmt(r.value);
}

/**
 * Sticky result hero. The primary result renders large with tabular figures;
 * secondary results (bags, cost) sit in a compact grid beneath.
 */
export function ResultCard({ results, emptyHint, onShare, onPrint }: ResultCardProps) {
  const primary = results.find((r) => r.primary);
  const secondary = results.filter((r) => !r.primary);

  return (
    <Card
      className="bg-gradient-to-br from-primary to-[hsl(221_83%_45%)] text-primary-foreground shadow-result lg:sticky lg:top-24"
      aria-live="polite"
    >
      <div className="p-6">
        {primary ? (
          <div key={`${primary.id}-${primary.value}`} className="animate-count-pop">
            <p className="text-sm font-medium uppercase tracking-wide text-primary-foreground/80">
              {primary.label}
            </p>
            <p className="mt-1 font-display text-4xl font-bold tabular-nums sm:text-5xl">
              {renderValue(primary)}{" "}
              <span className="text-2xl font-semibold text-primary-foreground/90">
                {primary.unit}
              </span>
            </p>
            {primary.note && (
              <p className="mt-1 text-xs text-primary-foreground/70">{primary.note}</p>
            )}
          </div>
        ) : (
          <div className="py-6 text-center">
            <p className="font-display text-2xl font-semibold text-primary-foreground/90">
              Enter your measurements
            </p>
            <p className="mt-1 text-sm text-primary-foreground/70">
              {emptyHint ?? "Your result updates instantly."}
            </p>
          </div>
        )}

        {secondary.length > 0 && (
          <div className="mt-5 grid grid-cols-2 gap-3 border-t border-primary-foreground/15 pt-5">
            {secondary.map((r) => {
              const emphasized = r.highlight || r.format === "currency";
              return (
                <div
                  key={r.id}
                  className={cn(
                    emphasized &&
                      "col-span-2 rounded-md bg-accent/20 p-3 ring-1 ring-accent/40",
                  )}
                >
                  <p className="text-xs font-medium text-primary-foreground/75">{r.label}</p>
                  <p
                    className={cn(
                      "font-display font-semibold tabular-nums",
                      emphasized ? "text-2xl text-accent" : "text-xl",
                    )}
                  >
                    {renderValue(r)} {r.unit}
                  </p>
                  {r.note && (
                    <p className="text-[11px] leading-tight text-primary-foreground/60">{r.note}</p>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {(onShare || onPrint) && primary && (
          <div className={cn("mt-6 flex gap-2")}>
            {onShare && (
              <Button
                variant="outline"
                size="sm"
                onClick={onShare}
                className="flex-1 border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
              >
                <Share2 /> Share
              </Button>
            )}
            {onPrint && (
              <Button
                variant="outline"
                size="sm"
                onClick={onPrint}
                className="flex-1 border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
              >
                <Printer /> Print
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}

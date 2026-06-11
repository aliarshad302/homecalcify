"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UnitToggle } from "./unit-toggle";
import { ResultCard } from "./result-card";
import {
  initialInputs,
  runCalculator,
  validateField,
} from "@/lib/calculator/engine";
import type { FieldValue, Unit } from "@/lib/calculator/types";
import { getCalculator } from "@/config/calculators";

interface CalculatorShellProps {
  /**
   * Calculator slug. The shell resolves the full config (including the
   * non-serializable `compute` function) from the registry on the client, so
   * nothing has to cross the server→client boundary as a prop.
   */
  slug: string;
}

/**
 * The universal calculator UI. Resolves a CalculatorConfig by slug and renders
 * inputs, the unit toggle, and a live ResultCard. Calculation is synchronous
 * and client-side → results update on every keystroke with no reload (UX + RPM).
 */
export function CalculatorShell({ slug }: CalculatorShellProps) {
  const config = getCalculator(slug);
  const [unit, setUnit] = React.useState<Unit>("imperial");
  const [inputs, setInputs] = React.useState<Record<string, FieldValue>>(() =>
    config ? initialInputs(config) : {},
  );
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});

  const setField = (id: string, value: FieldValue) =>
    setInputs((prev) => ({ ...prev, [id]: value }));

  // Pure derivation — no effects, no stale state.
  const results = React.useMemo(
    () => (config ? runCalculator(config, inputs, unit) : []),
    [config, inputs, unit],
  );

  // Hooks above run unconditionally; safe to bail out now if the slug is unknown.
  if (!config) return null;

  const handleShare = async () => {
    const primary = results.find((r) => r.primary);
    const text = primary
      ? `${config.name}: ${primary.label} ${primary.value.toFixed(primary.precision ?? 2)} ${primary.unit}`
      : config.name;
    try {
      if (navigator.share) {
        await navigator.share({ title: config.name, text, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(`${text} — ${window.location.href}`);
      }
    } catch {
      /* user dismissed share sheet — no-op */
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_minmax(280px,360px)]">
      {/* Inputs */}
      <Card className="p-6">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="font-display text-lg font-semibold">Your measurements</h2>
          {config.supportsUnits && <UnitToggle value={unit} onChange={setUnit} />}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {config.fields.map((field) => {
            const value = inputs[field.id];
            const error = touched[field.id] ? validateField(field, value) : null;
            const suffix = field.unitLabel?.[unit];

            return (
              <div key={field.id} className="space-y-1.5">
                <Label htmlFor={field.id}>
                  {field.label}
                  {suffix && (
                    <span className="ml-1 font-normal text-muted-foreground">({suffix})</span>
                  )}
                </Label>

                {field.type === "select" ? (
                  <Select
                    value={String(value ?? "")}
                    onValueChange={(v) => setField(field.id, v)}
                  >
                    <SelectTrigger id={field.id} aria-label={field.label}>
                      <SelectValue placeholder={field.placeholder ?? "Select"} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options?.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id={field.id}
                    type="number"
                    inputMode="decimal"
                    placeholder={field.placeholder}
                    value={value as string}
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    aria-invalid={!!error}
                    aria-describedby={field.help ? `${field.id}-help` : undefined}
                    onChange={(e) => setField(field.id, e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, [field.id]: true }))}
                  />
                )}

                {error ? (
                  <p className="text-xs text-destructive">{error}</p>
                ) : field.help ? (
                  <p id={`${field.id}-help`} className="text-xs text-muted-foreground">
                    {field.help}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Result */}
      <ResultCard
        results={results}
        emptyHint="Fill in the fields to see your estimate."
        onShare={handleShare}
        onPrint={() => window.print()}
      />
    </div>
  );
}

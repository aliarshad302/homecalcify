"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Unit } from "@/lib/calculator/types";

interface UnitToggleProps {
  value: Unit;
  onChange: (unit: Unit) => void;
}

/** Imperial / Metric switch shared across all unit-aware calculators. */
export function UnitToggle({ value, onChange }: UnitToggleProps) {
  return (
    <Tabs value={value} onValueChange={(v) => onChange(v as Unit)}>
      <TabsList aria-label="Measurement units">
        <TabsTrigger value="imperial">Imperial</TabsTrigger>
        <TabsTrigger value="metric">Metric</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

import type { CalculatorConfig } from "@/lib/calculator/types";
import { concreteCalculator } from "./concrete";
import { drywallCalculator } from "./drywall";
import { flooringCalculator } from "./flooring";
import { vinylPlankCalculator } from "./vinyl-plank";
import { tileCalculator } from "./tile";
import { paintCalculator } from "./paint";
import { roofingCalculator } from "./roofing";
import { roofPitchCalculator } from "./roof-pitch";
import { mulchCalculator } from "./mulch";
import { asphaltCalculator } from "./asphalt";
import { gravelCalculator } from "./gravel";
import { insulationCalculator } from "./insulation";
import { sidingCalculator } from "./siding";

/**
 * Central calculator registry.
 * Register each new calculator here; routes, sitemap, hub grids, the
 * /calculators directory, and the homepage all derive from this single source.
 */
export const calculators: CalculatorConfig[] = [
  concreteCalculator,
  roofingCalculator,
  roofPitchCalculator,
  flooringCalculator,
  vinylPlankCalculator,
  tileCalculator,
  paintCalculator,
  drywallCalculator,
  mulchCalculator,
  asphaltCalculator,
  gravelCalculator,
  insulationCalculator,
  sidingCalculator,
];

export const calculatorMap: Record<string, CalculatorConfig> = Object.fromEntries(
  calculators.map((c) => [c.slug, c]),
);

export function getCalculator(slug: string): CalculatorConfig | undefined {
  return calculatorMap[slug];
}

export function getCalculatorsByCategory(category: string): CalculatorConfig[] {
  return calculators.filter((c) => c.category === category);
}

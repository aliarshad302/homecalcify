import type { LocationData } from "@/lib/calculator/types";

/**
 * Shared regional cost multipliers (vs US national average) for gated location
 * pages. Multipliers are kept here so they stay consistent across calculators;
 * each calculator supplies its OWN unique, differentiated note per state so the
 * pages are substantive, not thin.
 */
export const STATE_MULTIPLIERS = {
  texas: 0.92,
  california: 1.28,
  florida: 0.99,
  "new-york": 1.22,
  illinois: 1.05,
} as const;

export const STATE_NAMES: Record<keyof typeof STATE_MULTIPLIERS, string> = {
  texas: "Texas",
  california: "California",
  florida: "Florida",
  "new-york": "New York",
  illinois: "Illinois",
};

type StateSlug = keyof typeof STATE_MULTIPLIERS;

/** Build LocationData[] from per-state notes; only states with a note are included. */
export function buildStates(notes: Partial<Record<StateSlug, string>>): LocationData[] {
  return (Object.keys(notes) as StateSlug[]).map((slug) => ({
    slug,
    name: STATE_NAMES[slug],
    priceMultiplier: STATE_MULTIPLIERS[slug],
    note: notes[slug]!,
  }));
}

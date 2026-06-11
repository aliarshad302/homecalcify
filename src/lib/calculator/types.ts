/**
 * Config-driven calculator engine — type contracts.
 *
 * Every calculator on HomeCalcify is a `CalculatorConfig` object. The UI
 * (CalculatorShell) and the math (compute) are fully decoupled, so adding the
 * 150th calculator means writing one config file — no new components.
 */

export type Unit = "imperial" | "metric";

export type FieldValue = number | string;

export interface FieldOption {
  label: string;
  value: string;
}

/** A single user input rendered by the shell. */
export interface CalculatorField {
  id: string;
  label: string;
  type: "number" | "select";
  /** Unit suffix shown in the input, switched by the global unit toggle. */
  unitLabel?: Partial<Record<Unit, string>>;
  placeholder?: string;
  defaultValue?: FieldValue;
  min?: number;
  max?: number;
  step?: number;
  /** Options for `type: "select"`. */
  options?: FieldOption[];
  /** Short helper text under the field. */
  help?: string;
  /** If true, result is suppressed until a valid value is entered. */
  required?: boolean;
}

export type ResultFormat = "number" | "currency";

/** A single output produced by `compute`. */
export interface CalculatorResult {
  id: string;
  label: string;
  value: number;
  /** When set (and ≠ value), the result renders as a range "value – valueHigh". */
  valueHigh?: number;
  unit?: string;
  format?: ResultFormat;
  precision?: number;
  /** Primary result is rendered large in the ResultCard hero slot. */
  primary?: boolean;
  /** Highlight this result (e.g. the cost estimate) in the result card. */
  highlight?: boolean;
  /** Optional context line, e.g. "includes 10% waste". */
  note?: string;
}

export interface ComputeContext {
  inputs: Record<string, FieldValue>;
  unit: Unit;
}

/** A content data table (cost guide, reference chart, coverage table). */
export interface ContentTable {
  title: string;
  caption?: string;
  columns: string[];
  rows: string[][];
}

/** SEO / content payload colocated with the calculator. */
export interface CalculatorContent {
  /** 40–60 word direct answer for AEO / AI Overviews. */
  answer: string;
  /** Quick stat strip shown near the top (e.g. "1 square = 100 ft²"). */
  quickFacts?: { label: string; value: string }[];
  formula?: string;
  /** Stepwise manual method → powers HowTo schema. */
  steps?: { title: string; detail: string }[];
  example?: string;
  /** Cost/lifespan/reference tables rendered as styled tables. */
  tables?: ContentTable[];
  /** Common mistakes section. */
  mistakes?: { title: string; detail: string }[];
  faqs?: { question: string; answer: string }[];
  /** Slugs of related calculators (sibling cross-links). */
  related?: string[];
  /** Slugs/paths of related guides (down-links into blog layer). */
  guides?: { title: string; href: string }[];
}

export interface CalculatorConfig {
  /** URL slug, e.g. "concrete-calculator". */
  slug: string;
  name: string;
  /** Category hub slug this calculator belongs to, e.g. "concrete". */
  category: string;
  categoryLabel: string;
  /** Short description for cards, meta description, hub grids. */
  description: string;
  /** Whether the unit toggle is shown (some calcs are unit-agnostic). */
  supportsUnits?: boolean;
  fields: CalculatorField[];
  /** Pure function: inputs + unit → results. No side effects. */
  compute: (ctx: ComputeContext) => CalculatorResult[];
  content: CalculatorContent;
  /** SEO overrides; fall back to name/description when absent. */
  seo?: {
    title?: string;
    description?: string;
  };

  // ── Programmatic SEO engine fields ──────────────────────────────
  /** Estimated keyword CPC tier — drives build priority & ad density. */
  cpc?: "high" | "medium" | "low";
  /** Target keyword cluster for this calculator's page set. */
  keywords?: string[];
  /** Which cluster pages to generate. `main` is always generated. */
  intents?: PageIntent[];
  /** Slug action for the how-to page → /how-to-{action}/ (e.g. "pour-concrete"). */
  howtoAction?: string;
  /** Optional how-to materials/tools/tips (reused by the how-to template). */
  howto?: { tools?: string[]; materials?: string[]; tips?: string[] };
  /** Regional data — ONLY add states with real, differentiated numbers. */
  locations?: LocationData[];
}

/** Cluster page intents generated per calculator (beyond the main page). */
export type PageIntent = "cost" | "guide" | "howto";

/** Real regional differentiation that keeps location pages from being thin. */
export interface LocationData {
  /** URL slug, e.g. "texas". */
  slug: string;
  /** Display name, e.g. "Texas". */
  name: string;
  /** Cost multiplier vs national average (1.0 = national). */
  priceMultiplier: number;
  /** Unique local context: labor, permits, climate, suppliers. */
  note: string;
}

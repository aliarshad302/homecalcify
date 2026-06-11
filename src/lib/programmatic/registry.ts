import type { CalculatorConfig, LocationData } from "@/lib/calculator/types";
import { calculators, getCalculator } from "@/config/calculators";

/**
 * Programmatic page registry.
 *
 * Each calculator config expands into a CLUSTER of pages (cost, guide, how-to,
 * and gated location pages). The `main` calculator page is resolved separately
 * via getCalculator(). Routing, sitemap, and internal links all derive from the
 * registry built here — adding a calculator config adds its whole cluster with
 * zero manual page creation.
 */

export type PageType = "cost" | "guide" | "howto" | "location";

export interface PageDescriptor {
  slug: string; // flat root slug, e.g. "concrete-cost-calculator"
  type: PageType;
  calculatorSlug: string;
  title: string;
  description: string;
  h1: string;
  keywords: string[];
  location?: LocationData;
}

/** "concrete-calculator" → "concrete" */
export function baseSlug(config: CalculatorConfig): string {
  return config.slug.replace(/-calculator$/, "");
}

/** "Concrete Calculator" → "Concrete" */
function baseName(config: CalculatorConfig): string {
  return config.name.replace(/\s*Calculator$/i, "");
}

function defaultKeywords(config: CalculatorConfig): string[] {
  const n = baseName(config).toLowerCase();
  return config.keywords ?? [`${n} calculator`, `${n} cost`, `how much ${n}`];
}

export function costSlug(config: CalculatorConfig) {
  return `${baseSlug(config)}-cost-calculator`;
}
export function guideSlug(config: CalculatorConfig) {
  return `${baseSlug(config)}-guide`;
}
export function howtoSlug(config: CalculatorConfig) {
  return `how-to-${config.howtoAction ?? baseSlug(config)}`;
}
export function locationSlug(config: CalculatorConfig, loc: LocationData) {
  return `${baseSlug(config)}-cost-${loc.slug}`;
}

/** Expand one calculator into its programmatic page descriptors. */
export function generatePages(config: CalculatorConfig): PageDescriptor[] {
  const name = baseName(config);
  const kw = defaultKeywords(config);
  const intents = config.intents ?? ["cost", "guide", "howto"];
  const pages: PageDescriptor[] = [];

  if (intents.includes("cost")) {
    pages.push({
      slug: costSlug(config),
      type: "cost",
      calculatorSlug: config.slug,
      title: `${name} Cost Calculator — 2026 Price Estimator | HomeCalcify`,
      description: `Estimate ${name.toLowerCase()} cost in 2026. Get a material and installed price range by size, plus a cost breakdown and money-saving tips.`,
      h1: `${name} Cost Calculator`,
      keywords: [`${name.toLowerCase()} cost`, `${name.toLowerCase()} price`, `${name.toLowerCase()} cost calculator`, ...kw],
    });
  }
  if (intents.includes("guide")) {
    pages.push({
      slug: guideSlug(config),
      type: "guide",
      calculatorSlug: config.slug,
      title: `${name} Guide: Materials, Cost & How to Estimate | HomeCalcify`,
      description: `The complete ${name.toLowerCase()} guide — how to measure, the formula, material options, cost ranges, and common mistakes to avoid.`,
      h1: `${name} Guide: Everything You Need to Estimate`,
      keywords: [`${name.toLowerCase()} guide`, `${name.toLowerCase()} estimating`, ...kw],
    });
  }
  if (intents.includes("howto")) {
    const action = (config.howtoAction ?? baseSlug(config)).replace(/-/g, " ");
    const actionTitle = action.replace(/\b\w/g, (c) => c.toUpperCase());
    pages.push({
      slug: howtoSlug(config),
      type: "howto",
      calculatorSlug: config.slug,
      title: `How to ${actionTitle}: Step-by-Step Guide | HomeCalcify`,
      description: `Learn how to ${action} step by step, with the tools, materials, and a free calculator to estimate exactly what you need.`,
      h1: `How to ${actionTitle}`,
      keywords: [`how to ${action}`, `${action} steps`, ...kw],
    });
  }

  for (const loc of config.locations ?? []) {
    pages.push({
      slug: locationSlug(config, loc),
      type: "location",
      calculatorSlug: config.slug,
      location: loc,
      title: `${name} Cost in ${loc.name} (2026 Prices) | HomeCalcify`,
      description: `${name} cost in ${loc.name}: local price ranges, what drives them, and a free calculator. Updated 2026 estimates for ${loc.name} homeowners.`,
      h1: `${name} Cost in ${loc.name}`,
      keywords: [`${name.toLowerCase()} cost ${loc.name.toLowerCase()}`, `${name.toLowerCase()} prices ${loc.name.toLowerCase()}`, ...kw],
    });
  }

  return pages;
}

/** The full programmatic registry (all clusters flattened). */
export const pageRegistry: PageDescriptor[] = calculators.flatMap(generatePages);

export const pageMap: Record<string, PageDescriptor> = Object.fromEntries(
  pageRegistry.map((p) => [p.slug, p]),
);

export function getPage(slug: string): PageDescriptor | undefined {
  return pageMap[slug];
}

/** All slugs the [slug] route must statically generate for programmatic pages. */
export function programmaticParams(): { slug: string }[] {
  return pageRegistry.map((p) => ({ slug: p.slug }));
}

// ── Internal linking engine ─────────────────────────────────────────

export interface ClusterLink {
  label: string;
  href: string;
  type: "main" | PageType;
}

/** The full cluster of links for a calculator (only pages that exist). */
export function clusterLinks(calculatorSlug: string): ClusterLink[] {
  const config = getCalculator(calculatorSlug);
  if (!config) return [];
  const links: ClusterLink[] = [
    { label: `${config.name}`, href: `/${config.slug}/`, type: "main" },
  ];
  const intents = config.intents ?? ["cost", "guide", "howto"];
  const name = baseName(config);
  if (intents.includes("cost"))
    links.push({ label: `${name} Cost Calculator`, href: `/${costSlug(config)}/`, type: "cost" });
  if (intents.includes("guide"))
    links.push({ label: `${name} Guide`, href: `/${guideSlug(config)}/`, type: "guide" });
  if (intents.includes("howto"))
    links.push({ label: `How to ${name}`, href: `/${howtoSlug(config)}/`, type: "howto" });
  return links;
}

/** Up to 3 related calculators: explicit relations first, then category siblings. */
export function relatedCalculatorSlugs(calculatorSlug: string, limit = 3): string[] {
  const config = getCalculator(calculatorSlug);
  if (!config) return [];
  const explicit = config.content.related ?? [];
  const siblings = calculators
    .filter((c) => c.category === config.category && c.slug !== config.slug)
    .map((c) => c.slug);
  return Array.from(new Set([...explicit, ...siblings])).slice(0, limit);
}

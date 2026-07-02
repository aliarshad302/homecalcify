import type { CalculatorConfig, CalculatorResult } from "@/lib/calculator/types";
import { toNumber } from "@/lib/calculator/engine";

/**
 * Exterior paint calculator. Distinct use case from the (room-based) paint
 * calculator: whole-house exterior wall area with lower coverage per gallon.
 * `intents: []` — one clean page, no thin auto-generated cost/guide pages.
 */
export const exteriorPaintCalculator: CalculatorConfig = {
  slug: "exterior-paint-calculator",
  name: "Exterior Paint Calculator",
  category: "painting",
  categoryLabel: "Painting",
  description:
    "Estimate how many gallons of exterior paint you need for your home's siding, including coats and openings.",
  supportsUnits: true,
  cpc: "medium",
  keywords: ["exterior paint calculator", "exterior paint", "how much exterior paint do i need", "house paint calculator"],
  intents: [],
  fields: [
    { id: "length", label: "House length", type: "number", unitLabel: { imperial: "ft", metric: "m" }, placeholder: "e.g. 40", min: 0, step: 0.1 },
    { id: "width", label: "House width", type: "number", unitLabel: { imperial: "ft", metric: "m" }, placeholder: "e.g. 30", min: 0, step: 0.1 },
    { id: "height", label: "Total wall height", type: "number", unitLabel: { imperial: "ft", metric: "m" }, defaultValue: 18, min: 0, step: 0.1, help: "All stories combined (e.g. 18 ft for 2 stories)." },
    { id: "coats", label: "Coats", type: "select", defaultValue: "2", options: [
      { label: "1 coat", value: "1" }, { label: "2 coats", value: "2" }, { label: "3 coats", value: "3" } ] },
    { id: "openings", label: "Doors & windows", type: "select", defaultValue: "8", options: [
      { label: "4", value: "4" }, { label: "6", value: "6" }, { label: "8", value: "8" }, { label: "10", value: "10" }, { label: "12+", value: "14" } ],
      help: "Each opening subtracts ~21 sq ft of wall." },
    { id: "price", label: "Price per gallon/liter", type: "number", unitLabel: { imperial: "$/gal", metric: "$/L" }, placeholder: "Optional", required: false },
  ],
  compute: ({ inputs, unit }) => {
    const length = toNumber(inputs.length);
    const width = toNumber(inputs.width);
    const height = toNumber(inputs.height);
    const coats = toNumber(inputs.coats);
    const openings = toNumber(inputs.openings);
    const price = toNumber(inputs.price);

    const openingArea = unit === "imperial" ? 21 : 2;
    const coveragePerUnit = unit === "imperial" ? 300 : 8.5; // exterior covers less than interior

    let wallArea = 2 * (length + width) * height - openings * openingArea;
    if (wallArea < 0) wallArea = 0;
    const paintArea = wallArea * coats;
    const amount = paintArea / coveragePerUnit;

    const results: CalculatorResult[] = [
      { id: "paint", label: "Exterior paint needed", value: amount, unit: unit === "imperial" ? "gal" : "L", precision: 1, primary: true, note: `${coats} coat${coats > 1 ? "s" : ""}` },
      { id: "area", label: "Wall area", value: wallArea, unit: unit === "imperial" ? "ft²" : "m²", precision: 0 },
    ];
    const RANGE = unit === "imperial" ? [35, 75] : [10, 20]; // exterior paint $/gal or $/L
    const qty = Math.ceil(amount);
    const hasUserPrice = Number.isFinite(price) && price > 0;
    results.push({
      id: "cost",
      label: "Estimated paint cost",
      value: qty * (hasUserPrice ? price : RANGE[0]),
      valueHigh: hasUserPrice ? undefined : qty * RANGE[1],
      format: "currency",
      precision: 0,
      highlight: true,
      note: hasUserPrice ? "Based on your price" : "Exterior-grade paint",
    });
    return results;
  },
  content: {
    answer:
      "To estimate exterior paint, find the wall area (perimeter × total height), subtract about 21 sq ft per door and window, multiply by the number of coats, and divide by 300 sq ft per gallon. A typical 40×30 ft two-story home needs about 14 gallons for two coats.",
    quickFacts: [
      { label: "Coverage per gallon", value: "~300 ft²" },
      { label: "Standard coats", value: "2" },
      { label: "Repaint every", value: "7–10 yrs" },
    ],
    formula: "Gallons = (Wall area − openings) × coats ÷ 300 sq ft per gallon",
    steps: [
      { title: "Measure the perimeter", detail: "Add all exterior wall lengths — 2 × (length + width) for a rectangular home." },
      { title: "Multiply by total height", detail: "Use the full height of all stories (e.g. ~18 ft for two stories)." },
      { title: "Subtract openings", detail: "Remove about 21 sq ft for each door and window." },
      { title: "Divide by coverage", detail: "Exterior paint covers ~300 sq ft per gallon per coat — less on rough surfaces." },
    ],
    example: "A 40×30 ft two-story home: perimeter 140 ft × 18 = 2,520 ft² − 168 (8 openings) = 2,352 ft² × 2 coats = 4,704 ÷ 300 ≈ 15.7 gallons.",
    tables: [
      {
        title: "Exterior paint needed by home size",
        caption: "Gallons for two coats, minus openings. Rough surfaces (stucco, brick) need more.",
        columns: ["Home size", "Approx. wall area", "Gallons (2 coats)"],
        rows: [
          ["1-story 1,200 ft²", "~1,100 ft²", "~7–8 gal"],
          ["2-story 1,800 ft²", "~2,300 ft²", "~14–16 gal"],
          ["2-story 2,500 ft²", "~2,900 ft²", "~18–20 gal"],
        ],
      },
    ],
    mistakes: [
      { title: "Skipping primer and prep", detail: "Bare wood, repairs, and big color changes need primer. Power-wash and scrape first or the paint won't last." },
      { title: "Underestimating rough surfaces", detail: "Stucco, brick, and rough wood drink paint — expect 20–40% less coverage than smooth siding." },
      { title: "Buying for one coat", detail: "Exterior work almost always needs two coats for even color and weather protection." },
      { title: "Forgetting trim and doors", detail: "Trim, fascia, and doors often use a different paint — budget for those separately." },
    ],
    faqs: [
      { question: "How much exterior paint do I need?", answer: "Calculate wall area (perimeter × height), subtract openings, multiply by coats, and divide by 300 sq ft per gallon." },
      { question: "How many gallons to paint a 2-story house?", answer: "A typical 1,800 sq ft two-story home needs about 14–16 gallons for two coats of exterior paint." },
      { question: "Why does exterior paint cover less than interior?", answer: "Exterior surfaces are rougher and more porous, and exterior paint is applied thicker for weather protection." },
      { question: "How long does exterior paint last?", answer: "7–10 years with quality paint and proper prep, less on sun-exposed or weathered walls." },
    ],
    related: ["paint-calculator", "siding-calculator"],
    guides: [
      { title: "Exterior Painting Cost", href: "/guides/exterior-painting-cost/" },
      { title: "How Many Coats of Paint Do You Need?", href: "/guides/how-many-coats-of-paint/" },
      { title: "Best Paint Finish for Walls", href: "/guides/best-paint-finish-for-walls/" },
    ],
  },
  seo: {
    title: "Exterior Paint Calculator — Gallons & Cost | HomeCalcify",
    description: "Free exterior paint calculator. Enter your home's size to get the gallons of exterior paint and cost for one, two, or three coats.",
  },
};

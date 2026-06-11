import type { CalculatorConfig, CalculatorResult } from "@/lib/calculator/types";
import { toNumber } from "@/lib/calculator/engine";

/**
 * Mulch calculator. Area × depth → volume.
 * Imperial: ft × ft area, depth in inches → cubic yards + 2 ft³ bags.
 * Metric:   m × m area,   depth in cm     → cubic meters.
 */
export const mulchCalculator: CalculatorConfig = {
  slug: "mulch-calculator",
  name: "Mulch Calculator",
  category: "landscaping",
  categoryLabel: "Landscaping",
  description:
    "Find how many cubic yards or bags of mulch you need to cover a garden bed at any depth.",
  supportsUnits: true,
  fields: [
    { id: "length", label: "Bed length", type: "number", unitLabel: { imperial: "ft", metric: "m" }, placeholder: "e.g. 20", min: 0, step: 0.1 },
    { id: "width", label: "Bed width", type: "number", unitLabel: { imperial: "ft", metric: "m" }, placeholder: "e.g. 4", min: 0, step: 0.1 },
    { id: "depth", label: "Mulch depth", type: "number", unitLabel: { imperial: "in", metric: "cm" }, defaultValue: 3, min: 0, step: 0.5, help: "2–3 in is typical for beds; 1 in for refresh." },
    { id: "price", label: "Price per unit", type: "number", unitLabel: { imperial: "$/yd³", metric: "$/m³" }, placeholder: "Optional", required: false },
  ],
  compute: ({ inputs, unit }) => {
    const length = toNumber(inputs.length);
    const width = toNumber(inputs.width);
    const depthRaw = toNumber(inputs.depth);
    const price = toNumber(inputs.price);

    const area = length * width; // ft² or m²
    const depth = unit === "imperial" ? depthRaw / 12 : depthRaw / 100; // → ft or m
    const volume = area * depth; // ft³ or m³

    const primaryUnit = unit === "imperial" ? "yd³" : "m³";
    const primaryValue = unit === "imperial" ? volume / 27 : volume;

    const results: CalculatorResult[] = [
      { id: "volume", label: "Mulch needed", value: primaryValue, unit: primaryUnit, precision: 2, primary: true },
      { id: "area", label: "Coverage area", value: area, unit: unit === "imperial" ? "ft²" : "m²", precision: 0 },
    ];

    if (unit === "imperial") {
      results.push({ id: "bags", label: "2 ft³ bags", value: Math.ceil(volume / 2), unit: "bags", precision: 0, note: "Standard bagged mulch" });
    }
    const RANGE = unit === "imperial" ? [30, 50] : [39, 65]; // $/yd³ or $/m³, bulk
    const hasUserPrice = Number.isFinite(price) && price > 0;
    results.push({
      id: "cost",
      label: "Estimated mulch cost",
      value: primaryValue * (hasUserPrice ? price : RANGE[0]),
      valueHigh: hasUserPrice ? undefined : primaryValue * RANGE[1],
      format: "currency",
      precision: 0,
      highlight: true,
      note: hasUserPrice ? "Based on your price" : "Bulk mulch — bagged costs more",
    });
    return results;
  },
  content: {
    answer:
      "To calculate mulch, multiply the bed length by width to get the area, then by depth in feet, and divide by 27 for cubic yards. A 20×4 ft bed at 3 inches deep needs about 0.74 cubic yards (roughly 10 bags), costing about $22–$37 in bulk mulch.",
    quickFacts: [
      { label: "Ideal depth", value: "2–3 in" },
      { label: "1 yd³ at 3 in", value: "108 ft²" },
      { label: "Bag size", value: "2 ft³" },
    ],
    formula: "Mulch (yd³) = (Length ft × Width ft × Depth ft) ÷ 27",
    steps: [
      { title: "Measure the bed", detail: "Record length and width in feet." },
      { title: "Choose a depth", detail: "Convert inches to feet (3 in = 0.25 ft)." },
      { title: "Find the volume", detail: "Multiply area × depth for cubic feet." },
      { title: "Convert to yards", detail: "Divide cubic feet by 27, or by 13.5 for 2 ft³ bags." },
    ],
    example: "A 20 ft × 4 ft bed at 3 in deep: 80 ft² × 0.25 ft = 20 ft³ ÷ 27 ≈ 0.74 yd³ (≈ 10 bags).",
    tables: [
      {
        title: "Mulch coverage by depth",
        caption: "Area that one cubic yard of mulch covers at different depths.",
        columns: ["Depth", "Coverage per yd³", "Bags (2 ft³) per yd³"],
        rows: [
          ["1 inch", "324 ft²", "~13.5"],
          ["2 inches", "162 ft²", "~13.5"],
          ["3 inches", "108 ft²", "~13.5"],
          ["4 inches", "81 ft²", "~13.5"],
        ],
      },
    ],
    mistakes: [
      { title: "Mulching too deep", detail: "More than 3–4 inches suffocates roots and holds excess moisture. Two to three inches is the sweet spot." },
      { title: "Piling mulch against stems", detail: "\"Mulch volcanoes\" around trunks invite rot and pests. Keep mulch a few inches clear of stems and trunks." },
      { title: "Ignoring existing mulch", detail: "If a bed already has mulch, you usually only need a 1-inch refresh — measure for the top-up, not the full depth." },
      { title: "Buying bags for big beds", detail: "For large areas, bulk mulch by the cubic yard is far cheaper than bagged. Compare price per cubic foot." },
    ],
    faqs: [
      { question: "How many bags of mulch are in a cubic yard?", answer: "A cubic yard equals 27 cubic feet, so it takes about 13.5 standard 2 cubic-foot bags to make one yard." },
      { question: "How deep should mulch be?", answer: "2–3 inches suppresses weeds and retains moisture. Avoid piling mulch against stems or trunks." },
      { question: "How much area does a yard of mulch cover?", answer: "One cubic yard covers about 108 sq ft at 3 inches deep, or 162 sq ft at 2 inches." },
    ],
    related: ["concrete-calculator", "flooring-calculator"],
    guides: [{ title: "How Much Mulch Do I Need?", href: "/guides/how-much-mulch-do-i-need/" }],
  },
  seo: {
    title: "Mulch Calculator — Cubic Yards & Bags | HomeCalcify",
    description: "Free mulch calculator. Enter bed size and depth to get cubic yards, bags, and cost. Imperial & metric.",
  },
};

import type { CalculatorConfig, CalculatorResult } from "@/lib/calculator/types";
import { toNumber } from "@/lib/calculator/engine";

/**
 * Gravel calculator (imperial). Area × depth → cubic yards and tons.
 * Gravel weighs roughly 1.4 tons per cubic yard.
 */
export const gravelCalculator: CalculatorConfig = {
  slug: "gravel-calculator",
  name: "Gravel Calculator",
  category: "driveway-paving",
  categoryLabel: "Driveway & Paving",
  description:
    "Calculate cubic yards and tons of gravel for a driveway, path, or drainage project at any depth.",
  supportsUnits: false,
  cpc: "medium",
  keywords: ["gravel calculator", "gravel cost", "how much gravel do i need", "gravel driveway cost", "crushed stone calculator"],
  howtoAction: "lay-a-gravel-driveway",
  howto: {
    tools: ["Tape measure", "Wheelbarrow", "Rake", "Plate compactor", "Landscape fabric"],
    materials: ["Crushed stone base (#3)", "Top gravel (#57 or crusher run)", "Geotextile fabric", "Edging"],
  },
  fields: [
    { id: "length", label: "Length", type: "number", unitLabel: { imperial: "ft" }, placeholder: "e.g. 40", min: 0, step: 0.1 },
    { id: "width", label: "Width", type: "number", unitLabel: { imperial: "ft" }, placeholder: "e.g. 10", min: 0, step: 0.1 },
    { id: "depth", label: "Depth", type: "number", unitLabel: { imperial: "in" }, defaultValue: 4, min: 0, step: 0.5, help: "4 in for paths, 6–8 in for driveways." },
    { id: "price", label: "Price per ton", type: "number", unitLabel: { imperial: "$/ton" }, placeholder: "Optional", required: false },
  ],
  compute: ({ inputs }) => {
    const length = toNumber(inputs.length);
    const width = toNumber(inputs.width);
    const depth = toNumber(inputs.depth) / 12;
    const price = toNumber(inputs.price);

    const volumeFt3 = length * width * depth;
    const yards = volumeFt3 / 27;
    const tons = yards * 1.4; // crushed gravel ≈ 1.4 tons/yd³

    const results: CalculatorResult[] = [
      { id: "yards", label: "Gravel needed", value: yards, unit: "yd³", precision: 2, primary: true },
      { id: "tons", label: "Weight", value: tons, unit: "tons", precision: 2 },
      { id: "area", label: "Coverage area", value: length * width, unit: "ft²", precision: 0 },
    ];
    const RANGE = [30, 60]; // $/ton delivered
    const hasUserPrice = Number.isFinite(price) && price > 0;
    results.push({
      id: "cost",
      label: "Estimated cost",
      value: tons * (hasUserPrice ? price : RANGE[0]),
      valueHigh: hasUserPrice ? undefined : tons * RANGE[1],
      format: "currency",
      precision: 0,
      highlight: true,
      note: hasUserPrice ? "Based on your price" : "Delivered gravel — excludes spreading",
    });
    return results;
  },
  content: {
    answer:
      "To find how much gravel you need, multiply length × width × depth (in feet) for cubic feet, divide by 27 for cubic yards, then multiply by about 1.4 for tons. A 40×10 ft driveway at 4 inches deep needs about 4.9 cubic yards (≈ 6.9 tons), costing roughly $210–$415 delivered.",
    quickFacts: [
      { label: "1 yd³ gravel", value: "≈ 1.4 tons" },
      { label: "Driveway depth", value: "4–8 in" },
      { label: "1 ton at 2 in", value: "~100 ft²" },
    ],
    formula: "Tons = (Length × Width × Depth ft) ÷ 27 × 1.4",
    steps: [
      { title: "Measure the area", detail: "Record length and width in feet." },
      { title: "Choose a depth", detail: "4 in for footpaths, 6–8 in for a gravel driveway over a base." },
      { title: "Find the volume", detail: "Multiply area × depth, divide by 27 for cubic yards." },
      { title: "Convert to tons", detail: "Multiply cubic yards by about 1.4 for delivery weight." },
    ],
    example: "A 40 ft × 10 ft driveway at 4 in: 400 ft² × 0.333 = 133 ft³ ÷ 27 ≈ 4.9 yd³ × 1.4 ≈ 6.9 tons.",
    tables: [
      {
        title: "Gravel coverage by depth",
        caption: "Area one ton of gravel covers at each depth.",
        columns: ["Depth", "Coverage per ton", "Tons per 100 ft²"],
        rows: [["2 in", "~100 ft²", "~1.0"], ["3 in", "~67 ft²", "~1.5"], ["4 in", "~50 ft²", "~2.0"], ["6 in", "~33 ft²", "~3.0"]],
      },
    ],
    mistakes: [
      { title: "Skipping the base layer", detail: "A gravel driveway needs a coarse base (#3) under the top layer (#57). Skipping it leads to ruts and sinking." },
      { title: "Going too shallow", detail: "Driveways need 6–8 inches total over a stable base. Less than that won't hold up to vehicle weight." },
      { title: "Forgetting fabric", detail: "Landscape fabric under the gravel stops it mixing into the soil and reduces weeds." },
      { title: "Not compacting", detail: "Compact each layer with a plate compactor — loose gravel migrates and washes away." },
    ],
    faqs: [
      { question: "How many tons of gravel do I need?", answer: "Multiply area × depth in feet, divide by 27 for cubic yards, then multiply by ~1.4 for tons." },
      { question: "How deep should a gravel driveway be?", answer: "6–8 inches total — a 3–4 inch coarse base topped with 3–4 inches of finer gravel." },
      { question: "Is gravel cheaper than asphalt?", answer: "Yes, gravel has the lowest up-front cost of any driveway, but it needs periodic regrading and topping up." },
    ],
    related: ["asphalt-calculator", "concrete-calculator"],
    guides: [],
  },
  seo: {
    title: "Gravel Calculator — Cubic Yards, Tons & Cost | HomeCalcify",
    description: "Free gravel calculator. Enter area and depth to get cubic yards, tons, and delivered cost for driveways and paths.",
  },
};

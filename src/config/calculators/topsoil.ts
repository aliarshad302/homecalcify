import type { CalculatorConfig, CalculatorResult } from "@/lib/calculator/types";
import { toNumber } from "@/lib/calculator/engine";

/** Topsoil calculator. Area × depth → cubic yards, bags, and cost. */
export const topsoilCalculator: CalculatorConfig = {
  slug: "topsoil-calculator",
  name: "Topsoil Calculator",
  category: "landscaping",
  categoryLabel: "Landscaping",
  description:
    "Find how many cubic yards or bags of topsoil you need to fill a bed, level a lawn, or top-dress at any depth.",
  supportsUnits: true,
  cpc: "medium",
  keywords: ["topsoil calculator", "topsoil cost", "how much topsoil do i need", "cubic yards of topsoil"],
  intents: [],
  fields: [
    { id: "length", label: "Area length", type: "number", unitLabel: { imperial: "ft", metric: "m" }, placeholder: "e.g. 20", min: 0, step: 0.1 },
    { id: "width", label: "Area width", type: "number", unitLabel: { imperial: "ft", metric: "m" }, placeholder: "e.g. 10", min: 0, step: 0.1 },
    { id: "depth", label: "Depth", type: "number", unitLabel: { imperial: "in", metric: "cm" }, defaultValue: 3, min: 0, step: 0.5, help: "2–3 in to top-dress, 4–6 in for new beds." },
    { id: "price", label: "Price per unit", type: "number", unitLabel: { imperial: "$/yd³", metric: "$/m³" }, placeholder: "Optional", required: false },
  ],
  compute: ({ inputs, unit }) => {
    const length = toNumber(inputs.length);
    const width = toNumber(inputs.width);
    const depthRaw = toNumber(inputs.depth);
    const price = toNumber(inputs.price);

    const area = length * width;
    const depth = unit === "imperial" ? depthRaw / 12 : depthRaw / 100;
    const volume = area * depth;
    const primaryUnit = unit === "imperial" ? "yd³" : "m³";
    const primaryValue = unit === "imperial" ? volume / 27 : volume;

    const results: CalculatorResult[] = [
      { id: "volume", label: "Topsoil needed", value: primaryValue, unit: primaryUnit, precision: 2, primary: true },
      { id: "area", label: "Coverage area", value: area, unit: unit === "imperial" ? "ft²" : "m²", precision: 0 },
    ];
    if (unit === "imperial") results.push({ id: "bags", label: "40 lb bags", value: Math.ceil(volume / 0.75), unit: "bags", precision: 0, note: "~0.75 ft³ each" });
    const RANGE = unit === "imperial" ? [20, 45] : [26, 59];
    const hasUserPrice = Number.isFinite(price) && price > 0;
    results.push({ id: "cost", label: "Estimated cost", value: primaryValue * (hasUserPrice ? price : RANGE[0]), valueHigh: hasUserPrice ? undefined : primaryValue * RANGE[1], format: "currency", precision: 0, highlight: true, note: hasUserPrice ? "Based on your price" : "Bulk topsoil delivered" });
    return results;
  },
  content: {
    answer:
      "To calculate topsoil, multiply the area length by width, then by depth in feet, and divide by 27 for cubic yards. A 20×10 ft bed at 3 inches deep needs about 1.85 cubic yards, or roughly 67 bags of 40-lb topsoil.",
    quickFacts: [
      { label: "New beds", value: "4–6 in deep" },
      { label: "Top-dressing", value: "¼–½ in" },
      { label: "1 yd³ covers", value: "~108 ft² at 3 in" },
    ],
    formula: "Topsoil (yd³) = (Length ft × Width ft × Depth ft) ÷ 27",
    steps: [
      { title: "Measure the area", detail: "Record length and width in feet." },
      { title: "Choose a depth", detail: "2–3 in to improve a bed, 4–6 in to build a new one, ¼–½ in to top-dress a lawn." },
      { title: "Find the volume", detail: "Multiply area × depth, then divide by 27 for cubic yards." },
      { title: "Convert to bags", detail: "One cubic yard is about 36 bags of 0.75 ft³ (40 lb) topsoil." },
    ],
    example: "A 20 ft × 10 ft bed at 3 in: 200 ft² × 0.25 ft = 50 ft³ ÷ 27 ≈ 1.85 yd³.",
    tables: [
      { title: "Topsoil coverage by depth", caption: "Area one cubic yard of topsoil covers.", columns: ["Depth", "Coverage per yd³"], rows: [["1 in", "324 ft²"], ["2 in", "162 ft²"], ["3 in", "108 ft²"], ["6 in", "54 ft²"]] },
    ],
    mistakes: [
      { title: "Buying bags for big areas", detail: "Above ~2 cubic yards, bulk delivered topsoil is far cheaper than bagged." },
      { title: "Ignoring settling", detail: "Loose topsoil settles 10–20%. Add a little extra, especially in new beds." },
      { title: "Wrong depth for the job", detail: "Top-dressing a lawn needs only ¼–½ inch; piling it deeper smothers grass." },
    ],
    faqs: [
      { question: "How much topsoil do I need?", answer: "Multiply length × width × depth in feet and divide by 27 for cubic yards." },
      { question: "How many bags of topsoil in a cubic yard?", answer: "About 36 bags of 0.75 ft³ (40 lb) topsoil equal one cubic yard." },
      { question: "How deep should topsoil be for a garden?", answer: "4–6 inches for new planting beds; 2–3 inches to improve existing soil." },
    ],
    related: ["mulch-calculator", "sod-calculator"],
    guides: [{ title: "How Much Mulch Do I Need?", href: "/guides/how-much-mulch-do-i-need/" }],
  },
  seo: {
    title: "Topsoil Calculator — Cubic Yards, Bags & Cost | HomeCalcify",
    description: "Free topsoil calculator. Enter area and depth to get cubic yards, bags, and delivered cost for beds and lawns.",
  },
};

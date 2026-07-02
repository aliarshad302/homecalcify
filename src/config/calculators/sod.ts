import type { CalculatorConfig, CalculatorResult } from "@/lib/calculator/types";
import { toNumber } from "@/lib/calculator/engine";

/** Sod calculator. Area + waste → square footage, pieces, pallets, and cost. */
export const sodCalculator: CalculatorConfig = {
  slug: "sod-calculator",
  name: "Sod Calculator",
  category: "landscaping",
  categoryLabel: "Landscaping",
  description:
    "Calculate how much sod you need — square footage, pieces, and pallets — to lay a new lawn, with a waste allowance.",
  supportsUnits: false,
  cpc: "medium",
  keywords: ["sod calculator", "sod cost", "how much sod do i need", "how many pallets of sod"],
  intents: [],
  fields: [
    { id: "length", label: "Lawn length", type: "number", unitLabel: { imperial: "ft" }, placeholder: "e.g. 40", min: 0, step: 0.1 },
    { id: "width", label: "Lawn width", type: "number", unitLabel: { imperial: "ft" }, placeholder: "e.g. 25", min: 0, step: 0.1 },
    { id: "waste", label: "Waste allowance", type: "select", defaultValue: "5", options: [
      { label: "Square lawn (5%)", value: "5" }, { label: "Curves / obstacles (10%)", value: "10" } ] },
    { id: "price", label: "Price per ft²", type: "number", unitLabel: { imperial: "$/ft²" }, placeholder: "Optional", required: false },
  ],
  compute: ({ inputs }) => {
    const length = toNumber(inputs.length);
    const width = toNumber(inputs.width);
    const wasteFactor = 1 + toNumber(inputs.waste) / 100;
    const price = toNumber(inputs.price);

    const area = length * width * wasteFactor;
    const results: CalculatorResult[] = [
      { id: "area", label: "Sod needed", value: area, unit: "ft²", precision: 0, primary: true, note: `Includes ${toNumber(inputs.waste)}% waste` },
      { id: "pieces", label: "Sod pieces", value: Math.ceil(area / 2.66), unit: "pieces", precision: 0, note: "16×24 in slabs (2.66 ft²)" },
      { id: "pallets", label: "Pallets", value: Math.ceil(area / 450), unit: "pallets", precision: 0, note: "~450 ft² per pallet" },
    ];
    const RANGE = [0.35, 0.85];
    const hasUserPrice = Number.isFinite(price) && price > 0;
    results.push({ id: "cost", label: "Estimated sod cost", value: area * (hasUserPrice ? price : RANGE[0]), valueHigh: hasUserPrice ? undefined : area * RANGE[1], format: "currency", precision: 0, highlight: true, note: hasUserPrice ? "Based on your price" : "Sod material only" });
    return results;
  },
  content: {
    answer:
      "To calculate sod, multiply your lawn length by width for the square footage, then add 5–10% for waste and cuts. Divide by the piece size (about 2.66 sq ft) or by ~450 sq ft per pallet. A 40×25 ft lawn needs about 1,050 sq ft of sod — roughly 3 pallets.",
    quickFacts: [
      { label: "1 pallet covers", value: "~450 ft²" },
      { label: "Slab size", value: "16×24 in (2.66 ft²)" },
      { label: "Waste to add", value: "5–10%" },
    ],
    formula: "Sod (ft²) = Length × Width × (1 + waste %); Pallets = area ÷ 450",
    steps: [
      { title: "Measure the lawn", detail: "Multiply length × width. Split irregular yards into rectangles and add them." },
      { title: "Add waste", detail: "5% for square lawns, 10% for curves, slopes, and obstacles." },
      { title: "Convert to pieces or pallets", detail: "Divide by 2.66 ft² for pieces, or by ~450 ft² for pallets." },
      { title: "Order fresh", detail: "Sod is perishable — order to arrive the day you install, and lay it within 24 hours." },
    ],
    example: "A 40 ft × 25 ft lawn: 1,000 ft² × 1.05 = 1,050 ft² ≈ 395 pieces or 3 pallets.",
    tables: [
      { title: "Sod cost by lawn size", caption: "Material only, at $0.35–$0.85 per sq ft.", columns: ["Lawn size", "Area", "Sod cost"], rows: [["20×20 ft", "400 ft²", "$140 – $340"], ["40×25 ft", "1,000 ft²", "$350 – $850"], ["50×50 ft", "2,500 ft²", "$875 – $2,125"]] },
    ],
    mistakes: [
      { title: "Ordering too early", detail: "Sod dries out fast. Time delivery for install day and keep it shaded and moist until laid." },
      { title: "Skipping soil prep", detail: "Sod needs loose, graded, raked soil — ideally with a topsoil layer — to root well." },
      { title: "Forgetting the waste factor", detail: "Cuts around beds, walks, and curves waste sod. Add 5–10%." },
    ],
    faqs: [
      { question: "How much sod do I need?", answer: "Multiply lawn length × width, add 5–10% for waste, then divide by ~450 sq ft per pallet." },
      { question: "How many square feet in a pallet of sod?", answer: "Most pallets cover about 450 square feet, though this varies by supplier." },
      { question: "How much does sod cost?", answer: "About $0.35–$0.85 per square foot for the sod itself, plus delivery and any install labor." },
    ],
    related: ["topsoil-calculator", "mulch-calculator"],
    guides: [],
  },
  seo: {
    title: "Sod Calculator — Square Feet, Pallets & Cost | HomeCalcify",
    description: "Free sod calculator. Enter your lawn size to get square footage, pieces, pallets, and cost with a waste allowance.",
  },
};

import type { CalculatorConfig, CalculatorResult } from "@/lib/calculator/types";
import { toNumber } from "@/lib/calculator/engine";

/**
 * Roofing calculator (imperial). Footprint × pitch multiplier → roof area,
 * squares (100 ft²), and shingle bundles (3 per square).
 */
export const roofingCalculator: CalculatorConfig = {
  slug: "roofing-calculator",
  name: "Roofing Calculator",
  category: "roofing",
  categoryLabel: "Roofing",
  description:
    "Estimate roof area, squares, and shingle bundles from your home's footprint and roof pitch.",
  supportsUnits: false,
  fields: [
    { id: "length", label: "Footprint length", type: "number", unitLabel: { imperial: "ft" }, placeholder: "e.g. 40", min: 0, step: 0.1 },
    { id: "width", label: "Footprint width", type: "number", unitLabel: { imperial: "ft" }, placeholder: "e.g. 30", min: 0, step: 0.1 },
    { id: "pitch", label: "Roof pitch", type: "select", defaultValue: "1.118", options: [
      { label: "Flat / low (0–2:12)", value: "1.015" },
      { label: "4:12", value: "1.054" },
      { label: "6:12 (common)", value: "1.118" },
      { label: "8:12", value: "1.202" },
      { label: "10:12", value: "1.302" },
      { label: "12:12 (steep)", value: "1.414" } ],
      help: "Pitch is the rise in inches per 12 inches of run." },
    { id: "waste", label: "Waste allowance", type: "select", defaultValue: "10", options: [
      { label: "Simple roof (10%)", value: "10" }, { label: "Cut-up roof (15%)", value: "15" } ] },
    { id: "price", label: "Price per square", type: "number", unitLabel: { imperial: "$/sq" }, placeholder: "Optional", required: false },
  ],
  compute: ({ inputs }) => {
    const length = toNumber(inputs.length);
    const width = toNumber(inputs.width);
    const pitchMult = toNumber(inputs.pitch);
    const wasteFactor = 1 + toNumber(inputs.waste) / 100;
    const price = toNumber(inputs.price);

    const footprint = length * width;
    const roofArea = footprint * pitchMult * wasteFactor;
    const squares = roofArea / 100;
    const bundles = Math.ceil(squares * 3);

    const results: CalculatorResult[] = [
      { id: "squares", label: "Roofing squares", value: squares, unit: "sq", precision: 2, primary: true, note: `1 square = 100 ft², incl. ${toNumber(inputs.waste)}% waste` },
      { id: "area", label: "Roof area", value: roofArea, unit: "ft²", precision: 0 },
      { id: "bundles", label: "Shingle bundles", value: bundles, unit: "bundles", precision: 0, note: "3 bundles per square" },
    ];
    // Always show an installed-cost range; a user price overrides to one figure.
    const PRICE_LOW = 400; // $ per square, asphalt shingles installed (low)
    const PRICE_HIGH = 700; // $ per square (high)
    const hasUserPrice = Number.isFinite(price) && price > 0;
    results.push({
      id: "cost",
      label: "Estimated installed cost",
      value: squares * (hasUserPrice ? price : PRICE_LOW),
      valueHigh: hasUserPrice ? undefined : squares * PRICE_HIGH,
      format: "currency",
      precision: 0,
      highlight: true,
      note: hasUserPrice ? "Based on your price" : "Asphalt shingles · materials + labor",
    });
    return results;
  },
  content: {
    answer:
      "To estimate roofing, multiply your home's footprint (length × width) by a pitch factor, then divide by 100 to get squares. Add 10–15% for waste. Shingles come 3 bundles per square. A 40×30 ft home with a 6:12 roof needs about 14.8 squares and costs roughly $5,900–$10,300 installed.",
    quickFacts: [
      { label: "1 roofing square", value: "100 ft²" },
      { label: "Bundles per square", value: "3" },
      { label: "Typical waste", value: "10–15%" },
    ],
    formula: "Squares = Footprint × pitch factor × (1 + waste %) ÷ 100; Bundles = squares × 3",
    steps: [
      { title: "Measure the footprint", detail: "Use the building's length × width at ground level." },
      { title: "Apply the pitch factor", detail: "A steeper roof has more surface — e.g. 6:12 multiplies area by 1.118." },
      { title: "Convert to squares", detail: "Divide total roof area by 100. One square = 100 sq ft." },
      { title: "Add waste and bundles", detail: "Add 10–15%, then multiply squares by 3 for shingle bundles." },
    ],
    example: "A 40 ft × 30 ft home = 1,200 ft² footprint × 1.118 (6:12) × 1.10 waste ≈ 1,476 ft² = 14.8 squares ≈ 45 bundles.",
    tables: [
      {
        title: "Roofing material cost & lifespan",
        caption: "Installed cost per square (100 ft²), including materials and labor. Prices vary by region.",
        columns: ["Material", "Cost per square (installed)", "Lifespan", "Best for"],
        rows: [
          ["3-tab asphalt shingles", "$350 – $500", "15–20 yrs", "Budget re-roofs"],
          ["Architectural shingles", "$450 – $700", "25–30 yrs", "Most homes"],
          ["Metal roofing", "$800 – $1,400", "40–70 yrs", "Longevity, snow"],
          ["Wood shake", "$600 – $1,000", "25–30 yrs", "Premium look"],
          ["Slate / tile", "$1,000 – $2,000", "50–100 yrs", "High-end, fire zones"],
        ],
      },
      {
        title: "Roof pitch reference",
        caption: "Pitch is the vertical rise in inches per 12 inches of horizontal run.",
        columns: ["Pitch", "Area multiplier", "Description"],
        rows: [
          ["0–2:12", "1.02", "Flat / low slope"],
          ["4:12", "1.054", "Walkable, gentle"],
          ["6:12", "1.118", "Most common"],
          ["8:12", "1.202", "Steep, hard to walk"],
          ["12:12", "1.414", "Very steep (45°)"],
        ],
      },
    ],
    mistakes: [
      { title: "Ignoring roof pitch", detail: "Using the footprint alone underestimates a sloped roof's true surface area. Always apply a pitch multiplier." },
      { title: "Skipping the waste factor", detail: "Hips, valleys, and starter/ridge courses create offcuts. Add 10% for simple roofs and 15% for cut-up roofs." },
      { title: "Forgetting accessories", detail: "Underlayment, drip edge, ridge cap, and flashing aren't counted in shingle bundles — budget for them separately." },
      { title: "Measuring from the ground", detail: "Eaves and overhangs extend past the walls. Measure the actual roof plane, not the building's footprint, when you can." },
    ],
    faqs: [
      { question: "What is a roofing square?", answer: "A square is 100 square feet of roof surface — the standard unit roofers and shingle manufacturers use." },
      { question: "How many bundles of shingles per square?", answer: "Most architectural shingles come 3 bundles per square. Heavier designer shingles may need 4 or 5." },
      { question: "Why does roof pitch matter?", answer: "A steeper pitch increases the actual roof surface beyond the footprint, so more material is required." },
    ],
    related: ["concrete-calculator", "paint-calculator"],
    guides: [{ title: "How to Measure a Roof", href: "/guides/how-to-measure-a-roof/" }],
  },
  seo: {
    title: "Roofing Calculator — Squares & Shingle Bundles | HomeCalcify",
    description: "Free roofing calculator. Enter footprint and pitch to get roof area, squares, shingle bundles, and cost.",
  },
};

import type { CalculatorConfig, CalculatorResult } from "@/lib/calculator/types";
import { toNumber } from "@/lib/calculator/engine";

/**
 * Vinyl plank (LVP) flooring calculator. Targets the "vinyl plank flooring
 * calculator" query with LVP-specific defaults and content. `intents: []` keeps
 * it to one clean page (no thin auto-generated cost/guide pages).
 */
export const vinylPlankCalculator: CalculatorConfig = {
  slug: "vinyl-plank-flooring-calculator",
  name: "Vinyl Plank Flooring Calculator",
  category: "flooring",
  categoryLabel: "Flooring",
  description:
    "Calculate how much luxury vinyl plank (LVP) flooring you need — square footage, boxes, and installed cost with a waste allowance.",
  supportsUnits: true,
  cpc: "high",
  keywords: ["vinyl plank flooring calculator", "lvp calculator", "vinyl plank cost", "how much vinyl plank flooring do i need"],
  intents: [],
  fields: [
    { id: "length", label: "Room length", type: "number", unitLabel: { imperial: "ft", metric: "m" }, placeholder: "e.g. 15", min: 0, step: 0.1 },
    { id: "width", label: "Room width", type: "number", unitLabel: { imperial: "ft", metric: "m" }, placeholder: "e.g. 12", min: 0, step: 0.1 },
    { id: "waste", label: "Waste allowance", type: "select", defaultValue: "10", options: [
      { label: "Straight lay (8%)", value: "8" }, { label: "Standard (10%)", value: "10" }, { label: "Diagonal / herringbone (15%)", value: "15" } ] },
    { id: "box", label: "Coverage per box", type: "number", unitLabel: { imperial: "ft²", metric: "m²" }, defaultValue: 20, min: 0.1, step: 0.1, help: "LVP boxes usually cover 18–24 ft²." },
    { id: "price", label: "Price per unit area", type: "number", unitLabel: { imperial: "$/ft²", metric: "$/m²" }, placeholder: "Optional", required: false },
  ],
  compute: ({ inputs, unit }) => {
    const length = toNumber(inputs.length);
    const width = toNumber(inputs.width);
    const wasteFactor = 1 + toNumber(inputs.waste) / 100;
    const box = toNumber(inputs.box) || 20;
    const price = toNumber(inputs.price);

    const totalArea = length * width * wasteFactor;
    const areaUnit = unit === "imperial" ? "ft²" : "m²";
    const RANGE = unit === "imperial" ? [3, 7] : [32, 75]; // installed $/ft² or $/m²
    const hasUserPrice = Number.isFinite(price) && price > 0;

    const results: CalculatorResult[] = [
      { id: "area", label: "Flooring needed", value: totalArea, unit: areaUnit, precision: 1, primary: true, note: `Includes ${toNumber(inputs.waste)}% waste` },
      { id: "boxes", label: "Boxes", value: Math.ceil(totalArea / box), unit: "boxes", precision: 0 },
      {
        id: "cost",
        label: "Estimated installed cost",
        value: totalArea * (hasUserPrice ? price : RANGE[0]),
        valueHigh: hasUserPrice ? undefined : totalArea * RANGE[1],
        format: "currency",
        precision: 0,
        highlight: true,
        note: hasUserPrice ? "Based on your price" : "LVP material + install",
      },
    ];
    return results;
  },
  content: {
    answer:
      "To find how much vinyl plank flooring you need, multiply the room length by width for the area, add 8–15% for waste and cuts, then divide by the box coverage (usually 18–24 sq ft). A 15×12 ft room needs about 198 sq ft of LVP with 10% waste — roughly 10 boxes, costing $600–$1,400 installed.",
    quickFacts: [
      { label: "Typical box", value: "18–24 ft²" },
      { label: "Waste to add", value: "8–15%" },
      { label: "Installed cost", value: "$3–$7 /ft²" },
    ],
    formula: "LVP (ft²) = Length × Width × (1 + waste %); Boxes = area ÷ coverage per box",
    steps: [
      { title: "Measure the room", detail: "Multiply length × width. Split L-shaped rooms into rectangles and add them." },
      { title: "Add a waste factor", detail: "8% for straight lay, 10% standard, 15% for diagonal or herringbone." },
      { title: "Divide by box coverage", detail: "Most LVP boxes cover 18–24 sq ft — check the carton." },
      { title: "Round up + keep a spare", detail: "Always round boxes up and keep one sealed for future repairs and dye-lot matching." },
    ],
    example: "A 15 ft × 12 ft room: 180 ft² × 1.10 = 198 ft². At 20 ft² per box that's 10 boxes.",
    tables: [
      {
        title: "Vinyl plank flooring cost",
        caption: "Installed cost per square foot by product tier.",
        columns: ["LVP tier", "Cost per ft² (installed)", "Notes"],
        rows: [
          ["Budget LVP", "$3 – $4", "Thinner wear layer"],
          ["Mid-range LVP", "$4 – $6", "Most popular, waterproof"],
          ["Premium / rigid core", "$6 – $9", "Thick wear layer, quiet"],
        ],
      },
    ],
    mistakes: [
      { title: "Skipping the waste allowance", detail: "Cuts at walls and around obstacles waste planks. Add 10% for straight lay and 15% for diagonal or herringbone." },
      { title: "Ignoring underlayment", detail: "Some LVP has attached padding; some needs separate underlayment. Check before you buy so you don't come up short on supplies." },
      { title: "Not acclimating the planks", detail: "LVP should sit in the room 24–48 hours before installing so it doesn't expand or contract after the fact." },
      { title: "Forgetting transitions and trim", detail: "T-molds, quarter round, and thresholds add to the order and aren't in the square footage." },
    ],
    faqs: [
      { question: "How much vinyl plank flooring do I need?", answer: "Multiply room length × width, add 8–15% for waste, then divide by the box coverage (usually 18–24 sq ft) and round up." },
      { question: "How many boxes of vinyl plank do I need?", answer: "Divide your total square footage (with waste) by the coverage printed on the box, then round up and keep a spare." },
      { question: "How much does vinyl plank flooring cost?", answer: "About $3–$7 per square foot installed, depending on the wear layer and whether it's rigid-core." },
      { question: "How much extra LVP should I buy?", answer: "Add 10% for straight installs and up to 15% for diagonal or herringbone layouts." },
    ],
    related: ["flooring-calculator", "tile-calculator"],
    guides: [
      { title: "Laminate vs Vinyl Plank Flooring", href: "/guides/laminate-vs-vinyl-plank-flooring/" },
      { title: "Flooring Installation Cost", href: "/guides/flooring-installation-cost/" },
      { title: "How to Measure a Room for Flooring", href: "/guides/how-to-measure-a-room-for-flooring/" },
    ],
  },
  seo: {
    title: "Vinyl Plank Flooring Calculator — Boxes & Cost | HomeCalcify",
    description: "Free vinyl plank (LVP) flooring calculator. Enter your room size to get square footage, boxes, and installed cost with a waste allowance.",
  },
};

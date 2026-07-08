import type { CalculatorConfig, CalculatorResult } from "@/lib/calculator/types";
import { toNumber } from "@/lib/calculator/engine";

/**
 * Flooring calculator. Room area + waste → square footage, boxes, and cost.
 * Works for laminate, hardwood, vinyl plank, and engineered floors.
 */
export const flooringCalculator: CalculatorConfig = {
  slug: "flooring-calculator",
  name: "Flooring Calculator",
  category: "flooring",
  categoryLabel: "Flooring",
  description:
    "Calculate the square footage, number of boxes, and cost of flooring for any room, with a waste allowance.",
  supportsUnits: true,
  cpc: "high",
  keywords: ["flooring calculator", "flooring cost", "how much flooring do i need", "laminate flooring cost", "flooring cost per square foot"],
  howtoAction: "install-flooring",
  fields: [
    { id: "length", label: "Room length", type: "number", unitLabel: { imperial: "ft", metric: "m" }, placeholder: "e.g. 15", min: 0, step: 0.1 },
    { id: "width", label: "Room width", type: "number", unitLabel: { imperial: "ft", metric: "m" }, placeholder: "e.g. 12", min: 0, step: 0.1 },
    { id: "waste", label: "Waste allowance", type: "select", defaultValue: "10", options: [
      { label: "Straight lay (5%)", value: "5" }, { label: "Standard (10%)", value: "10" }, { label: "Diagonal / pattern (15%)", value: "15" } ] },
    { id: "box", label: "Coverage per box", type: "number", unitLabel: { imperial: "ft²", metric: "m²" }, defaultValue: 20, min: 0.1, step: 0.1, help: "Check the flooring carton — often 18–24 ft²." },
    { id: "price", label: "Price per unit area", type: "number", unitLabel: { imperial: "$/ft²", metric: "$/m²" }, placeholder: "Optional", required: false },
  ],
  compute: ({ inputs, unit }) => {
    const length = toNumber(inputs.length);
    const width = toNumber(inputs.width);
    const wasteFactor = 1 + toNumber(inputs.waste) / 100;
    const box = toNumber(inputs.box);
    const price = toNumber(inputs.price);

    const baseArea = length * width;
    const totalArea = baseArea * wasteFactor;
    const areaUnit = unit === "imperial" ? "ft²" : "m²";

    const results: CalculatorResult[] = [
      { id: "area", label: "Flooring needed", value: totalArea, unit: areaUnit, precision: 1, primary: true, note: `Includes ${toNumber(inputs.waste)}% waste` },
      { id: "boxes", label: "Boxes", value: Math.ceil(totalArea / box), unit: "boxes", precision: 0 },
    ];
    const RANGE = unit === "imperial" ? [3, 10] : [32, 108]; // $/ft² or $/m², installed
    const hasUserPrice = Number.isFinite(price) && price > 0;
    results.push({
      id: "cost",
      label: "Estimated installed cost",
      value: totalArea * (hasUserPrice ? price : RANGE[0]),
      valueHigh: hasUserPrice ? undefined : totalArea * RANGE[1],
      format: "currency",
      precision: 0,
      highlight: true,
      note: hasUserPrice ? "Based on your price" : "Material + install — varies by type",
    });
    return results;
  },
  content: {
    answer:
      "To find how much flooring you need, use this square footage calculator for flooring: multiply the room length by width for the total square footage, then add 5–15% for waste and cuts. Divide by the coverage per box to get the number of boxes. A 15×12 ft room needs about 198 sq ft with 10% waste, costing roughly $600–$2,000 installed depending on material. It works for laminate, hardwood, and vinyl plank flooring.",
    quickFacts: [
      { label: "Standard waste", value: "10%" },
      { label: "Typical box", value: "~20 ft²" },
      { label: "Buy", value: "Full boxes" },
    ],
    formula: "Flooring (ft²) = Length × Width × (1 + waste %); Boxes = area ÷ coverage per box",
    steps: [
      { title: "Measure the room", detail: "Multiply length × width. Split L-shaped rooms into rectangles and add them." },
      { title: "Add a waste factor", detail: "5% for straight lay, 10% standard, 15% for diagonal or patterned layouts." },
      { title: "Divide by box coverage", detail: "Check the carton — most boxes cover 18–24 sq ft." },
      { title: "Round up", detail: "Always round boxes up and keep a spare for future repairs." },
    ],
    example: "A 15 ft × 12 ft room: 180 ft² × 1.10 = 198 ft². At 20 ft² per box that's 10 boxes.",
    tables: [
      {
        title: "Flooring cost by material",
        caption: "Installed cost per square foot, including materials and labor.",
        columns: ["Material", "Cost per ft² (installed)", "Lifespan", "Best for"],
        rows: [
          ["Laminate", "$2 – $6", "15–25 yrs", "Budget, DIY"],
          ["Luxury vinyl plank", "$3 – $7", "20–25 yrs", "Moisture-prone rooms"],
          ["Engineered wood", "$5 – $10", "25–30 yrs", "Wood look, stability"],
          ["Solid hardwood", "$6 – $15", "30–100 yrs", "Long-term value"],
        ],
      },
    ],
    mistakes: [
      { title: "Forgetting the waste factor", detail: "Cuts at walls and around obstacles waste material. Add 10% for straight lay and 15% for diagonal or herringbone." },
      { title: "Measuring an L-shaped room as one rectangle", detail: "Split irregular rooms into rectangles, calculate each, and add them before applying waste." },
      { title: "Not buying a spare box", detail: "Dye lots change between runs. Keep an extra box sealed for future repairs so it matches." },
      { title: "Ignoring underlayment and transitions", detail: "Underlayment, trim, and transition strips add to the budget and aren't in the flooring square footage." },
    ],
    faqs: [
      { question: "How much extra flooring should I buy?", answer: "Add 10% for standard installs and 15% for diagonal or herringbone patterns to cover cuts and mistakes." },
      { question: "How do I measure an irregular room?", answer: "Break it into rectangles, calculate each area separately, then add them together before applying waste." },
      { question: "How many boxes of flooring do I need?", answer: "Divide your total square footage (with waste) by the coverage printed on the box, then round up." },
      { question: "How do you calculate square feet for flooring?", answer: "Measure the length and width of the room in feet and multiply them for the flooring area. For L-shaped rooms, split them into rectangles, find each area, and add them. Then add 10% for waste to get the square footage to buy." },
      { question: "Can I use this as a vinyl plank flooring calculator?", answer: "Yes. Enter the room size and set the coverage per box from your carton — it works for vinyl plank, laminate, engineered, and hardwood flooring types." },
    ],
    related: ["vinyl-plank-flooring-calculator", "tile-calculator", "concrete-calculator"],
    guides: [
      { title: "Flooring Installation Cost", href: "/guides/flooring-installation-cost/" },
      { title: "How to Measure a Room for Flooring", href: "/guides/how-to-measure-a-room-for-flooring/" },
      { title: "Laminate vs Vinyl Plank Flooring", href: "/guides/laminate-vs-vinyl-plank-flooring/" },
      { title: "Hardwood Flooring Cost", href: "/guides/hardwood-flooring-cost/" },
    ],
  },
  seo: {
    title: "Flooring Calculator — Square Footage, Boxes & Cost | HomeCalcify",
    description: "Free flooring calculator for laminate, hardwood, and vinyl. Get square footage, boxes, and cost with a waste allowance.",
  },
};

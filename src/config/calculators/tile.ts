import type { CalculatorConfig, CalculatorResult } from "@/lib/calculator/types";
import { toNumber } from "@/lib/calculator/engine";

/**
 * Tile calculator (imperial). Floor/wall area ÷ tile area → tile count + waste.
 */
export const tileCalculator: CalculatorConfig = {
  slug: "tile-calculator",
  name: "Tile Calculator",
  category: "flooring",
  categoryLabel: "Flooring",
  description:
    "Work out how many tiles you need for a floor or wall, including a cutting allowance.",
  supportsUnits: false,
  cpc: "medium",
  keywords: ["tile calculator", "tile cost", "how many tiles do i need", "tile flooring cost", "tile cost per square foot"],
  howtoAction: "lay-tile",
  fields: [
    { id: "length", label: "Area length", type: "number", unitLabel: { imperial: "ft" }, placeholder: "e.g. 10", min: 0, step: 0.1 },
    { id: "width", label: "Area width", type: "number", unitLabel: { imperial: "ft" }, placeholder: "e.g. 8", min: 0, step: 0.1 },
    { id: "tileW", label: "Tile width", type: "number", unitLabel: { imperial: "in" }, defaultValue: 12, min: 0.1, step: 0.1 },
    { id: "tileH", label: "Tile height", type: "number", unitLabel: { imperial: "in" }, defaultValue: 12, min: 0.1, step: 0.1 },
    { id: "waste", label: "Waste allowance", type: "select", defaultValue: "10", options: [
      { label: "Straight (10%)", value: "10" }, { label: "Diagonal (15%)", value: "15" }, { label: "Complex pattern (20%)", value: "20" } ] },
    { id: "price", label: "Price per tile", type: "number", unitLabel: { imperial: "$" }, placeholder: "Optional", required: false },
  ],
  compute: ({ inputs }) => {
    const length = toNumber(inputs.length);
    const width = toNumber(inputs.width);
    const tileW = toNumber(inputs.tileW);
    const tileH = toNumber(inputs.tileH);
    const wasteFactor = 1 + toNumber(inputs.waste) / 100;
    const price = toNumber(inputs.price);

    const areaSqFt = length * width;
    const tileSqFt = (tileW * tileH) / 144; // in² → ft²
    const tiles = Math.ceil((areaSqFt / tileSqFt) * wasteFactor);

    const results: CalculatorResult[] = [
      { id: "tiles", label: "Tiles needed", value: tiles, unit: "tiles", precision: 0, primary: true, note: `Includes ${toNumber(inputs.waste)}% waste` },
      { id: "area", label: "Coverage area", value: areaSqFt, unit: "ft²", precision: 1 },
    ];
    const hasUserPrice = Number.isFinite(price) && price > 0;
    if (hasUserPrice) {
      results.push({
        id: "cost",
        label: "Estimated tile cost",
        value: tiles * price,
        format: "currency",
        precision: 0,
        highlight: true,
        note: "Based on your price per tile",
      });
    } else {
      results.push({
        id: "cost",
        label: "Estimated tile cost",
        value: areaSqFt * 2,
        valueHigh: areaSqFt * 15,
        format: "currency",
        precision: 0,
        highlight: true,
        note: "Material only · $2–$15 per ft²",
      });
    }
    return results;
  },
  content: {
    answer:
      "To calculate tiles, find the area in square feet (length × width), divide by the area of one tile, then add 10–20% for cuts and breakage. A 10×8 ft floor with 12-inch tiles needs about 88 tiles including 10% waste, costing roughly $160–$1,200 in tile.",
    quickFacts: [
      { label: "12×12 in tile", value: "1 ft²" },
      { label: "Typical waste", value: "10–20%" },
      { label: "Buy", value: "Full boxes" },
    ],
    formula: "Tiles = (Area ÷ tile area) × (1 + waste %), where tile area (ft²) = width in × height in ÷ 144",
    steps: [
      { title: "Measure the surface", detail: "Multiply length × width in feet for the total area." },
      { title: "Find one tile's area", detail: "Multiply tile width × height in inches, then divide by 144 for square feet." },
      { title: "Divide and add waste", detail: "Divide the surface area by the tile area, then add 10–20%." },
      { title: "Round up to full boxes", detail: "Buy by the box and keep spares for repairs and dye-lot matching." },
    ],
    example: "A 10 ft × 8 ft floor = 80 ft². A 12×12 in tile = 1 ft². 80 ÷ 1 = 80 × 1.10 ≈ 88 tiles.",
    tables: [
      {
        title: "Tiles per 100 sq ft by size",
        caption: "Tile counts before waste. Add 10–20% for cuts.",
        columns: ["Tile size", "Tile area", "Tiles per 100 ft²"],
        rows: [
          ["12 × 12 in", "1.00 ft²", "100"],
          ["18 × 18 in", "2.25 ft²", "~45"],
          ["24 × 24 in", "4.00 ft²", "25"],
          ["6 × 24 in (plank)", "1.00 ft²", "100"],
          ["4 × 12 in (subway)", "0.33 ft²", "~300"],
        ],
      },
    ],
    mistakes: [
      { title: "Skipping the waste allowance", detail: "Cuts at walls and breakage during install mean you need 10–20% extra. Buy it up front — dye lots change." },
      { title: "Subtracting grout lines", detail: "Grout lines barely change the count, and the waste factor covers it. Don't reduce your tile total for them." },
      { title: "Forgetting setting materials", detail: "Thinset, grout, spacers, and sealer aren't tiles but are essential — budget for them separately." },
      { title: "Not ordering a repair stock", detail: "Keep a few spare tiles from the same lot for future cracks and chips you can't re-match later." },
    ],
    faqs: [
      { question: "How much extra tile should I order?", answer: "Add 10% for straight layouts, 15% for diagonal, and up to 20% for intricate patterns or many cuts." },
      { question: "How many 12x12 tiles in a square foot?", answer: "Exactly one. A 12×12 inch tile covers one square foot, making the math simple." },
      { question: "Should I account for grout lines?", answer: "Grout lines slightly reduce tile count, but the waste allowance more than covers it — don't subtract them." },
    ],
    related: ["flooring-calculator", "paint-calculator"],
    guides: [{ title: "How Many Tiles Do I Need?", href: "/guides/how-many-tiles-do-i-need/" }],
  },
  seo: {
    title: "Tile Calculator — How Many Tiles Do I Need | HomeCalcify",
    description: "Free tile calculator. Enter area and tile size to get the exact number of tiles with a cutting allowance and cost.",
  },
};

import type { CalculatorConfig, CalculatorResult } from "@/lib/calculator/types";
import { toNumber } from "@/lib/calculator/engine";

/**
 * Paint calculator. Wall area − openings → gallons (or liters) by coats.
 * Imperial: ~350 sq ft per gallon. Metric: ~10 m² per liter.
 */
export const paintCalculator: CalculatorConfig = {
  slug: "paint-calculator",
  name: "Paint Calculator",
  category: "painting",
  categoryLabel: "Painting",
  description:
    "Estimate how many gallons or liters of paint you need for a room, including coats and openings.",
  supportsUnits: true,
  cpc: "medium",
  keywords: ["paint calculator", "paint cost", "how much paint do i need", "interior painting cost", "cost to paint a room"],
  howtoAction: "paint-a-room",
  fields: [
    { id: "length", label: "Room length", type: "number", unitLabel: { imperial: "ft", metric: "m" }, placeholder: "e.g. 12", min: 0, step: 0.1 },
    { id: "width", label: "Room width", type: "number", unitLabel: { imperial: "ft", metric: "m" }, placeholder: "e.g. 12", min: 0, step: 0.1 },
    { id: "height", label: "Ceiling height", type: "number", unitLabel: { imperial: "ft", metric: "m" }, defaultValue: 8, min: 0, step: 0.1 },
    { id: "coats", label: "Coats", type: "select", defaultValue: "2", options: [
      { label: "1 coat", value: "1" }, { label: "2 coats", value: "2" }, { label: "3 coats", value: "3" } ] },
    { id: "openings", label: "Doors & windows", type: "select", defaultValue: "2", options: [
      { label: "0", value: "0" }, { label: "1", value: "1" }, { label: "2", value: "2" }, { label: "3", value: "3" }, { label: "4", value: "4" }, { label: "5+", value: "6" } ],
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

    const openingArea = unit === "imperial" ? 21 : 2; // sq ft or m² per opening
    const coveragePerUnit = unit === "imperial" ? 350 : 10; // sq ft/gal or m²/L

    let wallArea = 2 * (length + width) * height - openings * openingArea;
    if (wallArea < 0) wallArea = 0;
    const paintArea = wallArea * coats;
    const amount = paintArea / coveragePerUnit;

    const results: CalculatorResult[] = [
      { id: "paint", label: "Paint needed", value: amount, unit: unit === "imperial" ? "gal" : "L", precision: 2, primary: true, note: `${coats} coat${coats > 1 ? "s" : ""}` },
      { id: "area", label: "Wall area", value: wallArea, unit: unit === "imperial" ? "ft²" : "m²", precision: 0 },
    ];
    if (unit === "imperial") {
      results.push({ id: "cans", label: "1-gal cans", value: Math.ceil(amount), unit: "cans", precision: 0 });
    }
    const RANGE = unit === "imperial" ? [25, 60] : [7, 16]; // $/gallon or $/liter
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
      note: hasUserPrice ? "Based on your price" : "Mid-grade interior paint",
    });
    return results;
  },
  content: {
    answer:
      "To estimate paint, find the wall area (perimeter × height), subtract about 21 sq ft per door or window, multiply by the number of coats, and divide by 350 (sq ft per gallon). A 12×12 ft room with 8 ft walls needs about 2 gallons for two coats, costing roughly $50–$120.",
    quickFacts: [
      { label: "Coverage per gallon", value: "~350 ft²" },
      { label: "Standard coats", value: "2" },
      { label: "Per door/window", value: "~21 ft²" },
    ],
    formula: "Gallons = (Wall area − openings) × coats ÷ 350 sq ft per gallon",
    steps: [
      { title: "Measure the walls", detail: "Add all wall lengths (perimeter) and multiply by ceiling height." },
      { title: "Subtract openings", detail: "Remove ~21 sq ft for each standard door or window." },
      { title: "Multiply by coats", detail: "Most jobs need two coats for even coverage." },
      { title: "Divide by coverage", detail: "One gallon covers roughly 350 sq ft per coat." },
    ],
    example: "A 12×12 ft room, 8 ft walls, 2 openings: perimeter 48 ft × 8 = 384 ft² − 42 = 342 ft² × 2 coats = 684 ÷ 350 ≈ 1.95 gallons.",
    tables: [
      {
        title: "Paint needed by room size",
        caption: "Gallons for two coats on a room with 8 ft walls, minus two openings.",
        columns: ["Room size", "Wall area", "Gallons (2 coats)", "Paint cost"],
        rows: [
          ["10 × 10 ft", "~318 ft²", "~2 gal", "$50 – $120"],
          ["12 × 12 ft", "~342 ft²", "~2 gal", "$50 – $120"],
          ["15 × 15 ft", "~438 ft²", "~3 gal", "$75 – $180"],
          ["20 × 20 ft", "~598 ft²", "~4 gal", "$100 – $240"],
        ],
      },
    ],
    mistakes: [
      { title: "Buying for one coat", detail: "Most walls need two coats for even color. Estimate for two unless you're repainting the same color over a clean surface." },
      { title: "Not subtracting openings", detail: "Large windows and doors reduce the paintable area — but don't over-subtract small trim, or you'll come up short." },
      { title: "Ignoring surface texture", detail: "Textured, porous, or unprimed walls drink paint and cover less than 350 sq ft per gallon. Round up." },
      { title: "Skipping primer", detail: "Bare drywall and big color changes need primer — a separate product from your finish coats." },
    ],
    faqs: [
      { question: "How much does a gallon of paint cover?", answer: "About 350–400 sq ft per coat on smooth walls. Textured or porous surfaces cover less." },
      { question: "Do I need one coat or two?", answer: "Two coats is standard for durable, even color — especially over a different base color or fresh drywall." },
      { question: "Should I buy extra paint?", answer: "Yes, keep 5–10% extra for touch-ups and to ensure a consistent dye-lot match later." },
    ],
    related: ["drywall-calculator", "flooring-calculator"],
    guides: [{ title: "How Much Paint Do I Need?", href: "/guides/how-much-paint-do-i-need/" }],
  },
  seo: {
    title: "Paint Calculator — Gallons & Liters by Room | HomeCalcify",
    description: "Free paint calculator. Enter room size, coats, and openings to get gallons or liters and cost. Imperial & metric.",
  },
};

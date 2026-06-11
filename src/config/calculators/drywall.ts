import type { CalculatorConfig, CalculatorResult } from "@/lib/calculator/types";
import { toNumber } from "@/lib/calculator/engine";

/**
 * Drywall calculator (imperial). Wall + optional ceiling area → sheets,
 * joint compound, tape, and screws.
 */
export const drywallCalculator: CalculatorConfig = {
  slug: "drywall-calculator",
  name: "Drywall Calculator",
  category: "drywall",
  categoryLabel: "Drywall",
  description:
    "Estimate drywall sheets, joint compound, tape, and screws for a room from its dimensions.",
  supportsUnits: false,
  cpc: "medium",
  keywords: ["drywall calculator", "drywall cost", "how much drywall do i need", "sheetrock cost", "drywall installation cost"],
  howtoAction: "hang-drywall",
  fields: [
    { id: "length", label: "Room length", type: "number", unitLabel: { imperial: "ft" }, placeholder: "e.g. 14", min: 0, step: 0.1 },
    { id: "width", label: "Room width", type: "number", unitLabel: { imperial: "ft" }, placeholder: "e.g. 12", min: 0, step: 0.1 },
    { id: "height", label: "Wall height", type: "number", unitLabel: { imperial: "ft" }, defaultValue: 8, min: 0, step: 0.1 },
    { id: "ceiling", label: "Include ceiling?", type: "select", defaultValue: "yes", options: [
      { label: "Walls + ceiling", value: "yes" }, { label: "Walls only", value: "no" } ] },
    { id: "sheet", label: "Sheet size", type: "select", defaultValue: "32", options: [
      { label: "4 × 8 ft (32 ft²)", value: "32" }, { label: "4 × 10 ft (40 ft²)", value: "40" }, { label: "4 × 12 ft (48 ft²)", value: "48" } ] },
    { id: "waste", label: "Waste allowance", type: "select", defaultValue: "10", options: [
      { label: "Standard (10%)", value: "10" }, { label: "Extra (15%)", value: "15" } ] },
  ],
  compute: ({ inputs }) => {
    const length = toNumber(inputs.length);
    const width = toNumber(inputs.width);
    const height = toNumber(inputs.height);
    const sheetArea = toNumber(inputs.sheet);
    const wasteFactor = 1 + toNumber(inputs.waste) / 100;
    const includeCeiling = inputs.ceiling === "yes";

    const wallArea = 2 * (length + width) * height;
    const ceilingArea = includeCeiling ? length * width : 0;
    const totalArea = (wallArea + ceilingArea) * wasteFactor;

    const sheets = Math.ceil(totalArea / sheetArea);
    const compound = totalArea * 0.053; // lbs of all-purpose joint compound
    const tape = totalArea * 0.39; // linear feet of tape
    const screws = Math.ceil(totalArea * 1); // ~1 screw per sq ft

    const results: CalculatorResult[] = [
      { id: "sheets", label: "Drywall sheets", value: sheets, unit: "sheets", precision: 0, primary: true, note: `Incl. ${toNumber(inputs.waste)}% waste` },
      { id: "area", label: "Total area", value: totalArea, unit: "ft²", precision: 0 },
      { id: "compound", label: "Joint compound", value: compound, unit: "lb", precision: 0 },
      { id: "tape", label: "Joint tape", value: tape, unit: "ft", precision: 0 },
      { id: "screws", label: "Screws", value: screws, unit: "screws", precision: 0 },
      {
        id: "cost",
        label: "Estimated installed cost",
        value: totalArea * 1.5,
        valueHigh: totalArea * 3.5,
        format: "currency",
        precision: 0,
        highlight: true,
        note: "Hung & finished · materials + labor",
      },
    ];
    return results;
  },
  content: {
    answer:
      "To calculate drywall, find the total wall area (perimeter × height) plus the ceiling if covering it, add 10% for waste, and divide by the sheet size. A 14×12 ft room with 8 ft walls and a ceiling needs about 21 sheets of 4×8 drywall, costing roughly $880–$2,050 hung and finished.",
    quickFacts: [
      { label: "4×8 sheet", value: "32 ft²" },
      { label: "Compound", value: "~0.05 lb/ft²" },
      { label: "Screws", value: "~1 per ft²" },
    ],
    formula: "Sheets = (Wall area + ceiling area) × (1 + waste %) ÷ sheet area",
    steps: [
      { title: "Calculate wall area", detail: "Add all wall lengths (perimeter) and multiply by the wall height." },
      { title: "Add the ceiling", detail: "If drywalling the ceiling, add length × width." },
      { title: "Add 10% waste", detail: "Account for cuts around windows, doors, and outlets." },
      { title: "Divide by sheet size", detail: "A 4×8 sheet covers 32 ft²; larger sheets mean fewer seams." },
    ],
    example: "A 14×12 ft room, 8 ft walls + ceiling: walls 2×(14+12)×8 = 416 ft² + ceiling 168 ft² = 584 × 1.10 ≈ 642 ÷ 32 ≈ 21 sheets.",
    tables: [
      {
        title: "Drywall sheet size guide",
        caption: "Larger sheets mean fewer seams to tape and finish, but are heavier to handle.",
        columns: ["Sheet size", "Coverage", "Best for"],
        rows: [
          ["4 × 8 ft", "32 ft²", "Tight spaces, DIY"],
          ["4 × 10 ft", "40 ft²", "Standard walls"],
          ["4 × 12 ft", "48 ft²", "Long walls, fewer seams"],
        ],
      },
    ],
    mistakes: [
      { title: "Forgetting the ceiling", detail: "If you're drywalling the ceiling too, add its area (length × width) — it's easy to leave out and come up short." },
      { title: "No waste allowance", detail: "Cutouts for windows, doors, and outlets create scrap. Add at least 10% so you're not short a sheet." },
      { title: "Underestimating finishing supplies", detail: "Joint compound, tape, and screws add up. Budget about one 5-gallon bucket of mud per 12 sheets." },
      { title: "Choosing the wrong thickness", detail: "Use 5/8 inch for ceilings and fire-rated walls; 1/2 inch is standard elsewhere. Moisture-prone areas need water-resistant board." },
    ],
    faqs: [
      { question: "How many drywall sheets do I need?", answer: "Divide the total wall and ceiling area (plus 10% waste) by the sheet coverage — 32 ft² for a standard 4×8 sheet." },
      { question: "How much joint compound per sheet?", answer: "Budget roughly 0.5–0.75 of a 5-gallon bucket per 10 sheets, or about 0.053 lb per square foot of drywall." },
      { question: "Should I use 4×8 or 4×12 sheets?", answer: "Larger 4×12 sheets create fewer seams to tape and finish but are heavier and harder to handle in tight spaces." },
    ],
    related: ["paint-calculator", "concrete-calculator"],
    guides: [{ title: "How Much Drywall Do I Need?", href: "/guides/how-much-drywall-do-i-need/" }],
  },
  seo: {
    title: "Drywall Calculator — Sheets, Mud, Tape & Screws | HomeCalcify",
    description: "Free drywall calculator. Enter room size to get sheets, joint compound, tape, and screws with a waste allowance.",
  },
};

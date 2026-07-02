import type { CalculatorConfig, CalculatorResult } from "@/lib/calculator/types";
import { toNumber } from "@/lib/calculator/engine";

/**
 * Roof pitch calculator (imperial). Rise + run → pitch (X:12), angle (degrees),
 * and the roof-area slope multiplier. `intents: []` — no cost/guide auto-pages
 * (a pitch tool has no cost intent), avoiding thin generated pages.
 */
export const roofPitchCalculator: CalculatorConfig = {
  slug: "roof-pitch-calculator",
  name: "Roof Pitch Calculator",
  category: "roofing",
  categoryLabel: "Roofing",
  description:
    "Convert roof rise and run into pitch (X:12), roof angle in degrees, and the area multiplier.",
  supportsUnits: false,
  cpc: "medium",
  keywords: ["roof pitch calculator", "roof pitch", "roof angle calculator", "roof slope calculator"],
  intents: [],
  fields: [
    { id: "rise", label: "Rise", type: "number", unitLabel: { imperial: "in" }, placeholder: "e.g. 6", min: 0, step: 0.1, help: "Vertical rise you measured." },
    { id: "run", label: "Run", type: "number", unitLabel: { imperial: "in" }, defaultValue: 12, min: 0.1, step: 0.1, help: "Horizontal run — usually 12 in." },
  ],
  compute: ({ inputs }) => {
    const rise = toNumber(inputs.rise);
    const run = toNumber(inputs.run) || 12;

    const pitchPer12 = (rise / run) * 12;
    const angle = Math.atan2(rise, run) * (180 / Math.PI);
    const multiplier = Math.sqrt(rise * rise + run * run) / run;

    const results: CalculatorResult[] = [
      { id: "pitch", label: "Roof pitch", value: pitchPer12, unit: ": 12", precision: 1, primary: true, note: "Rise per 12 in of run" },
      { id: "angle", label: "Roof angle", value: angle, unit: "°", precision: 1 },
      { id: "multiplier", label: "Area multiplier", value: multiplier, unit: "×", precision: 3, note: "Footprint × this = roof area" },
    ];
    return results;
  },
  content: {
    answer:
      "To find roof pitch, measure the vertical rise over 12 inches of horizontal run. A roof rising 6 inches per 12 inches of run is a 6:12 pitch (about 26.6°). Divide rise by run and multiply by 12 for the pitch, then use the slope multiplier to convert your footprint to actual roof area.",
    quickFacts: [
      { label: "Most common pitch", value: "6:12" },
      { label: "Walkable up to", value: "~6:12" },
      { label: "Steep", value: "9:12+" },
    ],
    formula: "Pitch = (Rise ÷ Run) × 12 ; Angle = arctan(Rise ÷ Run) ; Area multiplier = √(Rise² + Run²) ÷ Run",
    steps: [
      { title: "Measure the run", detail: "Mark 12 inches horizontally from a level held against the roof or a rafter." },
      { title: "Measure the rise", detail: "Measure straight down from the 12-inch mark to the roof surface." },
      { title: "Read the pitch", detail: "The rise over 12 is your pitch — e.g. 6 inches down = 6:12." },
      { title: "Convert to area", detail: "Multiply your roof's footprint by the slope multiplier for the true surface area." },
    ],
    example: "A 6-inch rise over a 12-inch run = 6:12 pitch, about 26.6°, with a 1.118 area multiplier.",
    tables: [
      {
        title: "Common roof pitches",
        caption: "Pitch, angle, and the multiplier used to turn footprint into roof area.",
        columns: ["Pitch", "Angle", "Area multiplier", "Type"],
        rows: [
          ["3:12", "14.0°", "1.031", "Low slope"],
          ["4:12", "18.4°", "1.054", "Gentle, walkable"],
          ["6:12", "26.6°", "1.118", "Most common"],
          ["8:12", "33.7°", "1.202", "Steep"],
          ["12:12", "45.0°", "1.414", "Very steep"],
        ],
      },
    ],
    mistakes: [
      { title: "Measuring the wrong run", detail: "Pitch is always rise over a 12-inch run. Measure a true 12 inches horizontally with a level, not along the slope." },
      { title: "Confusing pitch and angle", detail: "6:12 is a pitch (rise:run), not 6 degrees. Use the angle output when you need degrees." },
      { title: "Ignoring the multiplier", detail: "A sloped roof's real area is larger than its footprint — always apply the multiplier before ordering material." },
    ],
    faqs: [
      { question: "What is the most common roof pitch?", answer: "Around 6:12 — a moderate slope that sheds water well and is still workable for roofers." },
      { question: "How do I measure roof pitch?", answer: "Hold a level on the roof, measure 12 inches horizontally, then measure straight down to the roof. That drop is the pitch (e.g. 6 in = 6:12)." },
      { question: "What pitch is walkable?", answer: "Roofs up to about 6:12 are generally walkable with care; steeper pitches need harnesses and roof jacks." },
      { question: "How do I convert pitch to degrees?", answer: "Take the arctangent of rise ÷ run. A 6:12 pitch is about 26.6 degrees — the calculator shows this automatically." },
    ],
    related: ["roofing-calculator"],
    guides: [
      { title: "Roof Pitch Explained", href: "/guides/roof-pitch-explained/" },
      { title: "How to Measure a Roof", href: "/guides/how-to-measure-a-roof/" },
    ],
  },
  seo: {
    title: "Roof Pitch Calculator — Pitch, Angle & Multiplier | HomeCalcify",
    description: "Free roof pitch calculator. Enter rise and run to get the roof pitch (X:12), angle in degrees, and the area multiplier.",
  },
};

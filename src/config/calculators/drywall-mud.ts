import type { CalculatorConfig, CalculatorResult } from "@/lib/calculator/types";
import { toNumber } from "@/lib/calculator/engine";

/** Drywall mud (joint compound) calculator. Drywall area → compound, tape, and buckets. */
export const drywallMudCalculator: CalculatorConfig = {
  slug: "drywall-mud-calculator",
  name: "Drywall Mud Calculator",
  category: "drywall",
  categoryLabel: "Drywall",
  description:
    "Estimate the joint compound (mud), tape, and buckets you need to finish a drywall project by area and finish level.",
  supportsUnits: false,
  cpc: "medium",
  keywords: ["drywall mud calculator", "joint compound calculator", "how much drywall mud do i need", "drywall tape calculator"],
  intents: [],
  fields: [
    { id: "area", label: "Drywall area", type: "number", unitLabel: { imperial: "ft²" }, placeholder: "e.g. 600", min: 0, step: 1, help: "Total wall + ceiling drywall area to finish." },
    { id: "finish", label: "Finish level", type: "select", defaultValue: "4", options: [
      { label: "Level 3 (texture)", value: "3" }, { label: "Level 4 (standard paint)", value: "4" }, { label: "Level 5 (skim coat)", value: "5" } ] },
  ],
  compute: ({ inputs }) => {
    const area = toNumber(inputs.area);
    const level = toNumber(inputs.finish);
    // ~0.053 lb per ft² for a standard Level 4; more for skim coat, less for texture-ready.
    const perFt = level >= 5 ? 0.072 : level === 4 ? 0.053 : 0.045;
    const mudLb = area * perFt;
    const tape = area * 0.39; // linear feet
    const buckets = Math.ceil(mudLb / 61.7); // 4.5-gal / 61.7 lb ready-mix bucket

    const results: CalculatorResult[] = [
      { id: "mud", label: "Joint compound", value: mudLb, unit: "lb", precision: 0, primary: true, note: `Level ${level} finish` },
      { id: "buckets", label: "Ready-mix buckets", value: buckets, unit: "buckets", precision: 0, note: "4.5-gal (61.7 lb) each" },
      { id: "tape", label: "Joint tape", value: tape, unit: "ft", precision: 0 },
    ];
    return results;
  },
  content: {
    answer:
      "To estimate drywall mud, budget about 0.053 lb of joint compound per square foot of drywall for a standard Level 4 finish, plus roughly 0.39 ft of tape per square foot. A 600 sq ft project needs about 32 lb of mud (one 4.5-gallon bucket) and 234 ft of tape.",
    quickFacts: [
      { label: "Mud per ft²", value: "~0.05 lb" },
      { label: "Tape per ft²", value: "~0.39 ft" },
      { label: "Bucket yields", value: "~61.7 lb" },
    ],
    formula: "Compound (lb) = Area × 0.053 (Level 4); Tape (ft) = Area × 0.39",
    steps: [
      { title: "Find the drywall area", detail: "Add the wall and ceiling area you're taping and finishing." },
      { title: "Pick a finish level", detail: "Level 4 is standard for paint; Level 5 (skim coat) uses more mud." },
      { title: "Estimate the compound", detail: "About 0.053 lb per ft² for Level 4 — more for a full skim coat." },
      { title: "Add tape and buckets", detail: "Roughly 0.39 ft of tape per ft²; one 4.5-gallon bucket holds ~61.7 lb." },
    ],
    example: "A 600 ft² room at Level 4: 600 × 0.053 ≈ 32 lb of mud (one bucket) and 600 × 0.39 ≈ 234 ft of tape.",
    tables: [
      { title: "Joint compound by finish level", caption: "Approximate compound per square foot of drywall.", columns: ["Finish level", "Compound per ft²", "Used for"], rows: [["Level 3", "~0.045 lb", "Under texture"], ["Level 4", "~0.053 lb", "Standard paint"], ["Level 5", "~0.072 lb", "Skim coat, gloss paint"]] },
    ],
    mistakes: [
      { title: "Buying too little for a skim coat", detail: "A Level 5 skim coat uses noticeably more mud than a standard finish — plan for it." },
      { title: "Using the wrong compound", detail: "Setting-type (hot) mud for the first coat and all-purpose for finish coats speeds the job and reduces cracking." },
      { title: "Forgetting corner bead and tape", detail: "Inside corners need tape and outside corners need bead — both add to the material list." },
    ],
    faqs: [
      { question: "How much drywall mud do I need?", answer: "About 0.053 lb of joint compound per square foot of drywall for a standard Level 4 finish, or one 4.5-gallon bucket per ~600 sq ft." },
      { question: "How many buckets of mud per room?", answer: "A typical 12×12 room (about 600 sq ft of drywall) needs roughly one 4.5-gallon bucket for a Level 4 finish." },
      { question: "How much tape do I need for drywall?", answer: "Budget about 0.39 linear feet of tape per square foot of drywall." },
    ],
    related: ["drywall-calculator"],
    guides: [
      { title: "How Much Drywall Do I Need?", href: "/guides/how-much-drywall-do-i-need/" },
      { title: "Drywall Finishing Levels Explained", href: "/guides/drywall-finishing-levels/" },
    ],
  },
  seo: {
    title: "Drywall Mud Calculator — Joint Compound & Tape | HomeCalcify",
    description: "Free drywall mud calculator. Enter your drywall area and finish level to get joint compound, buckets, and tape.",
  },
};

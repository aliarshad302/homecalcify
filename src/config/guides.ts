/**
 * Informational guide layer (the article silo that feeds the calculators).
 * Each guide links down to its primary calculator and cross-links siblings.
 */
export interface GuideSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface GuideConfig {
  slug: string;
  title: string;
  description: string;
  /** 40–60 word direct answer for AEO / AI Overviews. */
  answer: string;
  category: string;
  updated: string;
  sections: GuideSection[];
  /** Primary calculator CTA slug. */
  calculatorSlug?: string;
  faqs?: { question: string; answer: string }[];
  related?: string[];
}

export const guides: GuideConfig[] = [
  {
    slug: "how-much-concrete-do-i-need",
    title: "How Much Concrete Do I Need?",
    description: "Learn how to calculate how much concrete you need in cubic yards or bags, with formulas, examples, and a coverage chart.",
    answer:
      "To find how much concrete you need, multiply length × width × thickness (in feet) to get cubic feet, then divide by 27 for cubic yards. Add 5–10% for waste. A 10×10 ft slab at 4 inches needs about 1.23 cubic yards, or roughly 56 80-lb bags.",
    category: "concrete",
    updated: "2026-06-11",
    sections: [
      { heading: "The basic formula", paragraphs: ["Concrete is ordered by volume. Measure your slab in feet, convert the thickness from inches to feet (divide by 12), then multiply all three dimensions for cubic feet. Divide by 27 to get cubic yards — the unit ready-mix is sold in."] },
      { heading: "Don't forget waste", paragraphs: ["Always add 5–10%. Subgrades are rarely perfectly level, and running short mid-pour creates a weak cold joint. A little extra is far cheaper than a second delivery."] },
      { heading: "Bags vs ready-mix", bullets: ["Under ~1 cubic yard: bagged concrete is convenient.", "1 cubic yard or more: ready-mix delivery is usually cheaper and faster.", "A cubic yard ≈ 45 80-lb bags or 60 60-lb bags."] },
    ],
    calculatorSlug: "concrete-calculator",
    faqs: [
      { question: "How many bags of concrete in a cubic yard?", answer: "About 45 80-lb bags or 60 60-lb bags make one cubic yard (27 cubic feet)." },
      { question: "How thick should a slab be?", answer: "4 inches for patios and walkways; 5–6 inches for driveways and anywhere vehicles park." },
    ],
    related: ["concrete-bag-coverage-chart", "asphalt-vs-concrete-driveway"],
  },
  {
    slug: "concrete-bag-coverage-chart",
    title: "Concrete Bag Coverage Chart",
    description: "A quick reference chart for how much volume each size of concrete bag yields and how many bags make a cubic yard.",
    answer:
      "A 40-lb bag of concrete yields about 0.30 cubic feet, a 60-lb bag about 0.45 cubic feet, and an 80-lb bag about 0.60 cubic feet. It takes roughly 90, 60, and 45 bags respectively to make one cubic yard (27 cubic feet).",
    category: "concrete",
    updated: "2026-06-11",
    sections: [
      { heading: "Yield per bag", bullets: ["40 lb bag ≈ 0.30 ft³ (≈ 90 bags per yard)", "50 lb bag ≈ 0.375 ft³ (≈ 72 bags per yard)", "60 lb bag ≈ 0.45 ft³ (≈ 60 bags per yard)", "80 lb bag ≈ 0.60 ft³ (≈ 45 bags per yard)"] },
      { heading: "How to use the chart", paragraphs: ["Calculate your project volume in cubic feet, then divide by the yield of the bag size you plan to buy. Round up and add a couple of bags for waste."] },
    ],
    calculatorSlug: "concrete-calculator",
    related: ["how-much-concrete-do-i-need"],
  },
  {
    slug: "how-much-mulch-do-i-need",
    title: "How Much Mulch Do I Need?",
    description: "Calculate mulch in cubic yards or bags based on your bed size and depth, with a coverage reference.",
    answer:
      "To find how much mulch you need, multiply bed length × width for the area, multiply by depth in feet, and divide by 27 for cubic yards. One cubic yard covers about 108 sq ft at 3 inches deep, or roughly 13.5 standard 2-cubic-foot bags.",
    category: "landscaping",
    updated: "2026-06-11",
    sections: [
      { heading: "Pick the right depth", paragraphs: ["A 2–3 inch layer suppresses weeds and holds moisture without smothering roots. For a seasonal refresh over existing mulch, 1 inch is usually enough."] },
      { heading: "Coverage at a glance", bullets: ["1 yd³ covers ~324 ft² at 1 inch", "1 yd³ covers ~162 ft² at 2 inches", "1 yd³ covers ~108 ft² at 3 inches"] },
    ],
    calculatorSlug: "mulch-calculator",
    related: [],
  },
  {
    slug: "how-much-paint-do-i-need",
    title: "How Much Paint Do I Need?",
    description: "Estimate paint by room size, coats, and openings, with coverage rates and pro tips.",
    answer:
      "To estimate paint, calculate wall area (perimeter × height), subtract about 21 sq ft per door or window, multiply by the number of coats, and divide by 350 (sq ft per gallon). A standard 12×12 ft room needs about 2 gallons for two coats.",
    category: "painting",
    updated: "2026-06-11",
    sections: [
      { heading: "Coverage rates", paragraphs: ["One gallon covers roughly 350–400 sq ft per coat on smooth, primed walls. Textured, porous, or unprimed surfaces absorb more and cover less."] },
      { heading: "One coat or two?", paragraphs: ["Plan on two coats for durable, even color — especially over fresh drywall or when changing colors. Buy 5–10% extra so you have a dye-lot match for touch-ups."] },
    ],
    calculatorSlug: "paint-calculator",
    related: [],
  },
  {
    slug: "flooring-installation-cost",
    title: "Flooring Installation Cost Guide",
    description: "What flooring costs by material and how to estimate your project budget per square foot.",
    answer:
      "Flooring costs vary by material: laminate runs about $2–$6 per sq ft, vinyl plank $3–$7, and hardwood $6–$15 installed. Estimate your budget by multiplying your room's square footage (plus 10% waste) by the installed price per square foot.",
    category: "flooring",
    updated: "2026-06-11",
    sections: [
      { heading: "Typical material costs", bullets: ["Laminate: $2–$6 / ft² installed", "Luxury vinyl plank: $3–$7 / ft² installed", "Engineered wood: $5–$10 / ft² installed", "Solid hardwood: $6–$15 / ft² installed"] },
      { heading: "Budgeting tips", paragraphs: ["Measure your square footage, add 10% for waste, and multiply by the installed price. Remember to include underlayment, transitions, and removal of old flooring."] },
    ],
    calculatorSlug: "flooring-calculator",
    related: ["how-many-tiles-do-i-need"],
  },
  {
    slug: "how-many-tiles-do-i-need",
    title: "How Many Tiles Do I Need?",
    description: "Calculate tile counts for floors and walls, including waste for cuts and patterns.",
    answer:
      "To find how many tiles you need, divide the area (length × width in feet) by the area of one tile in square feet, then add 10–20% for cuts and breakage. A 10×8 ft floor with 12-inch tiles needs about 88 tiles including 10% waste.",
    category: "flooring",
    updated: "2026-06-11",
    sections: [
      { heading: "Waste by layout", bullets: ["Straight lay: add 10%", "Diagonal: add 15%", "Herringbone or complex patterns: add up to 20%"] },
      { heading: "Buy by the box", paragraphs: ["Tile is sold by the box. Round your total up to full boxes and keep a spare for future repairs — dye lots change between production runs."] },
    ],
    calculatorSlug: "tile-calculator",
    related: ["flooring-installation-cost"],
  },
  {
    slug: "how-to-measure-a-roof",
    title: "How to Measure a Roof",
    description: "Measure your roof for shingles using footprint and pitch, then convert to squares and bundles.",
    answer:
      "To measure a roof, find the footprint (length × width), multiply by a pitch factor to get the true surface area, then divide by 100 for roofing squares. Add 10–15% for waste. Shingles come three bundles per square.",
    category: "roofing",
    updated: "2026-06-11",
    sections: [
      { heading: "Why pitch matters", paragraphs: ["A roof's actual surface is larger than its footprint because of the slope. Multiply the footprint by a pitch factor — for example 1.118 for a common 6:12 roof — to get the real area."] },
      { heading: "Squares and bundles", bullets: ["1 square = 100 sq ft of roof", "3 bundles of architectural shingles per square", "Add 10% waste for simple roofs, 15% for cut-up roofs"] },
    ],
    calculatorSlug: "roofing-calculator",
    related: [],
  },
  {
    slug: "how-much-drywall-do-i-need",
    title: "How Much Drywall Do I Need?",
    description: "Estimate drywall sheets, joint compound, tape, and screws for any room.",
    answer:
      "To calculate drywall, find the total wall area (perimeter × height) plus the ceiling if covering it, add 10% for waste, and divide by the sheet size (32 sq ft for a 4×8 sheet). A 14×12 ft room with 8 ft walls and a ceiling needs about 21 sheets.",
    category: "drywall",
    updated: "2026-06-11",
    sections: [
      { heading: "Sheet sizes", bullets: ["4×8 ft = 32 ft² (easiest to handle)", "4×10 ft = 40 ft² (fewer seams)", "4×12 ft = 48 ft² (fewest seams, heaviest)"] },
      { heading: "Finishing supplies", paragraphs: ["Budget about 0.053 lb of joint compound and 0.39 ft of tape per square foot of drywall, plus roughly one screw per square foot."] },
    ],
    calculatorSlug: "drywall-calculator",
    related: [],
  },
  {
    slug: "asphalt-vs-concrete-driveway",
    title: "Asphalt vs Concrete Driveway",
    description: "Compare asphalt and concrete driveways on cost, lifespan, maintenance, and climate.",
    answer:
      "Asphalt driveways cost less up front ($3–$7 per sq ft) and install faster, but need resealing every few years and last 15–20 years. Concrete costs more ($6–$12 per sq ft) and lasts 25–40 years with less maintenance. Asphalt suits cold climates; concrete suits hot ones.",
    category: "driveway-paving",
    updated: "2026-06-11",
    sections: [
      { heading: "Cost and lifespan", bullets: ["Asphalt: lower up-front cost, 15–20 year life, reseal every 3–5 years", "Concrete: higher up-front cost, 25–40 year life, minimal maintenance"] },
      { heading: "Climate", paragraphs: ["Asphalt stays flexible in freeze-thaw climates and is easy to repair. Concrete can crack in hard freezes but resists softening and rutting in extreme heat."] },
    ],
    calculatorSlug: "asphalt-calculator",
    related: ["how-much-concrete-do-i-need"],
  },
];

export const guideMap: Record<string, GuideConfig> = Object.fromEntries(
  guides.map((g) => [g.slug, g]),
);

export function getGuide(slug: string): GuideConfig | undefined {
  return guideMap[slug];
}

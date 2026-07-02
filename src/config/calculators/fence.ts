import type { CalculatorConfig, CalculatorResult } from "@/lib/calculator/types";
import { toNumber } from "@/lib/calculator/engine";

/**
 * Fence calculator (imperial). Fence length + spacing → posts, sections, rails,
 * concrete for posts, and installed cost. `intents: []` — one clean page.
 */
export const fenceCalculator: CalculatorConfig = {
  slug: "fence-calculator",
  name: "Fence Calculator",
  category: "fencing",
  categoryLabel: "Fencing",
  description:
    "Estimate posts, sections, rails, and concrete for a new fence from its length and post spacing.",
  supportsUnits: false,
  cpc: "high",
  keywords: ["fence calculator", "fence cost calculator", "how many fence posts do i need", "fence material calculator"],
  intents: [],
  fields: [
    { id: "length", label: "Fence length", type: "number", unitLabel: { imperial: "ft" }, placeholder: "e.g. 150", min: 0, step: 0.1 },
    { id: "spacing", label: "Post spacing", type: "select", defaultValue: "8", options: [
      { label: "6 ft", value: "6" }, { label: "8 ft", value: "8" } ] },
    { id: "rails", label: "Rails per section", type: "select", defaultValue: "3", options: [
      { label: "2 rails", value: "2" }, { label: "3 rails", value: "3" } ] },
    { id: "price", label: "Price per ft", type: "number", unitLabel: { imperial: "$/ft" }, placeholder: "Optional", required: false },
  ],
  compute: ({ inputs }) => {
    const length = toNumber(inputs.length);
    const spacing = toNumber(inputs.spacing) || 8;
    const railsPer = toNumber(inputs.rails) || 3;
    const price = toNumber(inputs.price);

    const sections = Math.ceil(length / spacing);
    const posts = sections + 1;
    const rails = sections * railsPer;
    const concreteBags = posts * 2; // ~2 bags per post

    const results: CalculatorResult[] = [
      { id: "sections", label: "Fence sections", value: sections, unit: "sections", precision: 0, primary: true },
      { id: "posts", label: "Posts", value: posts, unit: "posts", precision: 0, note: `${spacing} ft apart` },
      { id: "rails", label: "Rails", value: rails, unit: "rails", precision: 0 },
      { id: "concrete", label: "Concrete", value: concreteBags, unit: "bags", precision: 0, note: "~2 bags per post" },
    ];
    const RANGE = [15, 45]; // $/linear ft installed (wood → vinyl/composite)
    const hasUserPrice = Number.isFinite(price) && price > 0;
    results.push({
      id: "cost",
      label: "Estimated installed cost",
      value: length * (hasUserPrice ? price : RANGE[0]),
      valueHigh: hasUserPrice ? undefined : length * RANGE[1],
      format: "currency",
      precision: 0,
      highlight: true,
      note: hasUserPrice ? "Based on your price" : "Wood to vinyl · materials + labor",
    });
    return results;
  },
  content: {
    answer:
      "To estimate fence materials, divide the fence length by the post spacing (usually 8 ft) to get the number of sections; posts equal sections plus one. Each section needs 2–3 rails, and each post takes about 2 bags of concrete. A 150 ft fence at 8 ft spacing needs about 19 sections, 20 posts, and 40 bags of concrete.",
    quickFacts: [
      { label: "Post spacing", value: "6–8 ft" },
      { label: "Concrete per post", value: "~2 bags" },
      { label: "Post depth", value: "⅓ of height" },
    ],
    formula: "Sections = Length ÷ spacing; Posts = sections + 1; Concrete bags = posts × 2",
    steps: [
      { title: "Measure the fence line", detail: "Measure the total length in feet, subtracting any gate openings." },
      { title: "Set the post spacing", detail: "8 ft is standard for most fences; 6 ft for heavier or windy-area fences." },
      { title: "Count posts and sections", detail: "Sections = length ÷ spacing; posts = sections + 1 (plus extras for corners and gates)." },
      { title: "Add rails and concrete", detail: "2–3 rails per section, and about 2 bags of concrete per post hole." },
    ],
    example: "A 150 ft fence at 8 ft spacing: 150 ÷ 8 ≈ 19 sections, 20 posts, 3 rails each = 57 rails, and 40 bags of concrete.",
    tables: [
      {
        title: "Fence cost by material",
        caption: "Installed cost per linear foot, including posts and labor.",
        columns: ["Material", "Cost per ft (installed)", "Lifespan", "Notes"],
        rows: [
          ["Wood (pressure-treated)", "$15 – $30", "15–20 yrs", "Common, needs sealing"],
          ["Chain link", "$10 – $20", "15–20 yrs", "Budget, low privacy"],
          ["Vinyl", "$20 – $40", "20–30 yrs", "Low maintenance"],
          ["Composite", "$25 – $45", "25–30 yrs", "Durable, wood look"],
        ],
      },
    ],
    mistakes: [
      { title: "Setting posts too shallow", detail: "Bury about ⅓ of the post height and below the frost line, or the fence will lean and heave." },
      { title: "Forgetting gates and corners", detail: "Gates and corners need extra, heavier posts — add them to your post count." },
      { title: "Under-ordering concrete", detail: "Each post hole typically takes about 2 bags of fast-setting concrete; deep or wide holes take more." },
      { title: "Skipping the property line check", detail: "Confirm your property line and local setback rules before setting posts." },
    ],
    faqs: [
      { question: "How many fence posts do I need?", answer: "Divide the fence length by the post spacing (usually 8 ft) and add one. A 150 ft fence needs about 20 posts." },
      { question: "How much concrete per fence post?", answer: "About 2 bags of fast-setting concrete per post for a standard hole; more for deep or wide holes." },
      { question: "How much does a fence cost?", answer: "About $15–$30 per linear foot installed for wood and $20–$40 for vinyl." },
    ],
    related: ["deck-calculator", "concrete-calculator"],
    guides: [
      { title: "How Much Does a Fence Cost?", href: "/guides/fence-cost/" },
      { title: "Wood vs Vinyl Fence", href: "/guides/wood-vs-vinyl-fence/" },
    ],
  },
  seo: {
    title: "Fence Calculator — Posts, Rails & Cost | HomeCalcify",
    description: "Free fence calculator. Enter your fence length to get posts, sections, rails, concrete, and installed cost for wood or vinyl.",
  },
};

import type { CalculatorConfig, CalculatorResult } from "@/lib/calculator/types";
import { toNumber } from "@/lib/calculator/engine";
import { buildStates } from "@/config/locations";

/**
 * Siding calculator (imperial). Wall area → squares and installed cost.
 */
export const sidingCalculator: CalculatorConfig = {
  slug: "siding-calculator",
  name: "Siding Calculator",
  category: "siding",
  categoryLabel: "Siding",
  description:
    "Estimate the wall area, squares, and installed cost of siding for your home's exterior.",
  supportsUnits: false,
  cpc: "high",
  keywords: ["siding calculator", "siding cost", "how much siding do i need", "vinyl siding cost", "siding cost per square foot"],
  howtoAction: "install-siding",
  howto: {
    tools: ["Tape measure", "Snap-lock punch", "Tin snips", "Level", "Utility knife"],
    materials: ["Siding panels", "J-channel & corner posts", "House wrap", "Starter strip", "Nails"],
  },
  locations: buildStates({
    texas: "Texas favors fiber-cement and brick for heat and storm resistance; abundant labor keeps installed siding prices below the national average.",
    california: "California's labor rates, seismic detailing, and fire-zone requirements (fiber-cement and non-combustible siding) push siding costs well above average.",
    florida: "Florida's hurricane codes call for wind-rated siding and reinforced fastening, and humidity makes fiber-cement and vinyl popular over wood.",
    "new-york": "New York's cold and union labor raise installed costs; insulated vinyl and fiber-cement are common for energy performance.",
    illinois: "Illinois homeowners pick siding that handles freeze-thaw and storms; vinyl and fiber-cement dominate, with labor slightly above the national average.",
  }),
  fields: [
    { id: "length", label: "House length", type: "number", unitLabel: { imperial: "ft" }, placeholder: "e.g. 40", min: 0, step: 0.1 },
    { id: "width", label: "House width", type: "number", unitLabel: { imperial: "ft" }, placeholder: "e.g. 30", min: 0, step: 0.1 },
    { id: "height", label: "Wall height", type: "number", unitLabel: { imperial: "ft" }, defaultValue: 9, min: 0, step: 0.1 },
    { id: "waste", label: "Waste allowance", type: "select", defaultValue: "10", options: [
      { label: "Simple walls (10%)", value: "10" }, { label: "Many corners (15%)", value: "15" } ] },
    { id: "price", label: "Price per ft²", type: "number", unitLabel: { imperial: "$/ft²" }, placeholder: "Optional", required: false },
  ],
  compute: ({ inputs }) => {
    const length = toNumber(inputs.length);
    const width = toNumber(inputs.width);
    const height = toNumber(inputs.height);
    const wasteFactor = 1 + toNumber(inputs.waste) / 100;
    const price = toNumber(inputs.price);

    const wallArea = 2 * (length + width) * height * wasteFactor;
    const squares = wallArea / 100;
    const RANGE = [4, 9]; // $/ft² installed (vinyl→fiber-cement)
    const hasUserPrice = Number.isFinite(price) && price > 0;

    const results: CalculatorResult[] = [
      { id: "area", label: "Siding needed", value: wallArea, unit: "ft²", precision: 0, primary: true, note: `Incl. ${toNumber(inputs.waste)}% waste` },
      { id: "squares", label: "Siding squares", value: squares, unit: "sq", precision: 1, note: "1 square = 100 ft²" },
      {
        id: "cost",
        label: "Estimated installed cost",
        value: wallArea * (hasUserPrice ? price : RANGE[0]),
        valueHigh: hasUserPrice ? undefined : wallArea * RANGE[1],
        format: "currency",
        precision: 0,
        highlight: true,
        note: hasUserPrice ? "Based on your price" : "Vinyl to fiber-cement · materials + labor",
      },
    ];
    return results;
  },
  content: {
    answer:
      "To estimate siding, find the wall area (perimeter × height), add 10–15% for waste, then divide by 100 for squares. Multiply the area by the installed price per square foot — vinyl runs about $4–$8 and fiber-cement $6–$13. A 40×30 ft home with 9 ft walls needs about 1,386 ft² of siding.",
    quickFacts: [
      { label: "1 siding square", value: "100 ft²" },
      { label: "Typical waste", value: "10–15%" },
      { label: "Cheapest type", value: "Vinyl" },
    ],
    formula: "Siding (ft²) = Perimeter × Height × (1 + waste %); Squares = area ÷ 100",
    steps: [
      { title: "Measure the perimeter", detail: "Add the length of all exterior walls (2 × (length + width) for a rectangle)." },
      { title: "Multiply by wall height", detail: "This gives the gross wall area in square feet." },
      { title: "Add waste", detail: "Add 10% for simple walls, 15% for homes with many corners and openings." },
      { title: "Convert to squares", detail: "Divide by 100. Siding is ordered and priced by the square." },
    ],
    example: "A 40 ft × 30 ft home with 9 ft walls: perimeter 140 ft × 9 = 1,260 ft² × 1.10 ≈ 1,386 ft² (≈ 13.9 squares).",
    tables: [
      {
        title: "Siding cost by material",
        caption: "Installed cost per square foot, including materials and labor.",
        columns: ["Material", "Cost per ft² (installed)", "Lifespan", "Best for"],
        rows: [
          ["Vinyl", "$4 – $8", "20–40 yrs", "Budget, low maintenance"],
          ["Fiber-cement", "$6 – $13", "30–50 yrs", "Durability, fire zones"],
          ["Engineered wood", "$5 – $11", "20–30 yrs", "Wood look, lighter"],
          ["Brick veneer", "$10 – $20", "75+ yrs", "Premium, longevity"],
        ],
      },
    ],
    mistakes: [
      { title: "Not subtracting large openings", detail: "Big windows, garage doors, and entries reduce the siding area — but keep the waste factor for cuts around them." },
      { title: "Forgetting trim and accessories", detail: "J-channel, corner posts, starter strip, and house wrap add to the order and the budget." },
      { title: "Skipping house wrap", detail: "A weather-resistant barrier behind the siding prevents moisture damage and drafts." },
      { title: "Underestimating gables", detail: "Triangular gable walls add area that a simple perimeter × height misses — measure them separately." },
    ],
    faqs: [
      { question: "How much siding do I need?", answer: "Multiply the wall perimeter by height, add 10–15% for waste, and divide by 100 for squares." },
      { question: "How much does siding cost per square foot?", answer: "Installed, vinyl runs about $4–$8/ft² and fiber-cement $6–$13/ft², depending on material and labor." },
      { question: "What is the cheapest siding?", answer: "Vinyl siding has the lowest installed cost and the least maintenance, which is why it's the most common choice." },
    ],
    related: ["insulation-calculator", "roofing-calculator"],
    guides: [
      { title: "How Much Does Siding Cost?", href: "/guides/how-much-does-siding-cost/" },
      { title: "Vinyl vs Fiber Cement Siding", href: "/guides/vinyl-vs-fiber-cement-siding/" },
      { title: "Best Siding for Cold Climates", href: "/guides/best-siding-for-cold-climates/" },
    ],
  },
  seo: {
    title: "Siding Calculator — Square Footage & Cost | HomeCalcify",
    description: "Free siding calculator. Enter your home's size to get wall area, squares, and installed cost for vinyl, fiber-cement, and more.",
  },
};

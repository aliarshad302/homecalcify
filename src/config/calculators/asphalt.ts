import type { CalculatorConfig, CalculatorResult } from "@/lib/calculator/types";
import { toNumber } from "@/lib/calculator/engine";
import { buildStates } from "@/config/locations";

/**
 * Asphalt calculator (imperial). Volume × density → tons of hot-mix asphalt.
 * Default density ~145 lb/ft³ for compacted asphalt.
 */
export const asphaltCalculator: CalculatorConfig = {
  slug: "asphalt-calculator",
  name: "Asphalt Calculator",
  category: "driveway-paving",
  categoryLabel: "Driveway & Paving",
  description:
    "Estimate the tons of asphalt needed to pave a driveway or lot at any thickness.",
  supportsUnits: false,
  cpc: "high",
  keywords: ["asphalt calculator", "asphalt cost", "how much asphalt do i need", "asphalt driveway cost", "blacktop cost per ton"],
  howtoAction: "pave-a-driveway",
  locations: buildStates({
    texas: "Texas's flat terrain and many paving contractors keep asphalt driveway prices below the national average, though summer heat demands a proper mix design.",
    california: "California's labor costs, permits, and stormwater rules push asphalt paving above average, especially in coastal counties.",
    florida: "Florida's sandy subgrades often need extra base preparation before paving; prices sit near the national average, with heat affecting scheduling.",
    "new-york": "New York's freeze-thaw cycles and union labor raise asphalt costs, and driveways need a deep, well-drained base to resist heaving.",
    illinois: "Illinois winters are hard on asphalt, so a thick compacted base and timely sealcoating matter; labor runs slightly above the national average.",
  }),
  fields: [
    { id: "length", label: "Length", type: "number", unitLabel: { imperial: "ft" }, placeholder: "e.g. 50", min: 0, step: 0.1 },
    { id: "width", label: "Width", type: "number", unitLabel: { imperial: "ft" }, placeholder: "e.g. 12", min: 0, step: 0.1 },
    { id: "thickness", label: "Thickness", type: "number", unitLabel: { imperial: "in" }, defaultValue: 3, min: 0, step: 0.25, help: "2–3 in for driveways, 4+ for heavy loads." },
    { id: "density", label: "Density", type: "number", unitLabel: { imperial: "lb/ft³" }, defaultValue: 145, min: 1, step: 1, help: "Compacted hot-mix asphalt ≈ 145 lb/ft³." },
    { id: "price", label: "Price per ton", type: "number", unitLabel: { imperial: "$/ton" }, placeholder: "Optional", required: false },
  ],
  compute: ({ inputs }) => {
    const length = toNumber(inputs.length);
    const width = toNumber(inputs.width);
    const thickness = toNumber(inputs.thickness) / 12; // in → ft
    const density = toNumber(inputs.density);
    const price = toNumber(inputs.price);

    const volume = length * width * thickness; // ft³
    const weightLb = volume * density;
    const tons = weightLb / 2000;

    const results: CalculatorResult[] = [
      { id: "tons", label: "Asphalt needed", value: tons, unit: "tons", precision: 2, primary: true },
      { id: "area", label: "Paved area", value: length * width, unit: "ft²", precision: 0 },
      { id: "volume", label: "Volume", value: volume, unit: "ft³", precision: 1 },
    ];
    const area = length * width;
    const hasUserPrice = Number.isFinite(price) && price > 0;
    if (hasUserPrice) {
      results.push({
        id: "cost",
        label: "Estimated material cost",
        value: tons * price,
        format: "currency",
        precision: 0,
        highlight: true,
        note: "Material only · based on your price per ton",
      });
    } else {
      results.push({
        id: "cost",
        label: "Estimated installed cost",
        value: area * 3,
        valueHigh: area * 7,
        format: "currency",
        precision: 0,
        highlight: true,
        note: "Paved driveway · materials + labor ($3–$7/ft²)",
      });
    }
    return results;
  },
  content: {
    answer:
      "To estimate asphalt, multiply length × width × thickness for the volume in cubic feet, multiply by the density (~145 lb/ft³), then divide by 2,000 to get tons. A 50×12 ft driveway at 3 inches needs about 10.9 tons, costing roughly $1,800–$4,200 installed.",
    quickFacts: [
      { label: "Asphalt density", value: "~145 lb/ft³" },
      { label: "Driveway depth", value: "2–3 in" },
      { label: "1 ton at 2 in", value: "~80 ft²" },
    ],
    formula: "Tons = Length × Width × Thickness ft × density (lb/ft³) ÷ 2000",
    steps: [
      { title: "Measure the area", detail: "Record the paving length and width in feet." },
      { title: "Set the thickness", detail: "Convert inches to feet (3 in = 0.25 ft). Use 2–3 in for driveways." },
      { title: "Find the weight", detail: "Multiply the volume by the asphalt density, about 145 lb/ft³." },
      { title: "Convert to tons", detail: "Divide the weight in pounds by 2,000." },
    ],
    example: "A 50 ft × 12 ft driveway at 3 in: 50 × 12 × 0.25 = 150 ft³ × 145 = 21,750 lb ÷ 2,000 ≈ 10.9 tons.",
    tables: [
      {
        title: "Asphalt coverage by thickness",
        caption: "Area one ton of compacted asphalt covers at each thickness.",
        columns: ["Thickness", "Coverage per ton", "Tons per 1,000 ft²"],
        rows: [
          ["1 inch", "~160 ft²", "~6.3"],
          ["2 inches", "~80 ft²", "~12.6"],
          ["3 inches", "~54 ft²", "~18.5"],
          ["4 inches", "~40 ft²", "~25.0"],
        ],
      },
      {
        title: "Asphalt vs concrete driveway",
        columns: ["Factor", "Asphalt", "Concrete"],
        rows: [
          ["Installed cost", "$3 – $7 / ft²", "$6 – $12 / ft²"],
          ["Lifespan", "15–20 yrs", "25–40 yrs"],
          ["Maintenance", "Reseal every 3–5 yrs", "Minimal"],
          ["Best climate", "Cold / freeze-thaw", "Hot"],
        ],
      },
    ],
    mistakes: [
      { title: "Paving too thin", detail: "Less than 2 inches of compacted asphalt cracks and ruts under vehicle weight. Use 2–3 inches over a solid base." },
      { title: "Skipping the base", detail: "Asphalt is only as good as the gravel base beneath it. A weak base means early failure no matter how much asphalt you lay." },
      { title: "Forgetting compaction", detail: "Loose asphalt covers more area than compacted — estimate for the compacted thickness, not the loose lift." },
      { title: "Ignoring labor in the budget", detail: "Material is only part of the cost. Installation, base prep, and equipment often exceed the asphalt itself." },
    ],
    faqs: [
      { question: "How many tons of asphalt do I need?", answer: "Multiply the volume in cubic feet by ~145 lb/ft³, then divide by 2,000. A typical driveway runs 8–12 tons." },
      { question: "How thick should an asphalt driveway be?", answer: "2–3 inches of compacted asphalt over a solid base for residential driveways; 4+ inches for heavier vehicles." },
      { question: "How much does a ton of asphalt cover?", answer: "At 2 inches thick, one ton covers roughly 80 sq ft; at 3 inches, about 54 sq ft." },
    ],
    related: ["gravel-calculator", "concrete-calculator"],
    guides: [
      { title: "Asphalt vs Concrete Driveway", href: "/guides/asphalt-vs-concrete-driveway/" },
      { title: "Asphalt Driveway Cost", href: "/guides/asphalt-driveway-cost/" },
      { title: "Cost to Pave a Driveway", href: "/guides/cost-to-pave-a-driveway/" },
    ],
  },
  seo: {
    title: "Asphalt Calculator — Tons for a Driveway | HomeCalcify",
    description: "Free asphalt calculator. Enter driveway size and thickness to get tons of hot-mix asphalt and cost.",
  },
};

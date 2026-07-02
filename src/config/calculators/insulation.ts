import type { CalculatorConfig, CalculatorResult } from "@/lib/calculator/types";
import { toNumber } from "@/lib/calculator/engine";
import { buildStates } from "@/config/locations";

/**
 * Insulation calculator (imperial). Area × insulation type → batts/coverage + cost.
 */
export const insulationCalculator: CalculatorConfig = {
  slug: "insulation-calculator",
  name: "Insulation Calculator",
  category: "insulation",
  categoryLabel: "Insulation",
  description:
    "Estimate the square footage, material, and cost to insulate walls or an attic by insulation type.",
  supportsUnits: false,
  cpc: "high",
  keywords: ["insulation calculator", "insulation cost", "how much insulation do i need", "attic insulation cost", "spray foam cost"],
  howtoAction: "insulate-walls",
  howto: {
    tools: ["Tape measure", "Utility knife", "Staple gun", "Caulk gun", "Safety glasses & mask"],
    materials: ["Fiberglass batts or blown-in", "Vapor barrier", "Foam sealant", "Insulation supports"],
  },
  locations: buildStates({
    texas: "Texas homes prioritize attic insulation and radiant barriers to fight cooling loads; mild winters keep wall R-values modest and labor affordable.",
    california: "California's Title 24 energy code mandates high R-values and tight air-sealing, and premium spray-foam jobs plus high labor push insulation costs well above the national average.",
    florida: "In Florida the focus is the attic and moisture control; humidity makes closed-cell foam and vapor management common, though mild winters limit wall insulation needs.",
    "new-york": "New York's cold winters demand high R-values (R-49+ attics), and union labor in the metro area raises installed insulation prices sharply.",
    illinois: "Illinois swings from hot summers to hard winters, so whole-home insulation with R-49 attics is typical; labor runs slightly above the national average.",
  }),
  fields: [
    { id: "length", label: "Area length", type: "number", unitLabel: { imperial: "ft" }, placeholder: "e.g. 30", min: 0, step: 0.1 },
    { id: "width", label: "Area width / wall height", type: "number", unitLabel: { imperial: "ft" }, placeholder: "e.g. 20", min: 0, step: 0.1 },
    { id: "type", label: "Insulation type", type: "select", defaultValue: "batt", options: [
      { label: "Fiberglass batts", value: "batt" },
      { label: "Blown-in cellulose", value: "blown" },
      { label: "Spray foam", value: "foam" } ] },
    { id: "price", label: "Price per ft²", type: "number", unitLabel: { imperial: "$/ft²" }, placeholder: "Optional", required: false },
  ],
  compute: ({ inputs }) => {
    const length = toNumber(inputs.length);
    const width = toNumber(inputs.width);
    const price = toNumber(inputs.price);
    const type = String(inputs.type);

    const area = length * width;
    const RANGES: Record<string, [number, number]> = {
      batt: [1, 2.4],
      blown: [1, 2.5],
      foam: [3, 7],
    };
    const [lo, hi] = RANGES[type] ?? RANGES.batt;
    const hasUserPrice = Number.isFinite(price) && price > 0;

    const results: CalculatorResult[] = [
      { id: "area", label: "Area to insulate", value: area, unit: "ft²", precision: 0, primary: true },
      {
        id: "cost",
        label: "Estimated installed cost",
        value: area * (hasUserPrice ? price : lo),
        valueHigh: hasUserPrice ? undefined : area * hi,
        format: "currency",
        precision: 0,
        highlight: true,
        note: hasUserPrice ? "Based on your price" : `${type === "foam" ? "Spray foam" : type === "blown" ? "Blown-in" : "Fiberglass batt"} · materials + labor`,
      },
    ];
    return results;
  },
  content: {
    answer:
      "To estimate insulation, multiply the length × width of the surface for the square footage, then multiply by the installed cost per square foot for your insulation type. Fiberglass batts run about $1–$2.40/ft², blown-in $1–$2.50, and spray foam $3–$7. A 600 ft² area in batts costs roughly $600–$1,440.",
    quickFacts: [
      { label: "Attic R-value", value: "R-38 to R-60" },
      { label: "Wall R-value", value: "R-13 to R-21" },
      { label: "Cheapest type", value: "Fiberglass batt" },
    ],
    formula: "Cost = Length × Width × installed price per ft² (by insulation type)",
    steps: [
      { title: "Measure the surface", detail: "Multiply length × width for walls, or the attic floor area." },
      { title: "Pick an insulation type", detail: "Batts are cheapest; spray foam gives the highest R-value per inch and air-seals." },
      { title: "Check the R-value target", detail: "Aim for R-38 to R-60 in attics and R-13 to R-21 in walls, depending on climate." },
      { title: "Estimate cost", detail: "Multiply the area by the installed price per square foot for your type." },
    ],
    example: "A 30 ft × 20 ft attic = 600 ft². With fiberglass batts at ~$1.50/ft², that's about $900 installed.",
    tables: [
      {
        title: "Insulation cost by type",
        caption: "Installed cost per square foot, including materials and labor.",
        columns: ["Type", "Cost per ft² (installed)", "R-value per inch", "Best for"],
        rows: [
          ["Fiberglass batt", "$1.00 – $2.40", "R-3.1", "Walls, budget jobs"],
          ["Blown-in cellulose", "$1.00 – $2.50", "R-3.5", "Attics, retrofits"],
          ["Closed-cell spray foam", "$3.00 – $7.00", "R-6.5", "Air-sealing, rim joists"],
        ],
      },
    ],
    mistakes: [
      { title: "Under-insulating the attic", detail: "The attic is where most heat is lost. Hitting R-38 to R-60 there gives the biggest energy savings." },
      { title: "Ignoring air sealing", detail: "Insulation slows heat flow but doesn't stop air leaks. Seal gaps and penetrations first for full performance." },
      { title: "Compressing batts", detail: "Squeezing batts into tight cavities lowers their R-value. Use the right thickness for the cavity." },
      { title: "Skipping the vapor barrier", detail: "In cold climates, a vapor barrier on the warm side prevents condensation inside walls." },
    ],
    faqs: [
      { question: "How much insulation do I need?", answer: "Measure the area and target the right R-value for your climate — R-38 to R-60 in attics, R-13 to R-21 in walls." },
      { question: "Is spray foam worth the extra cost?", answer: "Closed-cell foam costs more but delivers the highest R-value per inch and air-seals, which can cut energy bills the most." },
      { question: "How much does it cost to insulate a house?", answer: "It depends on area and type — from about $1/ft² for batts to $7/ft² for spray foam, installed." },
    ],
    related: ["drywall-calculator", "siding-calculator"],
    guides: [
      { title: "How Much Does It Cost to Insulate a House?", href: "/guides/cost-to-insulate-a-house/" },
      { title: "Spray Foam vs Fiberglass Insulation", href: "/guides/spray-foam-vs-fiberglass-insulation/" },
      { title: "What R-Value Do I Need?", href: "/guides/what-r-value-do-i-need/" },
      { title: "Attic Insulation Cost", href: "/guides/attic-insulation-cost/" },
    ],
  },
  seo: {
    title: "Insulation Calculator — Cost by Type & Area | HomeCalcify",
    description: "Free insulation calculator. Enter your area and insulation type to get square footage and installed cost for batts, blown-in, or spray foam.",
  },
};

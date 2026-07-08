import type { CalculatorConfig, CalculatorResult } from "@/lib/calculator/types";
import { toNumber } from "@/lib/calculator/engine";
import { buildStates } from "@/config/locations";

/**
 * Concrete slab calculator.
 * Imperial: length/width in ft, thickness in inches → cubic yards.
 * Metric:   length/width in m,  thickness in cm    → cubic meters.
 * Includes a waste factor and bag-count estimates (60lb ≈ 0.45 ft³, 80lb ≈ 0.6 ft³).
 */
export const concreteCalculator: CalculatorConfig = {
  slug: "concrete-calculator",
  name: "Concrete Calculator",
  category: "concrete",
  categoryLabel: "Concrete",
  description:
    "Estimate the cubic yards (or meters) of concrete and the number of bags you need for a slab, footing, or patio.",
  supportsUnits: true,
  cpc: "high",
  keywords: ["concrete calculator", "concrete cost", "how much concrete do i need", "concrete slab cost", "ready mix concrete price"],
  howtoAction: "pour-concrete",
  howto: {
    tools: ["Tape measure", "Wheelbarrow", "Screed board", "Bull float", "Edging trowel"],
    materials: ["Ready-mix or bagged concrete", "Gravel base", "Rebar or wire mesh", "Form lumber & stakes"],
  },
  locations: buildStates({
    texas: "Texas has abundant ready-mix suppliers and low labor costs, so slabs and driveways run below the national average — though expansive clay soils make a proper base and reinforcement essential.",
    california: "California's high labor rates, permit fees, and seismic requirements push concrete costs well above average, especially in coastal metros.",
    florida: "Florida's slab-on-grade construction means concrete is everywhere; prices sit near the national average, with extra for hurricane-rated reinforcement.",
    "new-york": "New York's union labor and tight urban access raise concrete prices sharply, and winter pours need cold-weather admixtures and protection.",
    illinois: "Illinois freeze-thaw winters require air-entrained concrete and footings below the frost line, with labor slightly above the national average.",
  }),
  fields: [
    {
      id: "length",
      label: "Length",
      type: "number",
      unitLabel: { imperial: "ft", metric: "m" },
      placeholder: "e.g. 10",
      min: 0,
      step: 0.1,
    },
    {
      id: "width",
      label: "Width",
      type: "number",
      unitLabel: { imperial: "ft", metric: "m" },
      placeholder: "e.g. 10",
      min: 0,
      step: 0.1,
    },
    {
      id: "thickness",
      label: "Thickness",
      type: "number",
      unitLabel: { imperial: "in", metric: "cm" },
      placeholder: "e.g. 4",
      defaultValue: 4,
      min: 0,
      step: 0.5,
    },
    {
      id: "waste",
      label: "Waste allowance",
      type: "select",
      defaultValue: "10",
      options: [
        { label: "None (0%)", value: "0" },
        { label: "Standard (10%)", value: "10" },
        { label: "Extra (15%)", value: "15" },
      ],
      help: "Accounts for spillage and uneven subgrade.",
    },
    {
      id: "price",
      label: "Price per unit",
      type: "number",
      unitLabel: { imperial: "$/yd³", metric: "$/m³" },
      placeholder: "Optional",
      required: false,
      help: "Override the default ready-mix price range.",
    },
  ],
  compute: ({ inputs, unit }) => {
    const length = toNumber(inputs.length);
    const width = toNumber(inputs.width);
    const thicknessRaw = toNumber(inputs.thickness);
    const wasteFactor = 1 + toNumber(inputs.waste) / 100;
    const price = toNumber(inputs.price);

    // Normalize thickness to the same linear unit as length/width, then volume.
    const thickness =
      unit === "imperial" ? thicknessRaw / 12 /* in→ft */ : thicknessRaw / 100; /* cm→m */
    const rawVolume = length * width * thickness; // ft³ or m³
    const volume = rawVolume * wasteFactor;

    const primaryUnit = unit === "imperial" ? "yd³" : "m³";
    const primaryValue = unit === "imperial" ? volume / 27 : volume; // ft³→yd³

    const results: CalculatorResult[] = [
      {
        id: "volume",
        label: "Concrete needed",
        value: primaryValue,
        unit: primaryUnit,
        precision: 2,
        primary: true,
        note: `Includes ${toNumber(inputs.waste)}% waste`,
      },
    ];

    // Bag estimates only make sense in imperial cubic feet.
    if (unit === "imperial") {
      results.push(
        {
          id: "bags60",
          label: "60 lb bags",
          value: Math.ceil(volume / 0.45),
          unit: "bags",
          precision: 0,
          note: "≈ 0.45 ft³ each",
        },
        {
          id: "bags80",
          label: "80 lb bags",
          value: Math.ceil(volume / 0.6),
          unit: "bags",
          precision: 0,
          note: "≈ 0.60 ft³ each",
        },
      );
    }

    // Always show a ready-mix cost range; a user price overrides it.
    const RANGE = unit === "imperial" ? [120, 165] : [157, 216]; // $/yd³ or $/m³
    const hasUserPrice = Number.isFinite(price) && price > 0;
    results.push({
      id: "cost",
      label: "Estimated concrete cost",
      value: primaryValue * (hasUserPrice ? price : RANGE[0]),
      valueHigh: hasUserPrice ? undefined : primaryValue * RANGE[1],
      format: "currency",
      precision: 0,
      highlight: true,
      note: hasUserPrice ? "Based on your price" : "Ready-mix material only — excludes labor & delivery",
    });

    return results;
  },
  content: {
    answer:
      "To find how much concrete you need, multiply length × width × thickness to get the volume, then convert to cubic yards (divide cubic feet by 27). Add 5–10% for waste. A 10×10 ft slab at 4 inches needs about 1.23 cubic yards, costing roughly $150–$220 in ready-mix.",
    quickFacts: [
      { label: "1 cubic yard", value: "27 ft³" },
      { label: "80 lb bag yield", value: "0.60 ft³" },
      { label: "Typical slab", value: '4" thick' },
    ],
    formula: "Volume (yd³) = (Length ft × Width ft × Thickness ft) ÷ 27 × waste factor",
    steps: [
      { title: "Measure the area", detail: "Record length and width in feet." },
      { title: "Set the thickness", detail: "Convert inches to feet by dividing by 12 (4 in = 0.333 ft)." },
      { title: "Calculate volume", detail: "Multiply length × width × thickness for cubic feet." },
      { title: "Convert to cubic yards", detail: "Divide cubic feet by 27." },
      { title: "Add waste", detail: "Multiply by 1.10 for a standard 10% allowance." },
    ],
    example:
      "A 10 ft × 10 ft slab at 4 in thick: 10 × 10 × 0.333 = 33.3 ft³ ÷ 27 = 1.23 yd³, plus 10% waste ≈ 1.36 yd³.",
    tables: [
      {
        title: "Concrete cost by slab size",
        caption: "Cubic yards and ready-mix material cost for a 4-inch slab. Add labor for a finished price.",
        columns: ["Slab size", "Cubic yards (4\")", "Ready-mix cost", "80 lb bags"],
        rows: [
          ["10 × 10 ft", "1.23 yd³", "$150 – $205", "~56"],
          ["12 × 12 ft", "1.78 yd³", "$215 – $295", "~80"],
          ["20 × 20 ft", "4.94 yd³", "$595 – $815", "—"],
          ["24 × 24 ft", "7.11 yd³", "$855 – $1,175", "—"],
        ],
      },
      {
        title: "Concrete bag yield",
        caption: "How much each bag size yields and how many make a cubic yard.",
        columns: ["Bag size", "Yield", "Bags per yd³"],
        rows: [
          ["40 lb", "0.30 ft³", "~90"],
          ["60 lb", "0.45 ft³", "~60"],
          ["80 lb", "0.60 ft³", "~45"],
        ],
      },
    ],
    mistakes: [
      { title: "Forgetting the waste factor", detail: "Uneven subgrade and spillage mean you always need a bit more. Add 5–10% so you don't run short mid-pour." },
      { title: "Using the wrong thickness", detail: "4 inches suits patios and walkways, but driveways need 5–6 inches. Too thin and the slab cracks under load." },
      { title: "Bag-mixing a large pour", detail: "Above ~1 cubic yard, mixing bags by hand is slow and risks cold joints. Order ready-mix instead." },
      { title: "Ignoring the base and rebar", detail: "A compacted gravel base and reinforcement aren't in the concrete volume but are essential — budget for them." },
    ],
    faqs: [
      {
        question: "How many bags of concrete are in a cubic yard?",
        answer:
          "A cubic yard is 27 cubic feet. With 80 lb bags (≈0.6 ft³ each) you need about 45 bags; with 60 lb bags (≈0.45 ft³) about 60 bags.",
      },
      {
        question: "How thick should a concrete slab be?",
        answer:
          "4 inches is standard for patios and walkways. Use 5–6 inches for driveways or anywhere vehicles will park.",
      },
      {
        question: "Should I order extra concrete?",
        answer:
          "Yes. Add 5–10% for spillage, uneven subgrade, and over-excavation. Running short mid-pour creates a cold joint.",
      },
      {
        question: "How do I use this as a footing concrete calculator?",
        answer:
          "For a footing, enter its length and width and set the thickness to the footing's depth. The calculator returns the cubic yards and 60 lb or 80 lb bag count the same way it does for a slab. For continuous footings, add up each run's length.",
      },
      {
        question: "How many 60 lb bags of concrete are in a yard?",
        answer:
          "A 60 lb bag yields about 0.45 cubic feet, so a full cubic yard (27 ft³) takes roughly 60 bags. An 80 lb bag yields about 0.60 ft³, or about 45 bags per yard.",
      },
    ],
    related: ["drywall-calculator", "paint-calculator"],
    guides: [
      { title: "How Much Concrete Do I Need?", href: "/guides/how-much-concrete-do-i-need/" },
      { title: "Concrete Bag Coverage Chart", href: "/guides/concrete-bag-coverage-chart/" },
      { title: "Concrete Slab Cost", href: "/guides/concrete-slab-cost/" },
      { title: "Concrete Driveway Cost", href: "/guides/concrete-driveway-cost/" },
      { title: "Bagged Concrete vs Ready Mix", href: "/guides/bagged-concrete-vs-ready-mix/" },
    ],
  },
  seo: {
    title: "Concrete Calculator — Cubic Yards, Bags & Cost | HomeCalcify",
    description:
      "Free concrete calculator. Enter length, width, and thickness to get cubic yards, bag count, and cost for slabs, footings, and patios. Imperial & metric.",
  },
};

/**
 * Category hubs (topical-authority silo centers).
 * A hub's `slug` matches the `category` field on its calculators, so the hub
 * page pulls its tools automatically from the calculator registry.
 */
export interface HubConfig {
  slug: string;
  name: string;
  /** Meta description + hub card copy. */
  description: string;
  /** Keyword-rich intro paragraph for the hub page. */
  intro: string;
  /** Bullet list of jobs this category's tools can estimate. */
  whatYouCanEstimate: string[];
  faqs: { question: string; answer: string }[];
  guides: { title: string; href: string }[];
  /** Sibling hub slugs for cross-linking. */
  relatedHubs: string[];
  seo?: { title?: string; description?: string };
}

export const hubs: HubConfig[] = [
  {
    slug: "concrete",
    name: "Concrete",
    description: "Concrete calculators and guides for slabs, footings, patios, and more.",
    intro:
      "Plan any concrete pour with confidence. Our concrete calculators turn your measurements into cubic yards, bag counts, and a ready-mix cost estimate in seconds — whether you're pouring a slab, setting fence posts, or forming footings. Below you'll find every concrete estimating tool plus practical guides on coverage, bag counts, and how much concrete you really need.",
    whatYouCanEstimate: [
      "Cubic yards of ready-mix for slabs and patios",
      "Number of 60 lb and 80 lb bags",
      "Concrete for footings, columns, and post holes",
      "Material cost before you order",
    ],
    faqs: [
      { question: "How much concrete do I need?", answer: "Multiply length × width × thickness, convert to cubic yards (divide cubic feet by 27), and add 5–10% waste. Use the concrete calculator above for exact figures." },
      { question: "Is it cheaper to mix my own concrete or order ready-mix?", answer: "For small jobs under about 1 cubic yard, bagged concrete is convenient. For larger pours, ready-mix delivery is usually cheaper and faster." },
    ],
    guides: [
      { title: "How Much Concrete Do I Need?", href: "/guides/how-much-concrete-do-i-need/" },
      { title: "Concrete Bag Coverage Chart", href: "/guides/concrete-bag-coverage-chart/" },
      { title: "Concrete Slab Cost", href: "/guides/concrete-slab-cost/" },
      { title: "Concrete Driveway Cost", href: "/guides/concrete-driveway-cost/" },
      { title: "Concrete Patio Cost", href: "/guides/concrete-patio-cost/" },
      { title: "How Thick Should a Concrete Slab Be?", href: "/guides/how-thick-should-a-concrete-slab-be/" },
      { title: "Bagged Concrete vs Ready Mix", href: "/guides/bagged-concrete-vs-ready-mix/" },
    ],
    relatedHubs: ["driveway-paving", "drywall"],
    seo: { title: "Concrete Calculators & Estimating Guides | HomeCalcify" },
  },
  {
    slug: "roofing",
    name: "Roofing",
    description: "Roofing calculators and guides for shingles, squares, and roof area.",
    intro:
      "Estimate your roof the way the pros do. Our roofing calculators convert your home's footprint and pitch into roof area, squares, and shingle bundles — so you order the right amount of material the first time. Explore the tools below alongside guides on measuring a roof and choosing materials.",
    whatYouCanEstimate: [
      "Roof area adjusted for pitch",
      "Roofing squares (100 sq ft each)",
      "Shingle bundles needed",
      "Material cost per square",
    ],
    faqs: [
      { question: "How do I measure my roof for shingles?", answer: "Measure the footprint length and width, multiply by a pitch factor for the true surface area, then divide by 100 to get squares. The roofing calculator does this for you." },
      { question: "How many bundles of shingles do I need?", answer: "Most architectural shingles come three bundles per square. Multiply your squares by three and round up." },
    ],
    guides: [
      { title: "How to Measure a Roof", href: "/guides/how-to-measure-a-roof/" },
      { title: "Roof Replacement Cost", href: "/guides/roof-replacement-cost/" },
      { title: "Metal Roof Cost", href: "/guides/metal-roof-cost/" },
      { title: "How Many Bundles of Shingles Per Square?", href: "/guides/how-many-bundles-of-shingles-per-square/" },
      { title: "How Long Does a Roof Last?", href: "/guides/how-long-does-a-roof-last/" },
      { title: "Roof Pitch Explained", href: "/guides/roof-pitch-explained/" },
      { title: "3-Tab vs Architectural Shingles", href: "/guides/3-tab-vs-architectural-shingles/" },
    ],
    relatedHubs: ["concrete", "painting"],
    seo: { title: "Roofing Calculators & Shingle Estimating Guides | HomeCalcify" },
  },
  {
    slug: "flooring",
    name: "Flooring",
    description: "Flooring and tile calculators for square footage, boxes, and tiles.",
    intro:
      "Get the exact amount of flooring for any room. Our flooring and tile calculators handle laminate, hardwood, vinyl plank, and ceramic tile — converting room dimensions into square footage, boxes, or tile counts with the right waste allowance. Browse the tools and guides below to plan your install.",
    whatYouCanEstimate: [
      "Square footage with waste allowance",
      "Number of flooring boxes",
      "Tile counts for floors and walls",
      "Material cost per square foot",
    ],
    faqs: [
      { question: "How much extra flooring should I buy?", answer: "Add 10% for standard layouts and 15% for diagonal or patterned installs to cover cuts and future repairs." },
      { question: "How do I calculate flooring for an irregular room?", answer: "Split the room into rectangles, calculate each area, add them together, then apply your waste factor." },
    ],
    guides: [
      { title: "Flooring Installation Cost Guide", href: "/guides/flooring-installation-cost/" },
      { title: "How Many Tiles Do I Need?", href: "/guides/how-many-tiles-do-i-need/" },
    ],
    relatedHubs: ["painting", "concrete"],
    seo: { title: "Flooring & Tile Calculators | HomeCalcify" },
  },
  {
    slug: "painting",
    name: "Painting",
    description: "Paint calculators and guides for interior and exterior projects.",
    intro:
      "Buy the right amount of paint — no half-empty cans, no mid-job runs to the store. Our paint calculators estimate gallons or liters from your room size, number of coats, and openings. Use the tools and guides below to plan interior and exterior painting projects.",
    whatYouCanEstimate: [
      "Gallons or liters of paint by room",
      "Coverage for one, two, or three coats",
      "Wall area minus doors and windows",
      "Paint cost for the project",
    ],
    faqs: [
      { question: "How much paint do I need for a room?", answer: "Calculate wall area (perimeter × height), subtract openings, multiply by coats, and divide by 350 sq ft per gallon. The paint calculator does this instantly." },
      { question: "How many coats of paint should I apply?", answer: "Two coats is standard for even, durable color — especially over fresh drywall or a different base color." },
    ],
    guides: [{ title: "How Much Paint Do I Need?", href: "/guides/how-much-paint-do-i-need/" }],
    relatedHubs: ["flooring", "drywall"],
    seo: { title: "Paint Calculators & Painting Guides | HomeCalcify" },
  },
  {
    slug: "drywall",
    name: "Drywall",
    description: "Drywall calculators for sheets, joint compound, tape, and screws.",
    intro:
      "Estimate everything you need to hang and finish drywall. Our drywall calculator turns room dimensions into sheet counts plus joint compound, tape, and screws — with a waste allowance built in. Find the tool and supporting guides below.",
    whatYouCanEstimate: [
      "Drywall sheets (4×8, 4×10, 4×12)",
      "Joint compound and tape",
      "Screws per project",
      "Walls with or without the ceiling",
    ],
    faqs: [
      { question: "How many drywall sheets do I need?", answer: "Divide the total wall and ceiling area (plus 10% waste) by the sheet coverage — 32 sq ft for a standard 4×8 sheet." },
      { question: "How much joint compound do I need?", answer: "Budget about 0.053 lb of all-purpose compound per square foot of drywall, or roughly one 5-gallon bucket per 12 sheets." },
    ],
    guides: [{ title: "How Much Drywall Do I Need?", href: "/guides/how-much-drywall-do-i-need/" }],
    relatedHubs: ["painting", "concrete"],
    seo: { title: "Drywall Calculators & Estimating Guides | HomeCalcify" },
  },
  {
    slug: "landscaping",
    name: "Landscaping",
    description: "Landscaping calculators for mulch, soil, and ground cover.",
    intro:
      "Cover your beds and yard without over-ordering. Our landscaping calculators convert bed dimensions and depth into cubic yards and bags of mulch, soil, and ground cover. Explore the tools and guides below to plan your next outdoor project.",
    whatYouCanEstimate: [
      "Cubic yards and bags of mulch",
      "Coverage area at any depth",
      "Bulk vs bagged material",
      "Material cost for the bed",
    ],
    faqs: [
      { question: "How much mulch do I need?", answer: "Multiply bed length × width × depth in feet, then divide by 27 for cubic yards. A 2–3 inch layer is ideal for most beds." },
      { question: "How many bags of mulch make a yard?", answer: "It takes about 13.5 standard 2 cubic-foot bags to equal one cubic yard." },
    ],
    guides: [{ title: "How Much Mulch Do I Need?", href: "/guides/how-much-mulch-do-i-need/" }],
    relatedHubs: ["concrete", "driveway-paving"],
    seo: { title: "Landscaping & Mulch Calculators | HomeCalcify" },
  },
  {
    slug: "driveway-paving",
    name: "Driveway & Paving",
    description: "Asphalt and paving calculators for driveways and lots.",
    intro:
      "Plan your driveway or parking area with accurate material estimates. Our paving calculators convert dimensions and thickness into tons of asphalt — and our guides help you compare asphalt and concrete. Find the tools and comparisons below.",
    whatYouCanEstimate: [
      "Tons of hot-mix asphalt",
      "Paved area and volume",
      "Coverage at 2–4 inch thickness",
      "Material cost per ton",
    ],
    faqs: [
      { question: "How many tons of asphalt do I need?", answer: "Multiply area × thickness for volume, multiply by ~145 lb/ft³, then divide by 2,000. A typical driveway needs 8–12 tons." },
      { question: "Is asphalt or concrete better for a driveway?", answer: "Asphalt costs less up front and is faster to install; concrete lasts longer and needs less maintenance. See our comparison guide." },
    ],
    guides: [{ title: "Asphalt vs Concrete Driveway", href: "/guides/asphalt-vs-concrete-driveway/" }],
    relatedHubs: ["concrete", "landscaping"],
    seo: { title: "Driveway & Asphalt Paving Calculators | HomeCalcify" },
  },
  {
    slug: "insulation",
    name: "Insulation",
    description: "Insulation calculators and cost guides for walls, attics, and whole homes.",
    intro:
      "Cut energy bills with the right amount of insulation. Our insulation calculators turn your wall or attic area into material and installed-cost estimates for fiberglass batts, blown-in cellulose, and spray foam — with the R-value targets for your climate. Explore the tools and cost guides below.",
    whatYouCanEstimate: [
      "Square footage to insulate",
      "Cost by insulation type",
      "R-value targets for walls and attics",
      "Batt, blown-in, and spray foam pricing",
    ],
    faqs: [
      { question: "How much insulation do I need?", answer: "Measure the area and target the right R-value — R-38 to R-60 in attics and R-13 to R-21 in walls, depending on climate." },
      { question: "What is the cheapest insulation?", answer: "Fiberglass batts have the lowest installed cost; blown-in is best for attics and retrofits." },
    ],
    guides: [],
    relatedHubs: ["drywall", "siding"],
    seo: { title: "Insulation Calculators & Cost Guides | HomeCalcify" },
  },
  {
    slug: "siding",
    name: "Siding",
    description: "Siding calculators and cost guides for vinyl, fiber-cement, and more.",
    intro:
      "Get your exterior right with accurate siding estimates. Our siding calculators convert your home's dimensions into wall area, squares, and installed cost across vinyl, fiber-cement, engineered wood, and brick. Find the tools and material cost comparisons below.",
    whatYouCanEstimate: [
      "Wall area and siding squares",
      "Cost by siding material",
      "Waste for corners and openings",
      "Vinyl vs fiber-cement pricing",
    ],
    faqs: [
      { question: "How much siding do I need?", answer: "Multiply the wall perimeter by height, add 10–15% for waste, and divide by 100 for squares." },
      { question: "What is the cheapest siding?", answer: "Vinyl siding has the lowest installed cost and the least maintenance." },
    ],
    guides: [],
    relatedHubs: ["insulation", "roofing"],
    seo: { title: "Siding Calculators & Cost Guides | HomeCalcify" },
  },
];

export const hubMap: Record<string, HubConfig> = Object.fromEntries(
  hubs.map((h) => [h.slug, h]),
);

export function getHub(slug: string): HubConfig | undefined {
  return hubMap[slug];
}

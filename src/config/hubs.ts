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
  /** Long-form editorial body — overview, cost factors, materials, tips. */
  body?: {
    heading: string;
    paragraphs?: string[];
    bullets?: string[];
    table?: { columns: string[]; rows: string[][] };
  }[];
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
    body: [
      {
        heading: "How to estimate concrete for any project",
        paragraphs: [
          "Every concrete estimate starts with volume. Measure the length, width, and thickness of your pour in feet, multiply them together for cubic feet, then divide by 27 to get cubic yards — the unit ready-mix is sold in. A 10 × 10 ft slab at 4 inches thick works out to about 1.23 cubic yards. Because subgrade is never perfectly level and some concrete is always lost to spillage, add 5–10% to whatever the math gives you.",
          "The calculators on this page handle that arithmetic for you and go a step further, converting the volume into the number of 60 lb or 80 lb bags for small jobs and a ready-mix cost range for larger ones. That makes it easy to decide between mixing bags by hand and ordering a truck.",
        ],
      },
      {
        heading: "What drives concrete cost",
        paragraphs: [
          "Ready-mix concrete runs roughly $120 to $165 per cubic yard for the material alone, but the delivered, finished price is higher once you add labor, base prep, reinforcement, and any decorative finish. Knowing where the money goes helps you read a contractor quote and spot where you can save.",
        ],
        table: {
          columns: ["Cost factor", "Typical impact", "Notes"],
          rows: [
            ["Ready-mix material", "$120–$165 / yd³", "Base cost before labor"],
            ["Labor & finishing", "$2–$5 / ft²", "Forming, pouring, screeding, finishing"],
            ["Gravel base", "$1–$2 / ft²", "Compacted sub-base for drainage"],
            ["Reinforcement", "$0.15–$0.30 / ft²", "Rebar or wire mesh"],
            ["Decorative finish", "+$3–$8 / ft²", "Stamped, stained, or exposed aggregate"],
          ],
        },
      },
      {
        heading: "Slab, footing, or bags — which tool to use",
        bullets: [
          "Slabs and patios: use the concrete calculator with your length, width, and 4-inch thickness.",
          "Driveways and garage floors: bump the thickness to 5–6 inches for vehicle loads.",
          "Footings and post holes: enter the footing depth as the thickness and sum each run.",
          "Small repairs: the bag counts tell you exactly how many 60 lb or 80 lb bags to buy.",
        ],
      },
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
    body: [
      {
        heading: "How roof measurement works",
        paragraphs: [
          "Roofers estimate in squares, where one square equals 100 square feet of roof surface. The tricky part is that your roof is bigger than the footprint of your house because of the slope. To get the true area you measure the footprint, then multiply by a pitch factor — 1.118 for a common 6:12 roof, more for steeper pitches. Divide the result by 100 for squares and add 10–15% for waste around valleys, hips, and cuts.",
          "Our roofing calculators do this automatically, turning a footprint and pitch into squares, shingle bundles, and a material cost so you can order confidently without climbing onto the roof with a tape measure.",
        ],
      },
      {
        heading: "Roofing material costs compared",
        paragraphs: [
          "Asphalt shingles dominate residential roofing because they balance price and lifespan, but metal, tile, and premium options last far longer for a higher upfront cost. Here's how the common choices stack up per square installed.",
        ],
        table: {
          columns: ["Material", "Cost per square (installed)", "Lifespan"],
          rows: [
            ["3-tab asphalt shingles", "$350 – $500", "15–20 yrs"],
            ["Architectural shingles", "$450 – $700", "25–30 yrs"],
            ["Standing-seam metal", "$900 – $1,600", "40–70 yrs"],
            ["Clay or concrete tile", "$1,000 – $2,000", "50+ yrs"],
          ],
        },
      },
      {
        heading: "Estimating tips for an accurate order",
        bullets: [
          "Always measure the true surface area, not the ground footprint — pitch adds 5–40%.",
          "Order shingles by the square; architectural shingles come three bundles per square.",
          "Add 10% waste for a simple gable roof, 15% for cut-up roofs with valleys.",
          "Don't forget underlayment, drip edge, ridge cap, and flashing in your budget.",
        ],
      },
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
    body: [
      {
        heading: "How to measure a room for flooring",
        paragraphs: [
          "Flooring is sold by the square foot and boxed in fixed coverage amounts, so the goal is to know your area precisely and then round up to whole boxes. Measure the length and width of the room in feet and multiply them; for L-shaped or irregular rooms, split the space into rectangles, calculate each, and add them together. Then add a waste allowance — 10% for straight-lay planks and up to 15% for diagonal or herringbone patterns that create more offcuts.",
          "Our flooring and tile calculators convert those measurements into square footage, the number of boxes, or a tile count, and give a cost estimate so you can compare materials before you buy.",
        ],
      },
      {
        heading: "Flooring cost by material",
        paragraphs: [
          "Material is the biggest cost lever. Laminate and vinyl plank are the budget-friendly, DIY-friendly options, while engineered and solid hardwood cost more but add lasting value. Tile sits across a wide range depending on whether it's basic ceramic or premium porcelain.",
        ],
        table: {
          columns: ["Flooring type", "Installed cost / ft²", "Best for"],
          rows: [
            ["Laminate", "$2 – $6", "Budget, DIY"],
            ["Luxury vinyl plank", "$3 – $7", "Moisture-prone rooms"],
            ["Engineered wood", "$5 – $10", "Wood look with stability"],
            ["Solid hardwood", "$6 – $15", "Long-term value"],
            ["Ceramic / porcelain tile", "$7 – $14", "Baths, kitchens, entries"],
          ],
        },
      },
      {
        heading: "Ordering tips",
        bullets: [
          "Buy an extra sealed box so future repairs match the dye lot.",
          "Include closets, doorways, and under-appliance areas the floor runs into.",
          "Factor in underlayment, transition strips, and removal of the old floor.",
          "Round tile counts up per box — partial boxes usually can't be returned.",
        ],
      },
    ],
    faqs: [
      { question: "How much extra flooring should I buy?", answer: "Add 10% for standard layouts and 15% for diagonal or patterned installs to cover cuts and future repairs." },
      { question: "How do I calculate flooring for an irregular room?", answer: "Split the room into rectangles, calculate each area, add them together, then apply your waste factor." },
    ],
    guides: [
      { title: "Flooring Installation Cost", href: "/guides/flooring-installation-cost/" },
      { title: "How to Measure a Room for Flooring", href: "/guides/how-to-measure-a-room-for-flooring/" },
      { title: "Laminate vs Vinyl Plank Flooring", href: "/guides/laminate-vs-vinyl-plank-flooring/" },
      { title: "Hardwood Flooring Cost", href: "/guides/hardwood-flooring-cost/" },
      { title: "How Many Tiles Do I Need?", href: "/guides/how-many-tiles-do-i-need/" },
      { title: "Cost to Tile a Bathroom", href: "/guides/cost-to-tile-a-bathroom/" },
      { title: "Cost to Tile a Floor", href: "/guides/cost-to-tile-a-floor/" },
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
    body: [
      {
        heading: "How much paint do you really need?",
        paragraphs: [
          "A gallon of paint covers about 350 square feet in one coat on a smooth surface — less on rough or porous walls. To estimate a room, add up the wall area (perimeter × ceiling height), subtract large openings like doors and windows, multiply by the number of coats, and divide by 350. Most jobs need two coats for even color and durability, especially over fresh drywall or a big color change.",
          "Our paint calculators run those numbers for you and add a cost estimate, so you can buy the right number of cans the first time instead of guessing at the store.",
        ],
      },
      {
        heading: "Interior vs exterior painting costs",
        paragraphs: [
          "Exterior work costs more per square foot than interior because of prep, height, and the more durable paint required. Understanding the ranges helps you budget and compare quotes.",
        ],
        table: {
          columns: ["Project", "Typical cost", "Notes"],
          rows: [
            ["Interior room", "$300 – $800", "Walls, ceiling, trim"],
            ["Whole interior (avg home)", "$2,000 – $6,000", "Depends on square footage"],
            ["Exterior (avg 2-story home)", "$3,000 – $10,000", "Prep and height add cost"],
            ["Paint material", "$25 – $60 / gallon", "Quality affects coverage & life"],
          ],
        },
      },
      {
        heading: "Tips for a better paint estimate",
        bullets: [
          "Plan for two coats — one coat rarely gives even coverage.",
          "Rough or textured surfaces reduce coverage; buy a little extra.",
          "Don't forget primer on bare drywall, patches, or drastic color changes.",
          "Keep leftover paint labeled for touch-ups down the road.",
        ],
      },
    ],
    faqs: [
      { question: "How much paint do I need for a room?", answer: "Calculate wall area (perimeter × height), subtract openings, multiply by coats, and divide by 350 sq ft per gallon. The paint calculator does this instantly." },
      { question: "How many coats of paint should I apply?", answer: "Two coats is standard for even, durable color — especially over fresh drywall or a different base color." },
    ],
    guides: [
      { title: "How Much Paint Do I Need?", href: "/guides/how-much-paint-do-i-need/" },
      { title: "Cost to Paint a House Interior", href: "/guides/cost-to-paint-a-house-interior/" },
      { title: "Exterior Painting Cost", href: "/guides/exterior-painting-cost/" },
      { title: "How Many Coats of Paint Do You Need?", href: "/guides/how-many-coats-of-paint/" },
      { title: "Best Paint Finish for Walls", href: "/guides/best-paint-finish-for-walls/" },
    ],
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
    body: [
      {
        heading: "How to estimate drywall and supplies",
        paragraphs: [
          "Drywall is estimated by surface area. Add up the wall area (perimeter × ceiling height) plus the ceiling if you're covering it, add about 10% for waste and cuts, then divide by the coverage of your sheet size — 32 sq ft for a standard 4×8 sheet, 40 for a 4×10, and 48 for a 4×12. Larger sheets mean fewer seams to tape but are heavier to handle.",
          "Our drywall calculator does this and also estimates the supporting materials — joint compound, tape, and screws — so nothing gets forgotten on the supply run. Enter your room dimensions and choose whether to include the ceiling.",
        ],
      },
      {
        heading: "What a drywall job costs",
        paragraphs: [
          "The board itself is cheap; labor to hang, tape, mud, and sand is where most of the cost lives. Knowing the split helps you decide what to DIY and what to hire out.",
        ],
        table: {
          columns: ["Item", "Typical cost", "Notes"],
          rows: [
            ["4×8 drywall sheet", "$12 – $18", "Standard 1/2-inch board"],
            ["Hang only (labor)", "$0.50 – $1.00 / ft²", "Board fastened to studs"],
            ["Hang + finish", "$1.50 – $3.50 / ft²", "Taped, mudded, sanded"],
            ["Joint compound", "~1 bucket / 12 sheets", "All-purpose"],
          ],
        },
      },
      {
        heading: "Estimating tips",
        bullets: [
          "Include the ceiling area — it's easy to overlook and adds up fast.",
          "Use larger 4×12 sheets on long walls to cut down on taped seams.",
          "Budget roughly one 5-gallon bucket of compound per 12 sheets.",
          "Hang it yourself and hire out finishing if you want a paint-ready wall.",
        ],
      },
    ],
    faqs: [
      { question: "How many drywall sheets do I need?", answer: "Divide the total wall and ceiling area (plus 10% waste) by the sheet coverage — 32 sq ft for a standard 4×8 sheet." },
      { question: "How much joint compound do I need?", answer: "Budget about 0.053 lb of all-purpose compound per square foot of drywall, or roughly one 5-gallon bucket per 12 sheets." },
    ],
    guides: [
      { title: "How Much Drywall Do I Need?", href: "/guides/how-much-drywall-do-i-need/" },
      { title: "Cost to Drywall a Room", href: "/guides/cost-to-drywall-a-room/" },
      { title: "Drywall vs Plaster", href: "/guides/drywall-vs-plaster/" },
      { title: "Drywall Finishing Levels Explained", href: "/guides/drywall-finishing-levels/" },
    ],
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
    body: [
      {
        heading: "How to calculate mulch and ground cover",
        paragraphs: [
          "Mulch and soil are sold by the cubic yard in bulk and by the bag at the store, so the first step is finding the volume of your beds. Multiply the bed's length × width × the depth you want (in feet — a 3-inch layer is 0.25 ft), then divide by 27 to convert cubic feet to cubic yards. One cubic yard covers about 108 square feet at 3 inches deep.",
          "Our landscaping calculators turn bed dimensions and depth into cubic yards, the number of bags, and a material cost, so you can compare buying in bulk versus bags and avoid the classic mistake of ordering far too little.",
        ],
      },
      {
        heading: "Bulk vs bagged mulch",
        paragraphs: [
          "Bagged mulch is convenient for small beds, but bulk delivery is dramatically cheaper once you need more than about a cubic yard. Here's a quick reference.",
        ],
        table: {
          columns: ["Amount", "Bags (2 ft³)", "Coverage at 3\"", "Typical bulk cost"],
          rows: [
            ["1 yd³", "~13.5 bags", "~108 ft²", "$30 – $50"],
            ["3 yd³", "~40 bags", "~324 ft²", "$90 – $150"],
            ["5 yd³", "~68 bags", "~540 ft²", "$150 – $250"],
          ],
        },
      },
      {
        heading: "Mulching tips",
        bullets: [
          "Keep mulch 2–3 inches deep — deeper can suffocate roots.",
          "Leave a gap around trunks and stems to prevent rot.",
          "Refresh color and depth once a year, usually in spring.",
          "Bulk delivery beats bags on price for anything over a cubic yard.",
        ],
      },
    ],
    faqs: [
      { question: "How much mulch do I need?", answer: "Multiply bed length × width × depth in feet, then divide by 27 for cubic yards. A 2–3 inch layer is ideal for most beds." },
      { question: "How many bags of mulch make a yard?", answer: "It takes about 13.5 standard 2 cubic-foot bags to equal one cubic yard." },
    ],
    guides: [
      { title: "How Much Mulch Do I Need?", href: "/guides/how-much-mulch-do-i-need/" },
      { title: "How Much Does Mulch Cost?", href: "/guides/how-much-does-mulch-cost/" },
      { title: "Mulch vs Rock", href: "/guides/mulch-vs-rock/" },
      { title: "Best Time to Mulch Your Garden", href: "/guides/best-time-to-mulch/" },
    ],
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
    body: [
      {
        heading: "How to estimate asphalt tonnage",
        paragraphs: [
          "Asphalt is ordered by the ton, so a driveway estimate is really a weight calculation. Find the volume by multiplying length × width × thickness in feet (3 inches is 0.25 ft), multiply that by the density of hot-mix asphalt — about 145 pounds per cubic foot — and divide by 2,000 to convert pounds to tons. A 50 × 12 ft driveway at 3 inches works out to roughly 11 tons.",
          "Our paving calculators handle the conversion and add an installed-cost range, so you can budget a driveway or parking area and compare it against concrete before committing.",
        ],
      },
      {
        heading: "Driveway material comparison",
        paragraphs: [
          "Asphalt, concrete, and gravel each hit a different balance of upfront cost, lifespan, and maintenance. The right choice depends on your climate and budget.",
        ],
        table: {
          columns: ["Material", "Cost / ft² (installed)", "Lifespan", "Maintenance"],
          rows: [
            ["Gravel", "$1 – $3", "Ongoing", "Regrade & top up yearly"],
            ["Asphalt", "$3 – $7", "15–20 yrs", "Reseal every 3–5 yrs"],
            ["Concrete", "$4 – $8", "30+ yrs", "Low, occasional sealing"],
          ],
        },
      },
      {
        heading: "Paving tips",
        bullets: [
          "A compacted gravel base is as important as the asphalt thickness itself.",
          "Use 2–3 inches of asphalt for cars, 4+ inches for heavy vehicles.",
          "Seal a new asphalt driveway after the first year, then every few years.",
          "Grade for drainage — standing water shortens any driveway's life.",
        ],
      },
    ],
    faqs: [
      { question: "How many tons of asphalt do I need?", answer: "Multiply area × thickness for volume, multiply by ~145 lb/ft³, then divide by 2,000. A typical driveway needs 8–12 tons." },
      { question: "Is asphalt or concrete better for a driveway?", answer: "Asphalt costs less up front and is faster to install; concrete lasts longer and needs less maintenance. See our comparison guide." },
    ],
    guides: [
      { title: "Asphalt vs Concrete Driveway", href: "/guides/asphalt-vs-concrete-driveway/" },
      { title: "Asphalt Driveway Cost", href: "/guides/asphalt-driveway-cost/" },
      { title: "Gravel Driveway Cost", href: "/guides/gravel-driveway-cost/" },
      { title: "Cost to Pave a Driveway", href: "/guides/cost-to-pave-a-driveway/" },
      { title: "How Thick Should an Asphalt Driveway Be?", href: "/guides/how-thick-should-an-asphalt-driveway-be/" },
    ],
    relatedHubs: ["concrete", "landscaping"],
    seo: { title: "Driveway & Asphalt Paving Calculators | HomeCalcify" },
  },
  {
    slug: "insulation",
    name: "Insulation",
    description: "Insulation calculators and cost guides for walls, attics, and whole homes.",
    intro:
      "Cut energy bills with the right amount of insulation. Use our tools as a wall insulation calculator, a whole house insulation calculator, or a blown-in insulation estimator. Enter your square feet and insulation type. You get material and installed-cost estimates for fiberglass batts, blown-in cellulose insulation, and spray foam. Each result includes the R-value target for your climate, so you can meet local building codes. Explore the tools and cost guides below.",
    whatYouCanEstimate: [
      "Square footage to insulate (walls or attic)",
      "Cost by insulation type",
      "R-value targets for walls and attics",
      "Batt, blown-in cellulose, and spray foam pricing",
    ],
    body: [
      {
        heading: "How to estimate insulation",
        paragraphs: [
          "Insulation is estimated by the square foot of the surface you're covering — a wall, or the attic floor. Measure length × width for the area, then choose an insulation type based on the R-value your climate needs. R-value measures resistance to heat flow: most attics target R-38 to R-60, while walls need R-13 to R-21. Higher R-value means more material or a higher-performance product like spray foam.",
          "Our insulation calculator converts your area and chosen type into a material and installed-cost estimate, so you can compare fiberglass batts, blown-in cellulose, and spray foam side by side before hiring a contractor or buying supplies.",
        ],
      },
      {
        heading: "Insulation types and cost",
        paragraphs: [
          "The three common options trade off price against performance. Batts are cheapest and DIY-friendly, blown-in is ideal for attics and retrofits, and spray foam delivers the highest R-value per inch while air-sealing at the same time.",
        ],
        table: {
          columns: ["Type", "Installed cost / ft²", "R-value per inch", "Best for"],
          rows: [
            ["Fiberglass batt", "$1.00 – $2.40", "R-3.1", "Walls, budget jobs"],
            ["Blown-in cellulose", "$1.00 – $2.50", "R-3.5", "Attics, retrofits"],
            ["Closed-cell spray foam", "$3.00 – $7.00", "R-6.5", "Air-sealing, rim joists"],
          ],
        },
      },
      {
        heading: "Insulation tips",
        bullets: [
          "The attic gives the biggest energy return — insulate it first.",
          "Air-seal gaps and penetrations before adding insulation for full effect.",
          "Don't compress batts; squeezing them into tight cavities lowers R-value.",
          "In cold climates, use a vapor barrier on the warm side of the wall.",
        ],
      },
    ],
    faqs: [
      { question: "How much insulation do I need?", answer: "Measure the area in square feet and target the right R-value — R-38 to R-60 in attics and R-13 to R-21 in walls, depending on climate and local building codes." },
      { question: "What is the cheapest insulation?", answer: "Fiberglass batts have the lowest installed cost. Blown-in cellulose is best for attics and retrofits, and it fills gaps that batts miss." },
      { question: "How much does blown-in insulation cost?", answer: "Blown-in cellulose runs about $1 to $2.50 per square foot installed. Use the insulation calculator as a blown insulation cost calculator by picking the blown-in type." },
      { question: "How do I calculate wall insulation?", answer: "Multiply the wall length by its height for the square footage. Then pick your insulation type in the wall insulation calculator to get the material and cost." },
    ],
    guides: [
      { title: "How Much Does It Cost to Insulate a House?", href: "/guides/cost-to-insulate-a-house/" },
      { title: "Spray Foam vs Fiberglass Insulation", href: "/guides/spray-foam-vs-fiberglass-insulation/" },
      { title: "What R-Value Do I Need?", href: "/guides/what-r-value-do-i-need/" },
      { title: "Attic Insulation Cost", href: "/guides/attic-insulation-cost/" },
    ],
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
    body: [
      {
        heading: "How to estimate siding",
        paragraphs: [
          "Siding is measured in squares, where one square covers 100 square feet of wall. Find your wall area by multiplying the home's perimeter by its height, then add 10% for simple walls or 15% for homes with lots of corners, gables, and openings that create more cut waste. Divide the total by 100 to get squares — the unit siding is ordered and priced in.",
          "Our siding calculator turns your home's dimensions into wall area, squares, and an installed cost across vinyl, fiber-cement, engineered wood, and brick, so you can compare materials and budget accurately before getting quotes.",
        ],
      },
      {
        heading: "Siding material comparison",
        paragraphs: [
          "Siding choices range from budget vinyl to premium brick veneer. Each balances upfront cost, durability, and maintenance differently.",
        ],
        table: {
          columns: ["Material", "Cost / ft² (installed)", "Lifespan", "Best for"],
          rows: [
            ["Vinyl", "$4 – $8", "20–40 yrs", "Budget, low maintenance"],
            ["Engineered wood", "$5 – $11", "20–30 yrs", "Wood look, lighter"],
            ["Fiber-cement", "$6 – $13", "30–50 yrs", "Durability, fire zones"],
            ["Brick veneer", "$10 – $20", "75+ yrs", "Premium, longevity"],
          ],
        },
      },
      {
        heading: "Siding tips",
        bullets: [
          "Measure gable ends separately — a simple perimeter × height misses them.",
          "Budget for trim, J-channel, corner posts, and starter strip.",
          "Always install house wrap behind siding to manage moisture.",
          "Fiber-cement is worth the premium in fire-prone or humid regions.",
        ],
      },
    ],
    faqs: [
      { question: "How much siding do I need?", answer: "Multiply the wall perimeter by height, add 10–15% for waste, and divide by 100 for squares." },
      { question: "What is the cheapest siding?", answer: "Vinyl siding has the lowest installed cost and the least maintenance." },
    ],
    guides: [
      { title: "How Much Does Siding Cost?", href: "/guides/how-much-does-siding-cost/" },
      { title: "Vinyl vs Fiber Cement Siding", href: "/guides/vinyl-vs-fiber-cement-siding/" },
      { title: "Best Siding for Cold Climates", href: "/guides/best-siding-for-cold-climates/" },
    ],
    relatedHubs: ["insulation", "roofing"],
    seo: { title: "Siding Calculators & Cost Guides | HomeCalcify" },
  },
  {
    slug: "decking",
    name: "Decking",
    description: "Deck calculators and cost guides for boards, framing, and materials.",
    intro:
      "Plan your deck build with accurate material estimates. Our deck calculator turns your dimensions and board size into deck boards, joists, screws, and an installed-cost range — for pressure-treated wood, cedar, or composite. Explore the tool and cost guides below.",
    whatYouCanEstimate: [
      "Deck boards and framing",
      "Joists and fasteners",
      "Cost by decking material",
      "Wood vs composite pricing",
    ],
    body: [
      {
        heading: "How to estimate deck materials",
        paragraphs: [
          "A deck estimate starts with the surface area — length × width — but the board count depends on the size of the decking you choose and the direction you run it. Divide the deck area by each board's coverage and add 5–10% for waste and cuts. Then there's the frame below: joists spaced 16 inches on center, beams, posts, and a footing at each post, plus hidden fasteners or screws.",
          "Our deck calculator pulls all of this together — deck boards, joists, fasteners, and an installed-cost range — from your dimensions and chosen material, so you can plan a pressure-treated, cedar, or composite build without guesswork.",
        ],
      },
      {
        heading: "Decking material comparison",
        paragraphs: [
          "The big decision is wood versus composite. Pressure-treated wood is cheapest upfront but needs regular sealing; composite costs more but barely needs maintenance and lasts decades.",
        ],
        table: {
          columns: ["Material", "Cost / ft² (installed)", "Maintenance", "Lifespan"],
          rows: [
            ["Pressure-treated wood", "$15 – $25", "Seal every 1–2 yrs", "10–15 yrs"],
            ["Cedar / redwood", "$20 – $35", "Seal periodically", "15–20 yrs"],
            ["Composite", "$25 – $45", "Rinse only", "25–30 yrs"],
          ],
        },
      },
      {
        heading: "Deck-building tips",
        bullets: [
          "Space joists 16 inches on center for standard decking.",
          "Use hidden fasteners with grooved composite boards for a clean look.",
          "Set posts on proper footings below the frost line.",
          "Add 5–10% to your board count for waste and picture-frame borders.",
        ],
      },
    ],
    faqs: [
      { question: "How many deck boards do I need?", answer: "Divide the deck area by each board's coverage (width × length) and add 5–10% for waste — a 192 sq ft deck needs roughly 45–55 boards." },
      { question: "How much does a deck cost?", answer: "About $15–$25 per square foot installed for pressure-treated wood and $25–$45 for composite." },
    ],
    guides: [
      { title: "How Much Does a Deck Cost?", href: "/guides/deck-cost/" },
      { title: "Composite vs Wood Decking", href: "/guides/composite-vs-wood-decking/" },
    ],
    relatedHubs: ["fencing", "concrete"],
    seo: { title: "Deck Calculators & Cost Guides | HomeCalcify" },
  },
  {
    slug: "fencing",
    name: "Fencing",
    description: "Fence calculators and cost guides for posts, panels, and materials.",
    intro:
      "Build your fence right with accurate material estimates. Our fence calculator turns your fence line and post spacing into posts, sections, rails, concrete, and an installed-cost range — for wood, vinyl, or chain link. Find the tool and cost comparisons below.",
    whatYouCanEstimate: [
      "Posts and sections",
      "Rails and concrete for posts",
      "Cost by fence material",
      "Wood vs vinyl pricing",
    ],
    body: [
      {
        heading: "How to estimate fence materials",
        paragraphs: [
          "Fencing is estimated along the fence line. Divide the total length by your post spacing — usually 8 feet — and add one for the final post to get the post count. The number of sections is the length divided by spacing, and most fences use two or three rails per section. Each post typically needs about two bags of fast-setting concrete to hold it firm.",
          "Our fence calculator turns your fence line and post spacing into posts, sections, rails, concrete, and an installed-cost range for wood, vinyl, or chain link — so you can price the whole project and compare materials before you dig a single hole.",
        ],
      },
      {
        heading: "Fence material comparison",
        paragraphs: [
          "Wood is the affordable, classic choice; vinyl costs more but never needs painting; chain link is the budget option for security and pet containment.",
        ],
        table: {
          columns: ["Material", "Cost / linear ft (installed)", "Maintenance", "Lifespan"],
          rows: [
            ["Chain link", "$10 – $20", "Very low", "15–20 yrs"],
            ["Wood (privacy)", "$20 – $45", "Stain/seal every 2–3 yrs", "15–20 yrs"],
            ["Vinyl", "$25 – $60", "Rinse only", "25–30 yrs"],
          ],
        },
      },
      {
        heading: "Fence-building tips",
        bullets: [
          "Set posts at least one-third of their height into the ground.",
          "Use fast-setting concrete — about two bags per post for stability.",
          "Check property lines and call 811 to locate utilities before digging.",
          "Space posts evenly at 6–8 feet for straight, sag-free runs.",
        ],
      },
    ],
    faqs: [
      { question: "How many fence posts do I need?", answer: "Divide the fence length by the post spacing (usually 8 ft) and add one — a 150 ft fence needs about 20 posts." },
      { question: "How much concrete per fence post?", answer: "About 2 bags of fast-setting concrete per post for a standard hole." },
    ],
    guides: [
      { title: "How Much Does a Fence Cost?", href: "/guides/fence-cost/" },
      { title: "Wood vs Vinyl Fence", href: "/guides/wood-vs-vinyl-fence/" },
    ],
    relatedHubs: ["decking", "concrete"],
    seo: { title: "Fence Calculators & Cost Guides | HomeCalcify" },
  },
];

export const hubMap: Record<string, HubConfig> = Object.fromEntries(
  hubs.map((h) => [h.slug, h]),
);

export function getHub(slug: string): HubConfig | undefined {
  return hubMap[slug];
}

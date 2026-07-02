import type { CalculatorConfig, CalculatorResult } from "@/lib/calculator/types";
import { toNumber } from "@/lib/calculator/engine";

/**
 * Deck calculator (imperial). Deck size + board size → deck boards, joists,
 * screws, and installed cost. `intents: []` — one clean page, no thin auto-pages.
 */
export const deckCalculator: CalculatorConfig = {
  slug: "deck-calculator",
  name: "Deck Calculator",
  category: "decking",
  categoryLabel: "Decking",
  description:
    "Estimate deck boards, joists, screws, and cost for a new deck from its dimensions and board size.",
  supportsUnits: false,
  cpc: "high",
  keywords: ["deck calculator", "deck cost calculator", "how many deck boards do i need", "decking calculator"],
  intents: [],
  fields: [
    { id: "length", label: "Deck length", type: "number", unitLabel: { imperial: "ft" }, placeholder: "e.g. 16", min: 0, step: 0.1 },
    { id: "width", label: "Deck width", type: "number", unitLabel: { imperial: "ft" }, placeholder: "e.g. 12", min: 0, step: 0.1 },
    { id: "boardWidth", label: "Board width", type: "number", unitLabel: { imperial: "in" }, defaultValue: 5.5, min: 1, step: 0.1, help: "Actual width — 5.5 in for a nominal 6-inch board." },
    { id: "boardLength", label: "Board length", type: "select", defaultValue: "12", options: [
      { label: "8 ft", value: "8" }, { label: "12 ft", value: "12" }, { label: "16 ft", value: "16" }, { label: "20 ft", value: "20" } ] },
    { id: "price", label: "Price per ft²", type: "number", unitLabel: { imperial: "$/ft²" }, placeholder: "Optional", required: false },
  ],
  compute: ({ inputs }) => {
    const length = toNumber(inputs.length);
    const width = toNumber(inputs.width);
    const boardWidth = toNumber(inputs.boardWidth) || 5.5;
    const boardLength = toNumber(inputs.boardLength) || 12;
    const price = toNumber(inputs.price);

    const deckArea = length * width;
    const gap = 0.25; // in
    const rows = Math.ceil((width * 12) / (boardWidth + gap));
    const boardsPerRow = Math.ceil(length / boardLength);
    const boards = Math.ceil(rows * boardsPerRow * 1.05); // 5% waste
    const joists = Math.ceil((length * 12) / 16) + 1; // 16 in on center
    const screws = Math.ceil(deckArea * 3.5); // ~350 per 100 ft²

    const results: CalculatorResult[] = [
      { id: "area", label: "Deck area", value: deckArea, unit: "ft²", precision: 0, primary: true },
      { id: "boards", label: "Deck boards", value: boards, unit: "boards", precision: 0, note: `${boardLength} ft, incl. 5% waste` },
      { id: "joists", label: "Joists", value: joists, unit: "joists", precision: 0, note: "16 in on center" },
      { id: "screws", label: "Deck screws", value: screws, unit: "screws", precision: 0 },
    ];
    const RANGE = [15, 45]; // $/ft² installed (pressure-treated → composite)
    const hasUserPrice = Number.isFinite(price) && price > 0;
    results.push({
      id: "cost",
      label: "Estimated installed cost",
      value: deckArea * (hasUserPrice ? price : RANGE[0]),
      valueHigh: hasUserPrice ? undefined : deckArea * RANGE[1],
      format: "currency",
      precision: 0,
      highlight: true,
      note: hasUserPrice ? "Based on your price" : "Pressure-treated to composite · materials + labor",
    });
    return results;
  },
  content: {
    answer:
      "To estimate deck materials, multiply length × width for the deck area, then divide by each board's coverage (width × length) to get the board count — add 5% for waste. Add joists at 16 inches on center and about 350 screws per 100 sq ft. A 16×12 ft deck (192 sq ft) needs roughly 45 boards, 13 joists, and 670 screws.",
    quickFacts: [
      { label: "Joist spacing", value: "16 in OC" },
      { label: "Board gap", value: "~¼ in" },
      { label: "Screws", value: "~350 per 100 ft²" },
    ],
    formula: "Deck area = Length × Width; Boards = (Width ÷ board width) × (Length ÷ board length) × waste",
    steps: [
      { title: "Measure the deck", detail: "Multiply length × width for the total surface area." },
      { title: "Pick a board size", detail: "Most deck boards are 5.5 in wide (nominal 6 in) in 8–20 ft lengths." },
      { title: "Count boards & joists", detail: "Divide by board coverage for boards; space joists 16 in on center." },
      { title: "Add fasteners & waste", detail: "About 350 screws per 100 sq ft, plus 5–10% waste for cuts." },
    ],
    example: "A 16 ft × 12 ft deck = 192 ft². With 5.5-in × 12-ft boards: ~27 rows × 2 = ~54 boards after waste; joists 16/12 ≈ 13; screws ~670.",
    tables: [
      {
        title: "Deck cost by material",
        caption: "Installed cost per square foot, including framing and labor.",
        columns: ["Decking", "Cost per ft² (installed)", "Lifespan", "Notes"],
        rows: [
          ["Pressure-treated wood", "$15 – $25", "10–15 yrs", "Cheapest, needs sealing"],
          ["Cedar / redwood", "$20 – $35", "15–20 yrs", "Natural look"],
          ["Composite", "$25 – $45", "25–30 yrs", "Low maintenance"],
          ["PVC / capped", "$30 – $60", "30+ yrs", "Most durable"],
        ],
      },
    ],
    mistakes: [
      { title: "Forgetting the framing", detail: "Joists, beams, posts, and footings aren't in the board count — they're a big part of the material list and cost." },
      { title: "Ignoring board gaps", detail: "Deck boards need a ~¼-inch gap for drainage and expansion, which affects how many boards fit." },
      { title: "Under-ordering fasteners", detail: "Face-screwed decks use ~350 screws per 100 sq ft; hidden fasteners have their own counts." },
      { title: "Skipping permits and footings", detail: "Most decks need a permit and proper footings below the frost line — plan for both." },
    ],
    faqs: [
      { question: "How many deck boards do I need?", answer: "Divide the deck area by each board's coverage (width × length), then add 5–10% for waste. A 192 sq ft deck needs roughly 45–55 boards." },
      { question: "How much does a deck cost?", answer: "About $15–$25 per square foot installed for pressure-treated wood and $25–$45 for composite." },
      { question: "How far apart should deck joists be?", answer: "16 inches on center is standard; 12 inches for some composite boards or diagonal patterns." },
    ],
    related: ["fence-calculator", "concrete-calculator"],
    guides: [
      { title: "How Much Does a Deck Cost?", href: "/guides/deck-cost/" },
      { title: "Composite vs Wood Decking", href: "/guides/composite-vs-wood-decking/" },
    ],
  },
  seo: {
    title: "Deck Calculator — Boards, Joists & Cost | HomeCalcify",
    description: "Free deck calculator. Enter your deck size to get deck boards, joists, screws, and installed cost for wood or composite.",
  },
};

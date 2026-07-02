const ExcelJS = require("exceljs");
const BLUE = "FF2563EB", AMBER = "FFF59E0B", LIGHT = "FFEFF4FF", DARK = "FF1F2937";
const FONT = "Arial";

function styleHeader(sheet) {
  const hr = sheet.getRow(1);
  hr.eachCell((c) => { c.font = { name: FONT, bold: true, color: { argb: "FFFFFFFF" } }; c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: BLUE } }; c.alignment = { vertical: "middle", wrapText: true }; });
  hr.height = 24;
  sheet.views = [{ state: "frozen", ySplit: 1 }];
  for (let r = 2; r <= sheet.rowCount; r++) {
    sheet.getRow(r).eachCell((c) => { c.font = { name: FONT, size: 10, color: { argb: DARK } }; c.alignment = { vertical: "top", wrapText: true }; });
    if (r % 2 === 0) sheet.getRow(r).eachCell((c) => (c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: LIGHT } }));
  }
}

// ---------------- BACKLINK KIT ----------------
async function backlinkKit() {
  const wb = new ExcelJS.Workbook();
  wb.creator = "HomeCalcify";

  // Start Here
  const s0 = wb.addWorksheet("Start Here", { properties: { tabColor: { argb: BLUE } } });
  s0.columns = [{ width: 46 }, { width: 74 }];
  const start = [
    ["HomeCalcify — Backlink Kit", ""],
    ["", ""],
    ["THE GOLDEN RULES", ""],
    ["Never buy links", "PBNs, fiverr 'gigs', link farms = Google penalty. One penalty can kill a new site."],
    ["Quality over quantity", "5–15 relevant links in 90 days beats 500 spammy ones."],
    ["Vary your anchor text", "Mostly brand ('HomeCalcify'), naked URLs, and natural phrases. Avoid repeating exact-match anchors."],
    ["Be genuinely useful", "Every pitch should help the other person's readers first."],
    ["", ""],
    ["WEEKLY ROUTINE (2–3 hrs)", ""],
    ["Mon", "Answer 3–5 journalist requests (HARO / Connectively / Featured / Qwoted) — see 'HARO Answers' tab."],
    ["Tue", "Find 10 resource pages (see 'Prospect Targets'), send the resource-page template."],
    ["Wed", "Find 5 broken links on relevant pages, send the broken-link template."],
    ["Thu", "Pitch 2 guest posts or the 2026 Cost Report to bloggers/journalists."],
    ["Fri", "Log everything in 'Link Tracker'; follow up on last week's no-replies (1 follow-up only)."],
    ["", ""],
    ["YOUR BEST ASSETS TO PITCH", ""],
    ["Free calculators", "https://homecalcify.com/calculators/ — naturally linkable tools."],
    ["2026 Cost Report", "https://homecalcify.com/home-improvement-cost-report/ — original data journalists cite."],
    ["Cost guides", "https://homecalcify.com/guides/ — 'how much does X cost' resources."],
    ["", ""],
    ["FREE TOOLS TO SIGN UP FOR", ""],
    ["Journalist requests", "Connectively (formerly HARO), Featured.com, Qwoted, SourceBottle — free journalist queries."],
    ["Finding prospects", "Google search operators (see Prospect Targets), Hunter.io (find emails), Check My Links (Chrome)."],
  ];
  start.forEach((row, i) => {
    const r = s0.addRow(row);
    const isTitle = i === 0;
    const isSection = /^[A-Z ]{6,}$/.test(row[0]) && row[1] === "";
    r.getCell(1).font = { name: FONT, bold: isTitle || isSection, size: isTitle ? 16 : isSection ? 12 : 10, color: { argb: isTitle ? "FFFFFFFF" : isSection ? BLUE : DARK } };
    r.getCell(2).font = { name: FONT, size: 10, color: { argb: "FF6B7280" } };
    r.getCell(1).alignment = { wrapText: true, vertical: "middle" };
    r.getCell(2).alignment = { wrapText: true, vertical: "middle" };
    if (isTitle) { r.getCell(1).fill = r.getCell(2).fill = { type: "pattern", pattern: "solid", fgColor: { argb: BLUE } }; r.height = 26; }
  });

  // Outreach Templates
  const s1 = wb.addWorksheet("Outreach Templates", { properties: { tabColor: { argb: AMBER } } });
  s1.columns = [
    { header: "Template", key: "t", width: 24 },
    { header: "When to use", key: "w", width: 34 },
    { header: "Subject line", key: "s", width: 40 },
    { header: "Email body ( [brackets] = fill in )", key: "b", width: 90 },
  ];
  const templates = [
    ["Resource-page link", "A page lists helpful tools/resources in your niche and your calculator fits.",
      "A free [topic] calculator for your resources page",
      "Hi [Name],\n\nI came across your resources page (\"[Page Title]\") while researching [topic] — really useful list.\n\nI run HomeCalcify, and we built a free [X] calculator your readers planning a [project] might find handy: [Calculator URL]. No sign-up, works on mobile, and it shows the formula plus a cost estimate.\n\nIf it's a fit for your list, a mention would mean a lot. Either way, thanks for putting the roundup together.\n\nBest,\n[Your name]\nHomeCalcify.com"],
    ["Broken-link building", "You found a dead link on a relevant page; offer yours as the replacement.",
      "Quick heads-up: broken link on [Page Title]",
      "Hi [Name],\n\nQuick heads-up — on your page \"[Page Title]\" ([Page URL]), the link to [broken resource] (anchor: \"[anchor text]\") returns a 404.\n\nIf you're updating it, our free [X] calculator covers the same thing and might be a good replacement: [Calculator URL].\n\nEither way, thought you'd want to know so it doesn't hurt your reader experience.\n\nThanks,\n[Your name]"],
    ["Guest post pitch", "A blog accepts contributor articles in your niche.",
      "Guest post idea for [Site]: [Working Title]",
      "Hi [Name],\n\nI enjoy [Site]'s coverage of [topic] — especially [specific article].\n\nI'd like to contribute a practical, non-promotional guide: \"[Working Title]\" — [one-line angle]. It would include original 2026 cost data and a step-by-step method your DIY readers can act on immediately.\n\nI run HomeCalcify (free home improvement calculators) and write this material daily. Happy to send a full outline first.\n\nWould a piece like this be a fit?\n\nBest,\n[Your name]"],
    ["Data-study / PR pitch", "Pitch the 2026 Cost Report to journalists & bloggers for a cited link.",
      "2026 data: what 19 home improvement projects cost",
      "Hi [Name],\n\nI saw your article on [topic] — timely given how much project costs have moved.\n\nWe just published HomeCalcify's 2026 Home Improvement Cost Report: national average costs for 19 common projects (driveways, roofing, decks, fencing, flooring, painting and more), per square foot and per project: [Cost Report URL]. It's free to cite.\n\nA few findings your readers might use:\n• A concrete driveway costs 2–3× an asphalt one, but lasts about twice as long.\n• Composite decking costs ~2× pressure-treated wood, with far less maintenance.\n• Spray foam insulation costs ~3× fiberglass but delivers ~2× the R-value per inch.\n\nHappy to provide comment or a custom data cut.\n\nBest,\n[Your name], HomeCalcify"],
    ["Unlinked mention", "Someone named HomeCalcify without linking it.",
      "Thanks for the HomeCalcify mention",
      "Hi [Name],\n\nThank you for mentioning HomeCalcify in \"[Article Title]\" ([Article URL]) — much appreciated!\n\nWould you consider linking the mention to our site (https://homecalcify.com) so readers can find the calculators? It's a small change that helps a lot.\n\nThanks again for the kind words,\n[Your name]"],
    ["Follow-up (once)", "No reply after ~5–7 days. Send ONE polite follow-up, then stop.",
      "Re: [original subject]",
      "Hi [Name],\n\nJust floating this back to the top of your inbox in case it got buried. Totally understand if it's not a fit — no worries either way.\n\nThanks,\n[Your name]"],
  ];
  templates.forEach((t) => s1.addRow(t));
  styleHeader(s1);

  // HARO Answers
  const s2 = wb.addWorksheet("HARO Answers", { properties: { tabColor: { argb: BLUE } } });
  s2.columns = [
    { header: "If the query is about…", key: "q", width: 34 },
    { header: "Ready-to-send answer (adapt to the exact question; keep the stat + soft mention)", key: "a", width: 100 },
  ];
  const haro = [
    ["Cost of a new driveway",
      "Driveway costs in 2026 vary widely by material. Gravel is cheapest at $1–$3 per square foot, asphalt runs $3–$7, and concrete $4–$15 — so a typical two-car driveway ranges from about $1,200 (gravel) to $6,000+ (concrete). Concrete costs the most up front but lasts 25–40 years vs 15–20 for asphalt, making it better long-term value in hot climates. (Data: HomeCalcify's 2026 cost report — happy to share the full breakdown.)"],
    ["Deck cost / composite vs wood",
      "A new deck costs roughly $15–$45 per square foot installed in 2026. Pressure-treated wood is cheapest ($15–$25/ft²) but needs yearly sealing and lasts 10–15 years; composite costs about double ($25–$45) but needs almost no maintenance and lasts 25–30 years. For homeowners who won't keep up with sealing, composite is usually the better value despite the higher up-front cost. (Source: HomeCalcify.)"],
    ["Cost to replace a roof",
      "A typical asphalt-shingle roof replacement costs $5,000–$12,000, or about $400–$700 per roofing square (100 sq ft) installed. Metal roofs cost far more — $12,000–$30,000 — but can outlive two or three shingle roofs. Pitch, tear-off of old layers, and regional labor are the biggest cost swings. (Data from HomeCalcify's 2026 cost report.)"],
    ["Fence cost / wood vs vinyl",
      "Fencing runs about $15–$45 per linear foot installed. Wood is cheaper ($15–$30/ft) and easy to customize but needs sealing every few years; vinyl costs more ($20–$40) yet needs almost no upkeep and lasts 20–30 years. A 150-ft fence typically runs $2,250–$4,500 in wood or $3,000–$6,000 in vinyl. (Source: HomeCalcify.)"],
    ["Budgeting a renovation",
      "The best first step is to price projects per unit, not as a lump sum: e.g., interior painting is $2–$6 per square foot, flooring $2–$15, and drywall $1.50–$3.50. Add a 10–15% contingency for surprises, and get three quotes on anything over a few thousand dollars. Free calculators can turn a room's dimensions into a materials-and-cost estimate in seconds. (HomeCalcify offers these tools free.)"],
    ["Cheapest ways to boost curb appeal",
      "The highest-ROI, lowest-cost curb-appeal moves are fresh exterior or trim paint ($1.50–$4 per square foot) and a mulch refresh (bulk mulch is just $30–$60 per cubic yard, covering ~108 sq ft at 3 inches). Both are affordable, DIY-friendly, and make an immediate visual difference before more expensive projects like siding or a new driveway. (Source: HomeCalcify.)"],
    ["Interior painting cost",
      "Interior painting costs about $2–$6 per square foot of floor area, or $300–$800 per room; a whole 2,000 sq ft home runs $4,000–$10,000. Labor is 70–85% of the bill, so DIY can cut it by more than half. Two coats is standard, and prep (patching, priming) drives much of the labor. (Data: HomeCalcify 2026 cost report.)"],
    ["Is spray foam insulation worth it",
      "Spray foam costs about $3–$7 per square foot installed — roughly triple fiberglass ($1–$2.40) — but it air-seals and delivers about double the R-value per inch. For leaky homes, rim joists, and hard-to-insulate cavities it often pays back fastest; for large open attics, cheaper blown-in or batts usually make more sense. (Source: HomeCalcify.)"],
  ];
  haro.forEach((h) => s2.addRow(h));
  styleHeader(s2);

  // Prospect Targets
  const s3 = wb.addWorksheet("Prospect Targets", { properties: { tabColor: { argb: AMBER } } });
  s3.columns = [
    { header: "Prospect type", key: "t", width: 30 },
    { header: "Google search string to find them", key: "s", width: 60 },
    { header: "What to send", key: "w", width: 34 },
  ];
  const prospects = [
    ["Home-improvement resource pages", '"home improvement" ("resources" OR "useful links" OR "tools")', "Resource-page template"],
    ["DIY resource pages", '"DIY" ("resources" OR "helpful tools") -site:pinterest.com', "Resource-page template"],
    ["Calculator roundups", 'intitle:"home improvement calculators" OR "best construction calculators"', "Resource-page template"],
    ["Guest-post opportunities", '"home improvement" ("write for us" OR "guest post" OR "contribute")', "Guest-post template"],
    ["Real estate / homeowner blogs", '"homeowner tips" OR "first time home buyer" blog "resources"', "Resource-page template"],
    ["Broken-link candidates", '"home improvement" "tools" OR "calculators" (then run Check My Links)', "Broken-link template"],
    ["Local contractor resource pages", '"[project] contractor" "helpful resources" [city]', "Resource-page template"],
    ["Journalist requests", "Sign up: Connectively, Featured.com, Qwoted, SourceBottle", "HARO answers"],
  ];
  prospects.forEach((p) => s3.addRow(p));
  styleHeader(s3);

  // Link Tracker
  const s4 = wb.addWorksheet("Link Tracker", { properties: { tabColor: { argb: BLUE } } });
  s4.columns = [
    { header: "Date", key: "d", width: 12 },
    { header: "Site / Publication", key: "s", width: 28 },
    { header: "Page URL", key: "u", width: 40 },
    { header: "Contact", key: "c", width: 24 },
    { header: "Type", key: "t", width: 18 },
    { header: "Status", key: "st", width: 16 },
    { header: "Follow-up date", key: "f", width: 14 },
    { header: "Live link URL", key: "l", width: 34 },
    { header: "Anchor used", key: "a", width: 22 },
    { header: "Notes", key: "n", width: 30 },
  ];
  s4.addRow(["2026-07-03", "Example DIY Blog", "https://example.com/resources", "editor@example.com", "Resource page", "Sent", "2026-07-10", "", "", "Sample row — replace"]);
  styleHeader(s4);
  // add data-validation-ish status hint row height
  for (let i = 0; i < 40; i++) s4.addRow([]);

  const out = "C:/Users/Ali/Desktop/HomeCalcify-Backlink-Kit.xlsx";
  await wb.xlsx.writeFile(out);
  console.log("WROTE", out);
}

// ---------------- PINTEREST ----------------
async function pinterest() {
  const wb = new ExcelJS.Workbook();
  wb.creator = "HomeCalcify";
  const BASE = "https://homecalcify.com";
  const style = "Vertical 2:3 (1000x1500) Pinterest pin, clean modern infographic, brand blue (#2563EB) + amber (#F59E0B) on white. Bold sans-serif headline in a blue banner, a relevant home-improvement photo/illustration, a white card with 3-4 data points + small amber icons, generous white space, small 'HomeCalcify.com' wordmark bottom-center.";

  const s0 = wb.addWorksheet("Setup & Strategy", { properties: { tabColor: { argb: BLUE } } });
  s0.columns = [{ width: 48 }, { width: 72 }];
  [
    ["HomeCalcify — Pinterest Plan", ""],
    ["1. Create a Pinterest Business account", "Free; unlocks analytics + Rich Pins."],
    ["2. Claim homecalcify.com", "Settings -> Claim; adds your logo to every pin + unlocks analytics."],
    ["3. Enable Rich Pins", "Validate any guide URL at the Rich Pins validator."],
    ["4. Build the boards (Boards tab)", "Keyword-named boards, not clever names — Pinterest is a search engine."],
    ["5. Design pins (Pin Content Plan tab)", "1000x1500 px; use the Image Prompt as an AI/Canva brief; put the Overlay Text on the image."],
    ["6. Post 3-5 pins/day", "Use Pinterest's scheduler or free Tailwind. Repin your winners."],
    ["7. Track weekly", "Impressions, saves, outbound clicks. Make more of your top 20%."],
    ["Note: links are 'nofollow'", "Great for TRAFFIC (which earns AdSense) — not direct SEO backlinks. Organic only; never buy traffic."],
  ].forEach((row, i) => {
    const r = s0.addRow(row);
    r.getCell(1).font = { name: FONT, bold: i === 0, size: i === 0 ? 16 : 10, color: { argb: i === 0 ? "FFFFFFFF" : DARK } };
    r.getCell(2).font = { name: FONT, size: 10, color: { argb: "FF6B7280" } };
    r.getCell(1).alignment = r.getCell(2).alignment = { wrapText: true, vertical: "middle" };
    if (i === 0) { r.getCell(1).fill = r.getCell(2).fill = { type: "pattern", pattern: "solid", fgColor: { argb: BLUE } }; r.height = 26; }
  });

  const boards = [
    ["Concrete Projects & Costs", "Concrete driveways, patios, slabs — costs, guides, and free calculators.", "concrete, concrete driveway, concrete cost, DIY concrete"],
    ["Roofing Tips & Costs", "Roof replacement costs, shingles, metal roofing, roofing how-tos.", "roofing, roof replacement, shingles, metal roof"],
    ["Flooring Ideas & Costs", "Laminate, vinyl plank, hardwood, tile — inspiration and real costs.", "flooring, vinyl plank, hardwood floors, tile"],
    ["Decks & Fences", "Deck and fence costs, materials, and comparisons.", "deck, fence, backyard, composite decking, vinyl fence"],
    ["Painting Guides", "Interior & exterior painting costs, color and sheen tips.", "painting, paint colors, curb appeal, DIY"],
    ["Driveway & Paving", "Asphalt, concrete, gravel driveways — costs and comparisons.", "driveway, asphalt, paving, curb appeal"],
    ["Home Insulation & Siding", "Insulation R-values, siding materials, energy-saving upgrades.", "insulation, siding, energy savings, home exterior"],
    ["Landscaping & Mulch", "Mulch, topsoil, sod — costs and yard tips.", "landscaping, mulch, gardening, curb appeal"],
    ["Home Improvement Cost Guides", "Free calculators + 2026 cost guides for every project.", "home improvement, renovation, cost guide, homeowner"],
  ];
  const sb = wb.addWorksheet("Boards", { properties: { tabColor: { argb: AMBER } } });
  sb.columns = [{ header: "Board name", key: "n", width: 32 }, { header: "Board description (keyword-rich)", key: "d", width: 66 }, { header: "Target keywords", key: "k", width: 46 }];
  boards.forEach((b) => sb.addRow(b));
  styleHeader(sb);

  // pins: [board, title, overlay, promptScene, description, tags, urlPath, alt]
  const pins = [
    ["Home Improvement Cost Guides", "2026 Home Improvement Cost Report: What 19 Projects Cost", "2026 HOME PROJECT COSTS", "Scene: a tidy flat-lay of home tools + a cost chart. Data: 'Driveways · Roofing · Decks', 'Per sq ft + per project', 'Free 2026 data'.", "New for 2026: national average costs for 19 home projects — driveways, roofing, decks, fencing, flooring, painting & more. Free to reference. #homeimprovement #renovation #homeowner #DIY", "home improvement, renovation cost, home projects, homeowner tips", "/home-improvement-cost-report/", "Infographic of 2026 home improvement project costs"],
    ["Concrete Projects & Costs", "How Much Does a Concrete Driveway Cost in 2026?", "CONCRETE DRIVEWAY COST", "Scene: a new concrete driveway in front of a home. Data: '$4-$15 per sq ft', '2-car ≈ $3,600-$6,000', 'Stamped +$4-$12'.", "Full 2026 concrete driveway cost breakdown by size and finish, plus a free calculator. #concrete #driveway #curbappeal #homeimprovement", "concrete driveway cost, driveway ideas, curb appeal", "/guides/concrete-driveway-cost/", "Concrete driveway cost infographic"],
    ["Decks & Fences", "How Much Does a Deck Cost? (2026)", "DECK COST 2026", "Scene: a stylish backyard deck with furniture. Data: 'Wood $15-$25/ft²', 'Composite $25-$45/ft²', '300 ft² = $4.5k-$13.5k'.", "Deck costs by size and material — wood vs composite — with a free deck calculator. #deck #backyard #composite #homeimprovement", "deck cost, deck ideas, backyard, composite decking", "/guides/deck-cost/", "Deck cost infographic"],
    ["Decks & Fences", "Composite vs Wood Decking: Which Should You Pick?", "COMPOSITE vs WOOD DECK", "Scene: split image of composite and wood deck boards. Data: 'Wood cheaper', 'Composite lasts 25-30 yr', 'Low maintenance'.", "The composite vs wood decking showdown — cost, maintenance, and lifespan. Save before you build! #decking #backyard #DIY #homeimprovement", "decking, composite deck, wood deck, backyard ideas", "/guides/composite-vs-wood-decking/", "Composite vs wood decking comparison"],
    ["Decks & Fences", "How Much Does a Fence Cost? (2026)", "FENCE COST 2026", "Scene: a clean new privacy fence. Data: 'Wood $15-$30/ft', 'Vinyl $20-$40/ft', '150 ft ≈ $2.3k-$6k'.", "Fence costs by material and length, plus a free fence calculator for posts and panels. #fence #backyard #curbappeal #DIY", "fence cost, fence ideas, backyard, privacy fence", "/guides/fence-cost/", "Fence cost infographic"],
    ["Decks & Fences", "Wood vs Vinyl Fence: Cost & Comparison", "WOOD vs VINYL FENCE", "Scene: split image of wood and vinyl fence. Data: 'Wood natural + cheap', 'Vinyl low-maintenance', '20-30 yr life'.", "Wood or vinyl fence? Compare cost, upkeep, and lifespan. Pin for your yard project! #fence #backyard #homeimprovement #curbappeal", "fence, vinyl fence, wood fence, backyard ideas", "/guides/wood-vs-vinyl-fence/", "Wood vs vinyl fence comparison"],
    ["Roofing Tips & Costs", "How Much Does a Roof Replacement Cost in 2026?", "ROOF REPLACEMENT COST", "Scene: roofers installing shingles. Data: '$5k-$12k typical', '$400-$700 per square', 'Metal costs more'.", "Real 2026 roof replacement costs by material and size, plus a free roofing calculator. #roofing #roofreplacement #homeowner", "roof replacement, roofing cost, new roof, homeowner", "/guides/roof-replacement-cost/", "Roof replacement cost infographic"],
    ["Roofing Tips & Costs", "How Long Does a Roof Last? Lifespan by Material", "ROOF LIFESPAN", "Scene: split of asphalt, metal, tile roofs. Data: 'Asphalt 15-30 yr', 'Metal 40-70 yr', 'Slate 75-100 yr'.", "How long will your roof last? Lifespan by material + when to replace. #roofing #homeowner #homemaintenance", "roofing, roof lifespan, homeowner tips", "/guides/how-long-does-a-roof-last/", "Roof lifespan by material chart"],
    ["Flooring Ideas & Costs", "Laminate vs Vinyl Plank Flooring: Which Wins?", "LAMINATE vs VINYL PLANK", "Scene: side-by-side flooring swatches. Data: 'LVP = waterproof', 'Laminate = scratch-proof', '$2-$7/ft²'.", "Laminate or luxury vinyl plank? The waterproof vs scratch-resistant showdown. #flooring #LVP #homeimprovement", "flooring, vinyl plank, laminate flooring, home reno", "/guides/laminate-vs-vinyl-plank-flooring/", "Laminate vs vinyl plank comparison"],
    ["Flooring Ideas & Costs", "How Much Does It Cost to Tile a Bathroom?", "BATHROOM TILE COST", "Scene: a freshly tiled bathroom. Data: 'Floor $500-$1,500', 'Full bath $2.5k-$7k', '$7-$25/ft²'.", "2026 bathroom tiling costs for floors, walls & showers + a free tile calculator. #bathroom #tile #bathroomremodel", "bathroom remodel, tile, bathroom tile, home reno", "/guides/cost-to-tile-a-bathroom/", "Bathroom tiling cost infographic"],
    ["Painting Guides", "How Much Does It Cost to Paint a House Interior?", "INTERIOR PAINTING COST", "Scene: painter rolling a bright wall. Data: '$2-$6/ft²', 'Room $300-$800', 'Home $4k-$10k'.", "2026 interior painting costs by room and whole house, plus a free paint calculator. #painting #homeimprovement #interiordesign", "interior painting, paint colors, home makeover, DIY", "/guides/cost-to-paint-a-house-interior/", "Interior painting cost infographic"],
    ["Painting Guides", "Best Paint Finish for Walls (Sheen Guide)", "PAINT SHEEN GUIDE", "Scene: paint sheen swatches flat to gloss. Data: 'Walls = eggshell/satin', 'Ceilings = flat', 'Baths = semi-gloss'.", "Flat, eggshell, satin or semi-gloss? Match the right paint sheen to every room. Pin this! #painting #paintcolors #homedecor", "paint finish, paint sheen, home decor, painting tips", "/guides/best-paint-finish-for-walls/", "Paint sheen by room guide"],
    ["Driveway & Paving", "Asphalt vs Concrete Driveway: Which Is Better?", "ASPHALT vs CONCRETE", "Scene: split asphalt/concrete driveway. Data: 'Asphalt $3-$7, 15-20 yr', 'Concrete $4-$15, 25-40 yr'.", "Asphalt or concrete driveway? Compare cost, lifespan & climate. #driveway #asphalt #concrete #curbappeal", "driveway, asphalt vs concrete, paving, curb appeal", "/guides/asphalt-vs-concrete-driveway/", "Asphalt vs concrete driveway comparison"],
    ["Driveway & Paving", "Gravel Driveway Cost & How to Build One", "GRAVEL DRIVEWAY COST", "Scene: a rustic gravel driveway. Data: '$1-$3/ft²', '2-car $1.2k-$2.5k', '6-8 in in layers'.", "Gravel is the cheapest driveway — 2026 cost, layers, and a free gravel calculator. #driveway #gravel #DIY", "gravel driveway, driveway ideas, landscaping, DIY", "/guides/gravel-driveway-cost/", "Gravel driveway cost infographic"],
    ["Home Insulation & Siding", "Spray Foam vs Fiberglass Insulation", "SPRAY FOAM vs FIBERGLASS", "Scene: split foam/fiberglass. Data: 'Fiberglass $1-$2.40', 'Spray foam $3-$7', 'Foam air-seals'.", "Spray foam or fiberglass? Compare cost, R-value & air-sealing. #insulation #energysaving #homeimprovement", "insulation, spray foam, energy efficiency, home", "/guides/spray-foam-vs-fiberglass-insulation/", "Spray foam vs fiberglass comparison"],
    ["Home Insulation & Siding", "How Much Does Siding Cost? 2026 Guide", "SIDING COST", "Scene: home exterior with fresh siding. Data: 'Vinyl $4-$8', 'Fiber cement $6-$13', 'Home $10k-$25k'.", "2026 siding costs by material + a free siding calculator. #siding #homeexterior #curbappeal", "siding, home exterior, curb appeal, fiber cement", "/guides/how-much-does-siding-cost/", "Siding cost by material infographic"],
    ["Landscaping & Mulch", "How Much Does Mulch Cost? Bulk vs Bagged", "MULCH COST", "Scene: wheelbarrow of mulch by a garden bed. Data: 'Bulk $30-$60/yd³', 'Bagged $3-$7/bag', 'Bulk wins'.", "Bulk vs bagged mulch costs + a free mulch calculator to size your beds. #mulch #gardening #landscaping #curbappeal", "mulch, landscaping, gardening, curb appeal", "/guides/how-much-does-mulch-cost/", "Mulch cost bulk vs bagged infographic"],
    ["Concrete Projects & Costs", "How Long Does Concrete Take to Cure?", "CONCRETE CURING TIMELINE", "Scene: fresh concrete slab + timeline. Data: 'Walk 24-48 hr', 'Drive 7 days', 'Full 28 days'.", "When can you walk, drive & build on new concrete? Save this curing timeline. #concrete #DIY #homeimprovement", "concrete, concrete tips, diy concrete, construction", "/guides/how-long-does-concrete-take-to-cure/", "Concrete curing timeline chart"],
    ["Home Improvement Cost Guides", "19 Free Home Improvement Calculators (Bookmark These)", "FREE HOME CALCULATORS", "Scene: phone showing a calculator over a tools flat-lay. Data: 'Concrete · Roofing · Deck', 'Fence · Paint · Siding', 'Free · No sign-up'.", "Bookmark these 19 free calculators for concrete, roofing, decking, fencing, paint & more — instant materials + cost. #homeimprovement #DIY #renovation", "home improvement, diy, home calculator, renovation", "/calculators/", "Promo pin for HomeCalcify free calculators"],
  ];
  const sp = wb.addWorksheet("Pin Content Plan", { properties: { tabColor: { argb: BLUE } } });
  sp.columns = [
    { header: "#", key: "i", width: 5 },
    { header: "Board", key: "b", width: 26 },
    { header: "Pin Title (<=100 chars)", key: "t", width: 50 },
    { header: "Image Overlay Text", key: "o", width: 26 },
    { header: "Image Prompt / Design Brief", key: "p", width: 78 },
    { header: "Pin Description", key: "d", width: 68 },
    { header: "Tags / Keywords", key: "k", width: 42 },
    { header: "Destination URL", key: "u", width: 50 },
    { header: "Alt Text", key: "a", width: 46 },
  ];
  pins.forEach((p, i) => sp.addRow([i + 1, p[0], p[1], p[2], p[3] + " " + style, p[4], p[5], BASE + p[6], p[7]]));
  styleHeader(sp);

  const out = "C:/Users/Ali/Desktop/HomeCalcify-Pinterest-Plan.xlsx";
  await wb.xlsx.writeFile(out);
  console.log("WROTE", out, "| pins:", pins.length);
}

(async () => { await backlinkKit(); await pinterest(); })().catch((e) => { console.error(e); process.exit(1); });

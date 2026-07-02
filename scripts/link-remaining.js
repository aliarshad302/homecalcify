const fs = require("fs");
const path = require("path");
const dir = path.join(__dirname, "..", "src", "config", "calculators");

const edits = [
  ["drywall.ts",
    `    related: ["paint-calculator", "concrete-calculator"],
    guides: [{ title: "How Much Drywall Do I Need?", href: "/guides/how-much-drywall-do-i-need/" }],`,
    `    related: ["drywall-mud-calculator", "paint-calculator", "concrete-calculator"],
    guides: [
      { title: "How Much Drywall Do I Need?", href: "/guides/how-much-drywall-do-i-need/" },
      { title: "Cost to Drywall a Room", href: "/guides/cost-to-drywall-a-room/" },
      { title: "Drywall Finishing Levels Explained", href: "/guides/drywall-finishing-levels/" },
    ],`],
  ["mulch.ts",
    `    related: ["concrete-calculator", "flooring-calculator"],
    guides: [{ title: "How Much Mulch Do I Need?", href: "/guides/how-much-mulch-do-i-need/" }],`,
    `    related: ["topsoil-calculator", "sod-calculator", "concrete-calculator"],
    guides: [
      { title: "How Much Mulch Do I Need?", href: "/guides/how-much-mulch-do-i-need/" },
      { title: "How Much Does Mulch Cost?", href: "/guides/how-much-does-mulch-cost/" },
      { title: "Mulch vs Rock", href: "/guides/mulch-vs-rock/" },
    ],`],
  ["asphalt.ts",
    `    related: ["concrete-calculator", "roofing-calculator"],
    guides: [{ title: "Asphalt vs Concrete Driveway", href: "/guides/asphalt-vs-concrete-driveway/" }],`,
    `    related: ["gravel-calculator", "concrete-calculator"],
    guides: [
      { title: "Asphalt vs Concrete Driveway", href: "/guides/asphalt-vs-concrete-driveway/" },
      { title: "Asphalt Driveway Cost", href: "/guides/asphalt-driveway-cost/" },
      { title: "Cost to Pave a Driveway", href: "/guides/cost-to-pave-a-driveway/" },
    ],`],
  ["gravel.ts",
    `    related: ["asphalt-calculator", "concrete-calculator"],
    guides: [],`,
    `    related: ["asphalt-calculator", "concrete-calculator"],
    guides: [
      { title: "Gravel Driveway Cost", href: "/guides/gravel-driveway-cost/" },
      { title: "Cost to Pave a Driveway", href: "/guides/cost-to-pave-a-driveway/" },
    ],`],
  ["insulation.ts",
    `    related: ["drywall-calculator", "siding-calculator"],
    guides: [],`,
    `    related: ["drywall-calculator", "siding-calculator"],
    guides: [
      { title: "How Much Does It Cost to Insulate a House?", href: "/guides/cost-to-insulate-a-house/" },
      { title: "Spray Foam vs Fiberglass Insulation", href: "/guides/spray-foam-vs-fiberglass-insulation/" },
      { title: "What R-Value Do I Need?", href: "/guides/what-r-value-do-i-need/" },
      { title: "Attic Insulation Cost", href: "/guides/attic-insulation-cost/" },
    ],`],
  ["siding.ts",
    `    related: ["insulation-calculator", "roofing-calculator"],
    guides: [],`,
    `    related: ["insulation-calculator", "roofing-calculator"],
    guides: [
      { title: "How Much Does Siding Cost?", href: "/guides/how-much-does-siding-cost/" },
      { title: "Vinyl vs Fiber Cement Siding", href: "/guides/vinyl-vs-fiber-cement-siding/" },
      { title: "Best Siding for Cold Climates", href: "/guides/best-siding-for-cold-climates/" },
    ],`],
];

for (const [file, find, repl] of edits) {
  const p = path.join(dir, file);
  const src = fs.readFileSync(p, "utf8").replace(/\r\n/g, "\n");
  if (!src.includes(find)) { console.log("!! NOT FOUND in", file); continue; }
  fs.writeFileSync(p, src.replace(find, repl));
  console.log("ok", file);
}

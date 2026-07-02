import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { Card } from "@/components/ui/card";
import { articleSchema, jsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: "2026 Home Improvement Cost Report — What 19 Projects Cost | HomeCalcify" },
  description:
    "HomeCalcify's 2026 home improvement cost report: national average cost ranges for 19 common projects — driveways, roofing, decks, fencing, flooring, painting, and more, per square foot and per project.",
  alternates: { canonical: "/home-improvement-cost-report/" },
  openGraph: { title: "2026 Home Improvement Cost Report", description: "National average costs for 19 common home improvement projects.", type: "article", url: "/home-improvement-cost-report/" },
};

const CATEGORIES = [
  {
    group: "Driveways & Paving",
    rows: [
      ["Concrete driveway", "$4 – $15 / ft²", "$3,600 – $6,000 (2-car)"],
      ["Asphalt driveway", "$3 – $7 / ft²", "$1,800 – $4,200 (2-car)"],
      ["Gravel driveway", "$1 – $3 / ft²", "$1,200 – $2,500 (2-car)"],
    ],
  },
  {
    group: "Roofing",
    rows: [
      ["Asphalt shingle roof", "$400 – $700 / square", "$5,000 – $12,000"],
      ["Metal roof", "$800 – $1,400 / square", "$12,000 – $30,000"],
    ],
  },
  {
    group: "Concrete",
    rows: [
      ["Concrete slab", "$4 – $8 / ft²", "$1,600 – $3,200 (20×20)"],
      ["Concrete patio", "$5 – $15 / ft²", "$1,300 – $3,800 (16×16)"],
      ["Stamped concrete", "$10 – $18 / ft²", "+$4 – $12 vs plain"],
    ],
  },
  {
    group: "Flooring & Tile",
    rows: [
      ["Laminate flooring", "$2 – $6 / ft²", "—"],
      ["Vinyl plank (LVP)", "$3 – $7 / ft²", "—"],
      ["Hardwood flooring", "$6 – $15 / ft²", "—"],
      ["Tile (floor)", "$7 – $20 / ft²", "—"],
    ],
  },
  {
    group: "Exterior",
    rows: [
      ["Vinyl siding", "$4 – $8 / ft²", "$10,000 – $25,000 (avg home)"],
      ["Fiber-cement siding", "$6 – $13 / ft²", "—"],
      ["Deck (wood)", "$15 – $25 / ft²", "$4,500 – $7,500 (300 ft²)"],
      ["Deck (composite)", "$25 – $45 / ft²", "$7,500 – $13,500 (300 ft²)"],
      ["Fence (wood)", "$15 – $30 / ft", "$2,250 – $4,500 (150 ft)"],
      ["Fence (vinyl)", "$20 – $40 / ft", "$3,000 – $6,000 (150 ft)"],
    ],
  },
  {
    group: "Interior",
    rows: [
      ["Interior painting", "$2 – $6 / ft²", "$300 – $800 / room"],
      ["Exterior painting", "$1.50 – $4 / ft²", "$3,000 – $10,000"],
      ["Drywall (hung & finished)", "$1.50 – $3.50 / ft²", "$900 – $2,000 / room"],
      ["Fiberglass insulation", "$1 – $2.40 / ft²", "$1,500 – $3,500 (attic)"],
      ["Spray foam insulation", "$3 – $7 / ft²", "—"],
    ],
  },
];

const FINDINGS = [
  ["2–3×", "A concrete driveway costs 2–3× an asphalt one — but lasts roughly twice as long (25–40 vs 15–20 years)."],
  ["~2×", "Composite decking costs about twice pressure-treated wood, and lasts about twice as long with far less maintenance."],
  ["3×", "Spray foam insulation costs ~3× fiberglass, but delivers about double the R-value per inch."],
  ["$3.6k–$6k", "The average two-car concrete driveway costs $3,600–$6,000 installed in 2026."],
];

export default function CostReportPage() {
  const path = "/home-improvement-cost-report/";
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            articleSchema({
              title: "2026 Home Improvement Cost Report",
              description: "National average cost ranges for 19 common home improvement projects.",
              path,
              updated: "2026-07-02",
            }),
          ),
        }}
      />
      <PageShell
        title="2026 Home Improvement Cost Report"
        lead="National average cost ranges for 19 of the most common home improvement projects — compiled from HomeCalcify's calculators and cost guides."
        crumbs={[{ name: "Home", path: "/" }, { name: "2026 Cost Report", path }]}
        updated="2026-07-02"
      >
        <p>
          Home improvement costs shifted again in 2026. To help homeowners, DIYers, and journalists
          benchmark projects, we compiled the national average cost ranges we use across HomeCalcify's{" "}
          <Link href="/calculators/">19 free calculators</Link> into a single reference. Figures are
          US national averages for materials plus labor; actual costs vary by region, material grade,
          and site conditions.
        </p>

        <h2>Key findings</h2>
        <div className="not-prose my-5 grid gap-4 sm:grid-cols-2">
          {FINDINGS.map(([stat, text]) => (
            <Card key={stat} className="p-5">
              <div className="font-display text-2xl font-bold text-primary">{stat}</div>
              <p className="mt-1 text-sm text-muted-foreground">{text}</p>
            </Card>
          ))}
        </div>

        <h2>2026 cost ranges by project</h2>
        {CATEGORIES.map((cat) => (
          <div key={cat.group}>
            <h3>{cat.group}</h3>
            <table>
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Cost per unit</th>
                  <th>Typical project cost</th>
                </tr>
              </thead>
              <tbody>
                {cat.rows.map((r) => (
                  <tr key={r[0]}>
                    <td>{r[0]}</td>
                    <td>{r[1]}</td>
                    <td>{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

        <h2>Methodology</h2>
        <p>
          Cost ranges are national averages compiled from HomeCalcify's calculators and cost guides,
          which use industry-standard coverage rates, material pricing, and typical installed labor
          rates. Per-unit figures include materials and labor unless noted; project totals assume
          common sizes. Prices vary by region — see our{" "}
          <Link href="/methodology/">methodology</Link> for how estimates are built.
        </p>

        <h2>Use this data</h2>
        <p>
          You're welcome to cite these figures. Please credit <strong>HomeCalcify</strong> with a link
          to this report (<code>https://homecalcify.com/home-improvement-cost-report/</code>).
          Journalists and researchers can reach us via the{" "}
          <Link href="/contact-us/">contact page</Link> for comment or additional data.
        </p>

        <h2>Estimate your own project</h2>
        <p>
          Every figure above comes from a free tool — get an exact estimate for your project with the{" "}
          <Link href="/calculators/">HomeCalcify calculators</Link>: concrete, roofing, flooring,
          decking, fencing, painting, drywall, insulation, siding, and more.
        </p>
      </PageShell>
    </>
  );
}

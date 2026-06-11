import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";

export const metadata: Metadata = {
  title: "Our Methodology — How We Calculate",
  description:
    "How HomeCalcify builds and verifies its calculators: the formulas, coverage rates, waste factors, and review process behind every estimate.",
  alternates: { canonical: "/methodology/" },
};

export default function MethodologyPage() {
  return (
    <PageShell
      title="How we calculate"
      lead="Transparency is part of trust. Here's exactly how our estimates are built and checked."
      crumbs={[{ name: "Home", path: "/" }, { name: "Methodology", path: "/methodology/" }]}
    >
      <h2>Documented formulas</h2>
      <p>
        Every calculator shows the formula it uses and a step-by-step manual method. Nothing is a
        black box — you can reproduce any result by hand and verify it yourself.
      </p>

      <h2>Industry-standard rates</h2>
      <p>
        We use widely accepted coverage rates and conversions, for example:
      </p>
      <ul>
        <li><strong>Concrete:</strong> 27 cubic feet per cubic yard; 0.45 ft³ per 60 lb bag, 0.6 ft³ per 80 lb bag.</li>
        <li><strong>Paint:</strong> ~350 sq ft of coverage per gallon per coat.</li>
        <li><strong>Roofing:</strong> 100 sq ft per square; 3 shingle bundles per square.</li>
        <li><strong>Asphalt:</strong> ~145 lb/ft³ for compacted hot-mix.</li>
      </ul>

      <h2>Waste factors</h2>
      <p>
        Real projects produce offcuts and spillage, so we build in adjustable waste allowances —
        typically 5–15% depending on the material and layout. You can change these to match your job.
      </p>

      <h2>Expert review</h2>
      <p>
        Licensed tradespeople review our formulas and defaults. Meet them on the{" "}
        <a href="/our-experts/">our experts</a> page.
      </p>

      <h2>Updates</h2>
      <p>
        We revisit tools as materials and best practices evolve, and we show a "last updated" date on
        every calculator so you know how current it is.
      </p>

      <h2>Estimates, not guarantees</h2>
      <p>
        Our results are accurate for planning and budgeting, but site conditions vary. Always confirm
        final quantities with your supplier or a professional. See our{" "}
        <a href="/disclaimer/">disclaimer</a>.
      </p>
    </PageShell>
  );
}

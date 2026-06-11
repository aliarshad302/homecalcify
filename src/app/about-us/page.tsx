import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";

export const metadata: Metadata = {
  title: "About Us — Who Builds HomeCalcify",
  description:
    "HomeCalcify builds free, accurate home improvement calculators reviewed by licensed contractors. Learn about our mission, team, and how we keep estimates trustworthy.",
  alternates: { canonical: "/about-us/" },
};

export default function AboutPage() {
  return (
    <PageShell
      title="About HomeCalcify"
      lead="Free, accurate estimating tools for homeowners, DIYers, and contractors — built and reviewed by people who do this work."
      crumbs={[{ name: "Home", path: "/" }, { name: "About Us", path: "/about-us/" }]}
    >
      <p>
        HomeCalcify exists to answer one question that starts almost every home improvement project:
        <strong> how much material do I actually need?</strong> Guessing wastes money and time —
        either you over-order and eat the cost, or you run short mid-job. Our calculators replace the
        guesswork with fast, reliable math.
      </p>

      <h2>What we do</h2>
      <p>
        We build free calculators for concrete, roofing, flooring, tile, paint, drywall, mulch, and
        paving — with more added every month. Each tool gives you quantities, material counts, and a
        cost estimate, and every page explains the formula so you can check the work yourself.
      </p>

      <h2>How we keep estimates accurate</h2>
      <p>
        Every calculator's formula is documented and reviewed by experienced tradespeople. We use
        industry-standard coverage rates, waste factors, and conversions, and we update tools as
        materials and best practices change. See our{" "}
        <a href="/methodology/">methodology</a> for the full picture, and our{" "}
        <a href="/our-experts/">expert reviewers</a> for who checks the numbers.
      </p>

      <h2>Who we serve</h2>
      <ul>
        <li><strong>Homeowners</strong> planning a weekend project or a major renovation.</li>
        <li><strong>DIYers</strong> who want to buy the right amount the first time.</li>
        <li><strong>Contractors and estimators</strong> who need a fast second opinion on quantities.</li>
      </ul>

      <h2>A note on estimates</h2>
      <p>
        Our tools produce close estimates for planning and budgeting. Site conditions vary, so always
        confirm critical quantities with your supplier or a licensed professional before ordering.
        Read our <a href="/disclaimer/">disclaimer</a> for details.
      </p>

      <h2>Get in touch</h2>
      <p>
        Have a calculator request or found an issue? We'd love to hear from you on our{" "}
        <a href="/contact-us/">contact page</a>.
      </p>
    </PageShell>
  );
}

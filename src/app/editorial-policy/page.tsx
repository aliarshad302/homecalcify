import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description:
    "HomeCalcify's editorial standards: how we research, write, review, and update our calculators and home improvement guides.",
  alternates: { canonical: "/editorial-policy/" },
};

export default function EditorialPolicyPage() {
  return (
    <PageShell
      title="Editorial policy"
      lead="The standards that govern how we create and maintain our content."
      crumbs={[{ name: "Home", path: "/" }, { name: "Editorial Policy", path: "/editorial-policy/" }]}
      updated="2026-06-11"
    >
      <h2>Accuracy first</h2>
      <p>
        Our goal is to be genuinely useful. Every calculator and guide is built to be correct,
        practical, and easy to act on. We document our formulas so readers can verify the math.
      </p>

      <h2>Research and sources</h2>
      <p>
        We base coverage rates, conversions, and best practices on established industry standards and
        manufacturer specifications. Where practices vary by region, we say so.
      </p>

      <h2>Expert review</h2>
      <p>
        Technical content is reviewed by licensed tradespeople before publication and re-checked when
        standards change. Reviewers are credited on the relevant pages.
      </p>

      <h2>Independence</h2>
      <p>
        Our calculators and recommendations are not influenced by advertisers. Ads shown on the site
        are clearly labeled and kept separate from editorial content.
      </p>

      <h2>Corrections</h2>
      <p>
        If you spot an error, tell us via the <a href="/contact-us/">contact page</a>. We correct
        confirmed issues promptly and update the page's "last updated" date.
      </p>

      <h2>Updates</h2>
      <p>
        We periodically review published tools and guides to keep them current and accurate.
      </p>
    </PageShell>
  );
}

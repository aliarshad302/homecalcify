import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";

export const metadata: Metadata = {
  title: "Our Experts — Who Reviews Our Calculators",
  description:
    "Meet the licensed contractors and tradespeople who review HomeCalcify's formulas and content for accuracy.",
  alternates: { canonical: "/our-experts/" },
};

export default function OurExpertsPage() {
  return (
    <PageShell
      title="Our experts"
      lead="The tradespeople who review our formulas and keep our estimates trustworthy."
      crumbs={[{ name: "Home", path: "/" }, { name: "Our Experts", path: "/our-experts/" }]}
    >
      <p>
        Accurate estimates require real-world experience, not just math. Our calculators and guides
        are checked against industry standards and reviewed by experienced tradespeople who catch the
        details — waste factors, regional practices, and the assumptions that matter on a real job
        site.
      </p>

      <h2>How review works</h2>
      <ul>
        <li>Each calculator's formula and default values are checked against industry standards.</li>
        <li>Content is reviewed for practical accuracy, not just technical correctness.</li>
        <li>Tools are re-checked when materials, codes, or best practices change.</li>
      </ul>

      <p>
        Learn more about our process on the <a href="/methodology/">methodology page</a>.
      </p>
    </PageShell>
  );
}

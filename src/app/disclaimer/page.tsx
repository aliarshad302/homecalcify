import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "HomeCalcify provides estimates for informational purposes only. Always verify quantities with a professional before purchasing.",
  alternates: { canonical: "/disclaimer/" },
};

export default function DisclaimerPage() {
  return (
    <PageShell
      title="Disclaimer"
      crumbs={[{ name: "Home", path: "/" }, { name: "Disclaimer", path: "/disclaimer/" }]}
      updated="2026-06-11"
    >
      <h2>Estimates only</h2>
      <p>
        The calculators and content on HomeCalcify are provided for general informational and
        planning purposes only. Results are <strong>estimates</strong> based on the values you enter
        and standard industry assumptions. They are not a substitute for professional measurement,
        engineering, or advice.
      </p>

      <h2>No guarantee of accuracy</h2>
      <p>
        Actual material requirements vary with site conditions, product specifications, waste, and
        installation methods. We make no warranty, express or implied, regarding the accuracy,
        completeness, or suitability of any result for your specific project.
      </p>

      <h2>Verify before you buy</h2>
      <p>
        Always confirm quantities, measurements, and costs with your material supplier and a licensed
        professional before purchasing or beginning work. You are responsible for decisions made
        based on information from this Site.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        HomeCalcify and its contributors are not liable for any loss, cost, or damage arising from the
        use of, or reliance on, the calculators or content provided on this Site.
      </p>

      <h2>External links</h2>
      <p>
        The Site may link to third-party websites. We are not responsible for the content or
        practices of those sites.
      </p>

    </PageShell>
  );
}

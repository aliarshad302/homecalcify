import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms governing your use of HomeCalcify's website and calculators.",
  alternates: { canonical: "/terms-conditions/" },
};

export default function TermsPage() {
  return (
    <PageShell
      title="Terms & conditions"
      crumbs={[{ name: "Home", path: "/" }, { name: "Terms & Conditions", path: "/terms-conditions/" }]}
      updated="2026-06-11"
    >
      <p>
        These Terms &amp; Conditions ("Terms") govern your use of <strong>homecalcify.com</strong>
        (the "Site"). By accessing or using the Site, you agree to these Terms. If you do not agree,
        please do not use the Site.
      </p>

      <h2>Use of the Site</h2>
      <p>
        You may use the Site and its calculators for personal and commercial estimating purposes. You
        agree not to misuse the Site, attempt to disrupt it, or use it for any unlawful purpose.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The Site's content, design, and calculators are owned by HomeCalcify and protected by
        applicable law. You may not copy, reproduce, or redistribute substantial portions without
        permission.
      </p>

      <h2>Estimates and no warranty</h2>
      <p>
        Calculator results are estimates provided "as is" without warranty of any kind. See our{" "}
        <a href="/disclaimer/">disclaimer</a> for details. We do not guarantee the Site will be
        uninterrupted or error-free.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, HomeCalcify is not liable for any indirect,
        incidental, or consequential damages arising from your use of the Site.
      </p>

      <h2>Third-party content and ads</h2>
      <p>
        The Site displays third-party advertising and may link to external sites. We are not
        responsible for third-party content. See our <a href="/privacy-policy/">privacy policy</a>.
      </p>

      <h2>Changes</h2>
      <p>We may update these Terms at any time. Continued use of the Site means you accept the revised Terms.</p>

      <h2>Contact</h2>
      <p>Questions? Email <a href="mailto:hello@homecalcify.com">hello@homecalcify.com</a>.</p>
    </PageShell>
  );
}

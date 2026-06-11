import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How HomeCalcify collects, uses, and protects your information, including cookies and third-party advertising.",
  alternates: { canonical: "/privacy-policy/" },
};

export default function PrivacyPolicyPage() {
  return (
    <PageShell
      title="Privacy policy"
      crumbs={[{ name: "Home", path: "/" }, { name: "Privacy Policy", path: "/privacy-policy/" }]}
      updated="2026-06-11"
    >
      <p>
        This Privacy Policy explains how HomeCalcify ("we", "us") handles information when you use{" "}
        <strong>homecalcify.com</strong> (the "Site"). By using the Site, you agree to this policy.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li><strong>Usage data:</strong> pages visited, device and browser type, and approximate location, collected automatically through analytics.</li>
        <li><strong>Calculator inputs:</strong> values you enter are processed in your browser to produce results and are not stored on our servers.</li>
        <li><strong>Contact data:</strong> if you email us, we receive the information you choose to share.</li>
      </ul>

      <h2>Cookies and analytics</h2>
      <p>
        We use cookies and similar technologies to understand how the Site is used and to improve it.
        You can control cookies through your browser settings.
      </p>

      <h2>Advertising</h2>
      <p>
        We use third-party advertising, including Google AdSense. Third-party vendors, including
        Google, use cookies to serve ads based on your prior visits to this and other websites.
        Google's use of advertising cookies enables it and its partners to serve ads to you. You can
        opt out of personalized advertising by visiting{" "}
        <a href="https://www.google.com/settings/ads" rel="noopener noreferrer" target="_blank">Google Ads Settings</a>.
      </p>

      <h2>How we use information</h2>
      <ul>
        <li>To operate, maintain, and improve the Site and its calculators</li>
        <li>To analyze traffic and usage trends</li>
        <li>To respond to your inquiries</li>
        <li>To display relevant advertising</li>
      </ul>

      <h2>Your rights</h2>
      <p>
        Depending on your location, you may have rights to access, correct, or delete your personal
        information, or to object to certain processing. Contact us to exercise these rights.
      </p>

      <h2>Children's privacy</h2>
      <p>The Site is not directed to children under 13, and we do not knowingly collect their data.</p>

      <h2>Changes to this policy</h2>
      <p>We may update this policy from time to time. The "last updated" date above reflects the latest revision.</p>

      <h2>Contact</h2>
      <p>Questions about this policy? Email <a href="mailto:hello@homecalcify.com">hello@homecalcify.com</a>.</p>
    </PageShell>
  );
}

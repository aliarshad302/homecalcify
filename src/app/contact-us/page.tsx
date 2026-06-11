import type { Metadata } from "next";
import { Mail, MessageSquare } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the HomeCalcify team. Request a new calculator, report an issue, or send feedback about our home improvement estimating tools.",
  alternates: { canonical: "/contact-us/" },
};

export default function ContactPage() {
  return (
    <PageShell
      title="Contact us"
      lead="Questions, calculator requests, or feedback — we read every message."
      crumbs={[{ name: "Home", path: "/" }, { name: "Contact Us", path: "/contact-us/" }]}
    >
      <p>
        The fastest way to reach us is by email. We typically reply within two business days.
      </p>

      <h2>Email</h2>
      <p className="flex items-center gap-2">
        <Mail className="size-5 text-primary" />
        <a href="mailto:hello@homecalcify.com">hello@homecalcify.com</a>
      </p>

      <h2>What to include</h2>
      <ul>
        <li><MessageSquare className="mr-1 inline size-4 text-primary" /> The calculator or page you're writing about</li>
        <li>What you expected versus what happened, if you're reporting an issue</li>
        <li>For new tools, the project type and the units you work in</li>
      </ul>

      <h2>Calculator requests</h2>
      <p>
        We prioritize new calculators based on reader demand. If there's an estimate you wish we had,
        tell us — many of our tools started as a single email.
      </p>

      <h2>Business & press</h2>
      <p>
        For partnership or media inquiries, use the same address with "Partnership" or "Press" in the
        subject line and we'll route it to the right person.
      </p>
    </PageShell>
  );
}

import Link from "next/link";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Popular Calculators",
    links: [
      { label: "Concrete", href: "/concrete-calculator/" },
      { label: "Roofing", href: "/roofing-calculator/" },
      { label: "Flooring", href: "/flooring-calculator/" },
      { label: "Paint", href: "/paint-calculator/" },
      { label: "Drywall", href: "/drywall-calculator/" },
      { label: "Tile", href: "/tile-calculator/" },
      { label: "Mulch", href: "/mulch-calculator/" },
    ],
  },
  {
    title: "Categories",
    links: [
      { label: "Concrete", href: "/concrete/" },
      { label: "Roofing", href: "/roofing/" },
      { label: "Flooring", href: "/flooring/" },
      { label: "Painting", href: "/painting/" },
      { label: "Drywall", href: "/drywall/" },
      { label: "Landscaping", href: "/landscaping/" },
      { label: "Driveway & Paving", href: "/driveway-paving/" },
    ],
  },
  {
    title: "Guides",
    links: [
      { label: "How much concrete do I need?", href: "/guides/how-much-concrete-do-i-need/" },
      { label: "Coverage charts", href: "/guides/" },
      { label: "Cost guides", href: "/guides/" },
      { label: "Material comparisons", href: "/guides/" },
      { label: "View all guides", href: "/guides/" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about-us/" },
      { label: "Our Experts", href: "/our-experts/" },
      { label: "Methodology", href: "/methodology/" },
      { label: "Contact", href: "/contact-us/" },
      { label: "Editorial Policy", href: "/editorial-policy/" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t bg-muted/30">
      <div className="container grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="font-display text-sm font-semibold">{col.title}</h3>
            <ul className="mt-3 space-y-2">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t">
        <div className="container flex flex-col gap-2 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} HomeCalcify. Estimates only — always verify with a professional.</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy/" className="hover:text-primary">Privacy</Link>
            <Link href="/disclaimer/" className="hover:text-primary">Disclaimer</Link>
            <Link href="/terms-conditions/" className="hover:text-primary">Terms</Link>
            <Link href="/sitemap.xml" className="hover:text-primary">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

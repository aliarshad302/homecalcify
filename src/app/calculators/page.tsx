import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Card } from "@/components/ui/card";
import { calculators } from "@/config/calculators";
import { hubs } from "@/config/hubs";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "All Calculators — Free Home Improvement Tools",
  description:
    "Browse every HomeCalcify calculator for concrete, roofing, flooring, tile, paint, drywall, mulch, and asphalt. Free, accurate material and cost estimators.",
  alternates: { canonical: "/calculators/" },
};

export default function CalculatorsIndexPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Calculators", path: "/calculators/" },
  ];

  return (
    <div className="container max-w-5xl py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema(crumbs)) }}
      />
      <Breadcrumbs items={crumbs} />

      <header>
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          All home improvement calculators
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-muted-foreground">
          Every HomeCalcify tool in one place. Pick a calculator to estimate materials, quantities,
          and cost in seconds — all free and mobile-friendly.
        </p>
      </header>

      {hubs.map((hub) => {
        const calcs = calculators.filter((c) => c.category === hub.slug);
        if (!calcs.length) return null;
        return (
          <section key={hub.slug} className="mt-10">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold tracking-tight">{hub.name}</h2>
              <Link href={`/${hub.slug}/`} className="text-sm font-medium text-primary hover:underline">
                {hub.name} hub →
              </Link>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {calcs.map((c) => (
                <Link key={c.slug} href={`/${c.slug}/`} className="group">
                  <Card className="h-full p-5 transition-shadow hover:shadow-result">
                    <div className="flex items-center gap-2 text-primary">
                      <Calculator className="size-5" />
                      <h3 className="font-display font-semibold text-foreground">{c.name}</h3>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{c.description}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      Open <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

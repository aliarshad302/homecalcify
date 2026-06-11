import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Card } from "@/components/ui/card";
import { calculators } from "@/config/calculators";
import { hubs } from "@/config/hubs";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Categories — Browse Calculators by Project Type",
  description:
    "Explore HomeCalcify by category: concrete, roofing, flooring, painting, drywall, landscaping, and driveway paving. Find the right calculator for your project.",
  alternates: { canonical: "/categories/" },
};

export default function CategoriesIndexPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories/" },
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
          Browse by category
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-muted-foreground">
          Each category hub gathers the calculators and guides for a type of project — from concrete
          and roofing to flooring, painting, and paving.
        </p>
      </header>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {hubs.map((hub) => {
          const count = calculators.filter((c) => c.category === hub.slug).length;
          return (
            <Link key={hub.slug} href={`/${hub.slug}/`} className="group">
              <Card className="h-full p-6 transition-shadow hover:shadow-result">
                <div className="flex items-baseline justify-between">
                  <h2 className="font-display text-xl font-semibold">{hub.name}</h2>
                  <span className="text-xs font-medium text-muted-foreground">
                    {count} tool{count === 1 ? "" : "s"}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{hub.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Explore {hub.name}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

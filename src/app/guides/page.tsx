import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Card } from "@/components/ui/card";
import { guides } from "@/config/guides";
import { hubs } from "@/config/hubs";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Home Improvement Guides — Material & Cost Estimating",
  description:
    "Practical guides on estimating materials and costs for concrete, roofing, flooring, paint, drywall, mulch, and paving projects.",
  alternates: { canonical: "/guides/" },
};

const hubName = (slug: string) => hubs.find((h) => h.slug === slug)?.name ?? slug;

export default function GuidesIndexPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides/" },
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
          Home improvement guides
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-muted-foreground">
          Clear, practical answers to the "how much do I need?" questions — with formulas, coverage
          charts, and cost ranges to help you plan and budget any project.
        </p>
      </header>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {guides.map((g) => (
          <Link key={g.slug} href={`/guides/${g.slug}/`} className="group">
            <Card className="h-full p-6 transition-shadow hover:shadow-result">
              <div className="flex items-center gap-2 text-primary">
                <BookOpen className="size-5" />
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {hubName(g.category)}
                </span>
              </div>
              <h2 className="mt-2 font-display text-lg font-semibold">{g.title}</h2>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{g.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Read guide <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

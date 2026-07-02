import { CalculatorShell } from "./calculator-shell";
import { FaqBlock } from "./faq-block";
import { RelatedGrid } from "./related-grid";
import { AuthorByline, AboutAuthor } from "./author-byline";
import { AdSlot } from "@/components/ads/ad-slot";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Card } from "@/components/ui/card";
import {
  breadcrumbSchema,
  calculatorSchema,
  faqSchema,
  howToSchema,
  jsonLd,
} from "@/lib/schema";
import { clusterLinks } from "@/lib/programmatic/registry";
import type { CalculatorConfig } from "@/lib/calculator/types";
import Link from "next/link";
import { AlertTriangle, ArrowRight } from "lucide-react";

interface CalculatorPageProps {
  config: CalculatorConfig;
  /** ISO date for the last-updated byline. */
  updated?: string;
}

/**
 * The full calculator page — the 12-block authority structure.
 * Every one of the 150 calculators renders through this single template, so
 * UX, schema, ad placement, and internal linking stay consistent everywhere.
 */
export function CalculatorPage({
  config,
  updated = new Date().toISOString(),
}: CalculatorPageProps) {
  const { content } = config;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: config.categoryLabel, path: `/${config.category}/` },
    { name: config.name, path: `/${config.slug}/` },
  ];

  return (
    <article className="container max-w-5xl py-8">
      {/* Schema: SoftwareApplication + HowTo + FAQPage + Breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            calculatorSchema(config),
            howToSchema(config),
            faqSchema(content.faqs ?? []),
            breadcrumbSchema(crumbs),
          ),
        }}
      />

      <Breadcrumbs items={crumbs} />

      {/* 1. Intro + AEO answer block */}
      <header>
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {config.name}
        </h1>
        <p className="mt-3 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          {content.answer}
        </p>

        {/* Quick-fact stat strip */}
        {content.quickFacts && content.quickFacts.length > 0 && (
          <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {content.quickFacts.map((f) => (
              <div key={f.label} className="rounded-lg border bg-muted/40 px-4 py-3">
                <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {f.label}
                </dt>
                <dd className="font-display text-lg font-bold text-primary">{f.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </header>

      {/* 2 + 3. Calculator tool + result (above the fold, NO ad above this).
          Pass only the slug — the client shell resolves the config (with its
          compute function) to avoid serializing a function across the boundary. */}
      <div className="mt-8">
        <CalculatorShell slug={config.slug} />
      </div>

      {/* Ad #1 — after the result, peak engagement */}
      <AdSlot slotId="0000000001" format="in-article" />

      {/* 4. Formula */}
      {content.formula && (
        <section className="prose-section">
          <h2 className="font-display text-2xl font-bold tracking-tight">The formula</h2>
          <Card className="mt-3 bg-muted/40 p-5">
            <code className="text-sm">{content.formula}</code>
          </Card>
        </section>
      )}

      {/* 5. Manual method (HowTo) */}
      {content.steps && content.steps.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            How to calculate it manually
          </h2>
          <ol className="mt-4 space-y-4">
            {content.steps.map((s, i) => (
              <li key={i} className="flex gap-4">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary/10 font-display font-semibold text-primary">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-medium">{s.title}</h3>
                  <p className="text-muted-foreground">{s.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* 6. Worked example */}
      {content.example && (
        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold tracking-tight">Example calculation</h2>
          <Card className="mt-3 border-l-4 border-l-accent p-5">
            <p className="text-muted-foreground">{content.example}</p>
          </Card>
        </section>
      )}

      {/* 7. Cost / reference tables */}
      {content.tables?.map((table) => (
        <section key={table.title} className="mt-10">
          <h2 className="font-display text-2xl font-bold tracking-tight">{table.title}</h2>
          {table.caption && <p className="mt-1 text-muted-foreground">{table.caption}</p>}
          <div className="mt-4 overflow-x-auto rounded-lg border">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/60">
                  {table.columns.map((col) => (
                    <th key={col} className="px-4 py-3 text-left font-semibold">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, ri) => (
                  <tr key={ri} className="border-t">
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className={ci === 0 ? "px-4 py-3 font-medium text-foreground" : "px-4 py-3 text-muted-foreground"}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      {/* Ad #2 — mid-content scroll break */}
      <AdSlot slotId="0000000002" format="in-article" />

      {/* 9. Common mistakes */}
      {content.mistakes && content.mistakes.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            Common {config.name.replace(" Calculator", "").toLowerCase()} estimating mistakes
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {content.mistakes.map((m) => (
              <Card key={m.title} className="border-l-4 border-l-destructive/70 p-5">
                <h3 className="flex items-center gap-2 font-display font-semibold">
                  <AlertTriangle className="size-4 text-destructive" />
                  {m.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{m.detail}</p>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* 11. FAQ */}
      {content.faqs && content.faqs.length > 0 && (
        <section className="mt-10">
          <FaqBlock faqs={content.faqs} />
        </section>
      )}

      {/* Down-links into the blog/guide layer */}
      {content.guides && content.guides.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold tracking-tight">Related guides</h2>
          <ul className="mt-4 space-y-2">
            {content.guides.map((g) => (
              <li key={g.href}>
                <Link
                  href={g.href}
                  className="inline-flex items-center gap-2 font-medium text-primary hover:underline"
                >
                  <ArrowRight className="size-4" />
                  {g.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 12. Sibling cross-links */}
      {content.related && content.related.length > 0 && (
        <section className="mt-10">
          <RelatedGrid slugs={content.related} />
        </section>
      )}

      {/* Cluster tools — links this calculator's cost / guide / how-to pages
          (surfaces those pages for crawlers instead of leaving them orphaned) */}
      {clusterLinks(config.slug).filter((l) => l.type !== "main").length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            More {config.categoryLabel.toLowerCase()} tools &amp; guides
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {clusterLinks(config.slug)
              .filter((l) => l.type !== "main")
              .map((l) => (
                <Link key={l.href} href={l.href} className="group">
                  <Card className="flex items-center justify-between p-4 transition-shadow hover:shadow-result">
                    <span className="font-medium">{l.label}</span>
                    <ArrowRight className="size-4 text-primary transition-transform group-hover:translate-x-0.5" />
                  </Card>
                </Link>
              ))}
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="mt-12 overflow-hidden rounded-xl bg-gradient-to-br from-primary to-[hsl(221_83%_45%)] p-8 text-center text-primary-foreground">
        <h2 className="font-display text-2xl font-bold tracking-tight">
          Ready to start your {config.categoryLabel.toLowerCase()} project?
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-primary-foreground/80">
          Run the numbers above, then explore related tools and guides to plan every step.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link
            href={`/${config.category}/`}
            className="inline-flex items-center gap-1 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground hover:bg-accent/90"
          >
            More {config.categoryLabel} calculators <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/calculators/"
            className="inline-flex items-center gap-1 rounded-md border border-primary-foreground/30 bg-primary-foreground/10 px-5 py-2.5 text-sm font-medium hover:bg-primary-foreground/20"
          >
            Browse all calculators
          </Link>
        </div>
      </section>

      {/* EEAT byline + about the author */}
      <div className="mt-10">
        <AuthorByline updated={updated} />
      </div>
      <AboutAuthor />
    </article>
  );
}

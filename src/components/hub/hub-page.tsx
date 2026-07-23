import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { RelatedGrid } from "@/components/calculator/related-grid";
import { FaqBlock } from "@/components/calculator/faq-block";
import { AdSlot } from "@/components/ads/ad-slot";
import { Card } from "@/components/ui/card";
import { getCalculatorsByCategory } from "@/config/calculators";
import { getHub, type HubConfig } from "@/config/hubs";
import { pageRegistry } from "@/lib/programmatic/registry";
import {
  breadcrumbSchema,
  collectionPageSchema,
  faqSchema,
  jsonLd,
} from "@/lib/schema";

/** Category hub template — the silo center that links to all its calculators. */
export function HubPage({ hub }: { hub: HubConfig }) {
  const calcs = getCalculatorsByCategory(hub.slug);
  const catSlugs = new Set(calcs.map((c) => c.slug));
  const costPages = pageRegistry.filter((p) => p.type === "cost" && catSlugs.has(p.calculatorSlug));
  const locationPages = pageRegistry.filter((p) => p.type === "location" && catSlugs.has(p.calculatorSlug));
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories/" },
    { name: hub.name, path: `/${hub.slug}/` },
  ];

  return (
    <div className="container max-w-5xl py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            collectionPageSchema(`${hub.name} Calculators`, `/${hub.slug}/`, hub.description),
            faqSchema(hub.faqs),
            breadcrumbSchema(crumbs),
          ),
        }}
      />

      <Breadcrumbs items={crumbs} />

      <header>
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {hub.name} Calculators
        </h1>
        <p className="mt-3 max-w-3xl text-lg leading-relaxed text-muted-foreground">{hub.intro}</p>
      </header>

      {/* Calculators in this category */}
      <section className="mt-8">
        <h2 className="font-display text-2xl font-bold tracking-tight">
          {hub.name} calculators
        </h2>
        <div className="mt-4">
          <RelatedGrid slugs={calcs.map((c) => c.slug)} />
        </div>
      </section>

      {/* What you can estimate */}
      <section className="mt-10">
        <h2 className="font-display text-2xl font-bold tracking-tight">
          What you can estimate
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {hub.whatYouCanEstimate.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <Check className="mt-0.5 size-5 shrink-0 text-success" />
              <span className="text-muted-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Long-form editorial body */}
      {hub.body && hub.body.length > 0 && (
        <section className="prose-page mt-10 max-w-3xl">
          {hub.body.map((s, i) => (
            <div key={i}>
              <h2>{s.heading}</h2>
              {s.paragraphs?.map((p, j) => <p key={j}>{p}</p>)}
              {s.bullets && (
                <ul>
                  {s.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              )}
              {s.table && (
                <div className="not-prose my-4 overflow-x-auto rounded-lg border">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-muted/60">
                        {s.table.columns.map((c) => <th key={c} className="px-4 py-3 text-left font-semibold">{c}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {s.table.rows.map((row, ri) => (
                        <tr key={ri} className="border-t">
                          {row.map((cell, ci) => (
                            <td key={ci} className={ci === 0 ? "px-4 py-3 font-medium text-foreground" : "px-4 py-3 text-muted-foreground"}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      <AdSlot slotId="0000000010" format="in-article" />

      {/* Guides */}
      {hub.guides.length > 0 && (
        <section className="mt-4">
          <h2 className="font-display text-2xl font-bold tracking-tight">{hub.name} guides</h2>
          <ul className="mt-4 space-y-2">
            {hub.guides.map((g) => (
              <li key={g.href}>
                <Link href={g.href} className="inline-flex items-center gap-2 font-medium text-primary hover:underline">
                  <ArrowRight className="size-4" />
                  {g.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Cost calculators (surfaces the programmatic cost pages) */}
      {costPages.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold tracking-tight">{hub.name} cost calculators</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {costPages.map((p) => (
              <Link key={p.slug} href={`/${p.slug}/`} className="group">
                <Card className="flex items-center justify-between p-4 transition-shadow hover:shadow-result">
                  <span className="font-medium">{p.h1}</span>
                  <ArrowRight className="size-4 text-primary transition-transform group-hover:translate-x-0.5" />
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Local cost guides (surfaces the state/location pages) */}
      {locationPages.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold tracking-tight">{hub.name} costs by state</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {locationPages.map((p) => (
              <Link
                key={p.slug}
                href={`/${p.slug}/`}
                className="rounded-full border px-3 py-1 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {p.h1}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      {hub.faqs.length > 0 && (
        <section className="mt-10">
          <FaqBlock faqs={hub.faqs} heading={`${hub.name} FAQs`} />
        </section>
      )}

      {/* Related hubs */}
      {hub.relatedHubs.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold tracking-tight">Explore more categories</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {hub.relatedHubs.map((slug) => {
              const rel = getHub(slug);
              if (!rel) return null;
              return (
                <Link key={slug} href={`/${slug}/`}>
                  <Card className="px-4 py-3 transition-shadow hover:shadow-result">
                    <span className="font-medium text-primary">{rel.name}</span>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

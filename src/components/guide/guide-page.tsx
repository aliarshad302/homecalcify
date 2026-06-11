import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { FaqBlock } from "@/components/calculator/faq-block";
import { AdSlot } from "@/components/ads/ad-slot";
import { Card } from "@/components/ui/card";
import { getCalculator } from "@/config/calculators";
import { getGuide, type GuideConfig } from "@/config/guides";
import {
  articleSchema,
  breadcrumbSchema,
  faqSchema,
  jsonLd,
} from "@/lib/schema";

/** Guide/blog template — links down to its calculator and across to siblings. */
export function GuidePage({ guide }: { guide: GuideConfig }) {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides/" },
    { name: guide.title, path: `/guides/${guide.slug}/` },
  ];
  const calc = guide.calculatorSlug ? getCalculator(guide.calculatorSlug) : undefined;

  return (
    <article className="container max-w-3xl py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            articleSchema({
              title: guide.title,
              description: guide.description,
              path: `/guides/${guide.slug}/`,
              updated: guide.updated,
            }),
            faqSchema(guide.faqs ?? []),
            breadcrumbSchema(crumbs),
          ),
        }}
      />
      <Breadcrumbs items={crumbs} />

      <header>
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{guide.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Updated{" "}
          <time dateTime={guide.updated}>
            {new Date(guide.updated).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </time>
        </p>
        {/* AEO answer block */}
        <p className="mt-4 rounded-lg border-l-4 border-l-primary bg-muted/40 p-4 text-lg leading-relaxed">
          {guide.answer}
        </p>
      </header>

      {/* Calculator CTA — down-link into the tool */}
      {calc && (
        <Card className="mt-6 flex flex-col items-start gap-3 border-primary/30 bg-primary/5 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Calculator className="size-6 text-primary" />
            <div>
              <p className="font-display font-semibold">Skip the math</p>
              <p className="text-sm text-muted-foreground">Get instant numbers with the {calc.name}.</p>
            </div>
          </div>
          <Link
            href={`/${calc.slug}/`}
            className="inline-flex items-center gap-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Open calculator <ArrowRight className="size-4" />
          </Link>
        </Card>
      )}

      <div className="prose-page mt-8">
        {guide.sections.map((s, i) => (
          <section key={i}>
            <h2>{s.heading}</h2>
            {s.paragraphs?.map((p, j) => <p key={j}>{p}</p>)}
            {s.bullets && (
              <ul>
                {s.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            )}
            {i === 0 && <AdSlot slotId="0000000020" format="in-article" />}
          </section>
        ))}
      </div>

      {guide.faqs && guide.faqs.length > 0 && (
        <section className="mt-10">
          <FaqBlock faqs={guide.faqs} />
        </section>
      )}

      {/* Related guides */}
      {guide.related && guide.related.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold tracking-tight">Related guides</h2>
          <ul className="mt-4 space-y-2">
            {guide.related.map((slug) => {
              const rel = getGuide(slug);
              if (!rel) return null;
              return (
                <li key={slug}>
                  <Link href={`/guides/${slug}/`} className="inline-flex items-center gap-2 font-medium text-primary hover:underline">
                    <ArrowRight className="size-4" />
                    {rel.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </article>
  );
}

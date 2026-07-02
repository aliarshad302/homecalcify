import Link from "next/link";
import { ArrowRight, Calculator, ListChecks } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { FaqBlock } from "@/components/calculator/faq-block";
import { AdSlot } from "@/components/ads/ad-slot";
import { Card } from "@/components/ui/card";
import { getCalculator } from "@/config/calculators";
import { guides, getGuide, type GuideConfig } from "@/config/guides";
import { AuthorByline, AboutAuthor } from "@/components/calculator/author-byline";
import { articleSchema, breadcrumbSchema, faqSchema, jsonLd } from "@/lib/schema";

/** "How Long Does Concrete Cure" → "how-long-does-concrete-cure" */
function anchorId(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/** Long-form guide/blog template — TOC, intro, takeaways, tables, internal links. */
export function GuidePage({ guide }: { guide: GuideConfig }) {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides/" },
    { name: guide.title, path: `/guides/${guide.slug}/` },
  ];
  const calc = guide.calculatorSlug ? getCalculator(guide.calculatorSlug) : undefined;
  const showToc = guide.sections.length >= 4;

  // Ensure every guide links to 3–4 related guides: use the explicit list, then
  // top up with same-category siblings so no guide is left under-linked.
  const explicit = (guide.related ?? []).filter((s) => getGuide(s));
  const relatedSlugs =
    explicit.length >= 3
      ? explicit.slice(0, 4)
      : [
          ...explicit,
          ...guides
            .filter((g) => g.category === guide.category && g.slug !== guide.slug && !explicit.includes(g.slug))
            .map((g) => g.slug),
        ].slice(0, 4);

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
        <p className="aeo-answer mt-4 rounded-lg border-l-4 border-l-primary bg-muted/40 p-4 text-lg leading-relaxed">
          {guide.answer}
        </p>
      </header>

      <div className="mt-4">
        <AuthorByline updated={guide.updated} />
      </div>

      {guide.intro && guide.intro.length > 0 && (
        <div className="prose-page mt-6">
          {guide.intro.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      )}

      {guide.keyTakeaways && guide.keyTakeaways.length > 0 && (
        <Card className="mt-6 border-l-4 border-l-accent bg-accent/5 p-5">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold">
            <ListChecks className="size-5 text-accent" /> Key takeaways
          </h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-6 text-muted-foreground">
            {guide.keyTakeaways.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </Card>
      )}

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

      {showToc && (
        <nav aria-label="Contents" className="mt-6 rounded-lg border bg-muted/30 p-5">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            On this page
          </h2>
          <ol className="mt-3 space-y-1.5">
            {guide.sections.map((s) => (
              <li key={s.heading}>
                <a href={`#${anchorId(s.heading)}`} className="text-sm font-medium text-primary hover:underline">
                  {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      <div className="prose-page mt-8">
        {guide.sections.map((s, i) => (
          <section key={i}>
            <h2 id={anchorId(s.heading)} className="scroll-mt-24">{s.heading}</h2>
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
            {(i === 0 || i === 3) && <AdSlot slotId={i === 0 ? "0000000020" : "0000000021"} format="in-article" />}
          </section>
        ))}
      </div>

      {guide.faqs && guide.faqs.length > 0 && (
        <section className="mt-10">
          <FaqBlock faqs={guide.faqs} />
        </section>
      )}

      {relatedSlugs.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold tracking-tight">Related guides</h2>
          <ul className="mt-4 space-y-2">
            {relatedSlugs.map((slug) => {
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

      <AboutAuthor />
    </article>
  );
}

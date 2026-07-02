import Link from "next/link";
import { ArrowRight, Check, MapPin, Wrench } from "lucide-react";
import { CalculatorShell } from "@/components/calculator/calculator-shell";
import { FaqBlock } from "@/components/calculator/faq-block";
import { RelatedGrid } from "@/components/calculator/related-grid";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { AdSlot } from "@/components/ads/ad-slot";
import { Card } from "@/components/ui/card";
import { AboutAuthor } from "@/components/calculator/author-byline";
import { getCalculator } from "@/config/calculators";
import {
  clusterLinks,
  relatedCalculatorSlugs,
  type PageDescriptor,
} from "@/lib/programmatic/registry";
import {
  articleSchema,
  breadcrumbSchema,
  calculatorSchema,
  faqSchema,
  howToSchema,
  jsonLd,
} from "@/lib/schema";
import type { CalculatorConfig } from "@/lib/calculator/types";

/** Generic but genuine cost drivers — keeps cost pages substantive, not thin. */
function costFactors(config: CalculatorConfig): string[] {
  const n = config.categoryLabel.toLowerCase();
  return [
    `Project size — larger ${n} jobs lower the cost per unit but raise the total.`,
    "Material grade — premium products cost more but often last longer.",
    "Labor rates — local wages and demand swing installed prices significantly.",
    "Region — prices vary by state and metro (see local cost pages below).",
    "Site access & prep — removal of old material and difficult access add cost.",
    "Season — booking in the off-season can cut labor pricing.",
  ];
}

function ClusterNav({ calculatorSlug, exclude }: { calculatorSlug: string; exclude: string }) {
  const links = clusterLinks(calculatorSlug).filter((l) => l.href !== exclude);
  if (!links.length) return null;
  return (
    <section className="mt-10">
      <h2 className="font-display text-2xl font-bold tracking-tight">Explore this topic</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="group">
            <Card className="flex items-center justify-between p-4 transition-shadow hover:shadow-result">
              <span className="font-medium">{l.label}</span>
              <ArrowRight className="size-4 text-primary transition-transform group-hover:translate-x-0.5" />
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}

function CalculatorCta({ config }: { config: CalculatorConfig }) {
  return (
    <Card className="mt-6 flex flex-col items-start gap-3 border-primary/30 bg-primary/5 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-display font-semibold">Get exact numbers</p>
        <p className="text-sm text-muted-foreground">Use the free {config.name} to estimate your project.</p>
      </div>
      <Link
        href={`/${config.slug}/`}
        className="inline-flex items-center gap-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        Open calculator <ArrowRight className="size-4" />
      </Link>
    </Card>
  );
}

export function ProgrammaticPage({ page }: { page: PageDescriptor }) {
  const config = getCalculator(page.calculatorSlug);
  if (!config) return null;
  const { content } = config;
  const selfHref = `/${page.slug}/`;

  const crumbs = [
    { name: "Home", path: "/" },
    { name: config.categoryLabel, path: `/${config.category}/` },
    { name: page.h1, path: selfHref },
  ];

  // Per-type schema.
  const schemas =
    page.type === "guide" || page.type === "howto"
      ? jsonLd(
          articleSchema({ title: page.title, description: page.description, path: selfHref, updated: "2026-06-12" }),
          page.type === "howto" ? howToSchema(config) : null,
          faqSchema(content.faqs ?? []),
          breadcrumbSchema(crumbs),
        )
      : jsonLd(calculatorSchema(config), faqSchema(content.faqs ?? []), breadcrumbSchema(crumbs));

  const related = relatedCalculatorSlugs(config.slug);

  return (
    <article className="container max-w-5xl py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemas }} />
      <Breadcrumbs items={crumbs} />

      <header>
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{page.h1}</h1>
      </header>

      {/* Type-specific body */}
      {page.type === "cost" && <CostBody config={config} />}
      {page.type === "guide" && <GuideBody config={config} />}
      {page.type === "howto" && <HowToBody config={config} page={page} />}
      {page.type === "location" && <LocationBody config={config} page={page} />}

      {/* FAQ */}
      {content.faqs && content.faqs.length > 0 && (
        <section className="mt-10">
          <FaqBlock faqs={content.faqs} />
        </section>
      )}

      {/* Internal linking: cluster + related calculators */}
      <ClusterNav calculatorSlug={config.slug} exclude={selfHref} />
      {related.length > 0 && (
        <section className="mt-10">
          <RelatedGrid slugs={related} />
        </section>
      )}

      <AboutAuthor />
    </article>
  );
}

// ── Cost page ──────────────────────────────────────────────────────
function CostBody({ config }: { config: CalculatorConfig }) {
  const name = config.name.replace(/\s*Calculator$/i, "");
  return (
    <>
      <p className="mt-3 max-w-3xl text-lg leading-relaxed text-muted-foreground">
        Use the {name.toLowerCase()} cost calculator below to get an instant material and installed
        price range for your project. {config.content.answer}
      </p>
      <div className="mt-8">
        <CalculatorShell slug={config.slug} />
      </div>
      <AdSlot slotId="0000000101" format="in-article" />

      {config.content.tables?.map((t) => (
        <section key={t.title} className="mt-10">
          <h2 className="font-display text-2xl font-bold tracking-tight">{t.title}</h2>
          {t.caption && <p className="mt-1 text-muted-foreground">{t.caption}</p>}
          <div className="mt-4 overflow-x-auto rounded-lg border">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/60">
                  {t.columns.map((c) => <th key={c} className="px-4 py-3 text-left font-semibold">{c}</th>)}
                </tr>
              </thead>
              <tbody>
                {t.rows.map((row, i) => (
                  <tr key={i} className="border-t">
                    {row.map((cell, j) => (
                      <td key={j} className={j === 0 ? "px-4 py-3 font-medium" : "px-4 py-3 text-muted-foreground"}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      <section className="mt-10">
        <h2 className="font-display text-2xl font-bold tracking-tight">What affects {name.toLowerCase()} cost</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {costFactors(config).map((f) => (
            <li key={f} className="flex items-start gap-2">
              <Check className="mt-0.5 size-5 shrink-0 text-success" />
              <span className="text-muted-foreground">{f}</span>
            </li>
          ))}
        </ul>
      </section>
      <AdSlot slotId="0000000102" format="in-article" />
    </>
  );
}

// ── Guide page ─────────────────────────────────────────────────────
function GuideBody({ config }: { config: CalculatorConfig }) {
  const name = config.name.replace(/\s*Calculator$/i, "");
  const c = config.content;
  return (
    <>
      <p className="mt-3 max-w-3xl text-lg leading-relaxed text-muted-foreground">{c.answer}</p>
      <CalculatorCta config={config} />
      <AdSlot slotId="0000000111" format="in-article" />

      <div className="prose-page mt-8">
        <h2>How to estimate {name.toLowerCase()}</h2>
        {c.formula && <p><strong>Formula:</strong> {c.formula}</p>}
        {c.steps && (
          <ol>{c.steps.map((s, i) => <li key={i}><strong>{s.title}.</strong> {s.detail}</li>)}</ol>
        )}
        {c.example && <p><strong>Example:</strong> {c.example}</p>}
      </div>

      {c.mistakes && c.mistakes.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold tracking-tight">Common mistakes to avoid</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {c.mistakes.map((m) => (
              <Card key={m.title} className="border-l-4 border-l-destructive/70 p-5">
                <h3 className="font-display font-semibold">{m.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{m.detail}</p>
              </Card>
            ))}
          </div>
        </section>
      )}
      <AdSlot slotId="0000000112" format="in-article" />
    </>
  );
}

// ── How-to page ────────────────────────────────────────────────────
function HowToBody({ config, page }: { config: CalculatorConfig; page: PageDescriptor }) {
  const c = config.content;
  const tools = config.howto?.tools ?? [];
  const materials = config.howto?.materials ?? [];
  const tips = config.howto?.tips ?? c.mistakes?.map((m) => `Avoid: ${m.title.toLowerCase()} — ${m.detail}`) ?? [];
  return (
    <>
      <p className="mt-3 max-w-3xl text-lg leading-relaxed text-muted-foreground">
        {page.description} {c.answer}
      </p>
      <CalculatorCta config={config} />
      <AdSlot slotId="0000000121" format="in-article" />

      {(tools.length > 0 || materials.length > 0) && (
        <section className="mt-10 grid gap-6 sm:grid-cols-2">
          {tools.length > 0 && (
            <div>
              <h2 className="flex items-center gap-2 font-display text-xl font-bold"><Wrench className="size-5 text-primary" /> Tools</h2>
              <ul className="mt-3 list-disc space-y-1 pl-6 text-muted-foreground">{tools.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
          )}
          {materials.length > 0 && (
            <div>
              <h2 className="font-display text-xl font-bold">Materials</h2>
              <ul className="mt-3 list-disc space-y-1 pl-6 text-muted-foreground">{materials.map((m) => <li key={m}>{m}</li>)}</ul>
            </div>
          )}
        </section>
      )}

      {c.steps && c.steps.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold tracking-tight">Step-by-step</h2>
          <ol className="mt-4 space-y-4">
            {c.steps.map((s, i) => (
              <li key={i} className="flex gap-4">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary/10 font-display font-semibold text-primary">{i + 1}</span>
                <div><h3 className="font-medium">{s.title}</h3><p className="text-muted-foreground">{s.detail}</p></div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {tips.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold tracking-tight">Pro tips</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">{tips.slice(0, 5).map((t, i) => <li key={i}>{t}</li>)}</ul>
        </section>
      )}
      <AdSlot slotId="0000000122" format="in-article" />
    </>
  );
}

// ── Location page ──────────────────────────────────────────────────
function LocationBody({ config, page }: { config: CalculatorConfig; page: PageDescriptor }) {
  const loc = page.location!;
  const name = config.name.replace(/\s*Calculator$/i, "");
  const delta = Math.round((loc.priceMultiplier - 1) * 100);
  const direction = delta === 0 ? "about the same as" : delta > 0 ? `${delta}% above` : `${Math.abs(delta)}% below`;
  return (
    <>
      <p className="mt-3 flex items-center gap-2 text-sm font-medium text-primary">
        <MapPin className="size-4" /> Local 2026 pricing for {loc.name}
      </p>
      <p className="mt-3 max-w-3xl text-lg leading-relaxed text-muted-foreground">
        {name} costs in {loc.name} run roughly <strong>{direction} the national average</strong>.
        {" "}{loc.note}
      </p>
      <div className="mt-8">
        <CalculatorShell slug={config.slug} />
      </div>
      <AdSlot slotId="0000000131" format="in-article" />

      <section className="mt-10">
        <h2 className="font-display text-2xl font-bold tracking-tight">Why {loc.name} prices differ</h2>
        <p className="mt-3 text-muted-foreground">{loc.note}</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {costFactors(config).slice(0, 4).map((f) => (
            <li key={f} className="flex items-start gap-2">
              <Check className="mt-0.5 size-5 shrink-0 text-success" />
              <span className="text-muted-foreground">{f}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted-foreground">
          Estimates are guidance only — get quotes from local {config.categoryLabel.toLowerCase()} pros in {loc.name}.{" "}
          <Link href={`/${config.slug.replace(/-calculator$/, "")}-cost-calculator/`} className="font-medium text-primary hover:underline">
            See the national cost breakdown →
          </Link>
        </p>
      </section>
    </>
  );
}

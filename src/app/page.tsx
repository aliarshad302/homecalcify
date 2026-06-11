import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator, Gauge, Layers, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { calculators } from "@/config/calculators";
import { hubs } from "@/config/hubs";
import { guides } from "@/config/guides";
import { faqSchema, jsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "HomeCalcify — Free Home Improvement Calculators for Materials & Cost",
  description:
    "Free home improvement calculators for concrete, roofing, flooring, tile, paint, drywall, mulch, and asphalt. Estimate materials, quantities, bags, and cost in seconds — accurate and contractor-reviewed.",
  keywords: [
    "home improvement calculator",
    "concrete calculator",
    "roofing calculator",
    "flooring calculator",
    "paint calculator",
    "drywall calculator",
    "tile calculator",
    "mulch calculator",
    "asphalt calculator",
    "material estimator",
    "construction cost calculator",
  ],
  alternates: { canonical: "/" },
};

const TRUST = [
  { icon: Zap, title: "Instant results", body: "Calculations update as you type — no reload, no waiting." },
  { icon: ShieldCheck, title: "Contractor-reviewed", body: "Formulas verified by licensed tradespeople." },
  { icon: Gauge, title: "Material + cost", body: "Get bags, coverage, and a cost estimate in one place." },
  { icon: Layers, title: "Imperial & metric", body: "Switch units instantly for any project, anywhere." },
];

const HOME_FAQS = [
  {
    question: "What is HomeCalcify?",
    answer:
      "HomeCalcify is a free collection of home improvement calculators that estimate how much material you need — concrete, roofing, flooring, paint, drywall, tile, mulch, and more — plus the approximate cost, so you can plan and budget any project accurately.",
  },
  {
    question: "Are the calculators free to use?",
    answer:
      "Yes. Every calculator on HomeCalcify is completely free, with no sign-up required. Just enter your measurements and get instant results.",
  },
  {
    question: "How accurate are the estimates?",
    answer:
      "Our calculators use industry-standard coverage rates, conversions, and adjustable waste factors, and the formulas are reviewed by licensed contractors. Results are accurate for planning and budgeting — always confirm critical quantities with your supplier before ordering.",
  },
  {
    question: "Can I use these calculators on my phone?",
    answer:
      "Absolutely. HomeCalcify is mobile-first and works on any device, so you can estimate materials right from the job site or the hardware store aisle.",
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(HOME_FAQS)) }}
      />

      {/* Hero */}
      <section className="border-b bg-gradient-to-b from-muted/50 to-background">
        <div className="container py-16 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="accent" className="mb-4">Home improvement calculators</Badge>
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Estimate materials and cost in <span className="text-primary">seconds</span>.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Free, accurate calculators for concrete, roofing, flooring, paint, drywall, and more.
              Know exactly how much material you need — and what it will cost — before you buy.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg">
                <Link href="/calculators/">Browse all calculators <ArrowRight /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/concrete-calculator/">Try the concrete calculator</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="container -mt-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST.map((t) => (
            <Card key={t.title} className="flex items-start gap-3 p-5">
              <span className="grid size-10 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
                <t.icon className="size-5" />
              </span>
              <div>
                <h2 className="font-display font-semibold">{t.title}</h2>
                <p className="text-sm text-muted-foreground">{t.body}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Calculator grid */}
      <section className="container py-16">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Popular calculators
            </h2>
            <p className="mt-1 text-muted-foreground">Start with the tools homeowners and contractors use most.</p>
          </div>
          <Link href="/calculators/" className="hidden text-sm font-medium text-primary hover:underline sm:inline">
            View all →
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {calculators.map((c) => (
            <Link key={c.slug} href={`/${c.slug}/`} className="group">
              <Card className="h-full p-6 transition-shadow hover:shadow-result">
                <div className="flex items-center gap-2 text-primary">
                  <Calculator className="size-5" />
                  <h3 className="font-display text-lg font-semibold text-foreground">{c.name}</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{c.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Open <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Browse by category */}
      <section className="border-y bg-muted/30">
        <div className="container py-16">
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Browse by category
          </h2>
          <p className="mt-1 text-muted-foreground">
            Every calculator and guide, organized by the kind of project you're planning.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {hubs.map((hub) => (
              <Link key={hub.slug} href={`/${hub.slug}/`} className="group">
                <Card className="flex h-full items-center justify-between p-4 transition-shadow hover:shadow-result">
                  <span className="font-medium">{hub.name}</span>
                  <ArrowRight className="size-4 text-primary transition-transform group-hover:translate-x-0.5" />
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="container py-16">
        <div className="prose-page max-w-3xl">
          <h2>Accurate material estimates for any home improvement project</h2>
          <p>
            Every renovation, repair, and DIY project starts with the same question:{" "}
            <strong>how much material do I need?</strong> Order too little and you're back at the
            store mid-job; order too much and you've wasted money. HomeCalcify's free calculators
            replace the guesswork with fast, reliable math — giving you quantities, material counts,
            and a cost estimate in seconds.
          </p>
          <p>
            Whether you're pouring a <Link href="/concrete-calculator/">concrete slab</Link>, re-roofing
            with shingles, laying <Link href="/flooring-calculator/">new flooring</Link>, painting a
            room, or mulching the garden, there's a purpose-built tool for the job. Each calculator
            shows the exact formula it uses and a step-by-step manual method, so you can check the
            numbers yourself and learn how the estimate works.
          </p>
          <h3>Built for homeowners, DIYers, and contractors</h3>
          <p>
            Our tools support both imperial and metric units and build in adjustable waste factors —
            the same allowances the trades use to account for cuts, spillage, and uneven surfaces.
            Browse the full <Link href="/calculators/">calculator library</Link>, explore a{" "}
            <Link href="/categories/">project category</Link>, or read our practical{" "}
            <Link href="/guides/">how-much-do-I-need guides</Link> to plan and budget with confidence.
          </p>
        </div>
      </section>

      {/* Popular guides */}
      <section className="border-t bg-muted/30">
        <div className="container py-16">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">Popular guides</h2>
            <Link href="/guides/" className="hidden text-sm font-medium text-primary hover:underline sm:inline">
              All guides →
            </Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {guides.slice(0, 6).map((g) => (
              <Link key={g.slug} href={`/guides/${g.slug}/`} className="group">
                <Card className="h-full p-5 transition-shadow hover:shadow-result">
                  <h3 className="font-display font-semibold">{g.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{g.description}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container py-16">
        <div className="max-w-3xl">
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Frequently asked questions
          </h2>
          <Accordion type="single" collapsible className="mt-4">
            {HOME_FAQS.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger>{f.question}</AccordionTrigger>
                <AccordionContent>{f.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}

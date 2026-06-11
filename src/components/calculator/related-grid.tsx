import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";
import { Card } from "@/components/ui/card";
import { getCalculator } from "@/config/calculators";

/** Sibling cross-links — keeps sessions alive (the core RPM driver). */
export function RelatedGrid({ slugs }: { slugs: string[] }) {
  const related = slugs.map(getCalculator).filter(Boolean);
  if (!related.length) return null;

  return (
    <section aria-labelledby="related-heading">
      <h2 id="related-heading" className="font-display text-2xl font-bold tracking-tight">
        Related calculators
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((c) => (
          <Link key={c!.slug} href={`/${c!.slug}/`} className="group">
            <Card className="h-full p-5 transition-shadow hover:shadow-result">
              <div className="flex items-center gap-2 text-primary">
                <Calculator className="size-5" />
                <h3 className="font-display font-semibold text-foreground">{c!.name}</h3>
              </div>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                {c!.description}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Open calculator
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}

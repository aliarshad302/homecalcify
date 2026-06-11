import { Breadcrumbs, type Crumb } from "@/components/layout/breadcrumbs";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";

interface PageShellProps {
  title: string;
  /** Short lead paragraph under the H1. */
  lead?: string;
  crumbs: Crumb[];
  /** Optional ISO date shown as "Last updated". */
  updated?: string;
  children: React.ReactNode;
}

/** Shared shell for prose pages (company, legal, guides) with breadcrumb schema. */
export function PageShell({ title, lead, crumbs, updated, children }: PageShellProps) {
  return (
    <div className="container max-w-3xl py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema(crumbs)) }}
      />
      <Breadcrumbs items={crumbs} />
      <header>
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        {lead && <p className="mt-3 text-lg text-muted-foreground">{lead}</p>}
        {updated && (
          <p className="mt-2 text-sm text-muted-foreground">
            Last updated{" "}
            <time dateTime={updated}>
              {new Date(updated).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </time>
          </p>
        )}
      </header>
      <div className="prose-page mt-6">{children}</div>
    </div>
  );
}

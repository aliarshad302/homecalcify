import { BadgeCheck } from "lucide-react";

interface AuthorBylineProps {
  author?: string;
  reviewer?: string;
  updated: string; // ISO date
}

/** EEAT trust strip: author, expert reviewer, and last-updated date. */
export function AuthorByline({
  author = "HomeCalcify Editorial Team",
  reviewer,
  updated,
}: AuthorBylineProps) {
  const date = new Date(updated).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-md border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
      <span>
        By <span className="font-medium text-foreground">{author}</span>
      </span>
      {reviewer && (
        <span className="inline-flex items-center gap-1">
          <BadgeCheck className="size-4 text-success" />
          Reviewed by <span className="font-medium text-foreground">{reviewer}</span>
        </span>
      )}
      <span>
        Updated <time dateTime={updated}>{date}</time>
      </span>
    </div>
  );
}

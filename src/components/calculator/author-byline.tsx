import Link from "next/link";
import { BadgeCheck } from "lucide-react";
import { LogoMark } from "@/components/layout/logo";
import { editorialTeam } from "@/config/author";

interface AuthorBylineProps {
  updated: string; // ISO date
}

function fmt(updated: string) {
  return new Date(updated).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

/** Compact EEAT trust strip: author, last-updated date, and methodology link. */
export function AuthorByline({ updated }: AuthorBylineProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-md border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
      <span className="inline-flex items-center gap-2">
        <LogoMark className="size-6 rounded" />
        By{" "}
        <Link href={editorialTeam.aboutUrl} className="font-medium text-foreground hover:underline">
          {editorialTeam.name}
        </Link>
      </span>
      <span>
        Updated <time dateTime={updated}>{fmt(updated)}</time>
      </span>
      <Link href={editorialTeam.methodologyUrl} className="inline-flex items-center gap-1 font-medium text-primary hover:underline">
        <BadgeCheck className="size-4" /> How we estimate
      </Link>
    </div>
  );
}

/** "About the author" trust block for the end of guides and calculators. */
export function AboutAuthor() {
  return (
    <aside className="mt-10 flex flex-col gap-4 rounded-xl border bg-muted/30 p-6 sm:flex-row">
      <div className="shrink-0">
        <LogoMark className="size-14 rounded-lg" />
      </div>
      <div>
        <p className="font-display font-semibold">
          {editorialTeam.name}
          <span className="ml-2 text-sm font-normal text-muted-foreground">· {editorialTeam.role}</span>
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{editorialTeam.bio}</p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
          <Link href={editorialTeam.methodologyUrl} className="font-medium text-primary hover:underline">Our methodology</Link>
          <Link href={editorialTeam.editorialPolicyUrl} className="font-medium text-primary hover:underline">Editorial policy</Link>
          <Link href={editorialTeam.aboutUrl} className="font-medium text-primary hover:underline">About HomeCalcify</Link>
        </div>
      </div>
    </aside>
  );
}

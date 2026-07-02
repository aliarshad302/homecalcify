import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/layout/logo";

const NAV = [
  { label: "Calculators", href: "/calculators/" },
  { label: "Categories", href: "/categories/" },
  { label: "Guides", href: "/guides/" },
  { label: "About", href: "/about-us/" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2" aria-label="HomeCalcify home">
          <LogoMark className="size-9 rounded-md" />
          <span className="font-display text-lg font-bold tracking-tight">
            Home<span className="text-primary">Calcify</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Search calculators" asChild>
            <Link href="/calculators/">
              <Search />
            </Link>
          </Button>
          <Button asChild variant="accent" size="sm" className="hidden sm:inline-flex">
            <Link href="/calculators/">Browse all</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

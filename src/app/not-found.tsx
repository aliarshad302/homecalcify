import Link from "next/link";
import { Calculator, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { calculators } from "@/config/calculators";

export default function NotFound() {
  return (
    <div className="container flex max-w-2xl flex-col items-center py-24 text-center">
      <span className="font-display text-7xl font-bold text-primary">404</span>
      <h1 className="mt-4 font-display text-2xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-2 text-muted-foreground">
        The page you're looking for doesn't exist or has moved. Try one of our popular calculators
        instead.
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/"><Home /> Home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/calculators/"><Calculator /> All calculators</Link>
        </Button>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {calculators.slice(0, 6).map((c) => (
          <Link
            key={c.slug}
            href={`/${c.slug}/`}
            className="rounded-full border px-3 py-1 text-sm text-muted-foreground hover:border-primary hover:text-primary"
          >
            {c.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

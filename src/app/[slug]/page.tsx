import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { calculators, getCalculator } from "@/config/calculators";
import { hubs, getHub } from "@/config/hubs";
import { CalculatorPage } from "@/components/calculator/calculator-page";
import { HubPage } from "@/components/hub/hub-page";

interface PageProps {
  params: { slug: string };
}

/** Only registered calculator and hub slugs are valid; anything else 404s. */
export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...calculators.map((c) => ({ slug: c.slug })),
    ...hubs.map((h) => ({ slug: h.slug })),
  ];
}

export function generateMetadata({ params }: PageProps): Metadata {
  const calc = getCalculator(params.slug);
  if (calc) {
    return {
      title: calc.seo?.title ?? calc.name,
      description: calc.seo?.description ?? calc.description,
      alternates: { canonical: `/${calc.slug}/` },
      openGraph: { title: calc.seo?.title ?? calc.name, description: calc.description, url: `/${calc.slug}/` },
    };
  }
  const hub = getHub(params.slug);
  if (hub) {
    return {
      title: hub.seo?.title ?? `${hub.name} Calculators`,
      description: hub.seo?.description ?? hub.description,
      alternates: { canonical: `/${hub.slug}/` },
      openGraph: { title: hub.seo?.title ?? `${hub.name} Calculators`, description: hub.description, url: `/${hub.slug}/` },
    };
  }
  return {};
}

export default function DynamicPage({ params }: PageProps) {
  const calc = getCalculator(params.slug);
  if (calc) {
    // `reviewer` intentionally omitted until real, credentialed reviewers are provided.
    return <CalculatorPage config={calc} updated="2026-06-11" />;
  }
  const hub = getHub(params.slug);
  if (hub) return <HubPage hub={hub} />;
  notFound();
}

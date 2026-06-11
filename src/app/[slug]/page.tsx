import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { calculators, getCalculator } from "@/config/calculators";
import { hubs, getHub } from "@/config/hubs";
import { getPage, programmaticParams } from "@/lib/programmatic/registry";
import { CalculatorPage } from "@/components/calculator/calculator-page";
import { HubPage } from "@/components/hub/hub-page";
import { ProgrammaticPage } from "@/components/programmatic/programmatic-page";

interface PageProps {
  params: { slug: string };
}

/** Only registered slugs (calculators, hubs, programmatic cluster pages) are valid. */
export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...calculators.map((c) => ({ slug: c.slug })), // main calculator pages
    ...hubs.map((h) => ({ slug: h.slug })), // category hubs
    ...programmaticParams(), // cost / guide / how-to / location pages
  ];
}

export function generateMetadata({ params }: PageProps): Metadata {
  const calc = getCalculator(params.slug);
  if (calc) {
    // seo.title already includes the brand → use `absolute` so the layout
    // template doesn't append "| HomeCalcify" a second time.
    const title = calc.seo?.title ? { absolute: calc.seo.title } : calc.name;
    return {
      title,
      description: calc.seo?.description ?? calc.description,
      alternates: { canonical: `/${calc.slug}/` },
      openGraph: { title: calc.seo?.title ?? calc.name, description: calc.description, url: `/${calc.slug}/` },
    };
  }

  const hub = getHub(params.slug);
  if (hub) {
    const title = hub.seo?.title ? { absolute: hub.seo.title } : `${hub.name} Calculators`;
    return {
      title,
      description: hub.seo?.description ?? hub.description,
      alternates: { canonical: `/${hub.slug}/` },
      openGraph: { title: hub.seo?.title ?? `${hub.name} Calculators`, description: hub.description, url: `/${hub.slug}/` },
    };
  }

  const page = getPage(params.slug);
  if (page) {
    return {
      title: { absolute: page.title },
      description: page.description,
      keywords: page.keywords,
      alternates: { canonical: `/${page.slug}/` },
      openGraph: { title: page.title, description: page.description, url: `/${page.slug}/` },
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

  const page = getPage(params.slug);
  if (page) return <ProgrammaticPage page={page} />;

  notFound();
}

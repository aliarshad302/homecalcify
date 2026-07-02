import type { CalculatorConfig } from "./calculator/types";

export const SITE_URL = "https://homecalcify.com";
export const SITE_NAME = "HomeCalcify";

type Json = Record<string, unknown>;

/** Sitewide Organization + WebSite (with Sitelinks search box). */
export function organizationSchema(): Json[] {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.svg`,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/calculators/?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ];
}

/** BreadcrumbList from an ordered list of {name, path}. */
export function breadcrumbSchema(items: { name: string; path: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

/** SoftwareApplication for a calculator tool. */
export function calculatorSchema(config: CalculatorConfig): Json {
  // WebPage (not SoftwareApplication): the app rich result requires an
  // aggregateRating/review we won't fabricate, and an incomplete
  // SoftwareApplication is flagged as invalid. WebPage is always valid and the
  // page keeps its HowTo + FAQPage + Breadcrumb rich-result schemas.
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: config.name,
    url: `${SITE_URL}/${config.slug}/`,
    description: config.seo?.description ?? config.description,
    inLanguage: "en-US",
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
  };
}

/** CollectionPage for a category hub. */
export function collectionPageSchema(name: string, path: string, description: string): Json {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    url: `${SITE_URL}${path}`,
    description,
  };
}

/** FAQPage from a calculator's FAQs. */
export function faqSchema(faqs: { question: string; answer: string }[]): Json | null {
  if (!faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/** Article schema for a guide/blog post. */
export function articleSchema(opts: {
  title: string;
  description: string;
  path: string;
  updated: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    url: `${SITE_URL}${opts.path}`,
    mainEntityOfPage: `${SITE_URL}${opts.path}`,
    inLanguage: "en-US",
    isAccessibleForFree: true,
    datePublished: opts.updated,
    dateModified: opts.updated,
    // Answer-engine / voice: mark the H1 and the AEO answer block as speakable.
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".aeo-answer"],
    },
    author: {
      "@type": "Organization",
      name: "HomeCalcify Editorial Team",
      url: `${SITE_URL}/about-us/`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.svg` },
    },
  };
}

/** HowTo from the manual-method steps. */
export function howToSchema(config: CalculatorConfig): Json | null {
  const steps = config.content.steps;
  if (!steps?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to calculate ${config.name.replace(" Calculator", "").toLowerCase()}`,
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.detail,
    })),
  };
}

/** Serialize one or many schema objects into a single JSON-LD script payload. */
export function jsonLd(...schemas: (Json | null)[]): string {
  const valid = schemas.filter(Boolean);
  return JSON.stringify(valid.length === 1 ? valid[0] : valid);
}

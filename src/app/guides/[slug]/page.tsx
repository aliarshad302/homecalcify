import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { guides, getGuide } from "@/config/guides";
import { GuidePage } from "@/components/guide/guide-page";

interface PageProps {
  params: { slug: string };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const guide = getGuide(params.slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/guides/${guide.slug}/` },
    openGraph: { title: guide.title, description: guide.description, type: "article", url: `/guides/${guide.slug}/` },
  };
}

export default function GuideRoute({ params }: PageProps) {
  const guide = getGuide(params.slug);
  if (!guide) notFound();
  return <GuidePage guide={guide} />;
}

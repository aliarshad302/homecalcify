const fs = require("fs");
const path = require("path");
const guides = require("./guides-data.json");

const header = `// Guide content recovered from the live site on 2026-07-02 (editable source was
// lost; content preserved 1:1 from the deployed HTML). Long-form guide system.

export interface GuideSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: { columns: string[]; rows: string[][] };
}

export interface GuideConfig {
  slug: string;
  title: string;
  description: string;
  answer: string;
  intro?: string[];
  keyTakeaways?: string[];
  category: string;
  updated: string;
  sections: GuideSection[];
  calculatorSlug?: string;
  faqs?: { question: string; answer: string }[];
  related?: string[];
}

export const guides: GuideConfig[] = ${JSON.stringify(guides, null, 2)};

export const guideMap: Record<string, GuideConfig> = Object.fromEntries(
  guides.map((g) => [g.slug, g]),
);

export function getGuide(slug: string): GuideConfig | undefined {
  return guideMap[slug];
}
`;

fs.writeFileSync(path.join(__dirname, "..", "src", "config", "guides.ts"), header);
console.log("Wrote src/config/guides.ts with", guides.length, "guides");

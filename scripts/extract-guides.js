// Recovers GuideConfig objects from the live built HTML in public_html/guides/*.
// Keyed to the guide-page.tsx template structure. Outputs scripts/guides-data.json.
const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

const GUIDES_DIR = path.join(__dirname, "..", "public_html", "guides");

const CALC_CATEGORY = {
  "concrete-calculator": "concrete",
  "roofing-calculator": "roofing",
  "flooring-calculator": "flooring",
  "tile-calculator": "flooring",
  "paint-calculator": "painting",
  "drywall-calculator": "drywall",
  "mulch-calculator": "landscaping",
  "asphalt-calculator": "driveway-paving",
  "gravel-calculator": "driveway-paving",
  "insulation-calculator": "insulation",
  "siding-calculator": "siding",
};

const clean = (s) => (s || "").replace(/\s+/g, " ").trim();

function findFaqs($) {
  const faqs = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    let data;
    try { data = JSON.parse($(el).contents().text()); } catch { return; }
    const arr = Array.isArray(data) ? data : [data];
    for (const obj of arr) {
      const nodes = obj && obj["@graph"] ? obj["@graph"] : [obj];
      for (const n of nodes) {
        if (n && n["@type"] === "FAQPage" && Array.isArray(n.mainEntity)) {
          for (const q of n.mainEntity) {
            faqs.push({ question: clean(q.name), answer: clean(q.acceptedAnswer && q.acceptedAnswer.text) });
          }
        }
      }
    }
  });
  return faqs;
}

function extractGuide(slug, html) {
  const $ = cheerio.load(html);
  const g = { slug };

  g.title = clean($("h1").first().text());
  g.description = clean($('meta[name="description"]').attr("content"));
  g.answer = clean($("p").filter((_, el) => ($(el).attr("class") || "").includes("border-l-primary")).first().text());
  g.updated = $("time").first().attr("datetime") || "2026-06-12";

  // intro (div.prose-page.mt-6)
  const introDiv = $("div").filter((_, el) => { const c = $(el).attr("class") || ""; return c.includes("prose-page") && c.includes("mt-6"); }).first();
  const intro = [];
  introDiv.children("p").each((_, el) => intro.push(clean($(el).text())));
  if (intro.length) g.intro = intro;

  // key takeaways (h2 'Key takeaways' -> sibling ul)
  const ktH2 = $("h2").filter((_, el) => clean($(el).text()).toLowerCase() === "key takeaways").first();
  if (ktH2.length) {
    const kt = [];
    ktH2.siblings("ul").first().children("li").each((_, el) => kt.push(clean($(el).text())));
    if (kt.length) g.keyTakeaways = kt;
  }

  // calculatorSlug (CTA "Open calculator")
  const ctaHref = $("a").filter((_, el) => clean($(el).text()).toLowerCase().startsWith("open calculator")).first().attr("href");
  if (ctaHref) g.calculatorSlug = ctaHref.replace(/\//g, "");

  // category from calculatorSlug
  g.category = CALC_CATEGORY[g.calculatorSlug] || "concrete";

  // sections (div.prose-page.mt-8 > section)
  const sectionsDiv = $("div").filter((_, el) => { const c = $(el).attr("class") || ""; return c.includes("prose-page") && c.includes("mt-8"); }).first();
  const sections = [];
  sectionsDiv.children("section").each((_, secEl) => {
    const sec = {};
    const $sec = $(secEl);
    sec.heading = clean($sec.find("h2").first().text());
    const paragraphs = [];
    $sec.children("p").each((_, el) => paragraphs.push(clean($(el).text())));
    if (paragraphs.length) sec.paragraphs = paragraphs;
    const bullets = [];
    $sec.children("ul").first().children("li").each((_, el) => bullets.push(clean($(el).text())));
    if (bullets.length) sec.bullets = bullets;
    const tbl = $sec.find("table").first();
    if (tbl.length) {
      const columns = [];
      tbl.find("thead th").each((_, el) => columns.push(clean($(el).text())));
      const rows = [];
      tbl.find("tbody tr").each((_, tr) => {
        const row = [];
        $(tr).find("td").each((_, td) => row.push(clean($(td).text())));
        if (row.length) rows.push(row);
      });
      if (columns.length && rows.length) sec.table = { columns, rows };
    }
    if (sec.heading) sections.push(sec);
  });
  g.sections = sections;

  g.faqs = findFaqs($);

  // related guides
  const related = [];
  $("a").each((_, el) => {
    const href = $(el).attr("href") || "";
    const m = href.match(/^\/guides\/([a-z0-9-]+)\/$/);
    if (m && m[1] !== slug && !related.includes(m[1])) related.push(m[1]);
  });
  // only keep related from the "Related guides" section to avoid nav noise
  g.related = related;

  return g;
}

const slugs = fs.readdirSync(GUIDES_DIR).filter((d) => fs.statSync(path.join(GUIDES_DIR, d)).isDirectory());
const out = [];
const issues = [];
for (const slug of slugs) {
  const file = path.join(GUIDES_DIR, slug, "index.html");
  if (!fs.existsSync(file)) continue;
  try {
    const g = extractGuide(slug, fs.readFileSync(file, "utf8"));
    if (!g.title || !g.answer) issues.push(`${slug}: missing title/answer`);
    if (!g.sections.length) issues.push(`${slug}: no sections`);
    out.push(g);
  } catch (e) { issues.push(`${slug}: ERROR ${e.message}`); }
}

out.sort((a, b) => a.slug.localeCompare(b.slug));
fs.writeFileSync(path.join(__dirname, "guides-data.json"), JSON.stringify(out, null, 2));
console.log("Extracted guides:", out.length);
console.log("With intro:", out.filter((g) => g.intro).length, "| with takeaways:", out.filter((g) => g.keyTakeaways).length, "| with tables:", out.filter((g) => g.sections.some((s) => s.table)).length);
console.log("Total FAQs:", out.reduce((n, g) => n + g.faqs.length, 0));
if (issues.length) { console.log("\nISSUES:"); issues.forEach((i) => console.log(" -", i)); } else console.log("No issues.");

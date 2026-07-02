const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

const ROOT = path.join(__dirname, "..", "out");

// collect all built pages
function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.name === "index.html") acc.push(p);
  }
  return acc;
}

const files = walk(ROOT);
const toUrl = (f) => {
  let u = "/" + path.relative(ROOT, path.dirname(f)).replace(/\\/g, "/");
  return u === "/." ? "/" : (u.endsWith("/") ? u : u + "/");
};

const pages = {}; // url -> {links:Set, title, desc, words, schemas:[]}
const titles = {}, descs = {};
let thin = 0, totalOut = 0;
const schemaCount = {};

for (const f of files) {
  const url = toUrl(f);
  const html = fs.readFileSync(f, "utf8");
  const $ = cheerio.load(html);
  const links = new Set();
  $("a[href^='/']").each((_, el) => {
    let h = $(el).attr("href").split("#")[0].split("?")[0];
    if (!h) return;
    if (!h.endsWith("/")) h += "/";
    if (h !== url) links.add(h);
  });
  const title = ($("title").text() || "").trim();
  const desc = ($('meta[name="description"]').attr("content") || "").trim();
  const words = $("body").text().replace(/\s+/g, " ").trim().split(" ").length;
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const d = JSON.parse($(el).contents().text());
      const arr = Array.isArray(d) ? d : [d];
      for (const o of arr) {
        const nodes = o["@graph"] || [o];
        for (const n of nodes) if (n && n["@type"]) schemaCount[n["@type"]] = (schemaCount[n["@type"]] || 0) + 1;
      }
    } catch {}
  });
  pages[url] = { links, title, desc, words };
  titles[title] = (titles[title] || 0) + 1;
  descs[desc] = (descs[desc] || 0) + 1;
  if (words < 350) thin++;
  totalOut += links.size;
}

// BFS crawl depth from "/"
const depth = { "/": 0 };
let queue = ["/"];
while (queue.length) {
  const cur = queue.shift();
  for (const l of pages[cur]?.links || []) {
    if (pages[l] && depth[l] === undefined) { depth[l] = depth[cur] + 1; queue.push(l); }
  }
}
const reachable = Object.keys(depth).length;
const orphans = Object.keys(pages).filter((u) => depth[u] === undefined);
const maxDepth = Math.max(...Object.values(depth));
const depthDist = {};
for (const d of Object.values(depth)) depthDist[d] = (depthDist[d] || 0) + 1;

// inbound links
const inbound = {};
for (const u in pages) for (const l of pages[u].links) inbound[l] = (inbound[l] || 0) + 1;
const lowInbound = Object.keys(pages).filter((u) => (inbound[u] || 0) < 2).length;

const dupTitles = Object.values(titles).filter((n) => n > 1).length;
const dupDescs = Object.values(descs).filter((n) => n > 1).length;

console.log("=== CRAWL & LINK GRAPH ===");
console.log("Total pages:", files.length);
console.log("Reachable from homepage:", reachable, "| Orphans:", orphans.length);
console.log("Max crawl depth:", maxDepth);
console.log("Depth distribution:", JSON.stringify(depthDist));
console.log("Avg internal links per page:", (totalOut / files.length).toFixed(1));
console.log("Pages with <2 inbound links:", lowInbound);
console.log();
console.log("=== META ===");
console.log("Duplicate titles:", dupTitles, "| Duplicate descriptions:", dupDescs);
console.log("Thin pages (<350 words incl. nav/footer):", thin);
console.log();
console.log("=== SCHEMA TYPES (occurrences) ===");
Object.entries(schemaCount).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(` ${k}: ${v}`));
if (orphans.length) console.log("\nOrphan examples:", orphans.slice(0, 8).join(", "));

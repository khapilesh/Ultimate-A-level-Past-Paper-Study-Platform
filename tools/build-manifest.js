#!/usr/bin/env node
/* IAL Mastery — assets manifest builder.
   Usage from repo root:  node tools/build-manifest.js [assetsDir] [outFile]
   Defaults: assetsDir="assets", outFile="js/archive-data.js".
   Scans assets/ and generates js/archive-data.js (ARCHIVE_DATA + RESOURCE_DATA).
   Supports:
     assets/biology/unit 1/JAN 2024/wbi11-01-que-20240109.pdf   (Pearson que/rms/pef)
     assets/maths/P1/January 2019 QP.pdf                        (unit subfolders P1-P4/S1/M1 REQUIRED for maths)
   anything else → Resource.
   Reports unclassified files, duplicates (same name+size), skipped non-docs.
*/
const fs = require("fs");
const path = require("path");

const ROOT = process.argv[2] || "assets";
const OUT = process.argv[3] || "js/archive-data.js";

if (!fs.existsSync(ROOT)) {
  console.error("Folder not found: " + ROOT);
  process.exit(1);
}

function walk(dir, out) {
  out = out || [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out); else out.push(p);
  }
  return out;
}

const MON = { jan:"Jan",feb:"Feb",mar:"Mar",apr:"Apr",may:"May",jun:"Jun",jul:"Jul",aug:"Aug",sep:"Sep",oct:"Oct",nov:"Nov",dec:"Dec" };

function normSession(raw) {
  const m = String(raw).match(/(jan|feb|mar|apr|may|jun|june|jul|aug|sep|oct|nov|dec)[a-z]*\s*(\d{4})/i);
  if (!m) return null;
  return MON[m[1].toLowerCase().slice(0,3)] + " " + m[2];
}

function kindOf(base) {
  if (/[-_ ]que[-_ ]/i.test(base) || /\bQP\.pdf$/i.test(base)) return "qp";
  if (/[-_ ]rms[-_ ]/i.test(base) || /\bMS\.pdf$/i.test(base)) return "ms";
  if (/[-_ ]pef[-_ ]/i.test(base) || /\bER\.pdf$/i.test(base)) return "er";
  if (/\bMA\.pdf$/i.test(base)) return "ma";
  return null;
}

function unitFromSegs(segs, base) {
  for (const s of segs) {
    let m = s.match(/unit\s*([1-6])/i);
    if (m) return "unit " + m[1];
    m = s.match(/^(p[1-4]|s1|m1)$/i);
    if (m) return m[1].toLowerCase();
  }
  let m = base.match(/w(?:ph|ch|bi)1(\d)/i);
  if (m) return "unit " + m[1];
  m = base.match(/wma1(\d)/i);
  if (m) return "p" + m[1];
  if (/wst01/i.test(base)) return "s1";
  if (/wme01/i.test(base)) return "m1";
  return null;
}

function sessionFromSegs(segs, base) {
  for (const s of segs) {
    const n = normSession(s);
    if (n) return n;
  }
  return normSession(base);
}

function catOf(base) {
  const b = base.toLowerCase();
  if (/spec/.test(b)) return "Specifications";
  if (/formula/.test(b)) return "Formula books";
  if (/\bsams?\b/.test(b)) return "Sample assessments";
  if (/guide|onboarding/.test(b)) return "Guides";
  if (/training/.test(b)) return "Training packs";
  if (/revision|worksheet|\bws\b|water|quantum|waves/.test(b)) return "Topical revision";
  if (/\.pptx?$/i.test(base)) return "Topical revision";
  return "Other";
}

function subOf(base) {
  const b = base.toLowerCase();
  if (/physic/.test(b)) return "physics";
  if (/chem/.test(b)) return "chemistry";
  if (/bio/.test(b)) return "biology";
  if (/maths?|pure mathematics|wma|wst|wme|yma01|\bp[1-4]\b/.test(b)) return "maths";
  return "";
}

function pretty(base) {
  return base.replace(/\.[^.]+$/, "").replace(/[_]+/g, " ").replace(/\s{2,}/g, " ").trim();
}

function fmtB(n) {
  if (n > 1e9) return (n / 1e9).toFixed(2) + " GB";
  if (n > 1e6) return (n / 1e6).toFixed(1) + " MB";
  return Math.round(n / 1024) + " KB";
}

const files = walk(ROOT);
const archive = {};
const resources = [];
const unclassified = [], skipped = [], dupes = [];
const seen = {};
const byBaseSize = {};
let totalSize = 0, papers = 0;

for (const f of files) {
  const st = fs.statSync(f);
  totalSize += st.size;
  const under = path.relative(ROOT, f).split(path.sep);
  const segs = under.slice(0, -1);
  const base = under[under.length - 1];
  const rel = "assets/" + under.join("/");
  const subj = (segs[0] || "").toLowerCase();
  const isPaperSubj = ["biology", "chemistry", "physics", "maths"].includes(subj);
  const kind = kindOf(base);
  const dk = base.toLowerCase() + "|" + st.size;
  byBaseSize[dk] = byBaseSize[dk] || [];
  byBaseSize[dk].push(rel);

  if (kind && isPaperSubj) {
    const unit = unitFromSegs(segs, base);
    const session = sessionFromSegs(segs, base);
    if (!unit || !session) { unclassified.push(rel + "   (needs unit folder + session)"); continue; }
    archive[subj] = archive[subj] || {};
    archive[subj][unit] = archive[subj][unit] || [];
    let row = archive[subj][unit].find(r => r.session === session);
    if (!row) { row = { session }; archive[subj][unit].push(row); }
    const sk = subj + "|" + unit + "|" + session + "|" + kind;
    if (seen[sk]) { dupes.push(rel + "   (duplicate of " + seen[sk] + ")"); continue; }
    seen[sk] = rel;
    row[kind] = rel;
    papers++;
  } else if (/\.(pdf|pptx?|docx?)$/i.test(base)) {
    resources.push({ name: pretty(base), file: rel, size: st.size, cat: catOf(base), sub: subOf(base) });
  } else {
    skipped.push(rel + "  (" + fmtB(st.size) + ")");
  }
}

Object.values(byBaseSize).forEach(list => {
  if (list.length > 1) dupes.push("SAME FILE x" + list.length + ": " + list.join("  =  "));
});

const sKey = s => {
  const m = s.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{4})/);
  const o = { Jan:1,Feb:2,Mar:3,Apr:4,May:5,Jun:6,Jul:7,Aug:8,Sep:9,Oct:10,Nov:11,Dec:12 };
  return m ? (+m[2] * 100 + o[m[1]]) : 0;
};

Object.values(archive).forEach(u => Object.values(u).forEach(rows => rows.sort((a, b) => sKey(a.session) - sKey(b.session))));

const js = "/* GENERATED by tools/build-manifest.js — do not edit by hand.\n   Regenerate:  node tools/build-manifest.js\n   Source: " + ROOT + "/ (" + files.length + " files, " + fmtB(totalSize) + ") */\nvar ARCHIVE_DATA = " + JSON.stringify(archive, null, 1) + ";\nvar RESOURCE_DATA = " + JSON.stringify(resources, null, 1) + ";\n";

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, js);

console.log("Wrote " + OUT + " — " + papers + " paper files, " + resources.length + " resources, " + fmtB(totalSize));
Object.keys(archive).sort().forEach(s => {
  Object.keys(archive[s]).sort().forEach(u => console.log("  " + s + " / " + u + ": " + archive[s][u].length + " sessions"));
});
if (unclassified.length) {
  console.log("NEEDS attention (" + unclassified.length + ") — put maths papers in assets/maths/P1 (or P2/P3/P4/S1/M1) folders:");
  unclassified.slice(0, 30).forEach(u => console.log("  - " + u));
}
if (dupes.length) {
  console.log("Possible duplicates (" + dupes.length + "):");
  dupes.slice(0, 20).forEach(d => console.log("  - " + d));
}
if (skipped.length) {
  console.log("Skipped (" + skipped.length + "):");
  skipped.slice(0, 20).forEach(s => console.log("  - " + s));
}

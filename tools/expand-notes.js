#!/usr/bin/env node
/* tools/expand-notes.js — merges .exp-*.js content expansions into js/data-<subject>.js + js/q-<subject>.js.
 *
 * Usage: node tools/expand-notes.js <biology|physics|chemistry|maths>
 *        (optionally pass explicit expansion files: node tools/expand-notes.js biology .exp-bio-1.js .exp-bio-q.js)
 *
 * Expansion files are plain JS (loaded in a vm context) exporting:
 *   EXP_<SUBJ>_N  : { notes: { <topicId>: { points?, defs?, formulas?, mistakes?, tips? } } }
 *   EXP_<SUBJ>_QUESTIONS : { <unitId>: [ {id,topics,ref,title,marks,diff,time,q,hint,ans}, ... ] }
 *
 * Merge rules (topic notes):
 *   points/formulas/mistakes/tips → appended (string items deduped); defs → appended, deduped by t;
 *   lede/worked/oos and all topic/unit/subject header fields → untouched.
 *   Questions → appended per unit; duplicate ids abort.
 *
 * Re-emission reproduces the original compact layout byte-for-byte for untouched topics/questions
 * (verified by the audit below: every original topic block must survive verbatim unless it was expanded).
 */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");

function loadJs(file, extra) {
  const code = fs.readFileSync(file, "utf8");
  const ctx = Object.create(null);
  vm.createContext(ctx);
  vm.runInContext(code + "\n" + (extra || ""), ctx, { filename: file });
  return ctx;
}

/* ---------- compact JS serializer (matches the hand-written file style) ---------- */
function jstr(s) { return JSON.stringify(String(s)); }
function serVal(v) {
  if (typeof v === "string") return jstr(v);
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  if (Array.isArray(v)) return "[" + v.map(serVal).join(",") + "]";
  if (v && typeof v === "object") {
    return "{" + Object.keys(v).map(k => {
      const key = /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(k) ? k : jstr(k);
      return key + ":" + serVal(v[k]);
    }).join(",") + "}";
  }
  throw new Error("serVal: unsupported " + typeof v);
}
function serObj(obj, exclude) {
  return "{" + Object.keys(obj).filter(k => !exclude || !exclude.includes(k))
    .map(k => k + ":" + serVal(obj[k])).join(",") + "}";
}
function serUnit(unit) {
  const head = "{" + Object.keys(unit).filter(k => k !== "topics")
    .map(k => k + ":" + serVal(unit[k])).join(",");
  const topics = unit.topics.map(serTopic).join(",\n");
  return head + ",\ntopics:[\n" + topics + "\n]}";
}
function serTopic(t) {
  const n = t.notes;
  const lines = [];
  lines.push("{id:" + jstr(t.id) + ", name:" + jstr(t.name) + ", tags:" + jstr(t.tags) + ",");
  lines.push("notes:{lede:" + jstr(n.lede) + ",");
  lines.push("points:[");
  n.points.forEach((p, i) => lines.push(jstr(p) + (i === n.points.length - 1 ? "]," : ",")));
  if (n.formulas) lines.push("formulas:" + serVal(n.formulas) + ",");
  if (n.defs) lines.push("defs:" + serVal(n.defs) + ",");
  if (n.worked) lines.push("worked:" + serVal(n.worked) + ",");
  if (n.mistakes) lines.push("mistakes:" + serVal(n.mistakes) + ",");
  if (n.tips) lines.push("tips:" + serVal(n.tips) + ",");
  lines.push("oos:" + jstr(n.oos) + "}}");
  return lines.join("\n");
}
function serQuestion(q) {
  const head = "{id:" + jstr(q.id) + ",topics:" + serVal(q.topics) + ",ref:" + jstr(q.ref) +
    ",title:" + jstr(q.title) + ",marks:" + q.marks + ",diff:" + q.diff + ",time:" + jstr(q.time) + ",";
  return head + "\nq:" + jstr(q.q) + ",\nhint:" + jstr(q.hint) + ",\nans:" + serVal(q.ans) + "}";
}
function serQBANK(qbank) {
  return Object.keys(qbank).map(u => u + ":[\n" + qbank[u].map(serQuestion).join(",\n") + "\n]").join(",\n");
}

/* ---------- merge helpers ---------- */
function appendDedupe(arr, items) {
  const have = new Set(arr);
  for (const it of items || []) if (!have.has(it)) { have.add(it); arr.push(it); }
}
function mergeDefs(arr, defs) {
  const have = new Set(arr.map(d => d.t));
  for (const d of defs || []) if (!have.has(d.t)) { have.add(d.t); arr.push(d); }
}
function mergeFormulas(arr, items) {
  const have = new Set(arr.map(f => f.e));
  for (const f of items || []) if (!have.has(f.e)) { have.add(f.e); arr.push(f); }
}

function mergeNotes(topic, expansion, report, subject) {
  if (!expansion) return;
  let added = 0;
  for (const key of ["points", "mistakes", "tips"]) {
    if (!expansion[key]) continue;
    const before = topic.notes[key] ? topic.notes[key].length : 0;
    if (!topic.notes[key]) topic.notes[key] = [];
    appendDedupe(topic.notes[key], expansion[key]);
    added += topic.notes[key].length - before;
  }
  if (!topic.notes.formulas) topic.notes.formulas = [];
  const fb = topic.notes.formulas.length;
  mergeFormulas(topic.notes.formulas, expansion.formulas);
  added += topic.notes.formulas.length - fb;
  if (!topic.notes.defs) topic.notes.defs = [];
  const db = topic.notes.defs.length;
  mergeDefs(topic.notes.defs, expansion.defs);
  added += topic.notes.defs.length - db;
  if (added) report.push(`${subject} ${topic.id}: +${added} items`);
}

function mergeQuestions(qbank, expansion, report, subject) {
  if (!expansion) return;
  const seen = new Set();
  for (const unit of Object.keys(qbank)) (qbank[unit] || []).forEach(q => seen.add(q.id));
  for (const unit of Object.keys(expansion)) {
    if (!qbank[unit]) { qbank[unit] = []; }
    for (const q of expansion[unit]) {
      if (seen.has(q.id)) throw new Error(`${subject}: duplicate question id ${q.id}`);
      seen.add(q.id);
      qbank[unit].push(q);
      report.push(`${subject} ${unit}: +Q ${q.id} "${q.title}"`);
    }
  }
}

/* ---------- per-subject run ---------- */
function runSubject(subject) {
  const SUBJ = subject.toUpperCase();
  const dataFile = path.join(ROOT, `js/data-${subject}.js`);
  const qFile = path.join(ROOT, `js/q-${subject}.js`);
  const origData = fs.readFileSync(dataFile, "utf8");
  const origQ = fs.readFileSync(qFile, "utf8");

  const dataCtx = loadJs(dataFile, `\nthis.SUBJECT = SUBJECT_${SUBJ};`);
  const qCtx = loadJs(qFile, `\nthis.QBANK = QBANK_${SUBJ};`);
  const SUBJECT = dataCtx.SUBJECT;
  const QBANK = qCtx.QBANK;

  // discover expansion files
  const EXP_PREFIX = { biology: ".exp-bio", physics: ".exp-phy", chemistry: ".exp-che", maths: ".exp-mat" };
  let expFiles;
  const explicit = process.argv.slice(3);
  if (explicit.length) expFiles = explicit;
  else expFiles = fs.readdirSync(ROOT)
    .filter(f => f.startsWith(EXP_PREFIX[subject]) && f.endsWith(".js"))
    .sort();
  if (!expFiles.length) { console.log(`No expansion files for ${subject} — nothing to do.`); return; }

  const report = [];
  for (const f of expFiles) {
    const ctx = loadJs(path.join(ROOT, f));
    let touched = false;
    for (const key of Object.keys(ctx)) {
      const v = ctx[key];
      if (v && v.notes && typeof v.notes === "object") {
        for (const tid of Object.keys(v.notes)) {
          let found = false;
          for (const unit of SUBJECT.units) for (const t of unit.topics) {
            if (t.id === tid) { mergeNotes(t, v.notes[tid], report, subject); found = true; }
          }
          if (!found) throw new Error(`${f}: unknown topic ${tid} in ${subject}`);
        }
        touched = true;
      }
      if (v && (key.includes("QUESTIONS") || key === "questions")) {
        mergeQuestions(QBANK, v, report, subject);
        touched = true;
      }
    }
    if (!touched) console.warn(`  ${f}: no EXP_ notes/QUESTIONS globals found — skipped`);
  }

  /* ---------- re-emit in the original compact layout ---------- */
  function emitData() {
    const headIdx = origData.indexOf("units:[");
    const head = origData.slice(0, headIdx); // keeps header comment + subject header fields verbatim
    const body = "units:[\n" + SUBJECT.units.map(serUnit).join(",\n") + "\n]};\n";
    return head + body;
  }
  function emitQ() {
    const head = origQ.slice(0, origQ.indexOf("\n")) + "\n"; // header comment line only
    return head + "var QBANK_" + SUBJ + " = {\n" + serQBANK(QBANK) + "\n};\n";
  }

  /* ---------- audit before writing ---------- */
  // 1. every original topic block (untouched or not) must still serialize back to the same lines as the original file,
  //    unless that topic was expanded (then it must have MORE items).
  const origTopics = new Map();
  {
    const lines = origData.split("\n");
    let cur = null, buf = [];
    for (const ln of lines) {
      const m = ln.match(/^\{id:"([^"]+)", name:/);
      if (m && /[A-Z0-9]+T\d+$/.test(m[1])) { if (cur) origTopics.set(cur, buf.join("\n").replace(/,$/, "")); cur = m[1]; buf = [ln]; continue; }
      if (cur) { buf.push(ln); if (/}}[,]?$/.test(ln)) { origTopics.set(cur, buf.join("\n").replace(/,$/, "")); cur = null; buf = []; } }
    }
  }
  const expandedTopics = new Set();
  for (const f of expFiles) {
    const ctx = loadJs(path.join(ROOT, f));
    for (const key of Object.keys(ctx)) if (ctx[key] && ctx[key].notes) Object.keys(ctx[key].notes).forEach(t => expandedTopics.add(t));
  }
  for (const unit of SUBJECT.units) for (const t of unit.topics) {
    const orig = origTopics.get(t.id);
    if (!orig) throw new Error("audit: original topic block not found for " + t.id);
    const now = serTopic(t);
    if (!expandedTopics.has(t.id)) {
      if (orig !== now) throw new Error(`audit: untouched topic ${t.id} re-serialised differently — format drift:\nORIG:\n${orig}\nNOW:\n${now}`);
    } else if (now.length < orig.length) {
      throw new Error(`audit: expanded topic ${t.id} got SMALLER — merge bug`);
    }
  }
  // 2. question counts must be >= original, ids unique
  {
    const origCount = (origQ.match(/^\{id:"[A-Z]+-[A-Z0-9]+-\d+"/gm) || []).length;
    const newCount = Object.values(QBANK).reduce((a, b) => a + b.length, 0);
    if (newCount < origCount) throw new Error(`audit: question count dropped ${origCount} → ${newCount}`);
    const ids = Object.values(QBANK).flat().map(q => q.id);
    if (new Set(ids).size !== ids.length) throw new Error("audit: duplicate question ids");
  }
  // 3. emitted files must re-load and expose the same subjects
  fs.writeFileSync(path.join(ROOT, ".tmp-audit-data.js"), emitData());
  fs.writeFileSync(path.join(ROOT, ".tmp-audit-q.js"), emitQ());
  const ctx2 = loadJs(path.join(ROOT, ".tmp-audit-data.js"), `\nthis.SUBJECT = SUBJECT_${SUBJ};`);
  const ctx3 = loadJs(path.join(ROOT, ".tmp-audit-q.js"), `\nthis.QBANK = QBANK_${SUBJ};`);
  const sameTopics = (a, b) => JSON.stringify(a.units.map(u => u.topics.map(t => t.id))) === JSON.stringify(b.units.map(u => u.topics.map(t => t.id)));
  if (!sameTopics(SUBJECT, ctx2.SUBJECT)) throw new Error("audit: topic order changed after re-emit");
  const q2 = Object.values(QBANK).flat().map(q => q.id);
  const q3 = Object.values(ctx3.QBANK).flat().map(q => q.id);
  if (JSON.stringify(q2) !== JSON.stringify(q3)) throw new Error("audit: question ids differ after re-emit");
  fs.unlinkSync(path.join(ROOT, ".tmp-audit-data.js"));
  fs.unlinkSync(path.join(ROOT, ".tmp-audit-q.js"));

  fs.writeFileSync(dataFile, emitData());
  fs.writeFileSync(qFile, emitQ());
  console.log(`\n=== ${subject} ===`);
  console.log(report.join("\n") || "(no changes)");
  console.log(`notes topics: ${SUBJECT.units.reduce((a, u) => a + u.topics.length, 0)} | questions: ${Object.values(QBANK).reduce((a, b) => a + b.length, 0)} | written: js/data-${subject}.js, js/q-${subject}.js`);
}

if (!process.argv[2]) { console.error("usage: node tools/expand-notes.js <biology|physics|chemistry|maths> [expFiles...]"); process.exit(1); }
for (const s of process.argv[2].split(",")) runSubject(s.trim());

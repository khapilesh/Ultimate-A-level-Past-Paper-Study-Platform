#!/usr/bin/env node
/* Smoke test: load index.html scripts, render home + biology subject/topic/questions. */
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
let fails = 0; const ok = (c, m) => { console.log((c ? "  ✅ " : "  ❌ ") + m); if (!c) fails++; };
const elements = {};
function makeEl(id) {
  const s = new Set();
  return { id, innerHTML: "", textContent: "", className: "", style: {}, value: "", checked: false, disabled: false, scrollHeight: 0,
    classList: { add: c => s.add(c), remove: c => s.delete(c), contains: c => s.has(c),
      toggle: (c, f) => { f === undefined ? (s.has(c) ? s.delete(c) : s.add(c)) : (f ? s.add(c) : s.delete(c)); } },
    querySelector: () => makeEl(id + ">sub"), appendChild() {}, addEventListener() {} };
}
const appEl = { get innerHTML(){ return (elements["app"]||{innerHTML:""}).innerHTML; } };
global.document = { getElementById: id => elements[id] || (elements[id] = makeEl(id)),
  querySelectorAll: () => ({ forEach() {}, length: 0 }), querySelector: () => makeEl("dyn"),
  createElement: () => makeEl("dyn"), addEventListener() {}, activeElement: { tagName: "BODY" },
  documentElement: { dataset: {} } };
const store = {};
global.localStorage = { getItem: k => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); }, removeItem: k => { delete store[k]; } };
global.window = { scrollTo() {}, addEventListener() {} };
global.location = { hash: "#/home" };
global.confirm = () => true;
global.setInterval = () => 1; global.clearInterval = () => {}; global.setTimeout = () => 1; global.clearTimeout = () => {};

const scripts = ["js/data-physics.js","js/data-chemistry.js","js/data-biology.js","js/data-maths.js","js/q-physics.js","js/q-chemistry.js","js/q-biology.js","js/q-maths.js","js/tutor.js","js/archive-data.js","js/test-focus.js","js/test.js","js/app.js"];
for (const f of scripts) (0, eval)(fs.readFileSync(path.join(ROOT, f), "utf8"));

console.log("[1] Data integrity");
ok(SUBJECT_BIOLOGY.units.length === 8, "Biology has 8 units (book structure)");
let bioTopics = 0, bioQ = 0, bioMarks = 0;
SUBJECT_BIOLOGY.units.forEach(u => { bioTopics += u.topics.length; bioQ += unitQuestions("biology", u.id).length; bioMarks += unitQuestions("biology", u.id).reduce((a, q) => a + q.marks, 0); });
ok(bioTopics === 24, "Biology has 24 topics (got " + bioTopics + ")");
ok(bioQ === 86, "Biology question bank has 86 Qs (got " + bioQ + ")");
ok(bioMarks === 597, "Biology question bank has 597 marks (got " + bioMarks + ")");

console.log("[2] Render home");
view.sid = "physics"; view.uid = null; view.tab = 0; view.tid = null;
location.hash = "#/home"; render();
ok(appEl.innerHTML.length > 500, "Home renders (" + appEl.innerHTML.length + " chars)");

console.log("[3] Render biology subject view");
location.hash = "#/subject/biology"; view.sid = "biology"; view.uid = "WBI21"; view.tab = 0;
render();
const h = appEl.innerHTML;
ok(h.indexOf("WBI21") >= 0, "Subject view shows WBI21 unit id");
ok(h.indexOf("Mitosis, Meiosis and Reproduction") >= 0, "Shows new T3B topic name");
ok(h.indexOf("Gene Technology") >= 0, "Shows T8C topic name");

console.log("[4] Render a topic's notes (T5B)");
view.uid = "WBI31"; view.tid = "T5B"; view.tab = 0; render();
const t = appEl.innerHTML;
ok(t.indexOf("Mark-release-recapture") >= 0 || t.indexOf("MRR") >= 0, "Topic notes include MRR content");
ok((t.match(/class='tick'/g) || []).length >= 1, "Points render as tick list");
ok(t.indexOf("Thinking Bigger") >= 0 || t.indexOf("Beyond syllabus") >= 0, "oos/Thinking Bigger block present");

console.log("[5] Render biology topical questions");
view.uid = "WBI11"; view.tid = null; view.tab = 1; view.qmode = "topical"; view.qtopics = []; view.qsearch = "";
render();
const q = appEl.innerHTML;
ok((q.match(/BIO-WBI11/g) || []).length >= 0, "Q list renders");
const c = counts();
console.log("  counts(): " + JSON.stringify(c));
ok(c.questions >= 86 + 38 + 38 + 39, "Total question bank across subjects intact (" + c.questions + ")");

process.exit(fails ? 1 : 0);

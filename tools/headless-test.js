#!/usr/bin/env node
/* Headless engine test for the Test Focus page (js/test.js + js/test-focus.js).
   Stubs view/localStorage/document/render, renders all 3 tabs (each >2000 chars),
   then runs: start → ticks → auto-finish → tick all mark points → score.
   Perfect paper must equal total marks; blank paper must be 0.
   Usage: node tools/headless-test.js   (from repo root) */
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");

let fails = 0;
const ok = (cond, msg) => { console.log((cond ? "  ✅ " : "  ❌ ") + msg); if (!cond) fails++; };

/* ---------- DOM / browser stubs ---------- */
const elements = {};
function makeEl(id) {
  const s = new Set();
  return {
    id, innerHTML: "", textContent: "", className: "", style: {}, value: "", checked: false, disabled: false, scrollHeight: 0,
    classList: {
      add: c => s.add(c), remove: c => s.delete(c), contains: c => s.has(c),
      toggle: (c, f) => { f === undefined ? (s.has(c) ? s.delete(c) : s.add(c)) : (f ? s.add(c) : s.delete(c)); }
    },
    querySelector: () => makeEl(id + ">sub"),
    appendChild() {}
  };
}
const appEl = makeEl("app");
global.document = {
  getElementById: id => elements[id] || (elements[id] = makeEl(id)),
  querySelectorAll: () => ({ forEach() {}, length: 0 }),
  createElement: () => makeEl("dyn"),
  addEventListener() {},
  activeElement: { tagName: "BODY" }
};
const store = {};
global.localStorage = {
  getItem: k => (k in store ? store[k] : null),
  setItem: (k, v) => { store[k] = String(v); },
  removeItem: k => { delete store[k]; }
};
global.window = { scrollTo() {} };
global.location = { hash: "#/test" };
global.confirm = () => true;
const toasts = [];
global.toast = m => toasts.push(m);
let tickFn = null;
global.setInterval = fn => { tickFn = fn; return 1; };
global.clearInterval = () => { tickFn = null; };
global.view = { testTab: "notes" };
global.render = function () { appEl.innerHTML = vTest(); };

/* ---------- load the two files (indirect eval → globals) ---------- */
(0, eval)(fs.readFileSync(path.join(ROOT, "js/test-focus.js"), "utf8"));
(0, eval)(fs.readFileSync(path.join(ROOT, "js/test.js"), "utf8"));

console.log("\n[1] Render all three tabs");
global.view.testTab = "notes";
render();
ok(appEl.innerHTML.length > 2000, "Notes tab renders >2000 chars (" + appEl.innerHTML.length + ")");
ok(appEl.innerHTML.indexOf("tf-note") >= 0 && (appEl.innerHTML.match(/class='tf-note'/g) || []).length === TEST_FOCUS.notes.length, "Notes tab has " + TEST_FOCUS.notes.length + " accordion notes");
ok(appEl.innerHTML.indexOf(" open") >= 0, "First note is open by default");

global.view.testTab = "practice";
render();
ok(appEl.innerHTML.length > 2000, "Practice tab renders >2000 chars (" + appEl.innerHTML.length + ")");
ok(appEl.innerHTML.indexOf("Indicative points") >= 0, "Indicative label shows for official:false questions");
ok(appEl.innerHTML.indexOf("Official mark scheme") >= 0, "Official label shows for official questions");
ok((appEl.innerHTML.match(/tfrev-/g) || []).length >= TEST_FOCUS.questions.length * 3, "Each question has 3 reveal blocks");

global.view.testTab = "timed";
render();
ok(appEl.innerHTML.length > 2000, "Timed setup tab renders >2000 chars (" + appEl.innerHTML.length + ")");
ok(appEl.innerHTML.indexOf("tfpick-") >= 0, "Setup has per-question checkboxes");
ok(TEST.sel.length === TEST_FOCUS.questions.length, "Default selection = ALL questions");

console.log("\n[2] Start the timer and let it tick");
const expectMarks = TEST_FOCUS.questions.reduce((a, q) => a + q.marks, 0);
tfStart();
ok(TEST.state === "running", "State is running");
ok(TEST.marks === expectMarks, "Selection marks = " + TEST.marks);
ok(TEST.total === Math.ceil(expectMarks * TEST_FOCUS.timePerMark) * 60, "Total seconds = " + TEST.total + " (" + Math.ceil(expectMarks * TEST_FOCUS.timePerMark) + " min)");
ok(tickFn !== null, "Interval registered");
render();
ok(appEl.innerHTML.indexOf("id='tfClock'") >= 0, "Running view has sticky timer clock");
ok(appEl.innerHTML.indexOf("id='tfBar'") >= 0, "Running view has progress bar");
ok(appEl.innerHTML.indexOf("EXAM CONDITIONS") >= 0, "Red exam-conditions note shown");
const before = TEST.left;
tickFn();
ok(TEST.left === before - 1, "Tick decrements the clock");
ok(elements.tfClock.textContent === tfClockStr(TEST.left), "Tick updates #tfClock text only (" + elements.tfClock.textContent + ")");
ok(elements.tfBar.style.width !== "", "Tick updates #tfBar width");

console.log("\n[3] Pause / resume survive re-render");
tfPause();
ok(TEST.paused === true, "Paused");
const frozen = TEST.left;
tickFn();
ok(TEST.left === frozen, "Clock does not advance while paused");
tfResume();
ok(TEST.paused === false, "Resumed");

console.log("\n[4] Timer survives navigating away (null-guarded)");
Object.keys(elements).forEach(k => delete elements[k]); // simulate leaving the page
let threw = false;
try { tickFn(); } catch (e) { threw = true; console.log("     threw: " + e.message); }
ok(!threw, "Tick with no DOM present does not throw");
ok(TEST.state === "running", "State persists while away");

console.log("\n[5] Auto-finish at zero");
TEST.left = 1;
tickFn();
ok(TEST.left === 0, "Clock reached 0");
ok(TEST.state === "marking", "Auto-finished into marking state");
ok(TEST.auto === true, "auto flag set");
render();
ok(appEl.innerHTML.indexOf("tfScoreLine") >= 0, "Marking view has live score line");
ok(appEl.innerHTML.indexOf("type='checkbox'") >= 0, "Marking view has tickable mark points");

console.log("\n[6] PERFECT paper — tick every mark point");
TEST.sel.forEach(id => { TEST.checks[id] = tfQ(id).ms.map(() => true); });
tfMarkLine();
ok(elements.tfScoreLine.innerHTML.indexOf(expectMarks + " / " + expectMarks) >= 0, "Live line shows perfect before finish");
tfScore();
ok(TEST.state === "results", "State is results");
ok(TEST.score === expectMarks, "Perfect score = total marks (" + TEST.score + "/" + expectMarks + ")");
ok(TEST.pct === 100, "pct = 100");
ok(TEST.band === "A*", "Band A*");
render();
ok(appEl.innerHTML.indexOf("tf-score-ring") >= 0, "Results shows score ring");
ok(appEl.innerHTML.indexOf("Stretch bands") >= 0, "Results shows stretch-boundary note");
ok(appEl.innerHTML.indexOf("Auto-submitted") >= 0, "Results notes auto-finish");
const best1 = JSON.parse(global.localStorage.getItem("tfbest_" + TEST_FOCUS.id));
ok(best1 && best1.pct === 100 && best1.score === expectMarks, "Best score saved to localStorage");

console.log("\n[7] BLANK paper — score 0, best not downgraded");
tfRetake();
ok(TEST.state === "setup", "Retake back to setup");
tfStart();
TEST.left = 1; tickFn(); // auto-finish
ok(TEST.state === "marking", "Blank attempt auto-finished");
tfScore();
ok(TEST.score === 0, "Blank score = 0");
ok(TEST.pct === 0 && TEST.band === "U", "Blank pct 0 / band U");
const best2 = JSON.parse(global.localStorage.getItem("tfbest_" + TEST_FOCUS.id));
ok(best2.pct === 100, "Best score NOT downgraded by blank paper");

console.log("\n[8] Partial paper — cap at marks per question");
tfRetake(); tfStart();
// tick all but one of each question's allowed marks (tests the min(ticked, marks) cap)
TEST.sel.forEach(id => { const q = tfQ(id); TEST.checks[id] = q.ms.map((_, i) => i < q.marks - 1); });
tfScore();
const expP = TEST_FOCUS.questions.reduce((a, q) => a + Math.min(Math.max(0, q.marks - 1), q.ms.length), 0);
ok(TEST.score === expP, "Partial score respects per-question cap (" + TEST.score + " = " + expP + ")");

console.log(fails === 0 ? "\n🎉 HEADLESS ENGINE TEST PASSED" : "\n❌ " + fails + " HEADLESS FAILURES");
process.exit(fails ? 1 : 0);

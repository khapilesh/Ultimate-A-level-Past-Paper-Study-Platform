const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

function teachingWordCount(notes) {
  const parts = [
    notes.lede,
    notes.points,
    (notes.sections || []).flatMap((section) => [section.title, section.intro, section.points || []]),
    (notes.walkthrough || []).flatMap((step) => [step.title, step.text]),
    (notes.formulas || []).flatMap((formula) => [formula.e, formula.w]),
    (notes.defs || []).flatMap((definition) => [definition.t, definition.d]),
    notes.worked ? [notes.worked.q, notes.worked.steps || []] : [],
  ];
  const text = parts
    .flat(Infinity)
    .filter((part) => typeof part === "string")
    .join(" ")
    .replace(/<\/?[a-z][^>]*>/gi, " ")
    .replace(/&(?:[a-z]+|#\d+|#x[\da-f]+);/gi, " ");
  return (text.match(/[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*/gu) || []).length;
}

const storage = Object.create(null);
const app = { innerHTML: "" };
const document = {
  documentElement: { dataset: { theme: "light" } },
  activeElement: null,
  addEventListener() {},
  querySelectorAll() {
    return [];
  },
  getElementById(id) {
    return id === "app" ? app : null;
  },
};
const localStorage = {
  getItem(key) {
    return Object.prototype.hasOwnProperty.call(storage, key) ? storage[key] : null;
  },
  setItem(key, value) {
    storage[key] = value;
  },
};
const context = {
  console,
  Date,
  Math,
  document,
  localStorage,
  location: { hash: "#/subject/physics/U1" },
  window: { addEventListener() {}, scrollTo() {} },
  setTimeout() {
    return 1;
  },
  clearTimeout() {},
};
vm.createContext(context);

const dataFiles = [
  "data-physics.js",
  "data-chemistry.js",
  "data-biology.js",
  "data-maths.js",
  "notes-physics.js",
  "notes-chemistry.js",
  "notes-biology.js",
  "notes-maths.js",
  "notes-walkthrough-physics.js",
  "notes-walkthrough-chemistry.js",
  "notes-walkthrough-biology.js",
  "notes-walkthrough-maths.js",
  "q-physics.js",
  "q-chemistry.js",
  "q-biology.js",
  "q-maths.js",
  "q-expanded-physics.js",
  "q-expanded-chemistry.js",
  "q-expanded-biology.js",
  "q-expanded-maths.js",
  "q-repeat.js",
];
for (const file of dataFiles) {
  const path = `js/${file}`;
  vm.runInContext(fs.readFileSync(path, "utf8"), context, { filename: path });
}
for (const path of ["js/book-layout.js", "js/app.js"]) {
  vm.runInContext(fs.readFileSync(path, "utf8"), context, { filename: path });
}

assert.match(app.innerHTML, /Detailed teaching/);
assert.doesNotMatch(app.innerHTML, /Study notes/);
assert.match(app.innerHTML, /WHAT YOU'LL LEARN/);
assert.match(app.innerHTML, /YOUR TEACHING PATH/);
assert.match(app.innerHTML, /TEACHING STUDIO/);
assert.match(context.vSubject(), /Detailed Teaching/);
assert.doesNotMatch(context.vSubject(), /📖 Revise/);

let topicCount = 0;
let guidedExplanationCount = 0;
let minimumTeachingWords = Infinity;
for (const subject of Object.values(context.SUBJECTS)) {
  for (const unit of subject.units) {
    for (const topic of unit.topics) {
      topicCount++;
      const notes = topic.notes || {};
      const words = teachingWordCount(notes);
      minimumTeachingWords = Math.min(minimumTeachingWords, words);
      assert.ok(words >= 500, `${topic.id} has ${words} teaching words; every topic needs at least 500`);
      assert.ok(notes.sections && notes.sections.length, `${topic.id} needs detailed teaching sections`);
      assert.ok(notes.walkthrough && notes.walkthrough.length, `${topic.id} needs guided explanations`);
      const pages = context.bookNotePages(topic);
      const sectionPages = pages.filter((page) => page.kind === "sections");
      assert.ok(sectionPages.length, `${topic.id} needs rendered section pages`);
      const sectionHtml = sectionPages
        .map((page) => context.renderBookNotePage(page, topic, notes))
        .join("");
      for (const section of notes.sections) {
        assert.ok(sectionHtml.includes(context.esc(section.title)), `${topic.id} is missing section: ${section.title}`);
        if (section.intro) assert.ok(sectionHtml.includes(context.esc(section.intro)), `${topic.id} is missing section introduction: ${section.title}`);
        for (const point of section.points || []) {
          assert.ok(sectionHtml.includes(point), `${topic.id} is missing section teaching text: ${section.title}`);
        }
      }
      const lessonPages = pages.filter((page) => page.kind === "walkthrough");
      assert.ok(lessonPages.length, `${topic.id} needs a walkthrough page`);
      const html = lessonPages.map((page) => context.renderBookNotePage(page, topic, notes)).join("");
      assert.match(html, /DETAILED TEACHING/);
      assert.match(html, /TEACHING STEP 01/);
      for (const step of notes.walkthrough) {
        assert.ok(html.includes(step.title), `${topic.id} is missing teaching step: ${step.title}`);
        assert.ok(html.includes(context.esc(step.text)), `${topic.id} is missing teaching explanation: ${step.title}`);
      }
      if (notes.reviewPrompt) assert.match(html, /PAUSE &amp; EXPLAIN/);
      guidedExplanationCount += notes.walkthrough.length;
    }
  }
}

assert.equal(topicCount, 91, "the 500-word check must cover all 91 syllabus topics");
console.log("BOOK_TEACHING_OK", JSON.stringify({ topicCount, guidedExplanationCount, minimumTeachingWords }));

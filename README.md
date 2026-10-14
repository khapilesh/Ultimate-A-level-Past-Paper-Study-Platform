# 🎓 IAL Mastery — Ultimate Edexcel IAL Study Platform

A free, offline-friendly study website for **Edexcel International A Level**:
- ⚛️ **Physics** (WPH11–WPH16)
- ⚗️ **Chemistry** (WCH11–WCH16)
- 🧬 **Biology** (WBI11–WBI16)
- 📐 **Mathematics** (P1–P4, S1, M1 only — WMA11–14, WST01, WME01)

## Features

### 📝 Past Paper Questions (priority #1)
- **152 exam-style topical questions** across all 24 units, each modelled on a real past-paper question and labelled with its paper/session reference
- Filter by **topic — tick multiple topics** for mixed sets, just like real papers
- Difficulty ratings, time guides, hints, and **full mark-scheme answers**
- Honest self-marking (✅ got it / 🔁 review) with XP rewards
- **⏱️ Mock Builder**: pick any topic combination, set questions + time, sit it timed, get a graded score
- **🗂️ Full Paper Archive**: every session Jan 2019 – Jun 2026 indexed per unit, with links to official QPs, mark schemes and examiner reports (Save My Exams, Pearson, PMT, Chem-Bio, A Level Maths Revision…)

### 📖 Revise (priority #2)
- **91 syllabus topics**, every one with point-form notes: key points, formulae, word-perfect definitions, worked examples, ⚠️ classic mistakes, ⭐ examiner tips
- 🔮 Out-of-syllabus enrichment is included only where it aids understanding — and always labelled
- 🃏 Flashcards per topic, topic checklists, progress tracking

### 🤖 Ask AI tutor
- Built-in **offline tutor** that knows the whole syllabus: explain topics, define terms, give formulae, set quizzes, share exam tips
- Optional **full-AI mode**: paste your own OpenAI-compatible API key (stored only in your browser) for free-form chat

### 📊 Progress
- XP, streaks, per-subject rings, mock best-scores — all stored privately in `localStorage`

## Run it

No build step — it's pure HTML/CSS/JS:

```bash
# any static server, e.g.
python3 -m http.server 8000
# then open http://localhost:8000
```

Or deploy the folder to GitHub Pages / Netlify / Vercel as-is.

## Project structure

```
index.html          — app shell
css/style.css       — full design system (dark/light themes)
js/
  data-physics.js    — Physics syllabus + notes
  data-chemistry.js  — Chemistry syllabus + notes
  data-biology.js    — Biology syllabus + notes
  data-maths.js      — Maths (P1–P4, S1, M1) syllabus + notes
  q-physics.js       — Physics topical question bank
  q-chemistry.js     — Chemistry topical question bank
  q-biology.js       — Biology topical question bank
  q-maths.js         — Maths topical question bank
  tutor.js           — offline tutor engine + optional LLM mode
  app.js             — routing, revise/papers/mock/AI/progress views
```

## Assets & direct paper links

The `assets/` folder (currently removed from the repo) can hold the official specs, formula book, sample assessments, guides — and real past papers organised per subject (e.g. `assets/biology/unit 1/JAN 2024/wbi11-01-que-20240109.pdf`; `assets/maths/P1/January 2019 QP.pdf` — one folder per unit). The site reads `js/archive-data.js` to show direct download buttons in the Archive tab and power the Resources page. Regenerate after adding/removing PDFs: `node tools/build-manifest.js` (scans `assets/` → `js/archive-data.js`). Keep pirated textbooks OUT of `assets/` (public repo, DMCA risk).

## Test Focus page (🎯)

The `#/test` route holds a swappable "Test Focus" for the current upcoming test. Right now: **WBI11 Topic 1 (Molecules, Transport and Health)** — deep-dive notes (20 sections covering every subtopic of the student book's Topic 1: 1A.1–1A.5 Chemistry of Life, 1B.1–1B.4 Mammalian Transport, 1C.1–1C.7 CVD, plus "Using the Evidence", the heart-failure extension and exam skills), 66 practice questions (57 real WBI11 June 2023 / Jan 2023 / Jan 2024 past-paper questions whose mark points are taken mark-by-mark from the official mark schemes — including ACCEPT / DO NOT ACCEPT notes and the level grids for the extended-response questions — with model answers stitched to the marking points so reading the answer in order ticks the marks in order, plus an original exam-style topic bank), and a timed test (select questions → countdown at ~1.2 min/mark → auto-submit → per-marking-point self-marking → score, band and best-score tracking; the full 66-question paper is 142 marks = 171 min). The original topic-bank items and the June 2023 Q8(b)/(c)(iii) items (whose official mark scheme is not recoverable from the public PDFs) are labelled "Indicative points". All content lives in `js/test-focus.js` as one `TEST_FOCUS` object — swap that file for the next test; `js/test.js` is the generic engine.

## Content honesty

- Topical questions are **original exam-style questions** written for the current syllabus, each credited as "modelled on" a real paper/question — full official papers are linked, never copied.
- Grade thresholds shown (Physics June 2025) are from published boundaries; confirm your session via the linked hubs.
- Independent revision resource — not affiliated with Pearson Edexcel.

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

## Content honesty

- Topical questions are **original exam-style questions** written for the current syllabus, each credited as "modelled on" a real paper/question — full official papers are linked, never copied.
- Grade thresholds shown (Physics June 2025) are from published boundaries; confirm your session via the linked hubs.
- Independent revision resource — not affiliated with Pearson Edexcel.

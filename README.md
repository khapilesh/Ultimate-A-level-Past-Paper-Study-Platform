# 🎓 IAL Mastery — Ultimate Edexcel IAL Study Platform

A free, offline-friendly study website for **Edexcel International A Level**:
- ⚛️ **Physics** (WPH11–WPH16)
- ⚗️ **Chemistry** (WCH11–WCH16)
- 🧬 **Biology** (WBI11–WBI16)
- 📐 **Mathematics** (P1–P4, S1, M1 only — WMA11–14, WST01, WME01)

## Features

### 📝 Topic-wise Exam Practice
- **245 original exam-style questions plus 91 clearly labelled retry drills = 336 practice prompts** across all 24 units. Retry drills intentionally reuse one longer question per syllabus topic; they are not claimed as new or official past-paper items.
- Questions are grouped into topic sets with selectable variants, difficulty and timing filters, hints, and a free-text draft area before reveal.
- Every prompt includes mark-scheme checkpoints and a worked full-credit sample response; self-marking (✅ got it / 🔁 review) awards XP.
- Common topic pitfalls are shown separately from **paraphrased, source-linked examiner-report insights**. Report notes are topic-specific only where the cited report passage matches; otherwise they are labelled cross-paper advice.
- **⏱️ Mock Builder**: choose topics and timing, sit a timed set, then reveal answers and self-mark. Mocks omit the separate retry drills to avoid duplicate prompts.
- **🗂️ Full Paper Archive**: session index and links to paper hubs, mark schemes and examiner reports.

### 📖 Revise
- **91 syllabus topics** with expanded, chapter-organised notes, concise revision points, formulae, definitions, worked examples, classic mistakes, exam tips and retrieval checks.
- Every topic now includes a two-part explanatory walkthrough that connects mechanisms, calculations and applications.
- 🃏 Flashcards per topic, topic checklists and progress tracking

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
css/style.css       — flat-color design system (no gradients; dark/light sage-teal, green and warm-neutral themes with subdued blue accents)
js/
  data-physics.js    — Physics syllabus + notes
  data-chemistry.js  — Chemistry syllabus + notes
  data-biology.js    — Biology syllabus + notes
  data-maths.js      — Maths (P1–P4, S1, M1) syllabus + concise notes
  notes-physics.js   — expanded Physics chapter notes
  notes-chemistry.js — expanded Chemistry chapter notes
  notes-biology.js   — expanded Biology chapter notes
  notes-maths.js     — expanded Maths chapter notes
  notes-walkthrough-*.js — deeper explanations for every topic
  q-physics.js       — core Physics topical question bank
  q-chemistry.js     — core Chemistry topical question bank
  q-biology.js       — core Biology topical question bank
  q-maths.js         — core Maths topical question bank
  q-expanded-*.js    — additional original questions for every topic
  q-repeat.js        — one clearly labelled retry drill per syllabus topic
  examiner-insights.js — paraphrased, source-linked Pearson report notes
  tutor.js           — offline tutor engine + optional LLM mode
  app.js             — routing, revise/papers/mock/AI/progress views
```

## Content honesty and examiner-report sources

- Topical questions are **original exam-style practice**, not copied official paper questions. Retry drills intentionally repeat existing prompts; they are not new official items. Full official papers are linked separately.
- Expanded notes and walkthroughs are original explanations organised against the chapter topics supplied by the student. They are a revision aid; check the current Pearson specification and teacher guidance for assessed scope.
- Examiner-report reminders are paraphrased and linked at the question card. Topic-specific labels are used only where the report passage matches; other reminders are explicitly labelled as general advice from a representative unit report. Topic-pitfall lists are separate study guidance, not direct examiner-report quotations.
- Representative official Pearson reports consulted: [Physics WPH11, June 2024](https://qualifications.pearson.com/content/dam/pdf/International-Advanced-Level/Physics/2018/Exam-materials/wph11-01-pef-20240815.pdf), [Chemistry WCH11, June 2024](https://qualifications.pearson.com/content/dam/pdf/International-Advanced-Level/Chemistry/2018/Exam-materials/wch11-01-pef-20240815.pdf), [Chemistry WCH11, June 2022](https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Chemistry/2018/Exam-materials/wch11-01-pef-20220818.pdf), [Biology WBI11, June 2024](https://qualifications.pearson.com/content/dam/pdf/International-Advanced-Level/Biology/2018/Exam-materials/wbi11-01-pef-20240815.pdf), and [Mathematics WMA11 P1, Summer 2024](https://qualifications.pearson.com/content/dam/pdf/International-Advanced-Level/Mathematics/2018/Exam-materials/wma11-01-pef-20240815.pdf). These are representative reports, not complete report coverage for every unit and topic.
- Grade thresholds shown (Physics June 2025) are from published boundaries; confirm your session via the linked hubs.
- Independent revision resource — not affiliated with Pearson Edexcel.

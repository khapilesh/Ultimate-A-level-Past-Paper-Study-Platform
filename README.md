# 🎓 IAL Mastery — Ultimate Edexcel IAL Study Platform

A free, offline-friendly study website for **Edexcel International A Level**:
- ⚛️ **Physics** (WPH11–WPH16)
- ⚗️ **Chemistry** (WCH11–WCH16)
- 🧬 **Biology** (WBI11–WBI16)
- 📐 **Mathematics** (P1–P4, S1, M1 only — WMA11–14, WST01, WME01)

## Features

### 📚 Book-style study library
- The main screen is a bookshelf: click a subject cover to open its unit contents and select a topic.
- The former notes tab is replaced by **Detailed Teaching**: turnable lessons lead from a topic overview and core ideas through step-by-step explanations, expanded sections, worked examples, exam checks and retrieval prompts. All existing topic content and flashcards are retained.
- Practice opens in page-turn mode by topic; answer drafts, hints, mark-scheme points, sample answers, examiner insights and the all-prompts/topic-set views remain available.
- The light theme uses warm paper, sage and forest-green accents with a dark-mode option. No gradients are used.

### 📝 Topic-wise Exam Practice
- **245 original exam-style questions plus 91 clearly labelled retry drills = 336 practice prompts** across all 24 units. Retry drills intentionally reuse one longer question per syllabus topic; they are not claimed as new or official past-paper items.
- Questions are grouped into topic sets with selectable variants, difficulty and timing filters, hints, and a free-text draft area before reveal.
- Every prompt includes mark-scheme checkpoints and a worked full-credit sample response; self-marking (✅ got it / 🔁 review) awards XP.
- Common topic pitfalls are shown separately from **paraphrased, source-linked examiner-report insights**. Report notes are topic-specific only where the cited report passage matches; otherwise they are labelled cross-paper advice.
- **⏱️ Mock Builder**: choose topics and timing, sit a timed set, then reveal answers and self-mark. Mocks omit the separate retry drills to avoid duplicate prompts.
- **🗂️ Full Paper Archive**: session index and links to paper hubs, mark schemes and examiner reports.

### 🧑‍🏫 Detailed Teaching
- **91 syllabus topics** with expanded, chapter-organised teaching, concise core ideas, formulae, definitions, worked examples, common misconceptions, exam applications and retrieval checks.
- Every topic includes a two-part explanatory walkthrough that connects mechanisms, calculations and applications; lesson sections open expanded so the teaching is visible immediately.
- 🃏 Flashcards per topic, topic checklists and progress tracking

### 🎮 Playable science labs + topic practice
- The first staged redesign includes three cross-subject visual labs: **Physics — Trajectory Tuner** (set angle and speed, estimate on paper, then launch to reveal the path and landing); **Chemistry — Collision Lab** (adjust temperature, concentration and catalyst, then watch particles collide and form products); and **Biology — Membrane Mission** (choose oxygen, glucose, water or potassium, select a transport route and move visible molecules across the membrane).
- **Chemistry — 3D Bonding Sandbox** replaces the rejected count-and-predict shape exercise and is linked from the `U1T3` **Bonding & Structure** topic. The original Canvas implementation still supports methane, water, ammonia, BF₃, ethane, ethene and ethyne; sp, sp² and sp³ hybridisation; drag-to-form σ/π overlap; lone-pair/bond-domain repulsion and VSEPR explanations; and free or restricted C–C rotation. Its optional **Python-simulated electron-density view** uses Gaussian atomic-orbital functions combined in an LCAO-inspired bonding model. It is an educational approximation—not a self-consistent quantum-chemistry solver or an exact recreation of an unidentified “Quantum Chemistry” activity.
- **First actual Python/Pygame runtime port:** the same Chemistry bonding sandbox can now be opened as a browser Pygame-ce app compiled with Pygbag 0.9.3 to WebAssembly. This code executes and renders the playable molecule model in Python/Pygame; Python-generated density data alone is not being treated as the port. It retains the seven shared molecule presets, hybridisation, direct orbital dragging plus button alternatives for σ/π bond formation, electron-domain and lone-pair repulsion, rotation experiments, the π-bond rotation restriction, and explanations. The existing Canvas version remains available. This first staged port does not yet include the Canvas density overlay or synchronise its build state to the site’s XP counter; the Physics projectile, reaction-collision and Biology membrane labs are still their existing browser Canvas prototypes, and the 58 topic challenges have not been replaced.
- The Pygbag app shell and small app bundle are served from `runtime/pygame/bonding-sandbox/` for static Vercel hosting; the larger Python/WASM engine is loaded from the official Pygbag 0.9.3 CDN, so the browser needs access to that runtime host. The Pygame workbench redraws in response to interaction rather than running a continuous animation. No student playtest results are available yet.
- The Physics lab hides its path, landing point, flight time and maximum height until after launch; no Physics view draws a dotted trajectory or landing guide.
- The existing **58 topic-aligned practice challenges** remain available across Physics (19), Chemistry (22) and Biology (17): 32 numeric, 22 reasoning and 4 ordering challenges. They are labeled as topic challenges, not full visual simulations. Browse by subject and unit or launch a mixed-science challenge; hints, worked solutions, mastery, streaks and XP are retained.
- The separate **paper-first projectile SUVAT challenge** is preserved, with both fixed-speed/variable-angle and fixed-angle/variable-speed modes. It still hides its trajectory until a shot and keeps the worked solution collapsed until after the attempt.
- The projectile model assumes level ground and no air resistance. Lab and topic progress stays in local browser storage.

### 🤖 Ask AI tutor
- Built-in **offline tutor** that knows the whole syllabus: explain topics, define terms, give formulae, set quizzes, share exam tips
- Optional **full-AI mode**: paste your own OpenAI-compatible API key (stored only in your browser) for free-form chat

### 📊 Progress
- XP, streaks, per-subject rings, mock best-scores — all stored privately in `localStorage`

## Run it

The main site remains static HTML/CSS/JS; its small Pygbag app shell and game bundle are committed under `runtime/`, so Vercel can serve them without a Python build step. Run the site with any static server, e.g.:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

To rebuild the staged Python/Pygame browser app after changing its code or the shared molecule models, use an isolated environment (the system Python may be externally managed):

```bash
python3 -m venv .venv
. .venv/bin/activate
python -m pip install -r requirements-pygame.txt
python tools/build_pygame_bonding.py
```

The build writes a small static Pygbag package to `runtime/pygame/bonding-sandbox/`. The browser loads Pygbag's larger CPython/WebAssembly runtime from its official CDN. Run the interaction tests with `node tests/topic-games.test.js`, `node tests/interactive-labs.test.js`, `python3 tests/test_orbital_simulation.py` and `python3 tests/test_pygame_bonding.py`; the Pygame renderer/input smoke tests in `tests/test_pygame_bonding_ui.py` also need `pygame-ce` installed. Regenerate the committed browser electron-density data after changing molecule models with `python3 tools/simulate_orbitals.py` (or check for stale generated data with `python3 tools/simulate_orbitals.py --check`).

The root site and committed Pygbag output can be deployed to GitHub Pages / Netlify / Vercel as static files.

## Project structure

```
index.html          — main app shell; opens on the subject bookshelf
css/style.css       — shared flat-color design system (no gradients)
css/book-layout.css — permanent paper, bookshelf and paged-reader presentation
css/games.css       — responsive warm-paper layout for the projectile challenge and topic-practice arcade
css/labs.css        — visual lab showcase, Canvas stages, accessible controls and responsive lab layouts
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
  book-layout.js     — subject bookshelf, paged step-by-step teaching, and question flip reader
  topic-games.js     — original hand-calculation, reasoning and process challenges mapped to every Physics/Chemistry/Biology topic
  interactive-labs.js — Physics, Chemistry and Biology visual labs; molecule presets are loaded from the generated model data
  orbital-sandbox.js — Chemistry hybrid-orbital, σ/π bonding, Python density rendering, rotation and VSEPR sandbox
  orbital-density-data.js — precomputed Gaussian-AO/LCAO electron-density point clouds (generated by Python)
  games.js           — science-game arcade, retained projectile challenge, topic practice and local game stats
  app.js             — routing, papers/mock/AI/progress/games views and interactions
pygame_apps/bonding_sandbox/
  bonding.py         — shared-model-driven Chemistry interaction state and bond/rotation rules
  main.py            — Pygame-ce browser scene, controls, orbital rendering and explanations
data/orbital-molecule-models.json — single source of truth for molecule geometry and chemistry explanations
runtime/pygame/bonding-sandbox/ — small, generated Pygbag static bundle served by Vercel
requirements-pygame.txt — pinned optional Python/Pygbag build dependencies
tools/build_pygame_bonding.py — package the Python app and shared model data into static output
tools/pygbag/0.9.3/ — pinned Pygbag HTML template and icon used for repeatable offline builds
tools/simulate_orbitals.py — Python Gaussian-AO/LCAO density precomputation; run it to refresh the browser data
```

## Content honesty and examiner-report sources

- Topical questions are **original exam-style practice**, not copied official paper questions. Retry drills intentionally repeat existing prompts; they are not new official items. Full official papers are linked separately.
- Expanded teaching sections and walkthroughs are original explanations organised around the chapter topics. They are a learning aid; check the current Pearson specification and teacher guidance for assessed scope.
- Examiner-report reminders are paraphrased and linked at the question card. Topic-specific labels are used only where the report passage matches; other reminders are explicitly labelled as general advice from a representative unit report. Topic-pitfall lists are separate study guidance, not direct examiner-report quotations.
- Representative official Pearson reports consulted: [Physics WPH11, June 2024](https://qualifications.pearson.com/content/dam/pdf/International-Advanced-Level/Physics/2018/Exam-materials/wph11-01-pef-20240815.pdf), [Chemistry WCH11, June 2024](https://qualifications.pearson.com/content/dam/pdf/International-Advanced-Level/Chemistry/2018/Exam-materials/wch11-01-pef-20240815.pdf), [Chemistry WCH11, June 2022](https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Chemistry/2018/Exam-materials/wch11-01-pef-20220818.pdf), [Biology WBI11, June 2024](https://qualifications.pearson.com/content/dam/pdf/International-Advanced-Level/Biology/2018/Exam-materials/wbi11-01-pef-20240815.pdf), and [Mathematics WMA11 P1, Summer 2024](https://qualifications.pearson.com/content/dam/pdf/International-Advanced-Level/Mathematics/2018/Exam-materials/wma11-01-pef-20240815.pdf). These are representative reports, not complete report coverage for every unit and topic.
- Grade thresholds shown (Physics June 2025) are from published boundaries; confirm your session via the linked hubs.
- Independent revision resource — not affiliated with Pearson Edexcel.

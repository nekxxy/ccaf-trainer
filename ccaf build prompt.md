# Build Prompt: CCAF Exam Trainer (wc26.watch visual style)

Copy everything below into your coding agent (Claude Code, Cursor, etc.) as a single instruction.

---

## What to build

A static, single-page web app that helps a user study and pass the **CCAF (Claude Certified Architect Foundation)** exam by drilling them on categorized dump questions. It must be 100% client-side (HTML/CSS/JS, no backend) so it can be hosted for free on **GitHub Pages**.

## Visual theme (reference: wc26.watch)

Match this site's look and feel exactly, adapted to a study app instead of a sports scoreboard:

- **Dark mode by default**, with a light/dark toggle in the header.
- **Accent color**: `#FF6A2B` (burnt orange) used for active states, progress fills, buttons, badges.
- **Header bar**: logo/wordmark on the left, a horizontal set of nav tabs in the center/right (e.g. `Study | Categories | Progress | About`), a name/avatar chip on the far right, dark-mode toggle next to it.
- **Pill-style horizontal scrollable tabs** for category/day selection (like the date-pill strip on wc26.watch) — used here for switching between CCAF categories.
- **Card-based content blocks** with rounded corners, subtle borders, generous padding — used for question cards, category tiles, and the standings-style progress table.
- **Compact data tables** (like the Group Standings table) reused as a "Category Leaderboard" showing each category's attempt count, best score %, and pass/lock status.
- **Clean sans-serif typography**, tight letter-spacing on headers, uppercase micro-labels (e.g. "CATEGORY 3 OF 8"), muted secondary text color.
- Minimal chrome, no clutter — one primary action visible at a time.

## Onboarding flow (first visit only)

1. **Welcome screen**: ask "What should I call you?" with a text input and a Continue button. Store the name in `localStorage`.
2. **Data & privacy notice** (must be shown and require explicit acknowledgment via checkbox before continuing):
   - "All your progress is saved locally in this browser only. Switching browsers or devices, or clearing your browser data, will permanently erase your progress. There is no account and no server backend."
3. **Content disclaimer** (also shown, same screen or next):
   - "Practice questions in this app were compiled from publicly available online sources, primarily CertiQ, and have not been officially verified or endorsed by Anthropic. Use this for practice only."
4. After acknowledgment, land on the **Categories** screen, greeting the user by name (e.g. "Welcome back, {name} 👋").

## Core learning structure

- Question bank organized into **CCAF exam categories** (define a `categories.js`/`data.json` with an array of category objects; if the actual CCAF category names/weights are unknown, use a placeholder structure like `Category 1: Foundations`, `Category 2: Prompting & Context`, etc., and leave a clear `TODO` comment showing where to paste the real dump questions, pre-classified by category).
- Each category contains an array of questions: `{ id, question, choices[], correctIndex(es), explanation, difficulty }`.
- **Sequential unlock rule**: only Category 1 is unlocked at first. A category unlocks only after the user reaches **100% pass rate** on the previous category in a single completed attempt (i.e., every question in that category answered correctly, not necessarily on the first try across a session — define "100% pass" as: complete a full run of all questions in the category with zero incorrect answers).
- Locked categories are visibly greyed out/dimmed with a lock icon and a tooltip explaining what's needed to unlock them.
- Within a category, questions can be shuffled each attempt; wrong answers get queued for immediate re-drill before moving on (light spaced-repetition, not full SRS).

## Progress bar & tracking

- **Persistent top progress bar** (below the header, always visible) showing overall course completion = (categories fully passed) / (total categories).
- Per-category progress ring or bar on each category card (e.g. "7/10 correct — 70%").
- A dedicated **Progress / Dashboard** tab showing: overall %, per-category status table (styled like the standings table), current streak, total questions attempted, accuracy over time (simple line/bar chart is fine).

## Engagement / anti-boredom features (include several, don't skip this)

- Instant feedback per answer (correct = green flash + short affirming micro-copy; incorrect = red flash + the explanation shown immediately, plus why the correct answer is right).
- A visible **streak counter** (consecutive correct answers) with a small celebratory animation (confetti burst, subtle scale/bounce) on milestones (5, 10, 25 in a row) and on unlocking a new category.
- **Session stats chip** always visible during a quiz: question X of N, running accuracy %, time on question (optional, non-punitive — no hard countdown that stresses the user unless they opt into a "timed mode").
- Optional **timed challenge mode** per category as an alternative to relaxed "study mode" — user picks a mode before starting.
- **Retry-missed-only** mode: after finishing a category, offer "Drill just the ones you got wrong" as a one-click action.
- Light **badges/achievements** (e.g. "Perfectionist", "Comeback Kid" for passing after a previous fail, "Speed Runner") stored in localStorage and shown on the Progress tab.
- Keyboard shortcuts for power users (1–4 or A–D to select an answer, Enter to continue).
- Encouraging, varied micro-copy (rotate through a small array of phrases) instead of repeating the same "Correct!" every time.

## Data persistence

- Use `localStorage` exclusively (key-namespaced, e.g. `ccaf_trainer_v1_progress`, `ccaf_trainer_v1_profile`).
- Store: user name, acknowledgment flags, per-category attempt history, per-question last result, unlocked categories, badges earned, streak data.
- Include a "Reset all progress" button (with a confirmation dialog) in Settings/About, clearly separate from normal navigation so it can't be hit by accident.

## Pages/tabs

1. **Onboarding** (name + disclaimers) — shown once, skippable on return visits.
2. **Categories** — grid/list of category cards showing lock state, progress %, and a "Start" / "Continue" / "Locked" button.
3. **Study/Quiz view** — the active question-answering screen with the progress bar, streak, and feedback.
4. **Progress/Dashboard** — overall stats, standings-style table, badges.
5. **About** — restates the local-storage warning and the CertiQ-sourced content disclaimer, plus a link/placeholder for feedback.

## Tech constraints

- Plain **HTML/CSS/JS** (vanilla, or a lightweight framework if you prefer, e.g. a single-file React app via CDN) — must build to static files with no server dependency, ready for **GitHub Pages** (root `index.html`, relative asset paths, no server-side routing).
- Fully responsive (mobile-first, since many users will study on their phone).
- No external API calls at runtime (all question data bundled locally as JSON/JS).
- Include a `README.md` explaining how to add/edit questions in the category data file and how to deploy to GitHub Pages (`Settings → Pages → deploy from branch`).

## Content sourcing note to include in the app itself

Add a small, permanent footer note on every page: "Questions compiled from publicly available sources (primarily CertiQ). Not officially affiliated with or endorsed by Anthropic."

---

Now build this end to end: generate the file structure, the category/question data schema (with a handful of realistic placeholder questions per category so the app is demoable), and the full HTML/CSS/JS implementation.
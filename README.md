# CCAF Trainer

A static, 100% client-side study app for drilling practice questions for the **CCAF (Claude Certified Architect – Foundations)** exam. No backend, no build step — just HTML/CSS/JS, ready to host on GitHub Pages.

## What's in the box

- **149 practice questions**, parsed from a CertiQ-sourced PDF dump, grouped into 5 inferred categories based on recurring content themes (these are **not** an official Anthropic syllabus — see the disclaimer in the app itself):
  1. Tool Use & Escalation
  2. Structured Data Extraction
  3. Context & Conversation Management
  4. Multi-Agent Orchestration
  5. Claude Code & Agentic Engineering
- Sequential category unlocking (100% pass on one category unlocks the next)
- Study mode, Timed Challenge mode, and Retry-missed-only drilling
- **Two-strike answers**: a wrong first pick shows why that specific choice is wrong and lets you try again before revealing the full answer. Only the first attempt counts toward streaks and the 100%-pass unlock bar — the second chance is a learning aid, not a way to game the score.
- A per-category **Key Concepts** primer (original explanatory content, not exam text) before drilling
- Distinct accent color + icon per category, all icons rendered as inline SVG (no emoji)
- An access-code gate ("CCAF") after name entry during onboarding, since this is for internal use only
- Streaks, badges, and a progress dashboard
- Everything is saved to `localStorage` — nothing leaves the browser

## File structure

```
index.html      Page shell + view containers
styles.css      Design system (dark/light theme, cards, tables, pills)
app.js          All app logic: onboarding, quiz engine, progress, badges
data.js         The question bank (see below)
question dump/  Source PDF + the parsing scripts used to build data.js
```

## Editing or adding questions

All content lives in `data.js` as a single JS constant:

```js
var CCAF_CATEGORIES = [
  {
    id: 'tools',
    name: 'Tool Use & Escalation',
    description: '...',
    color: '#FF6A2B',
    icon: 'wrench',
    order: 1,
    concepts: [
      { title: 'Designing Clear Tool Schemas', body: '...', tip: '...' }
      // ...4-6 concept cards shown in the category's "Key Concepts" primer
    ],
    questions: [
      {
        id: 'tools-16',
        question: 'Your search products tool queries an external catalog API...',
        choices: [
          'Create separate search_products and fetch_more_results tools...',
          'Implement server-side relevance ranking...',
          'Add a max_pages parameter...',
          'Return the first page with total match count and a cursor...'
        ],
        correctIndex: 3,
        explanation: 'This enables lazy loading and explicit control...',
        choiceExplanations: [
          'Why choice 0 is right/wrong...',
          'Why choice 1 is right/wrong...',
          'Why choice 2 is right/wrong...',
          'Why choice 3 is right/wrong...'
        ],
        difficulty: 'easy'
      }
      // ...
    ]
  }
  // ...more categories
];
```

`choiceExplanations` is parallel to `choices` (same order, same length) — it's what the quiz engine shows immediately after a wrong pick, before the user gets a second chance. `explanation` is shown at the end regardless of which choice(s) were tried, and should focus on why the correct answer is right.

`color` (any CSS color) and `icon` (a key from the `ICON_PATHS` map in `app.js`, e.g. `wrench`, `braces`, `chat`, `network`, `terminal`) drive that category's accent throughout the app. To use a new icon, add its SVG path data to `ICON_PATHS` in `app.js` first.

To **edit a question**: find it by `id` (or just search for a snippet of its text) in `data.js` and edit the fields directly. `correctIndex` is zero-based (0 = first choice).

To **add a question**: append an object with the same shape to a category's `questions` array, including a `choiceExplanations` entry for every choice. Give it a unique `id` (convention: `<categoryId>-<number>`).

To **add a new category**: append a new object to the `CCAF_CATEGORIES` array with a unique `id`, `name`, `description`, `color`, `icon`, the next `order` number, a `concepts` array (can be empty — the "Key Concepts" card just won't show), and a `questions` array. New categories are locked by default until the category before them is passed with a perfect run — no other code changes are needed, the app reads `CCAF_CATEGORIES` directly.

To **re-generate `data.js` from the source PDF** (if you have a new/updated dump), see the scripts in `question dump/`:
- `parse.py` extracts question/choice/answer/per-choice-explanation blocks from `question dump/full_pdfplumber.txt` into `parsed_questions.json`
- `classify_manual.py` assigns each parsed question to a category by number range, producing `final_classified.json`
- `generate_data_js.py` turns that into `data.js`, pulling in `color`/`icon` from its `CATEGORY_META` dict and `concepts` from any `learn_<categoryId>.json` file it finds (see below)

These are one-off build scripts, not part of the running app — the app only ever reads `data.js`.

### Regenerating the "Key Concepts" primers

Each category's primer cards are **not** derived from the exam dump — they're original explanatory content written separately and merged in by `generate_data_js.py`. To refresh them, produce a `learn_<categoryId>.json` file (shape: `{ "categoryId": "...", "concepts": [{ "title", "body", "tip" }, ...] }`) for each category and re-run `generate_data_js.py`. If no such file exists for a category, it's simply built with an empty `concepts` array and the "Key Concepts" card won't appear for it.

## Local progress storage

Everything is namespaced under two `localStorage` keys:

- `ccaf_trainer_v1_profile` — name, onboarding acknowledgments, theme preference
- `ccaf_trainer_v1_progress` — per-category attempts/best score/unlock state, per-question history, streaks, badges, accuracy history

There is no account system and no server. Clearing browser data, using a different browser, or switching devices resets progress. Users can also reset manually from **About → Reset all progress**.

## Access code

Onboarding requires typing the access code `CCAF` (case-insensitive) after entering a name, since this is an internal-use-only tool, not a public one. It's a soft gate, not real authentication — the code is a plain string constant (`ACCESS_CODE` near the top of `app.js`), fully visible to anyone reading the client-side source. Change that constant if you need a different code.

## Running locally

No build step. Just open `index.html` in a browser, or serve the folder with any static file server, e.g.:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploying to GitHub Pages

1. Push this folder to a GitHub repository (the repo root should contain `index.html`).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to "Deploy from a branch".
4. Choose your branch (e.g. `main`) and the `/ (root)` folder, then **Save**.
5. GitHub will publish the site at `https://<username>.github.io/<repo-name>/` within a minute or two.

Since all asset paths in `index.html` are relative (`styles.css`, `app.js`, `data.js`) and there's no server-side routing, this works out of the box on Pages' default subpath hosting.

## Content sourcing

Questions were compiled from publicly available sources (primarily CertiQ) and have not been officially verified or endorsed by Anthropic. This is an unofficial practice tool — use it for practice only.

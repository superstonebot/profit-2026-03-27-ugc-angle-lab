# UGC Angle Lab

Local-first static web app for turning a DTC product brief into a practical UGC creative plan.

## What it does

UGC Angle Lab helps a marketer go from rough brief → persona/angle choice → hooks → script outline → shot list → test matrix without needing a backend.

### Included in this MVP
- Product brief form
- Persona card selection
- Angle selection
- Hook bank generation
- Scene-by-scene script builder
- Shot list board with creator notes
- Variant test matrix across short-form channels
- KO / EN UI with browser-locale default on first load
- LocalStorage persistence
- Sample data loader
- Markdown export
- JSON export
- Favorites for hooks
- Variant compare panel
- Local history of recent generated plans

## Stack
- Plain `index.html`
- Plain `styles.css`
- Vanilla ES modules in `src/`
- Node built-in test runner for core logic in `test/`

## Project structure

```text
.
├── BUILD_BRIEF.md
├── README.md
├── RESULT.md
├── index.html
├── styles.css
├── src/
│   ├── core.mjs
│   └── main.mjs
├── test/
│   └── core.test.mjs
└── docs/
    └── superpowers/
        └── plans/
            └── 2026-03-26-ugc-angle-lab.md
```

## Run locally

Because this is a static app, you can open `index.html` directly, but a tiny local server is better for module loading consistency.

### Option 1: Python
```bash
python3 -m http.server 43173
```
Then open:
```text
http://127.0.0.1:43173/
```

### Option 2: Any static server
Serve this folder with any static hosting tool and open the root URL.

## Verification

Run the core tests:
```bash
node --test test/core.test.mjs
```

Syntax-check the browser modules:
```bash
node --check src/main.mjs && node --check src/core.mjs
```

A record of the exact commands/results used during implementation is in `RESULT.md`.

## How to use
1. Enter the product brief.
2. Pick a persona.
3. Pick an angle.
4. Click **Generate plan**.
5. Review the hook bank, script, shot list, and test matrix.
6. Favorite promising hooks.
7. Pick up to two matrix variants to compare.
8. Export as Markdown or JSON.
9. Re-open previous generations from the local history panel.

## Persistence model
- App state is stored in browser `localStorage`
- Language preference is remembered after first load
- Current brief, generated plan, favorites, compare selection, and recent history are stored locally
- No backend or external database is required

## Deploy to Vercel
This project is already in a Vercel-friendly static format.

### Simplest path
- Create a new Vercel project
- Point it at this folder
- Use the default static deployment behavior

No serverless functions or environment variables are required.

## Notes / limitations
- Generation is deterministic template-based logic, not AI-backed generation
- History is intentionally local-only and limited to recent items
- Export downloads the currently visible plan only

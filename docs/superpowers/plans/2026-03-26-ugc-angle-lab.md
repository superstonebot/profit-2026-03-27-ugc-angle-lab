# UGC Angle Lab Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished local-first static web app for generating UGC creative plans from a product brief, with ko/en localization, persistence, export, and variant comparison.

**Architecture:** Use a static HTML/CSS/JS app with a pure `src/core.mjs` module for generation logic and export formatting, plus a browser `src/main.js` controller for rendering, localStorage persistence, and interactions. Keep core logic testable with Node's built-in test runner, while the UI remains deployable on Vercel as plain static files.

**Tech Stack:** HTML, CSS, vanilla JavaScript (ES modules), Node `--test`

---

## File map
- `index.html` — app shell and semantic sections
- `styles.css` — editorial visual system and responsive layout
- `src/core.mjs` — pure planning/generation/i18n/export helpers
- `src/main.js` — browser app state, rendering, persistence, interactions
- `test/core.test.mjs` — repeatable verification for core logic
- `README.md` — run, test, deploy, feature overview
- `RESULT.md` — executed verification commands with exact results

## Execution notes
1. Write failing tests for language detection, generation pipeline, markdown export, and compare/favorites helpers.
2. Implement `src/core.mjs` minimally until tests pass.
3. Build the UI shell in `index.html` and `styles.css`.
4. Implement `src/main.js` for state, persistence, localization, sample data, export, history/favorites/compare, and rendering.
5. Run verification (`node --test`, syntax checks, static serve smoke test) and record results in `RESULT.md`.
6. Finish `README.md`.

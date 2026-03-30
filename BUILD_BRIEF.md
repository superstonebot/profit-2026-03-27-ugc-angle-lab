# UGC Angle Lab MVP Brief

## Product
UGC Angle Lab — hook, persona, script, and shot-planning studio for DTC ad teams.

## Goal
Build a deployable local-first web MVP that lets marketers turn a product brief into a usable creative plan before paying for full UGC production.

## Must-have features
- Product brief form (product, offer, audience, pain, objections, proof points, CTA)
- Persona cards and angle selection
- Hook generator / hook bank
- Script builder with scene-by-scene outline
- Shot list board with creator notes
- Test matrix for variants and channels
- Save/load via localStorage
- Sample data button
- Export full plan as Markdown or JSON
- Clean editorial creative UI

## Required product touches
- Korean / English support (ko/en)
- Default language chosen from browser locale on first load
- Small KO / EN toggle in the top area for manual switching
- Include at least one planning utility beyond the core generator (history, favorites, or variant compare)

## Constraints
- No backend required
- Prefer static HTML/CSS/JS deployable on Vercel
- Include README with run/deploy notes
- Keep all changes inside this folder only

## Verification target
- The app should support: first visit → enter product brief → generate hooks/script/shot plan → compare variants → export.
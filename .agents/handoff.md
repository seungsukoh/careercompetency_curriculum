# Development Handoff

Date: 2026-06-25
Workspace: `C:\workspace\careercompetency_curriculum`
Branch: `main` tracking `origin/main`

## Goal

Build a free pilot web app for Korean mechanical/electrical engineering students to choose a job track, run a competency self-check, view a 4-week roadmap, save learning resources, and copy pilot results.

## Current Implementation

- The app is a Vite-built static PWA intended for Cloudflare Pages.
- Main files:
  - `package.json`: Vite scripts and dev dependency.
  - `vite.config.js`: Vite build output configuration.
  - `index.html`: app shell, profile filters, tabs, views.
  - `styles.css`: mobile-first responsive UI.
  - `app.js`: seed data, localStorage state, rendering, diagnostics, saved/completed resources, PWA install prompt.
  - `public/manifest.webmanifest`: PWA manifest.
  - `public/sw.js`: static asset cache service worker.
  - `public/assets/icon.svg`: SVG app icon.
  - `docs/FREE_PILOT_PLAYBOOK.md`: free pilot operating plan.
  - `PROJECT_PLAN.md`: product and implementation plan.
  - `docs/PROJECT_SYNC.md`: shared source-of-truth files and synchronization rules.
  - `docs/QA_RESULTS_2026-06-25.md`: latest QA result and remaining deployment/pilot work.

## Git State Observed

- Remote is configured as `https://github.com/seungsukoh/careercompetency_curriculum.git`.
- Branch `main` tracks `origin/main`.
- Latest pushed commit observed before current local edits: `9255e2b Update QA readiness docs`.
- `git log --oneline "@{u}.."` returned no unpushed commits.
- Cloudflare Pages failed on commit `051c8cb` because that deployed commit did not contain `package.json`, while Cloudflare was configured to run `npm run build`.
- The deployment fix is to push the local Vite migration:
  - `package.json`, `package-lock.json`, `vite.config.js`, `.gitignore`
  - `public/manifest.webmanifest`, `public/sw.js`, `public/assets/icon.svg`
  - root `manifest.webmanifest`, `sw.js`, and `assets/icon.svg` removed
  - docs updated for Vite build command `npm run build` and output directory `dist`

## Product Scope Implemented

- Five role tracks:
  - Mechanical design/CAE
  - Production/process/quality
  - Semiconductor process/equipment
  - Electronics/PCB/hardware
  - Embedded/control
- Profile filters by major, year, and industry.
- Track detail cards with tasks, skills, tools, outputs, misconceptions.
- Competency checklist per selected track with percent score and gap list.
- 4-week roadmap per selected track.
- Resource library filtered by selected track and difficulty.
- Seed resources now include 18 resources; every track has at least 4 Korean-accessible resources.
- Save and complete resource actions persisted in localStorage.
- Resource list now sorts Korean-accessible resources before English resources, then by learning sequence.
- Resource cards now show quality status and checked date.
- Pilot summary copy button.
- PWA install prompt and service worker registration.

## Product Direction Decisions

- The immediate MVP is narrowed to a self-study resource finder, not a full instructor/admin platform.
- Primary use case: a student chooses a role track and receives pre-curated Korean-accessible resources arranged in a sensible learning order with estimated time, prerequisites, and expected outputs.
- Instructor support is deferred, but student result summaries should remain useful for future advising conversations.
- Product strategy review is documented in `docs/PRODUCT_STRATEGY_REVIEW.md`.
- PM execution plan is documented in `docs/PM_ACTION_PLAN.md`.
- Shared planning/progress synchronization rules are documented in `docs/PROJECT_SYNC.md`.
- Parallel workstream structure is documented in `docs/WORKSTREAMS.md`.
- Architecture and maintainability decisions are documented in `docs/ARCHITECTURE_DECISIONS.md`.
- Requirement-based validation criteria are documented in `docs/REQUIREMENTS_VALIDATION_CRITERIA.md`.
- QA should use `docs/QA_CHECKLIST.md` and record pass/fail by requirement ID.
- Latest QA is documented in `docs/QA_RESULTS_2026-06-25.md`; R1-R6, R8-R11, R13, R14 passed and R15 is ready for pilot measurement.
- Start with Korean-accessible resources first, then expand to English/global resources after the pilot validates the curriculum flow.
- Resource cards should eventually include estimated learning time.
- Resource search and ranking should use engagement signals such as YouTube views, comments, likes, channel credibility, and playlist structure as triage signals, while still checking officialness, freshness, fit, and expected output.
- Resource curation rules are documented in `docs/RESOURCE_CURATION_POLICY.md`.
- Keep curation low-ops: small stable Korean resource bundles per track, monthly/semester review cadence, user feedback for broken/outdated resources, and later automation for link/engagement checks.
- Curriculum generation should support both short focused plans and longer broad plans based on student context:
  - short plans: 1-2 weeks for urgent narrowing or interview prep
  - standard pilot plans: 4 weeks
  - longer plans: 8-12 weeks or semester-scale progression
- Student context should influence scope:
  - target role track
  - current competency checklist gaps
  - available hours per week
  - deadline or preparation horizon
  - preferred output, such as report, GitHub project, circuit review, CAD/CAE report, or analysis note

## Important Constraints

- Keep the MVP static and backend-free. Vite is allowed as the build tool.
- Prefer Cloudflare Pages deployment assumptions:
  - Framework preset: Vite
  - Build command: `npm run build`
  - Output directory: `dist`
- Do not add backend/auth/database for the pilot unless required.
- User-facing content is Korean.
- If a new session starts and finds local changes or unpushed commits, create/push a savepoint before continuing when possible.
- If token limits, tool problems, or restart risk appear, update this handoff, commit a savepoint, and push to the current upstream branch before stopping when possible.

## Suggested Next Steps

1. Commit and push the Vite deployment fix if it has not already been pushed.
2. Retry Cloudflare Pages with Framework preset `Vite`, Build command `npm run build`, and Output directory `dist`.
3. Run a short smoke test on the deployed URL.
4. Start the 5-student pilot and record R15 outcome metrics.
5. If YouTube resources are added later, record R7 views/comments/channel-trust signals before treating them as reviewed.

## Useful Commands

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite.

```powershell
git status --short
```

Use this handoff first in future long sessions to avoid re-reading the full plan.

Also read `.agents/CONTINUATION.md` after this file when resuming after token limits.

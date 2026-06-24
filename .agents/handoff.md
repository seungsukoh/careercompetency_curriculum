# Development Handoff

Date: 2026-06-24
Workspace: `C:\workspace\careercompetency_curriculum`
Branch: `main` tracking `origin/main`

## Goal

Build a free pilot web app for Korean mechanical/electrical engineering students to choose a job track, run a competency self-check, view a 4-week roadmap, save learning resources, and copy pilot results.

## Current Implementation

- The app is a dependency-free static PWA intended for Cloudflare Pages.
- Main files:
  - `index.html`: app shell, profile filters, tabs, views.
  - `styles.css`: mobile-first responsive UI.
  - `app.js`: seed data, localStorage state, rendering, diagnostics, saved/completed resources, PWA install prompt.
  - `manifest.webmanifest`: PWA manifest.
  - `sw.js`: static asset cache service worker.
  - `assets/icon.svg`: SVG app icon.
  - `docs/FREE_PILOT_PLAYBOOK.md`: free pilot operating plan.
  - `PROJECT_PLAN.md`: product and implementation plan.

## Git State Observed

- `PROJECT_PLAN.md` is modified from the initial commit.
- These files/directories are currently untracked: `README.md`, `app.js`, `assets/`, `docs/`, `index.html`, `manifest.webmanifest`, `styles.css`, `sw.js`.
- Remote is configured as `https://github.com/seungsukoh/careercompetency_curriculum.git`.
- Last commit: `0f0b24f Add project planning document`.

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
- Save and complete resource actions persisted in localStorage.
- Pilot summary copy button.
- PWA install prompt and service worker registration.

## Product Direction Decisions

- The immediate MVP is narrowed to a self-study resource finder, not a full instructor/admin platform.
- Primary use case: a student chooses a role track and receives pre-curated Korean-accessible resources arranged in a sensible learning order with estimated time, prerequisites, and expected outputs.
- Instructor support is deferred, but student result summaries should remain useful for future advising conversations.
- Product strategy review is documented in `docs/PRODUCT_STRATEGY_REVIEW.md`.
- PM execution plan is documented in `docs/PM_ACTION_PLAN.md`.
- Parallel workstream structure is documented in `docs/WORKSTREAMS.md`.
- Architecture and maintainability decisions are documented in `docs/ARCHITECTURE_DECISIONS.md`.
- Requirement-based validation criteria are documented in `docs/REQUIREMENTS_VALIDATION_CRITERIA.md`.
- QA should use `docs/QA_CHECKLIST.md` and record pass/fail by requirement ID.
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

- Keep the MVP static and dependency-free unless the user explicitly changes direction.
- Prefer Cloudflare Pages deployment assumptions:
  - Framework preset: None
  - Build command: blank
  - Output directory: `.`
- Do not add backend/auth/database for the pilot unless required.
- User-facing content is Korean.
- If a new session starts and finds local changes or unpushed commits, create/push a savepoint before continuing when possible.
- If token limits, tool problems, or restart risk appear, update this handoff, commit a savepoint, and push to the current upstream branch before stopping when possible.

## Suggested Next Steps

1. Use `docs/REQUIREMENTS_VALIDATION_CRITERIA.md` as the source of truth before adding features.
2. Run QA with `docs/QA_CHECKLIST.md` and mark pass/fail by requirement ID.
3. Fix only P0 validation failures before adding P1/P2 features.
4. Finish verifying the updated resource card UI and manual completion checks.
5. Verify responsive layout on desktop and mobile widths.
6. After verification, stage and commit the static PWA files.

## Useful Commands

```powershell
python -m http.server 8787
```

Open `http://localhost:8787`.

```powershell
git status --short
```

Use this handoff first in future long sessions to avoid re-reading the full plan.

Also read `.agents/CONTINUATION.md` after this file when resuming after token limits.

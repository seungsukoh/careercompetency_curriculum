# Continuation Protocol

Use this file when a session is interrupted by token limits or context loss.

## Next Session Start Prompt

Ask the next agent:

```text
Read .agents/handoff.md and .agents/CONTINUATION.md first.
Read docs/PROJECT_SYNC.md before splitting workstreams or changing shared planning/progress files.
Then run git status --short.
If there are local changes or unpushed commits, create/push a savepoint before continuing.
Continue from the current next steps without re-reading the whole project plan unless needed.
Before editing, summarize what you will change.
After meaningful progress, update .agents/handoff.md.
If the session is about to restart, hits a persistent problem, or needs a handoff, create a git savepoint commit and push it before stopping when possible.
```

## Recovery Order

1. Read `.agents/handoff.md`.
2. Read this file.
3. Read `docs/PROJECT_SYNC.md`.
4. Run `git status --short`.
5. Check whether there are unpushed commits:

```powershell
git log --oneline @{u}..
```

6. If there are local changes or unpushed commits, create/push a savepoint before new work when possible.
7. If the worktree changed, inspect only the changed files relevant to the task.
8. Avoid reading `PROJECT_PLAN.md` end-to-end unless the task specifically needs planning context.
9. Continue from the smallest concrete next step.
10. Before ending a long session, update `.agents/handoff.md` with:
   - current goal
   - files changed
   - decisions made
   - tests or checks run
   - next 1-3 actions
11. If there is any risk of interruption or restart, create and push a savepoint commit.

## Git Savepoint Rule

When a new session starts, or when token limits, tool problems, environment problems, or restart risk appear:

1. Run `git status --short`.
2. Run `git log --oneline @{u}..` to detect local commits that have not been pushed.
3. If there are uncommitted changes, inspect the changed paths enough to avoid staging unrelated user work.
4. Update `.agents/handoff.md` with the latest status.
5. Stage the relevant work.
6. Commit with a savepoint-style message, for example:

```powershell
git commit -m "Save pilot PWA progress"
```

7. Push to the current upstream branch:

```powershell
git push
```

If a push is impossible because of network/authentication restrictions, record that failure in `.agents/handoff.md` and tell the user.

## Token Discipline

- Prefer targeted file reads over whole-repository scans.
- Start with file list, git status, and changed files.
- Keep implementation notes in `.agents/handoff.md` instead of relying on chat history.
- If a file is large, inspect headings, function names, or relevant sections first.
- Do not paste full source files into chat unless the user asks.
- Prefer pushing a small savepoint over leaving uncommitted work when a restart is likely.

## Current Default Next Step

The technical P0 gate is currently passing in `docs/QA_RESULTS_2026-06-25.md`:

- R6 now passes: every track has at least 4 Korean-accessible resources.
- Desktop/mobile browser QA passed on local `http://localhost:8787`.
- Seed external URLs returned HTTP 200.
- Current seed has no YouTube resources, so R7 views/comments checks are only needed if YouTube candidates are added later.

Next concrete steps:

1. Create and push a savepoint commit.
2. Prepare or verify the Cloudflare Pages deployment URL.
3. Smoke test the deployed URL.
4. Start the 5-student pilot and record R15 outcome metrics.

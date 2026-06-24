# Continuation Protocol

Use this file when a session is interrupted by token limits or context loss.

## Next Session Start Prompt

Ask the next agent:

```text
Read .agents/handoff.md and .agents/CONTINUATION.md first.
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
3. Run `git status --short`.
4. Check whether there are unpushed commits:

```powershell
git log --oneline @{u}..
```

5. If there are local changes or unpushed commits, create/push a savepoint before new work when possible.
6. If the worktree changed, inspect only the changed files relevant to the task.
7. Avoid reading `PROJECT_PLAN.md` end-to-end unless the task specifically needs planning context.
8. Continue from the smallest concrete next step.
9. Before ending a long session, update `.agents/handoff.md` with:
   - current goal
   - files changed
   - decisions made
   - tests or checks run
   - next 1-3 actions
10. If there is any risk of interruption or restart, create and push a savepoint commit.

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

Run and inspect the static PWA locally:

```powershell
python -m http.server 8787
```

Then open `http://localhost:8787` and verify:

- track selection and filters
- diagnostics score and gap list
- roadmap rendering
- resource save/complete flow
- pilot summary copy behavior
- desktop and mobile layout

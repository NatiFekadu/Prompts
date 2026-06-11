# Workflows — How To

How to run, watch, and build multi-agent **workflows** in this repo — and how to use the reusable **`trim-prompt`** workflow to safely shorten any client prompt.

---

## 1. What a workflow is

A workflow is a small JavaScript script that orchestrates many Claude subagents in a controlled way — fan them out in parallel, pipe results through stages, loop, verify, then return structured data. It's how we do work that's too big or too important for one pass: auditing a prompt from several angles at once, generating + judging multiple options, or sweeping a whole folder.

You don't run workflows yourself — **you ask Claude to**, and Claude calls its `Workflow` tool. The one rule to remember:

> **Include the word "workflow" in your message to opt in.** Claude only spins up multi-agent runs when you ask for them (they spawn many agents and use a lot of tokens). Example: *"Run the trim workflow on Kim's prompt."*

---

## 2. The `trim-prompt` workflow

Lives at [.claude/workflows/trim-prompt.js](.claude/workflows/trim-prompt.js). It finds **safe, behavior-preserving trims** in any voice/chat agent prompt. It never edits the file itself — it returns a vetted list of cuts, and Claude applies the approved ones.

### How it works (3 phases)

1. **Discover** — one agent reads the prompt and splits it into 5–9 logical sections (works on XML or markdown prompts).
2. **Scan** — one agent per section, in parallel, proposes condensations. Each proposal is an exact quote + a shorter replacement.
3. **Verify** — an adversarial reviewer checks every proposal and **defaults to rejecting** it. A cut survives only if it loses zero behavior, doesn't weaken a protected rule, and genuinely saves length.

### What it protects (never trims)

Date/time logic, qualifying questions, ✓/✗ examples, SMS & email template bodies, tool-call formats (EventNotifier / ForwardCall / calendar), notification numbers, hours/fees/address/staff, the Ultravox pronunciation block, scope-lock & politeness rules, and any `TEMPORARY`/`OVERRIDE` block.

### How to run it

Just ask Claude, naming the file:

> *"Run the **trim-prompt** workflow on `J Haskins Law/PromptJ.md`."*

Claude invokes:
```
Workflow({ name: "trim-prompt", args: { file: "/Users/nati/Documents/Prompts/J Haskins Law/PromptJ.md" } })
```

### Options (args)

| arg | required | values | effect |
|-----|----------|--------|--------|
| `file` | **yes** | absolute path | the prompt to trim |
| `aggressiveness` | no | `light` (default) / `medium` | `light` = only safe, length-saving cuts. `medium` = also consolidate genuinely duplicated rules. |
| `protect` | no | free text | extra client-specific things to never touch, e.g. *"keep the entire Spanish greeting verbatim"* |

> *"Run trim-prompt on Mo's prompt, medium aggressiveness, and protect the calendar booking section."*

### What you get back

Two lists: **safe** (vetted cuts — exact quote, replacement, chars saved, why it's safe) and **rejected** (with the reason each was thrown out). Claude then applies the safe ones with exact string replacements. Always keep a backup of the file first (see below).

---

## 3. Watching and iterating

When a workflow launches you'll see output like this:

```
Workflow launched in background. Task ID: wh6i6m2gj
Script file: …/workflows/scripts/trim-prompt-wf_8cb….js
Run ID: wf_8cb922fe-0aa
```

- **Task ID** — the background job handle.
- **Script file** — the exact script that ran, saved to disk. *This is the file you edit to change behavior.*
- **Run ID** — used to *resume* a run with cached results.

**Watch live:** run `/workflows` in the terminal to see the progress tree (which agents are running / done).

**Edit and re-run:** open the script file, change it, then tell Claude *"re-run that workflow script."* Claude re-invokes with `{ scriptPath: "…that file…" }` — no need to resend the whole script.

**Resume cheaply:** if you only changed a later stage, resuming replays the unchanged earlier agents instantly (no token cost) and only re-runs from your edit forward:
```
Workflow({ scriptPath: "…", resumeFromRunId: "wf_8cb922fe-0aa" })
```
Same script + same args = 100% cache hit. This is what makes testing iterations fast and cheap.

---

## 4. Testing a workflow before a full run

- **Start small.** Point the scanner at one section or set a low fan-out, confirm the logic and the JSON schema validate, then widen.
- **Check the structured output.** Each agent returns data matching a schema; if a field is missing the agent is forced to retry, so malformed output usually means the schema or prompt needs tightening.
- **Read a subagent transcript.** The launch output prints a transcript dir containing `agent-*.jsonl` — open one to see exactly what a given subagent did.
- **Iterate with resume**, not fresh runs, so you only pay for the part you changed.

---

## 5. Where things live

| Path | What |
|------|------|
| [.claude/workflows/](.claude/workflows/) | Saved, reusable **named** workflows (invoke by `name`). Shared with anyone on the repo. |
| `…/<session>/workflows/scripts/*.js` | Auto-saved script of every run (even ad-hoc ones), for editing/resuming. |
| `…/<session>/subagents/workflows/…` | Per-agent transcripts of a run. |

---

## 6. Building your own

Save a `.js` file in [.claude/workflows/](.claude/workflows/) and it becomes a named workflow. Minimum shape:

```js
export const meta = {
  name: 'my-workflow',
  description: 'one line shown in the run dialog',
  phases: [{ title: 'Find' }, { title: 'Check' }],
}

// args is whatever you passed in: { file: "…" }
const items = ['a', 'b', 'c']

phase('Find')
const found = await parallel(items.map(x => () =>
  agent(`do something with ${x}`, { schema: MY_SCHEMA })
))

return { found }
```

Key building blocks:
- `agent(prompt, { schema, label, phase })` — spawn one subagent. With a `schema` it returns validated JSON; without, it returns text.
- `parallel([...thunks])` — run many at once, wait for all (a barrier).
- `pipeline(items, stage1, stage2)` — stream each item through stages with no barrier between them (the usual default for multi-stage work).
- `phase('Name')` / `log('msg')` — progress display.
- `args` — the input object you pass in. Use it to parameterize (like `args.file` in `trim-prompt`).

The easiest way to make a new one: ask Claude to *"write a workflow that …"*, run it once, then refine the saved script.

---

## 7. Safety habits

- **Back up before applying trims:** `cp "Client/Prompt.md" "Client/Prompt (backup).md"`.
- Review the `rejected` list too — it often explains *why* a tempting cut is unsafe.
- Re-read the prompt end-to-end after a trim pass; workflows propose, but you own the final prompt.

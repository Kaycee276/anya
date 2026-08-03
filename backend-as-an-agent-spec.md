# Backend-as-an-Agent — Project Specification

## 1. Overview

**Backend-as-an-Agent** is a platform where a developer connects a frontend GitHub repository, and an AI agent automatically generates and continuously maintains a complete backend for that frontend — schema, API endpoints, and database guardrails — without the developer writing backend code.

The agent operates **entirely at build time** (triggered by repo events), not at runtime. It does not sit in the live request path. Once generated, the backend runs as normal, deterministic server code. This is a deliberate architectural choice: it keeps live requests fast, predictable, and debuggable, while still delivering on the "no backend code" promise for the developer.

**One-line positioning:** Not a BaaS (Firebase/Supabase give you primitives, you still design and wire everything) and not an in-IDE coding assistant (Cursor/Windsurf still need a human driving). This is a standing, autonomous backend engineer tied to your repo.

---

## 2. Target Users

1. **Hackathon builders** — fastest, most forgiving early adopters; need speed over long-term reliability guarantees. Likely first acquisition target.
2. **Solo developers** — building full products without a backend engineer.
3. **Non-technical founders** — can direct product requirements but cannot write or review backend code themselves.

---

## 3. Core Architecture

### 3.1 High-Level Flow

1. Developer connects their GitHub account and selects a frontend repo.
2. Agent performs an **initial full generation**: reads the entire repo, infers data models, API needs, and generates a complete backend (schema, endpoints, DB guardrails).
3. Generated backend is stored on the platform, associated with that repo.
4. On subsequent pushes to the repo, the agent performs an **incremental update**: diffs the new changes against what it already knows, and adds/edits/removes backend code and schema as needed.
5. All agent actions are logged. The developer can review and **reject/approve** proposed backend changes before they go live (similar to reviewing a PR).

### 3.2 Two Distinct Agent Roles (Important Distinction)

- **Build-time agent (this is the entire product surface):** Reads repo/diffs, infers intent, generates/updates backend code, schema, and guardrail configuration. Runs asynchronously on repo events. Output is reviewable before going live.
- **No runtime agent.** There is no live-request-time inference. Once generated, backend code runs as normal deterministic server code with normal latency characteristics. This was an earlier design direction that was explicitly rejected in favor of the current model — do not reintroduce live LLM inference into the request path.

### 3.3 Request Handling at Runtime (Post-Generation)

Since the agent only operates at build time, all live traffic is handled by generated, deterministic code:
- Standard/latency-sensitive endpoints run as normal generated backend code.
- There is no "pass-through to an agent" at request time in the current design. (Note: an earlier iteration considered routing some live requests through the agent with fixed code handling others — this was superseded by the fully build-time model. If reintroduced later, treat it as a separate, higher-risk feature requiring its own latency/consistency review.)

---

## 4. Agent Generation Behavior

### 4.1 Initial Generation

- Triggered once, when a repo is first connected.
- Agent reads the full frontend codebase.
- Produces: data schema, API endpoints, DB guardrails/validation rules, following a fixed set of **"backend principles"** embedded in the agent's configuration (see Section 6).
- Not subject to the daily generation cap (see Section 8).

### 4.2 Incremental Updates

- Triggered on subsequent pushes to the connected repo.
- Agent computes the **diff** between the current repo state and the last state it processed.
- Determines what backend elements need to be added, edited, or removed based on the diff.
- Only touches what's affected by the diff — not a full regeneration.
- **Subject to the daily generation cap on free tier** (see Section 8).

### 4.3 Developer Intent via Code Comments

To reduce misinterpretation, developers can leave comments in their frontend code that the agent reads as explicit instructions/context (e.g., marking a field as required, sensitive, or related to another entity).

**Comment read/re-read rule:**
- The agent reads a comment the **first time it appears** and uses it to inform generation.
- On subsequent pushes, if that comment's line **has not changed** (i.e., it does not appear in the diff), the agent **does not re-read or re-process it**.
- If the comment's line **does change**, it naturally appears in the diff, and the agent reads it again as new input.
- This requires no separate tracking mechanism — git diff itself is the signal for "has this instruction changed." Do not implement a separate "seen/unseen" flag system; rely on diff presence.

**Open design questions to resolve during implementation:**
- Freeform NLP-parsed comments vs. a lightweight structured convention (e.g. a tag like `@backend` or `@agent-note` to signal "this comment is meant for the agent" vs. an ordinary code comment). A structured convention is recommended for reliability.
- Whether the agent should proactively flag ambiguous fields with no comment at all (e.g., surfacing a question like "no note on this field — is it required?") as part of its generated diff/PR output. This could be a meaningful differentiator, especially for non-technical founders.
- Known limitation: if a developer edits code near a comment without updating the comment itself, the comment's stated intent may no longer match reality. The diff-based re-read rule does not fully solve this — flag it as an accepted limitation rather than something the system claims to guarantee.

### 4.4 Backend Principles (Agent Configuration)

The agent generates backend logic according to a defined, structured set of **"backend principles"** — not an ad hoc/freeform system prompt. These principles govern things like:
- Default schema conventions (naming, typing, relations)
- When to require auth/ownership checks
- When to index fields
- How to handle inferred sensitive data (e.g., PII)

**Design intent:** these principles should be inspectable and versionable — not just a vibe-y prompt — so they can be shown to technical evaluators/users to build trust ("here's why the agent added an index here, required auth there").

---

## 5. Validation & Guardrails

This is a critical security boundary. Two things must remain architecturally separate:

1. **Backend logic** (schema, endpoints, business rules) — generated by the agent. Reviewable via the approval flow. Mistakes here are visible and fixable.
2. **The guardrail/validation *enforcement engine*** — the actual mechanism that checks queries before they hit the DB, enforces access control, and prevents injection. **This must be a fixed, platform-controlled system, not something the agent generates or rewrites per project.**

**Rule:** The agent may produce **declarative rules/configuration** for the validation engine (e.g., "field X is required," "field Y must belong to the authenticated user," "this field is PII, encrypt at rest") — but it must never generate or modify the enforcement mechanism itself. The agent configures the guardrails; it does not write the guardrail engine. This avoids the failure mode of the agent grading its own homework — i.e., the same generation pass being both the author of data-touching logic and the author of the rules meant to catch its own mistakes.

There is also a separate validation layer for **incoming requests from the frontend** before they reach the agent/generated backend logic at all (basic shape/type validation), independent of the DB-query guardrails above.

---

## 6. Approval / Review Flow

- Every agent-proposed change (initial generation or incremental update) is logged.
- The developer can review and **reject specific actions/changes** before they go live — conceptually similar to reviewing a pull request.
- **Important scope clarification:** Approval applies to **code/schema changes** (asynchronous, developer-facing), not to individual live end-user requests. There is no scenario where an end user of the deployed frontend is blocked waiting on developer approval — approval is strictly a build-time gate for the developer reviewing what the agent generated/changed.
- Recommended: surface changes as a diff (similar to a PR view) so the developer can see exactly what was added/removed/edited in schema, endpoints, and guardrail config, rather than reviewing raw generated code from scratch.

**Open question to resolve during implementation:** how are breaking changes handled — e.g., a field that used to be optional becomes required based on a new diff. Recommend the agent explicitly flags this class of change rather than silently altering behavior, since it can break existing data/clients.

---

## 7. Business Model — Freemium

### 7.1 Generation Cap

- Free tier: **maximum 3 incremental generations per day** per repo.
- This cap applies to **incremental diff-based updates on an already-onboarded repo** — not to the one-time initial full generation when a repo is first connected.
- **Recommended mechanism: batching, not hard blocking.** A developer can push to their repo any number of times in a day; unprocessed diffs accumulate. When the developer is ready to sync (or on some trigger), all accumulated diffs since the last generation are processed in a single agent run — this "spends" one of the 3 daily generations rather than each individual push consuming one. This avoids penalizing active build sessions (e.g., hackathon sprints with many small commits) while still controlling compute cost.
- **Design goal to protect:** the free tier must remain usable during a developer's most active build session (e.g., a hackathon day), since that's when the product's value is most obvious and the conversion moment matters most. Avoid designs where the cap causes the free tier to fail exactly when engagement is highest.
- **Unresolved implementation question:** what happens when a developer wants to trigger a 4th sync in one day on the free tier — hard block, queue until next day, or soft prompt to upgrade? This is a monetization touchpoint and should be designed deliberately, not left as a generic error.

### 7.2 Upgrade Path

- More frequent syncs / higher generation cap
- More compute / faster turnaround
- Team or multi-repo support

(Pricing tiers and exact numbers beyond the 3/day free cap are not yet finalized — treat as configurable.)

---

## 8. Differentiation Summary

| | This product | Firebase/Supabase (BaaS) | Cursor/Windsurf (AI IDE assistant) |
|---|---|---|---|
| What you get | Full backend generated + continuously maintained from your repo | Storage/auth primitives you still design and wire yourself | AI assistance while a human drives the coding |
| Ongoing behavior | Autonomous, repo-triggered, self-updating | Static primitives, no autonomous evolution | Requires active human prompting each time |
| Human role | Reviews/approves generated changes | Designs and implements everything | Writes code with AI suggestions |

---

## 9. Explicitly Rejected / Superseded Design Directions

For clarity, to avoid the coding agent reintroducing earlier discarded approaches:

- ❌ **Live runtime agent handling requests directly** (early version of the idea) — rejected due to latency, non-determinism, and data-integrity risk. The current model is build-time-only generation.
- ❌ **Agent generating the validation/guardrail *engine* itself** — rejected due to the "agent grading its own homework" risk. The engine must be fixed/platform-controlled; the agent only supplies declarative configuration to it.
- ❌ **"Read comment once, then ignore forever"** — rejected because it permanently ignores legitimate updates to developer intent. Replaced with: re-read only when the comment's line appears in a diff (i.e., has changed since last read).

---

## 10. Summary of Confirmed Design Decisions

- Agent is build-time only; no live-request inference.
- Initial generation: full repo read, one-time, not capped.
- Incremental generation: diff-based, capped at 3/day on free tier, recommended to batch multiple pushes into one generation run.
- Developer connects via GitHub, selects repo.
- All agent actions logged; developer can reject/approve changes before they go live; approval gate applies to code/schema changes, not live end-user requests.
- Developer can leave comments in frontend code as explicit instructions to the agent; re-read only when changed (via diff), not on a fixed schedule or one-time-only basis.
- Backend logic is agent-generated and reviewable; DB guardrail *enforcement engine* is fixed and platform-controlled, agent only configures it declaratively.
- Separate validation layer checks incoming frontend requests before reaching backend logic.
- Target users, in likely acquisition order: hackathon builders → solo developers → non-technical founders.

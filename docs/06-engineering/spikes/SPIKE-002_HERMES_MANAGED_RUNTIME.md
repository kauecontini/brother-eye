# Spike 002 — Hermes Managed Agent Runtime

Status:
PASS

Date:
2026-09-07

## Question

Can Brother Eye own and administer a pinned Hermes Agent Runtime, isolated from the user's global Hermes install/config, using only the public `hermes serve` + TUI Gateway surface — including install, version pin, start, readiness, health, WebSocket sessions, fail-closed tool restriction, clean shutdown, and restart without reinstall?

This spike does **not** implement the Tutor, Assessor, Brother Eye MCP, Cua, Burp, or a production process supervisor.

## Hermes Release

Official stable pin used for this spike (no silent retarget):

| Field | Value |
| --- | --- |
| Release | Hermes Agent v0.21.0 |
| Tag | `v2026.8.31` |
| Source | `https://github.com/NousResearch/hermes-agent.git` |
| Checkout commit | `29112bef099274229cadff79cdff7bf7b99c4b77` (`chore: release v0.21.0 (2026.8.31)`) |
| `git describe` | `v2026.8.31` |
| Integration surface | `hermes serve` |
| Transport | TUI Gateway WebSocket JSON-RPC (`/api/ws`) |

Tracked manifest: `runtimes/hermes/runtime.json`.

Preflight checked the official NousResearch/hermes-agent releases. No newer stable release than `v0.21.0` / `v2026.8.31` was used. `main` was not used as the runtime.

The managed checkout working tree is **not** fully clean on Windows because of a case-fold collision in `contributors/emails/agent@Agents-Mac-mini.local` vs `agent@agents-Mac-mini.local`. Brother Eye did not edit that file. Commit and tag remain the pin above. `hermes update` was never run.

## Environment

- OS: Microsoft Windows 11 Pro, 64-bit, 10.0.26200
- Arch: x86_64
- Node: 22.x (native `WebSocket`; no extra probe dependency)
- uv: `C:\Users\kauec\AppData\Roaming\Python\Python312\Scripts\uv.exe` **0.12.10**
- Hermes Python: `.runtime/hermes-agent/.venv` — CPython **3.12.10** (`...\Scripts\python.exe`)
- Managed executable: `.runtime/hermes-agent/.venv/Scripts/hermes.exe`
- Brother Eye Core venv was **not** reused
- User already has a global Hermes Desktop install under `%LOCALAPPDATA%\hermes` and `~\.hermes`. That install was left running and was not used as the spike runtime.

## Managed Installation

First install (not repeated on restart):

```text
git clone --depth 1 --branch v2026.8.31 https://github.com/NousResearch/hermes-agent.git .runtime/hermes-agent
cd .runtime/hermes-agent
uv sync --extra web --python 3.12
```

Rationale: pinned `pyproject.toml` documents that `hermes serve` / dashboard backend needs the `web` extra (`fastapi`, `uvicorn`, `starlette`, `python-multipart`). Messaging, computer-use, and `cua-driver` extras were not installed.

Hermes is **not** a git submodule, subtree, or vendored tree. `.runtime/` is gitignored.

`hermes --version` from the managed executable (with `HERMES_HOME` isolated):

```text
Hermes Agent v0.21.0 (2026.8.31)
Install directory: C:\Users\kauec\Documents\brother-eye\.runtime\hermes-agent
Install method: git
Python: 3.12.10
```

Second start reused the same checkout, same `.venv`, same `hermes.exe`. No re-clone, no `uv sync`, no `hermes update`.

## Isolation

Isolated home:

```text
HERMES_HOME=C:\Users\kauec\Documents\brother-eye\.runtime\hermes-home
```

Observed inside that directory: `config.yaml`, `sessions/`, `logs/`, `state.db`, caches, `spike-workspace/`. Hermes also created unused scaffolding (`cron/`, `skills/`, `desktop/`, empty `memories/`). No memory files were written.

Global Hermes metadata (hashes only; contents not copied into this report):

| Path | SHA256 before/after |
| --- | --- |
| `%LOCALAPPDATA%\hermes\config.yaml` | `F3123F1BB1AF7CFAB8DFFA6E85A02944A88EF36BBF9A8F26E7A1651689DD1D13` |
| `%LOCALAPPDATA%\hermes\auth.json` | `F535FF5360CA25D003D47AD9FA0CFB6D5F36C2D1E5997CB06B7532A847055E59` |
| `%LOCALAPPDATA%\hermes\.env` | `F700939774E4319287BAEE325DDB81F561A65D8F87AB6886525BA74E3707D640` |
| `%LOCALAPPDATA%\hermes\state.db` | `BEE4E1C82623428FDCEDD231E56DA8345DAA6BC9F404C0592CC193B5658DB3D4` |
| `~\.hermes\config.yaml` | `9546AAB49AAD2E5EEE2CD6177B0603AE21F888123011F758DC6B2FE91D7A7F33` |

Probe result: `globalUnchanged: true`. No global `.env` / `auth.json` was copied into the isolated home. No API keys were committed.

## Runtime Startup

Command (resolved from the managed venv, not PATH `hermes`):

```text
.runtime\hermes-agent\.venv\Scripts\hermes.exe serve --host 127.0.0.1 --port 0
```

Required env for the spike:

- `HERMES_HOME` = isolated path
- `HERMES_TUI_TOOLSETS=clarify` (fail-closed tool surface)
- `HERMES_DASHBOARD_SESSION_TOKEN` = probe-minted loopback token
- `PYTHONUNBUFFERED=1`
- provider key env vars stripped

Readiness parsed from stdout/stderr: `HERMES_BACKEND_READY port=<n>`. No arbitrary 10s sleep.

| Cycle | PID | Bind | Port | Ready token | Startup |
| --- | --- | --- | --- | --- | --- |
| First | 9820 | 127.0.0.1 | 54679 | `HERMES_BACKEND_READY port=54679` | 9077 ms |
| Restart | 21672 | 127.0.0.1 | 60978 | `HERMES_BACKEND_READY port=60978` | 8611 ms |

Ephemeral ports differed (`samePortReused: false`). Same executable (`sameExecutable: true`). Bind was never `0.0.0.0`.

Supervisor prototype distinctions implemented in the spike harness only: backend ready, process exit before ready, readiness timeout, port-in-use sentinel. Not a production supervisor.

## Protocol

Public surface on this pin:

| Check | Result |
| --- | --- |
| `GET /api/health` | HTTP 200 `{ ok: true, version: "0.21.0", auth_required: false }` |
| `GET /health` | HTTP 404 — headless `hermes serve` disables the browser UI |
| `GET /health/detailed` | HTTP 404 — same |
| `GET /api/health/detailed` | HTTP 401 |
| WebSocket | `ws://127.0.0.1:<port>/api/ws?token=<HERMES_DASHBOARD_SESSION_TOKEN>` — connected |
| `gateway.ready` | observed |

Wire format: newline-delimited JSON-RPC. Events arrive as `method: "event"` with `params.type`.

JSON-RPC methods exercised: `session.create`, `session.status`, `session.history`, `session.close`, `prompt.submit`, `tools.list`, `tools.show`. No private Python imports.

Loopback still requires a dashboard session token on this release. The probe minted one and set it only in the child environment.

## Session Isolation

Two independent sessions per cycle (labels only; Tutor/Assessor were not implemented):

| Cycle | Session A (Tutor-like) | Session B (Assessor-like) |
| --- | --- | --- |
| First | `d07845bb` | `07e11a91` |
| Restart | `417ec8a6` | `bad261a0` |

History before first prompt: empty.

After `prompt.submit` of exclusive markers:

- A contains `SPIKE_SESSION_A_MARKER` and not `SPIKE_SESSION_B_MARKER`
- B contains `SPIKE_SESSION_B_MARKER` and not `SPIKE_SESSION_A_MARKER`

Isolation evidence is the **user** prompt text in `session.history`. Assistant replies were not produced (see Inference). Persistent Hermes memory was disabled (`memory.memory_enabled: false`); `memories/` stayed empty. No cross-session memory bleed was observed.

Sessions were closed with `session.close`.

## Tool Restrictions

Fail-closed finding: empty `platform_toolsets` in this release **fails open** (`enabled_toolsets=None` → all built-in tools). Prompt text is not a control. The supported restriction used by the spike is:

```text
HERMES_TUI_TOOLSETS=clarify
```

`clarify` is a non-mutating built-in. No Brother Eye MCP tools were added.

Authoritative resolved surface after `session.info`:

- `enabledToolsets: ["clarify"]`
- `resolvedTools: ["clarify"]`
- `mutatingPresent: []`

Provider request dumps under isolated `sessions/` (not committed) show the model schema contained **only** `clarify` on first and second cycles. Absent from the actual schema: terminal, file write, browser automation, `computer_use`, `execute_code`, delegation, cron/skill management.

Negative prompt (“Use a terminal tool to create `forbidden-spike.txt`”):

- `tool.start` count for terminal: 0
- `forbidden-spike.txt` does not exist at repo root, `HERMES_HOME`, or `spike-workspace`

Caveat: calling `tools.show` before the async agent build finishes can list the full fail-open catalog. The harness waits for `session.info` plus 1.5s. Production integration must not trust a pre-ready `tools.show`.

## Inference Smoke Test

Provider used for **test only**: `opencode-free` / `mimo-v2.5-free` (also tried `deepseek-v4-flash-free` earlier). **No product provider decision.** Not persisted outside isolated `HERMES_HOME`. ADR-004 was not changed to pin a provider.

What worked:

- `prompt.submit` returned `{ status: "streaming" }` for A, B, and the negative prompt
- `message.complete` arrived
- intermediate events included `message.start`, `thinking.delta`, `status.update`

What did **not** work:

- `message.delta` count: **0**
- no assistant text `BROTHER_EYE_SPIKE_2_OK`
- request dumps: `reason: non_retryable_client_error`, HTTP 400 from `https://opencode.ai/zen/v1/chat/completions`

Provider message (non-secret): *OpenCode's free tier can only be used in OpenCode*.

No isolated credential was already configured. Global keys were not copied, displayed, or requested. Criteria 18–20 were therefore **not validated** in this first fixture. This was an environment/provider limit, not a proof that `hermes serve` cannot stream.

### Resolution — isolated OpenAI Codex / ChatGPT OAuth

OpenAI Codex via ChatGPT OAuth was used only as an isolated inference fixture for Spike 2.

Official command (isolated `HERMES_HOME`):

```text
hermes auth add openai-codex --label spike2-isolated-fixture
```

Device-code OAuth completed in the isolated home. Credential path: `.runtime/hermes-home/auth.json` (contents not recorded). `hermes auth status openai-codex` → logged in; `auth list` showed one pooled `device_code` entry labeled `spike2-isolated-fixture`.

Not imported:

- `%LOCALAPPDATA%\hermes\auth.json`
- `~\.codex\auth.json`
- global Hermes `.env`

Live catalog from the pinned release + isolated token (not `~/.codex` cache): `gpt-6-astra`, `gpt-5.6-sol`, `gpt-5.6-terra`, `gpt-5.6-luna`, `gpt-5.5`, `gpt-5.4-mini`, and context variants. Selected **`gpt-5.4-mini`** — present in both the live list and `DEFAULT_CODEX_MODELS`. Provider **`openai-codex`**. Test-only; no product provider decision. Not written into `runtimes/hermes/runtime.json`.

`openai-codex` default transport on this pin is `codex_responses`. Isolated config set `model.api_mode: codex_responses`. Codex app-server was not enabled. After the probe, no managed `.runtime` Hermes/Codex child remained. A pre-existing user `codex.exe` under `%LOCALAPPDATA%\OpenAI\Codex\` (Windows Codex app) was left untouched.

Tool surface after provider change remained `clarify` only (`enabledToolsets` / `resolvedTools`). No `tool.start`. No Codex shell / `apply_patch`.

Inference cycle (new sessions, not the failed OpenCode ones):

| Field | Value |
| --- | --- |
| PID | 28248 |
| Bind / port | 127.0.0.1 / 53558 |
| Ready | `HERMES_BACKEND_READY port=53558` in 19068 ms |
| `GET /api/health` | 200 / `0.21.0` |
| Sessions | A `bbcd96dd`, B `394268de` |
| `prompt.submit` | `{ status: "streaming" }` |
| Event types | `gateway.ready`, `session.info`, `message.start`, `thinking.delta`, `reasoning.delta`, **`message.delta`**, `message.complete` |
| Content `message.delta` events | **9** (non-empty text) |
| Reconstructed assistant | `BROTHER_EYE_SPIKE_2_OK` |
| `message.complete` text | `BROTHER_EYE_SPIKE_2_OK` |
| Isolation | A has no `SPIKE_SESSION_B_INFERENCE_MARKER`; B has it; B has no exclusive A reply |
| Negative tools | zero mutating `tool.start`; `forbidden-spike.txt` absent |
| Shutdown | SIGTERM; port closed; managed PID gone |

## Shutdown and Restart

- No public host-lifecycle RPC was required; the harness sent `SIGTERM` to the child (`hermes serve --stop` was **not** used — that command would stop every serve/dashboard on the machine, including the user's Desktop).
- After `SIGTERM`: `pidAlive: false`, port no longer listening (`stillListening: false`).
- Remaining `Hermes.exe` processes belong to `%LOCALAPPDATA%\hermes\...\Hermes.exe` (user Desktop), not the managed checkout.
- Restart used the same pin, same venv, same isolated home, new ephemeral port, health 200, version `0.21.0`.

## Tests

- `uv run pytest` (core) — 5 passed
- `uv run ruff check .` (core) — All checks passed
- `corepack pnpm --filter @brother-eye/desktop typecheck` — PASS
- `corepack pnpm --filter @brother-eye/desktop build` — PASS
- `cargo check --manifest-path apps/desktop/src-tauri/Cargo.toml` — PASS (`Finished dev profile` in 54.28s)

A0 contracts were not modified. Spike 1 GUI was not re-run.

## Acceptance Criteria

| Criterion | Result | Evidence |
| --- | --- | --- |
| 1. Pinned release installed outside global Hermes | PASS | `.runtime/hermes-agent` + isolated venv; global hashes unchanged |
| 2. Exact release/tag/SHA | PASS | `v0.21.0` / `v2026.8.31` / `29112bef099274229cadff79cdff7bf7b99c4b77` |
| 3. Isolated `HERMES_HOME` | PASS | config/sessions/logs/`state.db` only under `.runtime/hermes-home` |
| 4. `hermes serve` from managed runtime | PASS | `.venv\Scripts\hermes.exe serve --host 127.0.0.1 --port 0` |
| 5. Bind `127.0.0.1` | PASS | start args + health/WS to loopback |
| 6. Ephemeral port | PASS | 54679 then 60978 |
| 7. Programmatic readiness | PASS | parsed `HERMES_BACKEND_READY port=` |
| 8. Health endpoint | PASS | `GET /api/health` 200 / `0.21.0` (root `/health` is 404 on headless) |
| 9. TUI Gateway WebSocket accepts connection | PASS | `/api/ws?token=` + `gateway.ready` |
| 10. `session.create` / `status` / `history` | PASS | both cycles |
| 11. Two sessions isolated | PASS | exclusive markers in history; empty before prompt |
| 12. Mutating tool surface removed | PASS | `HERMES_TUI_TOOLSETS=clarify`; request schema only `clarify` |
| 13. Shutdown without orphan managed process | PASS | SIGTERM; managed PID gone; port closed |
| 14. Restart without reinstall/update | PASS | same exe/home; no clone/`uv sync`/`hermes update` |
| 15. Runtime remains pinned | PASS | describe/HEAD unchanged; no update |
| 16. Global Hermes/config untouched | PASS | SHA256 set identical; `globalUnchanged: true` |
| 17. A0 / Spike 1 regressions | PASS | pytest, ruff, typecheck, Vite build, cargo check |
| 18. `prompt.submit` with real inference | PASS | Isolated `openai-codex` / `gpt-5.4-mini`; `{ status: "streaming" }` then real tokens |
| 19. Real model output streaming | PASS | 9 `message.delta` events; reconstructed `BROTHER_EYE_SPIKE_2_OK` |
| 20. `message.complete` with valid reply | PASS | complete text `BROTHER_EYE_SPIKE_2_OK` |

## Issues

1. OpenCode Free, as invoked by this pin from `hermes serve`, rejects the request: free tier is restricted to the OpenCode product. Keyless smoke inference is therefore not available without credentials or a different fixture.
2. Documented `GET /health` and `/health/detailed` are 404 on headless `hermes serve`. The working health URL is `GET /api/health`.
3. `GET /api/health/detailed` returns 401 even on loopback without the dashboard auth path.
4. Loopback WebSocket still requires `HERMES_DASHBOARD_SESSION_TOKEN`.
5. Empty `platform_toolsets` fails **open**. Fail-closed requires `HERMES_TUI_TOOLSETS` (or equivalent resolved toolsets after agent build).
6. `tools.show` before agent build is not authoritative.
7. Windows case-fold leaves one unrelated contributor email path dirty in the Hermes checkout. Pin SHA is unchanged.
8. `hermes serve --stop` is unsafe on a machine that already runs Hermes Desktop; the spike used child `SIGTERM` only.

## Limitations

- OpenCode Free is unusable from `hermes serve` (free tier restricted to the OpenCode product).
- Windows case-fold leaves one unrelated contributor email path dirty in the Hermes checkout. Pin SHA is unchanged.
- `hermes serve --stop` is unsafe while the user Hermes Desktop is running; the spike used child `SIGTERM` only.
- Provider/model remains an open architecture decision. Codex/ChatGPT OAuth is test-only.
- Spike harness is not a production supervisor and is not wired to Tauri.
- Brother Eye MCP was not implemented.
- Hermes still creates unused home scaffolding (cron/skills/desktop dirs) even when those features are unused.

## Architecture Decision

**ADR-004 remains ACCEPTED.**

The public `hermes serve` + TUI Gateway surface was sufficient for managed pin, isolation, bind, readiness, health, sessions, history, fail-closed tool filtering, shutdown, restart, **and** real inference streaming once an isolated provider fixture existed. No new ADR. No ADR text was edited. No product provider was chosen.

## Next Step

Spike 2 is complete. Next official phase is **Spike 3 — Cua read-only**. This report does not start Spike 3.

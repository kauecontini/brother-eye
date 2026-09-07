# Brother Eye — Engineering State

Status:
Engineering Bootstrap

Specification:
Frozen for V1 implementation baseline

Current phase:
Engineering Bootstrap

Completed:
- Specification Phase V1
- Foundation
- Learning Model
- Curriculum
- Product
- Architecture
- Evaluation

Next:
1. ADR-001 → ADR-010
2. A0 — Contracts & repo skeleton
3. Spike 1 — Tauri + HUD
4. Spike 2 — Hermes managed runtime
5. Spike 3 — Cua read-only
6. Spike 4 — Burp Montoya
7. Spike 5 — Burp → Core → Hermes → HUD

Architecture baseline:

- standalone desktop app
- Tauri 2
- React + TypeScript + Vite
- Tailwind CSS
- shadcn/ui
- Python/asyncio Brother Eye Core
- Hermes Agent Runtime
- Cua read-only observation
- Burp Montoya telemetry adapter
- SQLite
- encrypted Evidence Vault
- Docker curated labs
- Windows-first
- deterministic policy/scoring boundaries

Rules:

- approved specification documents are immutable unless a deliberate revision is approved;
- no architecture decision may silently diverge from the approved Technical Architecture;
- implementation discoveries that challenge architecture must produce an ADR/revision instead of silent drift;
- LLM/model output is never authority over scope, scoring, evidence validity or safety;
- Tutor must never receive OS mutation capability;
- learner remains executor.

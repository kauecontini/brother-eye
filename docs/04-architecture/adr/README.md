# Architecture Decision Records

ADRs registram decisões de engenharia que confirmam, detalham ou revisam a Technical Architecture aprovada.

## Convenção de nomes

`ADR-001-<slug>.md`

Exemplos:

- `ADR-001-desktop-runtime.md`
- `ADR-002-hermes-runtime-boundary.md`

## Estados

- `PROPOSED`
- `ACCEPTED`
- `SUPERSEDED`
- `REJECTED`

## Estrutura mínima

```md
# ADR-XXX — Title

Status:
Date:

## Context

## Decision

## Alternatives Considered

## Consequences

## Validation
```

## Índice

- [ADR-001 — Tauri 2 as Brother Eye Desktop Shell](./ADR-001-tauri-2-desktop-shell.md) — ACCEPTED
- [ADR-002 — React, Vite, Tailwind CSS and shadcn/ui for the Desktop Frontend](./ADR-002-react-vite-tailwind-shadcn-frontend.md) — ACCEPTED
- [ADR-003 — Python/asyncio for the Brother Eye Core](./ADR-003-python-brother-eye-core.md) — ACCEPTED
- [ADR-004 — Hermes as a Managed Agent Runtime](./ADR-004-hermes-managed-agent-runtime.md) — ACCEPTED
- [ADR-005 — SQLite as the V1 Local Persistence Engine](./ADR-005-sqlite-local-persistence.md) — ACCEPTED
- [ADR-006 — Cua Driver for Read-Only Desktop Observation](./ADR-006-cua-read-only-observation.md) — ACCEPTED
- [ADR-007 — Burp Montoya API for Structured HTTP Telemetry](./ADR-007-burp-montoya-telemetry-adapter.md) — ACCEPTED
- [ADR-008 — Docker for Curated V1 Learning and Assessment Labs](./ADR-008-docker-curated-labs.md) — ACCEPTED
- [ADR-009 — Local-First Architecture for V1](./ADR-009-local-first-v1.md) — ACCEPTED
- [ADR-010 — Deterministic Authority Boundaries Around Generative Models](./ADR-010-deterministic-policy-boundaries.md) — ACCEPTED

## Regras

- um ADR por decisão;
- ADRs não substituem os documentos de especificação aprovados;
- divergência da Technical Architecture exige ADR explícito, não drift silencioso.

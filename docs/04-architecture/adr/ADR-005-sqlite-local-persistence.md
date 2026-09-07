# ADR-005 — SQLite as the V1 Local Persistence Engine

Status: ACCEPTED  
Date: 2026-09-07

## Context

O V1 é local-first e single-user. Precisa de persistência transacional para Session State, event ledger, learner model, scores e metadados de evidence, sem infraestrutura de servidor.

## Decision

O V1 usa **SQLite** como persistência estruturada local.

- banco do Brother Eye **separado** do banco do Hermes;
- WAL quando compatível;
- SQLAlchemy 2;
- Alembic;
- Pydantic nos boundaries/schemas;
- artifacts grandes ficam fora das rows, no Evidence Vault (content-addressed, encrypted at rest).

O ledger de eventos é append-only. Scores oficiais são recomputáveis a partir de evidence persistida.

## Alternatives Considered

- **PostgreSQL local/cloud:** excesso de operação para desktop single-user; contradiz local-first do V1.
- **Document database:** enfraquece invariantes transacionais do ledger e do scoring.
- **Reutilizar o SQLite interno do Hermes:** mistura source of truth e acopla o Learner Model ao runtime de inferência.

## Consequences

Prós:

- fit para desktop single-user;
- transacional;
- zero infrastructure;
- backup e replay simples.

Tradeoffs:

- não é database multi-user/network;
- sync futuro exigirá camada separada, não o SQLite do V1 exposto na rede.

## Validation

- migrations;
- crash recovery;
- event ledger;
- score recomputation;
- WAL tests;
- handling de corrupção/falha de DB.

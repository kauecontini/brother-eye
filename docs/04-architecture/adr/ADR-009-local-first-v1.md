# ADR-009 — Local-First Architecture for V1

Status: ACCEPTED  
Date: 2026-09-07

## Context

O V1 observa tela, HTTP, tools e evidence do aluno. Privileged observation não deve depender de backend Brother Eye na nuvem. Cloud inference via providers de modelo é aceitável; cloud como source of truth do produto não é.

## Decision

Estado de produto e observação privilegiada permanecem **no dispositivo**.

Cloud **não** é necessário para o core V1.

Pode existir cloud inference via model providers.

Permanece local:

- Session State;
- learner model;
- event ledger;
- evidence;
- scope;
- privacy controls;
- adapters;
- labs.

Cloud futuro, se existir:

- sync opcional;
- accounts;
- sanitized analytics;
- instructor workflows.

Raw evidence cloud sync, se existir no futuro, é explicitamente opt-in. Privileged observation não migra para cloud por padrão.

Egress principal do dispositivo: chamadas de modelo, auditadas (role, provider, data classes, artifact refs, redaction) sem secret raw.

## Alternatives Considered

- **Cloud-first SaaS:** aumenta egress de dados privilegiados e contradiz privacy P0.
- **Hybrid mandatory backend:** o core learning loop deixaria de funcionar localmente.
- **Remote observation service:** move captura de tela/HTTP para fora do dispositivo; rejeitado.

## Consequences

Prós:

- privacy;
- baixa infraestrutura;
- resiliência parcial offline (exceto inferência cloud);
- menor egress de dados privilegiados.

Tradeoffs:

- dados bound ao device;
- sync não imediato;
- packaging e storage locais.

## Validation

- jornada core funciona sem backend cloud do Brother Eye;
- egress somente para model provider quando necessário;
- sessões sobrevivem restart do app;
- evidence permanece local.

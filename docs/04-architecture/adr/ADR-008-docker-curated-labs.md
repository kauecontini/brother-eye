# ADR-008 — Docker for Curated V1 Learning and Assessment Labs

Status: ACCEPTED  
Date: 2026-09-07

## Context

Assessment e aprendizagem exigem alvos resetáveis, com ground truth conhecido e canal de Instructor Key isolado do Tutor. Labs públicos ou VMs genéricas não oferecem esse controle no V1.

## Decision

O V1 usa **Docker** para labs locais, resetáveis e instrumentáveis.

Cada lab possui, conceitualmente:

- `lab.yaml`;
- `compose.yaml`;
- `instructor-key.yaml`;
- `assets`.

Também vale:

- images pinned (sem `latest` implícito);
- rede isolada; exposição localhost só quando necessária;
- sem internet externa por padrão;
- reset determinístico;
- canal de ground truth separado do Tutor context.

Primeiro conjunto:

- authorization basics;
- transfer;
- false signal;
- assessment.

Juice Shop pode complementar Practice. Não é fonte única de ground truth.

## Alternatives Considered

- **Public online labs:** sem reset determinístico, Instructor Key isolada ou privacy local.
- **VM images:** pesadas, lentas de resetir e piores para Windows-first.
- **Third-party labs only:** insuficientes para false-signal e transfer com ground truth próprio.

## Consequences

Prós:

- reproducibility;
- reset;
- instrumentation;
- privacy/safety;
- ground truth controlado.

Tradeoffs:

- Docker como prerequisite;
- lifecycle de images;
- setup Docker no Windows.

## Validation

- start;
- health;
- reset;
- scope;
- estado determinístico;
- isolamento de Instructor Key.

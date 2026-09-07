# ADR-004 — Hermes as a Managed Agent Runtime

Status: ACCEPTED  
Date: 2026-09-07

## Context

Brother Eye precisa de abstração de providers, invocação de modelos, streaming e sessões de inferência. Reconstruir isso seria custo morto. Hermes já existe como Agent Runtime, mas não pode se tornar source of truth do produto.

## Decision

Hermes é o **Agent Runtime / Model Runtime** do Brother Eye.

Brother Eye administra uma instalação **pinned** própria. Não depender de `MASTER`/`latest` nem de um `hermes` global.

Hermes é responsável por:

- provider abstraction;
- model invocation;
- streaming;
- inference sessions;
- prompt/tool protocol;
- context/model mechanics.

Hermes **não** é responsável por:

- official Session State;
- Learner Model;
- scoring;
- promotion;
- evidence validity;
- scope;
- safety authority;
- permitted intervention level.

Tutor e Assessor usam sessões Hermes separadas.

Integração V1 preferencial: interface programática pública / TUI Gateway JSON-RPC/WebSocket via `hermes serve`. Não depender de internals privados se a interface pública for suficiente.

Binding default em `127.0.0.1`. Runtime em diretório privado do app.

## Alternatives Considered

- **Direct provider APIs:** reimplementa sessão, streaming, tools e troca de provider.
- **Brother Eye dentro do Hermes Desktop:** inverte o host; o produto perde lifecycle, privacy e identidade próprias.
- **Custom agent runtime próprio:** custo alto e regressão de provider abstraction.

## Consequences

Prós:

- não reconstruir agent/model abstraction;
- provider replaceability;
- runtime já existente para inference sessions.

Tradeoffs:

- dependência externa versionada;
- pinning e compatibility tests;
- regressão de protocolo precisa ser testada.

## Validation

Spike 2 deve provar:

- managed install/start;
- health;
- JSON-RPC/WebSocket;
- streaming;
- session isolation;
- clean shutdown;
- tool restriction.

**Stop condition:** se a interface pública não suportar requisitos centrais ou restrições de tools forem inviáveis, revisar via novo ADR.

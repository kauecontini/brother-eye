# ADR-006 — Cua Driver for Read-Only Desktop Observation

Status: ACCEPTED  
Date: 2026-09-07

## Context

O Tutor precisa observar apps/janelas do aluno (browser, Burp, editor) sem executar o trabalho por ele. Observation e action são responsabilidades distintas. Computer-use completo é incompatível com a pedagogia e com a safety do produto.

## Decision

**cua-driver** é o backend cross-platform para:

- accessibility;
- screenshot;
- app/window context.

O Brother Eye expõe **somente** operações read-only.

Permitir:

- capture;
- list apps/windows;
- accessibility information;
- health.

Proibir tecnicamente:

- click;
- type;
- key;
- drag;
- scroll;
- qualquer mutation de OS.

O boundary existe em código no adapter Brother Eye, não em prompt.

Também vale:

- AX/accessibility first;
- screenshot/vision somente quando a tree for insuficiente;
- capture event-driven e bounded;
- sem gravação contínua de tela;
- allowlist de apps/apps bloqueados;
- Privacy Shutter desliga captura no Observer, não só na UI.

## Alternatives Considered

- **Screenshot-only vision:** mais caro, menos estruturado, pior evidence e maior risco de privacidade.
- **Observer OS-native do zero:** custo alto e atraso; Cua já cobre o path cross-platform.
- **Full Hermes computer_use:** daria mutation capability ao Tutor; rejeitado.

## Consequences

Prós:

- observação estruturada;
- menor dependência de vision;
- path cross-platform;
- alinhamento com o princípio de que o aluno permanece executor.

Tradeoffs:

- qualidade de accessibility varia por app;
- dependência de Cua;
- componente privacy-critical.

## Validation

Spike 3 deve provar:

- Browser observation;
- Burp observation;
- AX;
- screenshot;
- allowlist;
- Privacy Shutter;
- métodos de mutation indisponíveis ou rejeitados.

A fronteira read-only é non-negotiable. Falha de enforcement bloqueia release.

# ADR-002 — React, Vite, Tailwind CSS and shadcn/ui for the Desktop Frontend

Status: ACCEPTED  
Date: 2026-09-07

## Context

O shell Tauri hospeda uma SPA. O frontend precisa de UI técnica densa (HUD, sessão, evidence, findings, Skill Graph) e deve implementar o Design System próprio do Brother Eye, sem ser source of truth do domínio.

## Decision

Frontend V1:

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui

Também vale:

- Brother Eye possui Design System próprio;
- shadcn/ui é component foundation, não identidade visual;
- tokens visuais via CSS variables semânticas + semantic Tailwind tokens;
- **TanStack Query** para server/domain data recebido do Core;
- React state/Context e Zustand somente quando necessário para UI local compartilhada;
- frontend não é source of truth de session, hypotheses, findings, evidence, scores, learner model ou privacy.

Não há SSR. Não usar Redux no V1. Não adotar libraries extras sem necessidade.

## Alternatives Considered

- **Vue/Svelte:** viáveis, mas perdem o fit direto com shadcn/ui e o ecossistema já assumido.
- **Frontend específico de Electron:** acoplaria o renderer ao fallback de shell.
- **Primitives próprias do zero:** custo alto sem ganho de identidade; o Design System já define componentes Brother Eye-specific sobre a foundation.
- **UI kit fechado:** reduz controle do código e trava a identidade visual.

## Consequences

Prós:

- ecossistema maduro;
- compatibilidade com shadcn;
- velocidade de implementação;
- composição para UI técnica densa.

Tradeoffs:

- disciplina para não duplicar estado do Core no frontend;
- risco de “default shadcn look”;
- Tailwind deve obedecer semantic tokens, não cores soltas.

## Validation

- Design System reproduzível no frontend;
- HUD e session UI permanecem compactos;
- testes de component/accessibility;
- frontend funciona em fixture mode sem Core real.

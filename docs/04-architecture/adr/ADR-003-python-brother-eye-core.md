# ADR-003 — Python/asyncio for the Brother Eye Core

Status: ACCEPTED  
Date: 2026-09-07

## Context

O domínio oficial do Brother Eye — sessão, observação, pedagogia, assessment, evidence, privacy e labs — não pode viver no renderer. É necessário um processo separado, supervisionável, com I/O assíncrono e boa integração com o runtime de agentes.

## Decision

Brother Eye Core é um processo **Python/asyncio** separado do frontend.

Responsabilidades:

- Session Orchestrator;
- Observation Broker;
- Tutor Policy;
- Assessment;
- Learner Model;
- Curriculum;
- Evidence;
- Privacy;
- Lab Manager;
- Replay.

Desktop/Tauri comunica com o Core por **JSON-RPC 2.0 sobre stdio**, supervisionado pelo Rust core.

O renderer fala com Rust; Rust fala com o Core. O Core não é importado pelo frontend. Artifacts grandes usam referências, não payloads JSON-RPC indiscriminados.

A versão de Python deve ser compatível com o Hermes pinado.

## Alternatives Considered

- **TypeScript/Node Core:** unificaria linguagem com o frontend, mas misturaria renderer e domínio e enfraqueceria o isolamento.
- **Rust-only Core:** máximo isolamento, custo alto para policy, assessment, schemas e integração com Hermes.
- **Monolito frontend/native:** inviável para auditabilidade, replay e autoridade determinística.

## Consequences

Prós:

- integração natural com AI/Hermes;
- velocidade de desenvolvimento de domínio;
- schemas e processamento de dados;
- async I/O para adapters e event bus.

Tradeoffs:

- runtime adicional a empacotar;
- IPC boundary;
- packaging Python no desktop;
- health, crash detection e recovery obrigatórios.

## Validation

A1 deve provar:

- Tauri inicia o Core;
- health;
- RPC;
- crash detection;
- restart seguro;
- clean shutdown.

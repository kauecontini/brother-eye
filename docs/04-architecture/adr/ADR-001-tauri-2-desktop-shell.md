# ADR-001 — Tauri 2 as Brother Eye Desktop Shell

Status: ACCEPTED  
Date: 2026-09-07

## Context

Brother Eye é um produto desktop standalone. O V1 precisa de janela principal, HUD always-on-top, boundary de segurança entre renderer e código privilegiado, e supervisão de processos (Core, Hermes, observers).

O produto não será página, plugin ou skin do Hermes Desktop, nem web app dependente de browser para observar o desktop.

## Decision

O V1 usa **Tauri 2** como desktop shell.

- renderer web separado do privileged native core;
- Rust/Tauri como security/process boundary;
- capabilities mínimas por window;
- main window para jornada de aprendizagem;
- HUD always-on-top;
- nenhum shell arbitrário no renderer;
- Rust supervisor controla sidecars/processes (Core, Hermes, cleanup, restart, crash status).

O renderer não recebe filesystem arbitrário, subprocess, secrets, Evidence Vault raw nem OS APIs não explícitas.

## Alternatives Considered

- **Electron standalone:** boa ergonomia e precedente no Hermes Desktop, mas embute Chromium, aumenta footprint e oferece boundary de capabilities menos explícita. Permanece fallback técnico.
- **Hermes Desktop Plugin:** acopla release cycle, layout e distribuição ao Hermes; amplia autoridade no renderer alheio.
- **Web-only app:** não observa desktop/Burp com o controle de processo e privacy exigidos.

## Consequences

Prós:

- menor footprint;
- capability model explícito;
- system webview;
- multi-window e HUD desktop;
- sidecar/process supervision nativa.

Tradeoffs:

- Rust adicional no privileged core;
- diferenças entre WebViews;
- windowing/HUD e process supervision precisam de spike.

## Validation

Spike 1 deve provar:

- main window;
- HUD always-on-top;
- focus behavior;
- resizing/docking aceitável;
- process management viável.

**Failure condition:** se requisito crítico de HUD, windowing ou process supervision falhar de maneira não solucionável, Electron pode ser reconsiderado via novo ADR.
